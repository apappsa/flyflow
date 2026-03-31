import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FlyFlow - Tu compañero de viaje',
  description: 'Seguimiento de vuelos en tiempo real',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
