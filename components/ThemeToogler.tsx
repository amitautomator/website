"use client";

import { useUIStore } from "@/stores/ui.store";

export default function ThemeToggle() {
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}
