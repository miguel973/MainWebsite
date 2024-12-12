import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "../db";
import { messages, academicPapers, meetingSlots, meetingBookings } from "../db/schema";
import { eq, like, desc, and, or, gte, lte, asc } from "drizzle-orm";

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

  // Meeting Slots API
  
  // Get available meeting slots
  app.get("/api/slots", async (req, res) => {
    try {
      const { date } = req.query;
      let query = db.select().from(meetingSlots).where(eq(meetingSlots.isBooked, false));
      
      if (date) {
        const startOfDay = new Date(date as string);
        const endOfDay = new Date(date as string);
        endOfDay.setHours(23, 59, 59, 999);
        
        query = query.where(
          and(
            gte(meetingSlots.startTime, startOfDay),
            lte(meetingSlots.startTime, endOfDay)
          )
        );
      }
      
      const slots = await query.orderBy(asc(meetingSlots.startTime));
      res.json(slots);
    } catch (error) {
      console.error('Error fetching slots:', error);
      res.status(500).json({ message: "Failed to fetch meeting slots" });
    }
  });

  // Create new meeting slots (admin only)
  app.post("/api/slots", async (req, res) => {
    try {
      const { startTime, endTime } = req.body;
      
      if (!startTime || !endTime) {
        return res.status(400).json({ message: "Start time and end time are required" });
      }

      const newSlot = await db.insert(meetingSlots).values({
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      res.status(201).json(newSlot[0]);
    } catch (error) {
      console.error('Error creating slot:', error);
      res.status(500).json({ message: "Failed to create meeting slot" });
    }
  });

  // Book a meeting slot
  app.post("/api/bookings", async (req, res) => {
    try {
      const { slotId, name, email, topic } = req.body;
      
      if (!slotId || !name || !email || !topic) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Start a transaction
      const result = await db.transaction(async (tx) => {
        // Check if slot exists and is not booked
        const slot = await tx.query.meetingSlots.findFirst({
          where: and(
            eq(meetingSlots.id, slotId),
            eq(meetingSlots.isBooked, false)
          ),
        });

        if (!slot) {
          throw new Error("Slot not available");
        }

        // Update slot as booked
        await tx.update(meetingSlots)
          .set({ isBooked: true, updatedAt: new Date() })
          .where(eq(meetingSlots.id, slotId));

        // Create booking
        const booking = await tx.insert(meetingBookings)
          .values({
            slotId,
            name,
            email,
            topic,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning();

        return booking[0];
      });

      res.status(201).json(result);
    } catch (error) {
      console.error('Error booking slot:', error);
      if (error.message === "Slot not available") {
        res.status(400).json({ message: "This slot is no longer available" });
      } else {
        res.status(500).json({ message: "Failed to book meeting" });
      }
    }
  });

  return httpServer;
}
