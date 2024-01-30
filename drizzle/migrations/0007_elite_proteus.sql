DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('want_to_read', 'currently_reading', 'read');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "status" "status" DEFAULT 'want_to_read';