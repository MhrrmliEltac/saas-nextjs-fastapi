# fastapi-nextjs-saas-app

Multi-tenant B2B SaaS starter — FastAPI backend + Next.js frontend. See [CLAUDE.md](./CLAUDE.md) for the full architecture and conventions.

## Prerequisites

- Python 3.12+ with [uv](https://docs.astral.sh/uv/)
- Node.js 20+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — only needed once real DB/Redis access is required (see [backend/README.md](./backend/README.md))

## Quick start

```bash
# backend — see backend/README.md for the full Docker/DB setup
cd backend
uv sync
uv run uvicorn app.main:app --reload   # http://localhost:8000/docs

# frontend
cd frontend
cp .env.example .env.local
npm install
npm run dev                             # http://localhost:3000
```

## Status

Foundation stage: repo scaffold, health endpoint, and marketing/auth/dashboard layouts. See the Build Roadmap in [CLAUDE.md](./CLAUDE.md) for what's next.
