"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  UsersRound,
  Star,
  LaptopMinimalCheck,
  Linkedin,
  Twitter,
  Globe,
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

  .ab-page *, .ab-page *::before, .ab-page *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }
  .ab-page {
    font-family: var(--font-body);
    background: var(--white);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* ── Reveal ── */
  .ab-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .ab-reveal.visible { opacity: 1; transform: translateY(0); }
  .ab-rd1 { transition-delay: 0.1s; }
  .ab-rd2 { transition-delay: 0.2s; }
  .ab-rd3 { transition-delay: 0.3s; }
  .ab-rd4 { transition-delay: 0.4s; }

  /* ════════════════════════════════
     HERO
  ════════════════════════════════ */
  .ab-hero {
    padding: 7rem 7vw 5.5rem;
    border-bottom: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }
  .ab-hero::before {
    content: '';
    position: absolute; top: -20%; right: -10%;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.05) 0%, rgba(26,86,219,0.03) 55%, transparent 70%);
    pointer-events: none;
  }
  .ab-hero::after {
    content: '';
    position: absolute; bottom: -25%; left: -8%;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.04) 0%, transparent 65%);
    pointer-events: none;
  }
  .ab-hero-inner {
    max-width: 680px;
    position: relative; z-index: 1;
  }

  /* ── Shared eyebrow — mirrors homepage .eyebrow ── */
  .ab-eyebrow {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 1.25rem;
  }
  .ab-eyebrow-bar { width: 1.8rem; height: 1.5px; background: var(--accent); border-radius: 2px; flex-shrink: 0; }

  /*
   * Hero heading uses DM Serif Display at normal weight — same as homepage .hero-brand.
   * Italic accent word mirrors .line-accent technique.
   */
  .ab-hero-h1 {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5.2vw, 5rem);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin-bottom: 1.4rem;
  }
  .ab-hero-h1 em {
    font-style: italic;
    color: var(--accent);
  }

  .ab-hero-sub {
    font-family: var(--font-body);
    font-size: clamp(0.95rem, 1.2vw, 1.05rem);
    color: var(--muted);
    line-height: 1.8;
    font-weight: 400;
    max-width: 540px;
    letter-spacing: 0.005em;
  }

  /* ════════════════════════════════
     BODY: STORY + VALUES
  ════════════════════════════════ */
  .ab-body {
    padding: 5.5rem 7vw 6rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5.5rem;
    align-items: start;
  }
  @media (max-width: 900px) {
    .ab-body { grid-template-columns: 1fr; gap: 3.5rem; padding: 4rem 1.5rem 5rem; }
  }

  /* ── Section eyebrows — color variants matching homepage .eyebrow ── */
  .ab-section-eyebrow {
    display: flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    margin-bottom: 0.2rem;
  }
  .ab-section-eyebrow-bar { width: 1.8rem; height: 1.5px; border-radius: 2px; flex-shrink: 0; }
  .ab-ey-blue { color: var(--blue); }
  .ab-ey-blue .ab-section-eyebrow-bar { background: var(--blue); }
  .ab-ey-red  { color: var(--accent); }
  .ab-ey-red  .ab-section-eyebrow-bar { background: var(--accent); }
  .ab-ey-gold { color: var(--gold); }
  .ab-ey-gold .ab-section-eyebrow-bar { background: var(--gold); }

  /* ── Left: Story ── */
  .ab-story { display: flex; flex-direction: column; gap: 2rem; }

  .ab-story-block { display: flex; flex-direction: column; gap: 0.9rem; }

  /* Body copy — matches homepage .section-body */
  .ab-story p {
    font-family: var(--font-body);
    font-size: 0.97rem;
    color: var(--muted);
    line-height: 1.85;
    font-weight: 400;
    letter-spacing: 0.005em;
  }

  /* Mission box */
  .ab-mission {
    background: var(--off);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent);
    border-radius: 0 12px 12px 0;
    padding: 1.5rem 1.75rem;
  }
  .ab-mission-label {
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 0.6rem;
    display: flex; align-items: center; gap: 0.4rem;
  }
  .ab-mission-label::before {
    content: ''; width: 1rem; height: 1.5px;
    background: var(--accent); border-radius: 2px;
  }
  .ab-mission p {
    font-family: var(--font-body);
    font-size: 0.97rem; color: var(--ink2);
    line-height: 1.8; font-style: italic;
    font-weight: 400; letter-spacing: 0.005em;
  }

  /* Stats row — mirrors homepage .hero-stats */
  .ab-stats {
    display: flex; gap: 0; flex-wrap: wrap;
    border: 1px solid var(--border);
    border-radius: 12px; overflow: hidden;
  }
  .ab-stat {
    flex: 1; min-width: 90px;
    padding: 1.25rem 1.4rem;
    border-right: 1px solid var(--border);
    background: var(--white);
    transition: background 0.2s;
  }
  .ab-stat:last-child { border-right: none; }
  .ab-stat:hover { background: var(--off); }
  /*
   * Stat numbers use DM Serif Display — matches .hero-stat-num on homepage.
   */
  .ab-stat-num {
    font-family: var(--font-display);
    font-size: 1.9rem; font-weight: 400;
    letter-spacing: -0.02em; color: var(--ink); line-height: 1.1;
  }
  .ab-stat-label {
    font-family: var(--font-body);
    font-size: 0.75rem; color: var(--muted);
    margin-top: 0.2rem; font-weight: 400;
    letter-spacing: 0.01em;
  }

  /* ── Right: Core Values ── */
  .ab-values { display: flex; flex-direction: column; gap: 1.5rem; }

  /* Values heading — mirrors homepage .section-h2 */
  .ab-values-heading {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 2.4vw, 2.2rem);
    font-weight: 400; letter-spacing: -0.01em;
    color: var(--ink); line-height: 1.2;
    margin-top: 0.5rem;
  }

  /* Value card — mirrors homepage .step-card */
  .ab-value-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.75rem;
    display: flex; align-items: flex-start; gap: 1.25rem;
    transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.28s, border-color 0.28s;
    box-shadow: var(--shadow-sm);
  }
  .ab-value-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent);
  }
  .ab-value-card:hover .ab-value-icon { background: var(--accent) !important; }
  .ab-value-card:hover .ab-value-icon svg { color: #fff !important; }

  .ab-value-icon {
    width: 2.8rem; height: 2.8rem; min-width: 2.8rem;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .ab-value-icon svg { width: 18px; height: 18px; transition: color 0.2s; }
  .ab-vi-green { background: rgba(22,163,74,0.08); }
  .ab-vi-green svg { color: #16a34a; }
  .ab-vi-red   { background: rgba(232,57,14,0.07); }
  .ab-vi-red svg   { color: var(--accent); }
  .ab-vi-gold  { background: rgba(201,138,6,0.09); }
  .ab-vi-gold svg  { color: var(--gold); }

  /* Value text — mirrors homepage .step-title / .step-body */
  .ab-value-title {
    font-family: var(--font-display);
    font-size: 1.05rem; font-weight: 400;
    color: var(--ink); margin-bottom: 0.35rem; line-height: 1.35;
  }
  .ab-value-desc {
    font-family: var(--font-body);
    font-size: 0.875rem; color: var(--muted);
    line-height: 1.8; font-weight: 400; letter-spacing: 0.005em;
  }

  /* ════════════════════════════════
     TECH STACK STRIP — mirrors homepage .steps-section bg
  ════════════════════════════════ */
  .ab-tech {
    padding: 3.5rem 7vw;
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .ab-tech-eyebrow {
    display: flex; align-items: center; gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 2rem;
  }
  .ab-tech-eyebrow-bar { width: 1.8rem; height: 1.5px; background: var(--gold); border-radius: 2px; }

  .ab-tech-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; }

  /* Tech chip — mirrors homepage hero-badge style */
  .ab-tech-chip {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.45rem 1.1rem;
    font-family: var(--font-body);
    font-size: 0.8rem; font-weight: 400; color: var(--ink2);
    letter-spacing: 0.005em;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    cursor: default;
  }
  .ab-tech-chip::before { content: '◆'; font-size: 0.35rem; color: var(--accent); }
  .ab-tech-chip:hover {
    border-color: var(--accent);
    box-shadow: 0 2px 12px rgba(232,57,14,0.1);
    transform: translateY(-1px);
  }

  /* ════════════════════════════════
     TEAM SECTION
  ════════════════════════════════ */
  .ab-team {
    padding: 5.5rem 7vw 6rem;
    border-bottom: 1px solid var(--border);
    position: relative; overflow: hidden;
  }
  .ab-team::before {
    content: '';
    position: absolute; top: -10%; right: -5%;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.04) 0%, transparent 65%);
    pointer-events: none;
  }

  .ab-team-header {
    display: flex; align-items: flex-end;
    justify-content: space-between;
    gap: 2rem; margin-bottom: 3.5rem; flex-wrap: wrap;
  }
  .ab-team-header-left { max-width: 520px; }

  /* Team h2 — matches homepage .section-h2 */
  .ab-team-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.7rem, 2.6vw, 2.5rem);
    font-weight: 400; letter-spacing: -0.01em;
    color: var(--ink); margin-top: 0.5rem; line-height: 1.15;
  }
  .ab-team-sub {
    font-family: var(--font-body);
    font-size: 0.95rem; color: var(--muted);
    line-height: 1.8; margin-top: 0.65rem;
    font-weight: 400; letter-spacing: 0.005em;
  }
  .ab-team-count {
    font-family: var(--font-display);
    font-size: 4rem; font-weight: 400;
    letter-spacing: -0.04em; color: var(--border2);
    line-height: 1; align-self: flex-start; user-select: none;
  }

  .ab-team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.5rem;
  }
  @media (max-width: 600px) { .ab-team-grid { grid-template-columns: 1fr 1fr; gap: 1rem; } }
  @media (max-width: 420px) { .ab-team-grid { grid-template-columns: 1fr; } }

  /* Member card */
  .ab-member-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.3s, border-color 0.3s;
    box-shadow: var(--shadow-sm);
  }
  .ab-member-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--border2);
  }
  .ab-member-card:hover .ab-member-overlay { opacity: 1; }
  .ab-member-card:hover .ab-member-photo,
  .ab-member-card:hover .ab-member-avatar-placeholder { transform: scale(1.04); }

  .ab-member-photo-wrap {
    position: relative; width: 100%; aspect-ratio: 4/4.5;
    overflow: hidden; background: var(--surface);
  }
  .ab-member-photo {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .ab-member-avatar-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, var(--surface) 0%, var(--border) 100%);
    font-family: var(--font-display);
    font-size: 3rem; font-weight: 400; color: var(--border2);
    letter-spacing: -0.01em;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .ab-member-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(15,15,14,0.65) 0%, transparent 55%);
    opacity: 0; transition: opacity 0.3s;
    display: flex; align-items: flex-end; justify-content: flex-end;
    padding: 1rem;
  }
  .ab-member-socials { display: flex; gap: 0.4rem; }
  .ab-member-social-btn {
    width: 2rem; height: 2rem; border-radius: 8px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    color: #fff; text-decoration: none;
    transition: background 0.2s, transform 0.2s;
  }
  .ab-member-social-btn:hover { background: var(--accent); transform: scale(1.12); }
  .ab-member-social-btn svg { width: 13px; height: 13px; }

  .ab-member-role-badge {
    position: absolute; top: 1rem; left: 1rem;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 100px;
    padding: 0.28rem 0.75rem;
    font-family: var(--font-body);
    font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--ink2);
  }

  .ab-member-info { padding: 1.25rem 1.4rem 1.4rem; }

  /* Member name — DM Serif Display at 400 weight, matches card heading style */
  .ab-member-name {
    font-family: var(--font-display);
    font-size: 1.1rem; font-weight: 400;
    letter-spacing: -0.01em; color: var(--ink); margin-bottom: 0.15rem;
    line-height: 1.25;
  }
  .ab-member-title {
    font-family: var(--font-body);
    font-size: 0.75rem; color: var(--accent); font-weight: 500;
    letter-spacing: 0.04em; margin-bottom: 0.85rem; text-transform: uppercase;
  }
  .ab-member-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
  .ab-member-tag {
    font-family: var(--font-body);
    font-size: 0.7rem; font-weight: 400;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 0.2rem 0.6rem;
    color: var(--ink2);
    transition: border-color 0.15s, color 0.15s;
  }
  .ab-member-card:hover .ab-member-tag {
    border-color: rgba(232,57,14,0.2);
    color: var(--ink);
  }

  /* ════════════════════════════════
     CTA BAND — mirrors homepage .cta-band exactly
  ════════════════════════════════ */
  .ab-cta {
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
    .ab-cta { grid-template-columns: 1fr; margin: 4rem 1.5rem; padding: 3rem 2rem; }
  }
  .ab-cta::before {
    content: '';
    position: absolute; top: -30%; right: -8%;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,57,14,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .ab-cta::after {
    content: '';
    position: absolute; bottom: -40%; left: 20%;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
  .ab-cta-eyebrow {
    font-family: var(--font-body);
    font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.3); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .ab-cta-eyebrow::before { content: ''; width: 1.5rem; height: 1px; background: rgba(255,255,255,0.2); }

  /* CTA heading — matches homepage .cta-h2 */
  .ab-cta-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 3vw, 2.9rem);
    font-weight: 400; color: var(--white);
    line-height: 1.15; letter-spacing: -0.01em;
    max-width: 520px; margin-bottom: 1rem;
  }
  .ab-cta-h2 em { font-style: italic; color: var(--accent2); }

  .ab-cta-body {
    font-family: var(--font-body);
    font-size: 0.92rem; color: rgba(255,255,255,0.4);
    line-height: 1.8; max-width: 440px; font-weight: 400;
  }

  /* Btn white — mirrors homepage .btn-white exactly */
  .ab-btn-white {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--white); color: var(--ink); border: none;
    padding: 1rem 2.2rem; border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.85rem; font-weight: 600;
    letter-spacing: 0.01em;
    text-decoration: none; cursor: pointer; white-space: nowrap;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.16);
    position: relative; z-index: 1;
  }
  .ab-btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.2); }
