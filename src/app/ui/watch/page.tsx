'use client'

import React, { useState, useEffect } from 'react';
import Header from '@/components/ui-landing/Header';
import Footer from '@/components/ui-landing/Footer';
import { Eye, Plus, Bell, Search, Trash2, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usePNodes } from '@/hooks/usePNodes';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '@/lib/watchlist';
import Link from 'next/link';

// Helper to extract pnodeIds from watchlist
const getWatchlistIds = () => getWatchlist().map(item => item.pnodeId);

export default function WatchPage() {
  const { data: pnodes, isLoading } = usePNodes();
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load watchlist on mount
  useEffect(() => {
    setWatchlistIds(getWatchlistIds());
  }, []);

  // Get watched nodes data
  const watchedNodes = pnodes?.filter(node => watchlistIds.includes(node.id)) || [];

  // Filter available nodes for search
  const availableNodes = pnodes?.filter(node => 
    !watchlistIds.includes(node.id) &&
    (node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     (node.version && node.version.toLowerCase().includes(searchQuery.toLowerCase())))
  ).slice(0, 10) || [];

  const handleAddNode = (pubkey: string) => {
    addToWatchlist(pubkey);
    setWatchlistIds(getWatchlistIds());
    setSearchQuery('');
    setIsDialogOpen(false);
  };

  const handleRemoveNode = (pubkey: string) => {
    removeFromWatchlist(pubkey);
    setWatchlistIds(getWatchlistIds());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'delinquent': return 'bg-yellow-500';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-12 px-6 md:px-12 flex-1">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-medium tracking-tighter">Watchlist</h1>
              <p className="text-muted-foreground text-lg">Track your favorite nodes and get instant updates</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Add Node
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Node to Watchlist</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="Search by pubkey..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {isLoading ? (
                    <div className="text-center py-4 text-muted-foreground">Loading nodes...</div>
                  ) : searchQuery.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {availableNodes.length > 0 ? (
                        availableNodes.map((node) => (
                          <button 
                            key={node.id}
                            type="button"
                            className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer text-left"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddNode(node.id);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`h-2 w-2 rounded-full ${getStatusColor(node.status)}`} />
                              <div>
                                <p className="font-mono text-sm">{node.id.slice(0, 20)}...</p>
                                <p className="text-xs text-muted-foreground">{node.version || 'Unknown version'}</p>
                              </div>
                            </div>
                            <Plus size={16} className="text-muted-foreground" />
                          </button>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">No matching nodes found</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      Start typing to search for nodes
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Watched Nodes List */}
          {watchedNodes.length > 0 ? (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-medium text-foreground">Your Watchlist</h2>
                <span className="text-sm text-muted-foreground">{watchedNodes.length} nodes</span>
              </div>
              <div className="divide-y divide-border">
                {watchedNodes.map((node) => (
                  <div 
                    key={node.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-3 w-3 rounded-full ${getStatusColor(node.status)}`} />
                      <div>
                        <p className="font-mono text-sm text-foreground">{node.id.slice(0, 24)}...</p>
                        <p className="text-xs text-muted-foreground">{node.version || 'Unknown version'} • Score: {node.performanceScore || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/ui/nodes/${node.id}`}>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          <ExternalLink size={16} />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        onClick={() => handleRemoveNode(node.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-card border border-border rounded-xl p-12 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Eye size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground">No nodes in your watchlist</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Add nodes to your watchlist to track their status and performance. You&apos;ll get instant notifications when something changes.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Bell size={16} />
                  Configure Alerts
                </Button>
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus size={16} />
                  Add First Node
                </Button>
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Eye size={20} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground">Real-time Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Monitor node status changes as they happen with live updates.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell size={20} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground">Smart Alerts</h4>
              <p className="text-sm text-muted-foreground">
                Get notified via email, Slack, or Discord when nodes go offline.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus size={20} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground">Unlimited Nodes</h4>
              <p className="text-sm text-muted-foreground">
                Add as many nodes as you need to your personal watchlist.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
