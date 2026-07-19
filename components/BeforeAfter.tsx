'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const BeforeAfter = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [sliderPosition, setSliderPosition] = useState(50)

  const beforeAfterPairs = [
    {
      before: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
      title: 'Living Room Transformation'
    },
    {
      before: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop',
      after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
      title: 'Kitchen Redesign'
    },
  ]

  return (
    <section ref={ref} className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Before & After</h2>
          <p className="text-lg text-gray-600">See the stunning transformation</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {beforeAfterPairs.map((pair, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${pair.after}')` }}
                />
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${pair.before}')`,
                    width: `${sliderPosition}%`,
                    transition: 'width 0.1s ease-out',
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(e.target.value)}
                  className="absolute inset-0 w-full h-full cursor-col-resize opacity-0 z-50"
                />
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                    <span className="text-xs text-charcoal font-bold">⟨⟩</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-charcoal mt-4">{pair.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter
