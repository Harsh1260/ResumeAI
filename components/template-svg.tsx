"use client"

interface TemplateSVGProps {
  template: "professional" | "modern" | "creative" | "minimal" | "tech" | "healthcare"
  className?: string
}

export function TemplateSVG({ template, className = "w-full h-full" }: TemplateSVGProps) {
  const svgs = {
    professional: (
      <svg viewBox="0 0 300 400" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="400" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
        {/* Header */}
        <rect x="20" y="20" width="260" height="60" fill="#1e40af" rx="4" />
        <rect x="30" y="30" width="120" height="8" fill="white" rx="2" />
        <rect x="30" y="45" width="180" height="6" fill="#93c5fd" rx="2" />
        <rect x="30" y="58" width="140" height="6" fill="#93c5fd" rx="2" />

        {/* Sections */}
        <rect x="20" y="100" width="80" height="8" fill="#374151" rx="2" />
        <rect x="20" y="115" width="260" height="4" fill="#d1d5db" rx="1" />
        <rect x="20" y="125" width="240" height="4" fill="#9ca3af" rx="1" />
        <rect x="20" y="135" width="220" height="4" fill="#9ca3af" rx="1" />

        <rect x="20" y="160" width="100" height="8" fill="#374151" rx="2" />
        <rect x="20" y="175" width="260" height="4" fill="#d1d5db" rx="1" />
        <rect x="20" y="185" width="200" height="4" fill="#9ca3af" rx="1" />
        <rect x="20" y="195" width="180" height="4" fill="#9ca3af" rx="1" />

        <rect x="20" y="220" width="60" height="8" fill="#374151" rx="2" />
        <rect x="20" y="235" width="160" height="4" fill="#9ca3af" rx="1" />
      </svg>
    ),

    modern: (
      <svg viewBox="0 0 300 400" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="400" fill="white" stroke="#e5e7eb" strokeWidth="1" />
        {/* Side accent */}
        <rect x="0" y="0" width="8" height="400" fill="#8b5cf6" />

        {/* Header */}
        <rect x="25" y="30" width="140" height="12" fill="#1f2937" rx="2" />
        <rect x="25" y="50" width="200" height="6" fill="#6b7280" rx="2" />

        {/* Modern sections with colored accents */}
        <circle cx="35" cy="90" r="4" fill="#8b5cf6" />
        <rect x="50" y="86" width="80" height="8" fill="#1f2937" rx="2" />
        <rect x="25" y="105" width="240" height="4" fill="#9ca3af" rx="1" />
        <rect x="25" y="115" width="200" height="4" fill="#d1d5db" rx="1" />

        <circle cx="35" cy="150" r="4" fill="#06b6d4" />
        <rect x="50" y="146" width="100" height="8" fill="#1f2937" rx="2" />
        <rect x="25" y="165" width="220" height="4" fill="#9ca3af" rx="1" />
        <rect x="25" y="175" width="180" height="4" fill="#d1d5db" rx="1" />

        <circle cx="35" cy="210" r="4" fill="#10b981" />
        <rect x="50" y="206" width="60" height="8" fill="#1f2937" rx="2" />
        <rect x="25" y="225" width="160" height="4" fill="#9ca3af" rx="1" />

        {/* Modern grid pattern */}
        <g opacity="0.1">
          <line x1="0" y1="300" x2="300" y2="300" stroke="#8b5cf6" strokeWidth="1" />
          <line x1="0" y1="320" x2="300" y2="320" stroke="#8b5cf6" strokeWidth="1" />
          <line x1="0" y1="340" x2="300" y2="340" stroke="#8b5cf6" strokeWidth="1" />
        </g>
      </svg>
    ),

    creative: (
      <svg viewBox="0 0 300 400" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="creativeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <rect width="300" height="400" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />

        {/* Creative header with gradient */}
        <rect x="20" y="20" width="260" height="80" fill="url(#creativeGrad)" rx="8" />
        <rect x="30" y="35" width="140" height="10" fill="white" rx="3" />
        <rect x="30" y="55" width="200" height="6" fill="#fed7aa" rx="2" />
        <rect x="30" y="70" width="160" height="6" fill="#fed7aa" rx="2" />

        {/* Creative shapes */}
        <circle cx="250" cy="40" r="15" fill="#fbbf24" opacity="0.7" />
        <polygon points="270,70 280,85 260,85" fill="#f59e0b" opacity="0.8" />

        {/* Sections with creative styling */}
        <rect x="20" y="120" width="90" height="10" fill="#dc2626" rx="3" />
        <rect x="20" y="140" width="240" height="5" fill="#374151" rx="2" />
        <rect x="20" y="150" width="200" height="4" fill="#6b7280" rx="1" />
        <rect x="20" y="160" width="180" height="4" fill="#9ca3af" rx="1" />

        {/* Creative elements */}
        <rect x="20" y="185" width="100" height="10" fill="#dc2626" rx="3" />
        <rect x="20" y="205" width="220" height="5" fill="#374151" rx="2" />
        <rect x="20" y="215" width="160" height="4" fill="#6b7280" rx="1" />

        {/* Decorative elements */}
        <circle cx="50" cy="280" r="3" fill="#f59e0b" opacity="0.6" />
        <circle cx="80" cy="290" r="2" fill="#ef4444" opacity="0.6" />
        <circle cx="110" cy="285" r="4" fill="#fbbf24" opacity="0.6" />
      </svg>
    ),

    minimal: (
      <svg viewBox="0 0 300 400" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="400" fill="white" />

        {/* Minimal header */}
        <rect x="40" y="40" width="120" height="8" fill="#111827" rx="1" />
        <rect x="40" y="60" width="180" height="4" fill="#6b7280" rx="1" />

        {/* Clean sections with lots of white space */}
        <rect x="40" y="100" width="60" height="6" fill="#111827" rx="1" />
        <line x1="40" y1="115" x2="260" y2="115" stroke="#e5e7eb" strokeWidth="1" />
        <rect x="40" y="130" width="200" height="3" fill="#9ca3af" rx="1" />
        <rect x="40" y="140" width="160" height="3" fill="#d1d5db" rx="1" />

        <rect x="40" y="170" width="80" height="6" fill="#111827" rx="1" />
        <line x1="40" y1="185" x2="260" y2="185" stroke="#e5e7eb" strokeWidth="1" />
        <rect x="40" y="200" width="180" height="3" fill="#9ca3af" rx="1" />
        <rect x="40" y="210" width="140" height="3" fill="#d1d5db" rx="1" />

        <rect x="40" y="240" width="50" height="6" fill="#111827" rx="1" />
        <line x1="40" y1="255" x2="260" y2="255" stroke="#e5e7eb" strokeWidth="1" />
        <rect x="40" y="270" width="120" height="3" fill="#9ca3af" rx="1" />
      </svg>
    ),

    tech: (
      <svg viewBox="0 0 300 400" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="400" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

        {/* Tech header */}
        <rect x="20" y="20" width="260" height="60" fill="#1e293b" rx="4" />
        <rect x="30" y="35" width="120" height="8" fill="#00d9ff" rx="2" />
        <rect x="30" y="50" width="180" height="5" fill="#64748b" rx="2" />
        <rect x="30" y="62" width="140" height="5" fill="#64748b" rx="2" />

        {/* Code-like sections */}
        <rect x="20" y="100" width="20" height="6" fill="#00d9ff" rx="1" />
        <rect x="45" y="100" width="80" height="6" fill="#e2e8f0" rx="1" />
        <rect x="20" y="115" width="240" height="4" fill="#475569" rx="1" />
        <rect x="20" y="125" width="200" height="4" fill="#64748b" rx="1" />
        <rect x="20" y="135" width="180" height="4" fill="#64748b" rx="1" />

        {/* Tech symbols */}
        <rect x="20" y="160" width="4" height="4" fill="#22c55e" />
        <rect x="30" y="160" width="4" height="4" fill="#eab308" />
        <rect x="40" y="160" width="4" height="4" fill="#ef4444" />
        <rect x="55" y="158" width="100" height="8" fill="#e2e8f0" rx="1" />

        <rect x="20" y="180" width="220" height="4" fill="#475569" rx="1" />
        <rect x="20" y="190" width="160" height="4" fill="#64748b" rx="1" />

        {/* Terminal-like section */}
        <rect x="20" y="220" width="260" height="80" fill="#000000" rx="4" />
        <rect x="30" y="230" width="8" height="4" fill="#22c55e" rx="1" />
        <rect x="45" y="230" width="60" height="4" fill="#00d9ff" rx="1" />
        <rect x="30" y="240" width="100" height="4" fill="#64748b" rx="1" />
        <rect x="30" y="250" width="80" height="4" fill="#64748b" rx="1" />
      </svg>
    ),

    healthcare: (
      <svg viewBox="0 0 300 400" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="400" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />

        {/* Healthcare header */}
        <rect x="20" y="20" width="260" height="60" fill="#0ea5e9" rx="4" />
        <rect x="30" y="35" width="120" height="8" fill="white" rx="2" />
        <rect x="30" y="50" width="180" height="5" fill="#bae6fd" rx="2" />
        <rect x="30" y="62" width="140" height="5" fill="#bae6fd" rx="2" />

        {/* Medical cross symbol */}
        <rect x="250" y="35" width="3" height="15" fill="white" />
        <rect x="245" y="40" width="13" height="3" fill="white" />

        {/* Professional sections */}
        <rect x="20" y="100" width="100" height="8" fill="#0c4a6e" rx="2" />
        <rect x="20" y="115" width="240" height="4" fill="#0369a1" rx="1" />
        <rect x="20" y="125" width="200" height="4" fill="#0284c7" rx="1" />
        <rect x="20" y="135" width="180" height="4" fill="#0ea5e9" rx="1" />

        <rect x="20" y="160" width="120" height="8" fill="#0c4a6e" rx="2" />
        <rect x="20" y="175" width="220" height="4" fill="#0369a1" rx="1" />
        <rect x="20" y="185" width="160" height="4" fill="#0284c7" rx="1" />

        {/* Certification badges */}
        <circle cx="40" cy="220" r="8" fill="#22c55e" opacity="0.8" />
        <rect x="35" y="217" width="10" height="2" fill="white" rx="1" />
        <rect x="38" y="214" width="4" height="8" fill="white" rx="1" />

        <circle cx="70" cy="220" r="8" fill="#3b82f6" opacity="0.8" />
        <rect x="66" y="217" width="8" height="2" fill="white" rx="1" />
        <rect x="66" y="221" width="8" height="2" fill="white" rx="1" />
      </svg>
    ),
  }

  return svgs[template] || svgs.professional
}
