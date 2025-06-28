"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Plus, Trash2, Save, Download, ArrowLeft, Target, AlertCircle } from "lucide-react"
import type { Resume, ExperienceEntry, EducationEntry } from "@/types/resume"
import { enhanceSection, saveResume } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { exportToPDF } from "@/lib/pdf-export"
import { ATSOptimization } from "./ats-optimization"

interface ResumeEditorProps {
  initialResume: Resume
  onBack: () => void
}

export default function ResumeEditor({ initialResume, onBack }: ResumeEditorProps) {
  const [resume, setResume] = useState<Resume>(initialResume)
  const [enhancing, setEnhancing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const { toast } = useToast()

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  const handleSummaryChange = (value: string) => {
    setResume((prev) => ({ ...prev, summary: value }))
  }

  const handleEnhanceSection = async (section: string, content: string) => {
    setEnhancing(section)
    try {
      const enhanced = await enhanceSection(section, content)

      if (section === "summary") {
        setResume((prev) => ({ ...prev, summary: enhanced }))
      }

      setResume((prev) => ({
        ...prev,
        enhancedSections: [...prev.enhancedSections.filter((s) => s !== section), section],
      }))

      toast({
        title: "Section Enhanced",
        description: `Your ${section} has been improved with AI.`,
      })
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: error instanceof Error ? error.message : "Failed to enhance section. Please try again.",
        variant: "destructive",
      })
    } finally {
      setEnhancing(null)
    }
  }

  const addExperience = () => {
    const newExp: ExperienceEntry = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const updateExperience = (id: string, field: string, value: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu: EducationEntry = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = () => {
    const skill = prompt("Enter a new skill:")
    if (skill) {
      setResume((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const removeSkill = (index: number) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveError(null)

    try {
      const result = await saveResume(resume)

      if (result.success) {
        toast({
          title: "Resume Saved",
          description: result.message || "Your resume has been saved successfully.",
        })
      } else {
        throw new Error(result.message || "Failed to save resume")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save resume. Please try again."
      setSaveError(errorMessage)

      toast({
        title: "Save Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    const dataStr = JSON.stringify(resume, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "resume.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleExportPDF = async () => {
    try {
      const success = exportToPDF(resume)
      if (success) {
        toast({
          title: "PDF Exported",
          description: "Your resume has been exported as PDF successfully.",
        })
      } else {
        throw new Error("PDF export failed")
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleATSOptimize = (suggestions: any[]) => {
    toast({
      title: "ATS Analysis Complete",
      description: `Found ${suggestions.length} optimization suggestions.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        {/* Header Actions */}
        <div className="sticky top-20 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 p-6 mb-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-white/50 dark:hover:bg-gray-800/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Resume Editor
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={handleExportPDF}
                variant="outline"
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Button>
            </div>
          </div>

          {/* Save Error Display */}
          {saveError && (
            <div className="max-w-6xl mx-auto mt-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <div className="flex-1">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <strong>Save Error:</strong> {saveError}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Your changes are still preserved in the editor. Try saving again or download as JSON as backup.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSaveError(null)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  ×
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor">Resume Editor</TabsTrigger>
                <TabsTrigger value="ats" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  ATS Optimization
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-6">
                {/* Personal Information */}
                <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Full Name"
                        value={resume.personalInfo.name}
                        onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                      />
                      <Input
                        placeholder="Email"
                        type="email"
                        value={resume.personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                      />
                      <Input
                        placeholder="Phone"
                        value={resume.personalInfo.phone}
                        onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                      />
                      <Input
                        placeholder="Address"
                        value={resume.personalInfo.address}
                        onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Summary */}
                <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        Summary
                        {resume.enhancedSections.includes("summary") && (
                          <Badge variant="secondary">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI Enhanced
                          </Badge>
                        )}
                      </CardTitle>
                      <Button
                        onClick={() => handleEnhanceSection("summary", resume.summary)}
                        disabled={enhancing === "summary"}
                        variant="outline"
                        size="sm"
                        className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        {enhancing === "summary" ? "Enhancing..." : "Enhance with AI"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Write a compelling summary..."
                      value={resume.summary}
                      onChange={(e) => handleSummaryChange(e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Experience</CardTitle>
                      <Button
                        onClick={addExperience}
                        size="sm"
                        className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resume.experience.map((exp) => (
                      <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            <Input
                              placeholder="Company"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            />
                            <Input
                              placeholder="Position"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                            />
                            <Input
                              placeholder="Start Date"
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            />
                            <Input
                              placeholder="End Date"
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                            />
                          </div>
                          <Button
                            onClick={() => removeExperience(exp.id)}
                            variant="ghost"
                            size="sm"
                            className="transition-all duration-300 hover:scale-105 hover:shadow-lg ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex justify-between items-end gap-2">
                          <Textarea
                            placeholder="Job description and achievements..."
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            rows={3}
                            className="flex-1"
                          />
                          <Button
                            onClick={() => handleEnhanceSection("experience", exp.description)}
                            disabled={enhancing === `experience-${exp.id}`}
                            variant="outline"
                            size="sm"
                            className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Enhance
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Education */}
                <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Education</CardTitle>
                      <Button
                        onClick={addEducation}
                        size="sm"
                        className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resume.education.map((edu) => (
                      <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            <Input
                              placeholder="Institution"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                            />
                            <Input
                              placeholder="Degree"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                            />
                            <Input
                              placeholder="Start Date"
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                            />
                            <Input
                              placeholder="End Date"
                              type="month"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                            />
                          </div>
                          <Button
                            onClick={() => removeEducation(edu.id)}
                            variant="ghost"
                            size="sm"
                            className="transition-all duration-300 hover:scale-105 hover:shadow-lg ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Additional details..."
                          value={edu.description}
                          onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                          rows={2}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Skills</CardTitle>
                      <Button
                        onClick={addSkill}
                        size="sm"
                        className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer">
                          {skill}
                          <Button
                            onClick={() => removeSkill(index)}
                            variant="ghost"
                            size="sm"
                            className="transition-all duration-300 hover:scale-105 hover:shadow-lg ml-1 h-4 w-4 p-0"
                          >
                            ×
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ats">
                <ATSOptimization resume={resume} onOptimize={handleATSOptimize} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Resume Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-48 border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Resume Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">{resume.personalInfo.name || "Your Name"}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {resume.personalInfo.email} | {resume.personalInfo.phone}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{resume.personalInfo.address}</p>
                </div>

                {resume.summary && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">SUMMARY</h4>
                    <p className="text-xs text-gray-700 dark:text-gray-300">{resume.summary}</p>
                  </div>
                )}

                {resume.experience.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">EXPERIENCE</h4>
                    {resume.experience.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <p className="text-xs font-medium">
                          {exp.position} at {exp.company}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {exp.startDate} - {exp.endDate}
                        </p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {resume.skills.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">SKILLS</h4>
                    <p className="text-xs text-gray-700 dark:text-gray-300">{resume.skills.join(", ")}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
