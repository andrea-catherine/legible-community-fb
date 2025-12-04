import type { Metadata } from 'next'
import './globals.css'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'EIA Community Feedback Management',
  description: 'Streamline the collection, organization, and response to public comments during EIA processes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}


