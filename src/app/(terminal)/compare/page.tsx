'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePNodes } from '@/hooks/usePNodes'
import { AsciiBox, AsciiProgress, AsciiStatus, truncatePubkey } from '@/components/terminal'
import { formatBytes } from '@/lib/format'

function ComparePageContent() {
  const searchParams = useSearchParams()
  const initialNodes = searchParams.get('nodes')?.split(',').filter(Boolean) || []

  const { data: allNodes, isLoading } = usePNodes()
  const [selectedPubkeys, setSelectedPubkeys] = useState<string[]>(initialNodes)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState('--:--:--')

  // Handle time updates client-side only
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const selectedNodes = allNodes?.filter(n =>
    selectedPubkeys.includes(n.id)
  ) || []

  const filteredNodes = allNodes?.filter(n =>
    !selectedPubkeys.includes(n.id) &&
    (n.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     n.version?.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 10) || []

  const handleAddNode = (id: string) => {
    if (selectedPubkeys.length < 4) {
      setSelectedPubkeys([...selectedPubkeys, id])
      setSearchQuery('')
    }
  }

  const handleRemoveNode = (id: string) => {
    setSelectedPubkeys(selectedPubkeys.filter(p => p !== id))
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="text-[#b3b3b3]">[{currentTime}] Loading nodes...</div>
        <div className="text-[#d9d9d9] cursor-blink">█</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#d9d9d9]">COMPARE NODES</h1>
        <div className="text-[#b3b3b3] text-sm">
          Compare up to 4 pNodes side by side
        </div>
      </div>

      {/* Add Node */}
      <AsciiBox title="ADD NODE">
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by pubkey or version..."
              className="flex-1 bg-[#141414] border border-[#383838] px-3 py-2 text-[#d9d9d9]
                       placeholder-[#4a4a4a] focus:border-[#d9d9d9] outline-none"
              disabled={selectedPubkeys.length >= 4}
            />
            <span className="text-[#b3b3b3] py-2">
              {selectedPubkeys.length}/4 selected
            </span>
          </div>

          {searchQuery && filteredNodes.length > 0 && (
            <div className="border border-[#383838] max-h-40 overflow-y-auto">
              {filteredNodes.map(node => (
                <button
                  key={node.id}
                  onClick={() => handleAddNode(node.id)}
                  className="w-full flex items-center gap-4 p-2 hover:bg-[#2e2e2e] text-left"
                >
                  <span className="text-[#a0a0a0] font-mono text-sm">
                    {truncatePubkey(node.id, 10)}
                  </span>
                  <AsciiStatus status={node.status as 'online' | 'offline'} />
                  <span className="text-[#b3b3b3] text-sm">{node.version || '-'}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </AsciiBox>

      {/* Comparison */}
      {selectedNodes.length === 0 ? (
        <AsciiBox title="NO NODES SELECTED">
          <div className="text-center py-8 text-[#b3b3b3]">
            Search and select nodes above to compare them
          </div>
        </AsciiBox>
      ) : (
        <div className="space-y-4">
          {/* Selected Nodes Header */}
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedNodes.length}, 1fr)` }}>
            {selectedNodes.map((node, index) => (
              <AsciiBox key={node.id} title={`NODE ${index + 1}`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#a0a0a0] font-mono text-sm">
                      {truncatePubkey(node.id, 6)}
                    </span>
                    <button
                      onClick={() => handleRemoveNode(node.id)}
                      className="text-[#ff0000] hover:bg-[#ff0000] hover:text-[#0a0a0a] px-1"
                    >
                      [X]
                    </button>
                  </div>
                  <AsciiStatus status={node.status as 'online' | 'offline' | 'delinquent'} />
                </div>
              </AsciiBox>
            ))}
          </div>

          {/* Comparison Table */}
          <AsciiBox title="COMPARISON">
            <div className="space-y-4">
              {/* Version */}
              <div>
                <div className="text-[#b3b3b3] text-sm mb-2">VERSION</div>
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedNodes.length}, 1fr)` }}>
                  {selectedNodes.map(node => (
                    <div key={node.id} className="text-[#d9d9d9]">
                      {node.version || 'Unknown'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Score */}
              <div>
                <div className="text-[#b3b3b3] text-sm mb-2">PERFORMANCE SCORE</div>
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedNodes.length}, 1fr)` }}>
                  {selectedNodes.map(node => {
                    const maxScore = Math.max(...selectedNodes.map(n => n.performanceScore || 0))
                    const isMax = node.performanceScore === maxScore
                    return (
                      <div key={node.id} className="space-y-1">
                        <AsciiProgress value={node.performanceScore || 0} width={15} showPercent={false} />
                        <span className={isMax ? 'text-[#d9d9d9]' : 'text-[#b3b3b3]'}>
                          {node.performanceScore || 0} {isMax && '★'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Uptime */}
              <div>
                <div className="text-[#b3b3b3] text-sm mb-2">UPTIME</div>
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedNodes.length}, 1fr)` }}>
                  {selectedNodes.map(node => {
                    const maxUptime = Math.max(...selectedNodes.map(n => n.performance?.uptime || 0))
                    const isMax = (node.performance?.uptime || 0) === maxUptime
                    return (
                      <div key={node.id} className="space-y-1">
                        <AsciiProgress value={node.performance?.uptime || 0} width={15} showPercent={false} />
                        <span className={isMax ? 'text-[#d9d9d9]' : 'text-[#b3b3b3]'}>
                          {(node.performance?.uptime || 0).toFixed(1)}% {isMax && '★'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Storage Capacity */}
              <div>
                <div className="text-[#b3b3b3] text-sm mb-2">STORAGE CAPACITY</div>
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedNodes.length}, 1fr)` }}>
                  {selectedNodes.map(node => {
                    const maxStorage = Math.max(...selectedNodes.map(n => n.storage?.capacityBytes || 0))
                    const isMax = (node.storage?.capacityBytes || 0) === maxStorage
                    return (
                      <div key={node.id}>
                        <span className={isMax ? 'text-[#d9d9d9]' : 'text-[#b3b3b3]'}>
                          {formatBytes(node.storage?.capacityBytes || 0)} {isMax && '★'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Latency */}
              <div>
                <div className="text-[#b3b3b3] text-sm mb-2">LATENCY</div>
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedNodes.length}, 1fr)` }}>
                  {selectedNodes.map(node => {
                    const minLatency = Math.min(...selectedNodes.map(n => n.performance?.averageLatency || 999))
                    const isMin = (node.performance?.averageLatency || 0) === minLatency
                    return (
                      <div key={node.id}>
                        <span className={isMin ? 'text-[#d9d9d9]' : 'text-[#ffb000]'}>
                          {node.performance?.averageLatency || 0}ms {isMin && '★'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </AsciiBox>

          {/* Legend */}
          <div className="text-[#b3b3b3] text-xs">
            ★ = Best in category
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-[#b3b3b3] text-xs">
        Type &apos;compare&apos; in the command bar to reset | Max 4 nodes
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="space-y-2">
        <div className="text-[#b3b3b3]">[--:--:--] Loading comparison...</div>
        <div className="text-[#d9d9d9] cursor-blink">█</div>
      </div>
    }>
      <ComparePageContent />
    </Suspense>
  )
}
