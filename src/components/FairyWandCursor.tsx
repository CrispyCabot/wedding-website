import { useEffect, useRef } from 'react'
import { theme } from '../config/theme'

// ─────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────
interface Point { x: number; y: number }

interface TrailParticle {
  x: number; y: number; size: number; color: string
  opacity: number; vx: number; vy: number
  rot: number; rotV: number; life: number; decay: number
  type: 'star' | 'orb'
}

interface FallingHeart {
  x: number; y: number; size: number
  speed: number; sway: number; swayPhase: number
  rot: number; rotV: number; opacity: number; emoji: string
}

// ─────────────────────────────────────────────────────────────
//  Trail particle helpers (same as before)
// ─────────────────────────────────────────────────────────────
function drawTrailStar(ctx: CanvasRenderingContext2D, p: TrailParticle) {
  const outer = p.size, inner = p.size * 0.24
  ctx.beginPath()
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4 - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
    else         ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
  }
  ctx.closePath()
  ctx.fillStyle = p.color
  ctx.fill()
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

function spawnTrailParticles(
  into: TrailParticle[],
  x: number, y: number,
  colors: string[],
  burst = false,
) {
  const count = burst ? 12 : 2 + Math.floor(Math.random() * 2)
  for (let i = 0; i < count; i++) {
    const isStar = Math.random() < 0.55
    into.push({
      x:     x + (Math.random() - 0.5) * (burst ? 20 : 10),
      y:     y + (Math.random() - 0.5) * (burst ? 20 : 10),
      size:  isStar ? 2 + Math.random() * 3.5 : 4 + Math.random() * (burst ? 10 : 6),
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      vx:    (Math.random() - 0.5) * (burst ? 2.2 : 1.2),
      vy:    -(0.4 + Math.random() * (burst ? 2.2 : 1.2)),
      rot:   Math.random() * Math.PI * 2,
      rotV:  (Math.random() - 0.5) * 0.18,
      life:  1,
      decay: burst
        ? 0.016 + Math.random() * 0.022
        : 0.024 + Math.random() * 0.032,
      type: isStar ? 'star' : 'orb',
    })
  }
}

// ─────────────────────────────────────────────────────────────
//  Draw stroke (while holding click)
// ─────────────────────────────────────────────────────────────
//  Draw stroke as sparkle dots spaced by travel distance
// ─────────────────────────────────────────────────────────────
const SPARKLE_SPACING = 9   // px of path travel between each sparkle

