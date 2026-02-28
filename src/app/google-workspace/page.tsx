"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  Clock,
  FileText,
  Globe,
  Mail,
  MessageCircle,
  Repeat,
  ShieldCheck,
  Table,
  Zap,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Layers,
} from "lucide-react";

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

  .gw-page *, .gw-page *::before, .gw-page *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }
  .gw-page {
    font-family: var(--font-body);
    background: var(--white);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* ── Scroll Reveal ── */
  .gw-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .gw-reveal.visible { opacity: 1; transform: translateY(0); }
  .gw-d1 { transition-delay: 0.08s; }
  .gw-d2 { transition-delay: 0.16s; }
  .gw-d3 { transition-delay: 0.24s; }
  .gw-d4 { transition-delay: 0.32s; }

  /* ════════════════════════════════
     HERO
  ════════════════════════════════ */
  .gw-hero {
    min-height: 92vh;
    padding: 8rem 7vw 6rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 5rem;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--border);
  }
  @media (max-width: 900px) {
    .gw-hero { grid-template-columns: 1fr; min-height: auto; padding: 7rem 1.5rem 4rem; gap: 3rem; }
  }

  /* Radial bg glows */
  .gw-hero::before {
    content: '';
    position: absolute; top: -15%; right: -8%;
    width: 65vw; height: 65vw; max-width: 800px; max-height: 800px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.055) 0%, rgba(232,57,14,0.025) 45%, transparent 70%);
    pointer-events: none;
  }
  .gw-hero::after {
    content: '';
    position: absolute; bottom: -10%; left: -5%;
    width: 40vw; height: 40vw; max-width: 500px; max-height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,138,6,0.04) 0%, transparent 65%);
    pointer-events: none;
  }

  /* Hero badge */
  .gw-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.38rem 1rem;
    font-family: var(--font-body);
    font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--blue); margin-bottom: 2rem;
  }
  .gw-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--blue);
    animation: gw-pulse 2.2s ease-in-out infinite;
  }
  @keyframes gw-pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
  }

  .gw-hero-h1 {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5vw, 5.2rem);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin-bottom: 1.4rem;
  }
  .gw-hero-h1 em { font-style: italic; color: var(--accent); }
  .gw-hero-h1 .blue { color: var(--blue); font-style: italic; }

  .gw-hero-sub {
    font-family: var(--font-body);
    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
    color: var(--muted); line-height: 1.8;
    font-weight: 400; max-width: 480px;
    margin-bottom: 2.5rem; letter-spacing: 0.005em;
  }

  .gw-hero-cta {
    display: flex; gap: 0.9rem; flex-wrap: wrap; align-items: center;
    margin-bottom: 3rem;
  }

  /* Btn primary — matches homepage .btn-primary */
  .gw-btn-primary {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--accent); color: #fff; border: none;
    padding: 0.88rem 2rem; border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.85rem; font-weight: 600; letter-spacing: 0.02em;
    text-decoration: none; cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 10px rgba(232,57,14,0.2), 0 1px 3px rgba(232,57,14,0.1);
  }
  .gw-btn-primary:hover {
    background: #cc2f08; transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(232,57,14,0.28);
  }

  /* Btn secondary */
  .gw-btn-secondary {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: transparent; color: var(--ink);
    border: 1.5px solid var(--border2);
    padding: 0.88rem 2rem; border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.85rem; font-weight: 500;
    text-decoration: none; cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
    letter-spacing: 0.01em;
  }
  .gw-btn-secondary:hover {
    border-color: var(--ink); background: var(--surface); transform: translateY(-2px);
  }

  /* Hero stats — matches .hero-stats */
  .gw-hero-stats {
    display: flex; gap: 2.5rem; flex-wrap: wrap;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
  }
  .gw-stat-num {
    font-family: var(--font-display);
    font-size: 2rem; font-weight: 400;
    color: var(--ink); letter-spacing: -0.02em; line-height: 1.1;
  }
  .gw-stat-label {
    font-family: var(--font-body);
    font-size: 0.75rem; color: var(--muted);
    margin-top: 0.2rem; font-weight: 400; letter-spacing: 0.01em;
  }

  /* Hero visual panel */
  .gw-hero-visual {
    position: relative;
    display: flex; align-items: center; justify-content: center;
  }

  /* Floating workspace card */
  .gw-workspace-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: var(--shadow-lg);
    width: 100%;
    max-width: 460px;
    position: relative; overflow: hidden;
  }
  .gw-workspace-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(26,86,219,0.025) 0%, rgba(232,57,14,0.02) 100%);
    pointer-events: none;
  }

  /* G Suite app icons grid */
  .gw-apps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .gw-app-chip {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.75rem 0.5rem;
    display: flex; flex-direction: column;
    align-items: center; gap: 0.4rem;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    cursor: default;
  }
  .gw-app-chip:hover {
    border-color: var(--blue);
    transform: translateY(-3px);
    box-shadow: var(--shadow-sm);
  }
  .gw-app-chip-icon {
    width: 28px; height: 28px;
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
  }
  .gw-app-chip-label {
    font-family: var(--font-body);
    font-size: 0.6rem; font-weight: 500;
    color: var(--ink2); letter-spacing: 0.02em;
    text-align: center;
  }

  /* Live automation pulse */
  .gw-automation-flow {
    background: var(--off);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex; align-items: center; gap: 0.75rem;
  }
  .gw-flow-pulse {
    width: 10px; height: 10px; border-radius: 50%;
    background: #16a34a; flex-shrink: 0;
    box-shadow: 0 0 0 0 rgba(22,163,74,0.4);
    animation: gw-flow-ping 2s ease-out infinite;
  }
  @keyframes gw-flow-ping {
    0% { box-shadow: 0 0 0 0 rgba(22,163,74,0.5); }
    70% { box-shadow: 0 0 0 8px rgba(22,163,74,0); }
    100% { box-shadow: 0 0 0 0 rgba(22,163,74,0); }
  }
  .gw-flow-text {
    font-family: var(--font-body);
    font-size: 0.8rem; color: var(--ink2);
    font-weight: 400; line-height: 1.4;
  }
  .gw-flow-text strong {
    color: var(--ink); font-weight: 600;
  }
  .gw-flow-badge {
    margin-left: auto;
    background: rgba(22,163,74,0.09);
    border: 1px solid rgba(22,163,74,0.2);
    border-radius: 100px;
    padding: 0.2rem 0.6rem;
    font-family: var(--font-body);
    font-size: 0.65rem; font-weight: 600;
    color: #16a34a; letter-spacing: 0.04em; white-space: nowrap;
  }

  /* ════════════════════════════════
     MARQUEE
  ════════════════════════════════ */
  .gw-marquee {
    background: var(--ink); padding: 0.9rem 0; overflow: hidden;
  }
  .gw-marquee-track {
    display: flex;
    animation: gw-marquee 30s linear infinite;
    will-change: transform;
  }
  .gw-marquee-item {
    display: flex; align-items: center; gap: 1rem;
    padding: 0 2.5rem;
    font-family: var(--font-body);
    font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.4); white-space: nowrap;
    border-right: 1px solid rgba(255,255,255,0.07); font-weight: 500;
  }
  .gw-marquee-dot { color: var(--accent); font-size: 0.4rem; }
  @keyframes gw-marquee { to { transform: translateX(-50%); } }

  /* ════════════════════════════════
     WHAT IS GOOGLE WORKSPACE
  ════════════════════════════════ */
  .gw-what {
    padding: 7rem 7vw;
    background: var(--white);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
  }
  @media (max-width: 900px) { .gw-what { grid-template-columns: 1fr; gap: 3.5rem; padding: 5rem 1.5rem; } }

  /* Eyebrow — matches homepage .eyebrow */
  .gw-eyebrow {
    display: flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    margin-bottom: 1.2rem;
  }
  .gw-eyebrow-line { width: 1.8rem; height: 1.5px; border-radius: 2px; }
  .gw-ey-blue { color: var(--blue); } .gw-ey-blue .gw-eyebrow-line { background: var(--blue); }
  .gw-ey-red  { color: var(--accent); } .gw-ey-red .gw-eyebrow-line { background: var(--accent); }
  .gw-ey-gold { color: var(--gold); } .gw-ey-gold .gw-eyebrow-line { background: var(--gold); }

  /* Section h2 — matches .section-h2 */
  .gw-h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.2vw, 3rem);
    font-weight: 400; line-height: 1.15;
    letter-spacing: -0.01em; color: var(--ink);
    margin-bottom: 1.3rem;
  }
  .gw-h2 em { font-style: italic; color: var(--accent); }
  .gw-h2 .blue { font-style: italic; color: var(--blue); }

  /* Section body — matches .section-body */
  .gw-body-text {
    font-family: var(--font-body);
    font-size: 0.97rem; color: var(--muted);
    line-height: 1.85; margin-bottom: 1.5rem;
    font-weight: 400; letter-spacing: 0.005em;
  }

  /* Feature list — matches .feature-list */
  .gw-feature-list { display: flex; flex-direction: column; gap: 0.7rem; }
  .gw-feature-item {
    display: flex; align-items: center; gap: 0.75rem;
    font-family: var(--font-body);
    font-size: 0.875rem; color: var(--ink2); font-weight: 400;
    letter-spacing: 0.005em;
  }
  .gw-feature-check {
    width: 1.25rem; height: 1.25rem;
    border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.6rem; font-weight: 700;
  }
  .gw-check-blue { background: rgba(26,86,219,0.07); color: var(--blue); }
  .gw-check-red  { background: rgba(232,57,14,0.07); color: var(--accent); }

  /* Product grid cards */
  .gw-products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }
  .gw-product-card {
    background: var(--off);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.25rem 1rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    text-align: center;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    cursor: default;
  }
  .gw-product-card:hover {
    border-color: var(--blue); transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }
  .gw-product-emoji { font-size: 1.6rem; line-height: 1; }
  .gw-product-name {
    font-family: var(--font-body);
    font-size: 0.72rem; font-weight: 500;
    color: var(--ink2); letter-spacing: 0.01em;
  }

  /* ════════════════════════════════
     AUTOMATION SECTION (how it works)
  ════════════════════════════════ */
  .gw-automation {
    padding: 7rem 7vw;
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .gw-automation-header {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 3rem; align-items: end; margin-bottom: 4.5rem;
  }
  @media (max-width: 768px) { .gw-automation-header { grid-template-columns: 1fr; } }

  /* Automation cards grid — matches .steps-grid style */
  .gw-auto-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  @media (max-width: 900px) { .gw-auto-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 560px) { .gw-auto-grid { grid-template-columns: 1fr; } }

  /* Auto card — matches .step-card */
  .gw-auto-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 2.25rem 2rem;
    position: relative; overflow: hidden;
    transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.28s, border-color 0.28s;
    box-shadow: var(--shadow-sm);
    cursor: default;
  }
  .gw-auto-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent);
  }
  .gw-auto-card::before {
    content: attr(data-num);
    position: absolute; top: 1rem; right: 1.25rem;
    font-family: var(--font-display);
    font-size: 3.8rem; font-weight: 400;
    color: rgba(232,57,14,0.05); line-height: 1; letter-spacing: -0.02em;
  }
  .gw-auto-icon {
    width: 2.8rem; height: 2.8rem;
    border-radius: 9px;
    background: rgba(232,57,14,0.06);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem; flex-shrink: 0;
    transition: background 0.2s;
  }
  .gw-auto-icon svg { width: 18px; height: 18px; color: var(--accent); }
  .gw-auto-card:hover .gw-auto-icon { background: var(--accent); }
  .gw-auto-card:hover .gw-auto-icon svg { color: #fff; }

  .gw-auto-tag {
    font-family: var(--font-body);
    font-size: 0.66rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 0.45rem;
  }
  .gw-auto-title {
    font-family: var(--font-display);
    font-size: 1.1rem; font-weight: 400;
    color: var(--ink); line-height: 1.3; margin-bottom: 0.7rem;
  }
  .gw-auto-body {
    font-family: var(--font-body);
    font-size: 0.875rem; color: var(--muted);
    line-height: 1.8; font-weight: 400; letter-spacing: 0.005em;
  }

  /* ════════════════════════════════
     BENEFITS — ALTERNATING LAYOUT
  ════════════════════════════════ */
  .gw-benefits { padding: 7rem 7vw; background: var(--white); }

  .gw-benefit-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
    padding: 5rem 0;
    border-bottom: 1px solid var(--border);
  }
  .gw-benefit-row:first-child { padding-top: 0; }
  .gw-benefit-row:last-child { border-bottom: none; padding-bottom: 0; }
  .gw-benefit-row.reverse { direction: rtl; }
  .gw-benefit-row.reverse > * { direction: ltr; }
  @media (max-width: 900px) {
    .gw-benefit-row { grid-template-columns: 1fr; gap: 2.5rem; direction: ltr; }
    .gw-benefit-row.reverse > * { direction: ltr; }
  }

  /* Benefit visual card */
  .gw-benefit-visual {
    background: var(--off);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: var(--shadow-md);
    position: relative; overflow: hidden;
    min-height: 280px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .gw-benefit-visual::before {
    content: '';
    position: absolute; top: -30%; right: -15%;
    width: 300px; height: 300px; border-radius: 50%;
    pointer-events: none;
  }
  .gw-bv-blue::before  { background: radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 65%); }
  .gw-bv-red::before   { background: radial-gradient(circle, rgba(232,57,14,0.08) 0%, transparent 65%); }
  .gw-bv-gold::before  { background: radial-gradient(circle, rgba(201,138,6,0.08) 0%, transparent 65%); }

  .gw-bv-icon {
    width: 3.5rem; height: 3.5rem; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: auto;
  }
  .gw-bv-icon svg { width: 24px; height: 24px; }
  .gw-bv-blue .gw-bv-icon  { background: rgba(26,86,219,0.09); }
  .gw-bv-blue .gw-bv-icon svg  { color: var(--blue); }
  .gw-bv-red .gw-bv-icon   { background: rgba(232,57,14,0.09); }
  .gw-bv-red .gw-bv-icon svg   { color: var(--accent); }
  .gw-bv-gold .gw-bv-icon  { background: rgba(201,138,6,0.09); }
  .gw-bv-gold .gw-bv-icon svg  { color: var(--gold); }

  /* Metric display */
  .gw-bv-metric {
    display: flex; align-items: flex-end; gap: 1rem;
    padding: 1.5rem;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 12px;
    position: relative; z-index: 1;
  }
  .gw-bv-metric-num {
    font-family: var(--font-display);
    font-size: 2.8rem; font-weight: 400;
    line-height: 1; letter-spacing: -0.02em; color: var(--ink);
  }
  .gw-bv-metric-detail { display: flex; flex-direction: column; gap: 0.15rem; padding-bottom: 0.25rem; }
  .gw-bv-metric-label {
    font-family: var(--font-body);
    font-size: 0.8rem; font-weight: 600; color: var(--ink2);
  }
  .gw-bv-metric-sub {
    font-family: var(--font-body);
    font-size: 0.72rem; color: var(--muted); font-weight: 400;
  }
  .gw-bv-metric-trend {
    margin-left: auto;
    display: flex; align-items: center; gap: 0.3rem;
    font-family: var(--font-body);
    font-size: 0.75rem; font-weight: 600; color: #16a34a;
    background: rgba(22,163,74,0.08);
    border: 1px solid rgba(22,163,74,0.15);
    border-radius: 100px; padding: 0.2rem 0.6rem;
  }

  /* Benefit copy */
  .gw-benefit-copy { display: flex; flex-direction: column; gap: 1.75rem; }

  /* ════════════════════════════════
     CUSTOM TOOLS SECTION
  ════════════════════════════════ */
  .gw-tools {
    padding: 7rem 7vw;
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .gw-tools-header {
    text-align: center;
    max-width: 640px;
    margin: 0 auto 4.5rem;
  }
  .gw-tools-eyebrow {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.2rem;
  }
  .gw-tools-eyebrow::before {
    content: ''; width: 1.8rem; height: 1.5px;
    background: var(--gold); border-radius: 2px;
  }
  .gw-tools-eyebrow::after {
    content: ''; width: 1.8rem; height: 1.5px;
    background: var(--gold); border-radius: 2px;
  }

  /* Tools grid */
  .gw-tools-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
  @media (max-width: 1100px) { .gw-tools-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px)  { .gw-tools-grid { grid-template-columns: 1fr; } }

  .gw-tool-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 2rem 1.75rem;
    box-shadow: var(--shadow-sm);
    transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.28s, border-color 0.28s;
    position: relative; overflow: hidden;
  }
  .gw-tool-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--gold);
  }
  .gw-tool-card::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 3px; border-radius: 0 0 14px 14px;
    background: linear-gradient(90deg, var(--gold), var(--accent));
    opacity: 0; transition: opacity 0.28s;
  }
  .gw-tool-card:hover::after { opacity: 1; }

  .gw-tool-icon {
    width: 2.8rem; height: 2.8rem;
    border-radius: 9px;
    background: rgba(201,138,6,0.08);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem;
  }
  .gw-tool-icon svg { width: 18px; height: 18px; color: var(--gold); }
  .gw-tool-title {
    font-family: var(--font-display);
    font-size: 1.05rem; font-weight: 400;
    color: var(--ink); margin-bottom: 0.6rem; line-height: 1.3;
  }
  .gw-tool-body {
    font-family: var(--font-body);
    font-size: 0.85rem; color: var(--muted);
    line-height: 1.8; font-weight: 400;
  }

  /* ════════════════════════════════
     RESULTS ROW
  ════════════════════════════════ */
  .gw-results {
    padding: 6rem 7vw;
    background: var(--white);
    text-align: center;
  }
  .gw-results-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    margin-top: 3.5rem;
  }
  @media (max-width: 768px) { .gw-results-grid { grid-template-columns: repeat(2, 1fr); } }

  .gw-result-item {
    padding: 2.5rem 2rem;
    border-right: 1px solid var(--border);
    background: var(--white);
    transition: background 0.2s;
  }
  .gw-result-item:last-child { border-right: none; }
  .gw-result-item:hover { background: var(--off); }

  .gw-result-num {
    font-family: var(--font-display);
    font-size: 3rem; font-weight: 400;
    color: var(--ink); letter-spacing: -0.02em; line-height: 1.1;
    margin-bottom: 0.25rem;
  }
  .gw-result-num em { font-style: italic; color: var(--accent); }
  .gw-result-label {
    font-family: var(--font-body);
    font-size: 0.82rem; color: var(--muted);
    font-weight: 400; line-height: 1.5; letter-spacing: 0.005em;
  }

  /* ════════════════════════════════
     USE CASES
  ════════════════════════════════ */
  .gw-usecases {
    padding: 7rem 7vw;
    background: var(--surface);
    border-top: 1px solid var(--border);
  }
  .gw-usecases-header { margin-bottom: 4rem; }

  .gw-usecase-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
  }
  @media (max-width: 900px) { .gw-usecase-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 560px) { .gw-usecase-grid { grid-template-columns: 1fr; } }

  .gw-usecase-card {
    background: var(--white);
    padding: 2.5rem 2rem;
    display: flex; flex-direction: column; gap: 0.6rem;
    transition: background 0.2s;
    position: relative; overflow: hidden;
  }
  .gw-usecase-card:hover { background: var(--off); }
  .gw-usecase-industry {
    font-family: var(--font-body);
    font-size: 0.66rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--blue);
  }
  .gw-usecase-title {
    font-family: var(--font-display);
    font-size: 1.05rem; font-weight: 400;
    color: var(--ink); line-height: 1.3;
  }
  .gw-usecase-body {
    font-family: var(--font-body);
    font-size: 0.85rem; color: var(--muted);
    line-height: 1.75; font-weight: 400;
  }
  .gw-usecase-tag {
    display: inline-flex; align-items: center; gap: 0.35rem;
    font-family: var(--font-body);
    font-size: 0.7rem; font-weight: 500;
    color: var(--accent); margin-top: 0.35rem;
  }
  .gw-usecase-tag::before { content: '◆'; font-size: 0.35rem; }

  /* ════════════════════════════════
     CTA BAND — mirrors homepage .cta-band
  ════════════════════════════════ */
  .gw-cta {
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
  @media (max-width: 768px) {
    .gw-cta { grid-template-columns: 1fr; margin: 0 1.5rem 4rem; padding: 3.5rem 2rem; }
  }
  .gw-cta::before {
    content: '';
    position: absolute; top: -30%; right: -8%;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .gw-cta::after {
    content: '';
    position: absolute; bottom: -40%; left: 20%;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
  .gw-cta-eyebrow {
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.3); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .gw-cta-eyebrow::before { content: ''; width: 1.5rem; height: 1px; background: rgba(255,255,255,0.2); }
  .gw-cta-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 3vw, 2.9rem);
    font-weight: 400; color: var(--white);
    line-height: 1.15; letter-spacing: -0.01em;
    max-width: 520px; margin-bottom: 1rem;
  }
  .gw-cta-h2 em { font-style: italic; color: var(--accent2); }
  .gw-cta-body {
    font-family: var(--font-body);
    font-size: 0.92rem; color: rgba(255,255,255,0.4);
    line-height: 1.8; max-width: 440px; font-weight: 400;
  }
  .gw-btn-white {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--white); color: var(--ink); border: none;
    padding: 1rem 2.2rem; border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.85rem; font-weight: 600; letter-spacing: 0.01em;
    text-decoration: none; cursor: pointer; white-space: nowrap;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.16); position: relative; z-index: 1;
  }
  .gw-btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.2); }
