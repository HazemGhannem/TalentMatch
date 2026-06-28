# TalentMatch

AI-powered CV and job match analyzer. Paste a job description, upload your CV, and get a match score, strengths, gaps, an apply recommendation, and a fully rewritten CV — in under ten seconds.

## What it does

- **Match scoring** — Gemini 2.5 Flash compares your CV against the job description and returns a score from 0 to 100
- **Apply recommendation** — predicts whether the role is worth applying for based on overall fit
- **Strengths & gaps** — specific bullet points on what your CV covers well and what it's missing
- **CV rewriter** — restructures and rephrases your CV to target the role, with layout selection (Modern, Classic, Minimal, Tech)
- **PDF export** — one-click download with clean typography and proper page-break handling

## Tech stack

- Next.js 15 (App Router)
- Google Gemini 2.5 Flash — structured JSON output via `responseSchema`
- TypeScript
- jsPDF
- react-circular-progressbar
- Tailwind CSS

## Getting started

```bash
npm install
```

Copy the example env file and add your Gemini API key:

```bash
cp .env.example .env.local
```

```env
GEMINI_API_KEY=your_key_here
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

app/

api/analyze/     → POST endpoint — parses CV, calls Gemini, returns structured result

page.tsx         → main page

components/

input/           → JobDescriptionInput, CVUpload

results/         → ResultsPanel, ScoreCard, StrengthsList, GapsList, RewrittenCV

ui/              → Button, Navbar

hooks/

useAnalysis.ts   → all fetch logic and state, extracted from the page

lib/

gemini.ts        → Gemini client, prompt builder, response schema

downloadCV.ts    → jsPDF generation

types.ts         → shared TypeScript types

## Links

- [Live demo](https://talent-match-omega.vercel.app/)
- [LinkedIn](https://www.linkedin.com/in/hazem-ghannem-6058b71a6/)
