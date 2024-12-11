import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
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

export const insertAcademicPaperSchema = createInsertSchema(academicPapers);
export const selectAcademicPaperSchema = createSelectSchema(academicPapers);
