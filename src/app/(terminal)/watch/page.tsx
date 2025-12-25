'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePNodes } from '@/hooks/usePNodes'
import { getWatchlist, removeFromWatchlist, clearWatchlist } from '@/lib/watchlist'
import { AsciiBox, AsciiStatus, AsciiProgress, truncatePubkey } from '@/components/terminal'
import Link from 'next/link'

export default function WatchPage() {
  const router = useRouter()
  const { data: allNodes, isLoading } = usePNodes()
  const [watchlist, setWatchlist] = useState<{ pnodeId: string; addedAt: number }[]>([])
  const [currentTime, setCurrentTime] = useState('--:--:--')

  useEffect(() => {
    setWatchlist(getWatchlist())
  }, [])

  // Handle time updates client-side only
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const watchedNodes = allNodes?.filter(n =>
    watchlist.some(w => w.pnodeId === n.id)
  ) || []

  const handleRemove = (pubkey: string) => {
    removeFromWatchlist(pubkey)
    setWatchlist(getWatchlist())
  }

  const handleClearAll = () => {
    if (confirm('Clear all watched nodes?')) {
      clearWatchlist()
      setWatchlist([])
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="text-[#b3b3b3]">[{currentTime}] Loading watchlist...</div>
        <div className="text-[#d9d9d9] cursor-blink">█</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#d9d9d9]">WATCHLIST</h1>
          <div className="text-[#b3b3b3] text-sm">
            {watchlist.length} nodes being monitored
          </div>
        </div>
        {watchlist.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-3 py-1 border border-[#ff0000] text-[#ff0000] hover:bg-[#ff0000] hover:text-[#141414] transition-colors text-sm"
          >
            [CLEAR ALL]
          </button>
        )}
      </div>

      {watchlist.length === 0 ? (
        <AsciiBox title="EMPTY WATCHLIST">
          <div className="text-center py-8 space-y-4">
            <div className="text-[#b3b3b3] text-lg">No nodes in watchlist</div>
            <div className="text-[#b3b3b3] text-sm">
              Add nodes to your watchlist to monitor them here.
            </div>
            <div className="text-[#a0a0a0] text-sm">
              Tip: Use <span className="text-[#d9d9d9]">$ list</span> to browse nodes, then click the Watch button.
            </div>
            <Link
              href="/nodes"
              className="inline-block px-4 py-2 border border-[#d9d9d9] hover:bg-[#d9d9d9] hover:text-[#141414] transition-colors"
            >
              BROWSE NODES
            </Link>
          </div>
        </AsciiBox>
      ) : (
        <div className="space-y-4">
          {/* Summary */}
          <AsciiBox title="SUMMARY">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[#b3b3b3] text-xs">TOTAL</div>
                <div className="text-[#d9d9d9] text-2xl font-bold">{watchedNodes.length}</div>
              </div>
              <div>
                <div className="text-[#b3b3b3] text-xs">ONLINE</div>
                <div className="text-[#d9d9d9] text-2xl font-bold">
                  {watchedNodes.filter(n => n.status === 'online').length}
                </div>
              </div>
              <div>
                <div className="text-[#b3b3b3] text-xs">OFFLINE</div>
                <div className="text-[#ff0000] text-2xl font-bold">
                  {watchedNodes.filter(n => n.status !== 'online').length}
                </div>
              </div>
            </div>
          </AsciiBox>

          {/* Node List */}
          <AsciiBox title="WATCHED NODES">
            <div className="space-y-2">
              {watchedNodes.map((node) => {
                const watchInfo = watchlist.find(w => w.pnodeId === node.id)
                const addedDate = watchInfo ? new Date(watchInfo.addedAt).toLocaleDateString() : '-'

                return (
                  <div
                    key={node.id}
                    className="flex items-center gap-4 p-2 hover:bg-[#2e2e2e] transition-colors"
                  >
                    <Link
                      href={`/nodes/${node.id}`}
                      className="flex-1 flex items-center gap-4"
                    >
                      <span className="text-[#a0a0a0] font-mono">
                        {truncatePubkey(node.id, 10)}
                      </span>
                      <AsciiStatus status={node.status as 'online' | 'offline' | 'delinquent'} />
                      <span className="text-[#b3b3b3] text-sm">{node.version || '-'}</span>
                      <AsciiProgress value={node.performanceScore || 0} width={10} showPercent={false} />
                      <span className="text-[#d9d9d9]">{node.performanceScore || 0}</span>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-[#b3b3b3] text-xs">Added: {addedDate}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handleRemove(node.id)
                        }}
                        className="px-2 py-1 border border-[#ff0000] text-[#ff0000] hover:bg-[#ff0000] hover:text-[#141414] transition-colors text-xs"
                      >
                        [X]
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </AsciiBox>
        </div>
      )}

      {/* Footer hint */}
      <div className="text-[#b3b3b3] text-xs">
        Press [2] to browse nodes | Type &apos;node &lt;pubkey&gt;&apos; to view details
      </div>
    </div>
  )
}
