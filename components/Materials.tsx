'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Materials = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const materials = [
    { name: 'Plywood', benefits: 'Durable, cost-effective, eco-friendly' },
    { name: 'Laminate', benefits: 'Wide variety, easy to maintain, affordable' },
    { name: 'Acrylic', benefits: 'Glossy finish, modern look, premium quality' },
    { name: 'PU Finish', benefits: 'Smooth texture, long-lasting, beautiful sheen' },
    { name: 'Quartz', benefits: 'Non-porous, stain-resistant, elegant' },
    { name: 'Granite', benefits: 'Luxurious, durable, natural beauty' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="section-padding bg-warm-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Premium Materials</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We use only the highest quality materials from trusted brands
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {materials.map((material, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-cream p-8 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl font-serif font-bold text-olive mb-3">
                {material.name[0]}
              </div>
              <h3 className="text-xl font-serif font-bold text-charcoal mb-2">
                {material.name}
              </h3>
              <p className="text-gray-600 text-sm">{material.benefits}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Materials
