'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { usePNodes } from '@/hooks/usePNodes'
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '@/lib/watchlist'
import { useState, useEffect, useMemo } from 'react'
import { formatBytes } from '@/lib/format'
import Header from '@/components/ui-landing/Header'
import Footer from '@/components/ui-landing/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Star, Copy, GitCompare, Server, Activity, HardDrive, Wifi, Clock, MapPin, Check } from 'lucide-react'
import Link from 'next/link'

interface NodeDetailPageProps {
  params: Promise<{ pubkey: string }>
}

export default function NodeDetailPage({ params }: NodeDetailPageProps) {
  const { pubkey } = use(params)
  const router = useRouter()
  const { data: pnodes, isLoading, error } = usePNodes()
  const [isWatched, setIsWatched] = useState(false)
  const [copied, setCopied] = useState(false)

  // Find the specific node
  const node = useMemo(() => {
    return pnodes?.find(n => n.id === pubkey)
  }, [pnodes, pubkey])

  useEffect(() => {
    setIsWatched(isInWatchlist(pubkey))
  }, [pubkey])

  const handleToggleWatch = () => {
    if (isWatched) {
      removeFromWatchlist(pubkey)
      setIsWatched(false)
    } else {
      addToWatchlist(pubkey)
      setIsWatched(true)
    }
  }

  const handleCopyPubkey = () => {
    navigator.clipboard.writeText(pubkey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'offline': return 'bg-red-500'
      case 'delinquent': return 'bg-yellow-500'
      default: return 'bg-muted'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500'
      case 'offline': return 'text-red-500'
      case 'delinquent': return 'text-yellow-500'
      default: return 'text-muted-foreground'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="pt-24 pb-12 px-6 md:px-12 flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <div className="animate-pulse text-muted-foreground">Loading node details...</div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !node) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="pt-24 pb-12 px-6 md:px-12 flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="text-red-500 text-xl">Node not found</div>
              <p className="text-muted-foreground font-mono text-sm">{pubkey}</p>
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft size={16} className="mr-2" />
                Back to list
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-12 px-6 md:px-12 flex-1">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <Link 
                href="/ui/nodes" 
                className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1 transition-colors"
              >
                <ArrowLeft size={14} />
                Back to nodes
              </Link>
              <div className="flex items-center gap-3">
                <div className={`h-4 w-4 rounded-full ${getStatusColor(node.status)}`} />
                <h1 className="text-2xl md:text-3xl font-medium tracking-tighter">Node Details</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={isWatched ? "default" : "outline"} 
                onClick={handleToggleWatch}
                className="flex items-center gap-2"
              >
                <Star size={16} className={isWatched ? "fill-current" : ""} />
                {isWatched ? 'Watching' : 'Watch'}
              </Button>
              <Button variant="outline" onClick={handleCopyPubkey} className="flex items-center gap-2">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Link href={`/ui/compare?nodes=${pubkey}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <GitCompare size={16} />
                  Compare
                </Button>
              </Link>
            </div>
          </div>

          {/* Pubkey Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Server size={18} />
                Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Public Key</label>
                  <p className="font-mono text-sm text-foreground break-all">{node.id}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <p className={`font-medium capitalize ${getStatusText(node.status)}`}>{node.status}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Version</label>
                  <p className="text-foreground">{node.version || 'Unknown'}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin size={14} />
                    Location
                  </label>
                  <p className="text-foreground">{node.location || 'Unknown'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wifi size={18} />
                Network
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Gossip Endpoint</label>
                  <p className="font-mono text-sm text-foreground">{node.gossipEndpoint || '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">RPC Endpoint</label>
                  <p className="font-mono text-sm text-foreground">{node.rpcEndpoint || '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Performance Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity size={18} />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Performance Score</span>
                    <span className="text-sm font-medium">{node.performanceScore}/100</span>
                  </div>
                  <Progress value={node.performanceScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Uptime</span>
                    <span className="text-sm font-medium">{node.performance?.uptime?.toFixed(1) || 0}%</span>
                  </div>
                  <Progress value={node.performance?.uptime || 0} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock size={14} />
                    Average Latency
                  </span>
                  <span className="text-sm font-medium text-yellow-500">{node.performance?.averageLatency || 0}ms</span>
                </div>
              </CardContent>
            </Card>

            {/* Storage Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HardDrive size={18} />
                  Storage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Capacity</label>
                    <p className="text-lg font-medium">{formatBytes(node.storage?.capacityBytes || 0)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Used</label>
                    <p className="text-lg font-medium">{formatBytes(node.storage?.usedBytes || 0)}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Storage Usage</span>
                    <span className="text-sm font-medium">
                      {((node.storage?.usedBytes || 0) / (node.storage?.capacityBytes || 1) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={(node.storage?.usedBytes || 0) / (node.storage?.capacityBytes || 1) * 100} 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={handleToggleWatch}>
                  <Star size={16} className={`mr-2 ${isWatched ? "fill-current" : ""}`} />
                  {isWatched ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </Button>
                <Link href={`/ui/compare?nodes=${pubkey}`}>
                  <Button variant="outline">
                    <GitCompare size={16} className="mr-2" />
                    Compare with Others
                  </Button>
                </Link>
                <Button variant="outline" onClick={handleCopyPubkey}>
                  <Copy size={16} className="mr-2" />
                  Copy Public Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

