"use client";

import { useEffect } from "react";
import { Check, MessageCircle, Zap, Crown } from "lucide-react";
import Link from "next/link";

// ─── Global Styles ────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  :root {
    --white:   #ffffff;
    --off:     #fafaf8;
    --surface: #f5f4f0;
    --border:  #e9e7e1;
    --border2: #d6d2c9;
    --ink:     #0f0f0e;
    --ink2:    #38372f;
    --muted:   #7c7a72;
    --accent:  #e8390e;
    --accent2: #ff6b3d;
    --blue:    #1a56db;
    --gold:    #c98a06;
    --shadow-sm: 0 1px 3px rgba(15,15,14,0.06), 0 1px 2px rgba(15,15,14,0.04);
    --shadow-md: 0 4px 16px rgba(15,15,14,0.08), 0 2px 6px rgba(15,15,14,0.05);
    --shadow-lg: 0 16px 48px rgba(15,15,14,0.11), 0 4px 16px rgba(15,15,14,0.06);
    --font-display: 'DM Serif Display', Georgia, serif;
    --font-body:    'DM Sans', system-ui, sans-serif;
  }

  .pp-page *, .pp-page *::before, .pp-page *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }
  .pp-page {
    font-family: var(--font-body);
    background: var(--white);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* ── Reveal ── */
  .pp-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .pp-reveal.visible { opacity: 1; transform: translateY(0); }
  .pp-rd1 { transition-delay: 0.08s; }
  .pp-rd2 { transition-delay: 0.16s; }
  .pp-rd3 { transition-delay: 0.24s; }

  /* ════════════════════════════════
     HERO
  ════════════════════════════════ */
  .pp-hero {
    padding: 7rem 7vw 5.5rem;
    background: var(--white);
    border-bottom: 1px solid var(--border);
    position: relative; overflow: hidden;
  }
  .pp-hero::before {
    content: '';
    position: absolute; top: -20%; right: -10%;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.05) 0%, rgba(26,86,219,0.03) 50%, transparent 70%);
    pointer-events: none;
  }
  .pp-hero-inner { max-width: 680px; position: relative; z-index: 1; }

  /* Eyebrow — mirrors homepage .eyebrow */
  .pp-eyebrow {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 1.25rem;
  }
  .pp-eyebrow-bar {
    width: 1.8rem; height: 1.5px;
    background: var(--accent); border-radius: 2px; flex-shrink: 0;
  }

  /*
   * Hero heading — DM Serif Display weight 400, same as homepage .hero-brand.
   * Italic accent word mirrors .line-accent.
   */
  .pp-hero-h1 {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5.2vw, 5rem);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin-bottom: 1.4rem;
  }
  .pp-hero-h1 em {
    font-style: italic;
    color: var(--accent);
  }

  /* Hero sub — matches homepage .hero-sub */
  .pp-hero-sub {
    font-family: var(--font-body);
    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
    color: var(--muted); line-height: 1.8;
    font-weight: 400; max-width: 560px;
    letter-spacing: 0.005em;
  }

  /* ════════════════════════════════
     SHARED SECTION EYEBROW
  ════════════════════════════════ */
  .pp-section-eyebrow {
    display: flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    margin-bottom: 3rem;
  }
  .pp-section-eyebrow-bar { width: 1.8rem; height: 1.5px; border-radius: 2px; flex-shrink: 0; }
  .pp-blue { color: var(--blue); } .pp-bar-blue { background: var(--blue); }
  .pp-gold  { color: var(--gold); } .pp-bar-gold  { background: var(--gold); }
  .pp-red   { color: var(--accent); } .pp-bar-red   { background: var(--accent); }

  /* ════════════════════════════════
     CUSTOM PROJECT SECTION
  ════════════════════════════════ */
  .pp-custom {
    padding: 5.5rem 7vw 4.5rem;
    background: var(--white);
  }

  .pp-custom-card {
    background: var(--off);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 3.5rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 4rem;
    align-items: center;
    position: relative; overflow: hidden;
  }
  @media (max-width: 768px) {
    .pp-custom-card { grid-template-columns: 1fr; padding: 2.5rem 2rem; gap: 2rem; }
  }
  .pp-custom-card::before {
    content: '';
    position: absolute; bottom: -20%; left: 40%;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.04) 0%, transparent 65%);
    pointer-events: none;
  }

  /*
   * Custom card heading — DM Serif Display, matches .section-h2 pattern.
   */
  .pp-custom-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.7rem, 2.6vw, 2.4rem);
    font-weight: 400; line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--ink); margin-bottom: 1rem;
  }

  /* Body copy — matches homepage .section-body */
  .pp-custom-body {
    font-family: var(--font-body);
    font-size: 0.97rem; color: var(--muted);
    line-height: 1.85; margin-bottom: 1.75rem;
    max-width: 500px; font-weight: 400;
    letter-spacing: 0.005em;
  }

  /* Tag chips — mirrors homepage .hero-badge style */
  .pp-chips { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem; }
  .pp-chip {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.38rem 1rem;
    font-family: var(--font-body);
    font-size: 0.75rem; font-weight: 400; color: var(--ink2);
    letter-spacing: 0.005em;
    transition: border-color 0.2s, background 0.2s;
  }
  .pp-chip::before { content: '◆'; font-size: 0.35rem; color: var(--accent); }
  .pp-chip:hover { border-color: var(--accent); background: rgba(232,57,14,0.03); }

  /* Infinity orb */
  .pp-orb {
    width: 180px; height: 180px;
    border-radius: 50%;
    background: var(--ink);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    flex-shrink: 0; position: relative;
    box-shadow: var(--shadow-lg);
  }
  .pp-orb::before {
    content: '';
    position: absolute; inset: -1px; border-radius: 50%;
    background: linear-gradient(135deg, rgba(232,57,14,0.4), rgba(26,86,219,0.3));
    z-index: -1;
  }
  /*
   * Orb symbol uses DM Serif Display — elegant at large size, consistent with
   * stat numbers and section headings.
   */
  .pp-orb-symbol {
    font-family: var(--font-display);
    font-size: 3.2rem; font-weight: 400;
    color: var(--white); line-height: 1; margin-bottom: 0.25rem;
  }
  .pp-orb-label {
    font-family: var(--font-body);
    font-size: 0.85rem; color: rgba(255,255,255,0.7);
    font-weight: 400; letter-spacing: 0.02em;
  }
  .pp-orb-sub {
    font-family: var(--font-body);
    font-size: 0.7rem; color: rgba(255,255,255,0.4);
    margin-top: 0.1rem; letter-spacing: 0.02em;
  }

  /* Primary button — mirrors homepage .btn-primary exactly */
  .pp-btn-primary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--accent); color: #fff; border: none;
    padding: 0.88rem 2rem; border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.85rem; font-weight: 600; letter-spacing: 0.02em;
    text-decoration: none; cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 10px rgba(232,57,14,0.2), 0 1px 3px rgba(232,57,14,0.1);
  }
  .pp-btn-primary:hover {
    background: #cc2f08;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(232,57,14,0.28);
  }
  .pp-btn-primary svg { width: 16px; height: 16px; }

  /* ════════════════════════════════
     WHATSAPP PLANS
  ════════════════════════════════ */
  .pp-plans {
    padding: 4.5rem 7vw 5.5rem;
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .pp-plans-header {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 3rem; align-items: end; margin-bottom: 3.5rem;
  }
  @media (max-width: 768px) { .pp-plans-header { grid-template-columns: 1fr; } }

  /* Plans heading — matches .section-h2 */
  .pp-plans-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 2.8vw, 2.8rem);
    font-weight: 400; line-height: 1.15;
    letter-spacing: -0.01em; color: var(--ink);
  }

  /* Plans sub — matches .section-body */
  .pp-plans-sub {
    font-family: var(--font-body);
    font-size: 0.97rem; color: var(--muted);
    line-height: 1.85; font-weight: 400;
    letter-spacing: 0.005em;
  }

  .pp-plans-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    align-items: start;
  }
  @media (max-width: 900px) { .pp-plans-grid { grid-template-columns: 1fr; } }
  @media (min-width: 601px) and (max-width: 900px) { .pp-plans-grid { grid-template-columns: 1fr 1fr; } }

  /* Plan card — mirrors homepage .step-card */
  .pp-plan-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 2.25rem 2rem;
    position: relative; overflow: hidden;
    transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.28s, border-color 0.28s;
    box-shadow: var(--shadow-sm);
  }
  .pp-plan-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--border2);
  }
  .pp-plan-card.pp-popular {
    border-color: var(--accent);
    box-shadow: 0 0 0 1px var(--accent), var(--shadow-md);
  }
  .pp-plan-card.pp-popular:hover {
    box-shadow: 0 0 0 1px var(--accent), var(--shadow-lg);
  }

  /* Popular badge */
  .pp-badge {
    position: absolute; top: -1px; right: 1.5rem;
    font-family: var(--font-body);
    font-size: 0.65rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    background: var(--accent); color: #fff;
    padding: 0.35rem 0.85rem;
    border-radius: 0 0 8px 8px;
  }
  .pp-badge-gold { background: var(--gold); }

  /* Plan icon — matches homepage .step-icon */
  .pp-plan-icon {
    width: 2.8rem; height: 2.8rem;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
  }
  .pp-plan-icon svg { width: 20px; height: 20px; }
  .pp-icon-blue { background: rgba(26,86,219,0.07); } .pp-icon-blue svg { color: var(--blue); }
  .pp-icon-red  { background: rgba(232,57,14,0.07); } .pp-icon-red svg  { color: var(--accent); }
  .pp-icon-gold { background: rgba(201,138,6,0.09); } .pp-icon-gold svg { color: var(--gold); }

  /* Plan name — matches .step-tag */
  .pp-plan-name {
    font-family: var(--font-body);
    font-size: 0.66rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 0.35rem;
  }

  /* Plan title — matches .step-title */
  .pp-plan-title {
    font-family: var(--font-display);
    font-size: 1.15rem; font-weight: 400;
    color: var(--ink); margin-bottom: 1rem; line-height: 1.3;
  }

  .pp-plan-price {
    display: flex; align-items: baseline; gap: 0.25rem;
    margin-bottom: 0.4rem;
  }
  /*
   * Price amount — DM Serif Display, matches .hero-stat-num scale/style.
   */
  .pp-price-amount {
    font-family: var(--font-display);
    font-size: 2.2rem; font-weight: 400;
    letter-spacing: -0.02em; color: var(--ink); line-height: 1;
  }
  .pp-price-period {
    font-family: var(--font-body);
    font-size: 0.78rem; color: var(--muted);
    font-weight: 400; line-height: 1.4;
    max-width: 120px; letter-spacing: 0.005em;
  }

  /* Credits box */
  .pp-credits {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.9rem 1.25rem;
    margin: 1.25rem 0;
    display: flex; align-items: center; justify-content: space-between;
  }
  .pp-credits-num {
    font-family: var(--font-display);
    font-size: 1.5rem; font-weight: 400;
    color: var(--ink); letter-spacing: -0.02em; line-height: 1.1;
  }
  .pp-credits-label {
    font-family: var(--font-body);
    font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);
  }

  /* Features list — mirrors .feature-list / .feature-item on homepage */
  .pp-features {
    display: flex; flex-direction: column; gap: 0.7rem;
    margin-bottom: 1.75rem; list-style: none;
  }
  .pp-feature {
    display: flex; align-items: center; gap: 0.75rem;
    font-family: var(--font-body);
    font-size: 0.875rem; color: var(--ink2);
    line-height: 1.4; font-weight: 400; letter-spacing: 0.005em;
  }
  /* Check icon — mirrors homepage .feature-check */
  .pp-check {
    width: 1.25rem; height: 1.25rem; border-radius: 50%;
    background: rgba(26,86,219,0.07);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .pp-check svg { width: 11px; height: 11px; color: var(--blue); }
  .pp-popular .pp-check { background: rgba(232,57,14,0.09); }
  .pp-popular .pp-check svg { color: var(--accent); }

  /* Plan CTA buttons */
  .pp-plan-btn {
    display: flex; align-items: center; justify-content: center;
    width: 100%; padding: 0.85rem;
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.875rem; font-weight: 600; letter-spacing: 0.01em;
    text-decoration: none; cursor: pointer; border: none;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s, border-color 0.2s;
  }
  /* Outline — mirrors homepage .btn-secondary */
  .pp-plan-btn-outline {
    background: transparent;
    border: 1.5px solid var(--border2);
    color: var(--ink);
  }
  .pp-plan-btn-outline:hover {
    border-color: var(--ink);
    background: var(--surface);
    transform: translateY(-2px);
  }
  /* Filled — mirrors homepage .btn-primary */
  .pp-plan-btn-filled {
    background: var(--accent); color: #fff;
    box-shadow: 0 2px 10px rgba(232,57,14,0.2), 0 1px 3px rgba(232,57,14,0.1);
  }
  .pp-plan-btn-filled:hover {
    background: #cc2f08;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(232,57,14,0.28);
  }
  /* Dark — dark inverse button */
  .pp-plan-btn-dark {
    background: var(--ink); color: var(--white);
  }
  .pp-plan-btn-dark:hover {
    background: var(--ink2);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(15,15,14,0.2);
  }

  /* ════════════════════════════════
     ENTERPRISE CTA — mirrors homepage .cta-band exactly
  ════════════════════════════════ */
  .pp-enterprise {
    margin: 5rem 7vw 6rem;
    background: var(--ink);
    border-radius: 18px;
    padding: 5rem 5vw;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 3rem;
    position: relative; overflow: hidden;
  }
  @media (max-width: 700px) {
    .pp-enterprise { grid-template-columns: 1fr; margin: 4rem 1.5rem; padding: 3rem 2rem; }
  }
  .pp-enterprise::before {
    content: '';
    position: absolute; top: -30%; right: -8%;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .pp-enterprise::after {
    content: '';
    position: absolute; bottom: -40%; left: 20%;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
  .pp-ent-eyebrow {
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.3); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .pp-ent-eyebrow::before { content: ''; width: 1.5rem; height: 1px; background: rgba(255,255,255,0.2); }

  /* CTA heading — matches homepage .cta-h2 */
  .pp-ent-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 3vw, 2.9rem);
    font-weight: 400; color: var(--white);
    line-height: 1.15; letter-spacing: -0.01em;
    max-width: 520px; margin-bottom: 1rem;
  }
  .pp-ent-h2 em { font-style: italic; color: var(--accent2); }

  .pp-ent-body {
    font-family: var(--font-body);
    font-size: 0.92rem; color: rgba(255,255,255,0.4);
    line-height: 1.8; max-width: 440px; font-weight: 400;
    letter-spacing: 0.005em;
  }

  /* White button — mirrors homepage .btn-white exactly */
  .pp-btn-white {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--white); color: var(--ink); border: none;
    padding: 1rem 2.2rem; border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.85rem; font-weight: 600; letter-spacing: 0.01em;
    text-decoration: none; cursor: pointer; white-space: nowrap;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.16);
    position: relative; z-index: 1;
  }
  .pp-btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.2); }
  .pp-btn-white svg { width: 16px; height: 16px; }
