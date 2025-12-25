'use client'

import React from 'react';
import Logo from './Logo';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-16 px-6 md:px-12 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-6">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              Real-time analytics and monitoring for the Xandeum storage network validators.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://x.com/xandeum" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://github.com/Pavilion-devs/XanTerm" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://discord.gg/xandeum" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-lg text-foreground">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/ui/nodes" className="text-muted-foreground hover:text-foreground transition-colors">pNodes</Link></li>
              <li><Link href="/ui/watch" className="text-muted-foreground hover:text-foreground transition-colors">Watchlist</Link></li>
              <li><Link href="/ui/compare" className="text-muted-foreground hover:text-foreground transition-colors">Compare</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Terminal Mode</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-lg text-foreground">Xandeum</h4>
            <ul className="space-y-3">
              <li><a href="https://xandeum.network" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Website</a></li>
              <li><a href="https://docs.xandeum.network" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="https://xandeum.network/explorer" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Explorer</a></li>
              <li><a href="https://github.com/xandeum" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-lg text-foreground">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/ui/docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><a href="https://discord.gg/xandeum" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
              <li><a href="https://github.com/Pavilion-devs/XanTerm" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Contribute</a></li>
              <li><a href="https://status.xandeum.network" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <div>© 2025 XanTerm. Built by Pavilion Devs.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://xandeum.network" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Xandeum Network</a>
            <Link href="/ui/docs" className="hover:text-foreground transition-colors">Docs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
