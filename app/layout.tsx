import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2C2C2C',
}

export const metadata: Metadata = {
  title: 'Thrayee Studio - Premium Interior Design Hyderabad',
  description: 'Thrayee Studio creates premium interior design solutions for apartments, villas, and homes in Hyderabad. Designing beyond walls.',
  keywords: 'interior design hyderabad, home interior design, apartment interiors, villa design, modular kitchen, false ceiling',
  metadataBase: new URL('https://thrayeestudio.com'),
  applicationName: 'Thrayee Studio',
  alternates: {
    canonical: 'https://thrayeestudio.com',
  },
  icons: {
    icon: [
      { url: '/brand/favicon.ico', sizes: 'any' },
      { url: '/brand/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/brand/favicon.ico'],
  },
  openGraph: {
    title: 'Thrayee Studio - Premium Interior Design',
    description: 'Thrayee Studio designs premium interior spaces for Hyderabad homes. Designing beyond walls.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://thrayeestudio.com',
    siteName: 'Thrayee Studio',
    images: [
      {
        url: '/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Thrayee Studio brand identity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thrayee Studio - Premium Interior Design',
    description: 'Thrayee Studio designs premium interior spaces for Hyderabad homes. Designing beyond walls.',
    creator: '@thrayeestudio',
    images: ['/brand/og-image.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Thrayee Studio',
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
