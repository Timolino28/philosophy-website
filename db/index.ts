import "server-only";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env" });

// 1. Create a type-safe reference to the global object
const globalForDb = globalThis as unknown as {
    conn: postgres.Sql | undefined;
}

// 2. Reuse the existing connection if it exists, otherwise create a new one
const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL!)

// 3. In development, save the connection to the global object
// (In production, we want a fresh connection/pool every time the server starts)
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn

// 4. Export the drizzle instance using the perstistent connection
export const db = drizzle(conn)


