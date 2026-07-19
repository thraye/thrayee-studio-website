'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Youtube, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-charcoal text-warm-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Thrayee Studio</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium interior design solutions for Hyderabad homes. Creating beautiful, functional spaces since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-gold transition">Services</a></li>
              <li><a href="#portfolio" className="hover:text-gold transition">Portfolio</a></li>
              <li><a href="#about" className="hover:text-gold transition">About</a></li>
              <li><a href="#faq" className="hover:text-gold transition">FAQ</a></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold mb-4">Serving in Hyderabad</h4>
            <ul className="space-y-2 text-sm">
              <li>Kukatpally</li>
              <li>Miyapur</li>
              <li>Gachibowli</li>
              <li>Kondapur</li>
              <li>Narsingi</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-1" />
                <a href="tel:+919876543210" className="hover:text-gold transition">+91 9876 543 210</a>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1" />
                <a href="mailto:info@thrayee.com" className="hover:text-gold transition">info@thrayee.com</a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gray-400">
              © 2024 Thrayee Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-gold transition" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-gold transition" title="YouTube">
                <Youtube size={20} />
              </a>
              <a href="#" className="hover:text-gold transition" title="LinkedIn">
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
