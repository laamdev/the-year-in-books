ALTER TABLE "books" DROP CONSTRAINT "books_year_unique";--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "version" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_version_unique" UNIQUE("version");