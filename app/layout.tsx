import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Thrayee Studio - Premium Interior Design Hyderabad',
  description: 'Award-winning interior design for apartments, villas, and homes in Hyderabad. Custom designs with transparent pricing and 3D visualization.',
  keywords: 'interior design hyderabad, home interior design, apartment interiors, villa design, modular kitchen, false ceiling',
  viewport: 'width=device-width, initial-scale=1',
  metadataBase: new URL('https://thrayeestudio.com'),
  alternates: {
    canonical: 'https://thrayeestudio.com',
  },
  openGraph: {
    title: 'Thrayee Studio - Premium Interior Design',
    description: 'Elegant interior design solutions for Hyderabad homes',
    type: 'website',
    locale: 'en_IN',
    url: 'https://thrayeestudio.com',
    siteName: 'Thrayee Studio',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Thrayee Studio Interior Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thrayee Studio - Premium Interior Design',
    description: 'Award-winning interior design for Hyderabad homes',
    creator: '@thrayeestudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://thrayeestudio.com" />
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
