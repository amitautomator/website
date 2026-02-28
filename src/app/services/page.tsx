"use client";

import {
  Repeat,
  LayoutDashboard,
  BarChart3,
  MessageCircle,
  Smartphone,
  Search,
  Megaphone,
  TrendingUp,
  Mail,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useEffect } from "react";
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
    --green:   #16a34a;
    --shadow-sm: 0 1px 3px rgba(15,15,14,0.06), 0 1px 2px rgba(15,15,14,0.04);
    --shadow-md: 0 4px 16px rgba(15,15,14,0.08), 0 2px 6px rgba(15,15,14,0.05);
    --shadow-lg: 0 16px 48px rgba(15,15,14,0.11), 0 4px 16px rgba(15,15,14,0.06);
    --font-display: 'DM Serif Display', Georgia, serif;
    --font-body:    'DM Sans', system-ui, sans-serif;

    /* Spacing scale */
    --px: clamp(1.25rem, 5vw, 5rem);   /* horizontal page padding */
    --section-pt: clamp(3rem, 6vw, 5.5rem);
    --section-pb: clamp(3rem, 6vw, 5.5rem);
  }

  .sp-page *, .sp-page *::before, .sp-page *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }
  .sp-page {
    font-family: var(--font-body);
    background: var(--white);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* ── Reveal ── */
  .sp-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .sp-reveal.visible { opacity: 1; transform: translateY(0); }
  .sp-rd1 { transition-delay: 0.06s; }
  .sp-rd2 { transition-delay: 0.12s; }
  .sp-rd3 { transition-delay: 0.18s; }
  .sp-rd4 { transition-delay: 0.24s; }

  /* ════════════════════════════════
     HERO
  ════════════════════════════════ */
  .sp-hero {
    padding: clamp(4rem, 8vw, 7rem) var(--px) clamp(3rem, 5vw, 5.5rem);
    background: var(--white);
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
  }
  .sp-hero::before {
    content: '';
    position: absolute; top: -20%; left: -10%;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .sp-hero::after {
    content: '';
    position: absolute; bottom: -20%; right: -8%;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .sp-hero-inner { max-width: 780px; position: relative; z-index: 1; }

  .sp-eyebrow {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 1.25rem;
  }
  .sp-eyebrow-bar {
    width: 1.8rem; height: 1.5px;
    background: var(--accent); border-radius: 2px; flex-shrink: 0;
  }

  .sp-hero-h1 {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 5.2vw, 5rem);
    font-weight: 400; line-height: 1.05;
    letter-spacing: -0.01em; color: var(--ink); margin-bottom: 1.4rem;
  }
  .sp-hero-h1 em { font-style: italic; color: var(--accent); }

  .sp-hero-sub {
    font-family: var(--font-body);
    font-size: clamp(0.9rem, 1.2vw, 1.05rem);
    color: var(--muted); line-height: 1.8; font-weight: 400;
    max-width: 600px; margin-bottom: 2.5rem; letter-spacing: 0.005em;
  }

  .sp-hero-stats {
    display: flex; gap: 0.75rem; flex-wrap: wrap;
  }
  .sp-stat-pill {
    display: flex; align-items: center; gap: 0.55rem;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 100px; padding: 0.42rem 1.1rem;
  }
  .sp-stat-num {
    font-family: var(--font-display);
    font-size: 1rem; font-weight: 400;
    color: var(--ink); letter-spacing: -0.01em;
  }
  .sp-stat-label {
    font-family: var(--font-body);
    font-size: 0.75rem; color: var(--muted); font-weight: 400; letter-spacing: 0.005em;
  }
  .sp-stat-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ════════════════════════════════
     STICKY CATEGORY NAV
  ════════════════════════════════ */
  .sp-cat-nav {
    position: sticky; top: 0; z-index: 40;
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    display: flex;
    padding: 0 var(--px);
    overflow-x: auto; gap: 0;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .sp-cat-nav::-webkit-scrollbar { display: none; }

  .sp-cat-tab {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 1rem clamp(0.75rem, 1.5vw, 1.4rem);
    font-family: var(--font-body);
    font-size: 0.8rem; font-weight: 500;
    color: var(--muted); text-decoration: none;
    border-bottom: 2px solid transparent;
    white-space: nowrap; letter-spacing: 0.01em;
    transition: color 0.2s, border-color 0.2s;
    flex-shrink: 0;
  }
  .sp-cat-tab:hover { color: var(--ink); }

  .sp-tab-blue:hover,  .sp-tab-blue.active  { color: var(--blue);   border-color: var(--blue); }
  .sp-tab-green:hover, .sp-tab-green.active { color: var(--green);  border-color: var(--green); }
  .sp-tab-gold:hover,  .sp-tab-gold.active  { color: var(--gold);   border-color: var(--gold); }
  .sp-tab-red:hover,   .sp-tab-red.active   { color: var(--accent); border-color: var(--accent); }

  .sp-cat-count {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 1.3rem; height: 1.3rem; border-radius: 100px;
    padding: 0 0.35rem;
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0;
  }
  .sp-count-blue  { background: rgba(26,86,219,0.09);  color: var(--blue); }
  .sp-count-green { background: rgba(22,163,74,0.09);  color: var(--green); }
  .sp-count-gold  { background: rgba(201,138,6,0.09);  color: var(--gold); }
  .sp-count-red   { background: rgba(232,57,14,0.09);  color: var(--accent); }

  /* ════════════════════════════════
     CATEGORY SECTION
  ════════════════════════════════ */
  .sp-cat-section {
    padding: var(--section-pt) var(--px) var(--section-pb);
  }
  .sp-cat-section.sp-alt {
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  /* Category header — two-column */
  .sp-cat-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: end;
    margin-bottom: 3.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid var(--border);
  }

  /* Section eyebrow */
  .sp-sec-eyebrow {
    display: flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    margin-bottom: 0.8rem;
  }
  .sp-sec-eyebrow-bar { width: 1.8rem; height: 1.5px; border-radius: 2px; flex-shrink: 0; }
  .sp-ey-blue  { color: var(--blue);   } .sp-ey-blue  .sp-sec-eyebrow-bar { background: var(--blue); }
  .sp-ey-green { color: var(--green);  } .sp-ey-green .sp-sec-eyebrow-bar { background: var(--green); }
  .sp-ey-gold  { color: var(--gold);   } .sp-ey-gold  .sp-sec-eyebrow-bar { background: var(--gold); }
  .sp-ey-red   { color: var(--accent); } .sp-ey-red   .sp-sec-eyebrow-bar { background: var(--accent); }

  /* Category h2 */
  .sp-cat-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 2.6vw, 2.6rem);
    font-weight: 400; line-height: 1.12;
    letter-spacing: -0.01em; color: var(--ink);
  }

  /* Category description */
  .sp-cat-desc {
    font-family: var(--font-body);
    font-size: clamp(0.88rem, 1vw, 0.97rem);
    color: var(--muted);
    line-height: 1.85; font-weight: 400; letter-spacing: 0.005em;
  }

  /* ════════════════════════════════
     SERVICE CARDS GRID
  ════════════════════════════════ */
  .sp-cards-grid {
    display: grid;
    gap: clamp(0.75rem, 1.5vw, 1.25rem);
  }
  .sp-grid-3   { grid-template-columns: repeat(3, 1fr); }
  .sp-grid-2   { grid-template-columns: repeat(2, 1fr); }
  .sp-grid-2x2 { grid-template-columns: repeat(2, 1fr); }
  .sp-grid-1   { grid-template-columns: 1fr; }

  /* ── Individual service card ── */
  .sp-svc-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: clamp(1.25rem, 2.5vw, 2rem);
    position: relative; overflow: hidden;
    display: flex; flex-direction: column;
    transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.28s, border-color 0.28s;
    box-shadow: var(--shadow-sm);
  }
  .sp-svc-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  .sp-svc-card.sp-c-blue:hover  { border-color: var(--blue);   }
  .sp-svc-card.sp-c-green:hover { border-color: var(--green);  }
  .sp-svc-card.sp-c-gold:hover  { border-color: var(--gold);   }
  .sp-svc-card.sp-c-red:hover   { border-color: var(--accent); }

  .sp-svc-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px; border-radius: 16px 16px 0 0;
    opacity: 0; transition: opacity 0.28s;
  }
  .sp-svc-card:hover::before { opacity: 1; }
  .sp-c-blue::before  { background: linear-gradient(90deg, var(--blue), rgba(26,86,219,0.3)); }
  .sp-c-green::before { background: linear-gradient(90deg, var(--green), rgba(22,163,74,0.3)); }
  .sp-c-gold::before  { background: linear-gradient(90deg, var(--gold), rgba(201,138,6,0.3)); }
  .sp-c-red::before   { background: linear-gradient(90deg, var(--accent), rgba(232,57,14,0.3)); }

  /* Ghost number */
  .sp-svc-num {
    position: absolute; top: 0.9rem; right: 1.2rem;
    font-family: var(--font-display);
    font-size: 3.5rem; font-weight: 400; line-height: 1;
    letter-spacing: -0.02em; pointer-events: none; user-select: none;
  }
  .sp-n-blue  { color: rgba(26,86,219,0.05); }
  .sp-n-green { color: rgba(22,163,74,0.05); }
  .sp-n-gold  { color: rgba(201,138,6,0.05); }
  .sp-n-red   { color: rgba(232,57,14,0.05); }

  /* Icon */
  .sp-svc-icon {
    width: 2.8rem; height: 2.8rem; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem; flex-shrink: 0;
    transition: background 0.22s;
  }
  .sp-svc-icon svg { width: 18px; height: 18px; transition: color 0.22s; }

  .sp-i-blue  { background: rgba(26,86,219,0.08); } .sp-i-blue  svg { color: var(--blue);   }
  .sp-i-green { background: rgba(22,163,74,0.09); } .sp-i-green svg { color: var(--green);  }
  .sp-i-gold  { background: rgba(201,138,6,0.09); } .sp-i-gold  svg { color: var(--gold);   }
  .sp-i-red   { background: rgba(232,57,14,0.07); } .sp-i-red   svg { color: var(--accent); }

  .sp-c-blue:hover  .sp-i-blue  { background: var(--blue);   } .sp-c-blue:hover  .sp-i-blue  svg { color: #fff; }
  .sp-c-green:hover .sp-i-green { background: var(--green);  } .sp-c-green:hover .sp-i-green svg { color: #fff; }
  .sp-c-gold:hover  .sp-i-gold  { background: var(--gold);   } .sp-c-gold:hover  .sp-i-gold  svg { color: #fff; }
  .sp-c-red:hover   .sp-i-red   { background: var(--accent); } .sp-c-red:hover   .sp-i-red   svg { color: #fff; }

  /* Tag */
  .sp-svc-tag {
    font-family: var(--font-body);
    font-size: 0.62rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase; margin-bottom: 0.35rem;
  }
  .sp-t-blue  { color: var(--blue);   }
  .sp-t-green { color: var(--green);  }
  .sp-t-gold  { color: var(--gold);   }
  .sp-t-red   { color: var(--accent); }

  /* Title */
  .sp-svc-title {
    font-family: var(--font-display);
    font-size: clamp(1rem, 1.1vw, 1.1rem);
    font-weight: 400; line-height: 1.3;
    color: var(--ink); margin-bottom: 0.7rem;
  }

  /* Description */
  .sp-svc-desc {
    font-family: var(--font-body);
    font-size: 0.86rem; color: var(--muted);
    line-height: 1.8; font-weight: 400; letter-spacing: 0.005em;
    margin-bottom: 1.25rem; flex: 1;
  }

  /* Divider before highlights */
  .sp-svc-divider {
    width: 100%; height: 1px; background: var(--border); margin-bottom: 1.1rem;
  }

  /* Highlights list */
  .sp-svc-highlights { display: flex; flex-direction: column; gap: 0.5rem; }
  .sp-svc-hi {
    display: flex; align-items: flex-start; gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.8rem; color: var(--ink2); font-weight: 400;
    line-height: 1.45; letter-spacing: 0.005em;
  }
  .sp-hi-check {
    width: 1.1rem; height: 1.1rem; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 0.1rem;
  }
  .sp-hi-check svg { width: 8px; height: 8px; }
  .sp-hc-blue  { background: rgba(26,86,219,0.08); } .sp-hc-blue  svg { color: var(--blue);   }
  .sp-hc-green { background: rgba(22,163,74,0.09); } .sp-hc-green svg { color: var(--green);  }
  .sp-hc-gold  { background: rgba(201,138,6,0.09); } .sp-hc-gold  svg { color: var(--gold);   }
  .sp-hc-red   { background: rgba(232,57,14,0.07); } .sp-hc-red   svg { color: var(--accent); }

  /* ════════════════
     WIDE CARD (Support)
  ════════════════ */
  .sp-svc-card.sp-wide {
    flex-direction: row;
    gap: clamp(1.5rem, 3vw, 3rem);
    align-items: flex-start;
  }
  .sp-wide .sp-svc-left  { flex: 0 0 auto; width: clamp(240px, 38%, 420px); }
  .sp-wide .sp-svc-right { flex: 1; min-width: 0; }
  .sp-wide .sp-svc-divider { display: none; }

  /* ════════════════════════════════
     CTA BAND
  ════════════════════════════════ */
  .sp-cta {
    margin: clamp(3rem, 5vw, 5rem) var(--px) clamp(3rem, 6vw, 6rem);
    background: var(--ink);
    border-radius: 18px;
    padding: clamp(3rem, 5vw, 5rem) clamp(2rem, 5vw, 5rem);
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: clamp(2rem, 4vw, 3rem);
    position: relative; overflow: hidden;
  }
  .sp-cta::before {
    content: '';
    position: absolute; top: -30%; right: -8%;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .sp-cta::after {
    content: '';
    position: absolute; bottom: -40%; left: 15%;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
  .sp-cta-eyebrow {
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.3); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .sp-cta-eyebrow::before { content: ''; width: 1.5rem; height: 1px; background: rgba(255,255,255,0.2); }
  .sp-cta-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 3vw, 2.9rem);
    font-weight: 400; color: var(--white);
    line-height: 1.15; letter-spacing: -0.01em;
    max-width: 520px; margin-bottom: 1rem;
  }
  .sp-cta-h2 em { font-style: italic; color: var(--accent2); }
  .sp-cta-body {
    font-family: var(--font-body);
    font-size: 0.92rem; color: rgba(255,255,255,0.4);
    line-height: 1.8; max-width: 440px; font-weight: 400; letter-spacing: 0.005em;
  }
  .sp-btn-white {
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
  .sp-btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.2); }

  /* ════════════════════════════════
     RESPONSIVE BREAKPOINTS
  ════════════════════════════════ */

  /* Large tablet / small desktop — ≤ 1100px */
  @media (max-width: 1100px) {
    .sp-grid-3 { grid-template-columns: repeat(2, 1fr); }
  }

  /* Tablet — ≤ 860px */
  @media (max-width: 860px) {
    .sp-cat-header {
      grid-template-columns: 1fr;
      gap: 1rem;
      padding-bottom: 1.75rem;
      margin-bottom: 2.5rem;
    }
    .sp-wide .sp-svc-left  { width: 100%; }
    .sp-svc-card.sp-wide {
      flex-direction: column;
      gap: 1.5rem;
    }
    .sp-cta {
      grid-template-columns: 1fr;
    }
    .sp-btn-white { width: 100%; justify-content: center; }
  }

  /* Mobile landscape — ≤ 640px */
  @media (max-width: 640px) {
    :root {
      --px: 1.25rem;
      --section-pt: 2.5rem;
      --section-pb: 2.5rem;
    }
    .sp-grid-3,
    .sp-grid-2,
    .sp-grid-2x2,
    .sp-grid-1 { grid-template-columns: 1fr; }

    .sp-hero-h1 { font-size: 2.2rem; }

    .sp-hero-stats { gap: 0.5rem; }
    .sp-stat-pill  { padding: 0.35rem 0.85rem; }
    .sp-stat-num   { font-size: 0.9rem; }
    .sp-stat-label { font-size: 0.7rem; }

    .sp-cat-nav { padding: 0 var(--px); }
    .sp-cat-tab { padding: 0.8rem 0.9rem; font-size: 0.75rem; }

    .sp-cat-header { gap: 0.75rem; padding-bottom: 1.25rem; margin-bottom: 2rem; }
    .sp-cat-h2 { font-size: 1.5rem; }

    .sp-svc-card { padding: 1.25rem; border-radius: 12px; }
    .sp-svc-title { font-size: 1rem; }
    .sp-svc-desc  { font-size: 0.84rem; }

    .sp-svc-num { font-size: 2.8rem; }

    .sp-cta {
      margin: 2rem var(--px) 3rem;
      padding: 2.5rem 1.5rem;
      border-radius: 14px;
    }
    .sp-cta-h2 { font-size: 1.6rem; }
  }

  /* Small mobile — ≤ 380px */
  @media (max-width: 380px) {
    :root { --px: 1rem; }
    .sp-hero-h1 { font-size: 1.9rem; }
    .sp-hero-stats { flex-direction: column; align-items: flex-start; }
    .sp-cat-tab { padding: 0.8rem 0.65rem; font-size: 0.72rem; }
  }
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
      { threshold: 0.08 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Data ──────────────────────────────────────────────────────────────────────
const services = [
  // ── GOOGLE WORKSPACE ──────────────────────────────────────────────────────
  {
    name: "Google Workspace Automation",
    icon: Repeat,
    tag: "Automation",
    category: "Google Workspace",
    color: "blue",
    description:
      "Automate your entire business workflow inside Google Workspace — Sheets pipelines, Gmail triggers, Drive file management, Calendar scheduling, and cross-app automations using Apps Script. Includes live dashboards, real-time reporting, and intranet portals in Google Sites.",
    highlights: [
      "Google Sheets automation & live dashboards",
      "Gmail triggers, auto-replies & notifications",
      "Google Drive document management workflows",
      "Looker Studio & intranet portals in Google Sites",
    ],
  },
  {
    name: "App Development",
    icon: LayoutDashboard,
    tag: "Development",
    category: "Google Workspace",
    color: "blue",
    description:
      "Build tailored applications — from full custom web apps using Google Apps Script to no-code mobile & web apps with AppSheet. CRM systems, project trackers, approval workflows, and internal tools built entirely within your Google Workspace environment.",
    highlights: [
      "Custom web apps with Google Apps Script",
      "AppSheet mobile & web apps (no-code/low-code)",
      "CRM, project tracking & approval systems",
      "Google Forms with conditional logic & routing",
    ],
  },
  {
    name: "Data Analytics & Reporting",
    icon: BarChart3,
    tag: "Analytics",
    category: "Google Workspace",
    color: "blue",
    description:
      "Turn raw business data into clear, actionable insights. We build custom Looker Studio dashboards, automated reporting pipelines, KPI tracking systems, and data consolidation workflows — so leadership always has real-time visibility without manual effort.",
    highlights: [
      "Looker Studio dashboards connected to live data",
      "Automated daily / weekly / monthly reports",
      "KPI tracking & threshold-based alerts",
      "Multi-source data consolidation in Sheets",
    ],
  },

  // ── WHATSAPP ──────────────────────────────────────────────────────────────
  {
    name: "WhatsApp Business API (Meta)",
    icon: MessageCircle,
    tag: "WhatsApp Meta",
    category: "WhatsApp",
    color: "green",
    description:
      "Integrate the official WhatsApp Business Platform (Meta) into your operations. Send transactional messages, order confirmations, OTPs, and customer support at scale — fully compliant, verified green-tick business profile, integrated with your existing systems.",
    highlights: [
      "Official Meta-verified green-tick business account",
      "Transactional messages — invoices, OTPs, alerts",
      "Automated chatbot flows & customer support",
      "CRM & Google Sheets integration",
    ],
  },
  {
    name: "WhatsApp Automation (Unofficial API)",
    icon: Smartphone,
    tag: "WhatsApp API",
    category: "WhatsApp",
    color: "green",
    description:
      "For businesses needing high-volume, flexible WhatsApp messaging without Meta's approval process. Send bulk notifications, automate order updates, run chatbot workflows, and connect WhatsApp to your Google Sheets or web apps — fast to deploy, highly customizable.",
    highlights: [
      "Bulk messaging & broadcast campaigns",
      "Automated order, delivery & reminder messages",
      "Chatbot with keyword-based response flows",
      "Google Sheets & web app integration",
    ],
  },

  // ── DIGITAL MARKETING ─────────────────────────────────────────────────────
  {
    name: "Search Engine Optimization",
    icon: Search,
    tag: "SEO",
    category: "Digital Marketing",
    color: "gold",
    description:
      "Grow your organic visibility and attract customers actively searching for your services. We handle technical SEO, on-page optimization, keyword research, content strategy, and local SEO — helping your business rank on Google and drive consistent, qualified traffic.",
    highlights: [
      "Technical SEO audit & implementation",
      "Keyword research & on-page optimization",
      "Local SEO & Google Business Profile",
      "Monthly ranking & traffic reports",
    ],
  },
  {
    name: "Social Media Management",
    icon: Megaphone,
    tag: "Social Media",
    category: "Digital Marketing",
    color: "gold",
    description:
      "Build a strong, consistent brand presence across Instagram, Facebook, LinkedIn, and more. We create content calendars, design posts, write captions, manage engagement, and run growth strategies tailored to your industry and target audience.",
    highlights: [
      "Content calendar & post scheduling",
      "Graphic design & copywriting",
      "Community management & engagement",
      "Monthly analytics & performance reports",
    ],
  },
  {
    name: "Google Ads & Paid Marketing",
    icon: TrendingUp,
    tag: "Paid Ads",
    category: "Digital Marketing",
    color: "gold",
    description:
      "Drive immediate, high-intent traffic with expertly managed Google Search, Display, and YouTube Ads. We handle campaign setup, audience targeting, ad copy, bid optimization, and conversion tracking — ensuring every rupee of your ad spend delivers measurable ROI.",
    highlights: [
      "Google Search, Display & YouTube Ads",
      "Audience targeting & remarketing",
      "A/B testing of ad copy & creatives",
      "Conversion tracking & ROI reporting",
    ],
  },
  {
    name: "Email Marketing Campaigns",
    icon: Mail,
    tag: "Email Marketing",
    category: "Digital Marketing",
    color: "gold",
    description:
      "Design, automate, and optimize email campaigns that convert. From onboarding sequences and promotional blasts to re-engagement flows — crafted campaigns using Gmail automation or dedicated platforms, integrated with your CRM and Google Workspace.",
    highlights: [
      "Campaign design, copywriting & scheduling",
      "Automated drip & nurture sequences",
      "List segmentation & personalization",
      "Open rate, CTR & conversion analytics",
    ],
  },

  // ── SUPPORT ───────────────────────────────────────────────────────────────
  {
    name: "Security, Compliance & Support",
    icon: ShieldCheck,
    tag: "Support",
    category: "Support",
    color: "red",
    description:
      "Keep your Google Workspace environment secure, compliant, and running smoothly. We implement access controls, audit trails, data loss prevention, and regulatory compliance — plus ongoing training and support so your team is always confident with their tools.",
    highlights: [
      "Google Workspace security audit & hardening",
      "Admin controls, roles & access management",
      "Staff training & onboarding programmes",
      "Priority ongoing support & maintenance",
    ],
  },
];

// ── Category config ───────────────────────────────────────────────────────────
const categories = [
  {
    id: "google-workspace",
    label: "Google Workspace",
    eyebrow: "Automation & Development",
    color: "blue",
    desc: "The full power of Google Workspace — automated, extended, and customized for your exact business needs. From Sheets to full web apps.",
    grid: "sp-grid-3",
    alt: false,
    wide: false,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    eyebrow: "Messaging Integration",
    color: "green",
    desc: "Connect with customers instantly and at scale. Choose the official Meta-verified platform or a flexible high-volume solution — both fully integrated with your business systems.",
    grid: "sp-grid-2",
    alt: true,
    wide: false,
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    eyebrow: "Growth & Visibility",
    color: "gold",
    desc: "Attract, engage, and convert your ideal customers. SEO, social, paid ads, and email — all measured, optimized, and built around your growth goals.",
    grid: "sp-grid-2x2",
    alt: false,
    wide: false,
  },
  {
    id: "support",
    label: "Security & Support",
    eyebrow: "Always-On Partnership",
    color: "red",
    desc: "Your workspace stays secure, your team stays trained, and you always have expert backup when you need it.",
    grid: "sp-grid-1",
    alt: true,
    wide: true,
  },
];

// Color utility maps
const C = {
  blue: {
    ey: "sp-ey-blue",
    card: "sp-c-blue",
    num: "sp-n-blue",
    icon: "sp-i-blue",
    tag: "sp-t-blue",
    hc: "sp-hc-blue",
    tab: "sp-tab-blue",
    count: "sp-count-blue",
  },
  green: {
    ey: "sp-ey-green",
    card: "sp-c-green",
    num: "sp-n-green",
    icon: "sp-i-green",
    tag: "sp-t-green",
    hc: "sp-hc-green",
    tab: "sp-tab-green",
    count: "sp-count-green",
  },
  gold: {
    ey: "sp-ey-gold",
    card: "sp-c-gold",
    num: "sp-n-gold",
    icon: "sp-i-gold",
    tag: "sp-t-gold",
    hc: "sp-hc-gold",
    tab: "sp-tab-gold",
    count: "sp-count-gold",
  },
  red: {
    ey: "sp-ey-red",
    card: "sp-c-red",
    num: "sp-n-red",
    icon: "sp-i-red",
    tag: "sp-t-red",
    hc: "sp-hc-red",
    tab: "sp-tab-red",
    count: "sp-count-red",
  },
} as const;
type ColorKey = keyof typeof C;

const stats = [
  { num: "10+", label: "Services offered" },
  { num: "50+", label: "Businesses served" },
  { num: "100%", label: "Custom built" },
  { num: "4", label: "Service areas" },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  useReveal();

  return (
    <div className="sp-page">
      <style>{globalStyles}</style>

      {/* ════ HERO ════ */}
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
            From Google Workspace automation and WhatsApp integration to digital
            marketing and security — we build tools, systems, and campaigns that
            help your business save time, reach more customers, and grow faster.
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

      {/* ════ STICKY CATEGORY NAV ════ */}
      <nav className="sp-cat-nav" aria-label="Service categories">
        {categories.map((cat) => {
          const c = C[cat.color as ColorKey];
          const count = services.filter(
            (s) =>
              s.category === cat.label ||
              s.category ===
                (cat.label === "Security & Support" ? "Support" : cat.label),
          ).length;
          return (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`sp-cat-tab ${c.tab}`}
            >
              {cat.label}
              <span className={`sp-cat-count ${c.count}`}>{count}</span>
            </a>
          );
        })}
      </nav>

      {/* ════ CATEGORY SECTIONS ════ */}
      {categories.map((cat) => {
        const c = C[cat.color as ColorKey];
        const catServices = services.filter((s) => {
          if (cat.id === "support") return s.category === "Support";
          return s.category === cat.label;
        });

        return (
          <section
            key={cat.id}
            id={cat.id}
            className={`sp-cat-section${cat.alt ? "sp-alt" : ""}`}
          >
            {/* Category header */}
            <div className="sp-cat-header sp-reveal">
              <div>
                <div className={`sp-sec-eyebrow ${c.ey}`}>
                  <span className="sp-sec-eyebrow-bar" />
                  {cat.eyebrow}
                </div>
                <h2 className="sp-cat-h2">{cat.label}</h2>
              </div>
              <p className="sp-cat-desc">{cat.desc}</p>
            </div>

            {/* Cards */}
            <div className={`sp-cards-grid ${cat.grid}`}>
              {catServices.map((svc, si) => {
                const Icon = svc.icon;
                const delay = `sp-rd${(si % 4) + 1}`;
                const isWide = cat.wide;
                return (
                  <div
                    key={svc.name}
                    className={`sp-svc-card ${c.card}${isWide ? "sp-wide" : ""} sp-reveal ${delay}`}
                  >
                    {isWide ? (
                      <>
                        <div className="sp-svc-left">
                          <span
                            className={`sp-svc-num ${c.num}`}
                            aria-hidden="true"
                          >
                            {String(si + 1).padStart(2, "0")}
                          </span>
                          <div className={`sp-svc-icon ${c.icon}`}>
                            <Icon />
                          </div>
                          <div className={`sp-svc-tag ${c.tag}`}>{svc.tag}</div>
                          <h3 className="sp-svc-title">{svc.name}</h3>
                          <p className="sp-svc-desc">{svc.description}</p>
                        </div>
                        <div className="sp-svc-right">
                          <ul className="sp-svc-highlights">
                            {svc.highlights.map((h) => (
                              <li key={h} className="sp-svc-hi">
                                <span className={`sp-hi-check ${c.hc}`}>
                                  <Check aria-hidden="true" />
                                </span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <span
                          className={`sp-svc-num ${c.num}`}
                          aria-hidden="true"
                        >
                          {String(si + 1).padStart(2, "0")}
                        </span>
                        <div className={`sp-svc-icon ${c.icon}`}>
                          <Icon />
                        </div>
                        <div className={`sp-svc-tag ${c.tag}`}>{svc.tag}</div>
                        <h3 className="sp-svc-title">{svc.name}</h3>
                        <p className="sp-svc-desc">{svc.description}</p>
                        <div className="sp-svc-divider" />
                        <ul className="sp-svc-highlights">
                          {svc.highlights.map((h) => (
                            <li key={h} className="sp-svc-hi">
                              <span className={`sp-hi-check ${c.hc}`}>
                                <Check aria-hidden="true" />
                              </span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* ════ CTA ════ */}
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
            can save your team the most time and grow your business fastest.
          </p>
        </div>
        <Link href="/contact" className="sp-btn-white">
          Book a Free Call →
        </Link>
      </div>
    </div>
  );
}
