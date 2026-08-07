import { useEffect, useState } from 'react'
import './HobbitScrollBar.css'

/* Side-profile silhouette of a bride: veil, A-line dress, bouquet */
function BrideSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 52"
      className="bride-figure couple-figure"
    >
      {/* Veil flowing behind (left/back) */}
      <path d="M13 3 Q4 6 2 16 Q4 11 9 9 Q12 8 13 8 Z" />

      {/* Veil crown band */}
      <rect x="14" y="2" width="12" height="3.5" rx="1.8" />

      {/* Head */}
      <circle cx="21" cy="7" r="5.5" />

      {/* Neck */}
      <rect x="19" y="12" width="4" height="3" rx="1" />

      {/* A-line dress body (side profile, wider at hem) */}
      <path d="M14 15 Q21 12 26 15 L30 46 Q21 51 9 46 Z" />

      {/* Bouquet in front hand */}
      <circle cx="28" cy="22" r="3.5" />
      <circle cx="30" cy="25" r="2.8" />
      <circle cx="27" cy="26" r="2" />

      {/* Front foot peeking below hem */}
      <g className="leg-front">
        <line x1="23" y1="46" x2="27" y2="52"
              strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Back foot peeking below hem */}
      <g className="leg-back">
        <line x1="16" y1="46" x2="12" y2="52"
              strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/* Side-profile silhouette of a groom: top hat, tuxedo jacket, trousers */
function GroomSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 52"
      className="groom-figure couple-figure"
    >
      {/* Top hat crown */}
      <rect x="10" y="0" width="11" height="9" rx="1" />
      {/* Top hat brim */}
      <rect x="7" y="8" width="16" height="2.5" rx="1.2" />

      {/* Head */}
      <circle cx="16" cy="17" r="6" />

      {/* Collar / bow tie */}
      <path d="M13 23 L16 26 L19 23 L16 20 Z" />

      {/* Tuxedo jacket */}
      <path d="M8 25 Q16 22 23 25 L22 45 Q16 48 10 45 Z" />

      {/* Tuxedo lapel V */}
      <path d="M23 25 L19 33 L23 31" />

      {/* Front arm */}
      <g className="arm-front">
        <line x1="10" y1="28" x2="5" y2="38"
              strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Back arm (trailing) */}
      <line x1="22" y1="28" x2="25" y2="36"
            strokeWidth="2.5" strokeLinecap="round" />

      {/* Front leg */}
      <g className="leg-front">
        <line x1="12" y1="45" x2="9" y2="52"
              strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* Back leg */}
      <g className="leg-back">
        <line x1="18" y1="45" x2="21" y2="52"
              strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function EyeOfSauronSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 68"
      className="eye-sauron"
    >
      <ellipse className="eye-glow-outer" cx="28" cy="30" rx="26" ry="28" fill="#FF3300" />

      <path className="flame-layer-1"
            d="M6 62 Q11 44 18 52 Q22 30 28 46 Q34 30 38 52 Q45 44 50 62 Z"
            fill="#6A0000" />
      <path className="flame-layer-2"
            d="M10 62 Q15 48 20 54 Q24 36 28 50 Q32 36 36 54 Q41 48 46 62 Z"
            fill="#CC2200" />
      <path className="flame-layer-3"
            d="M14 62 Q18 52 22 56 Q25 44 28 52 Q31 44 34 56 Q38 52 42 62 Z"
            fill="#FF5500" />
      <path className="flame-layer-4"
            d="M19 62 Q22 56 25 58 Q26 50 28 55 Q30 50 31 58 Q34 56 37 62 Z"
            fill="#FF9900" />

      <path d="M22 62 L18 68 L38 68 L34 62 Z" fill="#080200" />
      <rect x="25" y="46" width="6" height="20" fill="#080200" />

      <path d="M3 30 Q12 6 28 3 Q44 6 53 30 Q44 54 28 57 Q12 54 3 30 Z" fill="#200800" />
      <path d="M7 30 Q28 14 49 30 Q28 46 7 30 Z" fill="#880000" />
      <path d="M12 30 Q28 20 44 30 Q28 40 12 30 Z" fill="#DD4400" />
      <path d="M16 30 Q28 23 40 30 Q28 37 16 30 Z" fill="#FF6600" />

      <path d="M25 19 Q28 16 31 19 L31 41 Q28 44 25 41 Z" fill="#000000" />
      <path d="M26 22 Q28 20 30 22 L30 38 Q28 40 26 38 Z" fill="#1A0000" />

      <ellipse cx="24" cy="26" rx="2.5" ry="3" fill="#FF8800" opacity="0.3" />
      <path d="M7 30 Q28 14 49 30" stroke="#FF4400" strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M3 30 Q12 6 28 3 Q44 6 53 30" stroke="#3A1000" strokeWidth="2.5" fill="none" />
      <path d="M3 30 Q12 54 28 57 Q44 54 53 30" stroke="#3A1000" strokeWidth="2.5" fill="none" />
    </svg>
  )
}

export default function HobbitScrollBar() {
  const [scrollPct, setScrollPct] = useState(0)
  const [walking, setWalking] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      setScrollPct(pct)
      setWalking(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setWalking(false), 500)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="hobbit-scrollbar" aria-hidden="true">
      {/* The road line */}
      <div className="hobbit-road-line" />

      {/* Milestone markers */}
      <div className="milestone" style={{ left: '18%' }}>
        <span className="milestone-label">The Shire</span>
        <div className="milestone-dot" />
      </div>
      <div className="milestone" style={{ left: '42%' }}>
        <span className="milestone-label">Rivendell</span>
        <div className="milestone-dot" />
      </div>
      <div className="milestone" style={{ left: '68%' }}>
        <span className="milestone-label">Rohan</span>
        <div className="milestone-dot" />
      </div>

      {/* The couple walking together */}
      <div
        className={`hobbit-walker ${walking ? 'is-walking' : 'is-idle'}`}
        style={{ left: `calc(4px + ${scrollPct} * (100% - 140px))` }}
      >
        <GroomSVG />
        <BrideSVG />
      </div>

      {/* Eye of Sauron */}
      <div className="eye-container">
        <EyeOfSauronSVG />
        <span className="eye-label">Mordor</span>
      </div>
    </div>
  )
}
