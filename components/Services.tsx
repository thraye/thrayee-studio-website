'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Services = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const services = [
    {
      title: 'Full Home Interiors',
      image: '/portfolio/projects/Vasavi Residency/1.png',
      description: 'Complete end-to-end interior design for your entire home',
    },
    {
      title: 'Kitchen & Wardrobes',
      image: '/portfolio/projects/Kompally 3BH Flat/10.jpg',
      description: 'Modular kitchens and custom wardrobes with smart storage',
    },
    {
      title: 'Bedroom',
      image: '/portfolio/projects/Sri Divya Akhil Swapna CK Meadows-3BHK/4.JPG',
      description: 'Serene and comfortable bedroom designs',
    },
    {
      title: 'TV Unit',
      image: '/portfolio/projects/Anantha Residency/4.png',
      description: 'Modern TV units with integrated design',
    },
    {
      title: 'Living Room Design',
      image: '/portfolio/projects/Jayram Residence/8.jpg',
      description: 'Beautiful and functional living spaces',
    },
    {
      title: 'Commercial Spaces',
      image: '/portfolio/projects/The Modular Company/1.png',
      description: 'Functional and stylish interiors for commercial spaces',
    },
    {
      title: 'Turnkey Projects',
      image: '/portfolio/projects/Jayram Residence/1.jpg',
      description: 'End-to-end turnkey project execution with zero hassle',
    },
    {
      title: 'False Ceiling',
      image: '/portfolio/projects/Ashish Jubilee Hills Pent House/5.jpeg',
      description: 'Elegant false ceilings with integrated lighting',
    },
    {
      title: 'Dining',
      image: '/portfolio/projects/Aparna Zenith 4BHK Flat/6.jpg',
      description: 'Sophisticated dining spaces',
    },
    {
      title: 'Balcony',
      image: '/portfolio/projects/Ashish Jubilee Hills Pent House/8.jpeg',
      description: 'Outdoor balcony designs',
    },
    {
      title: 'Renovation Services',
      image: '/portfolio/projects/Reddy Residency/4.png',
      description: 'Complete home renovation and remodeling services',
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
    <section id="services" className="section-padding bg-warm-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive interior design solutions for every space in your home
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
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
