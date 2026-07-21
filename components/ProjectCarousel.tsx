'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
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
  const filteredImages = useMemo(
    () => images.filter((src) => typeof src === 'string' && src.trim().length > 0),
    [images]
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [loadedMap, setLoadedMap] = useState<Record<number, boolean>>({})
  const [failedMap, setFailedMap] = useState<Record<number, boolean>>({})
  const dragStartX = useRef(0)
  const dragStartY = useRef(0)
  const isDragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInViewRef = useRef(false)
  const imageCount = filteredImages.length
  const availableIndices = useMemo(
    () => filteredImages.map((_, index) => index).filter((index) => !failedMap[index]),
    [filteredImages, failedMap]
  )

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

  useEffect(() => {
    setCurrentIndex((prev) => {
      if (imageCount === 0) return 0
      return Math.min(prev, imageCount - 1)
    })
  }, [imageCount])

  const findNextAvailableIndex = useCallback(
    (fromIndex: number, dir: 1 | -1) => {
      if (imageCount === 0) return 0
      if (availableIndices.length === 0) return Math.min(Math.max(fromIndex, 0), imageCount - 1)
      const normalizedIndex = (fromIndex + imageCount) % imageCount
      if (availableIndices.includes(normalizedIndex)) return normalizedIndex

      if (dir === 1) {
        return availableIndices.find((index) => index >= normalizedIndex) ?? availableIndices[0]
      }

      const previousIndex = [...availableIndices]
        .reverse()
        .find((index) => index <= normalizedIndex)
      return previousIndex ?? availableIndices[availableIndices.length - 1]
    },
    [availableIndices, imageCount]
  )

  const goTo = useCallback(
    (newIndex: number, dir: 1 | -1) => {
      if (imageCount === 0 || availableIndices.length <= 1) return
      const wrappedIndex = (newIndex + imageCount) % imageCount
      setDirection(dir)
      setCurrentIndex(findNextAvailableIndex(wrappedIndex, dir))
    },
    [availableIndices.length, findNextAvailableIndex, imageCount]
  )

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo])
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo])

  useEffect(() => {
    if (availableIndices.length === 0 || !failedMap[currentIndex]) return
    setCurrentIndex(findNextAvailableIndex(currentIndex + 1, 1))
  }, [availableIndices.length, currentIndex, failedMap, findNextAvailableIndex])

  // Auto-play — paused on hover/focus or when off-screen
  useEffect(() => {
    if (isPaused || availableIndices.length <= 1) return
    const interval = setInterval(() => {
      if (isInViewRef.current) goNext()
    }, AUTO_SLIDE_INTERVAL)
    return () => clearInterval(interval)
  }, [availableIndices.length, goNext, isPaused])

  useEffect(() => {
    if (typeof window === 'undefined' || imageCount <= 1 || availableIndices.length <= 1) return
    const nextIndex = findNextAvailableIndex(currentIndex + 1, 1)
    const prevIndex = findNextAvailableIndex(currentIndex - 1, -1)
    const preloadTargets = [nextIndex, prevIndex]
    preloadTargets.forEach((index) => {
      const src = filteredImages[index]
      if (!src || failedMap[index]) return
      const preloadImage = new window.Image()
      preloadImage.src = src
    })
  }, [
    availableIndices.length,
    currentIndex,
    failedMap,
    filteredImages,
    findNextAvailableIndex,
    imageCount,
  ])

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    const diffX = dragStartX.current - e.clientX
    const diffY = dragStartY.current - e.clientY
    // Only treat as a horizontal swipe when horizontal movement dominates
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      diffX > 0 ? goNext() : goPrev()
    }
  }

  if (imageCount === 0) {
    return (
      <div className="relative aspect-[4/3] bg-light-gray overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
          <span className="text-2xl" aria-hidden="true">
            🖼️
          </span>
          <span className="text-sm font-medium">Image unavailable</span>
        </div>
      </div>
    )
  }

  const isFirstCard = cardIndex === 0
  const isCurrentSlideFailed = !!failedMap[currentIndex]
  const isCurrentSlideLoaded = !!loadedMap[currentIndex]
  const canNavigate = availableIndices.length > 1

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
      <AnimatePresence initial={false} custom={direction}>
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
          {isCurrentSlideFailed ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-light-gray text-gray-500">
              <span className="text-2xl" aria-hidden="true">
                🖼️
              </span>
              <span className="text-sm font-medium">Image unavailable</span>
            </div>
          ) : (
            <>
              <Image
                src={filteredImages[currentIndex]}
                alt={`${alt} — image ${currentIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                // Only treat the very first image of the first card as priority; lazy-load everything else
                priority={isFirstCard && currentIndex === 0}
                loading={isFirstCard && currentIndex === 0 ? 'eager' : 'lazy'}
                onLoad={() => {
                  setLoadedMap((prev) => ({ ...prev, [currentIndex]: true }))
                }}
                onError={() => {
                  setFailedMap((prev) => ({ ...prev, [currentIndex]: true }))
                }}
              />
              {!isCurrentSlideLoaded && (
                <div className="absolute inset-0 animate-pulse bg-light-gray" aria-hidden="true" />
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      {canNavigate && (
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
      {canNavigate && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
          {availableIndices.map((index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full bg-white transition-all ${
                index === currentIndex ? 'w-4 opacity-100' : 'w-1.5 opacity-50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
