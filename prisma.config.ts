import path from "node:path";
import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

dotenv.config();

/**
 * Prisma v7 config — connection URLs moved here from schema.prisma.
 * See https://pris.ly/d/config-datasource
 */
export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL!,
  },
  migrate: {
    url: process.env.DIRECT_URL!,
  },
});
