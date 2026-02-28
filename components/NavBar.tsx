"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// ─── Styles ───────────────────────────────────────────────────────────────────
const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  /* ── Matches homepage :root exactly ── */
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

  /* ── Nav shell ── */
  .nb-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    transition: box-shadow 0.3s;
  }
  .nb-header.nb-scrolled {
    box-shadow: var(--shadow-md);
  }

  .nb-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 7vw;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  /* ── Logo ── */
  .nb-logo {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    text-decoration: none;
    flex-shrink: 0;
  }
  .nb-logo-img {
    width: 36px !important;
    height: 36px !important;
    object-fit: contain;
  }
  /*
   * Logo wordmark uses DM Serif Display to echo the hero heading.
   * The accent word is italic — same technique as .line-accent in the hero.
   */
  .nb-logo-text {
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: var(--ink);
    white-space: nowrap;
    line-height: 1;
  }
  .nb-logo-text em {
    font-style: italic;
    color: var(--accent);
  }

  /* ── Desktop nav ── */
  .nb-nav {
    display: flex;
    align-items: center;
    gap: 0.15rem;
  }
  @media (max-width: 640px) {
    .nb-nav { display: none; }
  }

  /*
   * Nav links use DM Sans (body font) — clean, readable, no visual competition
   * with the display-font logo. Active state uses the accent dot from homepage.
   */
  .nb-link {
    position: relative;
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--muted);
    text-decoration: none;
    padding: 0.45rem 0.9rem;
    border-radius: 6px;
    letter-spacing: 0.005em;
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .nb-link:hover {
    color: var(--ink);
    background: var(--surface);
  }
  .nb-link.nb-active {
    color: var(--ink);
    font-weight: 500;
  }
  /* Active indicator — same accent dot style as homepage hero badge */
  .nb-link.nb-active::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent);
  }

  /* ── CTA button — mirrors .btn-primary from homepage ── */
  .nb-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 0.55rem 1.3rem;
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 10px rgba(232, 57, 14, 0.2), 0 1px 3px rgba(232, 57, 14, 0.1);
  }
  .nb-cta:hover {
    background: #cc2f08;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(232, 57, 14, 0.28);
  }
  @media (max-width: 640px) {
    .nb-cta { display: none; }
  }

  /* ── Mobile hamburger ── */
  .nb-burger {
    display: none;
    align-items: center;
    justify-content: center;
    width: 2.2rem;
    height: 2.2rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    color: var(--ink);
    flex-shrink: 0;
  }
  .nb-burger:hover {
    background: var(--border);
    border-color: var(--border2);
  }
  @media (max-width: 640px) {
    .nb-burger { display: flex; }
  }

  /* ── Mobile drawer backdrop ── */
  .nb-drawer-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(15, 15, 14, 0.4);
    backdrop-filter: blur(3px);
    animation: nb-fade-in 0.2s ease;
  }
  @keyframes nb-fade-in {
    from { opacity: 0; }
  }

  /* ── Mobile drawer panel ── */
  .nb-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    z-index: 201;
    width: min(320px, 85vw);
    background: var(--white);
    border-left: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    box-shadow: -8px 0 48px rgba(15, 15, 14, 0.12);
    animation: nb-slide-in 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
  @keyframes nb-slide-in {
    from { transform: translateX(100%); }
  }

  /* ── Drawer header ── */
  .nb-drawer-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid var(--border);
  }
  .nb-drawer-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: var(--ink);
    text-decoration: none;
    line-height: 1;
  }
  .nb-drawer-logo em {
    font-style: italic;
    color: var(--accent);
  }

  .nb-drawer-close {
    width: 2rem;
    height: 2rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--ink2);
    transition: background 0.15s, border-color 0.15s;
  }
  .nb-drawer-close:hover {
    background: var(--border);
    border-color: var(--border2);
  }

  /* ── Drawer links ── */
  .nb-drawer-links {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem 0.75rem;
    gap: 0.2rem;
    overflow-y: auto;
  }

  .nb-drawer-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1rem;
    border-radius: 8px;
    font-family: var(--font-body);
    font-size: 0.97rem;
    font-weight: 400;
    color: var(--ink2);
    text-decoration: none;
    letter-spacing: 0.005em;
    transition: background 0.15s, color 0.15s;
  }
  .nb-drawer-link:hover {
    background: var(--surface);
    color: var(--ink);
  }
  .nb-drawer-link.nb-drawer-active {
    background: rgba(232, 57, 14, 0.05);
    color: var(--accent);
    font-weight: 500;
  }
  .nb-drawer-link-arrow {
    font-size: 0.75rem;
    opacity: 0.3;
    transition: opacity 0.15s;
  }
  .nb-drawer-link:hover .nb-drawer-link-arrow {
    opacity: 0.6;
  }
  .nb-drawer-link.nb-drawer-active .nb-drawer-link-arrow {
    opacity: 1;
    color: var(--accent);
  }

  /* ── Drawer footer CTA — mirrors .btn-primary ── */
  .nb-drawer-footer {
    padding: 1.25rem 1.5rem;
    border-top: 1px solid var(--border);
  }
  .nb-drawer-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 0.9rem;
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(232, 57, 14, 0.22), 0 1px 3px rgba(232, 57, 14, 0.1);
    transition: background 0.2s, box-shadow 0.2s;
  }
  .nb-drawer-cta:hover {
    background: #cc2f08;
    box-shadow: 0 6px 20px rgba(232, 57, 14, 0.3);
  }

  /* ── Drawer section divider label (optional visual polish) ── */
  .nb-drawer-section-label {
    font-family: var(--font-body);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 0.5rem 1rem 0.25rem;
    opacity: 0.7;
  }
