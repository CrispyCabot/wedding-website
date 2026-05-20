import { useEffect, useRef } from 'react'
import { theme } from '../config/theme'
import {
  type TrailParticle, type FallingHeart,
  drawTrailStar, drawTrailOrb,
  spawnTrailParticles, drawSparkleStroke,
  detectHeart, triggerHeartSpell,
  tickTrail, tickHearts,
} from './spellUtils'

export default function FairyWandCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wandRef   = useRef<HTMLDivElement>(null)
  const trail     = useRef<TrailParticle[]>([])
  const hearts    = useRef<FallingHeart[]>([])
  const strokePts = useRef<{ x: number; y: number }[]>([])
  const fadingPts = useRef<{ x: number; y: number }[]>([])
  const fadeAlpha = useRef(0)
  const drawing   = useRef(false)

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

    function setWandPos(x: number, y: number, isDown: boolean) {
      if (!wandRef.current) return
      wandRef.current.style.transform = `translate(${x - STAR_X}px, ${y - STAR_Y}px) scale(${isDown ? 1.25 : 1})`
      wandRef.current.style.filter    = isDown ? `brightness(1.6) drop-shadow(0 0 8px ${gold})` : ''
      wandRef.current.style.opacity   = '1'
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
      drawing.current   = true
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
        const xs = pts.map(p => p.x), ys = pts.map(p => p.y)
        const cx = (Math.min(...xs) + Math.max(...xs)) / 2
        const cy = (Math.min(...ys) + Math.max(...ys)) / 2
        for (let i = 0; i < 5; i++) spawnTrailParticles(trail.current, cx, cy, colors, true)
        triggerHeartSpell(hearts.current, w)
        fadingPts.current = []
        fadeAlpha.current = 0
      } else {
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

    let rafId: number
    function tick() {
      ctx.clearRect(0, 0, w, h)

      if (fadeAlpha.current > 0) {
        drawSparkleStroke(ctx, fadingPts.current, colors, gold, fadeAlpha.current)
        fadeAlpha.current = Math.max(0, fadeAlpha.current - 0.018)
        if (fadeAlpha.current === 0) fadingPts.current = []
      }

      if (drawing.current && strokePts.current.length > 1)
        drawSparkleStroke(ctx, strokePts.current, colors, gold, 0.72)

      trail.current  = tickTrail(ctx, trail.current)
      hearts.current = tickHearts(ctx, hearts.current, h)

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
      document.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mousedown',  onMouseDown)
      document.removeEventListener('mouseup',    onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('resize', onResize)
      document.documentElement.classList.remove('fairy-cursor')
    }
  }, [])

  // Suppress unused import warning — these are re-exported via spellUtils
  void drawTrailStar; void drawTrailOrb

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
          position: 'fixed', top: 0, left: 0,
          pointerEvents: 'none', zIndex: 9999,
          opacity: 0, transform: 'translate(-200px,-200px)',
          transition: 'opacity 0.15s, filter 0.1s',
          willChange: 'transform',
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
