import path from "node:path";
import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

dotenv.config();

const dbUrl =
  process.env.DATABASE_URL ||
  process.env.DIRECT_URL ||
  "postgresql://postgres:postgres@localhost:5432/postgres";

/**
 * Prisma v7 config — connection URLs defined here.
 * Fallback values prevent build crashes when env variables are not present.
 */
export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  datasource: {
    url: dbUrl,
  },
  migrate: {
    url: dbUrl,
  },
});

