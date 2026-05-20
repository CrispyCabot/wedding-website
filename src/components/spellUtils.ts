// ─────────────────────────────────────────────────────────────
//  Shared spell utilities — used by FairyWandCursor (desktop)
//  and MobileSpellCaster (touch).
// ─────────────────────────────────────────────────────────────

export interface Point { x: number; y: number }

export interface TrailParticle {
  x: number; y: number; size: number; color: string
  opacity: number; vx: number; vy: number
  rot: number; rotV: number; life: number; decay: number
  type: 'star' | 'orb'
}

export interface FallingHeart {
  x: number; y: number; size: number
  speed: number; sway: number; swayPhase: number
  rot: number; rotV: number; opacity: number; emoji: string
}

// ── Trail particle drawing ────────────────────────────────────

export function drawTrailStar(ctx: CanvasRenderingContext2D, p: TrailParticle) {
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

export function drawTrailOrb(ctx: CanvasRenderingContext2D, p: TrailParticle) {
  const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
  grd.addColorStop(0,   p.color + 'EE')
  grd.addColorStop(0.4, p.color + '66')
  grd.addColorStop(1,   p.color + '00')
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.arc(0, 0, p.size, 0, Math.PI * 2)
  ctx.fill()
}

export function spawnTrailParticles(
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
      decay: burst ? 0.016 + Math.random() * 0.022 : 0.024 + Math.random() * 0.032,
      type:  isStar ? 'star' : 'orb',
    })
  }
}

// ── Sparkle stroke drawing ────────────────────────────────────

const SPARKLE_SPACING = 9

export function drawSparkleStroke(
  ctx: CanvasRenderingContext2D,
  pts: Point[],
  colors: string[],
  gold: string,
  alpha: number,
) {
  if (pts.length < 2) return

  const n = pts.length
  let accumulated = 0
  let sparkleIndex = 0

  for (let i = 1; i < n; i++) {
    const dx = pts[i].x - pts[i - 1].x
    const dy = pts[i].y - pts[i - 1].y
    accumulated += Math.sqrt(dx * dx + dy * dy)
    if (accumulated < SPARKLE_SPACING) continue
    accumulated = 0

    const age        = 1 - i / n
    const pointAlpha = alpha * (1 - age * 0.72)
    if (pointAlpha < 0.02) { sparkleIndex++; continue }

    const { x, y } = pts[i]
    const color     = age < 0.25 ? gold : colors[sparkleIndex % colors.length]
    const isStar    = sparkleIndex % 3 !== 2
    const size      = isStar ? 2.2 + (1 - age) * 3.2 : 3.5 + (1 - age) * 5.5
    const rot       = sparkleIndex * 0.61803

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
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
      grd.addColorStop(0,   color + 'EE')
      grd.addColorStop(0.4, color + '88')
      grd.addColorStop(1,   color + '00')
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(0, 0, size, 0, Math.PI * 2)
      ctx.fill()
    }

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

// ── Heart detection ───────────────────────────────────────────

const MIN_STROKE_PTS = 25
const MIN_BBOX_PX    = 65

export function detectHeart(raw: Point[]): boolean {
  if (raw.length < MIN_STROKE_PTS) return false

  const xs = raw.map(p => p.x)
  const ys = raw.map(p => p.y)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  const W = maxX - minX, H = maxY - minY

  if (W < MIN_BBOX_PX || H < MIN_BBOX_PX) return false

  const ratio = W / H
  if (ratio < 0.45 || ratio > 2.2) return false

  const pts = raw.map(p => ({ x: (p.x - minX) / W, y: (p.y - minY) / H }))

  const topPts   = pts.filter(p => p.y < 0.38)
  if (topPts.length < 6) return false

  if (topPts.filter(p => p.x < 0.46).length < 3) return false
  if (topPts.filter(p => p.x > 0.54).length < 3) return false

  if (pts.filter(p => p.y < 0.14 && p.x < 0.48).length < 2) return false
  if (pts.filter(p => p.y < 0.14 && p.x > 0.52).length < 2) return false

  const btmPts = pts.filter(p => p.y > 0.75)
  if (btmPts.length < 3) return false

  const btmXs = btmPts.map(p => p.x)
  const btmW   = Math.max(...btmXs) - Math.min(...btmXs)
  if (btmW > 0.62) return false

  const btmCx = (Math.max(...btmXs) + Math.min(...btmXs)) / 2
  if (btmCx < 0.22 || btmCx > 0.78) return false

  return true
}

// ── Star detection ───────────────────────────────────────────

function sampleEvenly(pts: Point[], n: number): Point[] {
  if (pts.length <= n) return pts
  return Array.from({ length: n }, (_, i) =>
    pts[Math.round((i / (n - 1)) * (pts.length - 1))]
  )
}

export function detectStar(raw: Point[]): boolean {
  if (raw.length < MIN_STROKE_PTS) return false

  const xs = raw.map(p => p.x), ys = raw.map(p => p.y)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  const W = maxX - minX, H = maxY - minY

  if (W < MIN_BBOX_PX || H < MIN_BBOX_PX) return false

  const ratio = W / H
  if (ratio < 0.5 || ratio > 2.0) return false

  // Normalise to [0,1]
  const pts = raw.map(p => ({ x: (p.x - minX) / W, y: (p.y - minY) / H }))

  // Closure: first and last point must be reasonably close
  const dx = pts[0].x - pts[pts.length - 1].x
  const dy = pts[0].y - pts[pts.length - 1].y
  if (Math.sqrt(dx * dx + dy * dy) > 0.52) return false

  // Centroid
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length

  // Distance of each point from centroid
  const dists = pts.map(p => Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2))
  const maxDist = Math.max(...dists)
  if (maxDist < 0.28) return false   // star must reach reasonably far from centre

  // "Tip" points (distance > 58 % of max) must cover at least 4 of 5 angular sectors
  const tipThreshold = maxDist * 0.58
  const tipAngles = pts
    .filter((_, i) => dists[i] > tipThreshold)
    .map(p => {
      const a = Math.atan2(p.y - cy, p.x - cx) * (180 / Math.PI)
      return a < 0 ? a + 360 : a
    })
  const occupiedSectors = new Set(tipAngles.map(a => Math.floor(a / 72)))
  if (occupiedSectors.size < 4) return false

  // Count sharp direction reversals (> 90°) in a sampled subset
  // A 5-pointed star drawn as a single stroke produces ~5 inner-corner reversals
  const sampled = sampleEvenly(pts, 44)
  let sharpTurns = 0
  for (let i = 1; i < sampled.length - 1; i++) {
    const dx1 = sampled[i].x - sampled[i-1].x, dy1 = sampled[i].y - sampled[i-1].y
    const dx2 = sampled[i+1].x - sampled[i].x, dy2 = sampled[i+1].y - sampled[i].y
    const l1 = Math.sqrt(dx1*dx1 + dy1*dy1), l2 = Math.sqrt(dx2*dx2 + dy2*dy2)
    if (l1 < 0.005 || l2 < 0.005) continue
    const dot = (dx1*dx2 + dy1*dy2) / (l1 * l2)
    const angle = Math.acos(Math.max(-1, Math.min(1, dot))) * 180 / Math.PI
    if (angle > 90) sharpTurns++
  }
  if (sharpTurns < 3 || sharpTurns > 14) return false

  return true
}

