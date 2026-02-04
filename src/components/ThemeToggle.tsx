// ThemeToggle.tsx
"use client";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <button onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
      Toggle {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
