import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy";
  const pool = new pg.Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
