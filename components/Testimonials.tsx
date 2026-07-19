'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Testimonials = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Kondapur',
      text: 'Thrayee turned our apartment into our dream home! The attention to detail and transparent pricing was impressive.',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    },
    {
      name: 'Rajesh Kumar',
      location: 'Jubilee Hills',
      text: 'Amazing work on our villa! The 3D visualization helped us make confident decisions. Highly recommended!',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    },
    {
      name: 'Anjali Verma',
      location: 'Gachibowli',
      text: 'Professional team, excellent execution, and they delivered on time. Worth every rupee!',
      rating: 5,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
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
    <section ref={ref} className="section-padding bg-warm-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4 text-charcoal">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">Real stories from happy homeowners</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-cream p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full bg-cover"
                  style={{ backgroundImage: `url('${testimonial.image}')` }}
                />
                <div>
                  <h4 className="font-bold text-charcoal">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <div className="mb-3 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-gold">★</span>
                ))}
              </div>
              <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
