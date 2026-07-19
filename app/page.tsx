'use client'

import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import Services from '@/components/Services'
import WhyChoose from '@/components/WhyChoose'
import DesignProcess from '@/components/DesignProcess'
import Portfolio from '@/components/Portfolio'
import StyleFinder from '@/components/StyleFinder'
import BeforeAfter from '@/components/BeforeAfter'
import Materials from '@/components/Materials'
import Packages from '@/components/Packages'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustBar />
      <Services />
      <WhyChoose />
      <DesignProcess />
      <Portfolio />
      <StyleFinder />
      <BeforeAfter />
      <Materials />
      <Packages />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  )
}
