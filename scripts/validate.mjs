// Guardrail checks for the Badges and Logos landing page.
// Run: npm run validate
import { readFileSync, existsSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const errors = [];
const warn = [];

// Copy standards
if (/\u2014|\u2013/.test(html)) errors.push("Em dash or en dash found. House style forbids them.");
if (/eyebrow/i.test(html)) errors.push("The word 'eyebrow' appears. No eyebrow patterns allowed.");
if (/prominen/i.test(html)) errors.push("'Prominent' or 'prominence' appears. Banned copy.");
if (/Learn More/i.test(html)) errors.push("Ambiguous CTA label 'Learn More' found.");
const isBest = (html.match(/is a Best Lawyer/g) || []).length;
if (isBest !== 1) errors.push(`'is a Best Lawyer' should appear exactly once (the not-approved example). Found ${isBest}.`);

// Structure
["pricing", "badges", "usage", "licensing", "faq"].forEach((id) => {
  if (!html.includes(`id="${id}"`)) errors.push(`Missing required section id: ${id}`);
});
const sectionsOpen = (html.match(/<section\b/g) || []).length;
const sectionsClose = (html.match(/<\/section>/g) || []).length;
if (sectionsOpen !== sectionsClose) errors.push(`Unbalanced <section> tags: ${sectionsOpen} open, ${sectionsClose} close.`);

// Accessibility
const imgs = html.match(/<img\b[^>]*>/g) || [];
imgs.forEach((tag) => { if (!/\balt=/.test(tag)) errors.push(`Image missing alt text: ${tag.slice(0, 80)}`); });

// Assets referenced must exist
const refs = [...html.matchAll(/src="(assets\/[^"]+)"/g)].map((m) => m[1]);
[...new Set(refs)].forEach((p) => {
  if (!existsSync(new URL("../" + p, import.meta.url))) errors.push(`Referenced asset missing on disk: ${p}`);
});

// Integration boundaries still open
if (/lawyerUrl:\s*""/.test(html)) warn.push("CONFIG.purchase.lawyerUrl is not set (integration boundary).");
if (/firmUrl:\s*""/.test(html)) warn.push("CONFIG.purchase.firmUrl is not set (integration boundary).");
if (/targetOrigin:\s*"\*"/.test(html)) warn.push("CONFIG.embed.targetOrigin is '*'. Lock to the Instapage parent origin before production.");

warn.forEach((w) => console.log("WARN  " + w));
if (errors.length) {
  errors.forEach((e) => console.error("FAIL  " + e));
  process.exit(1);
}
console.log(`PASS  ${imgs.length} images checked, ${refs.length} asset references verified, section structure balanced.`);
