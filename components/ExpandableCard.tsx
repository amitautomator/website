"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Image from "next/image";

const cardStyles = `
  .ec-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  @media (max-width: 900px) { .ec-grid { grid-template-columns: 1fr; } }
  @media (min-width: 601px) and (max-width: 900px) { .ec-grid { grid-template-columns: 1fr 1fr; } }

  /* ── Card tile ── */
  .ec-tile {
    background: var(--white, #fff);
    border: 1px solid var(--border, #e8e6e0);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.25s cubic-bezier(0.22,1,0.36,1),
                border-color 0.25s;
    box-shadow: 0 1px 4px rgba(17,17,16,0.06);
    position: relative;
  }
  .ec-tile:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 48px rgba(17,17,16,0.11), 0 4px 16px rgba(17,17,16,0.06);
    border-color: var(--accent, #e8390e);
  }
  .ec-tile:hover .ec-arrow { opacity: 1; transform: translate(0, 0); }

  /* image area */
  .ec-img-wrap {
    width: 100%;
    height: 220px;
    background: var(--surface, #f4f3ef);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }
  .ec-img-wrap img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    padding: 1.5rem;
  }

  /* card body */
  .ec-body {
    padding: 1.5rem 1.75rem 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    position: relative;
  }
  .ec-tag {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent, #e8390e);
    display: flex; align-items: center; gap: 0.4rem;
  }
  .ec-tag::before {
    content: '';
    width: 1.2rem; height: 1.5px;
    background: var(--accent, #e8390e);
    border-radius: 2px;
  }
  .ec-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.35;
    color: var(--ink, #111110);
  }
  .ec-hint {
    font-size: 0.8rem;
    color: var(--muted, #7a7870);
    display: flex; align-items: center; gap: 0.3rem;
    margin-top: 0.25rem;
  }
  .ec-arrow {
    position: absolute;
    bottom: 1.5rem; right: 1.5rem;
    width: 2rem; height: 2rem;
    border-radius: 50%;
    background: var(--accent, #e8390e);
    display: flex; align-items: center; justify-content: center;
    opacity: 0;
    transform: translate(4px, 4px);
    transition: opacity 0.2s, transform 0.2s;
  }
  .ec-arrow svg { color: #fff; }

  /* ── Overlay backdrop ── */
  .ec-backdrop {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(17,17,16,0.4);
    backdrop-filter: blur(2px);
  }

  /* ── Modal ── */
  .ec-modal-wrap {
    position: fixed; inset: 0; z-index: 300;
    display: grid; place-items: center;
    padding: 1.25rem;
  }
  .ec-modal {
    background: var(--white, #fff);
    border: 1px solid var(--border, #e8e6e0);
    border-radius: 20px;
    width: 100%;
    max-width: 1000px;
    max-height: 92vh;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 340px;
    box-shadow: 0 32px 100px rgba(17,17,16,0.22), 0 8px 32px rgba(17,17,16,0.1);
    position: relative;
  }
  @media (max-width: 720px) {
    .ec-modal {
      grid-template-columns: 1fr;
      max-width: 520px;
      max-height: 92vh;
      overflow-y: auto;
    }
  }

  /* modal image — large left panel */
  .ec-modal-img {
    background: var(--surface, #f4f3ef);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
    position: relative;
    min-height: 500px;
  }
  @media (max-width: 720px) { .ec-modal-img { min-height: 280px; } }
  .ec-modal-img img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    padding: 3rem;
    position: absolute; inset: 0;
  }

  /* close button */
  .ec-close {
    position: absolute;
    top: 1rem; right: 1rem;
    width: 2.1rem; height: 2.1rem;
    border-radius: 50%;
    background: var(--white, #fff);
    border: 1px solid var(--border, #e8e6e0);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: background 0.15s, border-color 0.15s;
    box-shadow: 0 2px 8px rgba(17,17,16,0.12);
  }
  .ec-close:hover { background: var(--surface, #f4f3ef); border-color: var(--border2, #d4d0c8); }
  .ec-close svg { width: 14px; height: 14px; color: var(--ink, #111110); }

  /* modal right panel */
  .ec-modal-content {
    padding: 2.25rem 1.75rem 2.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--border, #e8e6e0);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: var(--border, #e8e6e0) transparent;
  }
  @media (max-width: 720px) {
    .ec-modal-content {
      border-left: none;
      border-top: 1px solid var(--border, #e8e6e0);
    }
  }
  .ec-modal-tag {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent, #e8390e);
    display: flex; align-items: center; gap: 0.4rem;
    margin-bottom: 0.75rem;
  }
  .ec-modal-tag::before {
    content: '';
    width: 1.2rem; height: 1.5px;
    background: var(--accent, #e8390e);
    border-radius: 2px;
  }
  .ec-modal-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.15rem;
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.02em;
    color: var(--ink, #111110);
    margin-bottom: 1.5rem;
  }

  /* feature list inside modal */
  .ec-feature-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
  }
  .ec-feature-list li {
    display: flex;
    gap: 0.85rem;
    align-items: flex-start;
    font-size: 0.92rem;
    color: var(--ink2, #3a3935);
    line-height: 1.65;
  }
  .ec-feature-icon {
    width: 1.5rem; height: 1.5rem;
    min-width: 1.5rem;
    border-radius: 50%;
    background: rgba(232,57,14,0.08);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem;
    color: var(--accent, #e8390e);
    font-weight: 700;
    margin-top: 0.1rem;
  }
  .ec-feature-list strong {
    font-weight: 700;
    color: var(--ink, #111110);
    display: block;
    margin-bottom: 0.1rem;
    font-size: 0.88rem;
  }
  .ec-feature-text { flex: 1; }
`;

