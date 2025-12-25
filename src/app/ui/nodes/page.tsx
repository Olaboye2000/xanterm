'use client'

import React from 'react';
import Header from '@/components/ui-landing/Header';
import Footer from '@/components/ui-landing/Footer';
import { usePNodes } from '@/hooks/usePNodes';
import { Server, Activity, AlertTriangle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function NodesPage() {
  const { data: pnodes, isLoading, error } = usePNodes();

  const onlineNodes = pnodes?.filter(n => n.status === 'online') || [];
  const offlineNodes = pnodes?.filter(n => n.status === 'offline') || [];
  const delinquentNodes = pnodes?.filter(n => n.status === 'delinquent') || [];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-12 px-6 md:px-12 flex-1">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tighter">pNode Explorer</h1>
            <p className="text-muted-foreground text-lg">Browse and monitor all Xandeum network validators</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Server size={18} />
                <span className="text-sm">Total Nodes</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{isLoading ? '...' : pnodes?.length || 0}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-green-500">
                <Activity size={18} />
                <span className="text-sm">Online</span>
              </div>
              <p className="text-3xl font-bold text-green-500">{isLoading ? '...' : onlineNodes.length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-yellow-500">
                <AlertTriangle size={18} />
                <span className="text-sm">Delinquent</span>
              </div>
              <p className="text-3xl font-bold text-yellow-500">{isLoading ? '...' : delinquentNodes.length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-2">
              <div className="flex items-center gap-2 text-red-500">
                <XCircle size={18} />
                <span className="text-sm">Offline</span>
              </div>
              <p className="text-3xl font-bold text-red-500">{isLoading ? '...' : offlineNodes.length}</p>
            </div>
          </div>

          {/* Node List */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-medium text-foreground">All Nodes</h2>
            </div>
            
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground">
                <div className="animate-pulse">Loading nodes...</div>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">
                Failed to load nodes. Please try again.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {pnodes?.slice(0, 20).map((node) => (
                  <Link 
                    key={node.id} 
                    href={`/ui/nodes/${node.id}`}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-3 w-3 rounded-full ${
                        node.status === 'online' ? 'bg-green-500' : 
                        node.status === 'delinquent' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-mono text-sm text-foreground">{node.id.slice(0, 16)}...</p>
                        <p className="text-xs text-muted-foreground">{node.version || 'Unknown version'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground">{node.performanceScore || 0}</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

