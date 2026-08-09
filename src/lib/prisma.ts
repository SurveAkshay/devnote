// Prisma client singleton for the DevNote app.
//
// Prisma 7 specifics:
//   - PrismaClient is imported from the generator output (see
//     prisma/schema.prisma), not from "@prisma/client".
//   - A driver adapter is required. We use PrismaNeon over Neon's pooled
//     WebSocket endpoint (DATABASE_URL). The non-pooled DIRECT_URL is
//     reserved for the Prisma CLI (migrations) via prisma.config.ts.
//
// The global cache prevents Next.js dev hot-reload from spinning up a
// new client on every request.
import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createClient = () => {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL,
  });
  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