`;

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".pp-reveal");
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
const whatsappPlans = [
  {
    id: 1,
    name: "Basic",
    title: "Basic Plan",
    price: "₹2,499",
    period: "/ year\nexcl. GST 18%",
    credits: "10,000",
    icon: MessageCircle,
    iconClass: "pp-icon-blue",
    btnClass: "pp-plan-btn-outline",
    btnLabel: "Get Started",
    popular: false,
    badge: null,
    badgeClass: "",
    features: ["Up to 10,000 Credits", "API Access", "Basic Analytics"],
  },
  {
    id: 2,
    name: "Pro",
    title: "Pro Plan",
    price: "₹7,680",
    period: "/ year\nexcl. GST 18%",
    credits: "48,000",
    icon: Zap,
    iconClass: "pp-icon-red",
    btnClass: "pp-plan-btn-filled",
    btnLabel: "Get Started",
    popular: true,
    badge: "Most Popular",
    badgeClass: "",
    features: [
      "Up to 48,000 Messages",
      "Priority API Access",
      "Priority Support",
      "99.9% Uptime SLA",
    ],
  },
  {
    id: 3,
    name: "Business",
    title: "Business Plan",
    price: "₹12,000",
    period: "/ year\nexcl. GST 18%",
    credits: "Unlimited",
    icon: Crown,
    iconClass: "pp-icon-gold",
    btnClass: "pp-plan-btn-dark",
    btnLabel: "Contact Us",
    popular: false,
    badge: "Enterprise",
    badgeClass: "pp-badge-gold",
    features: [
      "Premium API Access",
      "Real-time Analytics",
      "Custom Integrations",
    ],
  },
];

const customChips = [
  "Web Applications",
  "Google Sheets + WhatsApp",
  "Custom Web Forms",
  "Custom Solutions",
];

// ── Page ──────────────────────────────────────────────────────────────────────
function Page() {
  useReveal();

  return (
    <div className="pp-page">
      <style>{globalStyles}</style>

      {/* ── HERO ── */}
      <section className="pp-hero">
        <div className="pp-hero-inner pp-reveal">
          <div className="pp-eyebrow">
            <span className="pp-eyebrow-bar" />
            Transparent & Flexible
          </div>
          <h1 className="pp-hero-h1">
            Simple,
            <br />
            Honest <em>Pricing</em>
          </h1>
          <p className="pp-hero-sub">
            Every project is unique. Our pricing reflects your requirements and
            complexity — no hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* ── CUSTOM PROJECTS ── */}
      <section className="pp-custom">
        <div className="pp-section-eyebrow pp-blue pp-reveal">
          <span className="pp-section-eyebrow-bar pp-bar-blue" />
          Project-Based Pricing
        </div>
        <div className="pp-custom-card pp-reveal pp-rd1">
          <div>
            <h2 className="pp-custom-h2">Custom Project Pricing</h2>
            <p className="pp-custom-body">
              Whether it's a small feature or a full-scale application, we offer
              flexible pricing tailored to your requirements. Share your idea
              and we'll provide a quote based on scope, timeline, and
              complexity.
            </p>
            <div className="pp-chips">
              {customChips.map((chip) => (
                <span key={chip} className="pp-chip">
                  {chip}
                </span>
              ))}
            </div>
            <Link href="/contact" className="pp-btn-primary">
              <MessageCircle />
              Get a Custom Quote
            </Link>
          </div>

          {/* Orb */}
          <div className="pp-orb" aria-hidden="true">
            <div className="pp-orb-symbol">∞</div>
            <div className="pp-orb-label">Unlimited</div>
            <div className="pp-orb-sub">Possibilities</div>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP PLANS ── */}
      <section className="pp-plans">
        <div className="pp-plans-header">
          <div className="pp-reveal">
            <div
              className="pp-section-eyebrow pp-gold"
              style={{ marginBottom: "1rem" }}
            >
              <span className="pp-section-eyebrow-bar pp-bar-gold" />
              WhatsApp API Platform
            </div>
            <h2 className="pp-plans-h2">WhatsApp API Pricing</h2>
          </div>
          <p className="pp-plans-sub pp-reveal pp-rd1">
            Fixed pricing for our WhatsApp API platform with enterprise-grade
            features, reliable uptime, and priority support.
          </p>
        </div>

        <div className="pp-plans-grid">
          {whatsappPlans.map((plan, i) => {
            const Icon = plan.icon;
            const delayClass = ["pp-rd1", "pp-rd2", "pp-rd3"][i];
            return (
              <div
                key={plan.id}
                className={`pp-plan-card pp-reveal ${delayClass} ${plan.popular ? "pp-popular" : ""}`}
              >
                {plan.badge && (
                  <div className={`pp-badge ${plan.badgeClass}`}>
                    {plan.badge}
                  </div>
                )}

                <div className={`pp-plan-icon ${plan.iconClass}`}>
                  <Icon aria-hidden="true" />
                </div>

                <div className="pp-plan-name">{plan.name}</div>
                <div className="pp-plan-title">{plan.title}</div>

                <div className="pp-plan-price">
                  <span className="pp-price-amount">{plan.price}</span>
                  <span
                    className="pp-price-period"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {plan.period}
                  </span>
                </div>

                <div className="pp-credits">
                  <div>
                    <div className="pp-credits-num">{plan.credits}</div>
                    <div className="pp-credits-label">Credits / year</div>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "var(--muted)" }}
                  >
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>

                <ul className="pp-features">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="pp-feature">
                      <span className="pp-check">
                        <Check aria-hidden="true" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <button className={`pp-plan-btn ${plan.btnClass}`}>
                  {plan.btnLabel} →
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ENTERPRISE CTA ── */}
      <div className="pp-enterprise pp-reveal">
        <div>
          <div className="pp-ent-eyebrow">Enterprise & Volume</div>
          <h2 className="pp-ent-h2">
            Need Something
            <br />
            <em>Bigger?</em>
          </h2>
          <p className="pp-ent-body">
            All plans include API access, analytics, and support. Contact us for
            custom enterprise needs and volume discounts.
          </p>
        </div>
        <Link href="/contact" className="pp-btn-white">
          <MessageCircle />
          Contact for Enterprise
        </Link>
      </div>
    </div>
  );
}

export default Page;
