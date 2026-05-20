import { useRef, useState, useEffect } from 'react'
import { theme } from '../config/theme'
import {
  type TrailParticle, type FallingHeart, type BurstEmoji, type Point,
  spawnTrailParticles, drawSparkleStroke,
  detectHeart, triggerHeartSpell,
  detectStar, triggerStarSpell,
  detectCircle, triggerCircleSpell,
  detectInfinity, triggerInfinitySpell,
  tickTrail, tickHearts, tickBurst,
} from './spellUtils'

export default function MobileSpellCaster() {
  const [active, setActive] = useState(false)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const trail       = useRef<TrailParticle[]>([])
  const hearts      = useRef<FallingHeart[]>([])
  const burst       = useRef<BurstEmoji[]>([])
  const strokePts   = useRef<Point[]>([])
  const fadingPts   = useRef<Point[]>([])
  const fadeAlpha   = useRef(0)
  const isDrawing   = useRef(false)

  const colors = theme.particles.colors
  const gold   = theme.colors.gold

  // ── Spell-mode lifecycle ──────────────────────────────────
  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    // Reset all state from any previous session
    trail.current     = []
    hearts.current    = []
    burst.current     = []
    strokePts.current = []
    fadingPts.current = []
    fadeAlpha.current = 0
    isDrawing.current = false

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width  = w
    canvas.height = h
    document.body.style.overflow   = 'hidden'
    document.body.style.touchAction = 'none'

    // ── Touch handlers (passive:false to allow preventDefault) ──
    function onTouchStart(e: TouchEvent) {
      e.preventDefault()
      const t = e.touches[0]
      isDrawing.current = true
      strokePts.current = [{ x: t.clientX, y: t.clientY }]
      fadingPts.current = []
      fadeAlpha.current = 0
      spawnTrailParticles(trail.current, t.clientX, t.clientY, colors, true)
    }

    function onTouchMove(e: TouchEvent) {
      e.preventDefault()
      if (!isDrawing.current) return
      const t = e.touches[0]
      strokePts.current.push({ x: t.clientX, y: t.clientY })
      if (strokePts.current.length > 600) strokePts.current.shift()
      spawnTrailParticles(trail.current, t.clientX, t.clientY, colors, false)
    }

    function onTouchEnd(e: TouchEvent) {
      e.preventDefault()
      if (!isDrawing.current) return
      isDrawing.current = false

      const pts = strokePts.current.slice()
      strokePts.current = []

      console.log('[spell] stroke points:', JSON.stringify(pts))

      const xs = pts.map(p => p.x), ys = pts.map(p => p.y)
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2
      const cy = (Math.min(...ys) + Math.max(...ys)) / 2

      if (detectHeart(pts)) {
        for (let i = 0; i < 5; i++) spawnTrailParticles(trail.current, cx, cy, colors, true)
        triggerHeartSpell(hearts.current, w)
        fadingPts.current = []
        fadeAlpha.current = 0
      } else if (detectStar(pts)) {
        for (let i = 0; i < 5; i++) spawnTrailParticles(trail.current, cx, cy, colors, true)
        triggerStarSpell(hearts.current, w)
        fadingPts.current = []
        fadeAlpha.current = 0
      } else if (detectCircle(pts)) {
        for (let i = 0; i < 5; i++) spawnTrailParticles(trail.current, cx, cy, colors, true)
        triggerCircleSpell(burst.current, cx, cy)
        fadingPts.current = []
        fadeAlpha.current = 0
      } else if (detectInfinity(pts)) {
        for (let i = 0; i < 5; i++) spawnTrailParticles(trail.current, cx, cy, colors, true)
        triggerInfinitySpell(burst.current, w, h)
        fadingPts.current = []
        fadeAlpha.current = 0
      } else {
        fadingPts.current = pts
        fadeAlpha.current = 0.65
      }
    }

    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false })
    canvas.addEventListener('touchend',   onTouchEnd,   { passive: false })

    // ── Animation loop ──────────────────────────────────────
    let rafId: number
    function tick() {
      ctx.clearRect(0, 0, w, h)

      if (fadeAlpha.current > 0) {
        drawSparkleStroke(ctx, fadingPts.current, colors, gold, fadeAlpha.current)
        fadeAlpha.current = Math.max(0, fadeAlpha.current - 0.018)
        if (fadeAlpha.current === 0) fadingPts.current = []
      }

      if (isDrawing.current && strokePts.current.length > 1)
        drawSparkleStroke(ctx, strokePts.current, colors, gold, 0.72)

      trail.current  = tickTrail(ctx, trail.current)
      hearts.current = tickHearts(ctx, hearts.current, h)
      burst.current  = tickBurst(ctx, burst.current)

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    function onResize() {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w; canvas.height = h
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove',  onTouchMove)
      canvas.removeEventListener('touchend',   onTouchEnd)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow    = ''
      document.body.style.touchAction = ''
    }
  }, [active])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Button — only visible on touch devices via CSS */}
      <button
        className={`mobile-spell-btn${active ? ' mobile-spell-btn--back' : ''}`}
        onClick={() => setActive(a => !a)}
        aria-label={active ? 'Exit spell mode' : 'Enter spell drawing mode'}
      >
        {active ? '← Back' : 'Cast A Spell ✨'}
      </button>

      {/* Drawing canvas — full-screen overlay, only when active */}
      {active && (
        <canvas
          ref={canvasRef}
          style={{
            position:      'fixed',
            inset:         0,
            width:         '100%',
            height:        '100%',
            zIndex:        140,
            touchAction:   'none',
            display:       'block',
          }}
          aria-hidden="true"
        />
      )}
    </>
  )
}
