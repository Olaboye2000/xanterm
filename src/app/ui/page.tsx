'use client'

import React from 'react';
import Header from '@/components/ui-landing/Header';
import HeroSection from '@/components/ui-landing/HeroSection';
import Features from '@/components/ui-landing/Features';
import Footer from '@/components/ui-landing/Footer';

export default function UIPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

