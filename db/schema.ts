import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const academicPapers = pgTable("academic_papers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authors: text("authors").notNull(),
  abstract: text("abstract").notNull(),
  publicationDate: timestamp("publication_date").notNull(),
  venue: text("venue").notNull(), // conference or journal name
  pdfUrl: text("pdf_url").notNull(),
  keywords: text("keywords").notNull(), // comma-separated keywords
  citations: integer("citations").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages);
export const selectMessageSchema = createSelectSchema(messages);

export const meetingSlots = pgTable("meeting_slots", {
  id: serial("id").primaryKey(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  isBooked: boolean("is_booked").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const meetingBookings = pgTable("meeting_bookings", {
  id: serial("id").primaryKey(),
  slotId: integer("slot_id").references(() => meetingSlots.id).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  topic: text("topic").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertAcademicPaperSchema = createInsertSchema(academicPapers);
export const selectAcademicPaperSchema = createSelectSchema(academicPapers);

export const insertMeetingSlotSchema = createInsertSchema(meetingSlots);
export const selectMeetingSlotSchema = createSelectSchema(meetingSlots);

export const insertMeetingBookingSchema = createInsertSchema(meetingBookings);
export const selectMeetingBookingSchema = createSelectSchema(meetingBookings);
