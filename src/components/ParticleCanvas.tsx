import { useEffect, useRef } from 'react'
import { theme } from '../config/theme'

type PType = 'sparkle' | 'petal' | 'orb'

interface Particle {
  x: number
  y: number
  size: number
  color: string
  type: PType
  opacity: number
  targetOpacity: number
  vx: number
  vy: number
  rot: number
  rotV: number
  oscPhase: number
  oscSpeed: number
  oscAmp: number
  twinklePhase: number
  twinkleSpeed: number
}

function makeParticle(w: number, h: number, colors: string[], randomY = true): Particle {
  const roll = Math.random()
  const type: PType = roll < 0.42 ? 'sparkle' : roll < 0.70 ? 'petal' : 'orb'
  const color = colors[Math.floor(Math.random() * colors.length)]

  let size: number, vx: number, vy: number, targetOpacity: number

  switch (type) {
    case 'sparkle':
      size          = 2.5 + Math.random() * 4.5
      vx            = (Math.random() - 0.5) * 0.35
      vy            = -0.12 - Math.random() * 0.22
      targetOpacity = 0.55 + Math.random() * 0.45
      break
    case 'petal':
      size          = 5 + Math.random() * 9
      vx            = (Math.random() - 0.5) * 0.45
      vy            = 0.22 + Math.random() * 0.38
      targetOpacity = 0.30 + Math.random() * 0.32
      break
    default: // orb
      size          = 12 + Math.random() * 20
      vx            = (Math.random() - 0.5) * 0.18
      vy            = -0.10 - Math.random() * 0.18
      targetOpacity = 0.05 + Math.random() * 0.11
  }

  return {
    x:             Math.random() * w,
    y:             randomY ? Math.random() * h : (type === 'petal' ? -size : h + size),
    size,
    color,
    type,
    opacity:       0,
    targetOpacity,
    vx,
    vy,
    rot:           Math.random() * Math.PI * 2,
    rotV:          (Math.random() - 0.5) * 0.022,
    oscPhase:      Math.random() * Math.PI * 2,
    oscSpeed:      0.006 + Math.random() * 0.010,
    oscAmp:        0.4 + Math.random() * 0.7,
    twinklePhase:  Math.random() * Math.PI * 2,
    twinkleSpeed:  0.018 + Math.random() * 0.030,
  }
}

function drawSparkle(ctx: CanvasRenderingContext2D, p: Particle) {
  const { x, y, size, color, opacity } = p
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.translate(x, y)
  ctx.rotate(p.rot)

  // 4-pointed star
  const outer = size
  const inner = size * 0.22
  ctx.beginPath()
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
    else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
  }
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()

  // soft glow halo
  const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.2)
  grd.addColorStop(0, color + '55')
  grd.addColorStop(1, color + '00')
  ctx.globalAlpha = opacity * 0.6
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.arc(0, 0, size * 2.2, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Particle) {
  const { x, y, size, color, opacity } = p
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.translate(x, y)
  ctx.rotate(p.rot)
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.ellipse(0, 0, size * 0.42, size, 0, 0, Math.PI * 2)
  ctx.fill()

  // subtle highlight
  ctx.globalAlpha = opacity * 0.25
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.ellipse(-size * 0.1, -size * 0.25, size * 0.15, size * 0.35, -0.3, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function drawOrb(ctx: CanvasRenderingContext2D, p: Particle) {
  const { x, y, size, color, opacity } = p
  ctx.save()
  const grd = ctx.createRadialGradient(x, y, 0, x, y, size)
  grd.addColorStop(0,   color + 'DD')
  grd.addColorStop(0.3, color + '88')
  grd.addColorStop(1,   color + '00')
  ctx.globalAlpha = opacity
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!theme.particles.enabled) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const { count, colors } = theme.particles

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width  = w
    canvas.height = h

    const particles: Particle[] = Array.from({ length: count }, () =>
      makeParticle(w, h, colors, true)
    )

    const startTime = performance.now()
    const FADE_IN_MS = 2200
    let rafId: number

    function tick(now: number) {
      const elapsed = now - startTime
      const globalFade = Math.min(elapsed / FADE_IN_MS, 1)

      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        // Drift movement
        p.x  += p.vx + Math.sin(p.oscPhase) * p.oscAmp * 0.012
        p.y  += p.vy
        p.rot += p.rotV
        p.oscPhase     += p.oscSpeed
        p.twinklePhase += p.twinkleSpeed

        // Twinkle: modulate opacity around the target
        const twinkle = p.type === 'sparkle'
          ? 0.25 * Math.sin(p.twinklePhase)
          : 0.08 * Math.sin(p.twinklePhase)
        p.opacity = Math.max(0, (p.targetOpacity + twinkle) * globalFade)

        // Wrap / respawn at edges
        if (p.type === 'petal') {
          if (p.y > h + p.size)  { Object.assign(p, makeParticle(w, h, colors, false)); p.y = -p.size }
          if (p.x < -p.size * 2) p.x = w + p.size
          if (p.x > w + p.size * 2) p.x = -p.size
        } else {
          if (p.y < -p.size * 3) { Object.assign(p, makeParticle(w, h, colors, false)); p.y = h + p.size }
          if (p.x < -p.size * 2) p.x = w + p.size
          if (p.x > w + p.size * 2) p.x = -p.size
        }

        // Draw
        if      (p.type === 'sparkle') drawSparkle(ctx, p)
        else if (p.type === 'petal')   drawPetal(ctx, p)
        else                           drawOrb(ctx, p)
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
      window.removeEventListener('resize', onResize)
    }
  }, [])

  if (!theme.particles.enabled) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
      aria-hidden="true"
    />
  )
}
