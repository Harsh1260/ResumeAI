"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/30 transition-all duration-1000" />

      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 opacity-60 dark:opacity-40">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-blob animation-delay-4000" />
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-blob animation-delay-6000" />
      </div>

      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <svg
          className="absolute top-10 left-10 w-20 h-20 text-blue-500 animate-spin-slow"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          className="absolute top-32 right-32 w-16 h-16 text-purple-500 animate-pulse"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <div className="absolute bottom-20 left-1/4 w-8 h-8 border-2 border-green-400 rotate-45 animate-bounce-subtle" />
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-orange-400 rounded-full animate-float" />
      </div>

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 dark:opacity-20" />

      {/* Radial Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/80 dark:to-slate-900/80" />
    </div>
  )
}
