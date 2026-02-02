import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


// 1. Create a type-safe reference to the global object
const globalForDb = globalThis as unknown as {
    conn: postgres.Sql | undefined;
}

// 2. Check if the database URL is configured
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL not configured");
}

// 3. Reuse the existing connection if it exists, otherwise create a new one
const conn = globalForDb.conn ?? postgres(databaseUrl, { max: 1 })

// 4. In development, save the connection to the global object
// (In production, we want a fresh connection/pool every time the server starts)
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn

// 5. Export the drizzle instance using the perstistent connection
export const db = drizzle(conn)


