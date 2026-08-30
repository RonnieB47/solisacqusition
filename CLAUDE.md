# solis-lovable — THIS IS THE LIVE SITE

**This folder is the real, deployed source for solisacquisition.com.**
Confirmed 2026-08-29: the domain was found pointed at the wrong Vercel
project (the `solis-site` folder, a dead rebuild attempt) and has been
repointed here, to `solis-lovable`, the correct/original project.

- `solis-site` (now moved to `dev/_archive/solis-site`) is **archived,
  dead — do not use it for anything.** Do not edit it expecting it to
  affect the live site. Do not treat its SPEC.md or PRODUCT.md as current —
  they describe a different, non-live build.
- Any future "the live site looks wrong / changed" investigation starts
  here, not in `solis-site`.
- Stack: Vite + TanStack (not Next.js — despite `solis-site`'s docs
  describing a Next.js rebuild, that rebuild was never the deployed one).

See `PRODUCT.md` in this folder for the current product spec.