// ── Feature content renderer ──────────────────────────────────────────────────
type ContentItem = { label: string; body: string };

function FeatureList({ items }: { items: ContentItem[] }) {
  return (
    <ul className="ec-feature-list">
      {items.map((item, i) => (
        <li key={i}>
          <span className="ec-feature-icon">✓</span>
          <span className="ec-feature-text">
            <strong>{item.label}</strong>
            {item.body}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ── Card data ─────────────────────────────────────────────────────────────────
const cards = [
  {
    tag: "Communication",
    title: "Boost Communication with WhatsApp-Email Integration",
    src: "./C1.svg",
    items: [
      {
        label: "Faster Responses:",
        body: " Get instant mobile alerts for quicker replies.",
      },
      {
        label: "Better Team Collaboration:",
        body: " Share files, images, and links for real-time teamwork.",
      },
      {
        label: "All-in-One Communication:",
        body: " Track key messages in one place — no more lost info.",
      },
      {
        label: "Higher Engagement:",
        body: " WhatsApp's casual style boosts open and inclusive chats.",
      },
    ],
  },
  {
    tag: "CRM",
    title: "Custom CRM Solutions Built Around Your Business",
    src: "./C2.svg",
    items: [
      {
        label: "Tailored to Fit:",
        body: " CRM features designed to match your unique workflows.",
      },
      {
        label: "Scalable Growth:",
        body: " Adaptable systems that grow alongside your business.",
      },
      {
        label: "Better Customer Insights:",
        body: " Track interactions, sales, and support in one place.",
      },
      {
        label: "Boost Productivity:",
        body: " Automate tasks and streamline daily operations.",
      },
    ],
  },
  {
    tag: "Automation",
    title: "Empower Your Business with Tailored Automation Solutions",
    src: "./C3.svg",
    items: [
      {
        label: "Cost Reduction:",
        body: " Automation minimizes labor costs and reduces human error.",
      },
      {
        label: "Improved Productivity:",
        body: " Free your team to focus on higher-value, strategic work.",
      },
      {
        label: "Data-Driven Decisions:",
        body: " Analyze data quickly and inform smarter strategies.",
      },
      {
        label: "Enhanced Compliance:",
        body: " Automated checks reduce risk of regulatory non-compliance.",
      },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ExpandableCard() {
  const [active, setActive] = useState<(typeof cards)[number] | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <style>{cardStyles}</style>

      {/* ── Backdrop ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            className="ec-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* ── Modal ── */}
      <AnimatePresence>
        {active && (
          <div className="ec-modal-wrap">
            <motion.div
              key={`modal-${active.title}-${id}`}
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="ec-modal"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            >
              {/* close — sits in top-right of whole modal */}
              <button
                className="ec-close"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* LEFT — large image panel */}
              <motion.div
                layoutId={`img-${active.title}-${id}`}
                className="ec-modal-img"
              >
                <Image
                  src={active.src}
                  alt={active.title}
                  width={640}
                  height={500}
                />
              </motion.div>

              {/* RIGHT — scrollable content */}
              <div className="ec-modal-content">
                <div className="ec-modal-tag">{active.tag}</div>
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="ec-modal-title"
                >
                  {active.title}
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <FeatureList items={active.items} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Card Grid ── */}
      <div className="ec-grid">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            layoutId={`card-${card.title}-${id}`}
            className="ec-tile"
            onClick={() => setActive(card)}
            whileTap={{ scale: 0.98 }}
          >
            {/* image */}
            <motion.div
              layoutId={`img-${card.title}-${id}`}
              className="ec-img-wrap"
            >
              <Image src={card.src} alt={card.title} width={320} height={220} />
            </motion.div>

            {/* body */}
            <div className="ec-body">
              <div className="ec-tag">{card.tag}</div>
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="ec-title"
              >
                {card.title}
              </motion.h3>
              <div className="ec-hint">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                Click to learn more
              </div>
              {/* hover arrow */}
              <span className="ec-arrow">
                <svg
                  width="14"
                  height="14"
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
          </motion.div>
        ))}
      </div>
    </>
  );
}
