'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface Column<T> {
  key: keyof T | string
  header: string
  width?: number
  render?: (item: T) => React.ReactNode
}

interface AsciiTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  onRowClick?: (item: T) => void
  pageSize?: number
}

export function AsciiTable<T extends object>({
  data,
  columns,
  keyField,
  onRowClick,
  pageSize = 15,
}: AsciiTableProps<T>) {
  const [page, setPage] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const totalPages = Math.ceil(data.length / pageSize)
  const startIndex = page * pageSize
  const pageData = data.slice(startIndex, startIndex + pageSize)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'j') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, pageData.length - 1))
    } else if (e.key === 'ArrowUp' || e.key === 'k') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (pageData[selectedIndex] && onRowClick) {
        onRowClick(pageData[selectedIndex])
      }
    } else if (e.key === 'ArrowRight' || e.key === 'n') {
      e.preventDefault()
      if (page < totalPages - 1) {
        setPage(prev => prev + 1)
        setSelectedIndex(0)
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'p') {
      e.preventDefault()
      if (page > 0) {
        setPage(prev => prev - 1)
        setSelectedIndex(0)
      }
    }
  }

  const getValue = (item: T, key: string): unknown => {
    const keys = key.split('.')
    let value: unknown = item
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k]
    }
    return value
  }

  return (
    <div
      className="focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="border-b-2 border-[#d9d9d9] pb-2 mb-2">
        <div className="flex text-[#d9d9d9] font-bold">
          <span className="w-8 text-center">#</span>
          {columns.map(col => (
            <span
              key={col.key as string}
              className="flex-1 px-2 truncate"
              style={{ maxWidth: col.width }}
            >
              {col.header}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="space-y-0">
        {pageData.length === 0 ? (
          <div className="text-[#b3b3b3] text-center py-4">
            No data available
          </div>
        ) : (
          pageData.map((item, index) => (
            <div
              key={String(item[keyField])}
              onClick={() => onRowClick?.(item)}
              className={`
                flex items-center cursor-pointer transition-colors
                ${index === selectedIndex
                  ? 'bg-[#2e2e2e] border-l-2 border-[#d9d9d9]'
                  : 'hover:bg-[#262626] border-l-2 border-transparent'
                }
              `}
            >
              <span className="w-8 text-center text-[#b3b3b3]">
                {startIndex + index + 1}
              </span>
              {columns.map(col => (
                <span
                  key={col.key as string}
                  className="flex-1 px-2 py-1 truncate"
                  style={{ maxWidth: col.width }}
                >
                  {col.render
                    ? col.render(item)
                    : String(getValue(item, col.key as string) ?? '-')
                  }
                </span>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Footer / Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-[#383838] pt-2 mt-4 flex justify-between items-center">
          <div className="text-[#b3b3b3] text-sm">
            Showing {startIndex + 1}-{Math.min(startIndex + pageSize, data.length)} of {data.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setPage(prev => Math.max(0, prev - 1))
                setSelectedIndex(0)
              }}
              disabled={page === 0}
              className={`px-3 py-1 border ${
                page === 0
                  ? 'border-[#383838] text-[#b3b3b3]'
                  : 'border-[#d9d9d9] text-[#d9d9d9] hover:bg-[#d9d9d9] hover:text-[#141414]'
              }`}
            >
              [p] PREV
            </button>
            <span className="px-3 py-1 text-[#b3b3b3]">
              Page {page + 1}/{totalPages}
            </span>
            <button
              onClick={() => {
                setPage(prev => Math.min(totalPages - 1, prev + 1))
                setSelectedIndex(0)
              }}
              disabled={page === totalPages - 1}
              className={`px-3 py-1 border ${
                page === totalPages - 1
                  ? 'border-[#383838] text-[#b3b3b3]'
                  : 'border-[#d9d9d9] text-[#d9d9d9] hover:bg-[#d9d9d9] hover:text-[#141414]'
              }`}
            >
              NEXT [n]
            </button>
          </div>
        </div>
      )}

      {/* Keyboard hints */}
      <div className="text-[#b3b3b3] text-xs mt-2">
        ↑↓/jk: navigate | Enter: select | ←→/pn: page | /: search
      </div>
    </div>
  )
}

// Helper for truncating pubkeys
export function truncatePubkey(pubkey: string, chars = 8): string {
  if (!pubkey || pubkey.length <= chars * 2) return pubkey
  return `${pubkey.slice(0, chars)}...${pubkey.slice(-chars)}`
}