`;

// ── Data ──────────────────────────────────────────────────────────────────────
const navMenu = ["Home", "Services", "Pricing", "About Us", "Contact Us"];

function getPath(item: string, index: number) {
  return index === 0 ? "/" : `/${item.replace(/\s+/g, "-").toLowerCase()}`;
}

// ── Component ─────────────────────────────────────────────────────────────────
function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <style>{navStyles}</style>

      <header className={`nb-header${scrolled ? "nb-scrolled" : ""}`}>
        <div className="nb-inner">
          {/* ── Logo ── */}
          <Link href="/" className="nb-logo">
            <Image
              src="/Logo.png"
              alt="Automate Ideas"
              width={36}
              height={36}
              priority
              className="nb-logo-img"
            />
            {/* DM Serif Display + italic accent mirrors hero h1 .line-accent */}
            <span className="nb-logo-text">
              Automate <em>Ideas</em>
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="nb-nav" aria-label="Main navigation">
            {navMenu.map((item, i) => {
              const href = getPath(item, i);
              const active = pathname === href;
              return (
                <Link
                  key={item}
                  href={href}
                  prefetch
                  className={`nb-link${active ? "nb-active" : ""}`}
                >
                  {item}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <Link href="/contact-us" className="nb-cta">
            Book a Free Call →
          </Link>

          {/* ── Mobile hamburger ── */}
          <button
            className="nb-burger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={17} />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="nb-drawer-backdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div className="nb-drawer" role="dialog" aria-label="Navigation menu">
            {/* Head */}
            <div className="nb-drawer-head">
              <Link
                href="/"
                className="nb-drawer-logo"
                onClick={() => setOpen(false)}
              >
                <Image
                  src="/Logo.png"
                  alt="Automate Ideas"
                  width={26}
                  height={26}
                />
                Automate&nbsp;<em>Ideas</em>
              </Link>
              <button
                className="nb-drawer-close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={13} />
              </button>
            </div>

            {/* Links */}
            <nav className="nb-drawer-links" aria-label="Mobile navigation">
              <div className="nb-drawer-section-label">Navigation</div>
              {navMenu.map((item, i) => {
                const href = getPath(item, i);
                const active = pathname === href;
                return (
                  <Link
                    key={item}
                    href={href}
                    className={`nb-drawer-link${active ? "nb-drawer-active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {item}
                    <span className="nb-drawer-link-arrow">→</span>
                  </Link>
                );
              })}
            </nav>

            {/* Footer CTA */}
            <div className="nb-drawer-footer">
              <Link
                href="/contact-us"
                className="nb-drawer-cta"
                onClick={() => setOpen(false)}
              >
                Book a Free Call →
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NavBar;
