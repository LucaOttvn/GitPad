"use client";
import {useTheme} from "next-themes";
import Icon from "./Icon";

export function ThemeToggle() {
  const {theme, setTheme, resolvedTheme} = useTheme();

  return (
    <button onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
      <Icon src={`/icons/${theme === "light" ? "lightMode" : "darkMode"}.svg`} width={30}/>
    </button>
  );
}
