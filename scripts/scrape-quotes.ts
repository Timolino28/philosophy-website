import { config } from 'dotenv';
config({ path: '.env' }); // Load environment variables from .env file

import puppeteer from 'puppeteer';
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { authors, quotes as quotesTable } from '@/db/schema'; // Import schemas
import { eq, and } from 'drizzle-orm';

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

// Defined the shape of the data we want to scrape
type Quote = {
    text: string;
    author: string;
};

// Helper function to save a quote to the database
async function saveQuote(quote: Quote) {
    if (!quote.text || !quote.author) return;

    try {
        // 1. Check if author exists
        const existingAuthors = await db
            .select()
            .from(authors)
            .where(eq(authors.name, quote.author))
            .limit(1);

        let authorId: string;

        if (existingAuthors.length > 0) {
            // Author exists, use their ID
            authorId = existingAuthors[0].id;
        } else {
            // Author doesn't exist, create new one
            const newAuthors = await db
                .insert(authors)
                .values({ name: quote.author })
                .returning({ id: authors.id });
            authorId = newAuthors[0].id;
            console.log(`Created new author: ${quote.author}`);
        }

        // 2. Check if quote exists
        const existingQuotes = await db
            .select()
            .from(quotesTable)
            .where(and(
                eq(quotesTable.text, quote.text),
                eq(quotesTable.authorId, authorId)
            ))
            .limit(1);

        let quoteId: string;

        if (existingQuotes.length > 0) {
            console.log(`Quote already exists...`);
            return;
        } else {
            const newQuotes = await db
                .insert(quotesTable)
                .values({ text: quote.text, authorId: authorId })
                .returning({ id: quotesTable.id });
            quoteId = newQuotes[0].id;
            console.log(`Created new quote: ${quote.text.substring(0, 20)}...`);
        }

        console.log(`Saved quote: "${quote.text.substring(0, 20)}..."`);

    } catch (error) {
        console.error(`Failed to save quote "${quote.text}":`, error);
    }
}

async function scrapeQuotes() {
    console.log('Starting scraper...');

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const allQuotes: Quote[] = [];

    // Loop through pages 1 to 3
    for (let i = 1; i <= 3; i++) {
        const url = `https://quotes.toscrape.com/page/${i}/`;
        console.log(`Navigating to ${url}...`);

        await page.goto(url, { waitUntil: 'networkidle2' });

        const quotesOnPage = await page.evaluate(() => {
            const quoteElements = document.querySelectorAll('.quote');

            return Array.from(quoteElements).map((element) => {
                const textElement = element.querySelector('.text');
                const authorElement = element.querySelector('.author');

                return {
                    text: textElement?.textContent?.trim() || '',
                    author: authorElement?.textContent?.trim() || 'Unknown',
                };
            });
        });

        console.log(`Found ${quotesOnPage.length} quotes on page ${i}.`);
        allQuotes.push(...quotesOnPage);
    }

    console.log(`Total quotes found: ${allQuotes.length}. Saving to database...`);
    // console.log(allQuotes); // Optional: if you want to see all quotes

    // Save functionality
    for (const quote of allQuotes) {
        await saveQuote(quote);
    }

    await browser.close();
    console.log('Scraping finished!');
    process.exit(0);
}

// Run the function
scrapeQuotes().catch((error) => {
    console.error('Error scraping quotes:', error);
    process.exit(1);
});
