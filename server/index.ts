import express, { type Request, Response, NextFunction } from "express";
import { log } from "./vite";
import { createServer } from "http";
import { setupVite, serveStatic } from "./vite";

async function startServer() {
  log('Starting server initialization...');

  const app = express();
  const httpServer = createServer(app);

  // Basic health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Basic error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  const port = 3000;

  try {
    // Set up Vite middleware for development
    await setupVite(app, httpServer);
    log('Vite middleware setup completed');
  } catch (error) {
    log(`Failed to setup Vite middleware: ${error}`);
    throw error;
  }

  return new Promise((resolve, reject) => {
    const server = httpServer.listen(port, "0.0.0.0", () => {
      log(`Basic server running at http://0.0.0.0:${port}`);
      resolve(server);
    });

    server.on('error', (err) => {
      log(`Failed to start server: ${err}`);
      reject(err);
    });

    // Add specific error handlers
    process.on('uncaughtException', (err) => {
      log(`Uncaught Exception: ${err}`);
      server.close(() => process.exit(1));
    });

    process.on('unhandledRejection', (err) => {
      log(`Unhandled Rejection: ${err}`);
      server.close(() => process.exit(1));
    });
  });
}

startServer().catch(error => {
  log(`Fatal error during server startup: ${error}`);
  process.exit(1);
});