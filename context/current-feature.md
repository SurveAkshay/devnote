# Current Feature

Prisma + Neon PostgreSQL setup: initial schema with NextAuth models, indexes, and migrations

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

Set up Prisma ORM with Neon PostgreSQL (serverless) and create the initial schema based on the data models in @context/project-overview.md.

- Use Neon PostgreSQL (serverless) for both dev and prod branches
- Create the initial Prisma schema from the data models in @context/project-overview.md (this will evolve)
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Use Prisma 7 (has breaking changes — follow the upgrade guide)
- ALWAYS create migrations via `prisma migrate dev` — never `prisma db push` unless specified
- DATABASE_URL points at the dev branch during development; production uses a separate Neon branch

## Notes

<!-- Any extra notes -->

References:
- @context/features/database-spec.md
- @context/project-overview.md (initial data models in the Prisma schema draft)
- Prisma 7 upgrade guide: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Prisma + Postgres quickstart: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres

Gotcha: Neon's copy-paste connection strings include `channel_binding=require`.
The Prisma schema engine doesn't support SCRAM channel binding and fails with a
misleading `P1001: Can't reach database server` even when the host is reachable.
Strip it from `DIRECT_URL` (the CLI connection) — `DATABASE_URL` keeps it, since
the Neon driver adapter supports it. This will need doing again for the prod branch.

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-05-18: Initial setup of Next.js, Tailwind CSS, and Claude context setup
- 2026-05-21: Dashboard UI Phase 1 — shadcn/ui setup, dark mode by default, /dashboard route with top bar (search + new item) and sidebar/main placeholders
- 2026-05-21: Dashboard UI Phase 2 — collapsible sidebar (icon rail + mobile drawer) with color-coded item-type nav linking to /items/TYPE, favorite & recent collections, and user footer with settings; added "New collection" button to top bar; switched typography to Inter + JetBrains Mono
- 2026-05-21: Dashboard UI Phase 3 — main area with 4 stat cards (items, collections, favorite items/collections), pinned items, recent collections, and recent items; color-coded item/collection cards; shared item-type metadata module
- 2026-08-09: Prisma + Neon PostgreSQL setup — Prisma 7 (`prisma-client` generator, Neon driver adapter, config in prisma.config.ts), initial schema (NextAuth models, User with billing fields, Item, ItemType, Collection, ItemCollection join, Tag) with indexes and cascade deletes; init migration applied to the Neon dev branch via `migrate dev`; client singleton in src/lib/prisma.ts