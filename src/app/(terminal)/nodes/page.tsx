'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePNodes } from '@/hooks/usePNodes'
import { AsciiTable, AsciiStatus, AsciiBox, AsciiProgress, truncatePubkey } from '@/components/terminal'
import type { PNode } from '@/types/pnode'

function NodesPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  const { data: pnodes, isLoading, error } = usePNodes()
  const [search, setSearch] = useState(initialSearch)
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
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'id' | 'status' | 'version' | 'score'>('score')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  // Filter and sort nodes
  const filteredNodes = useMemo(() => {
    if (!pnodes) return []

    let result = [...pnodes]

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(n =>
        n.id.toLowerCase().includes(searchLower) ||
        n.version?.toLowerCase().includes(searchLower) ||
        n.gossipEndpoint?.toLowerCase().includes(searchLower)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(n => n.status === statusFilter)
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0
      switch (sortBy) {
        case 'id':
          cmp = a.id.localeCompare(b.id)
          break
        case 'status':
          cmp = (a.status || '').localeCompare(b.status || '')
          break
        case 'version':
          cmp = (a.version || '').localeCompare(b.version || '')
          break
        case 'score':
          cmp = (a.performanceScore || 0) - (b.performanceScore || 0)
          break
      }
      return sortDir === 'desc' ? -cmp : cmp
    })

    return result
  }, [pnodes, search, statusFilter, sortBy, sortDir])

  const handleRowClick = (node: PNode) => {
    router.push(`/nodes/${node.id}`)
  }

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDir('desc')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="text-[#b3b3b3]">[{currentTime}] Fetching pNode list...</div>
        <div className="text-[#d9d9d9] cursor-blink">█</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-2">
        <div className="text-[#ff0000]">[ERROR] Failed to fetch nodes</div>
        <div className="text-[#ff0000]">{String(error)}</div>
      </div>
    )
  }

  const columns = [
    {
      key: 'id' as const,
      header: 'PUBKEY',
      render: (node: PNode) => (
        <span className="text-[#a0a0a0] font-mono">
          {truncatePubkey(node.id, 8)}
        </span>
      ),
    },
    {
      key: 'status' as const,
      header: 'STATUS',
      render: (node: PNode) => (
        <AsciiStatus status={node.status as 'online' | 'offline' | 'delinquent'} />
      ),
    },
    {
      key: 'version' as const,
      header: 'VERSION',
      render: (node: PNode) => (
        <span className="text-[#b3b3b3]">{node.version || '-'}</span>
      ),
    },
    {
      key: 'performanceScore' as const,
      header: 'SCORE',
      render: (node: PNode) => (
        <div className="flex items-center gap-2">
          <AsciiProgress value={node.performanceScore || 0} width={10} showPercent={false} />
          <span>{node.performanceScore || 0}</span>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[#d9d9d9] text-lg font-bold">PNODE LIST</div>
          <div className="text-[#b3b3b3] text-sm">
            Showing {filteredNodes.length} of {pnodes?.length || 0} nodes
          </div>
        </div>
      </div>

      {/* Filters */}
      <AsciiBox title="FILTERS">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex items-center gap-2">
            <span className="text-[#b3b3b3]">Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="pubkey, version..."
              className="bg-[#141414] border border-[#383838] px-3 py-1 text-[#d9d9d9]
                       placeholder-[#4a4a4a] focus:border-[#d9d9d9] outline-none w-48"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[#b3b3b3]">Status:</span>
            <div className="flex gap-1">
              {['all', 'online', 'offline', 'delinquent'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2 py-1 border text-xs uppercase transition-colors
                    ${statusFilter === status
                      ? 'bg-[#d9d9d9] text-[#141414] border-[#d9d9d9]'
                      : 'border-[#383838] hover:border-[#d9d9d9]'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-[#b3b3b3]">Sort:</span>
            <div className="flex gap-1">
              {[
                { key: 'score', label: 'Score' },
                { key: 'status', label: 'Status' },
                { key: 'version', label: 'Version' },
                { key: 'id', label: 'Pubkey' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => toggleSort(key as typeof sortBy)}
                  className={`px-2 py-1 border text-xs transition-colors
                    ${sortBy === key
                      ? 'bg-[#d9d9d9] text-[#141414] border-[#d9d9d9]'
                      : 'border-[#383838] hover:border-[#d9d9d9]'
                    }`}
                >
                  {label} {sortBy === key && (sortDir === 'desc' ? '↓' : '↑')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AsciiBox>

      {/* Table */}
      <AsciiTable
        data={filteredNodes}
        columns={columns}
        keyField="id"
        onRowClick={handleRowClick}
        pageSize={15}
      />
    </div>
  )
}

export default function NodesPage() {
  return (
    <Suspense fallback={
      <div className="space-y-2">
        <div className="text-[#b3b3b3]">[--:--:--] Loading nodes...</div>
        <div className="text-[#d9d9d9] cursor-blink">█</div>
      </div>
    }>
      <NodesPageContent />
    </Suspense>
  )
}
