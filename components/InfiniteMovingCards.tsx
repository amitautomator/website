"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const cardStyles = `
  @keyframes scroll-cards {
    to { transform: translateX(-50%); }
  }

  .imc-container {
    position: relative;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(to right, transparent, #fff 12%, #fff 88%, transparent);
    mask-image: linear-gradient(to right, transparent, #fff 12%, #fff 88%, transparent);
  }

  .imc-track {
    display: flex;
    width: max-content;
    min-width: 100%;
    flex-wrap: nowrap;
    gap: 1.25rem;
    padding: 1rem 0 1.5rem;
    animation: scroll-cards var(--imc-duration, 80s) linear infinite;
    animation-direction: var(--imc-direction, forwards);
  }
  .imc-track.paused:hover { animation-play-state: paused; }

  /* ── Card — mirrors homepage .step-card style ── */
  .imc-card {
    position: relative;
    flex-shrink: 0;
    width: 380px;
    max-width: 90vw;
    background: #ffffff;
    border: 1px solid #e9e7e1;
    border-radius: 14px;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(15,15,14,0.06), 0 1px 2px rgba(15,15,14,0.04);
    transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.28s cubic-bezier(0.22,1,0.36,1),
                border-color 0.28s;
    overflow: hidden;
    list-style: none;
  }
  .imc-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 48px rgba(15,15,14,0.11), 0 4px 16px rgba(15,15,14,0.06);
    border-color: #e8390e;
  }

  /*
   * Decorative quote mark — DM Serif Display matches the display font used
   * across all headings. Italic style adds elegance consistent with
   * the .line-accent technique throughout the site.
   */
  .imc-quote-mark {
    position: absolute;
    top: 1.25rem;
    right: 1.75rem;
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: 5rem;
    font-style: italic;
    line-height: 1;
    font-weight: 400;
    color: rgba(232,57,14,0.07);
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.01em;
  }

  /* Stars */
  .imc-stars {
    display: flex;
    gap: 0.2rem;
    margin-bottom: 0.75rem;
  }
  .imc-star {
    color: #c98a06;
    font-size: 0.75rem;
  }

  /* Quote text — DM Sans body font, matches .section-body */
  .imc-quote {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.9rem;
    line-height: 1.85;
    color: #38372f;
    font-weight: 400;
    font-style: italic;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
    letter-spacing: 0.005em;
  }

  /* Divider */
  .imc-divider {
    width: 100%;
    height: 1px;
    background: #e9e7e1;
    margin-bottom: 1.25rem;
  }

  /* Author row */
  .imc-author {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    position: relative;
    z-index: 1;
  }

  /* Avatar */
  .imc-avatar-wrap {
    position: relative;
    flex-shrink: 0;
  }
  .imc-avatar {
    width: 44px !important;
    height: 44px !important;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 8px rgba(15,15,14,0.12);
    display: block;
  }
  .imc-avatar-ring {
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1.5px solid rgba(232,57,14,0.2);
    transition: border-color 0.25s, transform 0.25s;
  }
  .imc-card:hover .imc-avatar-ring {
    border-color: rgba(232,57,14,0.5);
    transform: scale(1.08);
  }

  /*
   * Author name — DM Serif Display at weight 400, matches .step-title and
   * .ab-member-name style across the site. No heavy Syne weight needed.
   */
  .imc-name {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: 0.95rem;
    font-weight: 400;
    color: #0f0f0e;
    line-height: 1.2;
    letter-spacing: -0.005em;
    transition: color 0.2s;
  }
  .imc-card:hover .imc-name { color: #e8390e; }

  /* Company — DM Sans body font, matches .ab-member-title scale */
  .imc-company {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.75rem;
    color: #7c7a72;
    font-weight: 400;
    margin-top: 0.15rem;
    letter-spacing: 0.01em;
  }
`;

const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current && !start) {
      // Clone items for seamless loop
      Array.from(scrollerRef.current.children).forEach((item) => {
        scrollerRef.current!.appendChild(item.cloneNode(true));
      });

      // Direction
      containerRef.current.style.setProperty(
        "--imc-direction",
        direction === "left" ? "forwards" : "reverse",
      );

      // Speed
      const durations = { fast: "20s", normal: "40s", slow: "80s" };
      containerRef.current.style.setProperty(
        "--imc-duration",
        durations[speed],
      );

      setStart(true);
    }
  }, [direction, speed, start]);

  return (
    <>
      <style>{cardStyles}</style>
      <div ref={containerRef} className={cn("imc-container", className)}>
        <ul
          ref={scrollerRef}
          className={cn("imc-track", pauseOnHover && "paused")}
          style={
            start
              ? {
                  animation: `scroll-cards var(--imc-duration, 80s) linear infinite`,
                  animationDirection:
                    direction === "left" ? "normal" : "reverse",
                }
              : {}
          }
        >
          {items.map((item) => (
            <li className="imc-card" key={item.name}>
              {/* Decorative big quote mark */}
              <span className="imc-quote-mark" aria-hidden="true">
                "
              </span>

              {/* Stars */}
              <div className="imc-stars" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="imc-star">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="imc-quote">"{item.quote}"</p>

              {/* Divider */}
              <div className="imc-divider" />

              {/* Author */}
              <div className="imc-author">
                <div className="imc-avatar-wrap">
                  <Image
                    src={item.image}
                    alt={`${item.name} profile`}
                    width={44}
                    height={44}
                    className="imc-avatar"
                    priority
                  />
                  <div className="imc-avatar-ring" aria-hidden="true" />
                </div>
                <div>
                  <div className="imc-name">{item.name}</div>
                  <div className="imc-company">{item.title}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default InfiniteMovingCards;
