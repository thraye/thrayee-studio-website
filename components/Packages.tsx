'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2 } from 'lucide-react'

const Packages = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const packages = [
    {
      name: 'Starter',
      price: '₹8-15 Lakhs',
      size: 'Up to 1200 sq.ft',
      features: ['Basic Design', 'Standard Materials', 'Single Room Focus', 'Installation'],
    },
    {
      name: 'Premium',
      price: '₹15-30 Lakhs',
      size: '1200-2000 sq.ft',
      features: ['Complete Design', 'Premium Materials', 'Multiple Rooms', '3D Visualization', 'Dedicated Manager'],
      highlighted: true,
    },
    {
      name: 'Luxury',
      price: '₹30-45 Lakhs',
      size: '2000+ sq.ft',
      features: ['Custom Design', 'Luxury Materials', 'Full Home', '3D + Virtual Tour', 'Premium Support', 'Extended Warranty'],
    },
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
    <section ref={ref} className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Our Packages</h2>
          <p className="text-lg text-gray-600">
            Choose the perfect package for your home
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`rounded-lg overflow-hidden transition-all ${
                pkg.highlighted
                  ? 'ring-2 ring-olive shadow-xl scale-105'
                  : 'bg-white shadow-md'
              }`}
            >
              <div className={`p-8 ${pkg.highlighted ? 'bg-olive text-warm-white' : 'bg-warm-white'}`}>
                {pkg.highlighted && (
                  <div className="text-sm font-bold mb-2 inline-block px-3 py-1 bg-warm-white text-olive rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-serif font-bold mb-2 ${pkg.highlighted ? '' : 'text-charcoal'}`}>
                  {pkg.name}
                </h3>
                <div className={`text-3xl font-bold mb-2 ${pkg.highlighted ? '' : 'text-olive'}`}>
                  {pkg.price}
                </div>
                <p className={`text-sm mb-6 ${pkg.highlighted ? 'text-warm-white/90' : 'text-gray-600'}`}>
                  {pkg.size}
                </p>
              </div>

              <div className={`p-8 ${pkg.highlighted ? 'bg-olive/10' : 'bg-cream'}`}>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${pkg.highlighted ? 'text-olive' : 'text-olive'}`} />
                      <span className={pkg.highlighted ? 'text-warm-white' : 'text-charcoal'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full btn ${pkg.highlighted ? 'btn-gold' : 'btn-secondary'}`}>
                  Get Detailed Quote
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Packages
