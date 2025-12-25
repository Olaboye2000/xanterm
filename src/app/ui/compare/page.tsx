'use client'

import React, { useState, useEffect } from 'react';
import Header from '@/components/ui-landing/Header';
import Footer from '@/components/ui-landing/Footer';
import { GitCompare, Plus, Search, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usePNodes } from '@/hooks/usePNodes';
import { formatBytes } from '@/lib/format';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ComparePage() {
  const { data: pnodes, isLoading } = usePNodes();
  const searchParams = useSearchParams();
  const [compareList, setCompareList] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const nodesParam = searchParams.get('nodes');
    if (nodesParam) {
      const nodes = nodesParam.split(',').filter(Boolean);
      setCompareList(nodes);
    }
  }, [searchParams]);

  // Get compared nodes data
  const comparedNodes = pnodes?.filter(node => compareList.includes(node.id)) || [];

  // Filter available nodes for search
  const availableNodes = pnodes?.filter(node => 
    !compareList.includes(node.id) &&
    (node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     (node.version && node.version.toLowerCase().includes(searchQuery.toLowerCase())))
  ).slice(0, 10) || [];

  const handleAddNode = (pubkey: string) => {
    if (compareList.length < 5) {
      setCompareList([...compareList, pubkey]);
      setSearchQuery('');
      setIsDialogOpen(false);
    }
  };

  const handleRemoveNode = (pubkey: string) => {
    setCompareList(compareList.filter(id => id !== pubkey));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'delinquent': return 'bg-yellow-500';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-red-500';
      case 'delinquent': return 'text-yellow-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-12 px-6 md:px-12 flex-1">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tighter">Compare Nodes</h1>
            <p className="text-muted-foreground text-lg">Analyze and compare validator performance side-by-side</p>
          </div>

          {/* Search and Add */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Select nodes to compare (max 5)</h3>
              <span className="text-sm text-muted-foreground">{compareList.length}/5 selected</span>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="flex items-center gap-2" 
                  disabled={compareList.length >= 5}
                >
                  <Plus size={16} />
                  Add Node to Compare
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Node to Compare</DialogTitle>
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
                          <div 
                            key={node.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                            onClick={() => handleAddNode(node.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`h-2 w-2 rounded-full ${getStatusColor(node.status)}`} />
                              <div>
                                <p className="font-mono text-sm">{node.id.slice(0, 20)}...</p>
                                <p className="text-xs text-muted-foreground">{node.version || 'Unknown version'}</p>
                              </div>
                            </div>
                            <Plus size={16} className="text-muted-foreground" />
                          </div>
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

          {/* Selected Nodes */}
          {compareList.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {compareList.map((pubkey) => {
                const node = pnodes?.find(n => n.id === pubkey);
                return (
                  <div 
                    key={pubkey}
                    className="flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5"
                  >
                    <div className={`h-2 w-2 rounded-full ${node ? getStatusColor(node.status) : 'bg-muted'}`} />
                    <span className="font-mono text-sm">{pubkey.slice(0, 12)}...</span>
                    <button 
                      onClick={() => handleRemoveNode(pubkey)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Comparison Table */}
          {comparedNodes.length > 0 ? (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Metric</th>
                      {comparedNodes.map((node) => (
                        <th key={node.id} className="text-left p-4 min-w-[180px]">
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${getStatusColor(node.status)}`} />
                            <span className="font-mono text-xs">{node.id.slice(0, 12)}...</span>
                            <Link href={`/ui/nodes/${node.id}`}>
                              <ExternalLink size={12} className="text-muted-foreground hover:text-foreground" />
                            </Link>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Status</td>
                      {comparedNodes.map((node) => (
                        <td key={node.id} className={`p-4 capitalize font-medium ${getStatusText(node.status)}`}>
                          {node.status}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Version</td>
                      {comparedNodes.map((node) => (
                        <td key={node.id} className="p-4 text-sm">
                          {node.version || 'Unknown'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Performance Score</td>
                      {comparedNodes.map((node) => (
                        <td key={node.id} className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${node.performanceScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{node.performanceScore}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Uptime</td>
                      {comparedNodes.map((node) => (
                        <td key={node.id} className="p-4 text-sm">
                          {node.performance?.uptime?.toFixed(1) || 0}%
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Latency</td>
                      {comparedNodes.map((node) => (
                        <td key={node.id} className="p-4 text-sm text-yellow-500">
                          {node.performance?.averageLatency || 0}ms
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Storage Capacity</td>
                      {comparedNodes.map((node) => (
                        <td key={node.id} className="p-4 text-sm">
                          {formatBytes(node.storage?.capacityBytes || 0)}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm text-muted-foreground">Storage Used</td>
                      {comparedNodes.map((node) => (
                        <td key={node.id} className="p-4 text-sm">
                          {formatBytes(node.storage?.usedBytes || 0)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 text-sm text-muted-foreground">Location</td>
                      {comparedNodes.map((node) => (
                        <td key={node.id} className="p-4 text-sm">
                          {node.location || 'Unknown'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-card border border-border rounded-xl p-12 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                <GitCompare size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium text-foreground">Add nodes to compare</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Select up to 5 nodes to compare their performance metrics, uptime, stake distribution, and more.
              </p>
            </div>
          )}

          {/* Comparison Slots (when empty) */}
          {compareList.length === 0 && (
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((slot) => (
                <Dialog key={slot} open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <div 
                      className="bg-card border border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px] hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Plus size={24} className="text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">Add Node {slot}</p>
                    </div>
                  </DialogTrigger>
                </Dialog>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
