'use client'

import { ReactQueryProvider } from './react-query-provider'
import { ClusterProvider } from '@/components/cluster/cluster-data-access'
import React from 'react'

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryProvider>
      <ClusterProvider>
        {children}
      </ClusterProvider>
    </ReactQueryProvider>
  )
}
