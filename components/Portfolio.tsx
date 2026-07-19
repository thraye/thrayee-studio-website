'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const projects = [
    { category: 'modern', title: 'Modern Apartment', location: 'Kondapur', cost: '₹18 Lakhs', area: '1200 sq.ft', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop' },
    { category: 'luxury', title: 'Luxury Villa', location: 'Jubilee Hills', cost: '₹45 Lakhs', area: '3500 sq.ft', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop' },
    { category: 'minimal', title: 'Minimal Design', location: 'Miyapur', cost: '₹12 Lakhs', area: '900 sq.ft', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop' },
    { category: 'contemporary', title: 'Contemporary', location: 'Gachibowli', cost: '₹22 Lakhs', area: '1500 sq.ft', image: 'https://images.unsplash.com/photo-1559028615-cd4628902d4a?w=500&h=400&fit=crop' },
    { category: 'modern', title: 'Modern Home', location: 'Narsingi', cost: '₹16 Lakhs', area: '1100 sq.ft', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop' },
    { category: 'luxury', title: 'Luxury Apartment', location: 'Financial District', cost: '₹35 Lakhs', area: '2200 sq.ft', image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=400&fit=crop' },
  ]

  const categories = ['all', 'modern', 'luxury', 'minimal', 'contemporary']
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  return (
    <section id="portfolio" className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Our Portfolio</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Award-winning projects from across Hyderabad
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`capitalize px-6 py-2 rounded transition ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-warm-white'
                    : 'bg-light-gray text-charcoal hover:bg-light-gray/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden rounded-lg bg-light-gray mb-4">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${project.image}')`,
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">View Details</span>
                </div>
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{project.location} • {project.area}</p>
              <p className="text-olive font-semibold">{project.cost}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
