import { relations } from "drizzle-orm"
import {
  bigint,
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 }).notNull().unique(),
  books_in_challenge_count: integer("books_in_challenge_count")
    .notNull()
    .default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  author: varchar("author", { length: 256 }).notNull(),
  cover: varchar("cover", { length: 256 }).notNull(),
  version: bigint("version", { mode: "number" }).notNull(),
  year: integer("year").notNull().default(0),
  pages: integer("pages").notNull().default(0),
  is_read: boolean("is_read").default(false).notNull(),
  challenge_id: integer("challenge_id"),
  created_at: timestamp("created_at").defaultNow().notNull(),
})

export const challengesRelations = relations(challenges, ({ many }) => ({
  books: many(books),
}))

export const booksRelations = relations(books, ({ one }) => ({
  challenge: one(challenges, {
    fields: [books.challenge_id],
    references: [challenges.id],
  }),
}))

export type Challenge = typeof challenges.$inferSelect
export type Book = typeof books.$inferSelect
