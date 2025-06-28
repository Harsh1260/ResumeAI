export interface ResumeSection {
  id: string
  type: "summary" | "experience" | "education" | "skills"
  title: string
  content: string
  enhanced?: boolean
}

export interface ExperienceEntry {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  enhanced?: boolean
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  startDate: string
  endDate: string
  description: string
  enhanced?: boolean
}

export interface Resume {
  id?: string
  personalInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
  summary: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: string[]
  enhancedSections: string[]
}
