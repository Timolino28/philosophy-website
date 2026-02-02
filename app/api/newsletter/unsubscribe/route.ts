import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyUnsubscribeToken } from "@/lib/newsletterToken";

export async function GET(req: Request) {
    const DB_URL = process.env.DATABASE_URL;
    if (!DB_URL) {
        return NextResponse.json({ error: 'DATABASE_URL not configured' }, { status: 500 });
    }

    let url: URL

    try {
        url = new URL(req.url)
    } catch (error) {
        return NextResponse.json({ error: "Invalid request URL" }, { status: 400 })
    }

    const token = url.searchParams.get("token")

    if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 })
    }

    const decoded = verifyUnsubscribeToken(token)
    if (!decoded) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    const email = decoded.email

    await db
        .update(newsletterSubscribers)
        .set({
            status: "unsubscribed",
            unsubscribedAt: new Date()
        })
        .where(eq(newsletterSubscribers.email, email))

    return NextResponse.json({ ok: true }, { status: 200 })
}



