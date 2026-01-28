import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyUnsubscribeToken } from "@/lib/newsletterToken";

export async function GET(req: Request) {
    const url = new URL(req.url)
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



