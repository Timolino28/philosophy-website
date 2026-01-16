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

    // 1. Launch the browser
    const browser = await puppeteer.launch({ headless: true });

    // 2. Open a new page
    const page = await browser.newPage();

    // 3. Navigate to the website
    // Replace this with the actual URL you want to scrape
    const url = 'https://quotes.toscrape.com/';
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    // 4. Extract data
    const quotes = await page.evaluate(() => {
        // Select all the elements that contain the quotes.
        // CHANGE THIS SELECTOR to match your target website
        const quoteElements = document.querySelectorAll('.quote');

        return Array.from(quoteElements).map((element) => {
            // CHANGE THESE SELECTORS to match your target website
            const textElement = element.querySelector('.text');
            const authorElement = element.querySelector('.author');

            return {
                text: textElement?.textContent?.trim() || '',
                author: authorElement?.textContent?.trim() || 'Unknown',
            };
        });
    });

    console.log(`Found ${quotes.length} quotes. Saving to database...`);
    console.log(quotes);

    // 5. Save functionality
    // We loop through the scraped quotes and save them one by one
    for (const quote of quotes) {
        await saveQuote(quote);
    }


    // 6. Close the browser
    await browser.close();
    console.log('Scraping finished!');
    process.exit(0); // Exit the script explicitly
}

// Run the function
scrapeQuotes().catch((error) => {
    console.error('Error scraping quotes:', error);
    process.exit(1);
});
