'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface ProjectCarouselProps {
  images: string[]
  alt: string
  /** Index of this card in the grid — used to set priority on the first card's first image */
  cardIndex?: number
}

const AUTO_SLIDE_INTERVAL = 4000

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function ProjectCarousel({ images, alt, cardIndex = 0 }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const dragStartX = useRef(0)
  const isDragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInViewRef = useRef(false)

  // Pause carousel when not visible in the viewport (optional IntersectionObserver)
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      isInViewRef.current = true
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback(
    (newIndex: number, dir: number) => {
      if (images.length === 0) return
      setDirection(dir)
      setCurrentIndex((newIndex + images.length) % images.length)
    },
    [images.length]
  )

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo])
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo])

  // Auto-play — paused on hover/focus or when off-screen
  useEffect(() => {
    if (isPaused || images.length <= 1) return
    const interval = setInterval(() => {
      if (isInViewRef.current) goNext()
    }, AUTO_SLIDE_INTERVAL)
    return () => clearInterval(interval)
  }, [isPaused, goNext, images.length])

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    dragStartX.current = e.clientX
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    const diff = dragStartX.current - e.clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev()
    }
  }

  if (images.length === 0) return null

  const isFirstCard = cardIndex === 0

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] bg-light-gray overflow-hidden"
      style={{ touchAction: 'pan-y' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} — image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            // Only treat the very first image of the first card as priority; lazy-load everything else
            priority={isFirstCard && currentIndex === 0}
            loading={isFirstCard && currentIndex === 0 ? 'eager' : 'lazy'}
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md rounded-full p-1.5 transition"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} className="text-charcoal" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md rounded-full p-1.5 transition"
            aria-label="Next image"
          >
            <ChevronRight size={18} className="text-charcoal" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full bg-white transition-all ${
                i === currentIndex ? 'w-4 opacity-100' : 'w-1.5 opacity-50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
