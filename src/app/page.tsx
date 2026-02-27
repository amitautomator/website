"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const ExpandableCard = dynamic(() => import("@/components/ExpandableCard"));
const InfiniteMovingCards = dynamic(
  () => import("@/components/InfiniteMovingCards"),
  { ssr: false },
);

// ─── Global Styles ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --white:   #ffffff;
    --off:     #fafaf8;
    --surface: #f4f3ef;
    --border:  #e8e6e0;
    --border2: #d4d0c8;
    --ink:     #111110;
    --ink2:    #3a3935;
    --muted:   #7a7870;
    --accent:  #e8390e;
    --accent2: #ff6b3d;
    --blue:    #1a56db;
    --gold:    #d4960a;
    --shadow-sm: 0 1px 3px rgba(17,17,16,0.06), 0 1px 2px rgba(17,17,16,0.04);
    --shadow-md: 0 4px 16px rgba(17,17,16,0.08), 0 2px 6px rgba(17,17,16,0.05);
    --shadow-lg: 0 16px 48px rgba(17,17,16,0.12), 0 4px 16px rgba(17,17,16,0.06);
  }

  .ai-page * { box-sizing: border-box; margin: 0; padding: 0; }
  .ai-page {
    font-family: 'Instrument Sans', sans-serif;
    background: var(--white);
    color: var(--ink);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* ── Scroll reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-d1 { transition-delay: 0.1s; }
  .reveal-d2 { transition-delay: 0.2s; }
  .reveal-d3 { transition-delay: 0.3s; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    background: var(--white);
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 0 7vw;
    gap: 4rem;
    position: relative;
    overflow: hidden;
  }
  @media(max-width: 768px) {
    .hero { grid-template-columns: 1fr; padding: 7rem 1.5rem 3rem; gap: 2.5rem; }
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -15%; right: -8%;
    width: 60vw; height: 60vw;
    max-width: 720px; max-height: 720px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.055) 0%, rgba(26,86,219,0.03) 50%, transparent 72%);
    pointer-events: none;
  }
  .hero::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 1px;
    background: var(--border);
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.35rem 1rem;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 2rem;
  }
  .hero-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse-dot 2s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%,100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.45); opacity: 0.65; }
  }

  .hero-brand {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.6rem, 5vw, 5rem);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.035em;
    color: var(--ink);
    margin-bottom: 1.25rem;
  }
  .hero-brand .line-accent { color: var(--accent); }

  .hero-sub {
    font-size: clamp(0.95rem, 1.3vw, 1.1rem);
    color: var(--muted);
    font-weight: 400;
    line-height: 1.75;
    max-width: 440px;
    margin-bottom: 2.5rem;
  }

  .hero-cta-row {
    display: flex;
    gap: 0.9rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 0.9rem 2rem;
    border-radius: 7px;
    font-family: 'Syne', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 10px rgba(232,57,14,0.22), 0 1px 3px rgba(232,57,14,0.12);
  }
  .btn-primary:hover {
    background: #cc2f08;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(232,57,14,0.3);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: transparent;
    color: var(--ink);
    border: 1.5px solid var(--border2);
    padding: 0.9rem 2rem;
    border-radius: 7px;
    font-family: 'Syne', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
  }
  .btn-secondary:hover {
    border-color: var(--ink);
    background: var(--surface);
    transform: translateY(-2px);
  }

  .hero-stats {
    display: flex;
    gap: 2.5rem;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    flex-wrap: wrap;
  }
  .hero-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.03em;
  }
  .hero-stat-label {
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 0.15rem;
  }

  .hero-image-frame {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .hero-image-card {
    background: var(--off);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .hero-image-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(232,57,14,0.03) 0%, rgba(26,86,219,0.03) 100%);
  }

  /* ── MARQUEE ── */
  .marquee-strip {
    background: var(--ink);
    padding: 0.85rem 0;
    overflow: hidden;
  }
  .marquee-track {
    display: flex;
    animation: marquee 28s linear infinite;
    will-change: transform;
  }
  .marquee-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 2.5rem;
    font-family: 'Syne', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    white-space: nowrap;
    border-right: 1px solid rgba(255,255,255,0.07);
  }
  .marquee-dot { color: var(--accent); font-size: 0.45rem; }
  @keyframes marquee { to { transform: translateX(-50%); } }

  /* ── WORKSPACE ── */
  .workspace-section {
    padding: 8rem 7vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
    background: var(--white);
  }
  @media(max-width: 768px) { .workspace-section { grid-template-columns: 1fr; padding: 5rem 1.5rem; gap: 3rem; } }

  .eyebrow {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }
  .eyebrow-line { width: 1.8rem; height: 1.5px; border-radius: 2px; }
  .eyebrow-blue { color: var(--blue); }
  .eyebrow-line-blue { background: var(--blue); }
  .eyebrow-red { color: var(--accent); }
  .eyebrow-line-red { background: var(--accent); }
  .eyebrow-gold { color: var(--gold); }
  .eyebrow-line-gold { background: var(--gold); }

  .section-h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.9rem, 3.2vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: var(--ink);
    margin-bottom: 1.2rem;
  }
  .text-blue { color: var(--blue); }
  .text-accent { color: var(--accent); }

  .section-body {
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.8;
    margin-bottom: 2rem;
  }

  .feature-list { display: flex; flex-direction: column; gap: 0.7rem; }
  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
    color: var(--ink2);
  }
  .feature-check {
    width: 1.3rem; height: 1.3rem;
    background: rgba(26,86,219,0.08);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 0.62rem;
    color: var(--blue);
    font-weight: 700;
  }

  .workspace-img-wrap { position: relative; }
  .workspace-glow {
    position: absolute;
    inset: -4rem;
    background: radial-gradient(ellipse 65% 55% at 50% 50%, rgba(26,86,219,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── STEPS ── */
  .steps-section {
    padding: 7rem 7vw;
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .steps-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: end;
    margin-bottom: 4rem;
  }
  @media(max-width: 768px) { .steps-header { grid-template-columns: 1fr; } }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  @media(max-width: 768px) { .steps-grid { grid-template-columns: 1fr; } }

  .step-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s, border-color 0.25s;
    box-shadow: var(--shadow-sm);
    cursor: default;
  }
  .step-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent);
  }
  .step-card::before {
    content: attr(data-num);
    position: absolute;
    top: 1rem; right: 1.25rem;
    font-family: 'Syne', sans-serif;
    font-size: 3.5rem;
    font-weight: 800;
    color: rgba(232,57,14,0.05);
    line-height: 1;
    letter-spacing: -0.05em;
  }
  .step-icon {
    width: 3rem; height: 3rem;
    background: rgba(232,57,14,0.07);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
  }
  .step-tag {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }
  .step-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.08rem;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.3;
    margin-bottom: 0.7rem;
  }
  .step-body {
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.75;
  }

  /* ── EMAIL SECTION ── */
  .email-section {
    padding: 7rem 7vw;
    background: var(--white);
  }
  .email-header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 4rem;
  }

  /* ── CTA BAND ── */
  .cta-band {
    margin: 0 7vw 5rem;
    border-radius: 20px;
    background: var(--ink);
    padding: 5rem 5vw;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3rem;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  @media(max-width: 768px) { .cta-band { grid-template-columns: 1fr; margin: 0 1.5rem 4rem; padding: 3rem 2rem; } }
  .cta-band::before {
    content: '';
    position: absolute; top: -30%; right: -10%;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.14) 0%, transparent 60%);
    pointer-events: none;
  }
  .cta-band::after {
    content: '';
    position: absolute; bottom: -40%; left: 20%;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.1) 0%, transparent 60%);
    pointer-events: none;
  }
  .cta-eyebrow {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .cta-eyebrow::before { content: ''; width: 1.5rem; height: 1px; background: rgba(255,255,255,0.25); }
  .cta-h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 3vw, 2.8rem);
    font-weight: 800;
    color: var(--white);
    line-height: 1.1;
    letter-spacing: -0.025em;
    max-width: 520px;
    margin-bottom: 1rem;
  }
  .cta-h2 em { font-style: normal; color: var(--accent2); }
  .cta-body {
    font-size: 0.93rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.75;
    max-width: 440px;
  }
  .btn-white {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--white);
    color: var(--ink);
    border: none;
    padding: 1rem 2.2rem;
    border-radius: 7px;
    font-family: 'Syne', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.18);
    position: relative; z-index: 1;
  }
  .btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.22); }

  /* ── TESTIMONIALS ── */
  .testimonials-section {
    padding: 6rem 7vw 7rem;
    background: var(--off);
    border-top: 1px solid var(--border);
  }
  .testimonials-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  .t-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(232,57,14,0.07);
    border-radius: 100px;
    padding: 0.3rem 0.9rem;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.75rem;
  }
  .testimonials-h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.7rem, 2.4vw, 2.4rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  .testimonials-sub {
    color: var(--muted);
    font-size: 0.88rem;
    max-width: 240px;
    text-align: right;
    line-height: 1.65;
  }
  @media(max-width: 640px) { .testimonials-sub { text-align: left; max-width: none; } }

  .section-divider {
    width: 100%; height: 1px;
    background: var(--border);
  }
