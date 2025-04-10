import './globals.css'
import '../components/common/animations.css'
import '../components/common/responsive.css'
import AnimationProvider from '@/components/common/AnimationProvider'
import ResponsiveProvider from '@/components/common/ResponsiveProvider'
import ServiceWorkerRegistration from '@/components/common/ServiceWorkerRegistration'
import { AuthProvider } from './providers'

export const metadata = {
  title: 'Result Declaration System',
  description: 'A complete result declaration system for educational institutions',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <AuthProvider>
          <AnimationProvider>
            <ResponsiveProvider>
              {children}
              <ServiceWorkerRegistration />
            </ResponsiveProvider>
          </AnimationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
