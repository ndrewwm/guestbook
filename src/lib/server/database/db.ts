import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { SECRET_TURSO_DATABASE_URL, SECRET_TURSO_AUTH_TOKEN } from "$env/static/private";

const client = createClient({
  url: SECRET_TURSO_DATABASE_URL,
  authToken: SECRET_TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);
