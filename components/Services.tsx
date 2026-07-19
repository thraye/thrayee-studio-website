'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Services = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      title: 'Living Room',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop',
      description: 'Beautiful and functional living spaces',
    },
    {
      title: 'Kitchen',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop',
      description: 'Modular kitchens with premium finish',
    },
    {
      title: 'Bedroom',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=500&fit=crop',
      description: 'Serene and comfortable bedroom designs',
    },
    {
      title: 'Wardrobe',
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
      description: 'Custom wardrobes with smart storage',
    },
    {
      title: 'TV Unit',
      image: 'https://images.unsplash.com/photo-1559028615-cd4628902d4a?w=500&h=500&fit=crop',
      description: 'Modern TV units with integrated design',
    },
    {
      title: 'False Ceiling',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=500&fit=crop',
      description: 'Elegant false ceilings with lighting',
    },
    {
      title: 'Dining',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
      description: 'Sophisticated dining spaces',
    },
    {
      title: 'Balcony',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=500&fit=crop',
      description: 'Outdoor balcony designs',
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
    <section id="services" ref={ref} className="section-padding bg-warm-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive interior design solutions for every space in your home
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <div className="relative h-64 mb-4 overflow-hidden rounded-lg bg-light-gray">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${service.image}')`,
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              </div>
              <h3 className="text-xl font-serif font-bold text-charcoal mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              <button className="text-olive font-medium text-sm hover:text-gold transition">
                Know More →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
