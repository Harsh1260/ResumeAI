"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, XCircle, Target, TrendingUp, FileText } from "lucide-react"
import type { Resume } from "@/types/resume"

interface ATSOptimizationProps {
  resume: Resume
  onOptimize: (suggestions: ATSSuggestion[]) => void
}

interface ATSSuggestion {
  type: "keyword" | "format" | "section" | "length"
  severity: "high" | "medium" | "low"
  title: string
  description: string
  suggestion: string
  field?: string
}

interface ATSScore {
  overall: number
  keywords: number
  formatting: number
  sections: number
  length: number
}

export function ATSOptimization({ resume, onOptimize }: ATSOptimizationProps) {
  const [atsScore, setATSScore] = useState<ATSScore>({
    overall: 0,
    keywords: 0,
    formatting: 0,
    sections: 0,
    length: 0,
  })
  const [suggestions, setSuggestions] = useState<ATSSuggestion[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Common ATS keywords by industry
  const commonKeywords = {
    tech: ["JavaScript", "Python", "React", "Node.js", "AWS", "Docker", "Kubernetes", "Agile", "Scrum", "Git"],
    marketing: [
      "SEO",
      "SEM",
      "Google Analytics",
      "Social Media",
      "Content Marketing",
      "Email Marketing",
      "CRM",
      "Lead Generation",
    ],
    finance: [
      "Financial Analysis",
      "Excel",
      "SQL",
      "Risk Management",
      "Compliance",
      "Budgeting",
      "Forecasting",
      "Accounting",
    ],
    healthcare: [
      "Patient Care",
      "Medical Records",
      "HIPAA",
      "Clinical",
      "Healthcare",
      "Medical",
      "Treatment",
      "Diagnosis",
    ],
  }

  const analyzeATS = () => {
    setIsAnalyzing(true)

    setTimeout(() => {
      const newSuggestions: ATSSuggestion[] = []
      let keywordScore = 0
      let formatScore = 0
      let sectionScore = 0
      let lengthScore = 0

      // Analyze keywords
      const resumeText = `${resume.summary} ${resume.experience.map((exp) => exp.description).join(" ")} ${resume.skills.join(" ")}`
      const techKeywords = commonKeywords.tech.filter((keyword) =>
        resumeText.toLowerCase().includes(keyword.toLowerCase()),
      )

      keywordScore = Math.min((techKeywords.length / commonKeywords.tech.length) * 100, 100)

      if (keywordScore < 30) {
        newSuggestions.push({
          type: "keyword",
          severity: "high",
          title: "Low Keyword Density",
          description: "Your resume lacks industry-relevant keywords",
          suggestion: `Add more tech keywords like: ${commonKeywords.tech.slice(0, 5).join(", ")}`,
        })
      }

      // Analyze formatting
      formatScore = 85 // Base score for clean format
      if (resume.personalInfo.email && resume.personalInfo.phone) formatScore += 10
      if (resume.summary.length > 50) formatScore += 5

      // Analyze sections
      sectionScore = 0
      if (resume.summary) sectionScore += 25
      if (resume.experience.length > 0) sectionScore += 25
      if (resume.education.length > 0) sectionScore += 25
      if (resume.skills.length > 0) sectionScore += 25

      if (sectionScore < 100) {
        newSuggestions.push({
          type: "section",
          severity: "medium",
          title: "Missing Sections",
          description: "Some important resume sections are missing",
          suggestion: "Ensure you have Summary, Experience, Education, and Skills sections",
        })
      }

      // Analyze length
      const totalWords = resumeText.split(" ").length
      if (totalWords < 200) {
        lengthScore = 40
        newSuggestions.push({
          type: "length",
          severity: "high",
          title: "Resume Too Short",
          description: "Your resume content is too brief",
          suggestion: "Add more details to your experience and achievements",
        })
      } else if (totalWords > 800) {
        lengthScore = 60
        newSuggestions.push({
          type: "length",
          severity: "medium",
          title: "Resume Too Long",
          description: "Your resume might be too lengthy for ATS systems",
          suggestion: "Consider condensing your content to 1-2 pages",
        })
      } else {
        lengthScore = 90
      }

      const overall = Math.round((keywordScore + formatScore + sectionScore + lengthScore) / 4)

      setATSScore({
        overall,
        keywords: Math.round(keywordScore),
        formatting: Math.round(formatScore),
        sections: Math.round(sectionScore),
        length: Math.round(lengthScore),
      })

      setSuggestions(newSuggestions)
      onOptimize(newSuggestions)
      setIsAnalyzing(false)
    }, 2000)
  }

  useEffect(() => {
    analyzeATS()
  }, [resume])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />
    return <XCircle className="h-5 w-5 text-red-600" />
  }

  return (
    <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            ATS Optimization
          </CardTitle>
          <Button
            onClick={analyzeATS}
            disabled={isAnalyzing}
            size="sm"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isAnalyzing ? "Analyzing..." : "Re-analyze"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center space-y-4">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-pulse-glow">
              <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                <span className={`text-2xl font-bold ${getScoreColor(atsScore.overall)}`}>{atsScore.overall}%</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ATS Compatibility Score</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {atsScore.overall >= 80
                ? "Excellent! Your resume is ATS-friendly"
                : atsScore.overall >= 60
                  ? "Good, but there's room for improvement"
                  : "Needs improvement to pass ATS screening"}
            </p>
          </div>
        </div>

        {/* Detailed Scores */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Keywords</span>
              <div className="flex items-center gap-1">
                {getScoreIcon(atsScore.keywords)}
                <span className={`text-sm font-bold ${getScoreColor(atsScore.keywords)}`}>{atsScore.keywords}%</span>
              </div>
            </div>
            <Progress value={atsScore.keywords} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Formatting</span>
              <div className="flex items-center gap-1">
                {getScoreIcon(atsScore.formatting)}
                <span className={`text-sm font-bold ${getScoreColor(atsScore.formatting)}`}>
                  {atsScore.formatting}%
                </span>
              </div>
            </div>
            <Progress value={atsScore.formatting} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sections</span>
              <div className="flex items-center gap-1">
                {getScoreIcon(atsScore.sections)}
                <span className={`text-sm font-bold ${getScoreColor(atsScore.sections)}`}>{atsScore.sections}%</span>
              </div>
            </div>
            <Progress value={atsScore.sections} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Length</span>
              <div className="flex items-center gap-1">
                {getScoreIcon(atsScore.length)}
                <span className={`text-sm font-bold ${getScoreColor(atsScore.length)}`}>{atsScore.length}%</span>
              </div>
            </div>
            <Progress value={atsScore.length} className="h-2" />
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Optimization Suggestions
            </h4>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-2">
                    <Badge
                      variant={
                        suggestion.severity === "high"
                          ? "destructive"
                          : suggestion.severity === "medium"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {suggestion.severity}
                    </Badge>
                    <div className="flex-1 space-y-1">
                      <h5 className="font-medium text-sm text-gray-900 dark:text-white">{suggestion.title}</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{suggestion.description}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">💡 {suggestion.suggestion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATS Tips */}
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4" />
            ATS Pro Tips
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Use standard section headings (Experience, Education, Skills)</li>
            <li>• Include relevant keywords from the job description</li>
            <li>• Use simple, clean formatting without complex layouts</li>
            <li>• Save as .docx or .pdf format</li>
            <li>• Avoid images, graphics, and unusual fonts</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
