import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Compass,
  FileText,
  GaugeCircle,
  HeartPulse,
  LineChart,
  MessageSquare,
  Plug,
  Repeat,
  Rocket,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  UserCheck,
  Wrench,
  Workflow,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ---------- Animations ---------- */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Page ---------- */
function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <WhatWeBuild />
        <RevenueOps />
        <CustomerJourney />
        <HowItWorks />
        <WhySolis />
        <WhoWeWorkWith />
        <Proof />
        <LeadMagnet />
        <FinalCTA />
        <BookCall />
        <Tagline />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Nav ---------- */
const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "How It Works", id: "how" },
  { label: "Who This Is For", id: "who" },
  { label: "Testimonials", id: "testimonials" },
];

// Every section the URL/scroll-spy tracks (incl. hero + contact, which
// aren't shown as nav items but should still update the address bar).
const SPY_IDS = ["home", "services", "how", "who", "testimonials", "contact"];

// While a click-initiated scroll animates, the scroll-spy is locked so it
// can't rewrite the hash mid-animation and interrupt the smooth scroll.
let spyLocked = false;
let spyLockTimer: ReturnType<typeof setTimeout> | undefined;
function lockSpy(ms = 700) {
  spyLocked = true;
  clearTimeout(spyLockTimer);
  spyLockTimer = setTimeout(() => (spyLocked = false), ms);
}

function smoothScrollTo(id: string) {
  lockSpy();
  let top = 0;
  if (id !== "home") {
    const el = document.getElementById(id);
    if (!el) return;
    top = el.getBoundingClientRect().top + window.scrollY - 72;
  }
  window.scrollTo({ top, behavior: "smooth" });
  // IMPORTANT: never write a section hash (e.g. #services) to the URL. TanStack's
  // history layer sees the hash and jumps to that element instantly, overriding
  // this smooth scroll — that's exactly why the (hash-clearing) logo glided but
  // the (hash-setting) nav items snapped. Only ever clear an existing hash.
  if (window.location.hash) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }
}

