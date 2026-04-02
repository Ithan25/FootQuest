"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [animating, setAnimating] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-9 w-9" />
  }

  const handleToggle = () => {
    setAnimating(true)
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
    setTimeout(() => setAnimating(false), 500)
  }

  return (
    <button
      onClick={handleToggle}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-lg transition-colors duration-500 hover:bg-slate-200 dark:hover:bg-white/10 overflow-hidden"
      aria-label="Toggle theme"
    >
      <span
        className={`inline-flex transition-transform duration-500 ease-out ${animating ? "rotate-[360deg] scale-110" : "rotate-0 scale-100"}`}
      >
        {resolvedTheme === "dark" ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-indigo-500" />}
      </span>
    </button>
  )
}
