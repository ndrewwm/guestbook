import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/server/database/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.SECRET_TURSO_DATABASE_URL!,
    authToken: process.env.SECRET_TURSO_AUTH_TOKEN!,
  },
});
