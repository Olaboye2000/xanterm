'use client'

import React, { useState } from 'react';
import Header from '@/components/ui-landing/Header';
import Footer from '@/components/ui-landing/Footer';
import { BookOpen, Terminal, Monitor, Eye, GitCompare, Search, ChevronRight, Server, Keyboard, Zap, Settings, Bell, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// Documentation sections
const docSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Zap,
    items: [
      { id: 'introduction', title: 'Introduction', href: '#introduction' },
      { id: 'quick-start', title: 'Quick Start Guide', href: '#quick-start' },
      { id: 'modes', title: 'UI vs Terminal Mode', href: '#modes' },
    ]
  },
  {
    id: 'ui-mode',
    title: 'UI Mode',
    icon: Monitor,
    items: [
      { id: 'ui-dashboard', title: 'Dashboard Overview', href: '#ui-dashboard' },
      { id: 'ui-nodes', title: 'pNode Explorer', href: '#ui-nodes' },
      { id: 'ui-watchlist', title: 'Watchlist', href: '#ui-watchlist' },
      { id: 'ui-compare', title: 'Node Comparison', href: '#ui-compare' },
    ]
  },
  {
    id: 'terminal-mode',
    title: 'Terminal Mode',
    icon: Terminal,
    items: [
      { id: 'terminal-overview', title: 'Terminal Overview', href: '#terminal-overview' },
      { id: 'terminal-navigation', title: 'Navigation', href: '#terminal-navigation' },
      { id: 'terminal-shortcuts', title: 'Keyboard Shortcuts', href: '#terminal-shortcuts' },
      { id: 'terminal-commands', title: 'Commands Reference', href: '#terminal-commands' },
    ]
  },
  {
    id: 'features',
    title: 'Features',
    icon: Settings,
    items: [
      { id: 'real-time-monitoring', title: 'Real-time Monitoring', href: '#real-time-monitoring' },
      { id: 'node-details', title: 'Node Details', href: '#node-details' },
      { id: 'alerts', title: 'Alerts & Notifications', href: '#alerts' },
    ]
  },
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('introduction');

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-12 flex-1">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <BookOpen size={32} className="text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium tracking-tighter mb-4">Documentation</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about using XanTerm for monitoring Xandeum pNodes
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto mt-6">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                <Input 
                  placeholder="Search documentation..." 
                  className="pl-10 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-12">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <nav className="sticky top-28 space-y-6">
                {docSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <div key={section.id}>
                      <h3 className="flex items-center gap-2 font-medium text-foreground mb-2">
                        <Icon size={16} />
                        {section.title}
                      </h3>
                      <ul className="space-y-1 ml-6">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <a 
                              href={item.href}
                              className={`block py-1 text-sm transition-colors ${
                                activeSection === item.id 
                                  ? 'text-primary font-medium' 
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                              onClick={() => setActiveSection(item.id)}
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Introduction */}
              <section id="introduction" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4 flex items-center gap-2">
                  <Zap size={24} className="text-primary" />
                  Introduction
                </h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    XanTerm is a powerful monitoring and analytics tool for the Xandeum storage network. 
                    It provides real-time insights into validator node performance, health metrics, and network status.
                  </p>
                  <div className="bg-card border border-border rounded-xl p-6 mt-6">
                    <h4 className="font-medium text-foreground mb-3">Key Features</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>Real-time pNode monitoring with live status updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>Two interface modes: Modern UI and Classic Terminal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>Personal watchlist for tracking favorite nodes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>Side-by-side node comparison with detailed metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>Performance analytics with historical trends</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Quick Start */}
              <section id="quick-start" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4">Quick Start Guide</h2>
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">1</div>
                      <h4 className="font-medium text-foreground">Choose Your Mode</h4>
                    </div>
                    <p className="text-muted-foreground ml-11">
                      XanTerm offers two interface modes. The <strong>UI Mode</strong> provides a modern, visual dashboard experience. 
                      The <strong>Terminal Mode</strong> offers a classic command-line interface for power users.
                    </p>
                  </div>
                  
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">2</div>
                      <h4 className="font-medium text-foreground">Explore pNodes</h4>
                    </div>
                    <p className="text-muted-foreground ml-11">
                      Navigate to the pNodes section to browse all network validators. View their status, performance scores, 
                      storage capacity, and more. Click on any node for detailed information.
                    </p>
                  </div>
                  
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">3</div>
                      <h4 className="font-medium text-foreground">Build Your Watchlist</h4>
                    </div>
                    <p className="text-muted-foreground ml-11">
                      Add nodes you care about to your personal watchlist. You&apos;ll get quick access to their status 
                      and can set up alerts for important changes.
                    </p>
                  </div>
                  
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">4</div>
                      <h4 className="font-medium text-foreground">Compare Performance</h4>
                    </div>
                    <p className="text-muted-foreground ml-11">
                      Use the Compare feature to analyze multiple nodes side-by-side. Compare metrics like uptime, 
                      latency, storage usage, and performance scores.
                    </p>
                  </div>
                </div>
              </section>

              {/* UI vs Terminal Mode */}
              <section id="modes" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4">UI vs Terminal Mode</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Monitor size={20} className="text-primary" />
                      </div>
                      <h3 className="font-medium text-foreground text-lg">UI Mode</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Modern, visual interface with intuitive navigation. Perfect for users who prefer 
                      a graphical experience with dashboards, cards, and interactive elements.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        Visual dashboards and charts
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        Point-and-click interaction
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        Mobile-friendly responsive design
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        Light and dark theme support
                      </li>
                    </ul>
                    <Link 
                      href="/ui" 
                      className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                    >
                      Go to UI Mode <ChevronRight size={14} />
              </Link>
          </div>

                  <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Terminal size={20} className="text-primary" />
                      </div>
                      <h3 className="font-medium text-foreground text-lg">Terminal Mode</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Classic command-line interface with ASCII art styling. Ideal for power users and those 
                      who love the retro terminal aesthetic.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        Keyboard-driven navigation
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        ASCII art visualizations
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        Retro CRT effects
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        Fast, lightweight interface
                      </li>
                    </ul>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                    >
                      Go to Terminal Mode <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </section>

              {/* UI Dashboard */}
              <section id="ui-dashboard" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4 flex items-center gap-2">
                  <Monitor size={24} className="text-primary" />
                  UI Dashboard Overview
                </h2>
                <p className="text-muted-foreground mb-6">
                  The UI dashboard provides a comprehensive view of the Xandeum network at a glance. 
                  Access all features through the navigation bar at the top of the screen.
                </p>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h4 className="font-medium text-foreground mb-4">Navigation Items</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Server size={18} className="text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">pNodes</p>
                        <p className="text-sm text-muted-foreground">Browse all network validators</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Eye size={18} className="text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Watch</p>
                        <p className="text-sm text-muted-foreground">Your personal watchlist</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <GitCompare size={18} className="text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Compare</p>
                        <p className="text-sm text-muted-foreground">Side-by-side node comparison</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BookOpen size={18} className="text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Docs</p>
                        <p className="text-sm text-muted-foreground">Documentation (you are here)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* UI pNode Explorer */}
              <section id="ui-nodes" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4">pNode Explorer</h2>
                <p className="text-muted-foreground mb-6">
                  The pNode Explorer displays all validators on the Xandeum network. Each node shows its current 
                  status, version, performance score, and storage information.
                </p>
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h4 className="font-medium text-foreground">Node Status Indicators</h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm text-muted-foreground">Online - Node is operating normally</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span className="text-sm text-muted-foreground">Delinquent - Node has issues</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-sm text-muted-foreground">Offline - Node is not responding</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* UI Watchlist */}
              <section id="ui-watchlist" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4">Watchlist</h2>
                <p className="text-muted-foreground mb-6">
                  The Watchlist feature allows you to track specific nodes you care about. Add nodes to your 
                  watchlist for quick access and status monitoring.
                </p>
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h4 className="font-medium text-foreground">How to Use</h4>
                  <ol className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-primary">1.</span>
                      Click the &quot;Add Node&quot; button on the Watchlist page
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-primary">2.</span>
                      Search for a node by its public key
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-primary">3.</span>
                      Click on the node to add it to your watchlist
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-primary">4.</span>
                      Your watchlist is saved locally and persists across sessions
                    </li>
                  </ol>
                </div>
              </section>

              {/* UI Compare */}
              <section id="ui-compare" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4">Node Comparison</h2>
                <p className="text-muted-foreground mb-6">
                  Compare up to 5 nodes side-by-side to analyze their performance, uptime, storage, and other metrics.
                </p>
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h4 className="font-medium text-foreground">Comparison Metrics</h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary" />
                      Node Status
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary" />
                      Software Version
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary" />
                      Performance Score
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary" />
                      Uptime Percentage
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary" />
                      Average Latency
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary" />
                      Storage Capacity & Usage
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary" />
                      Geographic Location
                    </li>
                  </ul>
            </div>
              </section>

              {/* Terminal Overview */}
              <section id="terminal-overview" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4 flex items-center gap-2">
                  <Terminal size={24} className="text-primary" />
                  Terminal Mode Overview
                </h2>
                <p className="text-muted-foreground mb-6">
                  Terminal Mode provides a classic command-line interface with ASCII art styling. 
                  It&apos;s designed for power users who prefer keyboard navigation and a retro aesthetic.
                </p>
                <div className="bg-[#0a0a0a] border border-green-900/50 rounded-xl p-6 font-mono text-sm">
                  <div className="text-green-500">
                    <p>╔══════════════════════════════════════════╗</p>
                    <p>║  XanTerm v1.0 - Xandeum pNode Terminal   ║</p>
                    <p>╚══════════════════════════════════════════╝</p>
                    <p className="mt-2 text-green-400">&gt; Connecting to Xandeum network...</p>
                    <p className="text-green-400">&gt; Status: ONLINE</p>
                    <p className="text-green-400">&gt; Ready for commands</p>
                    <p className="mt-2"><span className="animate-pulse">█</span></p>
                  </div>
                </div>
              </section>

              {/* Terminal Navigation */}
              <section id="terminal-navigation" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4">Terminal Navigation</h2>
                <p className="text-muted-foreground mb-6">
                  Navigate through Terminal Mode using the navigation bar at the top. Each section has 
                  a keyboard shortcut for quick access.
                </p>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <code className="px-2 py-1 bg-muted rounded text-sm font-mono">[1] STATUS</code>
                      <span className="text-muted-foreground">Network overview and statistics</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <code className="px-2 py-1 bg-muted rounded text-sm font-mono">[2] NODES</code>
                      <span className="text-muted-foreground">Browse all pNodes</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <code className="px-2 py-1 bg-muted rounded text-sm font-mono">[3] WATCH</code>
                      <span className="text-muted-foreground">Your watchlist</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <code className="px-2 py-1 bg-muted rounded text-sm font-mono">[4] COMPARE</code>
                      <span className="text-muted-foreground">Compare nodes</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <code className="px-2 py-1 bg-muted rounded text-sm font-mono">[?] HELP</code>
                      <span className="text-muted-foreground">Help and shortcuts</span>
              </div>
            </div>
          </div>
              </section>

              {/* Terminal Shortcuts */}
              <section id="terminal-shortcuts" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4 flex items-center gap-2">
                  <Keyboard size={24} className="text-primary" />
                  Keyboard Shortcuts
                </h2>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Shortcut</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="p-4"><code className="px-2 py-1 bg-muted rounded text-sm font-mono">1-4</code></td>
                        <td className="p-4 text-muted-foreground">Navigate to section</td>
                      </tr>
                      <tr>
                        <td className="p-4"><code className="px-2 py-1 bg-muted rounded text-sm font-mono">?</code></td>
                        <td className="p-4 text-muted-foreground">Open help</td>
                      </tr>
                      <tr>
                        <td className="p-4"><code className="px-2 py-1 bg-muted rounded text-sm font-mono">w</code></td>
                        <td className="p-4 text-muted-foreground">Toggle watch on selected node</td>
                      </tr>
                      <tr>
                        <td className="p-4"><code className="px-2 py-1 bg-muted rounded text-sm font-mono">c</code></td>
                        <td className="p-4 text-muted-foreground">Add node to comparison</td>
                      </tr>
                      <tr>
                        <td className="p-4"><code className="px-2 py-1 bg-muted rounded text-sm font-mono">Enter</code></td>
                        <td className="p-4 text-muted-foreground">View node details</td>
                      </tr>
                      <tr>
                        <td className="p-4"><code className="px-2 py-1 bg-muted rounded text-sm font-mono">b</code></td>
                        <td className="p-4 text-muted-foreground">Go back</td>
                      </tr>
                      <tr>
                        <td className="p-4"><code className="px-2 py-1 bg-muted rounded text-sm font-mono">/</code></td>
                        <td className="p-4 text-muted-foreground">Search nodes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Need Help */}
              <section id="help" className="mb-16">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
                  <HelpCircle size={40} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">Need More Help?</h3>
                  <p className="text-muted-foreground mb-6">
                    Can&apos;t find what you&apos;re looking for? Reach out to the Xandeum community for support.
                  </p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <a 
                      href="https://github.com/Pavilion-devs/XanTerm" 
              target="_blank" 
              rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      GitHub
            </a>
            <a 
                      href="https://x.com/xandeum" 
              target="_blank" 
              rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      Twitter/X
            </a>
            <a 
                      href="https://community.xandeum.network" 
              target="_blank" 
              rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      Community
                    </a>
                  </div>
                </div>
              </section>
              </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
