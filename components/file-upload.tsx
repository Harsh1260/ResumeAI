"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, ArrowLeft } from "lucide-react"
import type { Resume } from "@/types/resume"

interface FileUploadProps {
  onResumeLoaded: (resume: Resume) => void
  onBack: () => void
}

export default function FileUpload({ onResumeLoaded, onBack }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const mockParseResume = (fileName: string): Resume => {
    return {
      personalInfo: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, City, State 12345",
      },
      summary: "Experienced software developer with 5+ years of experience in full-stack development.",
      experience: [
        {
          id: "1",
          company: "Tech Corp",
          position: "Senior Developer",
          startDate: "2020-01",
          endDate: "2024-01",
          description:
            "Led development of web applications using React and Node.js. Improved application performance by 40%.",
        },
      ],
      education: [
        {
          id: "1",
          institution: "University of Technology",
          degree: "Bachelor of Computer Science",
          startDate: "2016-09",
          endDate: "2020-06",
          description: "Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development.",
        },
      ],
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL"],
      enhancedSections: [],
    }
  }

  const handleFileUpload = async (file: File) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const mockResume = mockParseResume(file.name)
    onResumeLoaded(mockResume)
    setIsLoading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    const file = files[0]
    if (file && (file.type === "application/pdf" || file.name.endsWith(".docx"))) {
      handleFileUpload(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6">
        <Button variant="ghost" onClick={onBack} className="mb-4 hover:bg-white/50 dark:hover:bg-gray-800/50">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      {/* Upload Section */}
      <div className="flex-1 flex items-center justify-center px-6">
        <Card className="w-full max-w-2xl mx-auto border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Upload Your Resume
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300">Let's start by uploading your current resume</p>
          </CardHeader>
          <CardContent className="p-8">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                isDragging
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105"
                  : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
            >
              {isLoading ? (
                <div className="space-y-6">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">Processing your resume...</p>
                    <p className="text-gray-600 dark:text-gray-300">This will just take a moment</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-lg">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Drop your resume here</h3>
                    <p className="text-gray-600 dark:text-gray-300">or click to browse your files</p>
                    <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">PDF</span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">DOCX</span>
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button
                        className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        asChild
                      >
                        <span>
                          <FileText className="h-5 w-5 mr-2" />
                          Choose File
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
