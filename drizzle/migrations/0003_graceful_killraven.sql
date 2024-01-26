ALTER TABLE "books" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;