'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Project = {
  category: 'modern' | 'luxury' | 'minimal' | 'contemporary'
  title: string
  location: string
  cost: string
  area: string
  image: string
  whatsappText: string
}

const phoneNumber = '919676943494'
const whatsappBase = `https://wa.me/${phoneNumber}`

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const projects: Project[] = [
    {
      category: 'minimal',
      title: 'Anantha Residency',
      location: 'JP Nagar, Bangalore',
      cost: '₹8.5 Lakhs',
      area: '1800 sq.ft',
      image: '/portfolio/projects/Anantha Residency/1.jpg',
      whatsappText: 'Hi Thrayee Studio, I am interested in the Anantha Residency style project. Please schedule a consultation.'
    },
    {
      category: 'modern',
      title: 'Vasavi Residency',
      location: 'Sankarpally',
      cost: '₹13 Lakhs',
      area: '2700 sq.ft',
      image: '/portfolio/projects/Vasavi Residency/1.jpg',
      whatsappText: 'Hi Thrayee Studio, I am interested in the Vasavi Residency project. Please share details and schedule a consultation.'
    },
    {
      category: 'modern',
      title: 'Reddy Residency',
      location: 'Sankarpally',
      cost: '₹10 Lakhs',
      area: '1850 sq.ft',
      image: '/portfolio/projects/Reddy Residency/1.jpg',
      whatsappText: 'Hi Thrayee Studio, I am interested in the Reddy Residency project. Please contact me for a consultation.'
    },
    {
      category: 'contemporary',
      title: 'The Modular Company',
      location: 'Katedhan',
      cost: '₹15 Lakhs',
      area: '5000 sq.ft',
      image: '/portfolio/projects/The Modular Company/1.jpg',
      whatsappText: 'Hi Thrayee Studio, I am interested in your The Modular Company project. Please schedule a consultation.'
    },
    {
      category: 'minimal',
      title: 'Sharada School',
      location: 'JP Nagar, Bangalore',
      cost: '₹32 Lakhs',
      area: '20800 sq.ft',
      image: '/portfolio/projects/Sharada School/1.jpg',
      whatsappText: 'Hi Thrayee Studio, I am interested in the Sharada School project work. Please contact me for details.'
    },
    {
      category: 'modern',
      title: 'Jayram Residence',
      location: 'Miyapur',
      cost: '₹12 Lakhs',
      area: '3250 sq.ft',
      image: '/portfolio/projects/Jayram Residence/1.jpg',
      whatsappText: 'Hi Thrayee Studio, I am interested in the Jayram Residence project. Please schedule a consultation.'
    },
  ]

  const categories = ['all', 'modern', 'luxury', 'minimal', 'contemporary']
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="portfolio" className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Our Live Portfolio</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Real projects delivered by Thrayee Studio with practical layouts, premium finishes,
            and transparent budgets. Explore and contact us instantly for a similar outcome.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`capitalize px-6 py-2 rounded transition ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-warm-white'
                    : 'bg-light-gray text-charcoal hover:bg-light-gray/80'
                }`}
                aria-label={`Filter projects by ${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const whatsappHref = `${whatsappBase}?text=${encodeURIComponent(project.whatsappText)}`
            return (
              <motion.article
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group rounded-lg bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-72 overflow-hidden bg-light-gray">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${project.image}')` }}
                    role="img"
                    aria-label={`${project.title} interior project image`}
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-charcoal mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{project.location}</p>
                  <p className="text-gray-600 text-sm mb-3">{project.area}</p>
                  <p className="text-olive font-semibold mb-4">{project.cost}</p>

                  <div className="flex gap-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary text-sm flex-1 text-center"
                      aria-label={`Get consultation on WhatsApp for ${project.title}`}
                    >
                      Get Consultation
                    </a>
                    <a
                      href={`tel:+${phoneNumber}`}
                      className="px-4 py-2 rounded border border-charcoal text-charcoal text-sm font-medium hover:bg-charcoal hover:text-white transition"
                      aria-label={`Call Thrayee Studio for ${project.title}`}
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
