CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"author" varchar(256) NOT NULL,
	"cover" varchar(256) NOT NULL,
	"year" integer DEFAULT 0 NOT NULL,
	"pages" integer DEFAULT 0 NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"challenge_id" integer,
	CONSTRAINT "books_year_unique" UNIQUE("year")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "challenges" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"book_count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "challenges_user_id_unique" UNIQUE("user_id")
);
