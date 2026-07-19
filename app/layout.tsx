import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Thrayee Studio - Premium Interior Design Hyderabad',
  description: 'Award-winning interior design for apartments, villas, and homes in Hyderabad. Custom designs with transparent pricing and 3D visualization.',
  keywords: 'interior design hyderabad, home interior design, apartment interiors, villa design, modular kitchen, false ceiling',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Thrayee Studio - Premium Interior Design',
    description: 'Elegant interior design solutions for Hyderabad homes',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#2C2C2C" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-warm-white">
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
