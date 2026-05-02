# LLM Ranking by ELO

A small web app for comparing LLM responses with pairwise human preference votes. Instead of trying to assign an absolute score to each answer, the app asks users to choose the better response and updates model rankings with an ELO-style system.

I built this as a practical way to evaluate subjective LLM output quality, especially when there is no single ground-truth answer.

## What It Does

- Shows two anonymized LLM responses side by side
- Records human preference votes
- Updates model scores with an ELO-style ranking system
- Provides a standings page for comparing model performance over time
- Uses a simple Next.js interface with Prisma-backed persistence

## Tech Stack

- Next.js
- React
- Prisma
- JavaScript
- Vercel

## Why This Matters

LLM evaluation is often messy. This project explores a lightweight version of preference-based evaluation, similar in spirit to the ranking workflows used when comparing model outputs, prompts, or product variants.

## Running Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.
