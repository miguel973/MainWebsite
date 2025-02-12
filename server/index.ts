import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const staticPath = path.join(process.cwd(), app.get("env") === "development" 
  ? 'client/public'
  : 'dist/public');

log('Static files being served from: ' + staticPath);

app.use(express.static(staticPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.wav')) {
      res.set('Content-Type', 'audio/wav');
    } else if (filePath.endsWith('.mp3')) {
      res.set('Content-Type', 'audio/mpeg');
    }
  },
  fallthrough: true
}));

app.get('*.mp3', (req, res, next) => {
  const audioPath = path.join(staticPath, req.path);
  log('Serving MP3 file: ' + audioPath);

  res.sendFile(audioPath, {
    headers: {
      'Content-Type': 'audio/mpeg'
    }
  }, (err) => {
    if (err) {
      console.error('Error serving MP3 file:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error serving audio file' });
      }
    }
  });
});

app.use((req, res, next) => {
  const allowedOrigins = [/\.replit\.dev$/, /^http:\/\/localhost:/];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.some(pattern => pattern.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
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
  try {
    const server = registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${message}`);
      res.status(status).json({ message });
    });

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    const port = Number(process.env.PORT) || 5000;
    const host = "0.0.0.0";

    server.listen(port, host, () => {
      log(`Server running at http://${host}:${port}`);
      log('For Replit: Open the "Webview" tab or check your .replit dev URL');
    });

  } catch (error) {
    log(`Failed to start server: ${error}`);
    process.exit(1);
  }
})();