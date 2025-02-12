import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { log, setupVite } from "./vite";
import path from "path";
import { db } from "../db";
import { sql } from "drizzle-orm";

async function startServer() {
  log('Starting server initialization...');

  try {
    // Initialize Express first
    log('Initializing Express application...');
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const staticPath = path.join(process.cwd(), 'client/public');
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

    log('Setting up CORS and security headers...');
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

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${message}`);
      res.status(status).json({ message });
    });

    // Test database connection
    log('Testing database connection...');
    try {
      await db.execute(sql`SELECT 1`);
      log('Database connection successful');
    } catch (dbError) {
      log(`Database connection failed: ${dbError}`);
      throw dbError;
    }

    log('Registering routes...');
    const server = registerRoutes(app);

    // Setup Vite middleware for development
    log('Setting up Vite middleware...');
    await setupVite(app, server);

    const port = Number(process.env.PORT) || 5000;

    log(`Attempting to start server on port ${port}...`);
    server.listen(port, "0.0.0.0", () => {
      log(`Server running at http://0.0.0.0:${port}`);
    });

  } catch (error) {
    log(`Failed to start server: ${error}`);
    throw error;
  }
}

process.on('unhandledRejection', (reason, promise) => {
  log(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

startServer().catch(error => {
  log(`Fatal error during server startup: ${error}`);
  process.exit(1);
});