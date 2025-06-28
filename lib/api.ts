export async function enhanceSection(section: string, content: string): Promise<string> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch("/api/ai-enhance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ section, content }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP ${response.status}: Failed to enhance section`)
    }

    const data = await response.json()

    if (!data.enhanced_content) {
      throw new Error("Invalid response format from enhancement service")
    }

    return data.enhanced_content
  } catch (error) {
    console.error("Error enhancing section:", error)

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Enhancement request timed out. Please try again.")
      }
      throw error
    }

    throw new Error("Network error occurred while enhancing section")
  }
}

export async function saveResume(resume: any): Promise<{ success: boolean; id?: string; message?: string }> {
  try {
    const response = await fetch("/api/save-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resume),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to save resume`)
    }

    const data = await response.json()
    return { success: true, id: data.id, message: data.message }
  } catch (error) {
    console.error("Error saving resume:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Network error occurred while saving resume")
  }
}

export async function getResume(id: string): Promise<any> {
  try {
    const response = await fetch(`/api/resume/${id}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to get resume`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting resume:", error)
    throw error
  }
}

export async function listResumes(): Promise<any[]> {
  try {
    const response = await fetch("/api/resumes")

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}: Failed to list resumes`)
    }

    const data = await response.json()
    return data.resumes || []
  } catch (error) {
    console.error("Error listing resumes:", error)
    throw error
  }
}
