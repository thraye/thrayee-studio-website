'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown } from 'lucide-react'

const FAQ = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: 'How much does interior design cost?',
      a: 'Costs vary based on space size and design complexity. Our packages range from ₹8L to ₹45L for different home sizes.',
    },
    {
      q: 'How long does the project take?',
      a: 'Typically 2-4 months depending on project scope. We provide timelines after detailed planning.',
    },
    {
      q: 'Can I customize everything?',
      a: 'Yes! We believe in personalized designs. Every element can be customized to match your preferences.',
    },
    {
      q: 'Do you provide warranty?',
      a: 'Yes, we provide 3-5 years warranty on materials and workmanship depending on the package.',
    },
    {
      q: 'Do you handle renovations?',
      a: 'Absolutely! We specialize in both new designs and complete renovations of existing homes.',
    },
    {
      q: 'Do you work only in Hyderabad?',
      a: 'Currently, we serve major areas in Hyderabad. We can discuss special projects outside the city.',
    },
    {
      q: 'What brands do you use?',
      a: 'We use premium brands like Godrej, Hafele, Asian Paints, and other trusted manufacturers.',
    },
    {
      q: 'Do you offer EMI options?',
      a: 'Yes, we can arrange EMI through our partner banks. Please inquire for details.',
    },
  ]

  return (
    <section id="faq" ref={ref} className="section-padding bg-cream">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4 text-charcoal">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Find answers to common questions about our services</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-warm-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full p-6 flex items-start justify-between hover:bg-light-gray/50 transition"
              >
                <span className="font-serif font-bold text-charcoal text-left">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-olive transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6 text-gray-700 border-t border-light-gray"
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
