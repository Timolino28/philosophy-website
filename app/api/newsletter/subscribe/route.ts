import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { eq } from "drizzle-orm";

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
    const body = (await req.json().catch(() => null)) as { email?: string; timezone?: string } | null;

    const email = body?.email?.trim().toLowerCase();
    const timezone = body?.timezone?.trim();

    if (!email || !isValidEmail(email)) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const existing = await db
        .select({ id: newsletterSubscribers.id, status: newsletterSubscribers.status })
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.email, email))
        .limit(1)

    if (existing[0]) {
        await db
            .update(newsletterSubscribers)
            .set({
                status: "active",
                timezone,
                unsubscribedAt: null,
            })
            .where((eq(newsletterSubscribers.email, email)))

        return NextResponse.json({ ok: true, status: "active" })
    }

    await db.insert(newsletterSubscribers).values({
        email,
        timezone,
        status: "active",
    })

    return NextResponse.json({ ok: true, status: "active" })
}


