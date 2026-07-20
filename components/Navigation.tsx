'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-warm-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-serif font-bold text-charcoal flex items-center gap-2">
            <span>Thrayee</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-charcoal hover:text-olive transition-colors duration-300 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+919676943494"
              className="flex items-center gap-2 text-charcoal hover:text-olive transition-colors"
              title="Call us"
              aria-label="Call Thrayee Studio at +91 9676 943 494"
            >
              <Phone size={18} />
            </a>
            <a
              href="https://wa.me/919676943494"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-charcoal hover:text-olive transition-colors"
              title="WhatsApp"
              aria-label="WhatsApp Thrayee Studio"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="https://wa.me/919676943494?text=Hi%20Thrayee%20Studio%2C%20I%20would%20like%20to%20book%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-sm"
              aria-label="Get consultation on WhatsApp"
            >
              Get Consultation
            </a>
          </div>

          <button
            className="md:hidden text-charcoal"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-warm-white border-t border-light-gray py-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-charcoal hover:bg-light-gray transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 py-3 border-t border-light-gray mt-2 flex gap-2">
              <a
                href="tel:+919676943494"
                className="btn w-1/2 text-sm border border-charcoal text-charcoal text-center"
              >
                Call
              </a>
              <a
                href="https://wa.me/919676943494?text=Hi%20Thrayee%20Studio%2C%20I%20would%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-1/2 text-sm text-center"
              >
                Consult
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
