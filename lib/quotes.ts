import { db } from "@/db";
import { quotes, authors } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export type QuoteListItem = {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
};

export async function listQuotes(limit = 50): Promise<QuoteListItem[]> {
  const rows = await db
    .select({
      id: quotes.id,
      text: quotes.text,
      author: authors.name,
      createdAt: quotes.createdAt,
    })
    .from(quotes)
    .innerJoin(authors, eq(quotes.authorId, authors.id))
    .orderBy(desc(quotes.createdAt))
    .limit(limit);

  return rows;
}

export async function getAllQuotes(): Promise<QuoteListItem[]> {
  const rows = await db.select({
    id: quotes.id,
    text: quotes.text,
    author: authors.name,
    createdAt: quotes.createdAt,
  }).from(quotes).innerJoin(authors, eq(quotes.authorId, authors.id)).orderBy(desc(quotes.createdAt));

  return rows;
}