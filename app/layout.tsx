import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ancient African Secrets | Health Wisdom from the Motherland',
  description: 'Discover natural health secrets passed down through generations of African ancestors. Free guides, proven wisdom, real results.',
  keywords: ['african superfoods', 'natural detox', 'moringa', 'rooibos', 'african health', 'ancestral wisdom'],
  openGraph: {
    title: 'Ancient African Secrets',
    description: 'Health wisdom from the motherland. Free guides + proven natural remedies.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Ancient African Secrets',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ancient African Secrets',
    description: 'Health wisdom from the motherland. Free guides + proven natural remedies.',
  },
  robots: 'index, follow',
  themeColor: '#D4A63C',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
