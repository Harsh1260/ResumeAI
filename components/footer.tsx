"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Github, Twitter, Linkedin, Mail, Heart, ArrowUp, Zap, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function Footer() {
  const [currentYear] = useState(new Date().getFullYear())
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    })

    setEmail("")
    setIsSubscribing(false)
  }

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Templates", href: "#templates" },
        { name: "Pricing", href: "#pricing" },
        { name: "API", href: "#api" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Careers", href: "#careers" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#help" },
        { name: "Status", href: "https://status.resumeai.com", external: true },
        { name: "Privacy", href: "#privacy" },
        { name: "Terms", href: "#terms" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/resumeai", label: "Twitter", color: "hover:text-blue-400" },
    {
      icon: Github,
      href: "https://github.com/resumeai",
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    { icon: Linkedin, href: "https://linkedin.com/company/resumeai", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Mail, href: "mailto:hello@resumeai.com", label: "Email", color: "hover:text-green-600" },
  ]

  const stats = [
    { value: "50K+", label: "Resumes" },
    { value: "95%", label: "Success Rate" },
    { value: "150+", label: "Countries" },
    { value: "4.9/5", label: "Rating" },
  ]

  return (
    <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-subtle w-10 h-10 sm:w-12 sm:h-12"
        >
          <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </Button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Main Footer Content */}
        <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 group">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              AI-powered resume builder that helps you create professional resumes and land your dream job.
            </p>

            {/* Social Links */}
            <div className="flex space-x-2 sm:space-x-3">
              {socialLinks.map((social, index) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className={`transition-all duration-300 hover:scale-110 ${social.color} w-6 h-6 sm:w-8 sm:h-8`}
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Sections - Mobile: 3 columns, Desktop: separate columns */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8">
            {footerLinks.map((section, sectionIndex) => (
              <div key={section.title} className="space-y-2 sm:space-y-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm">{section.title}</h3>
                <ul className="space-y-1 sm:space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : "_self"}
                        rel={link.external ? "noopener noreferrer" : ""}
                        className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 inline-flex items-center group"
                      >
                        {link.name}
                        {link.external && (
                          <ExternalLink className="h-2 w-2 sm:h-3 sm:w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 sm:p-6 mb-4 sm:mb-8">
          <div className="max-w-md mx-auto text-center space-y-2 sm:space-y-4">
            <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">Stay Updated</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Get resume tips and career advice delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-8 sm:h-9 text-sm"
                required
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-8 sm:h-9 text-xs sm:text-sm px-3 sm:px-4"
              >
                {isSubscribing ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-2 sm:p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105"
            >
              <div className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-3 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center text-center sm:text-center">
              © {currentYear} ResumeAI | All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}