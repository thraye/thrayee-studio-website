'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/portfolio/projects/Vasavi Residency/1.png')",
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Image
            src="/brand/logo-white.png"
            alt="Thrayee Studio"
            width={1600}
            height={1500}
            priority
            className="mx-auto mb-8 h-auto w-40 sm:w-48 md:w-56"
          />
          <h1 className="heading-xl mb-6 text-white">
            Designed Around Your Lifestyle
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 font-light">
            Premium Interior Design for Hyderabad Homes.
            <br />
            Beautiful. Functional. Built to Last.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#contact" className="btn btn-primary px-8">
              Get Free Consultation
            </a>
            <a
              href="/portfolio/THRAYEE STUDIO PORTFOLIO.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary px-8 text-white border-white hover:bg-white hover:text-charcoal"
            >
              View Portfolio
            </a>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-gold text-xl">★★★★★</span>
              <span>Trusted by Hyderabad Families</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
