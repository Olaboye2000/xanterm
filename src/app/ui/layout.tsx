import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'XanTerm Dashboard - Xandeum pNode Analytics',
  description: 'Modern analytics dashboard for the Xandeum storage network',
}

export default function UILayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="dashboard-theme">
      {children}
    </div>
  )
}
