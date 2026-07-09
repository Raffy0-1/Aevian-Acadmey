import path from "node:path";
import { defineConfig } from "prisma/config";

/**
 * Prisma v7 config — connection URLs moved here from schema.prisma.
 * See https://pris.ly/d/config-datasource
 */
export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  migrate: {
    url: process.env.DATABASE_URL!,
  },
});
