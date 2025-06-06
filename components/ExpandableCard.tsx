"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

import Image from "next/image";

export default function ExpandableCard() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null,
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[600px] flex-col overflow-hidden bg-white sm:rounded-3xl md:h-fit md:max-h-[90%]"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="h-fit w-full object-contain object-cover sm:rounded-tl-lg sm:rounded-tr-lg"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between px-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-base font-medium font-semibold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-base text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  {/* <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="rounded-full bg-green-500 px-4 py-3 text-sm font-bold text-white"
                  >
                    {active.ctaText}
                  </motion.a> */}
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:h-fit md:text-sm lg:text-base dark:text-neutral-400"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto grid max-w-7xl grid-cols-1 place-items-center items-center gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="flex cursor-pointer flex-col rounded-xl p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <div className="flex h-fit w-auto flex-col gap-4 shadow-2xl shadow-neutral-200">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex flex-col items-center justify-center">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="px-3 text-center text-base font-medium font-semibold text-neutral-800 md:text-left dark:text-neutral-200"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-center text-base text-neutral-600 md:text-left dark:text-neutral-400"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "",
    title: "Boost Communication with WhatsApp-Email Integration",
    src: "./C1.svg",
    content: () => {
      return (
        <ul>
          <li>
            <strong>Faster Responses:</strong> Get instant alerts on mobile for
            quicker replies.
          </li>
          <li>
            <strong>Better Team Collaboration:</strong> Easily share files,
            images, and links for real-time teamwork.
          </li>
          <li>
            <strong>All-in-One Communication:</strong> Track key messages in one
            place—no more lost info.
          </li>
          <li>
            <strong>Higher Engagement:</strong> WhatsApp’s casual style boosts
            open and inclusive chats.
          </li>
        </ul>
      );
    },
  },
  {
    description: "",
    title: "Custom CRM Solutions Built Around Your Business",
    src: "./C2.svg",
    content: () => {
      return (
        <ul>
          <li>
            <strong>Tailored to Fit:</strong> CRM features designed to match
            your unique workflows.
          </li>
          <li>
            <strong>Scalable Growth:</strong> Adaptable systems that grow with
            your business.
          </li>
          <li>
            <strong>Better Customer Insights:</strong> Track interactions,
            sales, and support in one place.
          </li>
          <li>
            <strong>Boost Productivity:</strong> Automate tasks and streamline
            daily operations.
          </li>
        </ul>
      );
    },
  },
  {
    description: "",
    title: "Empower Your Business with Tailored Solutions and Automation",
    src: "./C3.svg",
    content: () => {
      return (
        <ul>
          <li>
            <strong>Cost Reduction:</strong> Automation minimizes labor costs
            and reduces the likelihood of human error, leading to significant
            savings.
          </li>
          <li>
            <strong>Improved Productivity:</strong> By automating repetitive
            tasks, employees can focus on higher-value activities that drive
            innovation and growth.
          </li>
          <li>
            <strong>Data-Driven Decision Making:</strong> Automation tools can
            analyze vast amounts of data quickly, providing insights that inform
            strategic decisions.
          </li>
          <li>
            <strong>Enhanced Compliance:</strong> Automated systems help ensure
            adherence to regulations and standards, reducing the risk of
            non-compliance.
          </li>
        </ul>
      );
    },
  },
];
