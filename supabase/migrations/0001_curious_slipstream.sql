CREATE TYPE "public"."newsletter_delivery_status" AS ENUM('sent', 'failed');--> statement-breakpoint
CREATE TYPE "public"."newsletter_subscriber_status" AS ENUM('active', 'unsubscribed');--> statement-breakpoint
CREATE TABLE "newsletter_deliveries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subscriber_id" uuid NOT NULL,
	"quote_id" uuid NOT NULL,
	"sent_at" timestamp with time zone,
	"status" "newsletter_delivery_status" DEFAULT 'sent' NOT NULL,
	"provider" text DEFAULT 'resend' NOT NULL,
	"provider_message_id" text,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"status" "newsletter_subscriber_status" DEFAULT 'active' NOT NULL,
	"timezone" text DEFAULT 'Europe/Berlin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"unsubscribed_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "newsletter_deliveries" ADD CONSTRAINT "newsletter_deliveries_subscriber_id_newsletter_subscribers_id_fk" FOREIGN KEY ("subscriber_id") REFERENCES "public"."newsletter_subscribers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "newsletter_deliveries" ADD CONSTRAINT "newsletter_deliveries_quote_id_quotes_id_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."quotes"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "newsletter_deliveries_subscriber_id_idx" ON "newsletter_deliveries" USING btree ("subscriber_id");--> statement-breakpoint
CREATE INDEX "newsletter_deliveries_quote_id_idx" ON "newsletter_deliveries" USING btree ("quote_id");--> statement-breakpoint
CREATE INDEX "newsletter_deliveries_sent_at_idx" ON "newsletter_deliveries" USING btree ("sent_at");--> statement-breakpoint
CREATE INDEX "newsletter_deliveries_subscriber_sent_at_idx" ON "newsletter_deliveries" USING btree ("subscriber_id","sent_at");--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_subscribers_email_uq" ON "newsletter_subscribers" USING btree ("email");--> statement-breakpoint
CREATE INDEX "newsletter_subscribers_status_idx" ON "newsletter_subscribers" USING btree ("status");