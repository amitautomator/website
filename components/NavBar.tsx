"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// ─── Styles ───────────────────────────────────────────────────────────────────
const navStyles = `
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
  }

  /* ── Nav shell ── */
  .nb-header {
    position: sticky; top: 0; z-index: 100;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    transition: box-shadow 0.3s;
  }
  .nb-header.nb-scrolled {
    box-shadow: 0 4px 24px rgba(17,17,16,0.07);
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
    gap: 0.6rem;
    text-decoration: none;
    flex-shrink: 0;
  }
  .nb-logo-img {
    width: 38px !important;
    height: 38px !important;
    object-fit: contain;
  }
  .nb-logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--ink);
    white-space: nowrap;
  }
  .nb-logo-text span { color: var(--accent); }

  /* ── Desktop nav ── */
  .nb-nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  @media (max-width: 640px) { .nb-nav { display: none; } }

  .nb-link {
    position: relative;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--muted);
    text-decoration: none;
    padding: 0.45rem 0.85rem;
    border-radius: 6px;
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .nb-link:hover {
    color: var(--ink);
    background: var(--surface);
  }
  .nb-link.nb-active {
    color: var(--ink);
    font-weight: 600;
  }
  /* active indicator dot under text */
  .nb-link.nb-active::after {
    content: '';
    position: absolute;
    bottom: 2px; left: 50%; transform: translateX(-50%);
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--accent);
  }

  /* ── CTA button ── */
  .nb-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 0.5rem 1.25rem;
    border-radius: 6px;
    font-family: 'Syne', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(232,57,14,0.2);
    flex-shrink: 0;
  }
  .nb-cta:hover {
    background: #c93109;
    transform: translateY(-1px);
    box-shadow: 0 5px 18px rgba(232,57,14,0.28);
  }
  @media (max-width: 640px) { .nb-cta { display: none; } }

  /* ── Mobile hamburger ── */
  .nb-burger {
    display: none;
    align-items: center;
    justify-content: center;
    width: 2.25rem; height: 2.25rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 7px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    color: var(--ink);
    flex-shrink: 0;
  }
  .nb-burger:hover { background: var(--border); }
  @media (max-width: 640px) { .nb-burger { display: flex; } }

  /* ── Mobile drawer ── */
  .nb-drawer-backdrop {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(17,17,16,0.35);
    backdrop-filter: blur(2px);
    animation: nb-fade-in 0.2s ease;
  }
  @keyframes nb-fade-in { from { opacity: 0; } }

  .nb-drawer {
    position: fixed; top: 0; right: 0; bottom: 0; z-index: 201;
    width: min(320px, 85vw);
    background: var(--white);
    border-left: 1px solid var(--border);
    display: flex; flex-direction: column;
    box-shadow: -8px 0 40px rgba(17,17,16,0.12);
    animation: nb-slide-in 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  @keyframes nb-slide-in { from { transform: translateX(100%); } }

  .nb-drawer-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border);
  }
  .nb-drawer-logo {
    display: flex; align-items: center; gap: 0.5rem;
    font-family: 'Syne', sans-serif;
    font-size: 1rem; font-weight: 800; letter-spacing: -0.02em;
    color: var(--ink); text-decoration: none;
  }
  .nb-drawer-logo span { color: var(--accent); }

  .nb-drawer-close {
    width: 2rem; height: 2rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--ink);
    transition: background 0.15s;
  }
  .nb-drawer-close:hover { background: var(--border); }

  .nb-drawer-links {
    flex: 1;
    display: flex; flex-direction: column;
    padding: 1.25rem 1rem;
    gap: 0.25rem;
    overflow-y: auto;
  }

  .nb-drawer-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 1rem; font-weight: 500;
    color: var(--ink2);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }
  .nb-drawer-link:hover { background: var(--surface); color: var(--ink); }
  .nb-drawer-link.nb-drawer-active {
    background: rgba(232,57,14,0.06);
    color: var(--accent);
    font-weight: 600;
  }
  .nb-drawer-link-arrow { font-size: 0.8rem; opacity: 0.4; }
  .nb-drawer-link.nb-drawer-active .nb-drawer-link-arrow { opacity: 1; color: var(--accent); }

  .nb-drawer-footer {
    padding: 1.25rem 1.5rem;
    border-top: 1px solid var(--border);
  }
  .nb-drawer-cta {
    display: flex; align-items: center; justify-content: center; gap: 0.4rem;
    width: 100%;
    background: var(--accent); color: #fff; border: none;
    padding: 0.85rem;
    border-radius: 8px;
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem; font-weight: 700;
    text-decoration: none; cursor: pointer;
    box-shadow: 0 2px 10px rgba(232,57,14,0.22);
    transition: background 0.2s;
  }
  .nb-drawer-cta:hover { background: #c93109; }
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

  // shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <style>{navStyles}</style>

      <header className={`nb-header${scrolled ? "nb-scrolled" : ""}`}>
        <div className="nb-inner">
          {/* Logo */}
          <Link href="/" className="nb-logo">
            <Image
              src="/Logo.png"
              alt="Automate Ideas"
              width={38}
              height={38}
              priority
              className="nb-logo-img"
            />
            <span className="nb-logo-text">
              Automate <span>Ideas</span>
            </span>
          </Link>

          {/* Desktop nav links */}
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

          {/* Desktop CTA */}
          <Link href="/contact-us" className="nb-cta">
            Book a Free Call →
          </Link>

          {/* Mobile hamburger */}
          <button
            className="nb-burger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          {/* backdrop */}
          <div
            className="nb-drawer-backdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* drawer panel */}
          <div className="nb-drawer" role="dialog" aria-label="Navigation menu">
            {/* head */}
            <div className="nb-drawer-head">
              <Link
                href="/"
                className="nb-drawer-logo"
                onClick={() => setOpen(false)}
              >
                <Image
                  src="/Logo.png"
                  alt="Automate Ideas"
                  width={28}
                  height={28}
                />
                Automate <span>&nbsp;Ideas</span>
              </Link>
              <button
                className="nb-drawer-close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={14} />
              </button>
            </div>

            {/* links */}
            <nav className="nb-drawer-links" aria-label="Mobile navigation">
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

            {/* footer CTA */}
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
