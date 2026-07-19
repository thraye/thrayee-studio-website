'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, MessageCircle, Mail } from 'lucide-react'

const FinalCTA = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" ref={ref} className="relative py-24 bg-charcoal text-warm-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-olive rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="heading-xl mb-6 text-warm-white">
            Let's Design Your Dream Home
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get started with a free consultation and personalized quotation
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12"
        >
          <button className="btn btn-primary px-8 py-4 text-lg font-semibold">
            Book Free Consultation
          </button>
          <button className="btn btn-gold px-8 py-4 text-lg font-semibold">
            Request Quotation
          </button>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8"
        >
          <a
            href="tel:+919876543210"
            className="flex items-center gap-3 hover:text-gold transition"
          >
            <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center">
              <Phone size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400">Call Now</p>
              <p className="font-semibold">+91 9876 543 210</p>
            </div>
          </a>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-gold transition"
          >
            <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400">WhatsApp</p>
              <p className="font-semibold">Quick Chat</p>
            </div>
          </a>

          <a
            href="mailto:info@thrayee.com"
            className="flex items-center gap-3 hover:text-gold transition"
          >
            <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center">
              <Mail size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-semibold">info@thrayee.com</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTA
