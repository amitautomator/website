"use client";

import Link from "next/link";
import Image from "next/image";

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Sans:wght@300;400;500&display=swap');

  :root {
    --white:   #ffffff;
    --off:     #fafaf8;
    --surface: #f4f3ef;
    --border:  #e8e6e0;
    --ink:     #111110;
    --ink2:    #3a3935;
    --muted:   #7a7870;
    --accent:  #e8390e;
    --blue:    #1a56db;
  }

  /* ── Footer shell ── */
  .ft-footer {
    background: var(--ink);
    color: var(--off);
    border-top: 1px solid rgba(255,255,255,0.06);
    font-family: 'Instrument Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* ── Top band ── */
  .ft-top {
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem 7vw 3.5rem;
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
    display: inline-flex; align-items: center; gap: 0.6rem;
    text-decoration: none;
  }
  .ft-logo-img { width: 36px !important; height: 36px !important; object-fit: contain; }
  .ft-logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem; font-weight: 800; letter-spacing: -0.02em;
    color: var(--off);
  }
  .ft-logo-text span { color: var(--accent); }

  .ft-brand-body {
    font-size: 0.88rem; color: rgba(255,255,255,0.45);
    line-height: 1.8; max-width: 300px;
  }

  /* socials */
  .ft-socials { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.25rem; }
  .ft-social-link {
    width: 2.1rem; height: 2.1rem;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
  }
  .ft-social-link:hover {
    background: rgba(232,57,14,0.18);
    border-color: rgba(232,57,14,0.35);
    transform: translateY(-2px);
  }
  .ft-social-link img { width: 16px !important; height: 16px !important; object-fit: contain; filter: invert(1); opacity: 0.7; }
  .ft-social-link:hover img { opacity: 1; }

  /* ── Link columns ── */
  .ft-col { display: flex; flex-direction: column; gap: 1rem; }

  .ft-col-label {
    font-family: 'Syne', sans-serif;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .ft-links { display: flex; flex-direction: column; gap: 0.15rem; }

  .ft-link {
    font-size: 0.88rem; font-weight: 400;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    padding: 0.3rem 0;
    display: flex; align-items: center; gap: 0.4rem;
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

  /* contact items */
  .ft-contact-list { display: flex; flex-direction: column; gap: 0.8rem; }
  .ft-contact-item {
    display: flex; align-items: flex-start; gap: 0.6rem;
    font-size: 0.85rem; color: rgba(255,255,255,0.45);
    text-decoration: none;
    transition: color 0.18s;
  }
  .ft-contact-item:hover { color: rgba(255,255,255,0.75); }
  .ft-contact-icon {
    width: 1.5rem; height: 1.5rem; min-width: 1.5rem;
    background: rgba(232,57,14,0.12);
    border-radius: 5px;
    display: flex; align-items: center; justify-content: center;
    margin-top: 0.05rem;
  }
  .ft-contact-icon svg { width: 11px; height: 11px; color: var(--accent); }
  .ft-contact-val { line-height: 1.4; }
  .ft-contact-sub { font-size: 0.72rem; color: rgba(255,255,255,0.25); margin-top: 0.05rem; }

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
  @media (max-width: 560px) { .ft-bottom { padding: 1.25rem 1.5rem; flex-direction: column; align-items: flex-start; } }

  .ft-copy {
    font-size: 0.78rem; color: rgba(255,255,255,0.25);
    display: flex; align-items: center; gap: 0.5rem;
  }
  .ft-copy-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.15); }

  .ft-legal { display: flex; align-items: center; gap: 1.25rem; }
  .ft-legal-link {
    font-size: 0.75rem; color: rgba(255,255,255,0.25);
    text-decoration: none;
    transition: color 0.18s;
  }
  .ft-legal-link:hover { color: rgba(255,255,255,0.55); }

  /* made-with badge */
  .ft-made {
    font-size: 0.72rem; color: rgba(255,255,255,0.2);
    display: flex; align-items: center; gap: 0.3rem;
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
              width={36}
              height={36}
              className="ft-logo-img"
            />
            <span className="ft-logo-text">
              Automate <span>Ideas</span>
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
