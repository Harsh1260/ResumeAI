"use client"

import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { AnimatedBackground } from "./animated-background"

interface LayoutProps {
  children: React.ReactNode
  showFooter?: boolean
  onNavigate?: (page: string) => void
}

export function Layout({ children, showFooter = true, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header onNavigate={onNavigate} />
      <main className="flex-1 pt-16 sm:pt-20">{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}
