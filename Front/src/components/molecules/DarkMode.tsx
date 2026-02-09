import { useEffect, useState } from "react";
import { Switch } from "@heroui/switch";

import { MoonIcon, SunIcon } from "../atoms/Icons";

export function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <Switch
      color="primary"
      isSelected={isDark}
      size="lg"
      thumbIcon={({ isSelected }) => (isSelected ? <MoonIcon /> : <SunIcon />)}
      onValueChange={setIsDark}
    />
  );
}
