# Resume Editor

A web-based resume editor with AI enhancement capabilities built with Next.js and FastAPI.

## Features

- **Upload Resume**: Upload PDF or DOCX files (mock parsing)
- **Edit Resume**: Editable fields for personal info, experience, education, and skills
- **AI Enhancement**: Enhance resume sections with mock AI backend
- **Save Resume**: Save resume data to FastAPI backend
- **Download Resume**: Download final resume as JSON

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Backend**: FastAPI with Python
- **UI**: shadcn/ui components
- **Styling**: Tailwind CSS

## Setup Instructions

### Frontend (Next.js)

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at `http://localhost:3000`

### Backend (FastAPI)

1. Navigate to the scripts directory:
\`\`\`bash
cd scripts
\`\`\`

2. Install Python dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. Run the FastAPI server:
\`\`\`bash
python main.py
\`\`\`

The API will be available at `http://localhost:8000`
API documentation will be available at `http://localhost:8000/docs`

## Usage

1. Start both the frontend and backend servers
2. Open `http://localhost:3000` in your browser
3. Upload a resume file (PDF or DOCX) - this will be mock parsed
4. Edit your resume using the form fields
5. Click "Enhance with AI" to improve sections
6. Save your resume to the backend
7. Download the final resume as JSON

## Notes

- File parsing is mocked - in production, you would integrate with libraries like `pdf-parse` or `mammoth`
- AI enhancement is mocked - in production, you would integrate with OpenAI, Claude, or similar services
- Resume data is stored in memory and local files - in production, you would use a proper database
