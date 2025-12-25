'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { usePNodes } from '@/hooks/usePNodes'
import { AsciiBox, AsciiProgress, AsciiStatus, AsciiDivider, AsciiSparkline } from '@/components/terminal'
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '@/lib/watchlist'
import { useState, useEffect, useMemo } from 'react'
import { formatBytes } from '@/lib/format'

interface NodeDetailPageProps {
  params: Promise<{ pubkey: string }>
}

export default function NodeDetailPage({ params }: NodeDetailPageProps) {
  const { pubkey } = use(params)
  const router = useRouter()
  const { data: pnodes, isLoading, error } = usePNodes()
  const [currentTime, setCurrentTime] = useState('--:--:--')

  // Find the specific node
  const node = useMemo(() => {
    return pnodes?.find(n => n.id === pubkey)
  }, [pnodes, pubkey])
  const [isWatched, setIsWatched] = useState(false)

  useEffect(() => {
    setIsWatched(isInWatchlist(pubkey))
  }, [pubkey])

  // Handle time updates client-side only
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

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
  }

  // Generate fake historical data for sparklines (deterministic)
  const uptimeHistory = Array.from({ length: 24 }, (_, i) => 90 + (i % 3) * 3 + 2)
  const responseHistory = Array.from({ length: 24 }, (_, i) => 50 + (i % 5) * 20)

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="text-[#b3b3b3]">[{currentTime}] Fetching node details...</div>
        <div className="text-[#b3b3b3]">[{currentTime}] Pubkey: {pubkey.slice(0, 20)}...</div>
        <div className="text-[#d9d9d9] cursor-blink">█</div>
      </div>
    )
  }

  if (error || !node) {
    return (
      <div className="space-y-2">
        <div className="text-[#ff0000]">[ERROR] Node not found</div>
        <div className="text-[#ff0000]">Pubkey: {pubkey}</div>
        <div className="text-[#b3b3b3] mt-4">
          <button onClick={() => router.back()} className="hover:text-[#d9d9d9]">
            {'<'} Back to list
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="text-[#b3b3b3] hover:text-[#d9d9d9] mb-2 text-sm"
          >
            {'<'} Back to list
          </button>
          <h1 className="text-xl font-bold text-[#d9d9d9]">NODE DETAILS</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleToggleWatch}
            className={`px-3 py-1 border transition-colors ${
              isWatched
                ? 'bg-[#ffb000] text-[#141414] border-[#ffb000]'
                : 'border-[#383838] hover:border-[#d9d9d9]'
            }`}
          >
            {isWatched ? '[★] WATCHING' : '[☆] WATCH'}
          </button>
          <button
            onClick={handleCopyPubkey}
            className="px-3 py-1 border border-[#383838] hover:border-[#d9d9d9] transition-colors"
          >
            [COPY]
          </button>
        </div>
      </div>

      {/* Pubkey */}
      <AsciiBox title="IDENTITY">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-[#b3b3b3] w-24">PUBKEY:</span>
            <span className="text-[#a0a0a0] font-mono text-sm break-all">{node.id}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#b3b3b3] w-24">STATUS:</span>
            <AsciiStatus status={node.status as 'online' | 'offline' | 'delinquent'} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#b3b3b3] w-24">VERSION:</span>
            <span className="text-[#d9d9d9]">{node.version || 'Unknown'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#b3b3b3] w-24">LOCATION:</span>
            <span className="text-[#b3b3b3]">{node.location || '-'}</span>
          </div>
        </div>
      </AsciiBox>

      {/* Network Info */}
      <AsciiBox title="NETWORK">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-[#b3b3b3] w-24">GOSSIP:</span>
            <span className="text-[#a0a0a0] font-mono">{node.gossipEndpoint || '-'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#b3b3b3] w-24">RPC:</span>
            <span className="text-[#a0a0a0] font-mono">{node.rpcEndpoint || '-'}</span>
          </div>
        </div>
      </AsciiBox>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Performance */}
        <AsciiBox title="PERFORMANCE">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#b3b3b3]">Score</span>
                <span className="text-[#d9d9d9]">{node.performanceScore}/100</span>
              </div>
              <AsciiProgress value={node.performanceScore} width={25} showPercent={false} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#b3b3b3]">Uptime</span>
                <span className="text-[#d9d9d9]">{node.performance?.uptime?.toFixed(1) || 0}%</span>
              </div>
              <AsciiProgress value={node.performance?.uptime || 0} width={25} showPercent={false} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#b3b3b3]">24h Trend:</span>
              </div>
              <AsciiSparkline data={uptimeHistory} width={25} />
            </div>
          </div>
        </AsciiBox>

        {/* Storage */}
        <AsciiBox title="STORAGE">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[#b3b3b3] w-24">CAPACITY:</span>
              <span className="text-[#d9d9d9]">{formatBytes(node.storage?.capacityBytes || 0)}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#b3b3b3] w-24">USED:</span>
              <span className="text-[#b3b3b3]">{formatBytes(node.storage?.usedBytes || 0)}</span>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#b3b3b3]">Usage</span>
                <span className="text-[#d9d9d9]">
                  {((node.storage?.usedBytes || 0) / (node.storage?.capacityBytes || 1) * 100).toFixed(1)}%
                </span>
              </div>
              <AsciiProgress
                value={(node.storage?.usedBytes || 0) / (node.storage?.capacityBytes || 1) * 100}
                width={25}
                showPercent={false}
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#b3b3b3] w-24">LATENCY:</span>
              <span className="text-[#ffb000]">{node.performance?.averageLatency || 0}ms</span>
            </div>
          </div>
        </AsciiBox>
      </div>

      {/* Response Time Trend */}
      <AsciiBox title="RESPONSE TIME (24H)">
        <div className="flex items-center gap-4">
          <AsciiSparkline data={responseHistory} width={40} />
          <span className="text-[#b3b3b3]">
            avg: {Math.round(responseHistory.reduce((a, b) => a + b, 0) / responseHistory.length)}ms
          </span>
        </div>
      </AsciiBox>

      {/* Actions */}
      <AsciiBox title="ACTIONS">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleToggleWatch}
            className="px-4 py-2 border border-[#383838] hover:border-[#d9d9d9] hover:bg-[#2e2e2e] transition-colors"
          >
            {isWatched ? '[-] Remove from Watch' : '[+] Add to Watch'}
          </button>
          <button
            onClick={() => router.push(`/compare?nodes=${pubkey}`)}
            className="px-4 py-2 border border-[#383838] hover:border-[#d9d9d9] hover:bg-[#2e2e2e] transition-colors"
          >
            [C] Compare
          </button>
          <button
            onClick={handleCopyPubkey}
            className="px-4 py-2 border border-[#383838] hover:border-[#d9d9d9] hover:bg-[#2e2e2e] transition-colors"
          >
            [P] Copy Pubkey
          </button>
        </div>
      </AsciiBox>

      {/* Keyboard hints */}
      <div className="text-[#b3b3b3] text-xs">
        Press [b] to go back | [w] to toggle watch | [c] to compare
      </div>
    </div>
  )
}
