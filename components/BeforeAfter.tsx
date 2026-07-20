'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BeforeAfterSlider from './BeforeAfterSlider'

// Each pair uses a real project "after" image.
// The "before" path references public/portfolio/before-ai/<Project Name>.jpg.
// Until real AI-generated "before" photos are placed there, the "after" image
// is reused with a CSS grayscale+blur filter (beforeIsPlaceholder: true).
// See public/portfolio/before-ai/README.md for exact filenames and composition guidance.
const beforeAfterPairs = [
  {
    // TODO: replace before path with real AI-generated image at public/portfolio/before-ai/Vasavi Residency.jpg
    before: '/portfolio/projects/Vasavi Residency/1.png',
    after: '/portfolio/projects/Vasavi Residency/1.png',
    title: 'Vasavi Residency – Full Home Transformation',
    beforeIsPlaceholder: true,
  },
  {
    // TODO: replace before path with real AI-generated image at public/portfolio/before-ai/Reddy Residency.jpg
    before: '/portfolio/projects/Reddy Residency/1.png',
    after: '/portfolio/projects/Reddy Residency/1.png',
    title: 'Reddy Residency – Living Space Redesign',
    beforeIsPlaceholder: true,
  },
  {
    // TODO: replace before path with real AI-generated image at public/portfolio/before-ai/Jayram Residence.jpg
    before: '/portfolio/projects/Jayram Residence/1.jpg',
    after: '/portfolio/projects/Jayram Residence/1.jpg',
    title: 'Jayram Residence – Modern Interior',
    beforeIsPlaceholder: true,
  },
  {
    // TODO: replace before path with real AI-generated image at public/portfolio/before-ai/Anantha Residency.jpg
    before: '/portfolio/projects/Anantha Residency/1.png',
    after: '/portfolio/projects/Anantha Residency/1.png',
    title: 'Anantha Residency – Minimal Style',
    beforeIsPlaceholder: true,
  },
  {
    // TODO: replace before path with real AI-generated image at public/portfolio/before-ai/Ashish Jubilee Hills Pent House.jpg
    before: '/portfolio/projects/Ashish Jubilee Hills Pent House/1.jpeg',
    after: '/portfolio/projects/Ashish Jubilee Hills Pent House/1.jpeg',
    title: 'Ashish Jubilee Hills Pent House – Luxury Penthouse',
    beforeIsPlaceholder: true,
  },
  {
    // TODO: replace before path with real AI-generated image at public/portfolio/before-ai/Aparna Zenith 4BHK Flat.jpg
    before: '/portfolio/projects/Aparna Zenith 4BHK Flat/1.jpg',
    after: '/portfolio/projects/Aparna Zenith 4BHK Flat/1.jpg',
    title: 'Aparna Zenith 4BHK – Premium Flat Interiors',
    beforeIsPlaceholder: true,
  },
]

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
          <p className="text-lg text-gray-600">
            See the stunning transformation — drag the handle to reveal
          </p>
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