// ── Heart emoji rain ──────────────────────────────────────────

const HEART_EMOJIS = ['❤️', '💕', '💗', '💓', '💖', '💝', '🩷', '💞']

export function triggerHeartSpell(into: FallingHeart[], w: number) {
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

// ── Star / sparkle emoji rain ─────────────────────────────────

const STAR_EMOJIS = ['⭐', '🌟', '✨', '💫', '🌠', '✨', '⭐', '🌟', '💥', '🔮']

export function triggerStarSpell(into: FallingHeart[], w: number) {
  const count = 35 + Math.floor(Math.random() * 20)
  for (let i = 0; i < count; i++) {
    into.push({
      x:         Math.random() * w,
      y:         -30 - Math.random() * 300,
      size:      20 + Math.random() * 30,
      speed:     1.2 + Math.random() * 2.0,
      sway:      0.5 + Math.random() * 0.8,
      swayPhase: Math.random() * Math.PI * 2,
      rot:       (Math.random() - 0.5) * 0.6,
      rotV:      (Math.random() - 0.5) * 0.04,
      opacity:   0.78 + Math.random() * 0.22,
      emoji:     STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)],
    })
  }
}

// ── Tick helpers (shared animation-loop logic) ────────────────

export function tickTrail(
  ctx: CanvasRenderingContext2D,
  trail: TrailParticle[],
): TrailParticle[] {
  const alive = trail.filter(p => p.life > 0)
  for (const p of alive) {
    p.x   += p.vx; p.y += p.vy; p.vy += 0.025
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
  return alive
}

export function tickHearts(
  ctx: CanvasRenderingContext2D,
  hearts: FallingHeart[],
  h: number,
): FallingHeart[] {
  const alive = hearts.filter(fh => fh.y < h + 80)
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  for (const heart of alive) {
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
  return alive
}
