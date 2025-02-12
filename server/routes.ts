import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "../db";
import { messages, academicPapers, meetingSlots, meetingBookings } from "../db/schema";
import { eq, like, desc, and, or, gte, lte, asc } from "drizzle-orm";
import nodemailer from 'nodemailer';
import { sendMeetingConfirmation } from "./utils/email";
import { log } from "./vite";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export function registerRoutes(app: Express): Server {
  log('Starting route registration...');
  const httpServer = createServer(app);

  try {
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

        const emailContent = {
          from: process.env.EMAIL_USER,
          to: 'taverasholdingsllc@gmail.com',
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        };

        await transporter.sendMail(emailContent);
        res.status(201).json(newMessage[0]);
      } catch (error) {
        console.error('Error handling contact form:', error);
        res.status(500).json({ message: "Failed to submit message" });
      }
    });

    // Get messages (admin only, implement auth later)
    app.get("/api/messages", async (_req, res) => {
      try {
        const allMessages = await db
          .select()
          .from(messages)
          .orderBy(desc(messages.createdAt));
        res.json(allMessages);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch messages" });
      }
    });

    // Papers API
    app.get("/api/papers", async (req, res) => {
      try {
        const { search, page = 1, limit = 10 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        let paperQuery = db.select().from(academicPapers);

        if (search) {
          const searchTerm = `%${search}%`;
          paperQuery = paperQuery.$dynamic().where(
            or(
              like(academicPapers.title, searchTerm),
              like(academicPapers.abstract, searchTerm),
              like(academicPapers.keywords, searchTerm),
              like(academicPapers.authors, searchTerm)
            )
          );
        }

        const papers = await paperQuery
          .orderBy(desc(academicPapers.publicationDate))
          .limit(Number(limit))
          .offset(offset);

        res.json(papers);
      } catch (error) {
        console.error('Error fetching papers:', error);
        res.status(500).json({ message: "Failed to fetch papers" });
      }
    });

    // Meeting slots API
    app.get("/api/slots", async (req, res) => {
      try {
        const { date } = req.query;
        let slotQuery = db.select().from(meetingSlots);

        slotQuery = slotQuery.$dynamic().where(eq(meetingSlots.isBooked, false));

        if (date) {
          const startOfDay = new Date(date as string);
          const endOfDay = new Date(date as string);
          endOfDay.setHours(23, 59, 59, 999);

          slotQuery = slotQuery.where(
            and(
              gte(meetingSlots.startTime, startOfDay),
              lte(meetingSlots.startTime, endOfDay)
            )
          );
        }

        const slots = await slotQuery.orderBy(asc(meetingSlots.startTime));
        res.json(slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
        res.status(500).json({ message: "Failed to fetch meeting slots" });
      }
    });

    // Book a meeting slot
    app.post("/api/bookings", async (req, res) => {
      try {
        const { slotId, name, email, topic } = req.body;

        if (!slotId || !name || !email || !topic) {
          return res.status(400).json({ message: "All fields are required" });
        }

        const result = await db.transaction(async (tx) => {
          const slot = await tx.query.meetingSlots.findFirst({
            where: and(
              eq(meetingSlots.id, slotId),
              eq(meetingSlots.isBooked, false)
            ),
          });

          if (!slot) {
            throw new Error("Slot not available");
          }

          await tx
            .update(meetingSlots)
            .set({ isBooked: true, updatedAt: new Date() })
            .where(eq(meetingSlots.id, slotId));

          const booking = await tx
            .insert(meetingBookings)
            .values({
              slotId,
              name,
              email,
              topic,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .returning();

          try {
            await sendMeetingConfirmation(
              email,
              name,
              slot.startTime,
              slot.endTime,
              topic
            );
          } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
          }

          return booking[0];
        });

        res.status(201).json(result);
      } catch (error) {
        console.error('Error booking slot:', error);
        const err = error as Error;
        if (err.message === "Slot not available") {
          res.status(400).json({ message: "This slot is no longer available" });
        } else {
          res.status(500).json({ message: "Failed to book meeting" });
        }
      }
    });

    log('Route registration completed successfully');
    return httpServer;
  } catch (error) {
    log(`Error during route registration: ${error}`);
    throw error;
  }
}