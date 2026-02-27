"use client";

import {
  LayoutDashboard,
  Table,
  Repeat,
  BarChart3,
  ShieldCheck,
  LifeBuoy,
  LayoutGrid,
  FileInput,
  MessageCircle,
} from "lucide-react";
import { useEffect } from "react";

// ─── Global Styles ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --white:    #ffffff;
    --off:      #fafaf8;
    --surface:  #f4f3ef;
    --border:   #e8e6e0;
    --border2:  #d4d0c8;
    --ink:      #111110;
    --ink2:     #3a3935;
    --muted:    #7a7870;
    --accent:   #e8390e;
    --blue:     #1a56db;
    --gold:     #d4960a;
    --shadow-sm: 0 1px 4px rgba(17,17,16,0.07), 0 1px 2px rgba(17,17,16,0.04);
    --shadow-lg: 0 16px 48px rgba(17,17,16,0.11), 0 4px 16px rgba(17,17,16,0.06);
  }

  .sp-page * { box-sizing: border-box; margin: 0; padding: 0; }
  .sp-page {
    font-family: 'Instrument Sans', sans-serif;
    background: var(--white);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ── Reveal ── */
  .sp-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .sp-reveal.visible { opacity: 1; transform: translateY(0); }
  .sp-rd1 { transition-delay: 0.06s; }
  .sp-rd2 { transition-delay: 0.12s; }
  .sp-rd3 { transition-delay: 0.18s; }

  /* ════════════════════════════════
     HERO HEADER
  ════════════════════════════════ */
  .sp-hero {
    padding: 7rem 7vw 5rem;
    background: var(--white);
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
  }
  .sp-hero::before {
    content: '';
    position: absolute;
    top: -20%; left: -10%;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .sp-hero::after {
    content: '';
    position: absolute;
    bottom: -20%; right: -8%;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  .sp-hero-inner {
    max-width: 720px;
    position: relative;
    z-index: 1;
  }

  .sp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1.25rem;
  }
  .sp-eyebrow-bar {
    width: 1.8rem; height: 1.5px;
    background: var(--accent);
    border-radius: 2px;
    flex-shrink: 0;
  }

  .sp-hero-h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.6rem, 5vw, 4.8rem);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.035em;
    color: var(--ink);
    margin-bottom: 1.25rem;
  }
  .sp-hero-h1 em {
    font-style: normal;
    color: var(--accent);
  }

  .sp-hero-sub {
    font-size: clamp(0.95rem, 1.2vw, 1.1rem);
    color: var(--muted);
    line-height: 1.75;
    font-weight: 400;
    max-width: 580px;
    margin-bottom: 2.5rem;
  }

  /* stat pills */
  .sp-hero-stats {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .sp-stat-pill {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.45rem 1.1rem;
  }
  .sp-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: -0.02em;
  }
  .sp-stat-label {
    font-size: 0.75rem;
    color: var(--muted);
    font-weight: 400;
  }
  .sp-stat-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  /* ════════════════════════════════
     SERVICES GRID
  ════════════════════════════════ */
  .sp-grid-section {
    padding: 5rem 7vw 7rem;
    background: var(--white);
  }

  .sp-section-label {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 3rem;
  }
  .sp-section-label-bar {
    width: 1.8rem; height: 1.5px;
    background: var(--blue);
    border-radius: 2px;
  }

  .sp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
  }
  @media (max-width: 1024px) { .sp-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px)  { .sp-grid { grid-template-columns: 1fr; } }

  /* individual card */
  .sp-card {
    background: var(--white);
    padding: 2.5rem 2.25rem;
    position: relative;
    overflow: hidden;
    transition: background 0.2s;
    cursor: default;
  }
  .sp-card:hover { background: var(--off); }
  .sp-card:hover .sp-card-arrow { opacity: 1; transform: translate(0, 0); }
  .sp-card:hover .sp-icon-wrap { background: var(--accent); }
  .sp-card:hover .sp-icon-wrap svg { color: #fff; }

  /* large ghost number */
  .sp-card-num {
    position: absolute;
    top: 0.75rem; right: 1.25rem;
    font-family: 'Syne', sans-serif;
    font-size: 4rem;
    font-weight: 800;
    color: rgba(17,17,16,0.04);
    line-height: 1;
    letter-spacing: -0.05em;
    pointer-events: none;
    user-select: none;
  }

  /* icon */
  .sp-icon-wrap {
    width: 3rem; height: 3rem;
    border-radius: 10px;
    background: rgba(232,57,14,0.07);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .sp-icon-wrap svg {
    width: 22px; height: 22px;
    color: var(--accent);
    transition: color 0.2s;
  }

  /* card text */
  .sp-card-tag {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }
  .sp-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--ink);
    margin-bottom: 0.8rem;
  }
  .sp-card-body {
    font-size: 0.87rem;
    color: var(--muted);
    line-height: 1.75;
    font-weight: 400;
  }

  /* hover arrow */
  .sp-card-arrow {
    position: absolute;
    bottom: 1.5rem; right: 1.5rem;
    width: 1.9rem; height: 1.9rem;
    border-radius: 50%;
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
    opacity: 0;
    transform: translate(4px, 4px);
    transition: opacity 0.2s, transform 0.2s;
  }
  .sp-card-arrow svg {
    width: 13px; height: 13px;
    color: #fff;
  }

  /* ════════════════════════════════
     CTA STRIP
  ════════════════════════════════ */
  .sp-cta {
    margin: 0 7vw 6rem;
    background: var(--ink);
    border-radius: 20px;
    padding: 4rem 5vw;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 2rem;
    position: relative;
    overflow: hidden;
  }
  @media (max-width: 700px) { .sp-cta { grid-template-columns: 1fr; margin: 0 1.5rem 4rem; padding: 3rem 2rem; } }

  .sp-cta::before {
    content: '';
    position: absolute; top: -30%; right: -8%;
    width: 450px; height: 450px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.15) 0%, transparent 60%);
    pointer-events: none;
  }
  .sp-cta::after {
    content: '';
    position: absolute; bottom: -40%; left: 15%;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.1) 0%, transparent 60%);
    pointer-events: none;
  }

  .sp-cta-eyebrow {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 0.85rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .sp-cta-eyebrow::before {
    content: '';
    width: 1.5rem; height: 1px;
    background: rgba(255,255,255,0.25);
  }
  .sp-cta-h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.6rem, 2.5vw, 2.4rem);
    font-weight: 800;
    color: var(--white);
    line-height: 1.15;
    letter-spacing: -0.025em;
    margin-bottom: 0.75rem;
  }
  .sp-cta-h2 em { font-style: normal; color: #ff6b3d; }
  .sp-cta-body {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.75;
    max-width: 420px;
  }
  .sp-btn-white {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--white);
    color: var(--ink);
    border: none;
    padding: 1rem 2.2rem;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-size: 0.88rem; font-weight: 700;
    text-decoration: none; cursor: pointer;
    white-space: nowrap;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.18);
    position: relative; z-index: 1;
  }
  .sp-btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.22); }
