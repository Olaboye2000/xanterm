'use client'

import React, { useState, useEffect } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Activity, Server, Eye, GitCompare, Bell, BarChart3 } from "lucide-react";

// Custom hook for staggered animation
const useStaggeredAnimation = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return { hoveredIndex, setHoveredIndex };
};

const Features = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  const { hoveredIndex, setHoveredIndex } = useStaggeredAnimation();
  const [isVisible, setIsVisible] = useState(false);
  
  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);
  
  const features = [
    {
      title: "Real-time Monitoring",
      description: "Track pNode status, performance, and health metrics in real-time.",
      expandedDescription: "Get instant visibility into your Xandeum storage network nodes. Monitor uptime, sync status, and performance scores with live updates every few seconds. Never miss a critical event with our real-time dashboard.",
      icon: <Activity size={24} className="transition-all duration-500 ease-out" />
    },
    {
      title: "Node Explorer",
      description: "Browse and search all network validators with detailed analytics.",
      expandedDescription: "Explore the entire Xandeum network with our comprehensive node explorer. Filter by status, version, stake amount, and performance. View detailed information about any validator including historical data and trends.",
      icon: <Server size={24} className="transition-all duration-500 ease-out" />
    },
    {
      title: "Watchlist",
      description: "Track your favorite nodes and get instant notifications on changes.",
      expandedDescription: "Create a personalized watchlist of nodes you care about. Whether they're your own validators or competitors, keep tabs on their status and performance. Receive alerts when status changes or performance degrades.",
      icon: <Eye size={24} className="transition-all duration-500 ease-out" />
    },
    {
      title: "Node Comparison",
      description: "Compare multiple validators side-by-side to analyze performance.",
      expandedDescription: "Select up to 5 nodes and compare their metrics side-by-side. Analyze uptime, stake distribution, version adoption, and performance scores. Make informed decisions about which validators to stake with.",
      icon: <GitCompare size={24} className="transition-all duration-500 ease-out" />
    },
    {
      title: "Smart Alerts",
      description: "Configure custom alerts for node status changes and performance thresholds.",
      expandedDescription: "Set up intelligent alerts based on your criteria. Get notified when a node goes offline, becomes delinquent, or drops below your performance threshold. Integrate with Slack, Discord, or email for instant notifications.",
      icon: <Bell size={24} className="transition-all duration-500 ease-out" />
    },
    {
      title: "Advanced Analytics",
      description: "Deep dive into network health, version distribution, and stake analysis.",
      expandedDescription: "Access comprehensive network analytics including stake distribution, version adoption rates, geographic distribution, and historical trends. Export data for your own analysis or share insights with your team.",
      icon: <BarChart3 size={24} className="transition-all duration-500 ease-out" />
    }
  ];
  
  const toggleFeature = (index: number) => {
    setOpenFeature(openFeature === index ? null : index);
  };
  
  return (
    <section id="features" className="w-full py-12 md:py-16 px-6 md:px-12">
      <div id="features-section" className="opacity-0"></div>
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
            Everything you need to monitor pNodes
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive tools to track, analyze, and optimize your Xandeum network presence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openFeature === index}
              onOpenChange={() => toggleFeature(index)}
              className={`group relative rounded-xl border overflow-hidden transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                openFeature === index 
                  ? 'border-primary/60 shadow-xl shadow-primary/20 bg-gradient-to-br from-primary/5 via-card to-primary/5' 
                  : hoveredIndex === index
                  ? 'border-primary/40 shadow-lg shadow-primary/10 bg-gradient-to-br from-primary/3 via-card to-card'
                  : 'border-border cosmic-gradient hover:border-primary/30'
              } ${
                isVisible 
                  ? `opacity-100 translate-y-0 transition-all duration-700 ease-out` 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <CollapsibleTrigger className="relative w-full text-left p-6 flex flex-col z-10">
                <div className="flex justify-between items-start">
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                    hoveredIndex === index || openFeature === index
                      ? 'bg-primary/20 shadow-lg shadow-primary/30 scale-110'
                      : 'bg-muted/30 group-hover:bg-primary/10'
                  }`}>
                    <div className={`transition-all duration-500 ${
                      hoveredIndex === index 
                        ? 'text-primary scale-125 rotate-12' 
                        : openFeature === index
                        ? 'text-primary scale-110 rotate-6'
                        : 'text-muted-foreground group-hover:text-primary group-hover:scale-110'
                    }`}>
                      {feature.icon}
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 transition-all duration-300 ${
                      openFeature === index 
                        ? 'rotate-180 text-primary' 
                        : hoveredIndex === index 
                        ? 'text-primary scale-110' 
                        : 'text-muted-foreground group-hover:text-primary'
                    }`}
                  />
                </div>
                <h3 className={`text-xl font-medium tracking-tighter mb-3 transition-colors duration-300 ${
                  hoveredIndex === index || openFeature === index ? 'text-primary' : 'text-foreground'
                }`}>{feature.title}</h3>
                <p className={`transition-colors duration-300 ${
                  hoveredIndex === index || openFeature === index ? 'text-foreground' : 'text-muted-foreground'
                }`}>{feature.description}</p>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-border/50">
                  <p className="text-muted-foreground">{feature.expandedDescription}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Learn more →
                    </button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
