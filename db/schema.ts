import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------- AUTHORS ----------
export const authors = pgTable(
  "authors",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (t) => ({
    nameUq: uniqueIndex("authors_name_uq").on(t.name),
  })
);

// ---------- QUOTES ----------
export const quotes = pgTable(
  "quotes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    authorId: uuid("author_id")
      .notNull()
      .references(() => authors.id, { onDelete: "restrict" }),
    text: text("text").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (t) => ({
    authorIdx: index("quotes_author_id_idx").on(t.authorId),
  })
);

// --- ENUMS ---
export const newsletterSubscriberStatus = pgEnum("newsletter_subscriber_status", [
  "active",
  "unsubscribed",
]);

export const newsletterDeliveryStatus = pgEnum("newsletter_delivery_status", [
  "sent",
  "failed",
]);

// --- NEWSLETTER SUBSCRIBERS ---
export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    email: text("email").notNull(),
    status: newsletterSubscriberStatus("status").notNull().default("active"),

    // Optional, aber sehr empfehlenswert (für “08:00 lokale Zeit”):
    timezone: text("timezone").notNull().default("Europe/Berlin"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
  },
  (t) => ({
    emailUq: uniqueIndex("newsletter_subscribers_email_uq").on(t.email),
    statusIdx: index("newsletter_subscribers_status_idx").on(t.status),
  })
);

// --- NEWSLETTER DELIVERIES (Log) ---
export const newsletterDeliveries = pgTable(
  "newsletter_deliveries",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    subscriberId: uuid("subscriber_id")
      .notNull()
      .references(() => newsletterSubscribers.id, { onDelete: "cascade" }),

    quoteId: uuid("quote_id")
      .notNull()
      .references(() => quotes.id, { onDelete: "restrict" }),

    // Optional: wann geplant / welche “Ausgabe” (für Idempotenz)
    sentAt: timestamp("sent_at", { withTimezone: true }),
    status: newsletterDeliveryStatus("status").notNull().default("sent"),

    provider: text("provider").notNull().default("resend"),
    providerMessageId: text("provider_message_id"),
    error: text("error"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    subscriberIdx: index("newsletter_deliveries_subscriber_id_idx").on(t.subscriberId),
    quoteIdx: index("newsletter_deliveries_quote_id_idx").on(t.quoteId),
    sentAtIdx: index("newsletter_deliveries_sent_at_idx").on(t.sentAt),
    // Hilft später, um “nicht doppelt senden” zu prüfen (per Query):
    subscriberSentAtIdx: index("newsletter_deliveries_subscriber_sent_at_idx").on(
      t.subscriberId,
      t.sentAt
    ),
  })
);

// ---------- RELATIONS ----------
export const authorsRelations = relations(authors, ({ many }) => ({
  quotes: many(quotes),
}));

export const quotesRelations = relations(quotes, ({ one }) => ({
  author: one(authors, { fields: [quotes.authorId], references: [authors.id] }),
}));

export const newsletterSubscribersRelations = relations(
  newsletterSubscribers,
  ({ many }) => ({
    deliveries: many(newsletterDeliveries),
  })
);

export const newsletterDeliveriesRelations = relations(
  newsletterDeliveries,
  ({ one }) => ({
    subscriber: one(newsletterSubscribers, {
      fields: [newsletterDeliveries.subscriberId],
      references: [newsletterSubscribers.id],
    }),
    quote: one(quotes, {
      fields: [newsletterDeliveries.quoteId],
      references: [quotes.id],
    }),
  })
);