function Nav() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    // Highlight the nav item for the section currently in view. This ONLY sets
    // React state — it must never touch the URL or scroll position. The old
    // version rewrote the URL hash on every scroll, which the router then tried
    // to scroll to, yanking the page around. State-only = zero interference.
    let ticking = false;
    const update = () => {
      ticking = false;
      if (spyLocked) return;
      const marker = window.innerHeight * 0.35;
      let current = "home";
      for (const id of SPY_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) current = id;
      }
      setActive(current);
    };
    // rAF-throttle: run the getBoundingClientRect reads at most once per frame.
    // Doing them on every scroll event forced synchronous layout and added the
    // slight scroll friction.
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-4">
        <button
          type="button"
          onClick={() => {
            setActive("home");
            smoothScrollTo("home");
          }}
          className="flex items-center gap-2"
        >
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight">Solis</span>
        </button>
        <nav className="hidden justify-center gap-8 md:flex">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  setActive(l.id);
                  smoothScrollTo(l.id);
                }}
                className={`relative text-sm transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 right-0 mx-auto h-[2px] w-6 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => smoothScrollTo("contact")}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset] transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/20"
        >
          Book a Call
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </header>
  );
}

function LogoMark({ tone = "light" }: { tone?: "light" | "dark" }) {
  // Clean brand mark: solid primary-blue rounded tile with a bold white "S".
  const ring = tone === "dark" ? "ring-background/20" : "ring-primary/30";
  return (
    <div
      className={`grid h-8 w-8 place-items-center rounded-[9px] bg-primary ring-1 ${ring} shadow-[0_6px_18px_-8px_rgba(37,99,235,0.55)]`}
      aria-hidden
    >
      <span className="text-[17px] font-semibold leading-none text-white">
        S
      </span>
    </div>
  );
}

/* ---------- Hero ---------- */
const heroEase = [0.22, 1, 0.36, 1] as const;

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_75%)]" />
      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center px-6 pt-24 pb-20 md:pt-32">
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Revenue operations infrastructure
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-4xl text-balance text-center text-[2.5rem] font-semibold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl lg:text-[76px] lg:leading-[1.02]">
            The systems behind service{" "}
            <span className="text-primary">businesses that scale.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-center text-[16px] leading-relaxed text-muted-foreground md:text-[19px]">
            Solis builds the operational infrastructure that removes bottlenecks, automates the
            repetitive work slowing your team down, and gives you complete visibility into how your
            business actually runs.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={() => smoothScrollTo("contact")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/25"
            >
              Book a call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => smoothScrollTo("audit")}
              className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-px"
            >
              Take the 2-min audit
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-md text-center text-[13px] text-muted-foreground">
            No pressure, nothing to install — just a clear picture of where your clinic loses time.
          </p>
        </Reveal>

        <div className="mt-16 w-full max-w-md">
          <LiveOpsPanel />
        </div>

        <Reveal delay={0.2} className="mt-16 w-full">
          <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 border-t border-hairline pt-8 text-sm sm:gap-6">
            <Stat k="< 60s" v="Lead response" />
            <Stat k="24/7" v="Operational uptime" />
            <Stat k="Live" v="Revenue reporting" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// The hero's authored moment: a LIVE operations feed. New automations roll in
// at the top every few seconds, so the panel is visibly working — concrete
// proof of what Solis does, not an abstract illustration.
const OPS_POOL = [
  { icon: MessageSquare, label: "Auto-replied to a new enquiry", meta: "Instagram · just now" },
  { icon: CalendarCheck, label: "Deposit reminder sent", meta: "Tomorrow, 2:00pm" },
  { icon: Repeat, label: "No-show followed up — rebooked", meta: "Gap filled" },
  { icon: Sparkles, label: "Review request sent", meta: "After treatment" },
  { icon: Bell, label: "Appointment confirmed", meta: "SMS · just now" },
  { icon: UserCheck, label: "New client added to CRM", meta: "From website form" },
  { icon: Clock, label: "Follow-up scheduled", meta: "6-week check-in" },
  { icon: Zap, label: "Waitlist offer sent — booked", meta: "Cancellation filled" },
];

function LiveOpsPanel() {
  const VISIBLE = 4;
  const [items, setItems] = useState(() =>
    OPS_POOL.slice(0, VISIBLE).map((a, i) => ({ ...a, id: i })),
  );

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // hold the feed still for reduced-motion users
    }
    let next = VISIBLE;
    let uid = VISIBLE;
    const t = setInterval(() => {
      setItems((prev) => {
        const entry = { ...OPS_POOL[next % OPS_POOL.length], id: uid };
        next += 1;
        uid += 1;
        return [entry, ...prev].slice(0, VISIBLE);
      });
    }, 3600);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, ease: heroEase, delay: 0.18 }}
      className="relative"
    >
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border border-hairline bg-background shadow-[0_44px_110px_-45px_rgba(20,22,26,0.4)]">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-semibold text-white">
              A
            </div>
            <div className="text-[14px] font-semibold tracking-tight">Aveline Aesthetics</div>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Live
          </div>
        </div>

        <div className="relative">
          <AnimatePresence initial={false}>
            {items.map((f) => (
              <motion.div
                key={f.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: heroEase }}
                className="overflow-hidden border-b border-hairline last:border-b-0"
              >
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: heroEase, delay: 0.06 }}
                  className="flex items-center gap-3.5 px-5 py-3.5"
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-hairline bg-surface text-primary">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium">{f.label}</div>
                    <div className="text-[11.5px] text-muted-foreground">{f.meta}</div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary/45" />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-hairline bg-surface/60 px-5 py-3.5 text-[12px]">
          <span className="text-muted-foreground">This week, hands-off</span>
          <span className="font-medium">
            42 enquiries answered · 9 no-shows prevented ·{" "}
            <span className="text-primary">£3,180 recovered</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="min-w-0 text-center md:text-left">
      <div className="text-2xl font-semibold tracking-tight">{k}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{v}</div>
    </div>
  );
}

/* ---------- Dashboard Illustration ---------- */
function DashboardIllustration() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-transparent blur-3xl" />
      <div className="rounded-2xl border border-hairline bg-surface shadow-[0_40px_100px_-40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
          </div>
          <div className="flex items-center gap-2 rounded-md bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            solis.app / operations
          </div>
          <div className="w-10" />
        </div>

        <div className="grid grid-cols-2 gap-4 p-5 md:grid-cols-4">
          <AnimatedMetric label="New Enquiries" target={84} suffix="" delta="+9%" />
          <AnimatedMetric label="Bookings" target={61} suffix="" delta="+6%" accent />
          <AnimatedMetric label="Response Time" target={48} suffix="s" delta="-28%" />
          <AnimatedMetric label="Conversion" target={72} suffix="%" delta="+3%" />
        </div>

        <div className="grid grid-cols-1 gap-4 px-5 pb-5 md:grid-cols-5">
          <div className="rounded-xl border border-hairline bg-background p-5 md:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs font-medium">Bookings this week</div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Live
              </div>
            </div>
            <AnimatedChart />
          </div>
          <div className="rounded-xl border border-hairline bg-background p-5 md:col-span-2">
            <div className="mb-4 text-xs font-medium">Automation queue</div>
            <AutomationQueue />
          </div>
        </div>
      </div>
    </div>
  );
}

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function AnimatedMetric({
  label,
  target,
  suffix,
  delta,
  accent,
}: {
  label: string;
  target: number;
  suffix: string;
  delta: string;
  accent?: boolean;
}) {
  const value = useCountUp(target);
  return (
    <div
      className={`rounded-xl border p-3.5 transition-colors ${
        accent ? "border-primary/30 bg-primary/5" : "border-hairline bg-background"
      }`}
    >
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1.5 flex items-end justify-between">
        <div className="text-xl font-semibold tracking-tight tabular-nums">
          {value}
          {suffix}
        </div>
        <div className={`text-[10px] ${accent ? "text-primary" : "text-muted-foreground"}`}>
          {delta}
        </div>
      </div>
    </div>
  );
}

function AnimatedChart() {
  // Realistic weekly bookings (Mon–Sun) with a live-moving indicator dot.
  const points = [6, 9, 8, 12, 10, 14, 11];
  const max = 16;
  const w = 300;
  const h = 100;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - (p / max) * (h - 12) - 6] as const);
  const pathD =
    "M" + coords.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L");
  const areaD =
    pathD + ` L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-28 w-full">
      <defs>
        <linearGradient id="fill1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* baseline grid */}
      {[0.25, 0.5, 0.75].map((r) => (
        <line
          key={r}
          x1="0"
          x2={w}
          y1={h * r}
          y2={h * r}
          stroke="var(--hairline)"
          strokeDasharray="2 4"
          opacity="0.5"
        />
      ))}
      <motion.path
        d={areaD}
        fill="url(#fill1)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      {coords.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="2.4"
          fill="var(--primary)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9 + i * 0.08, duration: 0.35 }}
        />
      ))}
      {/* live pulse dot travelling the line */}
      <motion.circle
        r="4"
        fill="var(--primary)"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          cx: coords.map(([x]) => x),
          cy: coords.map(([, y]) => y),
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      <motion.circle
        r="10"
        fill="var(--primary)"
        opacity="0.18"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.3, 0.3, 0],
          cx: coords.map(([x]) => x),
          cy: coords.map(([, y]) => y),
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 2 }}
      />
    </svg>
  );
}

