ALTER TABLE "books" ADD COLUMN "is_read" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "books" DROP COLUMN IF EXISTS "completed";