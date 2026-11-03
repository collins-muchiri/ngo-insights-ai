# NGO AI Landing (MVP): Phase 1

This folder contains the Next.js frontend and API for the NGO AI Insights & Outreach platform focused on East Africa (Kenya).

## Core Features
- Lead Capture (via forms → /api/leads → PostgreSQL)
- Pricing Plans (PostgreSQL-backed via Prisma)
- Demo scheduling (Calendly embed) and WhatsApp chat button
- Blog/Insights scaffolding (ISR-ready for automated content)

## Tech Stack (MVP)
- Next.js 14 (React, TypeScript)
- PostgreSQL + Prisma ORM
- Tailwind CSS (prepared; existing CSS for MVP)
- Docker Compose for local development

## Local Development
1) Start PostgreSQL (Docker)
```bash
cd apps/web
docker-compose up -d   # starts Postgres on localhost:5432 (db ngo_ai)
```

2) Environment
```bash
cp env.example .env
# Edit DATABASE_URL to postgresql://postgres:pass@localhost:5432/ngo_ai
```

3) Install and initialize
```bash
npm install --legacy-peer-deps
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

4) Verify
- Open http://localhost:3000
- Submit a lead via /contact and check database
- Browse /pricing and confirm data appears

## Key Files
- pages/index.tsx (Landing)
- pages/pricing.tsx (Pricing)
- pages/demo.tsx (Demo + Calendly)
- pages/contact.tsx (Contact)
- pages/api/leads.ts (Lead capture API)
- prisma/schema.prisma (Lead, PricingPlan, BlogPost)
- prisma/index.ts (singleton Prisma client)
- prisma/seed.js (pricing data seed)
- docker-compose.yml (local Postgres)
- styles/globals.css (CSS/Tailwind ready)

## Next Steps
- Replace Calendly URL and WhatsApp link in DemoSection.tsx
- Seed pricing data and switch pricing page to DB read
- Add /blog ISR content stubs
- Tailwind CSS integration and component refactoring