# Arlind Minushi — Portfolio (Next.js)

A single-page portfolio built with the **Next.js App Router**, TypeScript, and React 19.
Originally a Claude Design export (`.dc.html` + vanilla JS); now a real Next.js application.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx          Root layout — fonts (next/font), <html>/<body>, metadata
  page.tsx            Renders <Portfolio/>
  globals.css         Reset, scrollbar, keyframes, theme tokens (.root CSS vars)
components/
  Portfolio.tsx       Client root: theme wrapper + scroll-progress bar + all sections
  usePortfolioEffects.ts  Imperative effects (reveals, sticky nav, hero parallax,
                          scroll progress, capability accordion, cursor trail, hover)
  Nav, HomeHero, Intro, MarqueeTop, Capabilities, Work, Experience, Companies,
  About, Credentials, Gallery, AskAI, MarqueeBottom, Contact   (one per section)
lib/
  data.ts             Content for the data-driven sections (companies, work,
                      experience, capabilities, gallery)
public/uploads/       Images (portrait, gallery, company logos)
legacy/               The original static index.html + app.js (kept for reference)
```

## Notes on the conversion

- **Fonts** are self-hosted via `next/font/google` (Space Grotesk, Instrument Serif,
  JetBrains Mono), exposed as CSS variables (`--font-space-grotesk`, etc.). No external
  Google Fonts request at runtime.
- **Styling** is preserved from the original as inline JSX `style` objects plus the global
  keyframes/theme tokens in `globals.css`. The accent colour lives in one place —
  `--accent` in `app/globals.css` (`.root`).
- **Interactivity** that was imperative DOM code is now a single client hook
  (`usePortfolioEffects`) plus genuinely stateful React components (e.g. `Companies`).
  Hover states use a `data-style-hover="…"` attribute applied by that hook.
- **Images** use plain `<img>` with `/uploads/...` paths (the layout relies on CSS sizing).
  Swap to `next/image` later if you want automatic optimization.

## Changing the accent colour

Edit `--accent` in `app/globals.css` (currently `#0E7C86`). Every accent element reads
`var(--accent)`, so one change re-themes the whole page.

## SEO

The app uses the App Router's SEO features end to end:

- **Metadata API** (`app/layout.tsx`) — title + template, description, keywords, authors,
  canonical, Open Graph (`profile`), Twitter cards, robots directives, `viewport` theme-color.
- **Structured data** — Schema.org JSON-LD (`Person` + `WebSite` + `ProfilePage`) in `app/page.tsx` / `lib/structured-data.ts`.
- **Generated assets via `next/og`** — `app/opengraph-image.tsx`, `app/twitter-image.tsx`
  (1200×630), `app/icon.tsx` + `app/apple-icon.tsx`, plus a static `app/favicon.ico` fallback.
- **File conventions** — `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.
- **Core Web Vitals** — hero is `next/image` with `priority` (LCP); gallery/about images are
  `next/image` (AVIF/WebP + responsive `srcset`, lazy); explicit dimensions avoid CLS.
- **Semantics/a11y** — `<main>` landmark, skip link, labelled nav, `aria-controls`/`aria-label`,
  reduced-motion guard, security headers in `next.config.mjs`.

### Domain

Absolute URLs (canonical, OG/Twitter images, JSON-LD `@id`s, sitemap) default to
**https://arlindminushi.com** (set in `lib/site.ts`), so no configuration is needed in
production. To override locally, set `NEXT_PUBLIC_SITE_URL` (see `.env.example`).
