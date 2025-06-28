from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import json
import os
from datetime import datetime

app = FastAPI(title="Resume Editor API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class PersonalInfo(BaseModel):
    name: str
    email: str
    phone: str
    address: str

class ExperienceEntry(BaseModel):
    id: str
    company: str
    position: str
    startDate: str
    endDate: str
    description: str
    enhanced: Optional[bool] = False

class EducationEntry(BaseModel):
    id: str
    institution: str
    degree: str
    startDate: str
    endDate: str
    description: str
    enhanced: Optional[bool] = False

class Resume(BaseModel):
    id: Optional[str] = None
    personalInfo: PersonalInfo
    summary: str
    experience: List[ExperienceEntry]
    education: List[EducationEntry]
    skills: List[str]
    enhancedSections: List[str] = []

class EnhanceRequest(BaseModel):
    section: str
    content: str

class EnhanceResponse(BaseModel):
    enhanced_content: str

# In-memory storage
resumes_storage: Dict[str, Dict] = {}

# Mock AI enhancement logic
def mock_ai_enhance(section: str, content: str) -> str:
    """Mock AI enhancement - in real app, this would call an AI service"""
    
    enhancement_templates = {
        "summary": {
            "prefix": "Dynamic and results-driven professional with",
            "suffix": "Proven track record of delivering high-impact solutions and driving organizational success through innovative approaches and collaborative leadership."
        },
        "experience": {
            "prefix": "Successfully",
            "suffix": "Demonstrated exceptional problem-solving abilities and consistently exceeded performance targets while maintaining the highest standards of quality and efficiency."
        },
        "education": {
            "prefix": "Comprehensive academic foundation in",
            "suffix": "Developed strong analytical and critical thinking skills through rigorous coursework and practical application of theoretical concepts."
        },
        "skills": {
            "prefix": "Advanced proficiency in",
            "suffix": "with extensive hands-on experience and continuous learning mindset to stay current with industry best practices."
        }
    }
    
    template = enhancement_templates.get(section, {"prefix": "Enhanced", "suffix": "with improved clarity and impact."})
    
    # Simple enhancement logic
    if len(content.strip()) == 0:
        return f"{template['prefix']} your expertise. {template['suffix']}"
    
    # Add enhancement to existing content
    enhanced = f"{template['prefix']} {content.lower()} {template['suffix']}"
    return enhanced

@app.get("/")
async def root():
    return {"message": "Resume Editor API is running"}

@app.post("/ai-enhance", response_model=EnhanceResponse)
async def enhance_section(request: EnhanceRequest):
    """Enhance a resume section with AI"""
    try:
        enhanced_content = mock_ai_enhance(request.section, request.content)
        return EnhanceResponse(enhanced_content=enhanced_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to enhance section: {str(e)}")

@app.post("/save-resume")
async def save_resume(resume: Resume):
    """Save resume to storage"""
    try:
        # Generate ID if not provided
        if not resume.id:
            resume.id = f"resume_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        # Save to in-memory storage
        resumes_storage[resume.id] = resume.dict()
        
        # Also save to file for persistence
        os.makedirs("saved_resumes", exist_ok=True)
        with open(f"saved_resumes/{resume.id}.json", "w") as f:
            json.dump(resume.dict(), f, indent=2)
        
        return {"message": "Resume saved successfully", "id": resume.id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save resume: {str(e)}")

@app.get("/resume/{resume_id}")
async def get_resume(resume_id: str):
    """Retrieve a saved resume"""
    if resume_id in resumes_storage:
        return resumes_storage[resume_id]
    
    # Try to load from file
    try:
        with open(f"saved_resumes/{resume_id}.json", "r") as f:
            resume_data = json.load(f)
            resumes_storage[resume_id] = resume_data
            return resume_data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Resume not found")

@app.get("/resumes")
async def list_resumes():
    """List all saved resumes"""
    resume_list = []
    
    # Add from memory
    for resume_id, resume_data in resumes_storage.items():
        resume_list.append({
            "id": resume_id,
            "name": resume_data.get("personalInfo", {}).get("name", "Unknown"),
            "saved_at": "In Memory"
        })
    
    # Add from files
    if os.path.exists("saved_resumes"):
        for filename in os.listdir("saved_resumes"):
            if filename.endswith(".json"):
                resume_id = filename[:-5]  # Remove .json extension
                if resume_id not in resumes_storage:
                    try:
                        with open(f"saved_resumes/{filename}", "r") as f:
                            resume_data = json.load(f)
                            resume_list.append({
                                "id": resume_id,
                                "name": resume_data.get("personalInfo", {}).get("name", "Unknown"),
                                "saved_at": "File"
                            })
                    except:
                        continue
    
    return {"resumes": resume_list}

if __name__ == "__main__":
    import uvicorn
    print("Starting Resume Editor API server...")
    print("API will be available at: http://localhost:8000")
    print("API docs will be available at: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
