import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "../db";
import { messages, academicPapers } from "../db/schema";
import { eq, like, desc, and, or } from "drizzle-orm";

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

  // Academic Papers API
  
  // Get papers with search functionality
  app.get("/api/papers", async (req, res) => {
    try {
      const { search, page = 1, limit = 10 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);
      
      let query = db.select().from(academicPapers);
      
      if (search) {
        const searchTerm = `%${search}%`;
        query = query.where(
          or(
            like(academicPapers.title, searchTerm),
            like(academicPapers.abstract, searchTerm),
            like(academicPapers.keywords, searchTerm),
            like(academicPapers.authors, searchTerm)
          )
        );
      }
      
      const papers = await query
        .orderBy(desc(academicPapers.publicationDate))
        .limit(Number(limit))
        .offset(offset);
      
      res.json(papers);
    } catch (error) {
      console.error('Error fetching papers:', error);
      res.status(500).json({ message: "Failed to fetch papers" });
    }
  });

  // Add new paper
  app.post("/api/papers", async (req, res) => {
    try {
      const {
        title,
        authors,
        abstract,
        publicationDate,
        venue,
        pdfUrl,
        keywords,
      } = req.body;

      if (!title || !authors || !abstract || !publicationDate || !venue || !pdfUrl || !keywords) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newPaper = await db.insert(academicPapers).values({
        title,
        authors,
        abstract,
        publicationDate: new Date(publicationDate),
        venue,
        pdfUrl,
        keywords,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      res.status(201).json(newPaper[0]);
    } catch (error) {
      console.error('Error adding paper:', error);
      res.status(500).json({ message: "Failed to add paper" });
    }
  });

  return httpServer;
}
