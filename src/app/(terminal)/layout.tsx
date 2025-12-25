'use client'

import { TerminalLayout } from '@/components/terminal/terminal-layout'
import React from 'react'

const links: { label: string; path: string; shortcut?: string }[] = [
  { label: 'STATUS', path: '/', shortcut: '1' },
  { label: 'NODES', path: '/nodes', shortcut: '2' },
  { label: 'WATCH', path: '/watch', shortcut: '3' },
  { label: 'COMPARE', path: '/compare', shortcut: '4' },
  { label: 'HELP', path: '/help', shortcut: '?' },
]

export default function TerminalGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="scanlines crt flicker">
      <TerminalLayout links={links}>{children}</TerminalLayout>
    </div>
  )
}

