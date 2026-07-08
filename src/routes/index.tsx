import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Boxes,
  Clock,
  Compass,
  Database,
  GaugeCircle,
  LineChart,
  Plug,
  Rocket,
  Send,
  Settings2,
  Sparkles,
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
        <AIStack />
        <HowItWorks />
        <Proof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const links = [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-hairline/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight">Solis</span>
        </a>
        <nav className="hidden justify-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset] transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/20"
        >
          Book a Call
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M4 12h5l2-4 2 8 2-4h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_75%)]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-24 md:py-32 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Backend systems for service businesses
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-[72px]">
              <span className="text-primary">AI-powered</span> systems for service businesses.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
              We build the backend infrastructure that captures leads, automates follow-up, and
              turns your booking data into decisions—so nothing falls through the cracks.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/25"
              >
                Book a Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                See what we build
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-hairline pt-8 text-sm">
              <Stat k="< 60s" v="Lead response" />
              <Stat k="24/7" v="Automation uptime" />
              <Stat k="Live" v="Reporting" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <DashboardIllustration />
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="min-w-0">
      <div className="text-2xl font-semibold tracking-tight">{k}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{v}</div>
    </div>
  );
}

/* ---------- Dashboard Illustration ---------- */
function DashboardIllustration() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent blur-2xl" />
      <div className="rounded-2xl border border-hairline bg-surface shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
          </div>
          <div className="rounded-md bg-background px-2.5 py-1 text-[10px] text-muted-foreground">
            solis.app / operations
          </div>
          <div className="w-10" />
        </div>

        <div className="grid grid-cols-3 gap-3 p-4">
          <MetricCard label="New Enquiries" value="248" delta="+12%" />
          <MetricCard label="Bookings" value="176" delta="+8%" accent />
          <MetricCard label="Response Time" value="42s" delta="-31%" />
        </div>

        <div className="grid grid-cols-5 gap-3 px-4 pb-4">
          <div className="col-span-3 rounded-xl border border-hairline bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-medium">Bookings this week</div>
              <div className="text-[10px] text-muted-foreground">Live</div>
            </div>
            <ChartSVG />
          </div>
          <div className="col-span-2 rounded-xl border border-hairline bg-background p-4">
            <div className="mb-3 text-xs font-medium">Automation queue</div>
            <ul className="space-y-2.5">
              {[
                { t: "SMS follow-up", s: "Sent" },
                { t: "Booking reminder", s: "Queued" },
                { t: "Review request", s: "Scheduled" },
                { t: "Reactivation", s: "Running" },
              ].map((r) => (
                <li key={r.t} className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-2 text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {r.t}
                  </span>
                  <span className="text-muted-foreground">{r.s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  delta,
  accent,
}: {
  label: string;
  value: string;
  delta: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        accent ? "border-primary/30 bg-primary/5" : "border-hairline bg-background"
      }`}
    >
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-end justify-between">
        <div className="text-xl font-semibold tracking-tight">{value}</div>
        <div className={`text-[10px] ${accent ? "text-primary" : "text-muted-foreground"}`}>
          {delta}
        </div>
      </div>
    </div>
  );
}

function ChartSVG() {
  return (
    <svg viewBox="0 0 300 100" className="h-24 w-full">
      <defs>
        <linearGradient id="fill1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,70 L40,55 L80,60 L120,35 L160,45 L200,25 L240,30 L300,10 L300,100 L0,100 Z"
        fill="url(#fill1)"
      />
      <path
        d="M0,70 L40,55 L80,60 L120,35 L160,45 L200,25 L240,30 L300,10"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [40, 55],
        [120, 35],
        [200, 25],
        [300, 10],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="var(--primary)" />
      ))}
    </svg>
  );
}

/* ---------- Problem ---------- */
function Problem() {
  const items = [
    {
      icon: Clock,
      title: "Leads go cold",
      desc: "Leads aren't contacted quickly enough.",
    },
    {
      icon: GaugeCircle,
      title: "No visibility",
      desc: "You don't know what's actually generating bookings.",
    },
    {
      icon: Settings2,
      title: "Manual follow-up",
      desc: "Your team wastes time chasing tasks that should happen automatically.",
    },
  ];
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.2em] text-primary">The problem</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Where revenue <span className="text-primary">gets lost</span>.
            </h2>
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

/* ---------- What We Build ---------- */
function WhatWeBuild() {
  const items = [
    {
      icon: Zap,
      title: "Speed-to-Lead Systems",
      desc: "Instant responses, lead qualification, and automated booking.",
      illo: <SpeedIllo />,
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      desc: "CRM logic, automations, reminders, and backend processes built around GoHighLevel.",
      illo: <WorkflowIllo />,
    },
    {
      icon: BarChart3,
      title: "AI Reporting Dashboards",
      desc: "Live reporting across enquiries, bookings, conversions, and operations.",
      illo: <ReportIllo />,
    },
  ];
  return (
    <section id="services" className="border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">What we build</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Infrastructure, not marketing.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            Three systems that operate together as the operational backbone of a modern service
            business.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-4 md:grid-cols-3"
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

      <path
        d="M160 55 L240 55"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
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
        <g key={i}>
          <circle cx={x} cy={y} r="4" fill="var(--primary)" />
        </g>
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

/* ---------- AI Stack ---------- */
function AIStack() {
  const nodes = [
    { label: "GoHighLevel", icon: Database },
    { label: "Claude / AI", icon: Bot },
    { label: "Lovable", icon: Sparkles },
    { label: "Dashboards", icon: LineChart },
    { label: "Google Sheets", icon: Boxes },
  ];
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Our AI stack</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Connected systems, end to end.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            A composable backend that moves data cleanly between the tools you already trust.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-14 overflow-x-auto rounded-2xl border border-hairline bg-surface/60 p-8 md:p-14">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
            <div className="relative flex min-w-[720px] items-center justify-between gap-4">
              {/* connecting line */}
              <svg
                className="pointer-events-none absolute left-0 top-1/2 h-8 w-full -translate-y-1/2"
                viewBox="0 0 1000 40"
                preserveAspectRatio="none"
              >
                <line
                  x1="60"
                  x2="940"
                  y1="20"
                  y2="20"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  className="flow-line"
                />
              </svg>
              {nodes.map((n, i) => (
                <motion.div
                  key={n.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative z-10 flex flex-col items-center gap-3"
                >
                  <div className="node-glow grid h-16 w-16 place-items-center rounded-2xl border border-hairline bg-background text-foreground">
                    <n.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="whitespace-nowrap text-xs font-medium text-foreground/80">
                    {n.label}
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

/* ---------- How It Works ---------- */
function HowItWorks() {
  const stages = [
    {
      icon: Compass,
      title: "Audit",
      desc: "We map your current funnel, tools, and where revenue leaks out.",
    },
    {
      icon: Plug,
      title: "Build",
      desc: "Custom automations and system logic engineered around your workflow.",
    },
    {
      icon: Workflow,
      title: "Integrate",
      desc: "Wired into GoHighLevel, AI, and your reporting layer end-to-end.",
    },
    {
      icon: Rocket,
      title: "Hand Over",
      desc: "Documented, tested, and shipped to your team with training.",
    },
  ];
  const [active, setActive] = useState(0);

  return (
    <section id="how" className="border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-primary">How it works</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            A four-stage engagement.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* progress line */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-hairline md:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: (active + 1) / stages.length }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-6 hidden h-px bg-primary md:block"
          />

          <div className="grid gap-6 md:grid-cols-4 md:gap-4">
            {stages.map((s, i) => {
              const isActive = i <= active;
              return (
                <motion.button
                  key={s.title}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group relative text-left"
                >
                  <div className="flex items-center gap-3 md:block">
                    <div
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-all ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-hairline bg-background text-muted-foreground"
                      }`}
                    >
                      <span className="text-sm font-semibold">0{i + 1}</span>
                    </div>
                  </div>
                  <div
                    className={`mt-5 rounded-xl border p-5 transition-all ${
                      isActive
                        ? "border-foreground/15 bg-background shadow-sm"
                        : "border-hairline bg-background/60"
                    } group-hover:-translate-y-0.5`}
                  >
                    <div className="flex items-center gap-2">
                      <s.icon className="h-4 w-4 text-primary" />
                      <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Proof ---------- */
function Proof() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-primary">Proof</div>
        </Reveal>
        <Reveal delay={0.05}>
          <blockquote className="mt-6 text-balance text-3xl font-medium leading-snug tracking-tight md:text-4xl">
            <span className="text-muted-foreground/50">“</span>
            [Client result goes here]
            <span className="text-muted-foreground/50">”</span>
          </blockquote>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Case studies coming soon.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section id="contact" className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-hairline bg-foreground p-10 text-background md:p-16">
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,var(--primary)_0%,transparent_45%),radial-gradient(circle_at_80%_80%,var(--primary)_0%,transparent_35%)]" />
            <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-end">
              <h2 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
                Ready to fix what's breaking between{" "}
                <span className="text-[color:var(--primary)]">enquiry and booking</span>?
              </h2>
              <div className="flex md:justify-end">
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/40"
                >
                  Book a Call
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
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
          <a href="#" className="flex items-center gap-2">
            <LogoMark />
            <span className="text-sm font-semibold tracking-tight">Solis</span>
          </a>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
            Backend systems and AI infrastructure for modern service businesses.
          </p>
          <a
            href="#"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-foreground hover:text-primary"
          >
            <Send className="h-3.5 w-3.5" />
            hello@solis.systems
          </a>
        </div>
        <FooterCol
          title="Product"
          links={[
            { l: "Services", h: "#services" },
            { l: "How It Works", h: "#how" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { l: "Contact", h: "#contact" },
            { l: "Privacy", h: "#" },
          ]}
        />
        <div className="text-xs text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Solis. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { l: string; h: string }[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</div>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.l}>
            <a href={l.h} className="text-xs text-muted-foreground hover:text-foreground">
              {l.l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
