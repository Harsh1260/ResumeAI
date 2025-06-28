"use client"

import React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Upload,
  Brain,
  Target,
  Download,
  CheckCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Star,
  Play,
  Users,
  Clock,
  Shield,
  Award,
  Rocket,
  Heart,
} from "lucide-react"

interface Feature {
  id: string
  icon: React.ComponentType<any>
  title: string
  subtitle: string
  description: string
  highlights: string[]
  color: string
  bgGradient: string
  accentColor: string
  stats: { value: string; label: string; icon: React.ComponentType<any> }
  testimonial: { text: string; author: string; role: string }
}

export function ScrollingFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoRotateRef = useRef<NodeJS.Timeout>()
  const transitionTimeoutRef = useRef<NodeJS.Timeout>()

  const features: Feature[] = [
    {
      id: "smart-upload",
      icon: Upload,
      title: "Smart Upload",
      subtitle: "Instant Resume Parsing",
      description:
        "Drop your resume and watch our AI instantly extract and organize every detail with perfect accuracy. No manual typing required.",
      highlights: ["PDF & DOCX Support", "99.9% Accuracy", "Instant Processing", "50+ Languages"],
      color: "text-blue-600",
      bgGradient: "from-blue-500 via-cyan-500 to-teal-500",
      accentColor: "bg-blue-500",
      stats: { value: "99.9%", label: "Accuracy Rate", icon: Target },
      testimonial: {
        text: "Saved me hours of retyping. The accuracy is incredible!",
        author: "Sarah Chen",
        role: "Software Engineer",
      },
    },
    {
      id: "ai-enhancement",
      icon: Brain,
      title: "AI Enhancement",
      subtitle: "Professional Content Optimization",
      description:
        "Transform your resume with GPT-4 powered suggestions that make your experience shine and grab recruiter attention.",
      highlights: ["GPT-4 Powered", "Industry Insights", "Tone Optimization", "Impact Metrics"],
      color: "text-purple-600",
      bgGradient: "from-purple-500 via-pink-500 to-rose-500",
      accentColor: "bg-purple-500",
      stats: { value: "3x", label: "More Interviews", icon: TrendingUp },
      testimonial: {
        text: "My interview rate tripled after using the AI enhancement!",
        author: "Marcus Johnson",
        role: "Product Manager",
      },
    },
    {
      id: "ats-optimization",
      icon: Shield,
      title: "ATS Optimization",
      subtitle: "Beat The Bots",
      description:
        "Ensure your resume passes through Applicant Tracking Systems with our real-time optimization and keyword analysis.",
      highlights: ["Real-time Scoring", "Keyword Optimization", "Format Compliance", "Industry Database"],
      color: "text-green-600",
      bgGradient: "from-green-500 via-emerald-500 to-teal-500",
      accentColor: "bg-green-500",
      stats: { value: "95%", label: "ATS Pass Rate", icon: Shield },
      testimonial: {
        text: "Finally got past the ATS filters and landed my dream job!",
        author: "Emily Rodriguez",
        role: "Marketing Director",
      },
    },
    {
      id: "templates",
      icon: Award,
      title: "Premium Templates",
      subtitle: "Designer-Quality Layouts",
      description:
        "Choose from our collection of stunning, professionally designed templates that make you stand out from the crowd.",
      highlights: ["25+ Templates", "Industry-Specific", "Fully Customizable", "Print-Ready"],
      color: "text-orange-600",
      bgGradient: "from-orange-500 via-red-500 to-pink-500",
      accentColor: "bg-orange-500",
      stats: { value: "25+", label: "Templates", icon: Award },
      testimonial: {
        text: "The templates are absolutely gorgeous and professional!",
        author: "David Kim",
        role: "UX Designer",
      },
    },
    {
      id: "real-time",
      icon: Rocket,
      title: "Real-Time Editor",
      subtitle: "Live Preview & Collaboration",
      description:
        "Edit with confidence using our lightning-fast editor with instant preview, auto-save, and team collaboration features.",
      highlights: ["Live Preview", "Auto-Save", "Version History", "Team Sharing"],
      color: "text-indigo-600",
      bgGradient: "from-indigo-500 via-purple-500 to-blue-500",
      accentColor: "bg-indigo-500",
      stats: { value: "Real-time", label: "Updates", icon: Rocket },
      testimonial: {
        text: "The real-time editing is so smooth and intuitive!",
        author: "Lisa Wang",
        role: "Data Scientist",
      },
    },
    {
      id: "export",
      icon: Download,
      title: "Smart Export",
      subtitle: "Multiple Formats & Platforms",
      description:
        "Download your perfect resume in any format you need - from high-res PDFs to editable documents and web-ready formats.",
      highlights: ["HD PDF Export", "Editable DOCX", "Web Formats", "Print Optimized"],
      color: "text-teal-600",
      bgGradient: "from-teal-500 via-cyan-500 to-blue-500",
      accentColor: "bg-teal-500",
      stats: { value: "5+", label: "Export Formats", icon: Download },
      testimonial: {
        text: "Perfect formatting across all platforms and devices!",
        author: "Alex Thompson",
        role: "Business Analyst",
      },
    },
  ]

  // Mouse tracking for parallax effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })
    }
  }, [])

  // Visibility observer with smooth entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
      containerRef.current.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      observer.disconnect()
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [handleMouseMove])

  // Smooth auto-rotation with pause on interaction
  useEffect(() => {
    if (!isVisible || !isAutoRotating) return

    const startAutoRotate = () => {
      autoRotateRef.current = setTimeout(() => {
        if (isAutoRotating && !isTransitioning) {
          setActiveFeature((prev) => (prev + 1) % features.length)
        }
        startAutoRotate()
      }, 5000)
    }

    startAutoRotate()

    return () => {
      if (autoRotateRef.current) {
        clearTimeout(autoRotateRef.current)
      }
    }
  }, [isVisible, isAutoRotating, isTransitioning, features.length])

  // Smooth feature transition with overlap prevention
  const handleFeatureClick = useCallback(
    (index: number) => {
      if (isTransitioning || index === activeFeature) return

      setIsTransitioning(true)
      setIsAutoRotating(false)
      setActiveFeature(index)

      // Clear existing timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }

      // Reset transition state and auto-rotation
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false)
        setIsAutoRotating(true)
      }, 800)
    },
    [activeFeature, isTransitioning],
  )

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (autoRotateRef.current) clearTimeout(autoRotateRef.current)
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
    }
  }, [])

  return (
    <section
      className={`py-20 sm:py-24 lg:py-32 relative overflow-hidden transition-all duration-1000 ease-out top-5 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      id="features"
      ref={containerRef}
    >
      {/* Enhanced Background with smooth parallax */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30 transition-all duration-1000 ease-out" />

        {/* Animated Orbs with mouse parallax */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            top: `${20 + mousePosition.y * 5}%`,
            left: `${20 + mousePosition.x * 5}%`,
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(${1 + mousePosition.y * 0.1})`,
          }}
        />
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl transition-all duration-1200 ease-out"
          style={{
            bottom: `${20 + mousePosition.y * 3}%`,
            right: `${20 + mousePosition.x * 3}%`,
            transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px) scale(${1 + mousePosition.x * 0.1})`,
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-green-400/15 to-teal-400/15 rounded-full blur-2xl transition-all duration-800 ease-out"
          style={{
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-40 dark:opacity-20" />

        {/* Floating Elements with smooth animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute bg-gradient-to-r ${features[activeFeature].bgGradient} rounded-full opacity-30 transition-all duration-1000 ease-out`}
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `translate(${Math.sin(Date.now() * 0.001 + i) * 20}px, ${Math.cos(Date.now() * 0.001 + i) * 20}px) scale(${0.8 + Math.sin(Date.now() * 0.002 + i) * 0.4})`,
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Section Header with staggered animations */}
      <div
        className={`text-center space-y-8 mb-20 px-4 sm:px-6 relative z-10 transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <div className="relative inline-block">
          <Badge
            variant="outline"
            className="px-8 py-4 text-lg font-bold bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-2 border-blue-200/50 dark:border-blue-800/50 hover:scale-105 transition-all duration-500 ease-out shadow-xl hover:shadow-2xl"
          >
            <Sparkles className="w-5 h-5 mr-3 text-blue-600 animate-spin" style={{ animationDuration: "3s" }} />
            Powerful Features
            <Star className="w-5 h-5 ml-3 text-yellow-500 animate-pulse" style={{ animationDuration: "2s" }} />
          </Badge>
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-60 animate-pulse" />
        </div>

        {/* Stats Bar with smooth entrance */}
        <div className="flex flex-wrap justify-center gap-8 pt-8">
          {[
            { icon: Users, value: "50K+", label: "Happy Users" },
            { icon: Clock, value: "2 min", label: "Setup Time" },
            { icon: TrendingUp, value: "300%", label: "More Interviews" },
            { icon: Heart, value: "4.9/5", label: "User Rating" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center group cursor-pointer transition-all duration-700 ease-out hover:scale-110 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150 + 600}ms` }}
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <stat.icon className="w-5 h-5 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                <span className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Feature Navigation with smooth transitions */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isActive = activeFeature === index
            return (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(index)}
                disabled={isTransitioning}
                className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-500 ease-out hover:scale-105 disabled:cursor-not-allowed ${
                  isActive
                    ? `bg-gradient-to-r ${feature.bgGradient} text-white shadow-2xl scale-105`
                    : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl"
                } ${isTransitioning ? "pointer-events-none" : ""}`}
              >
                <div className="flex items-center space-x-2 transition-all duration-300 ease-out">
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
                  <span className="hidden sm:inline">{feature.title}</span>
                  <span className="sm:hidden">{feature.title.split(" ")[0]}</span>
                </div>
                {isActive && (
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${feature.bgGradient} rounded-2xl blur opacity-30 animate-pulse`}
                    style={{ animationDuration: "2s" }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Active Feature Display with smooth content transitions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Feature Content */}
          <div
            className={`space-y-8 transition-all duration-800 ease-out ${
              isTransitioning ? "opacity-80 translate-x-4" : "opacity-100 translate-x-0"
            } ${isVisible ? "translate-y-0" : "translate-y-12"}`}
            style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
          >
            {/* Feature Header with smooth icon transition */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${features[activeFeature].bgGradient} rounded-2xl flex items-center justify-center shadow-xl transition-all duration-700 ease-out`}
                  style={{
                    transform: isTransitioning ? "scale(0.9) rotate(10deg)" : "scale(1) rotate(0deg)",
                    boxShadow: `0 20px 40px ${features[activeFeature].bgGradient.includes("blue") ? "rgba(59, 130, 246, 0.3)" : features[activeFeature].bgGradient.includes("purple") ? "rgba(147, 51, 234, 0.3)" : "rgba(34, 197, 94, 0.3)"}`,
                  }}
                >
                  {React.createElement(features[activeFeature].icon, {
                    className: `w-8 h-8 text-white transition-transform duration-500 ease-out ${isTransitioning ? "scale-90" : "scale-100"}`,
                  })}
                </div>
                <div className={`transition-all duration-600 ease-out ${isTransitioning ? "translate-x-2" : ""}`}>
                  <h3 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white transition-all duration-500">
                    {features[activeFeature].title}
                  </h3>
                  <p
                    className={`text-lg font-semibold ${features[activeFeature].color} transition-colors duration-500`}
                  >
                    {features[activeFeature].subtitle}
                  </p>
                </div>
              </div>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-600 ease-out">
                {features[activeFeature].description}
              </p>
            </div>

            {/* Feature Highlights with staggered animations */}
            <div className="grid grid-cols-2 gap-4">
              {features[activeFeature].highlights.map((highlight, index) => (
                <div
                  key={highlight}
                  className={`flex items-center space-x-3 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-500 ease-out hover:shadow-lg ${
                    isTransitioning ? "translate-y-2 opacity-80" : "translate-y-0 opacity-100"
                  }`}
                  style={{ transitionDelay: `${index * 100 + (isTransitioning ? 0 : 200)}ms` }}
                >
                  <div
                    className={`w-2 h-2 bg-gradient-to-r ${features[activeFeature].bgGradient} rounded-full transition-all duration-500`}
                  />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Stats & Testimonial with smooth transitions */}
            <div className="space-y-6">
              {/* Stat */}
              <div
                className={`flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-700 ease-out hover:shadow-xl ${
                  isTransitioning ? "scale-98 opacity-90" : "scale-100 opacity-100"
                }`}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${features[activeFeature].bgGradient} rounded-xl flex items-center justify-center transition-all duration-500 ease-out`}
                >
                  {React.createElement(features[activeFeature].stats.icon, {
                    className: "w-6 h-6 text-white",
                  })}
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900 dark:text-white transition-all duration-500">
                    {features[activeFeature].stats.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {features[activeFeature].stats.label}
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div
                className={`p-6 rounded-2xl bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-700 ease-out hover:shadow-xl ${
                  isTransitioning ? "scale-98 opacity-90" : "scale-100 opacity-100"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${features[activeFeature].bgGradient} rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-500 ease-out`}
                  >
                    {features[activeFeature].testimonial.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 italic mb-2 transition-all duration-500">
                      "{features[activeFeature].testimonial.text}"
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white transition-all duration-500">
                        {features[activeFeature].testimonial.author}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 transition-all duration-500">
                        {features[activeFeature].testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button with enhanced hover effects */}
            <Button
              className={`group bg-gradient-to-r ${features[activeFeature].bgGradient} hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 text-white font-bold px-8 py-4 text-lg rounded-2xl relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              <Play className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Try This Feature
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right Side - Interactive Visual with smooth animations */}
          <div
            className={`relative transition-all duration-800 ease-out ${
              isTransitioning ? "opacity-90 scale-98" : "opacity-100 scale-100"
            } ${isVisible ? "translate-y-0" : "translate-y-12"}`}
            style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
          >
            <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-3xl overflow-hidden rounded-3xl transition-all duration-700 ease-out hover:shadow-4xl">
              <CardContent className="p-0">
                {/* Main Visual Area */}
                <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                  {/* Dynamic Background with smooth color transitions */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${features[activeFeature].bgGradient} opacity-20 transition-all duration-1000 ease-out`}
                  />

                  {/* Animated Particles with physics-based movement */}
                  <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute bg-gradient-to-r ${features[activeFeature].bgGradient} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: `${4 + (i % 4) * 2}px`,
                          height: `${4 + (i % 4) * 2}px`,
                          top: `${10 + i * 4}%`,
                          left: `${5 + i * 4.5}%`,
                          opacity: 0.4,
                          transform: `
                            translate(${Math.sin(Date.now() * 0.001 + i) * 15}px, ${Math.cos(Date.now() * 0.001 + i) * 15}px)
                            scale(${0.8 + Math.sin(Date.now() * 0.002 + i) * 0.3})
                            rotate(${(Date.now() * 0.05 + i * 18) % 360}deg)
                          `,
                          animationDelay: `${i * 100}ms`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Central Feature Icon with enhanced animations */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-8">
                      {/* Large Icon with smooth scaling */}
                      <div
                        className={`w-32 h-32 bg-gradient-to-r ${features[activeFeature].bgGradient} rounded-full flex items-center justify-center mx-auto shadow-4xl relative overflow-hidden transition-all duration-800 ease-out`}
                        style={{
                          transform: isTransitioning ? "scale(0.9) rotate(15deg)" : "scale(1) rotate(0deg)",
                          boxShadow: `0 25px 50px ${features[activeFeature].bgGradient.includes("blue") ? "rgba(59, 130, 246, 0.4)" : features[activeFeature].bgGradient.includes("purple") ? "rgba(147, 51, 234, 0.4)" : "rgba(34, 197, 94, 0.4)"}`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        {React.createElement(features[activeFeature].icon, {
                          className: `w-16 h-16 text-white relative z-10 transition-transform duration-600 ease-out ${isTransitioning ? "scale-90" : "scale-100"}`,
                        })}
                        <div
                          className={`absolute inset-0 rounded-full bg-gradient-to-r ${features[activeFeature].bgGradient} opacity-30 animate-ping`}
                          style={{ animationDuration: "2s" }}
                        />
                      </div>

                      {/* Progress Bars with smooth width transitions */}
                      <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 bg-gradient-to-r ${features[activeFeature].bgGradient} rounded-full mx-auto transition-all duration-1000 ease-out relative overflow-hidden`}
                            style={{
                              width: `${40 + i * 15}%`,
                              opacity: 0.6 + i * 0.1,
                              transform: isTransitioning ? `scaleX(0.8)` : `scaleX(1)`,
                              transformOrigin: "left",
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Corner Elements with smooth positioning */}
                  <div
                    className="absolute top-6 left-6 transition-all duration-700 ease-out"
                    style={{
                      transform: isTransitioning ? "translate(-10px, -10px) scale(0.9)" : "translate(0, 0) scale(1)",
                    }}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${features[activeFeature].bgGradient} rounded-xl flex items-center justify-center shadow-lg transition-all duration-500`}
                    >
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div
                    className="absolute top-6 right-6 transition-all duration-700 ease-out"
                    style={{
                      transform: isTransitioning ? "translate(10px, -10px) scale(0.9)" : "translate(0, 0) scale(1)",
                    }}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${features[activeFeature].bgGradient} rounded-xl flex items-center justify-center shadow-lg transition-all duration-500`}
                    >
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Bottom Info with smooth content transitions */}
                  <div
                    className={`absolute bottom-6 left-6 right-6 transition-all duration-700 ease-out ${
                      isTransitioning ? "translate-y-4 opacity-80" : "translate-y-0 opacity-100"
                    }`}
                  >
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl transition-all duration-500 hover:shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white transition-all duration-500">
                            {features[activeFeature].title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-all duration-500">
                            {features[activeFeature].subtitle}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-lg text-sm font-bold text-white bg-gradient-to-r ${features[activeFeature].bgGradient} transition-all duration-500`}
                        >
                          {features[activeFeature].stats.value}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Section with smooth indicators */}
                <div className="p-6 bg-gradient-to-r from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-xl">
                  {/* Feature Dots with smooth transitions */}
                  <div className="flex justify-center space-x-3 mb-4">
                    {features.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleFeatureClick(idx)}
                        disabled={isTransitioning}
                        className={`relative w-3 h-3 rounded-full transition-all duration-500 ease-out hover:scale-125 disabled:cursor-not-allowed ${
                          idx === activeFeature
                            ? `bg-gradient-to-r ${features[activeFeature].bgGradient} scale-125 shadow-lg`
                            : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                        }`}
                      >
                        {idx === activeFeature && (
                          <div
                            className={`absolute inset-0 rounded-full bg-gradient-to-r ${features[activeFeature].bgGradient} animate-ping opacity-30`}
                            style={{ animationDuration: "2s" }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