`;

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".gw-reveal");
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
const gApps = [
  { emoji: "📊", name: "Sheets" },
  { emoji: "📧", name: "Gmail" },
  { emoji: "📁", name: "Drive" },
  { emoji: "📝", name: "Docs" },
  { emoji: "📅", name: "Calendar" },
  { emoji: "📋", name: "Forms" },
  { emoji: "🌐", name: "Sites" },
  { emoji: "📊", name: "Looker" },
];

const workspaceFeatures = [
  "Real-time collaboration across your whole team",
  "Cloud-first — access from anywhere, any device",
  "Seamlessly integrates with automation tools",
  "Built-in security and compliance controls",
  "Scales from 1 person to 10,000+",
];

const automationCards = [
  {
    num: "01",
    icon: Repeat,
    tag: "Workflow",
    title: "Trigger-Based Automation",
    body: "Set rules once — when a form is submitted, a Sheet updates, or an email arrives, actions fire automatically without manual intervention.",
  },
  {
    num: "02",
    icon: Mail,
    tag: "Communication",
    title: "Smart Email & Notifications",
    body: "Auto-send invoices, status updates, and alerts via Gmail. Customers and teams stay informed with zero manual effort.",
  },
  {
    num: "03",
    icon: Table,
    tag: "Data",
    title: "Live Spreadsheet Pipelines",
    body: "Pull data from forms, APIs, and third-party tools directly into Google Sheets. Dashboards refresh in real time.",
  },
  {
    num: "04",
    icon: FileText,
    tag: "Documents",
    title: "Auto-Generated Documents",
    body: "Generate contracts, invoices, and reports from templates in seconds — formatted, filled, and sent automatically.",
  },
  {
    num: "05",
    icon: MessageCircle,
    tag: "WhatsApp",
    title: "WhatsApp Integration",
    body: "Connect your workflows to WhatsApp. Send order confirmations, reminders, and support messages at scale.",
  },
  {
    num: "06",
    icon: BarChart3,
    tag: "Analytics",
    title: "Automated Reporting",
    body: "Schedule daily, weekly, or monthly reports that compile data, build charts, and email summaries — hands free.",
  },
];

const benefits = [
  {
    variant: "gw-bv-blue",
    icon: Clock,
    metric: {
      num: "15+",
      label: "Hours Saved Weekly",
      sub: "Per team member on average",
      trend: "↑ 40% efficiency",
    },
    eyebrow: "gw-ey-blue",
    title: (
      <>
        Save <em>Hours</em> Every Week
      </>
    ),
    body: "Manual data entry, copy-paste work, and repetitive follow-ups quietly drain your team. Google Workspace automation eliminates these tasks — giving back 15+ hours per week per person to focus on what actually drives growth.",
    features: [
      "Automated report generation & distribution",
      "Zero-touch invoice processing",
      "One-click document creation from templates",
    ],
    checkClass: "gw-check-blue",
  },
  {
    variant: "gw-bv-red",
    icon: TrendingUp,
    metric: {
      num: "3×",
      label: "Faster Decision-Making",
      sub: "With real-time data dashboards",
      trend: "↑ Revenue impact",
    },
    eyebrow: "gw-ey-red",
    title: (
      <>
        Grow <em>Faster</em> with Better Data
      </>
    ),
    body: "When your data is always current and accessible, decisions happen faster. Custom Looker Studio dashboards and live Google Sheets give leadership instant visibility into sales, operations, and performance — no waiting for weekly reports.",
    features: [
      "Real-time KPI dashboards in Looker Studio",
      "Automated data consolidation across departments",
      "Custom alerts when metrics cross thresholds",
    ],
    checkClass: "gw-check-red",
  },
  {
    variant: "gw-bv-gold",
    icon: Users,
    metric: {
      num: "99%",
      label: "Error Reduction",
      sub: "Vs. manual spreadsheet handling",
      trend: "↓ Costly mistakes",
    },
    eyebrow: "gw-ey-gold",
    title: (
      <>
        Eliminate <span className="blue">Errors</span> Completely
      </>
    ),
    body: "Human error in manual processes costs businesses thousands. Automated pipelines validate, process, and file data with zero mistakes — whether it's payroll, GST calculations, or inventory counts.",
    features: [
      "Validated data entry through Google Forms",
      "Automated GST & payroll calculations",
      "Audit trails for every automated action",
    ],
    checkClass: "gw-check-blue",
  },
];

const tools = [
  {
    icon: Layers,
    title: "Custom Web Apps",
    body: "Full web applications built on Apps Script that live inside Google Workspace — no external hosting needed.",
  },
  {
    icon: Globe,
    title: "AppSheet No-Code Apps",
    body: "Mobile and web apps built from your Google Sheets data — no coding required, deployed in days not months.",
  },
  {
    icon: BarChart3,
    title: "Looker Studio Dashboards",
    body: "Beautiful, interactive dashboards connected to live data — visible on any screen, shared with one link.",
  },
  {
    icon: Zap,
    title: "Apps Script Automation",
    body: "Custom JavaScript automations that tie together Sheets, Gmail, Drive, Calendar, and external APIs seamlessly.",
  },
];

const results = [
  {
    num: (
      <>
        10<em>×</em>
      </>
    ),
    label: "Faster invoice processing vs. manual",
  },
  { num: <>50+</>, label: "Businesses transformed across India" },
  { num: <>15+</>, label: "Hours saved per team member each week" },
  {
    num: (
      <>
        99<em>%</em>
      </>
    ),
    label: "Reduction in data entry errors",
  },
];

const useCases = [
  {
    industry: "Manufacturing",
    title: "Automated Inventory & Purchase Orders",
    body: "Real-time stock tracking in Sheets triggers WhatsApp alerts and auto-generates purchase orders when inventory hits reorder levels.",
    tag: "Sheets + WhatsApp API",
  },
  {
    industry: "Finance & Accounting",
    title: "GST & Invoice Automation",
    body: "Forms capture billing data → Sheets calculate GST → PDFs auto-generated and emailed to clients. Month-end closes in hours, not days.",
    tag: "Docs + Gmail + Sheets",
  },
  {
    industry: "HR & Payroll",
    title: "Leave & Payroll Management",
    body: "Employees submit leave via Forms → Sheets update attendance → payroll computed automatically → slips emailed. Zero HR admin overhead.",
    tag: "Forms + Sheets + Gmail",
  },
  {
    industry: "Sales & CRM",
    title: "Lead Tracking & Follow-Up",
    body: "Web form leads flow into a Sheets CRM, auto-assign to sales reps, trigger WhatsApp intros, and schedule follow-up reminders.",
    tag: "Sheets + WhatsApp + Calendar",
  },
  {
    industry: "Education",
    title: "Student Data & Reporting",
    body: "Attendance captured via Forms, grades consolidated in Sheets, progress reports auto-generated as PDFs and emailed to parents monthly.",
    tag: "Forms + Docs + Gmail",
  },
  {
    industry: "Retail & E-Commerce",
    title: "Order & Delivery Automation",
    body: "Orders logged automatically, inventory updated, dispatch WhatsApp sent to customer, and daily sales summary emailed to management.",
    tag: "Sheets + WhatsApp + Gmail",
  },
];

const marqueeItems = [
  "Google Workspace",
  "Apps Script",
  "AppSheet",
  "Looker Studio",
  "WhatsApp API",
  "Process Automation",
  "Custom Web Apps",
  "Gmail Automation",
  "Google Forms",
  "Real-Time Dashboards",
  "Data Pipelines",
  "No-Code Tools",
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  useReveal();

  return (
    <div className="gw-page">
      <style>{globalStyles}</style>

      {/* ════════ HERO ════════ */}
      <section className="gw-hero">
        <div>
          <div className="gw-badge">
            <div className="gw-badge-dot" />
            Google Workspace Experts
          </div>
          <h1 className="gw-hero-h1 gw-reveal">
            Automate Your
            <br />
            Business with
            <br />
            <span className="blue">Google Workspace</span>
          </h1>
          <p className="gw-hero-sub gw-reveal gw-d1">
            Stop doing manually what your tools can do automatically. We build
            custom automation and tools on Google Workspace that save time,
            eliminate errors, and help your business grow faster.
          </p>
          <div className="gw-hero-cta gw-reveal gw-d2">
            <Link href="/contact" className="gw-btn-primary">
              Book a Free Consultation →
            </Link>
            <Link href="/services" className="gw-btn-secondary">
              View All Services
            </Link>
          </div>
          <div className="gw-hero-stats gw-reveal gw-d3">
            {[
              { num: "50+", label: "Businesses automated" },
              { num: "15+", label: "Hours saved per week" },
              { num: "99%", label: "Error reduction" },
            ].map((s) => (
              <div key={s.num}>
                <div className="gw-stat-num">{s.num}</div>
                <div className="gw-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual panel */}
        <div className="gw-hero-visual gw-reveal gw-d2">
          <div className="gw-workspace-card">
            <div className="gw-apps-grid">
              {gApps.map((app) => (
                <div key={app.name} className="gw-app-chip">
                  <div className="gw-app-chip-icon">{app.emoji}</div>
                  <span className="gw-app-chip-label">{app.name}</span>
                </div>
              ))}
            </div>
            <div className="gw-automation-flow">
              <div className="gw-flow-pulse" />
              <div className="gw-flow-text">
                <strong>Invoice #1042</strong> generated & sent to client
              </div>
              <span className="gw-flow-badge">Live</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ MARQUEE ════════ */}
      <div className="gw-marquee" aria-hidden="true">
        <div className="gw-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="gw-marquee-item">
              <span className="gw-marquee-dot">◆</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ════════ WHAT IS GOOGLE WORKSPACE ════════ */}
      <section className="gw-what">
        <div className="gw-reveal">
          <div className="gw-eyebrow gw-ey-blue">
            <span className="gw-eyebrow-line" />
            The Foundation
          </div>
          <h2 className="gw-h2">
            What is <span className="blue">Google Workspace</span>?
          </h2>
          <p className="gw-body-text">
            Google Workspace (formerly G Suite) is the world's most widely used
            business productivity suite — Gmail, Drive, Sheets, Docs, Calendar,
            Forms, and more, all under one roof. It's where your team already
            works every day.
          </p>
          <p className="gw-body-text">
            What most businesses don't realize is that beneath these familiar
            tools sits a powerful automation engine. With the right expertise,
            these apps can be connected, programmed, and customized to run your
            entire business workflow — automatically.
          </p>
          <div className="gw-feature-list">
            {workspaceFeatures.map((f) => (
              <div key={f} className="gw-feature-item">
                <div className="gw-feature-check gw-check-blue">✓</div>
                {f}
              </div>
            ))}
          </div>
        </div>
        <div className="gw-reveal gw-d1">
          <div className="gw-products-grid">
            {[
              { emoji: "📧", name: "Gmail" },
              { emoji: "📁", name: "Drive" },
              { emoji: "📊", name: "Sheets" },
              { emoji: "📝", name: "Docs" },
              { emoji: "📋", name: "Forms" },
              { emoji: "📅", name: "Calendar" },
              { emoji: "🌐", name: "Sites" },
              { emoji: "📊", name: "Looker" },
              { emoji: "📱", name: "AppSheet" },
            ].map((p) => (
              <div key={p.name} className="gw-product-card">
                <span className="gw-product-emoji">{p.emoji}</span>
                <span className="gw-product-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ AUTOMATION — HOW IT WORKS ════════ */}
      <section className="gw-automation">
        <div className="gw-automation-header">
          <div className="gw-reveal">
            <div className="gw-eyebrow gw-ey-red">
              <span className="gw-eyebrow-line" />
              How Automation Works
            </div>
            <h2 className="gw-h2">
              Six Ways We <em>Automate</em>
              <br />
              Your Workflows
            </h2>
          </div>
          <p
            className="gw-body-text gw-reveal gw-d1"
            style={{ marginBottom: 0 }}
          >
            From trigger-based actions to full document pipelines — here's what
            custom Google Workspace automation looks like in practice.
          </p>
        </div>
        <div className="gw-auto-grid">
          {automationCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className={`gw-auto-card gw-reveal gw-d${(i % 3) + 1}`}
                data-num={card.num}
              >
                <div className="gw-auto-icon">
                  <Icon />
                </div>
                <div className="gw-auto-tag">{card.tag}</div>
                <div className="gw-auto-title">{card.title}</div>
                <p className="gw-auto-body">{card.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════ BENEFITS — ALTERNATING ════════ */}
      <section className="gw-benefits">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={i}
              className={`gw-benefit-row ${i % 2 === 1 ? "reverse" : ""} gw-reveal`}
            >
              {/* Visual */}
              <div className={`gw-benefit-visual ${b.variant}`}>
                <div className="gw-bv-icon">
                  <Icon />
                </div>
                <div className="gw-bv-metric">
                  <div className="gw-bv-metric-num">{b.metric.num}</div>
                  <div className="gw-bv-metric-detail">
                    <span className="gw-bv-metric-label">{b.metric.label}</span>
                    <span className="gw-bv-metric-sub">{b.metric.sub}</span>
                  </div>
                  <div className="gw-bv-metric-trend">
                    <TrendingUp size={11} />
                    {b.metric.trend}
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="gw-benefit-copy">
                <div>
                  <div className={`gw-eyebrow ${b.eyebrow}`}>
                    <span className="gw-eyebrow-line" />
                    Key Benefit
                  </div>
                  <h2 className="gw-h2">{b.title}</h2>
                  <p className="gw-body-text">{b.body}</p>
                </div>
                <div className="gw-feature-list">
                  {b.features.map((f) => (
                    <div key={f} className="gw-feature-item">
                      <div className={`gw-feature-check ${b.checkClass}`}>
                        ✓
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ════════ RESULTS ROW ════════ */}
      <section className="gw-results">
        <div className="gw-reveal">
          <div
            className="gw-eyebrow gw-ey-red"
            style={{ justifyContent: "center" }}
          >
            <span className="gw-eyebrow-line" />
            Proven Impact
          </div>
          <h2 className="gw-h2" style={{ textAlign: "center" }}>
            Numbers That <em>Speak</em>
          </h2>
        </div>
        <div className="gw-results-grid gw-reveal gw-d1">
          {results.map((r, i) => (
            <div key={i} className="gw-result-item">
              <div className="gw-result-num">{r.num}</div>
              <div className="gw-result-label">{r.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ CUSTOM TOOLS ════════ */}
      <section className="gw-tools">
        <div className="gw-tools-header gw-reveal">
          <div className="gw-tools-eyebrow">Custom-Built Tools</div>
          <h2 className="gw-h2">
            Beyond Automation —<br />
            <em>Purpose-Built</em> Tools
          </h2>
          <p className="gw-body-text" style={{ marginBottom: 0 }}>
            We don't just automate existing workflows. We design and build
            custom tools that fit your business exactly — from mobile apps to
            full CRM systems.
          </p>
        </div>
        <div className="gw-tools-grid">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div key={i} className={`gw-tool-card gw-reveal gw-d${i + 1}`}>
                <div className="gw-tool-icon">
                  <Icon />
                </div>
                <div className="gw-tool-title">{tool.title}</div>
                <p className="gw-tool-body">{tool.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════ USE CASES ════════ */}
      <section className="gw-usecases">
        <div className="gw-usecases-header gw-reveal">
          <div className="gw-eyebrow gw-ey-blue">
            <span className="gw-eyebrow-line" />
            Real-World Examples
          </div>
          <h2 className="gw-h2">
            Automation Across <em>Every</em> Industry
          </h2>
          <p className="gw-body-text" style={{ maxWidth: 560 }}>
            From manufacturing floors to finance teams — here's how businesses
            like yours are using Google Workspace automation today.
          </p>
        </div>
        <div className="gw-usecase-grid">
          {useCases.map((uc, i) => (
            <div
              key={i}
              className={`gw-usecase-card gw-reveal gw-d${(i % 3) + 1}`}
            >
              <div className="gw-usecase-industry">{uc.industry}</div>
              <div className="gw-usecase-title">{uc.title}</div>
              <p className="gw-usecase-body">{uc.body}</p>
              <span className="gw-usecase-tag">{uc.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ CTA BAND ════════ */}
      <div className="gw-cta gw-reveal">
        <div>
          <div className="gw-cta-eyebrow">Start automating today</div>
          <h2 className="gw-cta-h2">
            Ready to Transform
            <br />
            <em>Your Workflows?</em>
          </h2>
          <p className="gw-cta-body">
            Book a free consultation. We'll audit your current processes and
            show you exactly where automation can save the most time and money.
          </p>
        </div>
        <Link href="/contact-us" className="gw-btn-white">
          Book a Free Call →
        </Link>
      </div>
    </div>
  );
}
