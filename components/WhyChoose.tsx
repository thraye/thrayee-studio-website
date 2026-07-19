'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle2, Eye, Users, Award, Zap } from 'lucide-react'

const WhyChoose = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const reasons = [
    { icon: Sparkles, title: 'Personalized Designs', desc: 'Tailored to your lifestyle and preferences' },
    { icon: CheckCircle2, title: 'No Hidden Costs', desc: 'Transparent pricing from day one' },
    { icon: Award, title: 'Detailed BOQ', desc: 'Complete breakdown of materials and costs' },
    { icon: Zap, title: 'Premium Materials', desc: 'Only high-quality materials used' },
    { icon: Eye, title: '3D Walkthroughs', desc: 'Visualize your home before execution' },
    { icon: Users, title: 'Dedicated Manager', desc: 'Personal project manager assigned' },
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
    <section id="about" className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Why Choose Thrayee</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We bring transparency, quality, and expertise to every project
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-warm-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="w-8 h-8 text-olive" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-charcoal mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{reason.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChoose
