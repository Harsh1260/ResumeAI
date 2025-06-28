"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star, Zap, Crown, Sparkles } from "lucide-react"

interface PricingTier {
  id: string
  name: string
  price: number
  period: string
  description: string
  features: string[]
  limitations: string[]
  popular?: boolean
  icon: React.ComponentType<any>
  color: string
  buttonText: string
}

export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const pricingTiers: PricingTier[] = [
    {
      id: "free",
      name: "Free",
      price: 0,
      period: "forever",
      description: "Perfect for getting started with basic resume building",
      features: ["3 Resume templates", "Basic AI enhancement", "PDF export", "ATS optimization score", "Email support"],
      limitations: ["Limited to 2 resumes", "Basic templates only", "Standard support"],
      icon: Star,
      color: "from-gray-500 to-gray-600",
      buttonText: "Get Started Free",
    },
    {
      id: "pro",
      name: "Professional",
      price: isAnnual ? 9 : 12,
      period: isAnnual ? "month (billed annually)" : "month",
      description: "Ideal for job seekers who want professional results",
      features: [
        "15+ Premium templates",
        "Advanced AI enhancement",
        "Unlimited resumes",
        "Cover letter builder",
        "ATS optimization",
        "Priority support",
        "LinkedIn optimization",
        "Interview preparation tips",
      ],
      limitations: [],
      popular: true,
      icon: Zap,
      color: "from-blue-500 to-purple-600",
      buttonText: "Start Pro Trial",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: isAnnual ? 29 : 35,
      period: isAnnual ? "month (billed annually)" : "month",
      description: "For teams and organizations with advanced needs",
      features: [
        "Everything in Professional",
        "Team collaboration",
        "Custom branding",
        "API access",
        "Advanced analytics",
        "Dedicated account manager",
        "Custom templates",
        "White-label solution",
        "SSO integration",
      ],
      limitations: [],
      icon: Crown,
      color: "from-purple-600 to-pink-600",
      buttonText: "Contact Sales",
    },
  ]

  const features = [
    {
      category: "Templates & Design",
      items: [
        { name: "Basic templates", free: true, pro: true, enterprise: true },
        { name: "Premium templates", free: false, pro: true, enterprise: true },
        { name: "Custom templates", free: false, pro: false, enterprise: true },
        { name: "Custom branding", free: false, pro: false, enterprise: true },
      ],
    },
    {
      category: "AI & Optimization",
      items: [
        { name: "Basic AI enhancement", free: true, pro: true, enterprise: true },
        { name: "Advanced AI suggestions", free: false, pro: true, enterprise: true },
        { name: "ATS optimization", free: true, pro: true, enterprise: true },
        { name: "LinkedIn optimization", free: false, pro: true, enterprise: true },
      ],
    },
    {
      category: "Export & Sharing",
      items: [
        { name: "PDF export", free: true, pro: true, enterprise: true },
        { name: "Multiple formats", free: false, pro: true, enterprise: true },
        { name: "Team sharing", free: false, pro: false, enterprise: true },
        { name: "API access", free: false, pro: false, enterprise: true },
      ],
    },
    {
      category: "Support & Analytics",
      items: [
        { name: "Email support", free: true, pro: true, enterprise: true },
        { name: "Priority support", free: false, pro: true, enterprise: true },
        { name: "Phone support", free: false, pro: false, enterprise: true },
        { name: "Analytics dashboard", free: false, pro: false, enterprise: true },
      ],
    },
  ]

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 sm:space-y-6 px-4 sm:px-6">
        <Badge
          variant="outline"
          className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium animate-bounce-subtle"
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin-slow" />
          Choose Your Plan
        </Badge>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            Simple, Transparent
          </span>
          <br />
          <span className="text-gray-900 dark:text-white">Pricing</span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Choose the perfect plan for your career goals. All plans include our core features with no hidden fees.
        </p>

        {/* Annual Toggle */}
        <div className="flex items-center justify-center space-x-3 sm:space-x-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit mx-auto">
          <span
            className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-colors ${!isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
              isAnnual ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-colors ${isAnnual ? "text-gray-900 dark:text-white" : "text-gray-500"}`}
          >
            Annual
            <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">
              Save 25%
            </Badge>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-6">
        {pricingTiers.map((tier, index) => {
          const Icon = tier.icon
          return (
            <Card
              key={tier.id}
              className={`relative overflow-hidden border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up ${
                tier.popular ? "ring-2 ring-blue-500 scale-105" : ""
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-xs sm:text-sm font-medium">
                  Most Popular
                </div>
              )}

              <CardHeader
                className={`text-center space-y-3 sm:space-y-4 ${tier.popular ? "pt-10 sm:pt-12" : "pt-6 sm:pt-8"}`}
              >
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center`}
                >
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">{tier.description}</p>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">${tier.price}</span>
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 ml-2">/{tier.period}</span>
                  </div>
                  {isAnnual && tier.price > 0 && (
                    <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">
                      Save ${(tier.price / 0.75 - tier.price) * 12}/year
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                <Button
                  className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white transition-all duration-300 hover:scale-105 text-sm sm:text-base py-2 sm:py-3`}
                >
                  {tier.buttonText}
                </Button>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">
                      What's included:
                    </h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start text-xs sm:text-sm">
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm sm:text-base">
                        Limitations:
                      </h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {tier.limitations.map((limitation) => (
                          <li key={limitation} className="flex items-start text-xs sm:text-sm">
                            <X className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Feature Comparison Table - Hidden on mobile, shown on tablet+ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 hidden md:block">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white">
          Compare All Features
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="text-left p-3 sm:p-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  Features
                </th>
                <th className="text-center p-3 sm:p-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  Free
                </th>
                <th className="text-center p-3 sm:p-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  Professional
                </th>
                <th className="text-center p-3 sm:p-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((category) => (
                <>
                  <tr key={category.category} className="bg-gray-50 dark:bg-gray-800">
                    <td
                      colSpan={4}
                      className="p-3 sm:p-4 font-semibold text-gray-900 dark:text-white text-sm sm:text-base"
                    >
                      {category.category}
                    </td>
                  </tr>
                  {category.items.map((item) => (
                    <tr key={item.name} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="p-3 sm:p-4 text-gray-700 dark:text-gray-300 text-sm">{item.name}</td>
                      <td className="p-3 sm:p-4 text-center">
                        {item.free ? (
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 sm:p-4 text-center">
                        {item.pro ? (
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 sm:p-4 text-center">
                        {item.enterprise ? (
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
          {[
            {
              q: "Can I change plans anytime?",
              a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
            },
            {
              q: "Is there a free trial?",
              a: "Yes, Professional plan comes with a 14-day free trial. No credit card required.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Absolutely. You can cancel your subscription at any time with no cancellation fees.",
            },
          ].map((faq, index) => (
            <Card key={index} className="border-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
