'use client'

import React, { useState } from 'react';
import Header from '@/components/ui-landing/Header';
import Footer from '@/components/ui-landing/Footer';
import { BookOpen, Terminal, Monitor, Eye, GitCompare, Search, ChevronRight, Server, Keyboard, Zap, Settings, HelpCircle, Sparkles, Github, Play } from 'lucide-react';
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
      { id: 'demo-video', title: 'Demo Video', href: '#demo-video' },
      { id: 'quick-start', title: 'Quick Start Guide', href: '#quick-start' },
      { id: 'deployment', title: 'Deployment', href: '#deployment' },
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
      { id: 'ai-assistant', title: 'AI Assistant', href: '#ai-assistant' },
      { id: 'real-time-monitoring', title: 'Real-time Monitoring', href: '#real-time-monitoring' },
      { id: 'node-details', title: 'Node Details', href: '#node-details' },
    ]
  },
  {
    id: 'contribute',
    title: 'Contribute',
    icon: Github,
    items: [
      { id: 'github', title: 'GitHub Repository', href: '#github' },
      { id: 'community', title: 'Community', href: '#community' },
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
                        <span><strong>AI-Powered Assistant</strong> - Natural language queries with live pNode data context</span>
                      </li>
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

              {/* Demo Video */}
              <section id="demo-video" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4 flex items-center gap-2">
                  <Play size={24} className="text-primary" />
                  Demo Video
                </h2>
                <p className="text-muted-foreground mb-6">
                  Watch a complete walkthrough of XanTerm&apos;s features and capabilities.
                </p>
                <div className="relative w-full overflow-hidden rounded-xl border border-border bg-black" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/5Ku7AHfIaYI"
                    title="XanTerm Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <a
                    href="https://youtu.be/5Ku7AHfIaYI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <Play size={16} />
                    Watch on YouTube
                  </a>
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

              {/* Deployment */}
              <section id="deployment" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4">Deployment</h2>
                <p className="text-muted-foreground mb-6">
                  Deploy XanTerm to your own infrastructure or use a cloud platform like Vercel.
                </p>

                {/* Local Development */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <h4 className="font-medium text-foreground mb-4">Local Development</h4>
                  <div className="bg-[#141414] rounded-lg p-4 font-mono text-sm text-[#d9d9d9] space-y-2 overflow-x-auto">
                    <p><span className="text-[#a0a0a0]"># Clone the repository</span></p>
                    <p>git clone https://github.com/Olaboye2000/xanterm.git</p>
                    <p>cd XanTerm</p>
                    <p className="mt-3"><span className="text-[#a0a0a0]"># Install dependencies</span></p>
                    <p>npm install</p>
                    <p className="mt-3"><span className="text-[#a0a0a0]"># Set up environment variables</span></p>
                    <p>cp .env.example .env</p>
                    <p className="mt-3"><span className="text-[#a0a0a0]"># Start development server</span></p>
                    <p>npm run dev</p>
                  </div>
                  <p className="text-muted-foreground text-sm mt-4">
                    Open <code className="px-1.5 py-0.5 bg-muted rounded">http://localhost:3000</code> for Terminal Mode
                    or <code className="px-1.5 py-0.5 bg-muted rounded">http://localhost:3000/ui</code> for UI Dashboard.
                  </p>
                </div>

                {/* Environment Variables */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <h4 className="font-medium text-foreground mb-4">Environment Variables</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Variable</th>
                          <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Description</th>
                          <th className="text-left py-2 text-muted-foreground font-medium">Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 pr-4"><code className="px-1.5 py-0.5 bg-muted rounded text-xs">OPENAI_API_KEY</code></td>
                          <td className="py-2 pr-4 text-muted-foreground">OpenAI API key for AI assistant</td>
                          <td className="py-2 text-muted-foreground">Yes (for AI features)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Vercel Deployment */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h4 className="font-medium text-foreground mb-3">Deploy to Vercel (Recommended)</h4>
                  <ol className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-primary">1.</span>
                      Push your code to GitHub
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-primary">2.</span>
                      Import the repository in <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Vercel</a>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-primary">3.</span>
                      Add <code className="px-1.5 py-0.5 bg-muted rounded text-xs">OPENAI_API_KEY</code> to environment variables
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium text-primary">4.</span>
                      Deploy and your platform is live!
                    </li>
                  </ol>
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

              {/* AI Assistant */}
              <section id="ai-assistant" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4 flex items-center gap-2">
                  <Sparkles size={24} className="text-primary" />
                  AI Assistant
                </h2>
                <p className="text-muted-foreground mb-6">
                  XanTerm features an AI-powered assistant that understands your pNode data in real-time.
                  Ask questions in natural language and get instant insights about the network.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h4 className="font-medium text-foreground mb-3">How to Access</h4>
                    <ol className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-primary">1.</span>
                        Click the sparkle button in the bottom-right corner of any page
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-primary">2.</span>
                        Type your question in natural language
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium text-primary">3.</span>
                        Get AI-powered insights with live pNode data context
                      </li>
                    </ol>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6">
                    <h4 className="font-medium text-foreground mb-3">What You Can Ask</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        &quot;What&apos;s the network health?&quot;
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        &quot;Show me the top performing nodes&quot;
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        &quot;Are there any offline nodes?&quot;
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-primary" />
                        &quot;Explain what performance score means&quot;
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Powered by Live Data</h4>
                      <p className="text-muted-foreground text-sm">
                        The AI assistant has access to real-time pNode data including network status,
                        node performance scores, uptime percentages, version distribution, and more.
                        It can provide specific insights based on current network conditions.
                      </p>
                    </div>
                  </div>
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
                <div className="bg-[#141414] border border-[#383838] rounded-xl p-6 font-mono text-sm">
                  <div className="text-[#d9d9d9]">
                    <p>╔══════════════════════════════════════════╗</p>
                    <p>║  XanTerm v1.0 - Xandeum pNode Terminal   ║</p>
                    <p>╚══════════════════════════════════════════╝</p>
                    <p className="mt-2 text-[#a0a0a0]">&gt; Connecting to Xandeum network...</p>
                    <p className="text-[#a0a0a0]">&gt; Status: ONLINE</p>
                    <p className="text-[#a0a0a0]">&gt; Ready for commands</p>
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

              {/* GitHub & Contribute */}
              <section id="github" className="mb-16">
                <h2 className="text-2xl font-medium tracking-tighter mb-4 flex items-center gap-2">
                  <Github size={24} className="text-primary" />
                  Contribute to XanTerm
                </h2>
                <p className="text-muted-foreground mb-6">
                  XanTerm is open source! We welcome contributions from the community.
                </p>

                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[#24292e] flex items-center justify-center flex-shrink-0">
                      <Github size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">GitHub Repository</h4>
                      <p className="text-muted-foreground text-sm mb-3">
                        Star the repo, report issues, or submit pull requests to help improve XanTerm.
                      </p>
                      <a
                        href="https://github.com/Olaboye2000/xanterm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        <Github size={16} />
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h4 className="font-medium text-foreground mb-2">Report Issues</h4>
                    <p className="text-muted-foreground text-sm">
                      Found a bug or have a feature request? Open an issue on GitHub.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h4 className="font-medium text-foreground mb-2">Pull Requests</h4>
                    <p className="text-muted-foreground text-sm">
                      Want to contribute code? Fork the repo and submit a pull request.
                    </p>
                  </div>
                </div>
              </section>

              {/* Community */}
              <section id="community" className="mb-16">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
                  <HelpCircle size={40} className="text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">Join the Community</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with the Xandeum community for support, updates, and discussions.
                  </p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <a
                      href="https://discord.gg/xandeum"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865F2] text-white rounded-lg font-medium hover:bg-[#4752c4] transition-colors"
                    >
                      Discord
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
                      href="https://xandeum.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                    >
                      Website
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
