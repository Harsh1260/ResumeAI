"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import FileUpload from "@/components/file-upload"
import ResumeEditor from "@/components/resume-editor"
import { ResumeTemplates } from "@/components/resume-templates"
import { PricingPage } from "@/components/pricing-page"
import { Layout } from "@/components/layout"
import type { Resume } from "@/types/resume"
import { Toaster } from "@/components/ui/toaster"

type AppState = "hero" | "templates" | "pricing" | "upload" | "editor"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("hero")
  const [resume, setResume] = useState<Resume | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  const handleGetStarted = () => {
    setAppState("templates")
  }

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template)
    setAppState("upload")
  }

  const handleNavigate = (page: string) => {
    switch (page) {
      case "hero":
        setAppState("hero")
        setResume(null)
        setSelectedTemplate(null)
        break
      case "templates":
        setAppState("templates")
        break
      case "pricing":
        setAppState("pricing")
        break
      default:
        setAppState("hero")
    }
  }

  const handleResumeLoaded = (loadedResume: Resume) => {
    setResume(loadedResume)
    setAppState("editor")
  }

  const handleBackToHome = () => {
    setAppState("hero")
    setResume(null)
    setSelectedTemplate(null)
  }

  const handleBackToTemplates = () => {
    setAppState("templates")
  }

  const handleBackToUpload = () => {
    setAppState("upload")
  }

  if (appState === "hero") {
    return (
      <Layout onNavigate={handleNavigate}>
        <HeroSection onGetStarted={handleGetStarted} />
        <Toaster />
      </Layout>
    )
  }

  if (appState === "templates") {
    return (
      <Layout onNavigate={handleNavigate}>
        <div className="pt-20 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <ResumeTemplates onSelectTemplate={handleSelectTemplate} />
          </div>
        </div>
        <Toaster />
      </Layout>
    )
  }

  if (appState === "pricing") {
    return (
      <Layout onNavigate={handleNavigate}>
        <div className="pt-20 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <PricingPage />
          </div>
        </div>
        <Toaster />
      </Layout>
    )
  }

  if (appState === "upload") {
    return (
      <Layout showFooter={false} onNavigate={handleNavigate}>
        <FileUpload onResumeLoaded={handleResumeLoaded} onBack={handleBackToTemplates} />
        <Toaster />
      </Layout>
    )
  }

  if (appState === "editor" && resume) {
    return (
      <Layout showFooter={false} onNavigate={handleNavigate}>
        <ResumeEditor initialResume={resume} onBack={handleBackToUpload} />
        <Toaster />
      </Layout>
    )
  }

  return null
}
