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

/* Small fairy-tale castle silhouette — the couple's destination */
function CastleSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 58"
      className="castle-figure"
    >
      {/* Left turret */}
      <rect x="2" y="26" width="10" height="32" />
      <path d="M2 26 L7 16 L12 26 Z" />

      {/* Right turret */}
      <rect x="36" y="26" width="10" height="32" />
      <path d="M36 26 L41 16 L46 26 Z" />

      {/* Center keep */}
      <rect x="14" y="18" width="20" height="40" />
      <path d="M14 18 L24 6 L34 18 Z" />

      {/* Flag */}
      <line x1="24" y1="6" x2="24" y2="0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 0 L30 3 L24 6 Z" />
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

      {/* The couple walking together */}
      <div
        className={`hobbit-walker ${walking ? 'is-walking' : 'is-idle'}`}
        style={{ left: `calc(4px + ${scrollPct} * (100% - 140px))` }}
      >
        <GroomSVG />
        <BrideSVG />
      </div>

      {/* The castle, waiting at the end of the road */}
      <div className="castle-container">
        <CastleSVG />
      </div>
    </div>
  )
}
