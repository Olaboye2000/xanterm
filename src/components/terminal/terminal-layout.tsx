'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CommandBar } from './command-bar'

interface TerminalLayoutProps {
  children: React.ReactNode
  links: { label: string; path: string; shortcut?: string }[]
}

const ASCII_LOGO = `
██╗  ██╗ █████╗ ███╗   ██╗████████╗███████╗██████╗ ███╗   ███╗
╚██╗██╔╝██╔══██╗████╗  ██║╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
 ╚███╔╝ ███████║██╔██╗ ██║   ██║   █████╗  ██████╔╝██╔████╔██║
 ██╔██╗ ██╔══██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
██╔╝ ██╗██║  ██║██║ ╚████║   ██║   ███████╗██║  ██║██║ ╚═╝ ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝`

export function TerminalLayout({ children, links }: TerminalLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState('')
  const [showLogo, setShowLogo] = useState(true)
  const commandBarRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if typing in input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Focus command bar on /
      if (e.key === '/') {
        e.preventDefault()
        commandBarRef.current?.focus()
        return
      }

      // Navigate with number keys
      const keyLink = links.find(l => l.shortcut === e.key)
      if (keyLink) {
        e.preventDefault()
        router.push(keyLink.path)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [links, router])

  return (
    <div className="min-h-screen bg-[#141414] text-[#f2f2f2] p-4 font-mono">
      {/* Header */}
      <header className="border border-[#383838] p-4 mb-4">
        <div className="flex items-start justify-between">
          <div>
            {showLogo ? (
              <pre className="text-[#d9d9d9] text-xs leading-tight hidden md:block">{ASCII_LOGO}</pre>
            ) : (
              <h1 className="text-xl font-bold text-glow">XANTERM</h1>
            )}
            <button
              onClick={() => setShowLogo(!showLogo)}
              className="text-[#4a4a4a] text-xs hover:text-[#d9d9d9] mt-1 md:hidden"
            >
              {showLogo ? '[hide logo]' : '[show logo]'}
            </button>
          </div>
          <div className="text-right text-sm">
            <div className="text-[#d9d9d9]">Xandeum pNode Terminal v1.0.0</div>
            <div className="text-[#b3b3b3]">Connected: <span className="text-[#a0a0a0]">devnet.xandeum.com</span></div>
            <div className="text-[#f2f2f2] font-bold">{currentTime}</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`
                px-3 py-1 border transition-all font-bold
                ${pathname === link.path
                  ? 'bg-[#d9d9d9] !text-[#141414] border-[#d9d9d9]'
                  : 'border-[#383838] text-[#d9d9d9] hover:border-[#d9d9d9] hover:bg-[#2e2e2e]'
                }
              `}
            >
              [{link.shortcut}] {link.label}
            </Link>
          ))}
          <Link
            href="/ui"
            className="px-3 py-1 border transition-all font-bold border-[#a0a0a0] text-[#a0a0a0] hover:bg-[#a0a0a0] hover:!text-[#141414] ml-auto"
          >
            [UI] DASHBOARD
          </Link>
        </nav>
      </header>

      {/* Command Bar */}
      <CommandBar ref={commandBarRef} />

      {/* Main Content */}
      <main className="border border-[#383838] p-4 min-h-[60vh]">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-4 border border-[#383838] p-3 text-sm">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="text-[#b3b3b3]">
            Press <kbd className="text-[#d9d9d9]">/</kbd> to focus command bar | <kbd className="text-[#d9d9d9]">1-4</kbd> navigate | <kbd className="text-[#d9d9d9]">?</kbd> help
          </div>
          <div className="flex gap-4">
            <a
              href="https://xandeum.network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a0a0a0] hover:text-[#f2f2f2] hover:underline"
            >
              xandeum.network
            </a>
            <a
              href="https://github.com/Pavilion-devs/XanTerm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a0a0a0] hover:text-[#f2f2f2] hover:underline"
            >
              github
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
