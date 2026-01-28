import crypto from "crypto";

const SECRET = process.env.NEWSLETTER_TOKEN_SECRET!;
if (!SECRET) throw new Error("Missing env: NEWSLETTER_TOKEN_SECRET")

function base64url(input: string) {
    return Buffer.from(input).toString("base64url")
}

function hmac(data: string) {
    return crypto.createHmac("sha256", SECRET).update(data).digest("base64url")
}

export function createUnsubscribeToken(email: string) {
    const normalized = email.toLowerCase().trim()
    const payload = JSON.stringify({
        e: normalized,
        iat: Date.now()
    })
    const p = base64url(payload)
    const sig = hmac(p)
    return `${p}.${sig}`
}

export function verifyUnsubscribeToken(token: string): { email: string } | null {
    const [p, sig] = token.split(".")
    if (!p || !sig) return null

    const expected = hmac(p)
    //time-safe compare
    const ok = expected.length === sig.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))

    if (!ok) return null

    try {
        const json = Buffer.from(p, "base64url").toString("utf8");
        const data = JSON.parse(json) as { e: string, iat: number }
        if (!data?.e) return null
        return { email: String(data.e) }
    } catch (error) {
        return null
    }
}