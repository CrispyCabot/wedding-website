import { useEffect, useRef } from 'react'
import { theme } from '../config/theme'

interface TrailParticle {
  x: number
  y: number
  size: number
  color: string
  opacity: number
  vx: number
  vy: number
  rot: number
  rotV: number
  life: number
  decay: number
  type: 'star' | 'orb'
}

function drawTrailStar(ctx: CanvasRenderingContext2D, p: TrailParticle) {
  const outer = p.size
  const inner = p.size * 0.24
  ctx.beginPath()
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
    else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
  }
  ctx.closePath()
  ctx.fillStyle = p.color
  ctx.fill()

  // soft halo
  const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2)
  grd.addColorStop(0, p.color + '44')
  grd.addColorStop(1, p.color + '00')
  ctx.globalAlpha = p.opacity * 0.5
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2)
  ctx.fill()
}

function drawTrailOrb(ctx: CanvasRenderingContext2D, p: TrailParticle) {
  const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
  grd.addColorStop(0,   p.color + 'EE')
  grd.addColorStop(0.4, p.color + '66')
  grd.addColorStop(1,   p.color + '00')
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.arc(0, 0, p.size, 0, Math.PI * 2)
  ctx.fill()
}

export default function FairyWandCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wandRef   = useRef<HTMLDivElement>(null)
  const trail     = useRef<TrailParticle[]>([])

  useEffect(() => {
    // Only activate for mouse/trackpad — skip touch-only devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    const colors = theme.particles.colors
    const gold   = theme.colors.gold

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width  = w
    canvas.height = h

    // Star center sits at (8, 8) inside the SVG; shift div so it lands on cursor
    const STAR_X = 8
    const STAR_Y = 8

    function spawnTrail(x: number, y: number, burst = false) {
      const count = burst ? 10 : 2 + Math.floor(Math.random() * 2)
      for (let i = 0; i < count; i++) {
        const isStar = Math.random() < 0.55
        trail.current.push({
          x:     x + (Math.random() - 0.5) * (burst ? 18 : 10),
          y:     y + (Math.random() - 0.5) * (burst ? 18 : 10),
          size:  isStar
                   ? 2 + Math.random() * 3.5
                   : 4 + Math.random() * (burst ? 10 : 6),
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1,
          vx:    (Math.random() - 0.5) * (burst ? 2 : 1.2),
          vy:    -(0.4 + Math.random() * (burst ? 2 : 1.2)),
          rot:   Math.random() * Math.PI * 2,
          rotV:  (Math.random() - 0.5) * 0.18,
          life:  1,
          decay: burst
                   ? 0.018 + Math.random() * 0.025
                   : 0.024 + Math.random() * 0.032,
          type:  isStar ? 'star' : 'orb',
        })
      }
    }

    function onMouseMove(e: MouseEvent) {
      const { clientX: x, clientY: y } = e
      if (wandRef.current) {
        wandRef.current.style.transform = `translate(${x - STAR_X}px, ${y - STAR_Y}px)`
        wandRef.current.style.opacity   = '1'
      }
      spawnTrail(x, y)
    }

    function onMouseDown(e: MouseEvent) {
      spawnTrail(e.clientX, e.clientY, true)
    }

    function onMouseLeave() {
      if (wandRef.current) wandRef.current.style.opacity = '0'
    }

    function onMouseEnter() {
      if (wandRef.current) wandRef.current.style.opacity = '1'
    }

    document.addEventListener('mousemove',  onMouseMove)
    document.addEventListener('mousedown',  onMouseDown)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.documentElement.classList.add('fairy-cursor')

    let rafId: number

    function tick() {
      ctx.clearRect(0, 0, w, h)

      trail.current = trail.current.filter(p => p.life > 0)

      for (const p of trail.current) {
        p.x   += p.vx
        p.y   += p.vy
        p.vy  += 0.025
        p.rot += p.rotV
        p.life -= p.decay
        p.opacity = p.life

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        if (p.type === 'star') drawTrailStar(ctx, p)
        else                   drawTrailOrb(ctx, p)
        ctx.restore()
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    function onResize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width  = w
      canvas.height = h
    }
    window.addEventListener('resize', onResize)

    // Store gold for cleanup-free access inside returned JSX
    void gold

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mousedown',  onMouseDown)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('resize', onResize)
      document.documentElement.classList.remove('fairy-cursor')
    }
  }, [])

  const gold = theme.colors.gold

  return (
    <>
      {/* Trail canvas — full viewport, above everything */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}
        aria-hidden="true"
      />

      {/* Wand SVG — star center aligns with cursor via JS offset */}
      <div
        ref={wandRef}
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          pointerEvents: 'none',
          zIndex:        9999,
          opacity:       0,
          transform:     'translate(-200px, -200px)',
          transition:    'opacity 0.15s',
          willChange:    'transform',
        }}
        aria-hidden="true"
      >
        <svg width="52" height="58" viewBox="0 0 52 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wand stick */}
          <line
            x1="13" y1="13" x2="50" y2="55"
            stroke={gold}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />

          {/* Outer glow — pulses via SVG animation */}
          <circle cx="8" cy="8" r="11" fill={gold} fillOpacity="0.12">
            <animate attributeName="r"           values="9;14;9"         dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="fillOpacity" values="0.12;0.05;0.12" dur="2.4s" repeatCount="indefinite" />
          </circle>

          {/* Mid glow */}
          <circle cx="8" cy="8" r="7" fill={gold} fillOpacity="0.22">
            <animate attributeName="r"           values="6;9;6"          dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="fillOpacity" values="0.22;0.10;0.22" dur="2.4s" repeatCount="indefinite" />
          </circle>

          {/* 4-pointed star — center (8,8), outer r=7, inner r=2 */}
          <path
            d="M8,1 L9.4,6.6 L15,8 L9.4,9.4 L8,15 L6.6,9.4 L1,8 L6.6,6.6 Z"
            fill={gold}
          />

          {/* Bright core */}
          <circle cx="8" cy="8" r="2" fill="#FFF8E7" />
        </svg>
      </div>
    </>
  )
}
