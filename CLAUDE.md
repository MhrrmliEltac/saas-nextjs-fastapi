# CLAUDE.md — Python + Next.js SaaS Application

This file guides AI coding assistants working in this repository. Follow these conventions strictly.

## Project Overview

A multi-tenant B2B SaaS application for **HR management (HRM)** — employees, departments, attendance, leave, payroll, performance reviews, and recruitment:
- **Backend:** Python 3.12, FastAPI (async), SQLAlchemy 2.0 (async), PostgreSQL 16, Redis, Alembic migrations
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form + Zod, Zustand
- **Billing:** Stripe subscriptions (Free / Pro / Enterprise) with webhooks + Customer Portal
- **Infra:** Docker Compose for local dev, GitHub Actions CI, Sentry for errors

## Repository Layout (monorepo)

```
backend/
  app/
    main.py            # FastAPI entry point
    core/               # config.py (pydantic-settings), security.py (JWT, argon2), database.py (async engine)
    models/             # SQLAlchemy models: user.py, organization.py, subscription.py, membership
    schemas/             # Pydantic v2 schemas (request/response)
    api/
      deps.py           # DI: get_db, get_current_user, get_current_org, require_pro_plan
      v1/                # Routers: auth.py, users.py, billing.py, ...
    services/            # Business logic (keep routers thin)
    workers/              # Background tasks (Celery/ARQ): email, reports, webhook processing
  alembic/                # Migrations
  tests/                  # pytest (async)
  pyproject.toml          # Managed with uv
  Dockerfile
frontend/
  app/
    (marketing)/         # Landing, pricing — public, SSR/SSG
    (auth)/               # login, register — public
    (dashboard)/          # Protected routes; auth check in layout.tsx
  components/             # shadcn/ui based
  lib/                    # api.ts (fetch client with JWT + refresh), auth.ts
docker-compose.yml         # postgres:16 + redis:7
.github/workflows/         # lint → test → migrate → deploy
```

## Commands

```bash
# Start local infra
docker compose up -d

# Backend (from backend/)
uv sync                                   # install deps
uv run uvicorn app.main:app --reload      # dev server :8000 (Swagger at /docs)
uv run pytest                             # tests
uv run ruff check . && uv run ruff format .
uv run alembic revision --autogenerate -m "msg"
uv run alembic upgrade head

# Frontend (from frontend/)
npm install
npm run dev                               # :3000
npm run lint
npm run build
```

## Architecture Rules (non-negotiable)

1. **Tenant isolation:** Every business table has `organization_id`. Every query MUST filter by it. Enforce via the `get_current_org` dependency — never trust client-supplied org IDs.
2. **Thin routers, fat services:** Routers in `api/v1/` only handle HTTP concerns (parsing, status codes). Business logic lives in `services/`.
3. **Async everywhere in backend:** async SQLAlchemy sessions, async endpoints. No blocking calls in request handlers — offload to workers.
4. **Schemas ≠ models:** Never return SQLAlchemy models directly; always map to Pydantic response schemas. Never accept raw dicts; validate with Pydantic.
5. **UUIDs for all primary keys.** Timestamps: `created_at`/`updated_at` on every table, timezone-aware (UTC).
6. **Migrations:** Any model change requires an Alembic migration in the same PR. Never edit applied migrations.
7. **Frontend data fetching:** Server Components for initial load where possible; TanStack Query for client-side mutations/revalidation. All API calls go through `lib/api.ts` — no ad-hoc `fetch`.
8. **Types from OpenAPI:** Regenerate TS types (`openapi-typescript`) after backend schema changes; don't hand-write API types.

## Auth

- JWT: short-lived access token (30 min, `Authorization: Bearer`), refresh token (httpOnly cookie, 14 days), `/api/v1/auth/refresh` rotation.
- Passwords hashed with **argon2** (passlib). Never log or return password fields.
- Email verification required before full access (`is_verified`).
- Roles per membership: `owner | admin | member`. Authorization checks in dependencies, not inline in routers.
- Rate limit auth endpoints (slowapi + Redis): login max 5/min per IP.

## Billing (Stripe)

- Plans: `free` (no card), `pro` (monthly/annual via Checkout), `enterprise` (manual).
- One Stripe Customer per **organization** (not per user); store `stripe_customer_id` on organizations.
- Webhook endpoint `/api/v1/billing/webhook` MUST verify signatures (`stripe.Webhook.construct_event`) and be idempotent. Handle at minimum:
  - `checkout.session.completed` → activate subscription
  - `invoice.payment_failed` → set `past_due`, send email
  - `customer.subscription.deleted` → downgrade to free
- Feature gating via `require_pro_plan` dependency — HTTP 402 on free plan.
- Card management/cancellation → Stripe Customer Portal (don't build custom UI).

## Security Checklist (apply to every change)

- CORS restricted to the frontend origin only.
- No raw SQL; if unavoidable, parameterize.
- No secrets in code — use env vars: `SECRET_KEY`, `DATABASE_URL`, `REDIS_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `FRONTEND_URL`. Keep `.env.example` updated.
- Never expose internal IDs of other tenants; 404 (not 403) for cross-tenant resource access.
- Sentry on both backend and frontend.

## Testing

- Backend: pytest + httpx `AsyncClient`; each test gets a rolled-back transaction or fresh test DB. Cover: auth flows, tenant isolation (user A cannot read org B's data — required test for every new resource), Stripe webhook handlers (mock Stripe).
- Frontend: type-check (`tsc --noEmit`) and lint must pass; component tests optional for now.
- CI must be green before merge: ruff, pytest, eslint, tsc, `alembic upgrade head` against a scratch DB.

## Code Style

- Python: ruff (lint + format), type hints everywhere, no `Any` unless justified.
- TypeScript: strict mode, no `any`, named exports.
- Commits: conventional commits (`feat:`, `fix:`, `chore:`...). Small, focused PRs.
- Comments/docstrings in English; user-facing UI text in Azerbaijani (prepare for i18n via a translations file — no hardcoded strings in components).

## Build Roadmap (work in this order)

1. **Foundation:** repo scaffold, docker-compose, CI, config, health endpoint, Next.js layouts (marketing/auth/dashboard groups).
2. **Auth:** User model + migration, register/login/refresh/verify-email, frontend auth pages + protected dashboard layout.
3. **Tenancy:** Organization, Membership, invites; org switcher in UI; `get_current_org` dependency.
4. **Billing:** Stripe products/prices, checkout endpoint, webhooks, portal link, plan gating.
5. **Core product features** (defined separately), background workers, admin panel.
6. **Polish:** onboarding, empty states, analytics, docs.

When implementing a step, do not skip ahead; keep each PR deployable.
