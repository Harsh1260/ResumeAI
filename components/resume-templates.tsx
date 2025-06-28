"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Briefcase, Palette, Code, Heart } from "lucide-react"
import { TemplateSVG } from "./template-svg"

interface Template {
  id: string
  name: string
  category: "professional" | "creative" | "modern" | "minimal"
  templateType: "professional" | "modern" | "creative" | "minimal" | "tech" | "healthcare"
  description: string
  features: string[]
  popular?: boolean
  premium?: boolean
}

interface ResumeTemplatesProps {
  onSelectTemplate: (template: Template) => void
}

export function ResumeTemplates({ onSelectTemplate }: ResumeTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const templates: Template[] = [
    {
      id: "professional-classic",
      name: "Professional Classic",
      category: "professional",
      templateType: "professional",
      description: "Clean, traditional layout perfect for corporate roles",
      features: ["ATS-Friendly", "Clean Layout", "Professional Fonts", "Easy to Read"],
      popular: true,
    },
    {
      id: "modern-executive",
      name: "Modern Executive",
      category: "modern",
      templateType: "modern",
      description: "Contemporary design for senior-level positions",
      features: ["Executive Style", "Modern Typography", "Color Accents", "Leadership Focus"],
      premium: true,
    },
    {
      id: "creative-designer",
      name: "Creative Designer",
      category: "creative",
      templateType: "creative",
      description: "Vibrant template for creative professionals",
      features: ["Creative Layout", "Color Sections", "Portfolio Ready", "Visual Appeal"],
    },
    {
      id: "tech-developer",
      name: "Tech Developer",
      category: "professional",
      templateType: "tech",
      description: "Perfect for software developers and tech roles",
      features: ["Tech-Focused", "Skills Highlight", "Project Sections", "GitHub Integration"],
      popular: true,
    },
    {
      id: "minimal-clean",
      name: "Minimal Clean",
      category: "minimal",
      templateType: "minimal",
      description: "Simple, elegant design that focuses on content",
      features: ["Minimal Design", "Content Focus", "White Space", "Typography"],
    },
    {
      id: "healthcare-pro",
      name: "Healthcare Professional",
      category: "professional",
      templateType: "healthcare",
      description: "Specialized template for healthcare workers",
      features: ["Healthcare Focus", "Certification Sections", "Professional", "Trust Building"],
      premium: true,
    },
  ]

  const categories = [
    { id: "all", name: "All Templates", icon: Briefcase },
    { id: "professional", name: "Professional", icon: Briefcase },
    { id: "creative", name: "Creative", icon: Palette },
    { id: "modern", name: "Modern", icon: Code },
    { id: "minimal", name: "Minimal", icon: Heart },
  ]

  const filteredTemplates =
    selectedCategory === "all" ? templates : templates.filter((template) => template.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.id === category)
    return cat ? cat.icon : Briefcase
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Choose Your Template
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Select from our professionally designed templates. Each template is optimized for ATS systems and designed to
          make you stand out.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 px-4 sm:px-6">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-3 sm:px-4 py-2"
              size="sm"
            >
              <Icon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(" ")[0]}</span>
            </Button>
          )
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6">
        {filteredTemplates.map((template, index) => {
          const CategoryIcon = getCategoryIcon(template.category)
          return (
            <Card
              key={template.id}
              className="group relative overflow-hidden border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Badges */}
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 flex gap-1 sm:gap-2">
                {template.popular && (
                  <Badge className="bg-orange-500 hover:bg-orange-600 text-xs">
                    <Star className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                    <span className="hidden sm:inline">Popular</span>
                    <span className="sm:hidden">Pop</span>
                  </Badge>
                )}
                {template.premium && (
                  <Badge className="bg-purple-500 hover:bg-purple-600 text-xs">
                    <span className="hidden sm:inline">Premium</span>
                    <span className="sm:hidden">Pro</span>
                  </Badge>
                )}
              </div>

              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                <div className="group-hover:scale-110 transition-transform duration-500">
                  <TemplateSVG template={template.templateType} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Preview Button */}
                <Button
                  size="sm"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 text-gray-900 hover:bg-white text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
                >
                  Preview
                </Button>
              </div>

              <CardContent className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
                {/* Template Info */}
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                    <CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{template.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-1 sm:space-y-2">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {template.features.map((feature) => (
                      <div key={feature} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                        <Check className="h-2 w-2 sm:h-3 sm:w-3 mr-1 text-green-500 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Button */}
                <Button
                  onClick={() => onSelectTemplate(template)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-xs sm:text-sm py-2 sm:py-3"
                >
                  Use This Template
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
