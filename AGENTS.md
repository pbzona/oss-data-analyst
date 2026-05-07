# AGENTS

## Runtime Shape
- This is a single-package Next.js app, not a monorepo.
- Main UI entry: `src/app/page.tsx` -> `src/components/chat/ChatLayout.tsx`.
- Main backend entry: `src/app/api/chat/route.ts` -> `src/lib/agent.ts`.
- Keep the chat route on `runtime = "nodejs"`; the current stack depends on `better-sqlite3` and the server-only webpack externals in `next.config.ts`.

## Verified Commands
- Required local setup before any verification: `nvm use 20` (repo has `.nvmrc` and `package.json` pins Node `>=20 <21`), then `pnpm install`.
- Dev server: `pnpm dev`.
- Lint: `pnpm lint`.
- Typecheck: `pnpm type-check`.
- Build: `pnpm build`.
- There is no root `test` script and no committed test files. If you add Vitest coverage, run it with `pnpm exec vitest` or `pnpm exec vitest path/to/file.test.ts`.

## Data + Schema Gotchas
- SQLite reads and writes `data/oss-data-analyst.db` via `src/lib/sqlite.ts`.
- `data/oss-data-analyst.db` is tracked in git. `pnpm initDatabase` recreates/reseeds sample data, so only run it when you intentionally want to modify that file.
- The sandboxed schema explorer uploads only `src/semantic/**/*.yml` to `/semantic` (`src/lib/tools/shell.ts`). `src/semantic/dimensions.json` is not available inside the sandbox tool path.
- The actual entity files are `src/semantic/entities/Company.yml`, `People.yml`, and `Accounts.yml`. Some README examples still show lowercase filenames; trust the real files.

## Current Code Path Boundaries
- The live chat flow is SQLite + Vercel Sandbox. Before changing Snowflake/config code, confirm the request path needs it.
- `src/config/*` and `src/services/snowflake_client.ts` are currently outside the `src/app/api/chat/route.ts` -> `src/lib/agent.ts` path.
