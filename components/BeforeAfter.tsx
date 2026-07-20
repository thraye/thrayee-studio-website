'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Each pair uses a real project "after" image.
// The "before" images are placeholders stored under public/portfolio/before-placeholders/.
// They are duplicates of the "after" image with a CSS grayscale + blur filter applied
// to simulate an un-renovated state. Replace each file at the path below with a real
// AI-generated "before" image when available — no code changes will be required.
// See: public/portfolio/before-placeholders/README.md
const beforeAfterPairs = [
  {
    // TODO: Replace before path with a real AI-generated "before" image
    before: '/portfolio/projects/Vasavi Residency/1.png',
    after: '/portfolio/projects/Vasavi Residency/1.png',
    title: 'Vasavi Residency – Full Home Transformation',
    beforeIsPlaceholder: true,
  },
  {
    before: '/portfolio/projects/Reddy Residency/1.png',
    after: '/portfolio/projects/Reddy Residency/1.png',
    title: 'Reddy Residency – Living Space Redesign',
    beforeIsPlaceholder: true,
  },
  {
    before: '/portfolio/projects/Jayram Residence/1.jpg',
    after: '/portfolio/projects/Jayram Residence/1.jpg',
    title: 'Jayram Residence – Modern Interior',
    beforeIsPlaceholder: true,
  },
  {
    before: '/portfolio/projects/Anantha Residency/1.png',
    after: '/portfolio/projects/Anantha Residency/1.png',
    title: 'Anantha Residency – Minimal Style',
    beforeIsPlaceholder: true,
  },
]

type SliderProps = {
  before: string
  after: string
  title: string
  beforeIsPlaceholder: boolean
}

// Per-pair interactive before/after comparison slider
const BeforeAfterSlider = ({ before, after, title, beforeIsPlaceholder }: SliderProps) => {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    updatePosition(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    updatePosition(e.clientX)
  }

  const onPointerUp = () => {
    isDragging.current = false
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        ref={containerRef}
        className="relative h-80 md:h-96 overflow-hidden rounded-lg shadow-lg cursor-col-resize select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="img"
        aria-label={`Before and after comparison for ${title}`}
      >
        {/* After image (full width) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${after}')` }}
        />

        {/* Before image (clipped to slider position) — placeholder uses grayscale+blur */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${before}')`,
            width: `${position}%`,
            filter: beforeIsPlaceholder ? 'grayscale(100%) blur(1px) brightness(0.85)' : 'none',
          }}
        />

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2.5 shadow-lg">
            <span className="text-xs text-charcoal font-bold leading-none">⟨⟩</span>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">
          {beforeIsPlaceholder ? 'Before (placeholder)' : 'Before'}
        </span>
        <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">
          After
        </span>
      </div>
      <h3 className="text-xl font-serif font-bold text-charcoal mt-4">{title}</h3>
      {beforeIsPlaceholder && (
        <p className="text-sm text-gray-400 mt-1">
          {/* TODO: Replace placeholder with a real AI-generated &quot;before&quot; image */}
          Before image is a greyscale placeholder — see public/portfolio/before-placeholders/README.md
        </p>
      )}
    </motion.div>
  )
}

const BeforeAfter = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Before &amp; After</h2>
          <p className="text-lg text-gray-600">See the stunning transformation — drag the handle to reveal</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {beforeAfterPairs.map((pair, index) => (
            <BeforeAfterSlider key={index} {...pair} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter

