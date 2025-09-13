"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "group text-card-foreground relative flex flex-col gap-6 rounded-2xl border border-gray-200/60 bg-white py-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300/80 hover:shadow-2xl",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header relative z-10 grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        // Enhanced border styling
        "[.border-b]:border-gradient-to-r [.border-b]:from-gray-200 [.border-b]:to-gray-100",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "relative z-10 text-lg leading-tight font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-800",
        // Subtle text shadow on hover
        "group-hover:drop-shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "relative z-10 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700",
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "relative z-10 col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        // Enhanced action area with hover effects
        "transition-transform duration-200 group-hover:scale-105",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "relative z-10 flex-1 px-6",
        // Smooth content transitions
        "transition-all duration-300 group-hover:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "relative z-10 flex items-center gap-4 px-8 group-hover:px-6 [.border-t]:pt-8",
        // Enhanced border and spacing
        "[.border-t]:mt-3 [.border-t]:border-gray-300/60 group-hover:[.border-t]:border-gray-400",
        // Footer hover effects with bounce
        "transition-all duration-500 group-hover:translate-y-1 group-hover:transform",
        className,
      )}
      {...props}
    />
  );
}

// Bonus: Enhanced card variants for different use cases
function CardGradient({
  className,
  variant = "blue",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "blue" | "purple" | "green" | "orange";
}) {
  const gradients = {
    blue: "from-blue-500/10 via-cyan-500/10 to-blue-600/10",
    purple: "from-purple-500/10 via-pink-500/10 to-purple-600/10",
    green: "from-green-500/10 via-emerald-500/10 to-green-600/10",
    orange: "from-orange-500/10 via-red-500/10 to-orange-600/10",
  };

  return (
    <div
      data-slot="card-gradient"
      className={cn(
        "group text-card-foreground relative flex flex-col gap-6 rounded-2xl border border-white/20 bg-gradient-to-br py-6 shadow-xl backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
        gradients[variant],
        // Animated border
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/20 before:via-white/10 before:to-white/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        // Glow effect
        "after:absolute after:inset-0 after:-z-10 after:rounded-2xl after:bg-gradient-to-r after:from-current/20 after:to-transparent after:opacity-0 after:blur-xl after:transition-opacity after:duration-500 hover:after:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

function CardGlass({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-glass"
      className={cn(
        "group text-card-foreground hover:shadow-3xl relative flex flex-col gap-6 rounded-3xl border border-white/20 bg-white/10 py-6 shadow-2xl backdrop-blur-lg transition-all duration-500 hover:-translate-y-1",
        // Glassmorphism effects
        "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        // Subtle inner shadow
        "after:pointer-events-none after:absolute after:inset-px after:rounded-3xl after:bg-gradient-to-b after:from-white/10 after:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

function CardFloating({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-floating"
      className={cn(
        "group text-card-foreground relative flex flex-col gap-6 rounded-2xl bg-white py-6 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl",
        // No border for floating effect
        "border-0",
        // Enhanced floating shadow
        "hover:shadow-blue-500/25",
        // Subtle background animation
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-blue-50 before:via-transparent before:to-purple-50 before:opacity-0 before:transition-all before:duration-500 hover:before:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  // Enhanced variants
  CardGradient,
  CardGlass,
  CardFloating,
};
