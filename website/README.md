# Vexx UI

Official website, interactive WebAssembly playground and documentation portal for
[Vexx](https://github.com/sahil-gaikwad94/vexx) — solver-guided generation you can verify.

Current release: **vexx2.1**.

## Design System

**"Interlocking Proof"** — warm paper, one electric-cobalt field, one obsidian dot field.

- Surfaces: paper `#f3f1ea`, white card `#ffffff`, cobalt `#2145ff`, night `#0b0c11`.
- Accents: lavender `#bdb9ff` and lime `#d2f45b`, used as rounded highlighter swipes on key words.
  Cobalt, emerald, amber and crimson keep their verification meanings.
- Signature asset: a stippled interlocking-piece sculpture (`public/art/interlock-hero.svg`) rising
  from the lower edge of the hero, with a pointer-reactive canvas particle field over it.
- Motion: one orchestrated hero reveal, a puzzle-piece mode switch, a constraint "chaos dial" and
  a scroll progress hairline. All of it respects `prefers-reduced-motion`.
- Type: Bricolage Grotesque (display), Inter (body), JetBrains Mono (code and telemetry).

The tokens live in `src/app/vexx-theme.css`, imported by `src/app/globals.css`. The visual philosophy
and art source are in `../design/`.

## Ecosystem

The same engine also runs inside maya labs.' **maya250M** (a 250M-parameter coding and reasoning
model) and **MayaWorkbench** (AI research and engineering, P2C).

## Stack

Next.js 15 (App Router) · Fumadocs · Tailwind CSS v4 · Radix UI · Framer Motion · Shiki · KaTeX ·
Orama · `vexx-wasm` (WebAssembly).

## Local development

```bash
cd website
npm ci
npm run dev          # http://localhost:3000
npm run typecheck
npm run build
```

`npm run wasm:build` rebuilds the browser engine from `crates/vexx-wasm` and needs `wasm-pack` plus a
Rust toolchain. The site ships a deterministic stub worker so the playground still works without it.

## Deploy

Static/hybrid Next.js build, zero-cost friendly on Vercel or Render. `render.yaml` and `vercel.json`
are checked in; `NEXT_PUBLIC_SITE_URL` controls canonical URLs.
