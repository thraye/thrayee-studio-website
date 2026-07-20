'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Project = {
  category: 'modern' | 'luxury' | 'minimal' | 'contemporary'
  title: string
  location: string
  cost: string
  area: string
  image: string
  whatsappText: string
}

const phoneNumber = '919676943494'
const whatsappBase = `https://wa.me/${phoneNumber}`
const AUTO_SLIDE_INTERVAL = 4000

const allProjects: Project[] = [
  {
    category: 'minimal',
    title: 'Anantha Residency',
    location: 'JP Nagar, Bangalore',
    cost: '₹8.5 Lakhs',
    area: '1800 sq.ft',
    image: '/portfolio/projects/Anantha Residency/1.png',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Anantha Residency style project. Please schedule a consultation.'
  },
  {
    category: 'modern',
    title: 'Vasavi Residency',
    location: 'Sankarpally',
    cost: '₹13 Lakhs',
    area: '2700 sq.ft',
    image: '/portfolio/projects/Vasavi Residency/1.png',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Vasavi Residency project. Please share details and schedule a consultation.'
  },
  {
    category: 'modern',
    title: 'Reddy Residency',
    location: 'Sankarpally',
    cost: '₹10 Lakhs',
    area: '1850 sq.ft',
    image: '/portfolio/projects/Reddy Residency/1.png',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Reddy Residency project. Please contact me for a consultation.'
  },
  {
    category: 'contemporary',
    title: 'The Modular Company',
    location: 'Katedhan',
    cost: '₹15 Lakhs',
    area: '5000 sq.ft',
    image: '/portfolio/projects/The Modular Company/1.png',
    whatsappText: 'Hi Thrayee Studio, I am interested in your The Modular Company project. Please schedule a consultation.'
  },
  {
    category: 'minimal',
    title: 'Sharada School',
    location: 'JP Nagar, Bangalore',
    cost: '₹32 Lakhs',
    area: '20800 sq.ft',
    image: '/portfolio/projects/Sharada School/1.png',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Sharada School project work. Please contact me for details.'
  },
  {
    category: 'modern',
    title: 'Jayram Residence',
    location: 'Miyapur',
    cost: '₹12 Lakhs',
    area: '3250 sq.ft',
    image: '/portfolio/projects/Jayram Residence/1.jpg',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Jayram Residence project. Please schedule a consultation.'
  },
]

const categories = ['all', 'modern', 'luxury', 'minimal', 'contemporary']

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const dragStartX = useRef(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredProjects = selectedCategory === 'all'
    ? allProjects
    : allProjects.filter((p) => p.category === selectedCategory)

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0)
    setDirection(0)
  }, [selectedCategory])

  const goTo = useCallback((newIndex: number, dir: number) => {
    setDirection(dir)
    const total = filteredProjects.length
    setCurrentIndex((newIndex + total) % total)
  }, [filteredProjects.length])

  const goNext = useCallback(() => {
    goTo(currentIndex + 1, 1)
  }, [currentIndex, goTo])

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1, -1)
  }, [currentIndex, goTo])

  // Auto-play
  useEffect(() => {
    if (isPaused || filteredProjects.length <= 1) return
    timerRef.current = setInterval(goNext, AUTO_SLIDE_INTERVAL)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, goNext, filteredProjects.length])

  const handleDragStart = (e: React.PointerEvent) => {
    e.preventDefault()
    dragStartX.current = e.clientX
  }

  const handleDragEnd = (e: React.PointerEvent) => {
    const diff = dragStartX.current - e.clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev()
    }
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  const currentProject = filteredProjects[currentIndex]

  return (
    <section id="portfolio" className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Our Live Portfolio</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Real projects delivered by Thrayee Studio with practical layouts, premium finishes,
            and transparent budgets. Explore and contact us instantly for a similar outcome.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`capitalize px-6 py-2 rounded transition ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-warm-white'
                    : 'bg-light-gray text-charcoal hover:bg-light-gray/80'
                }`}
                aria-label={`Filter projects by ${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No projects in this category yet.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {/* Slide area */}
            <div
              className="relative overflow-hidden rounded-xl shadow-lg bg-white"
              style={{ touchAction: 'pan-y' }}
              onPointerDown={handleDragStart}
              onPointerUp={handleDragEnd}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`${selectedCategory}-${currentIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full"
                >
                  {/* Image */}
                  <div className="relative h-64 sm:h-80 md:h-[480px] bg-light-gray overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${currentProject.image}')` }}
                      role="img"
                      aria-label={`${currentProject.title} interior project image`}
                    />
                    {/* WhatsApp CTA overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                      <a
                        href={`${whatsappBase}?text=${encodeURIComponent(currentProject.whatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary text-sm"
                        aria-label={`Get consultation on WhatsApp for ${currentProject.title}`}
                      >
                        Get Consultation
                      </a>
                    </div>
                  </div>

                  {/* Project info */}
                  <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-charcoal mb-1">{currentProject.title}</h3>
                      <p className="text-gray-600 text-sm">{currentProject.location} · {currentProject.area}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-olive font-semibold text-lg">{currentProject.cost}</span>
                      <a
                        href={`tel:+${phoneNumber}`}
                        className="px-4 py-2 rounded border border-charcoal text-charcoal text-sm font-medium hover:bg-charcoal hover:text-white transition"
                        aria-label={`Call Thrayee Studio for ${currentProject.title}`}
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prev / Next arrows */}
            {filteredProjects.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md rounded-full p-2 transition"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={24} className="text-charcoal" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md rounded-full p-2 transition"
                  aria-label="Next project"
                >
                  <ChevronRight size={24} className="text-charcoal" />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {filteredProjects.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {filteredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex ? 'bg-charcoal w-6' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Portfolio