`;

// ─── Scroll observer ─────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible"),
        ),
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function Page() {
  useReveal();

  const testimonials = [
    {
      quote:
        "Stockouts and order mistakes were draining us. With Automate Ideas' system, everything is now tracked live on one dashboard. Our error rate has dropped massively, and we finally feel in control.",
      name: "Nitin Verma",
      title: "Vercha Jewels",
      image: "/Vercha.jpeg",
    },
    {
      quote:
        "Automate Ideas helped us cut through the chaos of handling leads, tasks, and payments manually. The Google Workspace + WhatsApp integration alone saves us several hours a week — it's been a total productivity boost.",
      name: "Narendra Vaid",
      title: "Copier World",
      image: "/copier-world.jpg",
    },
    {
      quote:
        "Payroll, leave tracking, compliance — all of it used to eat up time we didn't have. Automate Ideas built a system that runs these processes automatically. It's like having an extra team member who never makes mistakes.",
      name: "Chaitanya Agrawal",
      title: "Cranex Limited",
      image: "/cranex.webp",
    },
    {
      quote:
        "Month-end used to be chaos with invoicing and GST. Now, everything flows seamlessly with Automate Ideas' automation. Reports are ready on time, and the team isn't stressed anymore — it's been a game-changer.",
      name: "Saurabh Khandelwal",
      title: "Dhanvi Diamonds",
      image: "/dhanvi.png",
    },
    {
      quote:
        "Our sales process finally feels modern. From order forms to receipts, every step is automated and linked with WhatsApp and Google Workspace. Customers notice the difference, and so do we.",
      name: "Rahul Bhagat",
      title: "Bhagat Halwai",
      image: "/Bhagat_Halwai.webp",
    },
    {
      quote:
        "Invoicing was a nightmare before — slow, error-prone, and manual. Now PDFs are generated and emailed instantly. We save hours every week and look more professional to our clients.",
      name: "Raghbir Singh",
      title: "RAGHBIR ERECTORS & FABRICATORS",
      image: "/raghbir.png",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Consultation & Needs Assessment",
      body: "We take time to understand your goals, pain points, and workflow before proposing anything.",
      img: "/CO.svg",
    },
    {
      num: "02",
      title: "Custom Solution Design",
      body: "We craft a tailored automation strategy — no templates, no shortcuts — built for your exact business.",
      img: "/CS.svg",
    },
    {
      num: "03",
      title: "Implementation & Integration",
      body: "We wire our solutions into your existing tools — Google Workspace, WhatsApp, and more.",
      img: "/IN.svg",
    },
  ];

  const marqueeItems = [
    "Workflow Automation",
    "Google Workspace",
    "WhatsApp Integration",
    "Invoice Generation",
    "Live Dashboards",
    "GST Compliance",
    "Payroll Automation",
    "Lead Management",
    "Process Design",
  ];

  const stats = [
    { num: "50+", label: "Businesses automated" },
    { num: "6+", label: "Industries served" },
    { num: "10×", label: "Faster workflows" },
  ];

  const wsFeatures = [
    "Automated Google Sheets reporting",
    "Drive-based document management",
    "Gmail workflow triggers & auto-replies",
    "Google Forms → live dashboards",
  ];

  return (
    <div className="ai-page">
      <style>{globalStyles}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div>
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Business Automation Partner
          </div>
          <h1 className="hero-brand">
            Transform
            <br />
            Your Business
            <br />
            with <span className="line-accent">Automation</span>
          </h1>
          <p className="hero-sub">
            Discover fast, flexible automation that accelerates growth across
            every layer of your business — from operations to customer
            experience.
          </p>
          <div className="hero-cta-row">
            <Link href="/services" className="btn-primary">
              Explore Services →
            </Link>
            <Link href="/contact" className="btn-secondary">
              Book a Free Call
            </Link>
          </div>
          <div className="hero-stats">
            {stats.map((s) => (
              <div key={s.num}>
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-image-frame reveal">
          <div className="">
            <Image
              src="/H2.png"
              alt="Automate Ideas"
              width={480}
              height={480}
              priority
              className="relative w-full max-w-[460px]"
              style={{ zIndex: 1 }}
            />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-dot">◆</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── GOOGLE WORKSPACE ── */}
      <section className="workspace-section">
        <div className="workspace-img-wrap reveal">
          <div className="workspace-glow" aria-hidden="true" />
          <Image
            src="/H3.svg"
            alt="Google Workspace Integration"
            width={520}
            height={520}
            className="relative w-full max-w-[520px]"
            style={{ zIndex: 1 }}
          />
        </div>
        <div className="reveal reveal-d1">
          <div className="eyebrow eyebrow-blue">
            <span className="eyebrow-line eyebrow-line-blue" />
            Productivity Layer
          </div>
          <h2 className="section-h2">
            Unlock the Full Power of{" "}
            <span className="text-blue">Google Workspace</span>
          </h2>
          <p className="section-body">
            Seamlessly connect your business tools with Google Workspace.
            Automate document workflows, supercharge team collaboration, and
            eliminate repetitive manual tasks — all from one unified
            environment.
          </p>
          <div className="feature-list">
            {wsFeatures.map((feat) => (
              <div key={feat} className="feature-item">
                <div className="feature-check">✓</div>
                {feat}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── STEPS ── */}
      <section className="steps-section">
        <div className="steps-header">
          <div className="reveal">
            <div className="eyebrow eyebrow-red">
              <span className="eyebrow-line eyebrow-line-red" />
              Our Process
            </div>
            <h2 className="section-h2">
              Revolutionize Your Workflow in 3 Strategic Steps
            </h2>
          </div>
          <p
            className="section-body reveal reveal-d1"
            style={{ marginBottom: 0 }}
          >
            A proven methodology — from discovery to deployment — designed to
            deliver lasting impact without the complexity.
          </p>
        </div>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`step-card reveal reveal-d${i + 1}`}
              data-num={step.num}
            >
              <div className="step-icon">
                <Image src={step.img} alt={step.title} width={26} height={26} />
              </div>
              <div className="step-tag">Step {step.num}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-body">{step.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EMAIL INTEGRATION ── */}
      <section className="email-section">
        <div className="email-header reveal">
          <div
            className="eyebrow eyebrow-gold"
            style={{ justifyContent: "center" }}
          >
            <span className="eyebrow-line eyebrow-line-gold" />
            Communication Automation
          </div>
          <h2 className="section-h2" style={{ textAlign: "center" }}>
            Seamless Email Integration for Enhanced Collaboration
          </h2>
          <p
            className="section-body"
            style={{ textAlign: "center", marginBottom: 0 }}
          >
            Smart triggers, templated messaging, and unified inboxes — all
            automated.
          </p>
        </div>
        <div className="reveal reveal-d1">
          <ExpandableCard />
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <div className="cta-band reveal">
        <div>
          <div className="cta-eyebrow">Ready to scale?</div>
          <h2 className="cta-h2">
            Comprehensive Solutions,
            <br />
            <em>Tailored for Your Business</em>
          </h2>
          <p className="cta-body">
            From workflow automation to deep data integration — explore every
            solution we've built to help Indian businesses move faster and
            smarter.
          </p>
        </div>
        <Link href="/services" className="btn-white">
          Explore All Services →
        </Link>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="testimonials-header reveal">
          <div>
            <div className="t-badge">⭐ Client Stories</div>
            <h2 className="testimonials-h2">What Our Clients Say</h2>
          </div>
          <div className="testimonials-sub">
            Our workflow has never been smoother thanks to Automate Ideas.
          </div>
        </div>
        <div
          className="reveal reveal-d1"
          style={{ overflow: "hidden", borderRadius: "12px" }}
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
          />
        </div>
      </section>
    </div>
  );
}

export default Page;
