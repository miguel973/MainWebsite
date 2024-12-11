import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "../db";
import { messages } from "../db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newMessage = await db.insert(messages).values({
        name,
        email,
        message,
        createdAt: new Date(),
      }).returning();

      res.status(201).json(newMessage[0]);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit message" });
    }
  });

  // Get messages (admin only, implement auth later)
  app.get("/api/messages", async (_req, res) => {
    try {
      const allMessages = await db.select().from(messages).orderBy(messages.createdAt);
      res.json(allMessages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  return httpServer;
}
