'use client'

import { useState, useEffect } from 'react'
import { usePNodes } from '@/hooks/usePNodes'
import {
  AsciiBox,
  AsciiStatBox,
  AsciiProgress,
  AsciiSparkline,
  AsciiDivider,
  AsciiStatus
} from '@/components/terminal'
import Link from 'next/link'

export default function HomePage() {
  const { data: pnodes, isLoading, error, dataUpdatedAt } = usePNodes()
  const [currentTime, setCurrentTime] = useState('--:--:--')

  // Calculate stats
  const totalNodes = pnodes?.length || 0
  const onlineNodes = pnodes?.filter(n => n.status === 'online').length || 0
  const offlineNodes = pnodes?.filter(n => n.status === 'offline').length || 0
  const delinquentNodes = pnodes?.filter(n => n.status === 'delinquent').length || 0
  const healthPercent = totalNodes > 0 ? (onlineNodes / totalNodes) * 100 : 0

  // Get version distribution
  const versionCounts: Record<string, number> = {}
  pnodes?.forEach(n => {
    const v = n.version || 'unknown'
    versionCounts[v] = (versionCounts[v] || 0) + 1
  })
  const topVersions = Object.entries(versionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // Get top performing nodes
  const topNodes = [...(pnodes || [])]
    .sort((a, b) => (b.performanceScore || 0) - (a.performanceScore || 0))
    .slice(0, 5)

  // Generate fake sparkline data for demo (using useMemo would be better but keeping it simple)
  const uptimeHistory = Array.from({ length: 24 }, (_, i) => 90 + (i % 3) * 3 + 2)

  // Handle time updates client-side only to avoid hydration mismatch
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const lastUpdate = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('en-US', { hour12: false })
    : currentTime

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="text-[#b3b3b3]">[{currentTime}] Connecting to Xandeum network...</div>
        <div className="text-[#b3b3b3]">[{currentTime}] Fetching cluster nodes...</div>
        <div className="text-[#d9d9d9] cursor-blink">█</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-2">
        <div className="text-[#ef4444]">[ERROR] Failed to connect to Xandeum network</div>
        <div className="text-[#ef4444]">{String(error)}</div>
        <div className="text-[#b3b3b3] mt-4">Retry with: <span className="text-[#a0a0a0]">$ status</span></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Boot sequence style header */}
      <div className="space-y-1 text-sm">
        <div className="text-[#b3b3b3]">[{lastUpdate}] Connection established</div>
        <div className="text-[#b3b3b3]">[{lastUpdate}] Retrieved {totalNodes} nodes from cluster</div>
        <div className="text-[#d9d9d9]">[{lastUpdate}] Network status: {healthPercent >= 90 ? 'HEALTHY' : healthPercent >= 70 ? 'DEGRADED' : 'CRITICAL'}</div>
      </div>

      <AsciiDivider />

      {/* Network Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AsciiStatBox
          label="Total Nodes"
          value={totalNodes}
          status="neutral"
        />
        <AsciiStatBox
          label="Online"
          value={onlineNodes}
          subValue={`${((onlineNodes / totalNodes) * 100 || 0).toFixed(1)}%`}
          status="online"
        />
        <AsciiStatBox
          label="Offline"
          value={offlineNodes}
          status={offlineNodes > 0 ? 'offline' : 'neutral'}
        />
        <AsciiStatBox
          label="Delinquent"
          value={delinquentNodes}
          status={delinquentNodes > 0 ? 'warning' : 'neutral'}
        />
      </div>

      {/* Network Health */}
      <AsciiBox title="NETWORK HEALTH">
        <div className="space-y-4">
          <AsciiProgress
            value={healthPercent}
            label="Health"
            width={30}
          />
          <div className="flex items-center gap-4">
            <span className="text-[#b3b3b3]">24h Uptime:</span>
            <AsciiSparkline data={uptimeHistory} width={30} />
            <span className="text-[#a0a0a0]">{uptimeHistory[uptimeHistory.length - 1].toFixed(1)}%</span>
          </div>
        </div>
      </AsciiBox>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Version Distribution */}
        <AsciiBox title="VERSION DISTRIBUTION">
          <div className="space-y-2">
            {topVersions.length === 0 ? (
              <div className="text-[#b3b3b3]">No version data</div>
            ) : (
              topVersions.map(([version, count]) => (
                <div key={version} className="flex items-center gap-2">
                  <span className="text-[#a0a0a0] w-24 truncate">{version}</span>
                  <AsciiProgress
                    value={count}
                    max={totalNodes}
                    width={15}
                    showPercent={false}
                  />
                  <span className="text-[#b3b3b3] text-sm">{count}</span>
                </div>
              ))
            )}
          </div>
        </AsciiBox>

        {/* Top Performers */}
        <AsciiBox title="TOP PERFORMERS">
          <div className="space-y-2">
            {topNodes.length === 0 ? (
              <div className="text-[#b3b3b3]">No node data</div>
            ) : (
              topNodes.map((node, i) => (
                <Link
                  key={node.id}
                  href={`/nodes/${node.id}`}
                  className="flex items-center gap-2 hover:bg-[#2e2e2e] p-1 -m-1"
                >
                  <span className="text-[#b3b3b3] w-6">#{i + 1}</span>
                  <span className="text-[#a0a0a0] flex-1 truncate font-mono text-sm">
                    {node.id.slice(0, 16)}...
                  </span>
                  <AsciiStatus status={node.status as 'online' | 'offline'} />
                  <span className="text-[#d9d9d9]">{node.performanceScore || 0}</span>
                </Link>
              ))
            )}
          </div>
        </AsciiBox>
      </div>

      {/* Quick Actions */}
      <AsciiBox title="QUICK COMMANDS">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-[#a0a0a0]">$ list</span>
            <span className="text-[#b3b3b3] ml-2">- View all nodes</span>
          </div>
          <div>
            <span className="text-[#a0a0a0]">$ node &lt;key&gt;</span>
            <span className="text-[#b3b3b3] ml-2">- Node details</span>
          </div>
          <div>
            <span className="text-[#a0a0a0]">$ watch</span>
            <span className="text-[#b3b3b3] ml-2">- Watchlist</span>
          </div>
          <div>
            <span className="text-[#a0a0a0]">$ help</span>
            <span className="text-[#b3b3b3] ml-2">- All commands</span>
          </div>
        </div>
      </AsciiBox>

      {/* Footer info */}
      <div className="text-[#b3b3b3] text-xs">
        Auto-refresh: 30s | Last update: {lastUpdate} | Press <span className="text-[#d9d9d9]">[2]</span> or type <span className="text-[#a0a0a0]">&apos;list&apos;</span> to view all nodes
      </div>
    </div>
  )
}
