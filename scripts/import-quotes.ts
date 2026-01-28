import { config } from 'dotenv';
config({ path: '.env' }); // Load environment variables from .env file

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import fs from "node:fs";
import { authors, quotes } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

type InputQuote = {
    author: string;
    text: string
}

async function getOrCreateAuthorId(nameRaw: string) {
    const name = nameRaw.trim();

    const existingAuthor = await db.select({ id: authors.id }).from(authors).where(eq(authors.name, name)).limit(1)

    if (existingAuthor[0]) return existingAuthor[0].id

    const insertAuthor = await db.insert(authors).values({ name }).returning({ id: authors.id })
    return insertAuthor[0].id
}

//handling SIGINT (ctrl + c)
process.on("SIGINT", async () => {
    console.log("Interrupted. Closing database connection...")
    await client.end()
    process.exit(0)
})

async function main() {
    try {
        const filePath = process.argv[2]
        if (!filePath) throw new Error("Usage: tsx scripts/import-quote.ts ./quotes.json")

        const input = JSON.parse(fs.readFileSync(filePath, "utf-8")) as InputQuote[]
        let inserted = 0

        for (const item of input) {
            const authorId = await getOrCreateAuthorId(item.author)

            const existingQuote = await db.select({ id: quotes.id }).from(quotes).where(and(eq(quotes.authorId, authorId), eq(quotes.text, item.text))).limit(1)

            if (existingQuote[0]) continue

            await db.insert(quotes).values({ authorId, text: item.text.trim() })
            inserted++
        }
        console.log(`Import done. Inserted quotes: ${inserted}`)
    } finally {
        await client.end()
        console.log("🔌 DB connection closed.");
    }
}

main().catch((e) => {
    console.error("❌ Error importing quotes:", e);
    process.exit(1)
})
