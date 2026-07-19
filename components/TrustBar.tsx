'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const TrustBar = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const trustItems = [
    { label: '100+ Projects', icon: '🏗️' },
    { label: 'On-time Delivery', icon: '⏰' },
    { label: 'Transparent Pricing', icon: '💰' },
    { label: '3D Design', icon: '🎨' },
    { label: '5-Year Warranty', icon: '✅' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="bg-light-gray section-padding">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-5 gap-8"
        >
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <p className="font-medium text-charcoal">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustBar
