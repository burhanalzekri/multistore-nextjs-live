"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(localStorage.getItem("ms-theme") === "dark");
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark-mode", next);
    localStorage.setItem("ms-theme", next ? "dark" : "light");
  }
  return (
    <button onClick={toggle} className="btn btn-soft" aria-label="تبديل المظهر">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
