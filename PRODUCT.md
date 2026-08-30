# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **owner-operators of small, independent med spas / aesthetics clinics** (often the practitioner themselves — a nurse, GP, or aesthetician running a solo or 1–3 person practice). They are time-poor, hands-on, and lean non-technical. They run day-to-day operations manually across several disconnected tools (a booking platform, DMs, a spreadsheet, paper) and feel the chaos but haven't systemised it.

Situation on arrival: most reach this page by **clicking a link inside a cold email or Instagram DM** from Solis's outreach — so they arrive on mobile, mid-day, mildly skeptical, giving the page a few seconds to prove it understands their world before they bounce. They are evaluating "what is this and is it worth a reply / a call?", not shopping with intent.

## Product Purpose

The landing page's single job is to **convert a skeptical, time-poor clinic owner into one action: booking a call or completing the free systems audit.** It exists to make a solo founder's cold outreach land — turning "who is this?" into "this person gets my problems, I'll take the audit / book the call." Success = a booked call or a completed audit submission, not time-on-page or vanity engagement.

## Positioning

Solis builds the **backend operational systems and automations that sit behind a clinic's existing tools** — the layer that removes manual bottlenecks (slow lead response, no-shows, repetitive admin, no clear numbers). It is deliberately **not** another booking platform or off-the-shelf CRM: the mechanism is bespoke systems + automations + (increasingly) a custom dashboard, configured to how that specific clinic runs. The approach is **data/audit-first and consultative** — understand and quantify the clinic's real leaks before proposing anything — which a product-led SaaS competitor can't truthfully copy.

## Operating Context

- Traffic arrives almost entirely via **1:1 cold outreach** (email + Instagram DM), one prospect at a time — not paid ads or organic search. The page is the credibility/"what I actually build" backstop referenced in those messages, not a standalone funnel.
- Must work **mobile-first** and **for a link-clicker who was not searching for this**.
- Two real conversion actions exist on the page: **book a call** (Calendly embed) and the **free 12-question systems audit** (writes to Supabase). The audit doubles as Solis's pain-discovery/validation instrument.
- The reader's world is aesthetics/med-spa operations; the page must speak to their specific pains (enquiry response speed, no-shows leaving gaps, manual reminders/follow-ups, no visibility on which treatments/channels make money).

## Capabilities and Constraints

- Stack: **TanStack Start + Vite** (NOT Next.js), deployed on **Vercel**, custom domain **solisacquisition.com** with security headers; the audit persists to **Supabase** (anon insert-only, verified working end-to-end). Code lives at `C:\Solis Acquisition\Solis Acquisition\dev\solis-lovable` — this IS the live site, not archived. (CORRECTED AGAIN 2026-08-29 — this file was WRONGLY moved into `solis-site`/Next.js earlier the same day, based on a curl check that only confirmed WHAT was deployed, not what was CORRECT. The Next.js version deployed to production for 20+ days was an incomplete, wrong-themed (dark instead of light) rebuild that silently replaced the real site. `solis-lovable` has been redeployed as the real live site. `solis-site` is the dead/archived one — do not confuse the two. See memory `project_solis_site_rebuild` for the full incident — do not repeat the "whatever curl finds live must be canonical" mistake.)
- Existing sections: hero → problem → what we build → how it works → who this is for → testimonials → 12-question audit → book-a-call → footer. Nav scroll and section anchoring are custom (buttons, not hash anchors — see repo history).
- Built and run by a **solo, validation-phase founder with no budget for paid tooling** — every choice must stay at/near £0 and be maintainable by one non-specialist person.

## Brand Commitments

- Name: **Solis** (full: **Solis Acquisition**). Footer line: "© 2025 Solis Acquisition."
- Logo/mark: a **rounded electric-blue tile with a white "S."**
- Meta/positioning line already shipped: "**Backend Systems for Clinics & Service Businesses**"; internal ethos line used on-page: "Built with intention, driven by results."
- Voice: **consultative, honest, specific, no hype** — leads with understanding the client's problem and collecting real data, never a hard "I build X" pitch (Ronnie has explicitly rejected salesy framing). Credibility comes from clarity and getting their world right, not from bravado.
- Visual identity in use: electric blue `#2563EB`, warm off-white/cream ground, near-black ink, Inter typeface. (Recorded as an existing constraint, not a new visual direction.)

## Evidence on Hand

- Live product: **https://solisacquisition.com** (the page itself is the primary asset).
- The **12-question audit** is real and functional (verified Supabase inserts).
- **No paying clients yet — Solis is in the validation phase.** Any testimonials/quotes currently rendered on the page must be treated as **illustrative/placeholder unless Ronnie confirms a real source**; future work must **not** present them as verified proof and must **not fabricate** testimonials, client names, metrics, case studies, or logos. [Confirm-with-Ronnie: are the on-page testimonials real, placeholder, or to be removed?]
- First real prospect referenced in outreach: Dr Ash Health & Aesthetics (context only, not a client).

## Product Principles

1. **Audit/data-first, never salesy.** Lead with understanding and quantifying the clinic's problem; the offer is a free audit, not a pitch.
2. **Earn trust through honesty, not proof he doesn't have yet.** No fabricated clients, metrics, or testimonials — a solo founder wins on specificity and clarity, not borrowed credibility.
3. **Speak the clinic owner's world.** Frame everything in their concrete pains (lead response, no-shows, admin, visibility), not agency jargon.
4. **One decision per visit.** Every section should move a distracted, skeptical mobile reader toward a single next action (audit or call).
5. **Solo-maintainable and free.** Nothing that requires ongoing spend or specialist upkeep.

## Accessibility & Inclusion

Mobile-first is a hard requirement (most visitors arrive from a phone via DM/email links). General web accessibility (legible contrast on the cream ground, keyboard-operable controls, real focus states) applies; no clinic-specific standard has been established.
