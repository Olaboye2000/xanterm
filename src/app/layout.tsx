import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/components/app-providers'
import { AIChatButton } from '@/components/ai-chat'
import React from 'react'

export const metadata: Metadata = {
  title: 'XanTerm - Xandeum pNode Terminal',
  description: 'Terminal-style analytics for the Xandeum storage network',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProviders>
          {children}
          <AIChatButton />
        </AppProviders>
      </body>
    </html>
  )
}

// Patch BigInt so we can log it using JSON.stringify without any errors
declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}
