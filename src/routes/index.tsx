import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
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
  Send,
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

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function Nav() {
  const [active, setActive] = useState<string>("services");

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
                onClick={() => smoothScrollTo(l.id)}
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
  // Solis mark: a stylised flowing "S" set on a primary-blue tile with a
  // subtle top-light gradient — echoing the uploaded reference but recoloured
  // to the brand's electric-blue + off-white identity.
  const ring =
    tone === "dark" ? "ring-background/20" : "ring-primary/30";
  return (
    <div
      className={`relative grid h-7 w-7 place-items-center overflow-hidden rounded-[8px] ring-1 ${ring}`}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <defs>
          <linearGradient id="solis-tile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.78" />
          </linearGradient>
          <linearGradient id="solis-s" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--surface)" />
            <stop offset="100%" stopColor="var(--background)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="32" height="32" rx="8" fill="url(#solis-tile)" />
        {/* Stylised S — top curl in light tone, tail curl slightly translucent */}
        <path
          d="M21.4 9.2c-1.4-1.3-3.3-2-5.4-2-3.6 0-6.3 2.1-6.3 5 0 2.6 1.9 4 5.7 4.9l1.7.4c2.1.5 3 1.1 3 2.1 0 1.3-1.4 2.2-3.6 2.2-2 0-3.9-.7-5.4-2l-1.6 2.4c1.9 1.6 4.4 2.5 6.9 2.5 4 0 6.7-2 6.7-5.1 0-2.7-1.9-4.1-6-5.1l-1.6-.4c-1.9-.5-2.8-1-2.8-1.9 0-1.2 1.3-2 3.3-2 1.6 0 3.1.5 4.4 1.5l1-2.5z"
          fill="url(#solis-s)"
        />
        <path
          d="M21.4 9.2c-1.4-1.3-3.3-2-5.4-2-3.6 0-6.3 2.1-6.3 5 0 2.6 1.9 4 5.7 4.9l1.7.4c2.1.5 3 1.1 3 2.1 0 1.3-1.4 2.2-3.6 2.2-2 0-3.9-.7-5.4-2l-1.6 2.4c1.9 1.6 4.4 2.5 6.9 2.5 4 0 6.7-2 6.7-5.1 0-2.7-1.9-4.1-6-5.1l-1.6-.4c-1.9-.5-2.8-1-2.8-1.9 0-1.2 1.3-2 3.3-2 1.6 0 3.1.5 4.4 1.5l1-2.5z"
          fill="black"
          fillOpacity="0.08"
          transform="translate(0.6 0.6)"
        />
      </svg>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_75%)]" />
      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center px-6 pt-24 pb-20 md:pt-32">
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Revenue operations infrastructure
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-4xl text-balance text-center text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-[76px]">
            The systems behind service{" "}
            <span className="text-primary">businesses that scale.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-center text-[17px] leading-relaxed text-muted-foreground md:text-[19px]">
            Solis builds the operational infrastructure that removes bottlenecks, automates the
            repetitive work slowing your team down, and gives you complete visibility into how your
            business actually runs.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => smoothScrollTo("contact")}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/25"
            >
              Book a Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => smoothScrollTo("platform")}
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              See how it works
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.35} className="mt-20 w-full">
          <div className="mx-auto max-w-5xl">
            <DashboardIllustration />
          </div>
        </Reveal>

        <Reveal delay={0.45} className="mt-16 w-full">
          <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 border-t border-hairline pt-8 text-sm">
            <Stat k="< 60s" v="Lead response" />
            <Stat k="24/7" v="Operational uptime" />
            <Stat k="Live" v="Revenue reporting" />
          </div>
        </Reveal>
      </div>
    </section>
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
          <div className="rounded-md bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
            solis.app / operations
          </div>
          <div className="w-10" />
        </div>

        <div className="grid grid-cols-2 gap-4 p-5 md:grid-cols-4">
          <MetricCard label="New Enquiries" value="248" delta="+12%" />
          <MetricCard label="Bookings" value="176" delta="+8%" accent />
          <MetricCard label="Response Time" value="42s" delta="-31%" />
          <MetricCard label="Conversion" value="71%" delta="+4%" />
        </div>

        <div className="grid grid-cols-1 gap-4 px-5 pb-5 md:grid-cols-5">
          <div className="rounded-xl border border-hairline bg-background p-5 md:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs font-medium">Bookings this week</div>
              <div className="text-[10px] text-muted-foreground">Live</div>
            </div>
            <ChartSVG />
          </div>
          <div className="rounded-xl border border-hairline bg-background p-5 md:col-span-2">
            <div className="mb-4 text-xs font-medium">Automation queue</div>
            <ul className="space-y-3">
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
      className={`rounded-xl border p-3.5 ${
        accent ? "border-primary/30 bg-primary/5" : "border-hairline bg-background"
      }`}
    >
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1.5 flex items-end justify-between">
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
    <svg viewBox="0 0 300 100" className="h-28 w-full">
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
      desc: "Enquiries aren't answered fast enough and prospects move on before you respond.",
    },
    {
      icon: GaugeCircle,
      title: "No visibility",
      desc: "You can't see what's driving revenue, what's stalling, or where the leaks are.",
    },
    {
      icon: Settings2,
      title: "Manual admin",
      desc: "Follow-ups, reminders, and reporting eat the hours your team should spend on customers.",
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
    <section id="platform" className="scroll-mt-20 border-t border-hairline bg-surface/40">
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
    <section id="how" className="scroll-mt-20 border-t border-hairline bg-surface/40">
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
          <div className="relative">
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
            className="relative overflow-hidden rounded-2xl border border-hairline bg-background p-8 md:p-12"
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
      icon: Plug,
      title: "Works with existing software",
      desc: "No unnecessary migrations or replacing platforms you already rely on.",
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
    <section className="border-t border-hairline bg-surface/40">
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

function LeadMagnet() {
  const totalSteps = QUIZ.length + 1; // + contact step
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", business: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const isQuizStep = step < QUIZ.length;
  const current = isQuizStep ? QUIZ[step] : null;
  const progress = Math.round(((step + (submitted ? 1 : 0)) / totalSteps) * 100);

  function select(value: string) {
    if (!current) return;
    setAnswers((a) => ({ ...a, [current.id]: value }));
    // Auto-advance unless "other" needs a text input
    if (!(current.hasOther && value === "other")) {
      setTimeout(() => setStep((s) => s + 1), 180);
    }
  }

  function next() {
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      submittedAt: new Date().toISOString(),
      answers,
      otherText,
      contact,
    };
    try {
      const key = "solis_audit_submissions";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      prev.push(payload);
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {
      /* ignore */
    }
    // Also log for the operator to review during development
    console.info("[Solis audit submission]", payload);
    setSubmitted(true);
  }

  const canContinueOther =
    current?.hasOther && answers[current.id] === "other"
      ? (otherText[current.id] || "").trim().length > 0
      : true;

  return (
    <section className="border-t border-hairline">
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
                  12 quick questions, 2 minutes, zero fluff — get a personalised breakdown of where
                  you're losing bookings.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "12-question diagnostic",
                    "Personalised written breakdown",
                    "Delivered within 48 hours",
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
                      : isQuizStep
                        ? `Question ${step + 1} of ${QUIZ.length}`
                        : "Your details"}
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

                {submitted ? (
                  <div className="flex flex-col items-center gap-4 py-8 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">Thanks — you're in.</h3>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      Your personalised audit will be in your inbox within 48 hours.
                    </p>
                  </div>
                ) : isQuizStep && current ? (
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
                        disabled={step === 0}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                      >
                        ← Back
                      </button>
                      {current.hasOther && answers[current.id] === "other" && (
                        <button
                          type="button"
                          onClick={next}
                          disabled={!canContinueOther}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/25 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        >
                          Continue
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={submit}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                      Where should we send your audit?
                    </h3>
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
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={back}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-primary/25"
                      >
                        Get My Free Audit
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                    <p className="mt-3 text-center text-[11px] text-muted-foreground">
                      We'll never share your details. Unsubscribe any time.
                    </p>
                  </motion.form>
                )}
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
          <a href="#" className="flex items-center gap-2">
            <LogoMark />
            <span className="text-sm font-semibold tracking-tight">Solis</span>
          </a>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
            Revenue operations infrastructure for modern service businesses.
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
          title="Platform"
          links={[
            { l: "Revenue Operations", id: "platform" },
            { l: "Services", id: "services" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { l: "How It Works", id: "how" },
            { l: "Contact", id: "contact" },
          ]}
        />
        <div className="text-xs text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Solis. All rights reserved.
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
