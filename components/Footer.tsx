"use client";

import Link from "next/link";
import Image from "next/image";

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
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

  /* ── Footer shell ── */
  .ft-footer {
    background: var(--ink);
    color: var(--off);
    border-top: 1px solid rgba(255,255,255,0.06);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* ── Top band ── */
  .ft-top {
    max-width: 1400px;
    margin: 0 auto;
    padding: 4.5rem 7vw 4rem;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr;
    gap: 4rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  @media (max-width: 900px) { .ft-top { grid-template-columns: 1fr 1fr; gap: 3rem; } }
  @media (max-width: 560px) { .ft-top { grid-template-columns: 1fr; gap: 2.5rem; padding: 3rem 1.5rem 2.5rem; } }

  /* ── Brand column ── */
  .ft-brand { display: flex; flex-direction: column; gap: 1.25rem; }

  .ft-logo {
    display: inline-flex; align-items: center; gap: 0.55rem;
    text-decoration: none;
  }
  .ft-logo-img { width: 34px !important; height: 34px !important; object-fit: contain; }

  /*
   * Logo wordmark — DM Serif Display, mirrors the NavBar logo treatment.
   * "Ideas" is italic + accent color, matching .line-accent technique.
   */
  .ft-logo-text {
    font-family: var(--font-display);
    font-size: 1.1rem; font-weight: 400;
    letter-spacing: -0.01em; color: var(--off);
    line-height: 1;
  }
  .ft-logo-text em {
    font-style: italic;
    color: var(--accent);
  }

  /* Brand body copy */
  .ft-brand-body {
    font-family: var(--font-body);
    font-size: 0.875rem; color: rgba(255,255,255,0.4);
    line-height: 1.85; max-width: 300px;
    font-weight: 400; letter-spacing: 0.005em;
  }

  /* Socials */
  .ft-socials { display: flex; flex-wrap: wrap; gap: 0.55rem; margin-top: 0.25rem; }
  .ft-social-link {
    width: 2.1rem; height: 2.1rem;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
  }
  .ft-social-link:hover {
    background: rgba(232,57,14,0.18);
    border-color: rgba(232,57,14,0.35);
    transform: translateY(-2px);
  }
  .ft-social-link img {
    width: 16px !important; height: 16px !important;
    object-fit: contain; filter: invert(1); opacity: 0.6;
  }
  .ft-social-link:hover img { opacity: 1; }

  /* ── Link columns ── */
  .ft-col { display: flex; flex-direction: column; gap: 1rem; }

  /*
   * Column labels — matches the .eyebrow uppercase pattern throughout the site.
   */
  .ft-col-label {
    font-family: var(--font-body);
    font-size: 0.65rem; font-weight: 600;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: rgba(255,255,255,0.28);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .ft-links { display: flex; flex-direction: column; gap: 0.15rem; }

  /* Footer links — DM Sans body font, animated accent underline */
  .ft-link {
    font-family: var(--font-body);
    font-size: 0.875rem; font-weight: 400;
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    padding: 0.3rem 0;
    display: flex; align-items: center; gap: 0.4rem;
    letter-spacing: 0.005em;
    transition: color 0.18s, gap 0.18s;
  }
  .ft-link::before {
    content: '';
    width: 0; height: 1px;
    background: var(--accent);
    transition: width 0.18s;
    flex-shrink: 0;
  }
  .ft-link:hover { color: var(--off); gap: 0.6rem; }
  .ft-link:hover::before { width: 12px; }

  /* ── Bottom bar ── */
  .ft-bottom {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.25rem 7vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  @media (max-width: 560px) {
    .ft-bottom { padding: 1.25rem 1.5rem; flex-direction: column; align-items: flex-start; }
  }

  .ft-copy {
    font-family: var(--font-body);
    font-size: 0.78rem; color: rgba(255,255,255,0.22);
    display: flex; align-items: center; gap: 0.5rem;
    font-weight: 400; letter-spacing: 0.005em;
  }
  .ft-copy-dot {
    width: 3px; height: 3px; border-radius: 50%;
    background: rgba(255,255,255,0.14);
  }

  .ft-legal { display: flex; align-items: center; gap: 1.25rem; }
  .ft-legal-link {
    font-family: var(--font-body);
    font-size: 0.75rem; color: rgba(255,255,255,0.22);
    text-decoration: none; font-weight: 400;
    transition: color 0.18s;
  }
  .ft-legal-link:hover { color: rgba(255,255,255,0.5); }

  /* Made-with badge */
  .ft-made {
    font-family: var(--font-body);
    font-size: 0.72rem; color: rgba(255,255,255,0.18);
    display: flex; align-items: center; gap: 0.3rem;
    font-weight: 400;
  }
  .ft-made span { color: var(--accent); }
`;

// ── Data ──────────────────────────────────────────────────────────────────────
const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61575991143624",
    src: "/facebook.svg",
    alt: "Facebook",
  },
  {
    href: "https://www.instagram.com/automate_ideas",
    src: "/instagram.svg",
    alt: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/automate-ideas/",
    src: "/linkedin.svg",
    alt: "LinkedIn",
  },
  { href: "https://x.com/automateideas", src: "/x.svg", alt: "X (Twitter)" },
  {
    href: "https://www.youtube.com/@AutomateIdeas",
    src: "/youtube.svg",
    alt: "YouTube",
  },
  {
    href: "https://wa.me/917210756879?text=I%27m%20interested%20in%20your%20services",
    src: "/whatsapp.svg",
    alt: "WhatsApp",
  },
];

const navLinks = ["Home", "Services", "Pricing", "About Us", "Contact Us"];
const services = [
  "Google Workspace",
  "WhatsApp API",
  "Process Automation",
  "Data Analytics",
  "Custom Web Apps",
];

function getPath(item: string, index: number) {
  return index === 0 ? "/" : `/${item.replace(/\s+/g, "-").toLowerCase()}`;
}

// ── Component ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="ft-footer">
      <style>{styles}</style>

      {/* ── Top grid ── */}
      <div className="ft-top">
        {/* Brand */}
        <div className="ft-brand">
          <Link href="/" className="ft-logo">
            <Image
              src="/Logo.png"
              alt="Automate Ideas"
              width={34}
              height={34}
              className="ft-logo-img"
            />
            {/* DM Serif Display + italic accent — mirrors NavBar logo */}
            <span className="ft-logo-text">
              Automate <em>Ideas</em>
            </span>
          </Link>

          <p className="ft-brand-body">
            We empower businesses to optimize their operations by automating key
            processes within Google Workspace — saving time, reducing errors,
            and boosting productivity.
          </p>

          <div className="ft-socials">
            {socialLinks.map(({ href, src, alt }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="ft-social-link"
                aria-label={alt}
              >
                <Image src={src} width={16} height={16} alt={alt} />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="ft-col">
          <div className="ft-col-label">Quick Links</div>
          <div className="ft-links">
            {navLinks.map((item, i) => (
              <Link
                key={item}
                href={getPath(item, i)}
                prefetch
                className="ft-link"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="ft-col">
          <div className="ft-col-label">Services</div>
          <div className="ft-links">
            {services.map((s) => (
              <Link key={s} href="/services" className="ft-link">
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <div className="ft-copy">
          © 2025 Automate Ideas
          <span className="ft-copy-dot" />
          All rights reserved
        </div>

        <div className="ft-legal">
          <Link href="/privacy-policy" className="ft-legal-link">
            Privacy Policy
          </Link>
          <Link href="/terms" className="ft-legal-link">
            Terms of Use
          </Link>
        </div>

        <div className="ft-made">
          Built with <span>♥</span> in India
        </div>
      </div>
    </footer>
  );
}

export default Footer;
