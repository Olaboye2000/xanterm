'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { Menu, X, Server, Eye, GitCompare, Terminal, Sun, Moon, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { id: 'pnodes', label: 'pNodes', href: '/ui/nodes', icon: Server },
  { id: 'watch', label: 'Watch', href: '/ui/watch', icon: Eye },
  { id: 'compare', label: 'Compare', href: '/ui/compare', icon: GitCompare },
  { id: 'docs', label: 'Docs', href: '/ui/docs', icon: BookOpen },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode for XanTerm
  const pathname = usePathname();
  
  useEffect(() => {
    // Apply the theme to the document when it changes
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const isActive = (href: string) => {
    if (href === '/ui') return pathname === '/ui';
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <header className="w-full max-w-7xl mx-auto py-3 px-6 md:px-8 flex items-center justify-between">
        <Link href="/ui" aria-label="Go to dashboard" className="p-3 inline-block">
          <Logo />
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-3 rounded-2xl text-muted-foreground hover:text-foreground"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
          <div className="rounded-full px-1 py-1 backdrop-blur-md bg-background/80 border border-border shadow-lg flex gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full transition-colors relative flex items-center gap-1.5 text-sm font-medium",
                    isActive(link.href) 
                      ? 'text-accent-foreground bg-accent' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Modal */}
            <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md py-6 px-6 border border-border rounded-2xl shadow-xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      className={cn(
                        "px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-2",
                        isActive(link.href) 
                          ? 'bg-accent text-accent-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon size={16} />
                      {link.label}
                    </Link>
                  );
                })}
                
                <div className="border-t border-border my-2" />
                
                {/* Terminal Mode Link */}
                <Link
                  href="/"
                  className="px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Terminal size={16} />
                  Terminal Mode
                </Link>
                
                {/* Theme toggle for mobile */}
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <div className="flex items-center gap-2">
                    <Moon size={16} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                    <Switch 
                      checked={!isDarkMode} 
                      onCheckedChange={toggleTheme} 
                      className="data-[state=checked]:bg-primary"
                    />
                    <Sun size={16} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="hidden md:flex items-center gap-4">
          {/* Theme toggle for desktop */}
          <div className="flex items-center gap-2 rounded-full px-3 py-2">
            <Moon size={18} className={`${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
            <Switch 
              checked={!isDarkMode} 
              onCheckedChange={toggleTheme} 
              className="data-[state=checked]:bg-primary"
            />
            <Sun size={18} className={`${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="rounded-2xl">
            <Link href="/">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2">
                <Terminal size={16} />
                Terminal Mode
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
