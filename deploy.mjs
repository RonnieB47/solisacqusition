// Build for Vercel, inject site-wide security headers into the Build Output
// config, then deploy to production. Run: node deploy.mjs
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

console.log("→ Building (Vercel preset)…");
execSync("npm run build", {
  stdio: "inherit",
  env: { ...process.env, SERVER_PRESET: "vercel" },
});

console.log("→ Injecting security headers…");
const path = ".vercel/output/config.json";
const cfg = JSON.parse(readFileSync(path, "utf-8"));
// Vercel rejects routes with unknown props, so mark idempotency by the header itself
cfg.routes = cfg.routes.filter(
  (r) => !(r.headers && r.headers["X-Frame-Options"]),
);
cfg.routes.unshift({
  src: "/(.*)",
  headers: SECURITY_HEADERS,
  continue: true,
});
writeFileSync(path, JSON.stringify(cfg, null, 1));

console.log("→ Deploying to production…");
execSync("npx vercel deploy --prebuilt --prod", { stdio: "inherit" });
console.log("✓ Deployed with security headers.");
