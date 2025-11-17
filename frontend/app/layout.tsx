import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'  // ← ЗАКРЫТО: next/font падает в Docker
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })  // ← ЗАКРЫТО

export const metadata: Metadata = {
  title: {
    default: 'WebStudio - Professional Web Development Studio',
    template: '%s | WebStudio'
  },
  description: 'Modern web development studio specializing in SEO & Digital Marketing, Custom Software Development, and AI/LLM Integration solutions for businesses in the CIS region.',
  keywords: ['web development', 'SEO', 'digital marketing', 'software development', 'AI integration', 'LLM', 'CIS', 'web studio'],
  authors: [{ name: 'WebStudio' }],
  creator: 'WebStudio',
  publisher: 'WebStudio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'WebStudio - Professional Web Development Studio',
    description: 'Modern web development studio specializing in SEO & Digital Marketing, Custom Software Development, and AI/LLM Integration solutions.',
    siteName: 'WebStudio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebStudio - Professional Web Development Studio',
    description: 'Modern web development studio specializing in SEO & Digital Marketing, Custom Software Development, and AI/LLM Integration solutions.',
    creator: '@webstudio',
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
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
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
        {/* Загружаем Inter вручную — не падает при сборке */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  )
}