function drawSparkleStroke(
  ctx: CanvasRenderingContext2D,
  pts: Point[],
  colors: string[],
  gold: string,
  alpha: number,
) {
  if (pts.length < 2) return

  const n = pts.length
  let accumulated = 0
  let sparkleIndex = 0  // counts how many sparkles we've placed (for deterministic rotation)

  for (let i = 1; i < n; i++) {
    const dx = pts[i].x - pts[i - 1].x
    const dy = pts[i].y - pts[i - 1].y
    accumulated += Math.sqrt(dx * dx + dy * dy)

    if (accumulated < SPARKLE_SPACING) continue
    accumulated = 0

    // Age: 0 = newest point (end of array), 1 = oldest (start)
    const age       = 1 - i / n
    const pointAlpha = alpha * (1 - age * 0.72)
    if (pointAlpha < 0.02) { sparkleIndex++; continue }

    const { x, y } = pts[i]

    // Recent points → gold; older → cycle through theme colors
    const color = age < 0.25
      ? gold
      : colors[sparkleIndex % colors.length]

    // Alternate between 4-pointed stars and soft orbs
    const isStar = sparkleIndex % 3 !== 2
    const size   = isStar
      ? 2.2 + (1 - age) * 3.2
      : 3.5 + (1 - age) * 5.5

    // Deterministic rotation that slowly drifts along the path
    const rot = sparkleIndex * 0.61803   // golden-ratio step

    ctx.save()
    ctx.globalAlpha = pointAlpha
    ctx.translate(x, y)

    if (isStar) {
      ctx.rotate(rot)
      const outer = size, inner = size * 0.24
      ctx.beginPath()
      for (let j = 0; j < 8; j++) {
        const a = (j * Math.PI) / 4 - Math.PI / 2
        const r = j % 2 === 0 ? outer : inner
        if (j === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
        else         ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
    } else {
      // Soft glowing orb
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
      grd.addColorStop(0,   color + 'EE')
      grd.addColorStop(0.4, color + '88')
      grd.addColorStop(1,   color + '00')
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(0, 0, size, 0, Math.PI * 2)
      ctx.fill()
    }

    // Glow halo around every sparkle
    ctx.globalAlpha = pointAlpha * 0.38
    const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.8)
    halo.addColorStop(0, color + '55')
    halo.addColorStop(1, color + '00')
    ctx.fillStyle = halo
    ctx.beginPath()
    ctx.arc(0, 0, size * 2.8, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
    sparkleIndex++
  }
}

// ─────────────────────────────────────────────────────────────
//  Heart detection
// ─────────────────────────────────────────────────────────────
const MIN_STROKE_PTS  = 25
const MIN_BBOX_PX     = 65   // each dimension

function detectHeart(raw: Point[]): boolean {
  if (raw.length < MIN_STROKE_PTS) return false

  const xs = raw.map(p => p.x)
  const ys = raw.map(p => p.y)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  const W = maxX - minX, H = maxY - minY

  if (W < MIN_BBOX_PX || H < MIN_BBOX_PX) return false

  // Aspect ratio — hearts are roughly square
  const ratio = W / H
  if (ratio < 0.45 || ratio > 2.2) return false

  // Normalise to [0, 1]
  const pts = raw.map(p => ({ x: (p.x - minX) / W, y: (p.y - minY) / H }))

  // Top bimodality: top 38 % of height should have points on both left & right
  const topPts = pts.filter(p => p.y < 0.38)
  if (topPts.length < 6) return false

  const leftTop  = topPts.filter(p => p.x < 0.46).length
  const rightTop = topPts.filter(p => p.x > 0.54).length
  if (leftTop < 3 || rightTop < 3) return false

  // Centre dip: middle-top band (x: 0.25–0.75, y < 0.22) should exist but
  // the very tippy-top of each side (y < 0.12) must have left & right coverage
  const tippyLeft  = pts.filter(p => p.y < 0.14 && p.x < 0.48).length
  const tippyRight = pts.filter(p => p.y < 0.14 && p.x > 0.52).length
  if (tippyLeft < 2 || tippyRight < 2) return false

  // Bottom convergence: bottom 25 % narrower than 60 % of total width
  const btmPts = pts.filter(p => p.y > 0.75)
  if (btmPts.length < 3) return false
  const btmXs   = btmPts.map(p => p.x)
  const btmW    = Math.max(...btmXs) - Math.min(...btmXs)
  if (btmW > 0.62) return false

  // Bottom centre must be near horizontal middle
  const btmCx = (Math.max(...btmXs) + Math.min(...btmXs)) / 2
  if (btmCx < 0.22 || btmCx > 0.78) return false

  return true
}

// ─────────────────────────────────────────────────────────────
//  Heart emoji rain spell
// ─────────────────────────────────────────────────────────────
const HEART_EMOJIS = ['❤️', '💕', '💗', '💓', '💖', '💝', '🩷', '💞']

function triggerHeartSpell(into: FallingHeart[], w: number) {
  const count = 35 + Math.floor(Math.random() * 20)
  for (let i = 0; i < count; i++) {
    into.push({
      x:         Math.random() * w,
      y:         -30 - Math.random() * 300,
      size:      18 + Math.random() * 28,
      speed:     1.4 + Math.random() * 2.2,
      sway:      0.6 + Math.random() * 1.0,
      swayPhase: Math.random() * Math.PI * 2,
      rot:       (Math.random() - 0.5) * 0.5,
      rotV:      (Math.random() - 0.5) * 0.03,
      opacity:   0.75 + Math.random() * 0.25,
      emoji:     HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    })
  }
}

// ─────────────────────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────────────────────
export default function FairyWandCursor() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const wandRef      = useRef<HTMLDivElement>(null)
  const trail        = useRef<TrailParticle[]>([])
  const hearts       = useRef<FallingHeart[]>([])
  const strokePts    = useRef<Point[]>([])
  const fadingPts    = useRef<Point[]>([])   // stroke snapshot fading out after release
  const fadeAlpha    = useRef(0)             // current opacity of fading stroke
  const drawing      = useRef(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    const colors = theme.particles.colors
    const gold   = theme.colors.gold

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width  = w
    canvas.height = h

    const STAR_X = 8, STAR_Y = 8

    // ── Event handlers ──────────────────────────────────────

    function setWandPos(x: number, y: number, isDown: boolean) {
      if (!wandRef.current) return
      wandRef.current.style.transform  = `translate(${x - STAR_X}px, ${y - STAR_Y}px) scale(${isDown ? 1.25 : 1})`
      wandRef.current.style.filter     = isDown
        ? `brightness(1.6) drop-shadow(0 0 8px ${gold})`
        : ''
      wandRef.current.style.opacity    = '1'
    }

    function onMouseMove(e: MouseEvent) {
      const { clientX: x, clientY: y } = e
      setWandPos(x, y, drawing.current)
      spawnTrailParticles(trail.current, x, y, colors, false)
      if (drawing.current) {
        strokePts.current.push({ x, y })
        if (strokePts.current.length > 600) strokePts.current.shift()
      }
    }

    function onMouseDown(e: MouseEvent) {
      if (e.button !== 0) return
      drawing.current  = true
      strokePts.current = [{ x: e.clientX, y: e.clientY }]
      fadingPts.current = []
      fadeAlpha.current = 0
      setWandPos(e.clientX, e.clientY, true)
      spawnTrailParticles(trail.current, e.clientX, e.clientY, colors, true)
    }

    function onMouseUp(e: MouseEvent) {
      if (e.button !== 0 || !drawing.current) return
      drawing.current = false
      setWandPos(e.clientX, e.clientY, false)

      const pts = strokePts.current.slice()
      strokePts.current = []

      if (detectHeart(pts)) {
        // Spell success — burst at bounding box centre
        const xs  = pts.map(p => p.x), ys = pts.map(p => p.y)
        const cx  = (Math.min(...xs) + Math.max(...xs)) / 2
        const cy  = (Math.min(...ys) + Math.max(...ys)) / 2
        for (let i = 0; i < 5; i++) spawnTrailParticles(trail.current, cx, cy, colors, true)
        triggerHeartSpell(hearts.current, w)
        fadingPts.current = []  // clear the stroke immediately on success
        fadeAlpha.current = 0
      } else {
        // Fade the stroke out gently on no-match
        fadingPts.current = pts
        fadeAlpha.current = 0.65
      }
    }

    function onMouseLeave() {
      drawing.current = false
      if (wandRef.current) wandRef.current.style.opacity = '0'
    }

    function onMouseEnter() {
      if (wandRef.current) wandRef.current.style.opacity = '1'
    }

    document.addEventListener('mousemove',  onMouseMove)
    document.addEventListener('mousedown',  onMouseDown)
    document.addEventListener('mouseup',    onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    document.documentElement.classList.add('fairy-cursor')

    // ── Animation loop ──────────────────────────────────────
    let rafId: number

    function tick() {
      ctx.clearRect(0, 0, w, h)

      // 1. Fading stroke (after unrecognised release)
      if (fadeAlpha.current > 0) {
        drawSparkleStroke(ctx, fadingPts.current, colors, gold, fadeAlpha.current)
        fadeAlpha.current = Math.max(0, fadeAlpha.current - 0.018)
        if (fadeAlpha.current === 0) fadingPts.current = []
      }

      // 2. Live stroke (while holding)
      if (drawing.current && strokePts.current.length > 1) {
        drawSparkleStroke(ctx, strokePts.current, colors, gold, 0.72)
      }

      // 3. Trail particles
      trail.current = trail.current.filter(p => p.life > 0)
      for (const p of trail.current) {
        p.x   += p.vx
        p.y   += p.vy
        p.vy  += 0.025
        p.rot += p.rotV
        p.life  -= p.decay
        p.opacity = p.life
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        if (p.type === 'star') drawTrailStar(ctx, p)
        else                   drawTrailOrb(ctx, p)
        ctx.restore()
      }

      // 4. Falling hearts spell
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      hearts.current = hearts.current.filter(fh => fh.y < h + 80)
      for (const heart of hearts.current) {
        heart.swayPhase += 0.025
        heart.x          += Math.sin(heart.swayPhase) * heart.sway
        heart.y          += heart.speed
        heart.rot        += heart.rotV
        ctx.save()
        ctx.globalAlpha = heart.opacity
        ctx.translate(heart.x, heart.y)
        ctx.rotate(heart.rot)
        ctx.font = `${heart.size}px serif`
        ctx.fillText(heart.emoji, 0, 0)
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

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mousedown',  onMouseDown)
      document.removeEventListener('mouseup',    onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('resize', onResize)
      document.documentElement.classList.remove('fairy-cursor')
    }
  }, [])

  const gold = theme.colors.gold

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}
        aria-hidden="true"
      />
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
          transition:    'opacity 0.15s, filter 0.1s',
          willChange:    'transform',
        }}
        aria-hidden="true"
      >
        <svg width="52" height="58" viewBox="0 0 52 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="13" y1="13" x2="50" y2="55" stroke={gold} strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.85" />
          <circle cx="8" cy="8" r="11" fill={gold} fillOpacity="0.12">
            <animate attributeName="r"           values="9;14;9"         dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="fillOpacity" values="0.12;0.05;0.12" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="8" cy="8" r="7" fill={gold} fillOpacity="0.22">
            <animate attributeName="r"           values="6;9;6"          dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="fillOpacity" values="0.22;0.10;0.22" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <path d="M8,1 L9.4,6.6 L15,8 L9.4,9.4 L8,15 L6.6,9.4 L1,8 L6.6,6.6 Z" fill={gold} />
          <circle cx="8" cy="8" r="2" fill="#FFF8E7" />
        </svg>
      </div>
    </>
  )
}
