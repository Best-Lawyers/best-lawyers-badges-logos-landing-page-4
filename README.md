# Best Lawyers | Badges and Logos Landing Page

Sales-enablement landing page for direct badge and logo licensing.
Transactional by design: pricing up top, one conversion action, and
the known customer objections answered inside the narrative before
they can surface. Static build, zero dependencies, iframe-safe, and
Instapage-ready using the same migration methodology as the Premier
Profile Placement page.

## Quick start

```
npm run dev        # serves at http://localhost:3000
npm run validate   # copy and structure guardrails
```

Or open the folder in VS Code and use any static server. There is
no build step. Deploy the folder as-is.

## Structure

```
index.html                      the entire page (CSS + HTML + JS)
assets/badges/                  supplied generic badge artwork, web-optimized
assets/brand/                   supplied white Best Lawyers logo
assets/fonts/fonts.css          Optima and Gentleman @font-face hook
netlify.toml                    headers incl. frame-ancestors
scripts/validate.mjs            guardrail checks
docs/INSTAPAGE-IFRAME-EMBED.html  paste-ready parent snippet
docs/IMPLEMENTATION-NOTES.md      open boundaries and claims audit
```

## Configuration

Everything changeable lives in `CONFIG` at the top of the script in
`index.html`:

- `pricing.lawyer` and `pricing.firm`: price and optional
  `compareAt`. When `compareAt` is set and higher than the price, it
  renders struck through with a small disclosure line. Placeholder
  figures ship in the file; confirm with the pricing owner and keep
  `compareAt` honest (a genuine former or standard list price).
- `purchase.lawyerUrl` and `purchase.firmUrl`: the checkout
  endpoints. Empty by default (integration boundary). Captured
  campaign parameters (utm_*, gclid, fbclid, msclkid) are appended
  automatically once set.
- `embed.targetOrigin`: lock to the Instapage parent origin at
  launch. Mirror it in `netlify.toml` under `frame-ancestors`.

The per-day figure in the ROI section is computed from the live
lawyer price, so the math always matches whatever is configured.

## Page architecture and motion languages

Each section carries its own purpose-built motion system. All
sequences play once, trigger on scroll, and respect
`prefers-reduced-motion` with complete static end states.

| Section | Job | Motion language |
| --- | --- | --- |
| Hero | State the offer, badges as the imagery | Cinematic settle with scroll parallax |
| Pricing | Convert; answer a-la-carte demand | Executive resolve: rules draw, price sharpens, compare-at strikes |
| Sponsorship vs badge | Neutralize event-ROI objection | Analytical fill: 365-day pip strips, precise counters |
| Referral search | Neutralize word-of-mouth objection | The search moment: typed query, result, mark settles |
| Badge wheel | Show the full family | The orbit: slow rotation, hover pause, drag, arrows |
| Integrity | Neutralize dilution and pay-to-play | Calm authority: counters, drawn divider, meaning-split statement |
| Where it works | Show approved channels with rules | Changing rooms: panes assemble, underline glides |
| What you receive | Asset-type clarity | Editorial stagger |
| Say it right | Compliance made easy | The proof sheet: gold checks, coral crosses |
| FAQ | Remaining objections | A document unfolding, one item at a time |
| Final CTA | Close | Stillness |

## Objection mapping (from the Gong report)

- "Can we just buy the badge?" is the pricing headline and FAQ #1.
- Event and conference ROI is reframed as 3 visible days vs 365.
- Referral reliance is reframed: referrals open the door, the mark
  verifies you when the client searches.
- Prestige dilution is answered with selectivity stats and the
  no-alterations discipline note.
- Firm-brand conflict is answered by the lockup demo: your identity
  leads, the mark verifies.

No copy promises clients, revenue, or outcomes. Nothing implies
recognition can be purchased or a ranking moved.

## Deploy and migrate

1. Push to a repo and connect to Netlify (publish directory `.`),
   or drag the folder into Netlify Drop.
2. Verify the deployed page standalone.
3. In Instapage, add an HTML widget and paste
   `docs/INSTAPAGE-IFRAME-EMBED.html`, replacing `NETLIFY_URL`.
   The snippet forwards campaign parameters into the iframe and
   resizes it from the page's height messages, so there are no
   nested scrollbars.
4. Close the items in `docs/IMPLEMENTATION-NOTES.md` before launch.