function AutomationQueue() {
  const rows = [
    { t: "SMS follow-up", s: "Sent" },
    { t: "Booking reminder", s: "Queued" },
    { t: "Review request", s: "Scheduled" },
    { t: "Reactivation", s: "Running" },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % rows.length), 1600);
    return () => clearInterval(id);
  }, [rows.length]);
  return (
    <ul className="space-y-3">
      {rows.map((r, i) => {
        const isActive = i === active;
        return (
          <li key={r.t} className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-2 text-foreground/80">
              <span className="relative flex h-1.5 w-1.5">
                {isActive && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                )}
                <span
                  className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-primary" : "bg-primary/40"
                  }`}
                />
              </span>
              {r.t}
            </span>
            <motion.span
              key={isActive ? `${r.t}-a` : `${r.t}-i`}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`text-[11px] ${isActive ? "text-primary" : "text-muted-foreground"}`}
            >
              {isActive ? "Running…" : r.s}
            </motion.span>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Problem ---------- */
function Problem() {
  const items = [
    {
      icon: Clock,
      title: "Leads go cold",
      desc: "Most enquiries decide within the first hour. Every minute a lead sits unanswered, the odds they book drop — and the ones you do reach have already priced you against a competitor who replied first.",
    },
    {
      icon: GaugeCircle,
      title: "No visibility",
      desc: "You can't see which channels bring in paying clients, where bookings drop off, or which treatments and offers actually make money — so decisions get made on gut feel instead of the numbers.",
    },
    {
      icon: Settings2,
      title: "Manual admin",
      desc: "Follow-ups, reminders, no-show chases, review requests, reporting — all of it lives in someone's head or across five tabs. It burns your team out, gets dropped when it's busy, and quietly caps how far you can grow.",
    },
  ];
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.2em] text-primary">The problem</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Where revenue <span className="text-primary">gets lost</span>.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Most service businesses lose revenue in the same three places. They aren't marketing
              problems — they're operational ones.
            </p>
          </Reveal>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 md:grid-cols-3"
          >
            {items.map((it) => (
              <motion.div
                key={it.title}
                variants={fadeUp}
                className="group rounded-2xl border border-hairline bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-hairline bg-background text-primary transition-colors group-hover:border-primary/30">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Who We Work With ---------- */
function WhoWeWorkWith() {
  const industries = [
    {
      icon: Sparkles,
      title: "Med Spas & Aesthetics Clinics",
      desc: "High-volume enquiries that need instant, on-brand response.",
    },
    {
      icon: HeartPulse,
      title: "Dental & Healthcare Clinics",
      desc: "Bookings, reminders, and reactivation running on autopilot.",
    },
    {
      icon: Briefcase,
      title: "Professional Services",
      desc: "Repeatable operations across intake, delivery, and reporting.",
    },
  ];
  return (
    <section id="who" className="scroll-mt-20 border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Who we work with</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Built for growing service businesses.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            The teams we build for share the same operational profile — appointment-driven,
            enquiry-heavy, and outgrowing manual workflows.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((it) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              className="group flex flex-col items-center rounded-2xl border border-hairline bg-background px-6 py-10 text-center transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl border border-hairline bg-surface text-primary transition-colors group-hover:border-primary/40">
                <it.icon className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-[15px] font-semibold tracking-tight">{it.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- What We Build ---------- */
function WhatWeBuild() {
  const items = [
    {
      icon: Zap,
      title: "Speed-to-Lead Systems",
      desc: "Every enquiry captured and responded to within seconds, across every channel.",
      illo: <SpeedIllo />,
      features: [
        "Instant SMS replies",
        "Email automation",
        "Booking flows",
        "Lead routing",
        "Missed call text-back",
      ],
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      desc: "The repetitive operational work your team shouldn't be doing manually.",
      illo: <WorkflowIllo />,
      features: [
        "Task automation",
        "CRM workflows",
        "Customer reminders",
        "Internal notifications",
        "Follow-up sequences",
      ],
    },
    {
      icon: BarChart3,
      title: "Reporting & Revenue Intelligence",
      desc: "Live operational visibility across every stage of the customer journey.",
      illo: <ReportIllo />,
      features: [
        "Booking conversion",
        "Lead source reporting",
        "Response times",
        "Pipeline reporting",
        "Revenue dashboards",
      ],
    },
  ];
  return (
    <section id="services" className="scroll-mt-20 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">What we build</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Infrastructure, not marketing.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Three connected systems that operate as the operational backbone of a modern service
            business.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {items.map((it) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              className="group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-background transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.2)]"
            >
              <div className="relative h-40 overflow-hidden border-b border-hairline bg-surface">
                {it.illo}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-hairline bg-surface text-primary">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                <ul className="mt-5 space-y-2 border-t border-hairline pt-5">
                  {it.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13px] text-foreground/80">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SpeedIllo() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full">
      <g fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/15">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="0" x2="400" y1={i * 20} y2={i * 20} />
        ))}
      </g>
      <rect x="30" y="40" width="130" height="30" rx="6" fill="var(--background)" stroke="var(--hairline)" />
      <circle cx="46" cy="55" r="4" fill="var(--primary)" />
      <rect x="58" y="49" width="80" height="4" rx="2" fill="var(--foreground)" opacity="0.6" />
      <rect x="58" y="58" width="50" height="3" rx="1.5" fill="var(--foreground)" opacity="0.25" />
      <path d="M160 55 L240 55" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="240" cy="55" r="18" fill="var(--primary)" opacity="0.12" />
      <circle cx="240" cy="55" r="10" fill="var(--primary)" />
      <path d="M235 55 L239 59 L246 51" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="270" y="90" width="110" height="46" rx="8" fill="var(--background)" stroke="var(--hairline)" />
      <rect x="280" y="100" width="60" height="4" rx="2" fill="var(--foreground)" opacity="0.6" />
      <rect x="280" y="110" width="90" height="3" rx="1.5" fill="var(--foreground)" opacity="0.2" />
      <rect x="280" y="118" width="40" height="10" rx="4" fill="var(--primary)" />
    </svg>
  );
}

function WorkflowIllo() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full">
      <g stroke="var(--hairline)" fill="var(--background)">
        <rect x="20" y="60" width="90" height="40" rx="8" />
        <rect x="155" y="30" width="90" height="40" rx="8" />
        <rect x="155" y="90" width="90" height="40" rx="8" />
        <rect x="290" y="60" width="90" height="40" rx="8" />
      </g>
      <g stroke="var(--primary)" fill="none" strokeWidth="1.4">
        <path d="M110 80 C 130 80, 135 50, 155 50" />
        <path d="M110 80 C 130 80, 135 110, 155 110" />
        <path d="M245 50 C 265 50, 270 80, 290 80" />
        <path d="M245 110 C 265 110, 270 80, 290 80" />
      </g>
      {[
        [65, 80],
        [200, 50],
        [200, 110],
        [335, 80],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="var(--primary)" />
      ))}
      <text x="65" y="83" textAnchor="middle" fontSize="9" fill="var(--foreground)" opacity="0.7">
        Enquiry
      </text>
      <text x="200" y="53" textAnchor="middle" fontSize="9" fill="var(--foreground)" opacity="0.7">
        Qualify
      </text>
      <text x="200" y="113" textAnchor="middle" fontSize="9" fill="var(--foreground)" opacity="0.7">
        Nurture
      </text>
      <text x="335" y="83" textAnchor="middle" fontSize="9" fill="var(--foreground)" opacity="0.7">
        Book
      </text>
    </svg>
  );
}

function ReportIllo() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full">
      <g fill="var(--background)" stroke="var(--hairline)">
        <rect x="20" y="30" width="360" height="100" rx="10" />
      </g>
      <g>
        {[60, 100, 80, 130, 90, 120, 70, 140, 110].map((h, i) => (
          <rect
            key={i}
            x={40 + i * 38}
            y={130 - h * 0.6}
            width="20"
            height={h * 0.6}
            rx="3"
            fill={i === 7 ? "var(--primary)" : "var(--foreground)"}
            opacity={i === 7 ? 1 : 0.15}
          />
        ))}
      </g>
      <line x1="30" y1="130" x2="380" y2="130" stroke="var(--hairline)" />
    </svg>
  );
}

/* ---------- Revenue Operations ---------- */
function RevenueOps() {
  const stages = [
    { icon: Target, title: "Capture", desc: "Every enquiry — form, call, DM, walk-in — logged in one place." },
    { icon: Workflow, title: "Automate", desc: "Responses, reminders, and follow-ups handled without manual work." },
    { icon: LineChart, title: "Measure", desc: "Live reporting across leads, bookings, response times, and revenue." },
    { icon: Repeat, title: "Improve", desc: "Continuous refinement as your team and volume grow." },
  ];
  return (
    <section id="how" className="scroll-mt-20 border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Revenue operations</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Your operational backend, built properly.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Solis doesn't replace the software you already use. We connect it into one reliable
            operating system that captures enquiries, automates repetitive work, and gives you
            complete visibility into how your business performs.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-16 overflow-hidden rounded-2xl border border-hairline bg-background p-8 md:p-14">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
            <div className="relative grid gap-6 md:grid-cols-4">
              {stages.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative rounded-xl border border-hairline bg-surface p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="node-glow grid h-11 w-11 place-items-center rounded-xl border border-hairline bg-background text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  {i < stages.length - 1 && (
                    <ArrowRight className="pointer-events-none absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-primary md:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Customer Journey ---------- */
function CustomerJourney() {
  const steps = [
    { icon: MessageSquare, label: "Enquiry" },
    { icon: Zap, label: "Instant Response" },
    { icon: UserCheck, label: "Qualification" },
    { icon: CalendarCheck, label: "Appointment Booked" },
    { icon: Bell, label: "Reminders" },
    { icon: Repeat, label: "Follow-Up" },
    { icon: BarChart3, label: "Reporting Updated" },
  ];
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">The system</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            From Enquiry to Booking.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Every step of the customer journey, engineered to move without manual intervention.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-14 overflow-x-auto rounded-2xl border border-hairline bg-surface/60 p-8 md:p-14">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
            <div className="relative flex min-w-[960px] items-center justify-between gap-2">
              <svg
                className="pointer-events-none absolute left-0 top-[44px] h-6 w-full"
                viewBox="0 0 1000 24"
                preserveAspectRatio="none"
              >
                <line
                  x1="60"
                  x2="940"
                  y1="12"
                  y2="12"
                  stroke="var(--primary)"
                  strokeOpacity="0.35"
                  strokeWidth="1.25"
                  strokeDasharray="4 6"
                />
                {/* moving data-flow pulse */}
                <circle r="3.5" fill="var(--primary)">
                  <animate
                    attributeName="cx"
                    from="60"
                    to="940"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="12;12;12"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.1;0.9;1"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="6" fill="var(--primary)" opacity="0.25">
                  <animate
                    attributeName="cx"
                    from="60"
                    to="940"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
              {steps.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    delay: i * 0.18,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10 flex flex-1 flex-col items-center gap-3"
                >
                  <motion.div
                    initial={{ boxShadow: "0 0 0 0 rgba(37,99,235,0)" }}
                    whileInView={{
                      boxShadow: [
                        "0 0 0 0 rgba(37,99,235,0)",
                        "0 0 0 8px rgba(37,99,235,0.12)",
                        "0 0 24px -2px rgba(37,99,235,0.35)",
                      ],
                    }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: i * 0.18 + 0.15, duration: 0.9 }}
                    className="grid h-20 w-20 place-items-center rounded-2xl border border-hairline bg-background text-primary"
                  >
                    <s.icon className="h-6 w-6" strokeWidth={1.75} />
                  </motion.div>
                  <div className="whitespace-nowrap text-[12px] font-medium text-foreground/80">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- How It Works (Working Together Timeline) ---------- */
function HowItWorks() {
  const stages = [
    {
      when: "Week 1",
      icon: Compass,
      title: "Discovery & Systems Audit",
      desc: "We map how your business actually operates today.",
      bullets: [
        "Understand your business",
        "Map your existing processes",
        "Identify bottlenecks",
        "Define project roadmap",
      ],
    },
    {
      when: "Week 2",
      icon: Plug,
      title: "System Design",
      desc: "We design the operational architecture around your team.",
      bullets: [
        "Design automations",
        "Build backend workflows",
        "Configure reporting",
        "Plan integrations",
      ],
    },
    {
      when: "Launch Week",
      icon: Rocket,
      title: "Implementation",
      desc: "We deploy the system and walk your team through every part.",
      bullets: [
        "Deploy automations",
        "Connect existing software",
        "Test every workflow",
        "Team walkthrough",
      ],
    },
    {
      when: "Ongoing",
      icon: Activity,
      title: "Optimisation & Support",
      desc: "We keep refining the system as your business grows.",
      bullets: [
        "Performance reviews",
        "New workflow improvements",
        "Reporting refinements",
        "Continuous optimisation",
      ],
    },
  ];
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Working together</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            What working with Solis looks like.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            A clear, repeatable engagement — from first conversation to a live system your team
            actually runs on.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* Stage rail */}
          <div className="relative min-w-0">
            <div className="absolute left-[19px] top-2 bottom-2 hidden w-px bg-hairline lg:block" />
            <motion.div
              key={active}
              initial={{ height: 0 }}
              animate={{ height: `${((active + 1) / stages.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[19px] top-2 hidden w-px bg-primary lg:block"
            />
            <ul className="flex gap-3 overflow-x-auto lg:flex-col lg:gap-6 lg:overflow-visible">
              {stages.map((s, i) => {
                const isActive = i === active;
                const isPassed = i <= active;
                return (
                  <li key={s.when}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className="group relative flex items-center gap-3 whitespace-nowrap text-left"
                    >
                      <span
                        className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-all ${
                          isPassed
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-hairline bg-background text-muted-foreground"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`flex flex-col transition-colors ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        <span className="text-[11px] uppercase tracking-[0.18em]">{s.when}</span>
                        <span className="text-sm font-medium">{s.title}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Active stage detail */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-w-0 overflow-hidden rounded-2xl border border-hairline bg-background p-8 md:p-12"
          >
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {stages[active].when}
                </div>
                <div className="node-glow grid h-11 w-11 place-items-center rounded-xl border border-hairline bg-surface text-primary">
                  {(() => {
                    const Icon = stages[active].icon;
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
                {stages[active].title}
              </h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                {stages[active].desc}
              </p>
              <motion.ul
                variants={stagger}
                initial="hidden"
                animate="show"
                className="mt-8 grid gap-3 sm:grid-cols-2"
              >
                {stages[active].bullets.map((b) => (
                  <motion.li
                    key={b}
                    variants={fadeUp}
                    className="flex items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3 text-[13px] text-foreground/85"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {b}
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-8 flex items-center justify-between border-t border-hairline pt-5 text-xs text-muted-foreground">
                <span>
                  Stage {active + 1} of {stages.length}
                </span>
                <div className="flex gap-1.5">
                  {stages.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all ${
                        i === active ? "w-6 bg-primary" : "w-2 bg-hairline"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Solis ---------- */
function WhySolis() {
  const items = [
    {
      icon: Wrench,
      title: "Infrastructure first",
      desc: "We build operational systems, not marketing campaigns.",
    },
    {
      icon: Settings2,
      title: "Built around your business",
      desc: "Every workflow is designed around how your team actually operates.",
    },
    {
      icon: Workflow,
      title: "One connected stack",
      desc: "CRM, booking, messaging, and reporting stitched into a single operating layer — no duct tape, no drift.",
    },
    {
      icon: BookOpen,
      title: "Documented & maintainable",
      desc: "Every system ships with documentation and long-term maintainability in mind.",
    },
  ];
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Why Solis</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Why businesses choose Solis.
          </h2>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((it) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              className="group rounded-2xl border border-hairline bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-hairline bg-background text-primary transition-colors group-hover:border-primary/30">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Proof (Case Study Testimonial) ---------- */
function Proof() {
  const tags = ["Backend System Built", "Workflow Automation"];
  const outcomes = [
    "Eliminated manual processes",
    "Created repeatable operational workflows",
    "Built a scalable backend system",
    "Improved business organisation",
    "Reduced time spent on administration",
  ];
  return (
    <section id="testimonials" className="scroll-mt-20 border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Case study</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Systems that make growth repeatable.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Testimonial card */}
          <Reveal delay={0.05}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-background p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_0%_0%,var(--primary)_0%,transparent_35%)]" />
              <div className="relative flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Client testimonial
                </div>
                <div className="text-[11px] font-mono text-muted-foreground">CS-01</div>
              </div>

              <blockquote className="relative mt-8 text-balance text-2xl font-medium leading-snug tracking-tight md:text-[28px]">
                <span className="mr-1 text-primary/60">“</span>
                Ronnie was an absolute pleasure to work with. Initially I had no systems in place,
                no content strategy and was unsure of how to actually grow my business. He helped
                me build my entire backend system, content strategy and even created a professional
                website. He's incredibly knowledgeable when it comes to funnels,
                systems and online business. If you're looking to scale, Solis is exactly where you
                should be.
                <span className="ml-1 text-primary/60">”</span>
              </blockquote>

              <div className="relative mt-8 flex items-center gap-3 border-t border-hairline pt-6">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-foreground text-sm font-semibold text-background">
                  T
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-tight">Tim</div>
                  <div className="text-xs text-muted-foreground">CSM Management</div>
                </div>
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="relative mt-6 flex flex-wrap gap-2"
              >
                {tags.map((t) => (
                  <motion.span
                    key={t}
                    variants={fadeUp}
                    className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 py-1 text-[11px] text-foreground/80"
                  >
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </Reveal>

          {/* Outcome card */}
          <Reveal delay={0.15}>
            <div className="flex h-full flex-col rounded-2xl border border-hairline bg-background p-8 md:p-10">
              <div className="text-xs uppercase tracking-[0.2em] text-primary">Project outcome</div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                What the system delivered.
              </h3>
              <motion.ul
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="mt-6 space-y-3 border-t border-hairline pt-6"
              >
                {outcomes.map((o) => (
                  <motion.li
                    key={o}
                    variants={fadeUp}
                    className="flex items-start gap-3 text-[13.5px] text-foreground/85"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{o}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-hairline pt-6">
                <div className="rounded-xl border border-hairline bg-surface p-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Delivered
                  </div>
                  <div className="mt-1 text-lg font-semibold tracking-tight">Full backend</div>
                </div>
                <div className="rounded-xl border border-hairline bg-surface p-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Result
                  </div>
                  <div className="mt-1 text-lg font-semibold tracking-tight">Scalable ops</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 grid gap-3 border-t border-hairline pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FileText, label: "Fully documented handover" },
              { icon: ShieldCheck, label: "Proven operational principles" },
              { icon: Timer, label: "Designed for growing teams" },
              { icon: ClipboardCheck, label: "Scalable infrastructure" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-xl border border-hairline bg-background px-4 py-3"
              >
                <s.icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-[13px] text-foreground/80">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-hairline bg-foreground p-10 text-background md:p-16">
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,var(--primary)_0%,transparent_45%),radial-gradient(circle_at_80%_80%,var(--primary)_0%,transparent_35%)]" />
            <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-end">
              <h2 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
                Ready to build the systems behind{" "}
                <span className="text-[color:var(--primary)]">a business that scales</span>?
              </h2>
              <div className="flex md:justify-end">
                <button
                  type="button"
                  onClick={() => smoothScrollTo("contact")}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/40"
                >
                  Book a Call
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Lead Magnet (12-Question Systems Audit Quiz) ---------- */
type QuizChoice = { value: string; label: string };
type QuizQuestion = {
  id: string;
  q: string;
  options: QuizChoice[];
  hasOther?: boolean;
};

const QUIZ: QuizQuestion[] = [
  {
    id: "response_time",
    q: "How quickly do you currently respond to new enquiries?",
    options: [
      { value: "under_5", label: "Under 5 minutes" },
      { value: "within_hour", label: "Within an hour" },
      { value: "same_day", label: "Same day" },
      { value: "varies", label: "It varies" },
    ],
  },
  {
    id: "lead_source",
    q: "What's your biggest lead source?",
    options: [
      { value: "social", label: "Instagram / social" },
      { value: "google", label: "Google / website" },
      { value: "referrals", label: "Referrals" },
      { value: "walkins", label: "Walk-ins" },
    ],
  },
  {
    id: "tracks_noshow",
    q: "Do you track your no-show rate?",
    options: [
      { value: "closely", label: "Yes, closely" },
      { value: "roughly", label: "Roughly" },
      { value: "no", label: "Not at all" },
    ],
  },
  {
    id: "noshow_rate",
    q: "Roughly what % of bookings no-show or cancel last minute?",
    options: [
      { value: "under_10", label: "Under 10%" },
      { value: "10_25", label: "10–25%" },
      { value: "25_plus", label: "25%+" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "auto_followup",
    q: "Do you have any automated follow-up in place today?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "not_sure", label: "Not sure" },
    ],
  },
  {
    id: "booking_tool",
    q: "What do you currently use to manage bookings?",
    options: [
      { value: "ghl", label: "GHL" },
      { value: "calendly", label: "Calendly" },
      { value: "spreadsheet", label: "Spreadsheet" },
      { value: "manual", label: "Paper / manual" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "monthly_bookings",
    q: "Roughly how many bookings do you take per month?",
    options: [
      { value: "under_50", label: "Under 50" },
      { value: "50_150", label: "50–150" },
      { value: "150_300", label: "150–300" },
      { value: "300_plus", label: "300+" },
    ],
  },
  {
    id: "enquiry_owner",
    q: "Who handles enquiries when they come in?",
    options: [
      { value: "front_desk", label: "Dedicated front desk" },
      { value: "whoever", label: "Whoever's free" },
      { value: "owner", label: "Owner personally" },
      { value: "nobody", label: "Nobody consistently" },
    ],
  },
  {
    id: "reminders",
    q: "Do you send appointment reminders?",
    options: [
      { value: "automated", label: "Automated" },
      { value: "manual", label: "Manual / sometimes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "reactivation",
    q: "Do you have a system for reactivating past clients?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "unknown", label: "Not sure what that means" },
    ],
  },
  {
    id: "tracking",
    q: "How do you currently track what's working — leads, bookings, revenue?",
    options: [
      { value: "dashboard", label: "Dashboard / reporting tool" },
      { value: "spreadsheet", label: "Spreadsheet" },
      { value: "gut", label: "Gut feel" },
      { value: "none", label: "I don't" },
    ],
  },
  {
    id: "bottleneck",
    q: "What's the single biggest bottleneck in your booking process right now?",
    options: [
      { value: "slow_response", label: "Slow response" },
      { value: "noshows", label: "No-shows" },
      { value: "no_visibility", label: "No visibility into data" },
      { value: "manual_admin", label: "Too much manual admin" },
      { value: "other", label: "Other" },
    ],
    hasOther: true,
  },
];

type Recommendation = { area: string; headline: string; body: string };

function buildRecommendation(a: Record<string, string>): Recommendation {
  // Priority-ordered rules — the first matching rule wins, so the "biggest
  // gap" is surfaced first rather than a generic overall summary.
  if (a.response_time === "same_day" || a.response_time === "varies") {
    return {
      area: "response_speed",
      headline: "Here's where to start.",
      body:
        "Your biggest opportunity right now is response speed. If a lead doesn't hear back within the hour, more than half quietly move on to whoever replied first. An automated instant-response system alone would likely be your fastest win.",
    };
  }
  if (a.auto_followup === "no" || a.auto_followup === "not_sure") {
    return {
      area: "follow_up",
      headline: "Here's where to start.",
      body:
        "Your biggest opportunity is automated follow-up. Most enquiries that don't book on first contact will book later — but only if something reaches them. A structured multi-touch sequence over SMS and email is the single highest-ROI system to install first.",
    };
  }
  if (a.reminders === "no" || a.reminders === "manual") {
    return {
      area: "reminders",
      headline: "Here's where to start.",
      body:
        "Your biggest opportunity is appointment reminders. Manual or missing reminders are the single biggest driver of no-shows in service businesses. Automating a two-step reminder flow typically cuts no-show rate by a third within the first month.",
    };
  }
  if (a.noshow_rate === "25_plus" || a.noshow_rate === "10_25") {
    return {
      area: "no_shows",
      headline: "Here's where to start.",
      body:
        "Your biggest opportunity is no-show recovery. At your current rate, every 100 bookings is losing you real revenue. Layering confirmation flows, deposit prompts, and same-day reminders on top of your existing calendar is the fastest way to claw that back.",
    };
  }
  if (a.tracking === "none" || a.tracking === "gut") {
    return {
      area: "visibility",
      headline: "Here's where to start.",
      body:
        "Your biggest opportunity is visibility. You're making decisions on gut feel instead of data — which means you can't tell what's actually working. A single live dashboard tracking leads, response time, bookings and revenue is where to start before optimising anything else.",
    };
  }
  if (a.tracks_noshow === "no") {
    return {
      area: "visibility",
      headline: "Here's where to start.",
      body:
        "Your biggest opportunity is tracking. You can't fix a no-show problem you're not measuring — and it's almost certainly costing you more than you think. Start by wiring booking outcomes into a single view so the number is impossible to ignore.",
    };
  }
  if (a.reactivation === "no" || a.reactivation === "unknown") {
    return {
      area: "reactivation",
      headline: "Here's where to start.",
      body:
        "Your biggest opportunity is client reactivation. Past clients are the cheapest bookings you'll ever get, and most service businesses let them go silent. An automated reactivation sequence to lapsed clients typically pays for the entire system by itself.",
    };
  }
  if (a.enquiry_owner === "nobody" || a.enquiry_owner === "whoever") {
    return {
      area: "intake_ownership",
      headline: "Here's where to start.",
      body:
        "Your biggest opportunity is intake ownership. When no single person or system owns enquiries, they get missed. Route every enquiry — form, call, DM — into one queue with clear ownership and SLAs before layering any automation on top.",
    };
  }
  const bottleneckMap: Record<string, Recommendation> = {
    slow_response: {
      area: "response_speed",
      headline: "Here's where to start.",
      body:
        "You named response time as your biggest bottleneck. Instant automated reply on every channel — form, call, DM — is the single fastest change that lifts conversion and it takes days, not months, to install.",
    },
    noshows: {
      area: "no_shows",
      headline: "Here's where to start.",
      body:
        "You named no-shows as your biggest bottleneck. Confirmation flows, deposit prompts, and layered reminders typically cut no-show rate by a third — start there before adding any new marketing spend.",
    },
    no_visibility: {
      area: "visibility",
      headline: "Here's where to start.",
      body:
        "You named visibility as your biggest bottleneck. A single live dashboard for leads, response time, bookings and revenue is the first thing to build — you can't optimise what you can't see.",
    },
    manual_admin: {
      area: "manual_admin",
      headline: "Here's where to start.",
      body:
        "You named manual admin as your biggest bottleneck. Map the three tasks eating the most team hours weekly (usually reminders, follow-ups, and reporting) and automate those first — the compounded time saved funds the rest of the build.",
    },
  };
  if (a.bottleneck && bottleneckMap[a.bottleneck]) return bottleneckMap[a.bottleneck];
  return {
    area: "overall",
    headline: "Here's where to start.",
    body:
      "Your setup is more mature than most — the highest-leverage next step is stitching your CRM, booking, and reporting into one connected view so improvements compound instead of getting lost between tools.",
  };
}

function LeadMagnet() {
  const CONTACT_STEP = 0;
  const totalSteps = QUIZ.length + 1; // contact + 12 questions
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", business: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState<Record<string, string>>({});

  const isContactStep = step === CONTACT_STEP;
  const quizIndex = step - 1;
  const isQuizStep = quizIndex >= 0 && quizIndex < QUIZ.length;
  const current = isQuizStep ? QUIZ[quizIndex] : null;
  const progress = submitted
    ? 100
    : Math.round(((step + 1) / totalSteps) * 100);

  const recommendation = useMemo(
    () => (submitted ? buildRecommendation(finalAnswers) : null),
    [submitted, finalAnswers],
  );

  async function persist(nextAnswers: Record<string, string>) {
    const rec = buildRecommendation(nextAnswers);
    const payload = {
      submittedAt: new Date().toISOString(),
      answers: nextAnswers,
      otherText,
      contact,
      weakest_area: rec.area,
    };
    try {
      const key = "solis_audit_submissions";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push(payload);
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {
      /* ignore */
    }
    // Convert a stored answer code (e.g. "gut") into its readable label
    // (e.g. "Gut feel") using the QUIZ definition.
    const labelFor = (qid: string): string | null => {
      const value = nextAnswers[qid];
      if (!value) return null;
      const q = QUIZ.find((x) => x.id === qid);
      return q?.options.find((o) => o.value === value)?.label ?? value;
    };
    const otherDetail =
      Object.values(otherText).filter((t) => t && t.trim()).join("; ") || null;

    try {
      const { error } = await supabase.from("audit_submissions" as never).insert({
        name: contact.name.trim(),
        email: contact.email.trim(),
        business_name: contact.business.trim(),
        phone: contact.phone.trim() || null,
        response_speed: labelFor("response_time"),
        lead_source: labelFor("lead_source"),
        tracks_noshows: labelFor("tracks_noshow"),
        noshow_rate: labelFor("noshow_rate"),
        automated_followup: labelFor("auto_followup"),
        booking_tool: labelFor("booking_tool"),
        monthly_bookings: labelFor("monthly_bookings"),
        enquiry_handler: labelFor("enquiry_owner"),
        reminders: labelFor("reminders"),
        reactivation: labelFor("reactivation"),
        tracking_method: labelFor("tracking"),
        bottleneck: labelFor("bottleneck"),
        other_detail: otherDetail,
        recommendation: rec.body,
        answers: nextAnswers,
      } as never);
      if (error) console.error("[Solis audit] supabase insert failed", error);
    } catch (err) {
      console.error("[Solis audit] supabase insert threw", err);
    }
  }

  function advanceFromQuiz(nextAnswers: Record<string, string>) {
    if (quizIndex === QUIZ.length - 1) {
      // Last question — submit
      setFinalAnswers(nextAnswers);
      void persist(nextAnswers);
      setSubmitted(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  function select(value: string) {
    if (!current) return;
    const nextAnswers = { ...answers, [current.id]: value };
    setAnswers(nextAnswers);
    if (!(current.hasOther && value === "other")) {
      setTimeout(() => advanceFromQuiz(nextAnswers), 180);
    }
  }

  function continueOther() {
    advanceFromQuiz(answers);
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function submitContact(e: React.FormEvent) {
    e.preventDefault();
    setStep(1);
  }

  const canContinueOther =
    current?.hasOther && answers[current.id] === "other"
      ? (otherText[current.id] || "").trim().length > 0
      : true;

  const canContinueContact =
    contact.name.trim().length > 0 &&
    contact.email.trim().length > 0 &&
    contact.business.trim().length > 0;

  return (
    <section id="audit" className="scroll-mt-20 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-background p-8 md:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_100%_0%,var(--primary)_0%,transparent_40%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Free · No commitment
                </div>
                <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-[40px] md:leading-[1.1]">
                  Get Your Free Systems Audit.
                </h2>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  12 quick questions, 2 minutes, zero fluff — see the single weakest area in your
                  operation and the specific next step to fix it, right on this page.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "12-question diagnostic",
                    "Instant on-page recommendation",
                    "No follow-up required",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[13.5px] text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-hairline bg-surface p-6 md:p-8">
                {/* Progress */}
                <div className="mb-6 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <span>
                    {submitted
                      ? "Complete"
                      : isContactStep
                        ? `Step 1 of ${totalSteps} · Your details`
                        : `Step ${step + 1} of ${totalSteps} · Question ${quizIndex + 1} of ${QUIZ.length}`}
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-hairline">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                {submitted && recommendation ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-primary">
                        Your result
                      </div>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight md:text-[28px] md:leading-tight">
                      {recommendation.headline}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
                      {recommendation.body}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[12px] text-muted-foreground">
                        Want us to build this for you? Book a 30-minute call.
                      </p>
                      <button
                        type="button"
                        onClick={() => smoothScrollTo("contact")}
                        className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/25"
                      >
                        Book a Call
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>
                ) : submitted ? null : isContactStep ? (
                  <motion.form
                    key="contact"
                    onSubmit={submitContact}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                      Tell us who you are.
                    </h3>
                    <p className="mt-2 text-[13.5px] text-muted-foreground">
                      Quick context first — the 12-question diagnostic follows.
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <QuizField
                        label="Name"
                        id="q-name"
                        value={contact.name}
                        onChange={(v) => setContact((c) => ({ ...c, name: v }))}
                        required
                      />
                      <QuizField
                        label="Email"
                        id="q-email"
                        type="email"
                        value={contact.email}
                        onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                        required
                      />
                      <QuizField
                        label="Business Name"
                        id="q-biz"
                        value={contact.business}
                        onChange={(v) => setContact((c) => ({ ...c, business: v }))}
                        required
                        className="sm:col-span-2"
                      />
                      <QuizField
                        label="Phone"
                        id="q-phone"
                        type="tel"
                        value={contact.phone}
                        onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
                        className="sm:col-span-2"
                      />
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-4">
                      <button
                        type="submit"
                        disabled={!canContinueContact}
                        className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/25 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                      >
                        Start Audit
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                    <p className="mt-3 text-center text-[11px] text-muted-foreground">
                      We'll never share your details. Unsubscribe any time.
                    </p>
                  </motion.form>
                ) : current ? (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                      {current.q}
                    </h3>
                    <div className="mt-6 grid gap-2.5">
                      {current.options.map((opt) => {
                        const selected = answers[current.id] === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => select(opt.value)}
                            className={`group flex items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm transition-all ${
                              selected
                                ? "border-primary/60 bg-primary/10 text-foreground"
                                : "border-hairline bg-background text-foreground/85 hover:border-primary/30 hover:bg-primary/5"
                            }`}
                          >
                            <span>{opt.label}</span>
                            <span
                              className={`grid h-5 w-5 place-items-center rounded-full border ${
                                selected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-hairline"
                              }`}
                            >
                              {selected && <CheckCircle2 className="h-3.5 w-3.5" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {current.hasOther && answers[current.id] === "other" && (
                      <div className="mt-4">
                        <label
                          htmlFor={`other-${current.id}`}
                          className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
                        >
                          Tell us more
                        </label>
                        <input
                          id={`other-${current.id}`}
                          type="text"
                          value={otherText[current.id] || ""}
                          onChange={(e) =>
                            setOtherText((o) => ({ ...o, [current.id]: e.target.value }))
                          }
                          maxLength={200}
                          placeholder="Briefly describe it"
                          className="block w-full rounded-lg border border-hairline bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15"
                        />
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={back}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        ← Back
                      </button>
                      {current.hasOther && answers[current.id] === "other" && (
                        <button
                          type="button"
                          onClick={continueOther}
                          disabled={!canContinueOther}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/25 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        >
                          {quizIndex === QUIZ.length - 1 ? "Submit" : "Continue"}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function QuizField({
  label,
  id,
  type = "text",
  value,
  onChange,
  required,
  className = "",
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
      >
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        maxLength={200}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border border-hairline bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15"
      />
    </div>
  );
}

/* ---------- Book a Call (Calendly embed) ---------- */
function BookCall() {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );
    if (existing) return;
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <section id="contact" className="scroll-mt-20 border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Book a call</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Let's talk through your operations.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            A 30-minute call to review your current setup and map where a Solis system would move
            the needle first.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-hairline bg-background shadow-[0_40px_100px_-40px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
              </div>
              <div className="rounded-md bg-surface px-2.5 py-1 text-[11px] text-muted-foreground">
                calendly.com / ronnieboksh1
              </div>
              <div className="w-10" />
            </div>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/ronnieboksh1/new-meeting?hide_gdpr_banner=1"
              style={{ minWidth: "320px", height: "720px" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Tagline divider ---------- */
function Tagline() {
  return (
    <section aria-hidden className="px-6">
      <div className="mx-auto max-w-5xl">
        <div className="h-px w-full bg-hairline/70" />
        <p className="py-14 text-center text-[13px] tracking-[0.22em] text-muted-foreground/80 md:text-sm">
          BUILT WITH INTENTION, DRIVEN BY RESULTS.
        </p>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:items-start">
        <div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
          >
            <LogoMark />
            <span className="text-sm font-semibold tracking-tight">Solis</span>
          </button>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
            Revenue operations infrastructure for modern service businesses.
          </p>
        </div>
        <FooterCol
          title="Explore"
          links={[
            { l: "Services", id: "services" },
            { l: "How It Works", id: "how" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { l: "Who This Is For", id: "who" },
            { l: "Testimonials", id: "testimonials" },
            { l: "Book a Call", id: "contact" },
          ]}
        />

        <div className="text-xs text-muted-foreground md:text-right">
          © 2025 Solis Acquisition. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { l: string; id: string }[];
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</div>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.l}>
            <button
              type="button"
              onClick={() => smoothScrollTo(l.id)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {l.l}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
