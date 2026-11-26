# vexx-ui 2.1 — UI/UX redesign plan

**Product:** Vexx 2.1 (product `vexx`, current version `vexx2.1`) by **maya labs.**
**Source of truth for facts:** `github.com/sahil-gaikwad94/vexx` (`README.md`, `docs/2.1-release.md`).
**Goal:** a documentation + product site that feels like the engineering artefact it describes —
constraints snapping into a verified whole — not a generic component-kit landing page.

---

## 1. Reading the reference images (the direction)

| Reference | What actually makes it work | Translation for Vexx |
| :--- | :--- | :--- |
| 1 — blue hero | One saturated electric-blue field; oversized white claim; tiny pill nav + pill CTAs; a **cropped, stippled 3-D object** bleeding off the bottom edge; calm dot-free upper half | A cobalt hero field with a **cropped stippled interlocking-piece sculpture** rising from the lower edge. The piece is the decoded object; the missing tab is the illegal token. |
| 2 — dark dot field | Near-black canvas with an exact **dot grid**; lavender/white **pixel-wave masses** rising from both bottom corners; centred, short claim; two pill buttons | A single obsidian section for proof/benchmarks: dot grid + lavender pixel-wave, big short claim, no card grid. |
| 3 — framed editorial card | Warm grey page, one thick white rounded card holding the whole hero; serif-ish display type; **rounded marker swipes** on key words; faint dotted grid; card footer split into three hairline cells | The "how it works" / feature moment becomes one thick framed card on warm paper, with marker-highlighted headline words and a three-cell footer. |

Shared language: **oversized quiet type, tactile pills, stipple/pixel material, cropped geometry,
hairlines instead of shadows, and one loud visual per screen.**

## 2. Token system (revised)

```css
/* surfaces */
--vx-paper:   #f3f1ea;  /* warm page, from reference 3 */
--vx-white:   #ffffff;  /* the framed card */
--vx-night:   #0b0c11;  /* dot field, from reference 2 */
--vx-blue:    #2145ff;  /* electric field, from reference 1 */
--vx-blue-deep:#1024a8;
/* ink */
--vx-ink:     #16171b;
--vx-ink-2:   #555b67;
--vx-ink-3:   #858b97;
/* accents — used as highlighter swipes, never as gradients on text */
--vx-lilac:   #bdb9ff;
--vx-lime:    #d2f45b;
/* semantic verification */
--vx-pass:    #118a5b;
--vx-warn:    #c77a16;
--vx-fail:    #e0455b;
```
Dark mode: paper → `#0b0c11`, card → `#151822`, ink → `#f5f6fa`; cobalt hero stays cobalt in both
themes (it is a brand field, not a theme surface).

**Type:** Display = **Bricolage Grotesque Bold** (local font, deliberately non-default);
body = **Inter**; code/telemetry = **JetBrains Mono**.
Hero `clamp(2.75rem, 6.4vw, 5.4rem)/1.02`, H2 `clamp(2rem, 3.6vw, 3.1rem)`, body 16px/1.7.
Lowercase mono micro-labels; **no** all-caps eyebrows, **no** middle-dot meta strings, **no**
gradient text, no `→` appended to every link.

**Layout:**
- Floating pill nav (always visible), with `vexx` product lockup + small `maya labs.` attribution.
- Hero: blue field, left column copy + inline puzzle-piece toggle, right/bottom cropped stipple
  interlock artwork (SVG/PNG), pill CTAs, install chip, 4 quiet metric cells.
- Editorial card: framed white sheet on paper, marker-highlighted headline, interlock diagram on
  a faint dot grid, three-cell hairline footer.
- Dark dot-field section: lavender pixel-wave corners, short claim, 2.1 capability rows.
- Cartridges / bridges / use cases / benchmarks / docs / FAQ / CTA: quieter supporting surfaces,
  hairline-separated, one bold moment each.
- Docs: keep Fumadocs IA (sidebar, TOC, search); new cover treatment (lilac dot field), `vexx2.1`
  chip, code-engine group added.

**Principles:** (1) one loud moment per screen; (2) stipple = the material of tokens, masks and
proofs; (3) interlocking = verification; (4) markers and hairlines over gradients and shadows;
(5) version/repo/company metadata exact and consistent everywhere.

## 3. Critique before building

Checked against the generic-default list: rejected cream+terracotta+serif, rejected black+acid-green
single accent, rejected uniform SaaS cards, rejected all-caps eyebrows / middle dots / arrow-suffixed
links. Numbered markers appear only on the real 3-tier pipeline (a sequence). Motion is one
orchestrated hero snap plus action-driven transitions; no per-section fade-up.

## 4. Delivery checklist

- [x] Design tokens + typography in `src/app/vexx-theme.css` / `globals.css`
- [x] Original stippled interlock artwork (`design/interlocking-proof.md`, `design/interlock-proof.png`, `public/art/interlock-hero.svg`)
- [x] Hero, header, footer, editorial card, dot-field section, CTA rewritten
- [x] New effects: pointer-reactive stipple canvas, piece switch, chaos dial, magnetic CTA, scroll progress
- [x] `maya250M` + `MayaWorkbench` story added to hero, a dedicated section, docs and README
- [x] Supporting sections restyled; docs shell refreshed
- [x] Docs content: 2.1 release notes, installation from PyPI, new code-engine group
- [x] Metadata sweep: `vexx2.1`, `sahil-gaikwad94/vexx`, maya labs., Apache-2.0, `pip install vexx-ai`
- [x] Security pass: escaped JSON-LD injection sink, no secrets, no untrusted DOM sinks introduced
- [x] `npm run typecheck` passes; `next build` compiles and generates all 61 pages. Local build's final
  file-trace step errors on a `/proc/<pid>` symlink cycle in this sandbox; `next start` serves the
  generated build correctly. Desktop + mobile browser review: no console errors or horizontal overflow.
