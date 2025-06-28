"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Star, Play } from "lucide-react"
import { ScrollingFeatures } from "./scrolling-features"

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [isHovered, setIsHovered] = useState(false)

  const testimonials = [
    { name: "Sarah Johnson", role: "Software Engineer", text: "Got my dream job thanks to ResumeAI!", avatar: "SJ" },
    { name: "Mike Chen", role: "Product Manager", text: "The AI suggestions were incredibly helpful.", avatar: "MC" },
    { name: "Emily Davis", role: "Designer", text: "Beautiful interface and amazing results.", avatar: "ED" },
  ]

  const stats = [
    { value: "50K+", label: "Resumes Created", color: "text-blue-600" },
    { value: "95%", label: "Success Rate", color: "text-purple-600" },
    { value: "24/7", label: "AI Available", color: "text-green-600" },
  ]

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Main Hero */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <Badge
              variant="secondary"
              className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium animate-bounce-subtle"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin-slow" />
              AI-Powered Resume Builder
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight px-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Transform Your Career
              </span>
              <br />
              <span className="text-gray-900 dark:text-white animate-fade-in-up animation-delay-300">
                with AI-Powered Resumes
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-500 px-4">
              Create professional resumes that get you noticed. Our AI analyzes your content, optimizes for ATS systems,
              and helps you land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6 animate-fade-in-up animation-delay-700 px-4">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-pulse-glow w-full sm:w-auto"
                onClick={onGetStarted}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Building Free
                  <ArrowRight
                    className={`ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${isHovered ? "translate-x-2 scale-110" : ""}`}
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 bg-transparent hover:scale-105 hover:shadow-lg w-full sm:w-auto"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12 animate-fade-in-up animation-delay-1000 px-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center space-y-2 sm:space-y-3 group cursor-pointer">
                <div
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                <div
                  className={`w-8 sm:w-12 h-1 bg-gradient-to-r ${stat.color.includes("blue") ? "from-blue-600 to-purple-600" : stat.color.includes("purple") ? "from-purple-600 to-pink-600" : "from-green-600 to-emerald-600"} mx-auto rounded-full group-hover:w-12 sm:group-hover:w-16 transition-all duration-300`}
                />
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="pt-8 sm:pt-12 animate-fade-in-up animation-delay-1200 px-4">
            <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
              <div className="flex -space-x-1 sm:-space-x-2">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs sm:text-sm font-semibold border-2 border-white dark:border-gray-800"
                    style={{ zIndex: testimonials.length - index }}
                  >
                    {testimonial.avatar}
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                Trusted by 50,000+ professionals
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex justify-center space-x-1 mb-2 sm:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic mb-2 sm:mb-3">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Features Section */}
      <ScrollingFeatures />
    </div>
  )
}
