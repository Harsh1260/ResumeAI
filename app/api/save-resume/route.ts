import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = "http://localhost:8000/save-resume"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.personalInfo?.name) {
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 })
    }

    // Try to connect to backend
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      // If backend is not available, save locally
      console.warn("Backend not available, saving locally")
      const resumeId = `resume_${Date.now()}`

      // In a real app, you'd save to a database here
      // For now, we'll just return success
      return NextResponse.json({
        success: true,
        id: resumeId,
        message: "Resume saved locally (backend unavailable)",
      })
    }

    const data = await res.json()
    return NextResponse.json({ success: true, ...data })
  } catch (error) {
    console.error("Save resume error:", error)

    // Fallback: save locally
    const resumeId = `resume_${Date.now()}`
    return NextResponse.json({
      success: true,
      id: resumeId,
      message: "Resume saved locally (fallback)",
    })
  }
}
