import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/db";
import { quotes, authors } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
    const resend = new Resend(process.env.RESEND_API_KEY!);

    // 1 Random quote from db 
    const rows = await db.select({
        text: quotes.text,
        author: authors.name,
    }).from(quotes)
        .innerJoin(authors, eq(quotes.authorId, authors.id))
        .orderBy(sql`random()`)
        .limit(1);

    const quote = rows[0];

    if (!quote) {
        return NextResponse.json({ error: "No quote found" }, { status: 404 });
    }

    try {
        const result = await resend.emails.send({
            from: 'Philosophy <onboarding@resend.dev>',
            to: ['kordmann@web.de'],
            subject: "Quote of the day",
            text: `"${quote.text}"\n- ${quote.author}`,
        });

        return NextResponse.json({ ok: true, result });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

