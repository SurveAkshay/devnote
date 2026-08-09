// Prisma 7 config. The datasource URL is configured here (not in
// schema.prisma) so the CLI can resolve it via DIRECT_URL — the
// non-pooled connection Neon needs for migrations.
//
// At runtime the app uses DATABASE_URL (Neon's pooled WebSocket endpoint)
// through the Neon driver adapter — see src/lib/prisma.ts.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
