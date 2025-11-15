import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'  // ← ЗАКРЫТО: next/font падает в Docker
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })  // ← ЗАКРЫТО

export const metadata: Metadata = {
  title: 'WebStudio - Professional Web Development Studio',
  description: 'Modern web development studio specializing in SEO & Digital Marketing, Custom Software Development, and AI/LLM Integration solutions for businesses in the CIS region.',
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