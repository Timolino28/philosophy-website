import { NextResponse } from "next/server";
import { createUnsubscribeToken } from "@/lib/newsletterToken";

export async function GET() {
    const email = "test@example.com";
    const token = createUnsubscribeToken(email)
    return NextResponse.json({ email, token })
}

