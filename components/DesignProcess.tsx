'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const DesignProcess = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    { num: '01', title: 'Discovery', desc: 'Understand your vision and requirements' },
    { num: '02', title: 'Site Visit', desc: 'Detailed measurement and analysis' },
    { num: '03', title: 'Design', desc: 'Create concept designs' },
    { num: '04', title: '3D Visual', desc: '3D walkthroughs and renderings' },
    { num: '05', title: 'Materials', desc: 'Premium material selection' },
    { num: '06', title: 'Quotation', desc: 'Detailed costing breakdown' },
    { num: '07', title: 'Execution', desc: 'Professional installation' },
    { num: '08', title: 'Handover', desc: 'Quality checks and final delivery' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
    <section ref={ref} className="section-padding bg-warm-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Our Design Process</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A systematic approach to create your perfect home
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <div className="bg-cream p-6 rounded-lg text-center">
                <div className="text-4xl font-serif font-bold text-olive mb-3">
                  {step.num}
                </div>
                <h3 className="font-serif font-bold text-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/3 -right-3 w-6 h-0.5 bg-olive" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default DesignProcess