`;

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sp-reveal");
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

// ── Data ──────────────────────────────────────────────────────────────────────
const services = [
  {
    name: "Custom Web Apps",
    icon: LayoutDashboard,
    tag: "Development",
    description:
      "Design and develop tailored web applications within Google Workspace to solve specific business challenges such as project tracking, CRM systems, and more.",
  },
  {
    name: "WhatsApp Unofficial API",
    icon: MessageCircle,
    tag: "Messaging",
    description:
      "Integrate WhatsApp messaging into your applications. Send and receive messages, automate workflows, build chatbots, and connect WhatsApp seamlessly with your business systems.",
  },
  {
    name: "Spreadsheet-Based Tools",
    icon: Table,
    tag: "Data",
    description:
      "Create powerful, customized tools using Google Sheets for data management, analysis, and real-time reporting, optimized for your operational needs.",
  },
  {
    name: "Process Automation",
    icon: Repeat,
    tag: "Automation",
    description:
      "Automate routine tasks and streamline workflows using Apps Script and other tools, helping your team save time and focus on high-impact work.",
  },
  {
    name: "Data Analytics",
    icon: BarChart3,
    tag: "Analytics",
    description:
      "Transform raw data into actionable insights with tailored analytics solutions, including dashboards, KPIs, and trend analysis across your organization.",
  },
  {
    name: "Security & Compliance",
    icon: ShieldCheck,
    tag: "Security",
    description:
      "Implement robust security practices and ensure regulatory compliance with customized controls, audits, and monitoring solutions.",
  },
  {
    name: "Training & Support",
    icon: LifeBuoy,
    tag: "Support",
    description:
      "Provide comprehensive training and ongoing support to empower your team and ensure smooth adoption of new tools and processes.",
  },
  {
    name: "Dashboards & Intranets",
    icon: LayoutGrid,
    tag: "Infrastructure",
    description:
      "Develop centralized dashboards and intranet portals to give your team real-time access to key metrics, tools, and company resources.",
  },
  {
    name: "Web Forms & AppSheet",
    icon: FileInput,
    tag: "No-Code",
    description:
      "Build intuitive web forms for data collection and streamline operations using AppSheet's no-code/low-code platform for custom mobile and web apps.",
  },
];

const stats = [
  { num: "9+", label: "Services offered" },
  { num: "50+", label: "Businesses served" },
  { num: "100%", label: "Custom built" },
];

// ── Page ──────────────────────────────────────────────────────────────────────
function Page() {
  useReveal();

  return (
    <div className="sp-page">
      <style>{globalStyles}</style>

      {/* ── HERO ── */}
      <section className="sp-hero">
        <div className="sp-hero-inner sp-reveal">
          <div className="sp-eyebrow">
            <span className="sp-eyebrow-bar" />
            What We Do
          </div>
          <h1 className="sp-hero-h1">
            Our <em>Services</em>
          </h1>
          <p className="sp-hero-sub">
            From custom apps to automated workflows, we help you leverage the
            full potential of Google Workspace — and beyond — to achieve your
            business goals.
          </p>
          <div className="sp-hero-stats">
            {stats.map((s) => (
              <div key={s.num} className="sp-stat-pill">
                <span className="sp-stat-dot" />
                <span className="sp-stat-num">{s.num}</span>
                <span className="sp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="sp-grid-section">
        <div className="sp-section-label sp-reveal">
          <span className="sp-section-label-bar" />
          Full Service Catalogue
        </div>

        <div className="sp-grid">
          {services.map((service, i) => {
            const Icon = service.icon;
            const delayClass = [`sp-rd1`, `sp-rd2`, `sp-rd3`][i % 3];
            return (
              <div key={i} className={`sp-card sp-reveal ${delayClass}`}>
                {/* ghost number */}
                <span className="sp-card-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* icon */}
                <div className="sp-icon-wrap">
                  <Icon aria-hidden="true" />
                </div>

                {/* text */}
                <div className="sp-card-tag">{service.tag}</div>
                <h3 className="sp-card-title">{service.name}</h3>
                <p className="sp-card-body">{service.description}</p>

                {/* hover arrow */}
                <span className="sp-card-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="sp-cta sp-reveal">
        <div>
          <div className="sp-cta-eyebrow">Let's get started</div>
          <h2 className="sp-cta-h2">
            Ready to Automate
            <br />
            <em>Your Business?</em>
          </h2>
          <p className="sp-cta-body">
            Book a free consultation and we'll map out exactly which services
            can save your team the most time.
          </p>
        </div>
        <a href="/contact" className="sp-btn-white">
          Book a Free Call →
        </a>
      </div>
    </div>
  );
}

export default Page;
