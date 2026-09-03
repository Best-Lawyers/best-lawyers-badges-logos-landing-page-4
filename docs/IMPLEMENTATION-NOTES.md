# Implementation Notes

Everything a stakeholder or future build needs to know before this
page goes to production. The page is review-ready as shipped; each
item below is a deliberate open boundary, not an oversight.

## Integration boundaries (must close before launch)

1. Purchase endpoints. `CONFIG.purchase.lawyerUrl` and
   `CONFIG.purchase.firmUrl` in `index.html` are empty. The buy
   buttons render normally, stay inert, and log a console notice
   until the production checkout URLs are supplied. Captured
   campaign parameters are appended to those URLs automatically.
2. Pricing figures. `CONFIG.pricing` ships with placeholders:
   Lawyer $795 (no compare-at) and Firm $1,800 with a $2,400
   compare-at taken from the July 30 stakeholder call. Confirm both
   with the pricing owner. The struck-through compare-at should be
   a genuine former or standard list price; a fabricated anchor is
   a deceptive-pricing exposure, and this audience is lawyers. Set
   `compareAt: null` to remove the treatment entirely.
3. Message origin. `CONFIG.embed.targetOrigin` is `*` for review.
   Lock it to the Instapage parent origin at launch, and mirror the
   restriction in `netlify.toml` under `frame-ancestors`.
4. Licensed fonts. Optima (display) and Gentleman (body) load
   through `assets/fonts/fonts.css`. Drop in the licensed WOFF2
   files and uncomment the `@font-face` blocks. Fallback stacks are
   active until then.
5. Canonical URL and analytics. Add the canonical link tag and the
   approved analytics snippet before production. There is a marked
   comment in the head.

## Content sources and claims audit

- Hero, licensing rules, channel rules, approved and not-approved
  language, license term, ad approval address, and embargo note are
  taken from the Best Lawyers publicizing guidelines (supplied PDF
  and the live page at
  bestlawyers.com/methodology/publicizing-guidelines).
- Stats use the figures on the live public site today: 13M+
  confidential evaluations each year, about 5% of U.S. lawyers, 3%
  globally, 40+ years of Purely Peer Review. The supplied 2027
  materials cite 18M+ evaluations; swap the number in the stats row
  when those figures are public.
- Objection handling is built from the Gong badge-objection report:
  a-la-carte demand is answered in the pricing headline, event ROI
  in the year-strip section, referral reliance in the search-moment
  section, prestige dilution in the selectivity stats, and brand
  conflict in the lockup demo. No claim promises clients, revenue,
  or results, and nothing implies recognition can be bought.
- Names in mockups (Margaret Cole, Caldwell & Pierce LLP) are
  fictional. Badge imagery uses the supplied generic assets so the
  authentic artwork cannot be lifted from the page.

## Testing notes

- `npm run validate` enforces the copy and structure guardrails:
  no em or en dashes, no eyebrow patterns, banned words, required
  ids, alt text, and asset existence.
- The light theme is intentional. Treat dark versus light as the
  A/B test discussed on July 30; the Premier Placement page is the
  dark control.
- Reduced motion is fully supported. Every sequence has a static
  end state.
