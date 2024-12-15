import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files with proper MIME types
const staticPath = app.get("env") === "development" 
  ? path.join(process.cwd(), 'client/public')
  : path.join(process.cwd(), 'dist/public');

console.log('Static files being served from:', staticPath);

app.use(express.static(staticPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.wav')) {
      res.set('Content-Type', 'audio/wav');
    }
  },
  fallthrough: true // Continue to next middleware if file not found
}));

// Add specific route for audio files with detailed error handling
app.get('*.wav', (req, res, next) => {
  const audioPath = path.join(staticPath, req.path);
  console.log('Attempting to serve audio file from:', audioPath);
  
  // Add detailed file existence check
  if (!require('fs').existsSync(audioPath)) {
    console.error('Audio file not found:', {
      path: audioPath,
      requestPath: req.path,
      env: app.get("env")
    });
    return res.status(404).json({ error: 'Audio file not found' });
  }

  res.sendFile(audioPath, {
    headers: {
      'Content-Type': 'audio/wav',
      'Accept-Ranges': 'bytes'
    }
  }, (err) => {
    if (err) {
      console.error('Error serving audio file:', {
        path: audioPath,
        error: err.message,
        code: err.code,
        env: app.get("env")
      });
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error serving audio file' });
      }
    } else {
      console.log('Successfully served audio file:', audioPath);
    }
  });
});

// Add security and CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client
  const PORT = process.env.PORT || 5000;
  
  server.listen(PORT, () => {
    log(`Server running at http://localhost:${PORT}`);
  });
})();
