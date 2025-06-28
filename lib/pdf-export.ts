import jsPDF from "jspdf"
import type { Resume } from "@/types/resume"

interface PDFOptions {
  template: "modern" | "classic" | "minimal" | "creative"
  colorScheme: "blue" | "purple" | "green" | "orange"
  fontSize: "small" | "medium" | "large"
  margins: "narrow" | "normal" | "wide"
}

export function exportToPDF(
  resume: Resume,
  options: PDFOptions = {
    template: "modern",
    colorScheme: "blue",
    fontSize: "medium",
    margins: "normal",
  },
) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // Margin settings
  const margins = {
    narrow: 15,
    normal: 20,
    wide: 25,
  }
  const margin = margins[options.margins]

  // Font size settings
  const fontSizes = {
    small: { header: 20, section: 12, body: 10, name: 24 },
    medium: { header: 22, section: 14, body: 11, name: 26 },
    large: { header: 24, section: 16, body: 12, name: 28 },
  }
  const fonts = fontSizes[options.fontSize]

  // Color schemes
  const colors = {
    blue: { primary: [59, 130, 246], secondary: [147, 197, 253], accent: [30, 64, 175] },
    purple: { primary: [147, 51, 234], secondary: [196, 181, 253], accent: [88, 28, 135] },
    green: { primary: [34, 197, 94], secondary: [134, 239, 172], accent: [21, 128, 61] },
    orange: { primary: [249, 115, 22], secondary: [254, 215, 170], accent: [194, 65, 12] },
  }
  const colorScheme = colors[options.colorScheme]

  let yPosition = margin

  // Helper functions
  const addText = (text: string, fontSize: number, isBold = false, color: number[] = [0, 0, 0]) => {
    doc.setFontSize(fontSize)
    doc.setTextColor(color[0], color[1], color[2])
    if (isBold) {
      doc.setFont("helvetica", "bold")
    } else {
      doc.setFont("helvetica", "normal")
    }

    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin)
    doc.text(lines, margin, yPosition)
    yPosition += lines.length * (fontSize * 0.4) + 3
    return lines.length
  }

  const addSection = (title: string, content?: string) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 50) {
      doc.addPage()
      yPosition = margin
    }

    // Add some space before section
    yPosition += 8

    // Section title with colored background
    if (options.template === "modern") {
      doc.setFillColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2])
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, fonts.section + 6, "F")
      doc.setTextColor(255, 255, 255)
    } else {
      doc.setTextColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2])
    }

    doc.setFontSize(fonts.section)
    doc.setFont("helvetica", "bold")
    doc.text(title.toUpperCase(), margin + (options.template === "modern" ? 5 : 0), yPosition + fonts.section - 2)

    yPosition += fonts.section + 5

    // Add line under title for classic template
    if (options.template === "classic") {
      doc.setDrawColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2])
      doc.setLineWidth(0.5)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 5
    }

    // Section content
    if (content && content.trim()) {
      doc.setTextColor(0, 0, 0)
      addText(content, fonts.body)
    }

    yPosition += 3
  }

  const addExperience = (exp: any) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 80) {
      doc.addPage()
      yPosition = margin
    }

    // Position and Company
    doc.setFontSize(fonts.body + 1)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 0, 0)
    doc.text(`${exp.position}`, margin, yPosition)

    // Company name in color
    doc.setTextColor(colorScheme.accent[0], colorScheme.accent[1], colorScheme.accent[2])
    const positionWidth = doc.getTextWidth(`${exp.position}`)
    doc.text(` at ${exp.company}`, margin + positionWidth, yPosition)

    yPosition += fonts.body + 5

    // Dates
    if (exp.startDate || exp.endDate) {
      doc.setFontSize(fonts.body - 1)
      doc.setFont("helvetica", "italic")
      doc.setTextColor(100, 100, 100)
      const dateRange = `${exp.startDate || "Present"} - ${exp.endDate || "Present"}`
      doc.text(dateRange, margin, yPosition)
      yPosition += fonts.body + 3
    }

    // Description with bullet points
    if (exp.description) {
      doc.setTextColor(0, 0, 0)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(fonts.body)

      const descriptions = exp.description.split("\n").filter((line: string) => line.trim())
      descriptions.forEach((desc: string) => {
        const bulletText = `• ${desc.trim()}`
        const lines = doc.splitTextToSize(bulletText, pageWidth - 2 * margin - 10)
        doc.text(lines, margin + 5, yPosition)
        yPosition += lines.length * (fonts.body * 0.4) + 2
      })
    }

    yPosition += 8
  }

  try {
    // Header based on template
    if (options.template === "modern") {
      // Modern template with colored header
      doc.setFillColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2])
      doc.rect(0, 0, pageWidth, 50, "F")

      doc.setTextColor(255, 255, 255)
      doc.setFontSize(fonts.name)
      doc.setFont("helvetica", "bold")
      doc.text(resume.personalInfo.name || "Your Name", margin, 30)

      // Contact info in white
      const contactInfo = [resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.address]
        .filter(Boolean)
        .join(" | ")

      if (contactInfo) {
        doc.setFontSize(fonts.body)
        doc.setFont("helvetica", "normal")
        doc.text(contactInfo, margin, 42)
      }

      yPosition = 65
    } else if (options.template === "creative") {
      // Creative template with side accent
      doc.setFillColor(colorScheme.secondary[0], colorScheme.secondary[1], colorScheme.secondary[2])
      doc.rect(0, 0, 8, pageHeight, "F")

      doc.setTextColor(colorScheme.primary[0], colorScheme.primary[1], colorScheme.primary[2])
      doc.setFontSize(fonts.name)
      doc.setFont("helvetica", "bold")
      doc.text(resume.personalInfo.name || "Your Name", margin, 35)

      yPosition = 50
    } else {
      // Classic template
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(fonts.name)
      doc.setFont("helvetica", "bold")
      doc.text(resume.personalInfo.name || "Your Name", margin, 30)

      yPosition = 45
    }

    // Contact Information (for non-modern templates)
    if (options.template !== "modern") {
      const contactInfo = [resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.address]
        .filter(Boolean)
        .join(" | ")

      if (contactInfo) {
        doc.setFontSize(fonts.body)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(100, 100, 100)
        doc.text(contactInfo, margin, yPosition)
        yPosition += fonts.body + 10
      }
    }

    // Professional Summary
    if (resume.summary) {
      addSection("Professional Summary", resume.summary)
    }

    // Experience
    if (resume.experience.length > 0) {
      addSection("Professional Experience")
      resume.experience.forEach((exp) => {
        addExperience(exp)
      })
    }

    // Education
    if (resume.education.length > 0) {
      addSection("Education")
      resume.education.forEach((edu) => {
        if (yPosition > pageHeight - 60) {
          doc.addPage()
          yPosition = margin
        }

        // Degree and Institution
        doc.setFontSize(fonts.body + 1)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(0, 0, 0)
        doc.text(`${edu.degree}`, margin, yPosition)

        doc.setTextColor(colorScheme.accent[0], colorScheme.accent[1], colorScheme.accent[2])
        const degreeWidth = doc.getTextWidth(`${edu.degree}`)
        doc.text(` - ${edu.institution}`, margin + degreeWidth, yPosition)

        yPosition += fonts.body + 5

        // Dates
        if (edu.startDate || edu.endDate) {
          doc.setFontSize(fonts.body - 1)
          doc.setFont("helvetica", "italic")
          doc.setTextColor(100, 100, 100)
          const dateRange = `${edu.startDate || ""} - ${edu.endDate || ""}`
          doc.text(dateRange, margin, yPosition)
          yPosition += fonts.body + 3
        }

        // Description
        if (edu.description) {
          doc.setTextColor(0, 0, 0)
          doc.setFont("helvetica", "normal")
          doc.setFontSize(fonts.body)
          addText(edu.description, fonts.body)
        }

        yPosition += 8
      })
    }

    // Skills
    if (resume.skills.length > 0) {
      if (yPosition > pageHeight - 40) {
        doc.addPage()
        yPosition = margin
      }

      addSection("Technical Skills")

      // Group skills for better presentation
      const skillsText = resume.skills.join(" • ")
      doc.setTextColor(0, 0, 0)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(fonts.body)
      addText(skillsText, fonts.body)
    }

    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(
        `${resume.personalInfo.name || "Resume"} - Page ${i} of ${pageCount}`,
        pageWidth - margin - 50,
        pageHeight - 10,
      )
    }

    // Save the PDF
    const fileName = `${resume.personalInfo.name.replace(/\s+/g, "_") || "resume"}_${options.template}_resume.pdf`
    doc.save(fileName)

    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    return false
  }
}

// Export options interface for the component
export interface PDFExportOptions {
  template: "modern" | "classic" | "minimal" | "creative"
  colorScheme: "blue" | "purple" | "green" | "orange"
  fontSize: "small" | "medium" | "large"
  margins: "narrow" | "normal" | "wide"
}
