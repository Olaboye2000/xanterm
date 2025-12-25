'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterUiSelect } from './cluster/cluster-ui'
import { WalletButton } from '@/components/solana/solana-provider'
import { ConnectionStatus } from '@/components/connection-status'
import { GlobalSearch } from '@/components/global-search'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-4">
        {/* Logo */}
        <div className="mr-6 flex items-center">
          <Link className="flex items-center space-x-2" href="/">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">O</span>
            </div>
            <span className="font-bold text-xl tracking-tight">Catalan</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 flex-1">
          {links.map(({ label, path }) => (
            <Link
              key={path}
              href={path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                isActive(path)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-auto"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-2">
          <GlobalSearch />
          <div className="h-4 w-px bg-border mx-1" />
          <ConnectionStatus />
          <div className="h-4 w-px bg-border mx-1" />
          <WalletButton />
          <ClusterUiSelect />
          <ThemeSelect />
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-lg border-t">
            <div className="flex flex-col p-4 space-y-4">
              <nav className="flex flex-col space-y-1">
                {links.map(({ label, path }) => (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setShowMenu(false)}
                    className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive(path)
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
              <div className="h-px bg-border" />
              <div className="flex flex-col space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <ConnectionStatus />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Network</span>
                  <ClusterUiSelect />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeSelect />
                </div>
                <div className="pt-2">
                  <WalletButton />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
