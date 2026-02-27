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

  /* ── Card ── */
  .imc-card {
    position: relative;
    flex-shrink: 0;
    width: 380px;
    max-width: 90vw;
    background: var(--white, #fff);
    border: 1px solid var(--border, #e8e6e0);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 1px 4px rgba(17,17,16,0.06);
    transition: transform 0.25s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.25s cubic-bezier(0.22,1,0.36,1),
                border-color 0.25s;
    overflow: hidden;
  }
  .imc-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 48px rgba(17,17,16,0.1), 0 4px 16px rgba(17,17,16,0.06);
    border-color: var(--border2, #d4d0c8);
  }

  /* decorative quote mark */
  .imc-quote-mark {
    position: absolute;
    top: 1.5rem;
    right: 1.75rem;
    font-family: 'Syne', Georgia, serif;
    font-size: 5rem;
    line-height: 1;
    font-weight: 800;
    color: rgba(232,57,14,0.07);
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.05em;
  }

  /* quote text */
  .imc-quote {
    font-size: 0.9rem;
    line-height: 1.75;
    color: var(--ink2, #3a3935);
    font-weight: 400;
    font-style: italic;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }

  /* divider */
  .imc-divider {
    width: 100%;
    height: 1px;
    background: var(--border, #e8e6e0);
    margin-bottom: 1.25rem;
  }

  /* author row */
  .imc-author {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    position: relative;
    z-index: 1;
  }

  /* avatar */
  .imc-avatar-wrap {
    position: relative;
    flex-shrink: 0;
  }
  .imc-avatar {
    width: 44px !important;
    height: 44px !important;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--white, #fff);
    box-shadow: 0 2px 8px rgba(17,17,16,0.12);
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

  /* name & title */
  .imc-name {
    font-family: 'Syne', sans-serif;
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--ink, #111110);
    line-height: 1.2;
    transition: color 0.2s;
  }
  .imc-card:hover .imc-name { color: var(--accent, #e8390e); }

  .imc-company {
    font-size: 0.76rem;
    color: var(--muted, #7a7870);
    font-weight: 400;
    margin-top: 0.15rem;
    letter-spacing: 0.01em;
  }

  /* star row */
  .imc-stars {
    display: flex;
    gap: 0.2rem;
    margin-bottom: 0.75rem;
  }
  .imc-star {
    color: var(--gold, #d4960a);
    font-size: 0.75rem;
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
      // clone items for seamless loop
      Array.from(scrollerRef.current.children).forEach((item) => {
        scrollerRef.current!.appendChild(item.cloneNode(true));
      });

      // direction
      containerRef.current.style.setProperty(
        "--imc-direction",
        direction === "left" ? "forwards" : "reverse",
      );

      // speed
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
          className={cn(
            "imc-track",
            start &&
              "animate-[scroll-cards_var(--imc-duration,80s)_linear_infinite]",
            pauseOnHover && "paused",
          )}
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
              {/* decorative big quote mark */}
              <span className="imc-quote-mark" aria-hidden="true">
                "
              </span>

              {/* stars */}
              <div className="imc-stars" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="imc-star">
                    ★
                  </span>
                ))}
              </div>

              {/* quote */}
              <p className="imc-quote">"{item.quote}"</p>

              {/* divider */}
              <div className="imc-divider" />

              {/* author */}
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
