"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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

  useEffect(() => {
    addAnimation();
  });

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item) => (
          <li
            className="group relative w-[380px] max-w-full shrink-0 rounded-3xl border border-gray-200/50 bg-white/80 px-8 py-8 shadow-lg backdrop-blur-sm transition-all duration-300 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-blue-50/50 before:via-transparent before:to-purple-50/30 before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-1 hover:shadow-2xl hover:before:opacity-100 md:w-[420px]"
            key={item.name}
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            {/* Quote icon */}
            <div className="absolute top-6 right-6 text-blue-200 transition-colors duration-300 group-hover:text-blue-300">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="opacity-50"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
              </svg>
            </div>

            <blockquote className="relative z-10">
              <div className="mb-6">
                <span className="relative z-20 text-base leading-relaxed font-medium text-gray-800 italic">
                  {`"${item.quote}"`}
                </span>
              </div>

              <div className="relative z-20 flex flex-row items-center gap-4 border-t border-gray-100 pt-4">
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={`${item.name} profile`}
                    width={56}
                    height={56}
                    priority={true}
                    className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Ring animation */}
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/50"></div>
                </div>

                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                    {item.name}
                  </span>
                  <span className="text-sm font-medium text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                    {item.title}
                  </span>
                </div>
              </div>
            </blockquote>

            {/* Animated border */}
            <div className="absolute inset-0 -z-20 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
