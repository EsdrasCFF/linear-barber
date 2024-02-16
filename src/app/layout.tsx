import type { Metadata } from 'next'
import { Inter, Mulish } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/providers/auth'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

const mulish = Mulish({subsets: ['latin'], weight: ['400', '500', '600', '700', '800']})

export const metadata: Metadata = {
  title: 'Lienar | Barbershop',
  description: 'O shopping das barberarias!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${mulish.className} dark`}>
        <AuthProvider>
          <Toaster/>
          <div className='flex flex-col flex-1' >
            {children}
          </div>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  )
}
