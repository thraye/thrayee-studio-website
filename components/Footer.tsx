'use client'

import { Phone, Mail, MapPin, Instagram, Youtube, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-charcoal text-warm-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Thrayee Studio</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium interior design solutions for Hyderabad and Bangalore homes. Creating beautiful, functional spaces since 2015.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-gold transition" title="Services">Services</a></li>
              <li><a href="#portfolio" className="hover:text-gold transition" title="Portfolio">Portfolio</a></li>
              <li><a href="#about" className="hover:text-gold transition" title="About">About</a></li>
              <li><a href="#contact" className="hover:text-gold transition" title="Contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-sm">
              <li>Hyderabad</li>
              <li>Bangalore</li>
              <li>Sankarpally</li>
              <li>Miyapur</li>
              <li>JP Nagar</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-1" />
                <a href="tel:+919676943494" className="hover:text-gold transition" title="Call us">+91 9676 943 494</a>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1" />
                <a href="mailto:info@thrayeestudio.com" className="hover:text-gold transition" title="Email us">info@thrayeestudio.com</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>Hyderabad & Bangalore, India</span>
              </div>
            </div>
            <a
              href="https://wa.me/919676943494?text=Hi%20Thrayee%20Studio%2C%20I%20need%20interior%20design%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-sm mt-4 inline-block"
              aria-label="Get consultation on WhatsApp"
            >
              Get Consultation
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gray-400">
              © 2026 Thrayee Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://instagram.com/thrayeestudio" className="hover:text-gold transition" title="Instagram" aria-label="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/@thrayeestudio" className="hover:text-gold transition" title="YouTube" aria-label="Subscribe on YouTube" target="_blank" rel="noopener noreferrer">
                <Youtube size={20} />
              </a>
              <a href="https://linkedin.com/company/thrayee-studio" className="hover:text-gold transition" title="LinkedIn" aria-label="Follow us on LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
