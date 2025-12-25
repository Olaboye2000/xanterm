'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import NodeBoard from './NodeBoard';
import { Sparkles, Zap, Server } from 'lucide-react';
import Link from 'next/link';

// Typing animation hook
const useTypingAnimation = (text: string, delay: number = 100, startTyping: boolean = false) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    if (!startTyping) {
      setDisplayedText('');
      setShowCursor(true);
      return;
    }
    
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
        // Blink cursor after typing is done
        const cursorTimer = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);
        
        setTimeout(() => {
          clearInterval(cursorTimer);
          setShowCursor(false);
        }, 3000);
      }
    }, delay);
    
    return () => clearInterval(timer);
  }, [text, delay, startTyping]);
  
  return { displayedText, showCursor };
};

// Floating particles component - client-side only to avoid hydration mismatch
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    left: number;
    top: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Generate random positions only on client side
    setParticles(
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full animate-ping"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const { displayedText, showCursor } = useTypingAnimation(
    'Monitor Xandeum pNodes', 
    80,
    startTyping
  );
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start typing animation after fade in
          setTimeout(() => setStartTyping(true), 800);
        } else {
          // Reset animations when scrolling away and coming back
          setIsVisible(false);
          setStartTyping(false);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('hero-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero-section" className="relative w-full py-12 md:py-20 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Enhanced background effects */}
      <FloatingParticles />
      <div className="absolute inset-0 cosmic-grid opacity-30"></div>
      
      {/* Multiple gradient glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-pulse">
        <div className="w-full h-full opacity-10 bg-primary blur-[120px]"></div>
      </div>
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full">
        <div className="w-full h-full opacity-5 bg-primary blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute top-2/3 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full">
        <div className="w-full h-full opacity-8 bg-primary blur-[60px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className={`relative z-10 max-w-4xl text-center space-y-6 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm animate-bounce">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Xandeum Network Analytics
            <Sparkles className="h-4 w-4 animate-pulse text-primary" />
          </span>
        </div>
        
        <div className="min-h-[120px] md:min-h-[200px] lg:min-h-[280px] flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-balance text-center">
            {startTyping ? (
              <span className="relative">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  {displayedText}
                </span>
                {showCursor && (
                  <span className="absolute animate-pulse text-primary ml-1">|</span>
                )}
              </span>
            ) : (
              <span className="opacity-0">Monitor Xandeum pNodes</span>
            )}
          </h1>
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Real-time analytics and monitoring for Xandeum storage network validators. Track performance, compare nodes, and stay ahead with instant alerts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 items-center">
          <Link href="/ui/nodes">
            <Button className="group bg-primary text-primary-foreground hover:bg-primary/90 text-base h-12 px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative flex items-center gap-2">
                <Server className="w-4 h-4 group-hover:animate-pulse" />
                Explore pNodes
              </span>
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="group border-border text-foreground hover:bg-primary/10 hover:border-primary hover:text-primary text-base h-12 px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <span className="flex items-center gap-2">
                Terminal Mode
                <Zap className="w-4 h-4 group-hover:animate-pulse transition-all duration-300" />
              </span>
            </Button>
          </Link>
        </div>
        
        <div className="pt-6 text-sm text-muted-foreground">
          Trusted by validators and operators to monitor network health
        </div>
      </div>
      
      {/* Node Activity Dashboard integrated in hero section with glassmorphic effect */}
      <div className={`w-full max-w-7xl mt-12 z-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="cosmic-glow relative rounded-xl overflow-hidden border border-border backdrop-blur-sm bg-card shadow-lg">
          {/* Dashboard Header */}
          <div className="bg-card backdrop-blur-md w-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                  <div className="h-3 w-3 rounded-sm bg-foreground"></div>
                </div>
                <span className="text-foreground font-medium">pNode Activity Dashboard</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-muted border-2 border-card"></div>
                  <div className="h-8 w-8 rounded-full bg-muted/80 border-2 border-card"></div>
                  <div className="h-8 w-8 rounded-full bg-muted/60 border-2 border-card"></div>
                  <div className="h-8 w-8 rounded-full bg-muted/40 border-2 border-card flex items-center justify-center text-xs text-foreground">+3</div>
                </div>
                
                <div className="h-8 px-3 rounded-md bg-muted flex items-center justify-center text-foreground text-sm">
                  Live
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="flex h-[600px] overflow-hidden">
              {/* Sidebar */}
              <div className="w-64 border-r border-border p-4 space-y-4 hidden md:block bg-card">
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground uppercase">Navigation</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-muted text-foreground">
                      <div className="h-3 w-3 rounded-sm bg-foreground"></div>
                      <span>All Nodes</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                      <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                      <span>Watchlist</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                      <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                      <span>Comparisons</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                      <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                      <span>Analytics</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <div className="text-xs text-muted-foreground uppercase">Node Status</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                      <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                      <span>Online</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                      <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                      <span>Delinquent</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                      <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                      <span>Offline</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 p-4 bg-background overflow-hidden">
                {/* Board Header */}
                <div className="flex items-center justify-between mb-6 min-w-0">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <h3 className="font-medium text-foreground">Node Activities</h3>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">156</span>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 9L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 9L17 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 17L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="h-8 px-3 rounded-md bg-foreground text-background flex items-center justify-center text-sm font-medium whitespace-nowrap">
                      Add to Watchlist
                    </div>
                  </div>
                </div>
                
                {/* Node Board */}
                <div className="overflow-hidden">
                  <NodeBoard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
