'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProjectCarousel from './ProjectCarousel'
import portfolioManifest from '@/lib/portfolioManifest'

type Category = 'modern' | 'luxury' | 'minimal' | 'contemporary'

type ProjectMeta = {
  category: Category
  title: string
  location: string
  cost: string
  area: string
  whatsappText: string
}

const phoneNumber = '919676943494'
const whatsappBase = `https://wa.me/${phoneNumber}`
const sanitizeProjectImages = (images: string[]) =>
  images.filter((img) => typeof img === 'string' && img.trim().length > 0)

// Known project metadata keyed by folder/title name.
// Projects discovered by the manifest that are not listed here will receive sensible defaults.
const projectMetadata: Record<string, ProjectMeta> = {
  'Anantha Residency': {
    category: 'minimal',
    title: 'Anantha Residency',
    location: 'JP Nagar, Bangalore',
    cost: '₹8.5 Lakhs',
    area: '1800 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Anantha Residency style project. Please schedule a consultation.',
  },
  'Vasavi Residency': {
    category: 'modern',
    title: 'Vasavi Residency',
    location: 'Sankarpally',
    cost: '₹13 Lakhs',
    area: '2700 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Vasavi Residency project. Please share details and schedule a consultation.',
  },
  'Reddy Residency': {
    category: 'modern',
    title: 'Reddy Residency',
    location: 'Sankarpally',
    cost: '₹10 Lakhs',
    area: '1850 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Reddy Residency project. Please contact me for a consultation.',
  },
  'The Modular Company': {
    category: 'contemporary',
    title: 'The Modular Company',
    location: 'Katedhan',
    cost: '₹15 Lakhs',
    area: '5000 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in your The Modular Company project. Please schedule a consultation.',
  },
  'Sharada School': {
    category: 'minimal',
    title: 'Sharada School',
    location: 'JP Nagar, Bangalore',
    cost: '₹32 Lakhs',
    area: '20800 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Sharada School project work. Please contact me for details.',
  },
  'Jayram Residence': {
    category: 'modern',
    title: 'Jayram Residence',
    location: 'Miyapur',
    cost: '₹12 Lakhs',
    area: '3250 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Jayram Residence project. Please schedule a consultation.',
  },
  'Aparna Zenith 3BHK Flat': {
    category: 'modern',
    title: 'Aparna Zenith 3BHK Flat',
    location: 'Aparna Zenith, Hyderabad',
    cost: '₹9 Lakhs',
    area: '1650 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Aparna Zenith 3BHK Flat project. Please schedule a consultation.',
  },
  'Aparna Zenith 4BHK Flat': {
    category: 'luxury',
    title: 'Aparna Zenith 4BHK Flat',
    location: 'Aparna Zenith, Hyderabad',
    cost: '₹14 Lakhs',
    area: '2200 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Aparna Zenith 4BHK Flat project. Please schedule a consultation.',
  },
  'Ashish Jubilee Hills Pent House': {
    category: 'luxury',
    title: 'Ashish Jubilee Hills Pent House',
    location: 'Jubilee Hills, Hyderabad',
    cost: '₹25 Lakhs',
    area: '4000 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Ashish Jubilee Hills Pent House project. Please schedule a consultation.',
  },
  'Kompally 3BH Flat': {
    category: 'modern',
    title: 'Kompally 3BH Flat',
    location: 'Kompally, Hyderabad',
    cost: '₹8 Lakhs',
    area: '1500 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Kompally 3BH Flat project. Please schedule a consultation.',
  },
  'Lansum Etania 3BHK Flat': {
    category: 'contemporary',
    title: 'Lansum Etania 3BHK Flat',
    location: 'Lansum Etania, Hyderabad',
    cost: '₹10 Lakhs',
    area: '1800 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in the Lansum Etania 3BHK Flat project. Please schedule a consultation.',
  },
  'Sri Divya Akhil Swapna CK Meadows-3BHK': {
    category: 'contemporary',
    title: 'Sri Divya Akhil Swapna CK Meadows-3BHK',
    location: 'CK Meadows, Hyderabad',
    cost: '₹11 Lakhs',
    area: '1750 sq.ft',
    whatsappText: 'Hi Thrayee Studio, I am interested in the CK Meadows 3BHK project. Please schedule a consultation.',
  },
}

// Merge manifest (images) with metadata.
// Projects in the manifest that are missing from metadata get sensible defaults.
const allProjects = portfolioManifest.map((entry) => {
  const meta = projectMetadata[entry.title]
  return {
    title: entry.title,
    images: sanitizeProjectImages(entry.images),
    category: meta?.category ?? ('modern' as Category),
    location: meta?.location ?? 'Hyderabad',
    cost: meta?.cost ?? 'Contact for pricing',
    area: meta?.area ?? 'N/A',
    whatsappText:
      meta?.whatsappText ??
      `Hi Thrayee Studio, I am interested in the ${entry.title} project. Please schedule a consultation.`,
  }
})

const categories = ['all', 'modern', 'luxury', 'minimal', 'contemporary']

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredProjects =
    selectedCategory === 'all'
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory)

  return (
    <section id="portfolio" className="section-padding bg-cream">
      <div className="container-custom">
        {/* Header + filters */}
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

          {/* Category Filters */}
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

        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No projects in this category yet.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            // 2-column grid on tablet/desktop, 1 column on mobile
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, cardIndex) => (
              <div
                key={project.title}
                className="rounded-xl shadow-lg bg-white overflow-hidden"
              >
                {/* Per-card independent image carousel */}
                <div className="relative">
                  <ProjectCarousel
                    images={project.images}
                    alt={project.title}
                    cardIndex={cardIndex}
                  />
                  {/* WhatsApp CTA overlay at bottom of carousel */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 pointer-events-none">
                    <a
                      href={`${whatsappBase}?text=${encodeURIComponent(project.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary text-sm pointer-events-auto"
                      aria-label={`Get consultation on WhatsApp for ${project.title}`}
                    >
                      Get Consultation
                    </a>
                  </div>
                </div>

                {/* Project info */}
                <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-charcoal mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {project.location} · {project.area}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-olive font-semibold">{project.cost}</span>
                    <a
                      href={`tel:+${phoneNumber}`}
                      className="px-3 py-1.5 rounded border border-charcoal text-charcoal text-sm font-medium hover:bg-charcoal hover:text-white transition"
                      aria-label={`Call Thrayee Studio for ${project.title}`}
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Portfolio
