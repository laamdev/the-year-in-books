ALTER TABLE "challenges" ADD COLUMN "books_in_challenge_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" DROP COLUMN IF EXISTS "book_count";