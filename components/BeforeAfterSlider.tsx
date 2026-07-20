'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export interface BeforeAfterSliderProps {
  before: string
  after: string
  title: string
  /**
   * When true the "before" image is rendered with a grayscale + blur CSS filter as a
   * visual stand-in until a real AI-generated "before" photo is placed at the `before`
   * path.  Set to false once the real image file is present.
   */
  beforeIsPlaceholder?: boolean
}

/**
 * Interactive before/after comparison slider.
 *
 * Drag (mouse, touch, pointer) or use the Left/Right arrow keys to move the
 * handle and reveal more or less of the "before" vs "after" image.
 */
export default function BeforeAfterSlider({
  before,
  after,
  title,
  beforeIsPlaceholder = false,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const clamp = (v: number) => Math.min(100, Math.max(0, v))

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    updatePosition(e.clientX)
  }

  const onPointerUp = () => {
    isDragging.current = false
  }

  // Keyboard accessibility: Left/Right arrow keys nudge the handle
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 5
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPosition((p) => clamp(p - step))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPosition((p) => clamp(p + step))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {beforeIsPlaceholder && (
        <p id={`before-notice-${title.replace(/\s+/g, '-')}`} className="sr-only">
          The "before" image is a visual placeholder using a grayscale and blur filter on the same
          photo as the "after" image. A real AI-generated before photo will replace it later.
        </p>
      )}
      {/* Comparison area */}
      <div
        ref={containerRef}
        role="slider"
        aria-label={`Before and after comparison for ${title}. Use left/right arrow keys to adjust.`}
        aria-describedby={
          beforeIsPlaceholder ? `before-notice-${title.replace(/\s+/g, '-')}` : undefined
        }
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg cursor-col-resize select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        {/* After image — full width baseline */}
        <Image
          src={after}
          alt={`${title} — after renovation`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Before image — clipped to slider position via clip-path (no width-calculation needed).
            TEMPORARY PLACEHOLDER: the "before" path currently points to the same
            "after" photo rendered through a grayscale/blur filter.  Once a real
            AI-generated "before" file is placed at public/portfolio/before-ai/<name>.jpg,
            set beforeIsPlaceholder=false to remove the filter. */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
            filter: beforeIsPlaceholder
              ? 'grayscale(100%) contrast(0.75) blur(1px) brightness(0.9)'
              : 'none',
          }}
        >
          <Image
            src={before}
            alt={`${title} — before renovation${beforeIsPlaceholder ? ' (placeholder)' : ''}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
          style={{ left: `${position}%` }}
        >
          {/* Drag handle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2.5 shadow-lg flex items-center gap-0.5">
            <ChevronLeftIcon />
            <ChevronRightIcon />
          </div>
        </div>

        {/* Corner labels */}
        <span className="absolute top-3 left-3 font-serif text-xs px-2 py-1 rounded bg-charcoal/70 text-warm-white pointer-events-none">
          {beforeIsPlaceholder ? 'Before (placeholder)' : 'Before'}
        </span>
        <span className="absolute top-3 right-3 font-serif text-xs px-2 py-1 rounded bg-charcoal/70 text-warm-white pointer-events-none">
          After
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-serif font-bold text-charcoal mt-4">{title}</h3>

      {/* Placeholder notice */}
      {beforeIsPlaceholder && (
        <p className="text-xs text-gray-400 mt-1">
          {/* TODO: drop the real AI-generated "before" image into public/portfolio/before-ai/ and set beforeIsPlaceholder=false */}
          "Before" is a placeholder — see <code>public/portfolio/before-ai/README.md</code>
        </p>
      )}
    </motion.div>
  )
}

// Minimal inline arrow icons to avoid extra imports
function ChevronLeftIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