`;

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ab-reveal");
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
const coreValues = [
  {
    title: "Client Focus",
    icon: UsersRound,
    iconClass: "ab-vi-green",
    desc: "We prioritize understanding your unique business needs and delivering solutions that drive real, measurable value.",
  },
  {
    title: "Innovation",
    icon: Star,
    iconClass: "ab-vi-red",
    desc: "We continuously explore new ways to automate processes and improve workflows using the latest technologies.",
  },
  {
    title: "Quality",
    icon: LaptopMinimalCheck,
    iconClass: "ab-vi-gold",
    desc: "We're committed to delivering robust, reliable solutions with attention to detail and excellent ongoing support.",
  },
];

const techStack = [
  "Google Apps Script",
  "Google Sheets",
  "AppSheet",
  "WhatsApp API",
  "Google Drive",
  "Gmail Automation",
  "Google Forms",
  "Looker Studio",
  "Google Sites",
  "Web Applications",
  "REST APIs",
  "Data Pipelines",
];

const stats = [
  { num: "50+", label: "Clients served" },
  { num: "6+", label: "Industries" },
  { num: "100%", label: "Custom built" },
  { num: "5★", label: "Avg. rating" },
];

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & Lead Architect",
    photo: null,
    initials: "AJ",
    expertise: ["Apps Script", "System Design", "REST APIs"],
    socials: { linkedin: "#", twitter: "#", website: "#" },
  },
  {
    name: "Maria Santos",
    role: "Automation Engineer",
    photo: null,
    initials: "MS",
    expertise: ["AppSheet", "Google Sheets", "Data Pipelines"],
    socials: { linkedin: "#", twitter: null, website: null },
  },
  {
    name: "Daniel Osei",
    role: "Integration Specialist",
    photo: null,
    initials: "DO",
    expertise: ["WhatsApp API", "Gmail Automation", "Looker Studio"],
    socials: { linkedin: "#", twitter: "#", website: null },
  },
  {
    name: "Priya Nair",
    role: "Client Success Manager",
    photo: null,
    initials: "PN",
    expertise: ["Project Management", "Training", "Google Sites"],
    socials: { linkedin: "#", twitter: null, website: "#" },
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  useReveal();

  return (
    <div className="ab-page">
      <style>{globalStyles}</style>

      {/* ── HERO ── */}
      <section className="ab-hero">
        <div className="ab-hero-inner ab-reveal">
          <div className="ab-eyebrow">
            <span className="ab-eyebrow-bar" />
            Who We Are
          </div>
          <h1 className="ab-hero-h1">
            About <em>Us</em>
          </h1>
          <p className="ab-hero-sub">
            A team of passionate Google Workspace automation experts committed
            to helping businesses streamline operations, eliminate waste, and
            boost productivity.
          </p>
        </div>
      </section>

      {/* ── BODY: STORY + VALUES ── */}
      <div className="ab-body">
        {/* LEFT — Story */}
        <div className="ab-story">
          <div className="ab-reveal">
            <div className="ab-section-eyebrow ab-ey-blue">
              <span className="ab-section-eyebrow-bar" />
              Our Story
            </div>
          </div>

          <div className="ab-story-block ab-reveal ab-rd1">
            <p>
              We are a team of passionate Google Workspace automation experts
              committed to helping businesses streamline operations and boost
              productivity. Our journey began with a realization: countless
              hours were being lost to repetitive, manual tasks — time that
              could be better spent growing the business.
            </p>
            <p>
              With deep expertise in Google Workspace technologies — including
              Apps Script, AppSheet, and third-party tools like WhatsApp — we've
              helped clients across various industries transform workflows,
              reduce costs, and regain focus on what truly matters.
            </p>
          </div>

          {/* Mission */}
          <div className="ab-mission ab-reveal ab-rd2">
            <div className="ab-mission-label">Our Mission</div>
            <p>
              To empower businesses with smart automation solutions that save
              time, eliminate errors, and free teams to do more impactful work.
            </p>
          </div>

          {/* Stats */}
          <div className="ab-stats ab-reveal ab-rd3">
            {stats.map((s) => (
              <div key={s.num} className="ab-stat">
                <div className="ab-stat-num">{s.num}</div>
                <div className="ab-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Core Values */}
        <div className="ab-values">
          <div className="ab-reveal">
            <div className="ab-section-eyebrow ab-ey-red">
              <span className="ab-section-eyebrow-bar" />
              What Drives Us
            </div>
            <h2 className="ab-values-heading">Our Core Values</h2>
          </div>

          {coreValues.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className={`ab-value-card ab-reveal ab-rd${i + 1}`}>
                <div className={`ab-value-icon ${v.iconClass}`}>
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <div className="ab-value-title">{v.title}</div>
                  <p className="ab-value-desc">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── TECH STACK ── */}
      <section className="ab-tech">
        <div className="ab-tech-eyebrow ab-reveal">
          <span className="ab-tech-eyebrow-bar" />
          Technologies We Work With
        </div>
        <div className="ab-tech-grid ab-reveal ab-rd1">
          {techStack.map((tech) => (
            <span key={tech} className="ab-tech-chip">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ── TEAM MEMBERS ── */}
      <section className="ab-team">
        <div className="ab-team-header">
          <div className="ab-team-header-left ab-reveal">
            <div className="ab-section-eyebrow ab-ey-blue">
              <span className="ab-section-eyebrow-bar" />
              The People Behind It
            </div>
            <h2 className="ab-team-h2">Meet Our Team</h2>
            <p className="ab-team-sub">
              Specialists who genuinely care about your workflows — and know
              exactly how to fix them.
            </p>
          </div>
          <div className="ab-team-count ab-reveal ab-rd1" aria-hidden="true">
            0{teamMembers.length}
          </div>
        </div>

        <div className="ab-team-grid">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className={`ab-member-card ab-reveal ab-rd${Math.min(i + 1, 4)}`}
            >
              <div className="ab-member-photo-wrap">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="ab-member-photo"
                  />
                ) : (
                  <div className="ab-member-avatar-placeholder">
                    {member.initials}
                  </div>
                )}
                <div className="ab-member-role-badge">{member.role}</div>
                <div className="ab-member-overlay">
                  <div className="ab-member-socials">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        className="ab-member-social-btn"
                        aria-label="LinkedIn"
                      >
                        <Linkedin />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        className="ab-member-social-btn"
                        aria-label="Twitter"
                      >
                        <Twitter />
                      </a>
                    )}
                    {member.socials.website && (
                      <a
                        href={member.socials.website}
                        className="ab-member-social-btn"
                        aria-label="Website"
                      >
                        <Globe />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="ab-member-info">
                <div className="ab-member-name">{member.name}</div>
                <div className="ab-member-title">{member.role}</div>
                <div className="ab-member-tags">
                  {member.expertise.map((tag) => (
                    <span key={tag} className="ab-member-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <div className="ab-cta ab-reveal">
        <div>
          <div className="ab-cta-eyebrow">Work with us</div>
          <h2 className="ab-cta-h2">
            Ready to Transform
            <br />
            <em>Your Workflow?</em>
          </h2>
          <p className="ab-cta-body">
            Let's talk about how we can automate the repetitive and help your
            team focus on what actually matters.
          </p>
        </div>
        <Link href="/contact" className="ab-btn-white">
          Book a Free Call →
        </Link>
      </div>
    </div>
  );
}
