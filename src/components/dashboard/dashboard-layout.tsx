'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Server,
  Eye,
  GitCompare,
  HelpCircle,
  Terminal,
  Sun,
  Moon,
  Activity,
  ChevronLeft,
  ExternalLink,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/ui', icon: LayoutDashboard },
  { name: 'Nodes', href: '/ui/nodes', icon: Server },
  { name: 'Watchlist', href: '/ui/watch', icon: Eye },
  { name: 'Compare', href: '/ui/compare', icon: GitCompare },
  { name: 'Help', href: '/ui/help', icon: HelpCircle },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`dashboard-theme font-inter ${isDarkMode ? '' : 'light-mode'}`}>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader className="p-4">
            <Link href="/ui" className="flex items-center gap-2">
              <Activity className="h-6 w-6" />
              <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">
                XanTerm
              </span>
            </Link>
          </SidebarHeader>

          <Separator className="mx-2" />

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => {
                    const isActive = pathname === item.href ||
                      (item.href !== '/ui' && pathname.startsWith(item.href))
                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.name}
                        >
                          <Link href={item.href}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>External</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Xandeum Network">
                      <a
                        href="https://xandeum.network"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>xandeum.network</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="GitHub">
                      <a
                        href="https://github.com/Pavilion-devs/XanTerm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>GitHub</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-2">
            <Separator className="mb-2" />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Terminal Mode">
                  <Link href="/" className="text-muted-foreground">
                    <Terminal className="h-4 w-4" />
                    <span>Terminal Mode</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4">
            <SidebarTrigger className="-ml-1" />

            <div className="flex-1 flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                Connected
              </span>
              <span className="text-muted-foreground/50">|</span>
              <span className="text-sm text-muted-foreground">devnet.xandeum.com</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-8 w-8"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
