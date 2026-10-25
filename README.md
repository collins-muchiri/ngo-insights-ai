# NGO AI Platform — East Africa (Kenya)

A professional, high-performance website and AI-powered automation suite for NGOs and donor-funded startups in East Africa.

## Core Principles
- Clarity > Speed
- Trust > Hype
- Usefulness > Intelligence signaling
- Human-in-the-loop outreach (no automated messaging)

## Features
- NGO Research Brief Generation (5-section, 1-page, bullet-only format)
- Lead Discovery & Shortlisting from allowlisted compliant sources only (NGO
  registration registers, IATI, ReliefWeb, public org sites) - see
  docs/COMPLIANT_SOURCES.md; LinkedIn harvesting is prohibited by this project's
  own compliance policy and is blocked in code (src/source_allowlist.py)
- Outreach Message Drafting (WhatsApp/LinkedIn/email DRAFTS): a named human must
  approve and send; automated outreach fails closed in src/outreach_gate.py
- Public website showcasing capabilities (pricing, demo, blog/insights)

## Tech Stack
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Node.js + Express
- Database: PostgreSQL (structured data for leads, briefs, pricing)
- AI/NLP: Python + LangChain + OpenAI API
- Scraping/Discovery: BeautifulSoup4 + Selenium
- Scheduling/Orchestration: Airflow or Prefect
- Messaging: Twilio WhatsApp API (human sends)
- Hosting: Vercel (frontend), Render/AWS/GCP (backend), Cloudflare CDN
- Storage: S3-compatible for briefs and cache

## Project Structure
```
apps/web/                 # Next.js 16 (pages router) + Prisma frontend
├─ pages/                 # index, product, pricing, demo, contact, checkout
│  ├─ blog/               # index + [slug] (SSG with fallback content)
│  └─ api/                # leads.ts, pricing.ts
├─ components/            # Navbar, Hero, FeatureGrid, PricingCard, DemoSection
├─ prisma/                # schema.prisma, index.ts (singleton), seed.js
├─ styles/globals.css     # Tailwind globals
├─ eslint.config.mjs      # ESLint 9 flat config (eslint-config-next 16)
└─ docker-compose.yml     # Local Postgres

src/                      # Python compliance core (fail-closed by design)
├─ outreach_gate.py       # human-in-the-loop gate + JSONL audit log
└─ source_allowlist.py    # governed source list; LinkedIn prohibited

tests/                    # pytest suite for src/ (wired into CI)
automation/               # scrapers + processors (own requirements.txt; see
                          # automation/data/CORRECTIONS.md for data caveats)
docs/                     # COMPLIANT_SOURCES, PRIVACY_NOTE, BRIEF_QUALITY_EVAL
```

## Phase 1 MVP (2 weeks)
- Website with clean landing, pricing, demo/contact, and lead capture
- PostgreSQL + Prisma for leads and pricing data
- Calendly embed and WhatsApp chat button (no automated outreach)
- Mobile-first, fast performance, SEO basics
- Professional branding placeholders

## Phase 2 Brief Generator (2–3 weeks)
- Python/LangChain pipeline to ingest reports, surveys, sites
- UI for upload and preview
- 5-section bullet-only brief output (PDF/HTML/plain)

## Phase 3 Lead Discovery (2–3 weeks)
- Compliant-source discovery per docs/COMPLIANT_SOURCES.md (registration registers, IATI, ReliefWeb, public org sites). No LinkedIn harvesting: prohibited by policy and blocked in code
- Curated shortlist dashboard
- CSV/CRM export

## Phase 4 Outreach Drafting (1–2 weeks)
- WhatsApp, LinkedIn, email drafts (human sends)
- Dashboard for review and history

## Phase 5 Integrations & Analytics (1–2 weeks)
- Optional CRM sync (HubSpot/Salesforce)
- GA4 + Hotjar with consent banner
- Performance polish, accessibility audit

## Local Development

1) Prerequisites
- Node.js 18+, npm 8+, Docker (optional)

2) Quick start
```bash
# 1. Clone and install
cd apps/web && npm install --legacy-peer-deps

# 2. Start a local Postgres (Docker)
docker-compose up -d  # from apps/web or repo root

# 3. Configure environment
cp env.example .env
# Edit DATABASE_URL to match your DB (default: postgresql://postgres:pass@localhost:5432/ngo_ai)

# 4. Database and client
npx prisma generate
npx prisma migrate dev --name init
npm run dev

# 5. Seed pricing (optional)
node apps/web/prisma/seed.js
```

3) Verification
- Open http://localhost:3000
- Submit a lead via /contact → check PostgreSQL table
- Browse /pricing to confirm data appears

## Deployment (Production)
- Frontend: Vercel (git branch: main)
- Backend: Render/AWS/GCP (DB + API)
- Database: Managed PostgreSQL (Render PostgreSQL or AWS RDS)
- CDN/DNS: Cloudflare
- Secrets: Environment variables only; never in code

## Compliance & Ethics
- No automated outbound messages
- Respect rate limits and robots.txt
- Consent banner for data collection
- Encrypted PII at rest; minimal retention

## Support
- Issues: Use GitHub issues in this repo
- Documentation: README in this file and apps/web/README.md
- Contact: via /contact form or site README

---

Next steps
- Implement Phase 1 MVP locally
- Add Calendly URL and WhatsApp number in DemoSection.tsx (replace placeholders)
- Prepare Tailwind integration (optional) and brand assets
- Plan backend and automation phases after MVP is stable