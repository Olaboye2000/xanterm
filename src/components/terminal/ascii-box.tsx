'use client'

import React from 'react'

interface AsciiBoxProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function AsciiBox({ title, children, className = '' }: AsciiBoxProps) {
  return (
    <div className={`border border-[#383838] bg-[#1e1e1e] ${className}`}>
      {title && (
        <div className="border-b border-[#383838] px-4 py-2 bg-[#141414]">
          <span className="text-[#d9d9d9] font-bold">{'─── '}{title}{' ───'}</span>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}

interface AsciiStatBoxProps {
  label: string
  value: string | number
  subValue?: string
  status?: 'online' | 'offline' | 'warning' | 'neutral'
}

export function AsciiStatBox({ label, value, subValue, status = 'neutral' }: AsciiStatBoxProps) {
  const statusColors = {
    online: 'text-[#22c55e]',
    offline: 'text-[#ef4444]',
    warning: 'text-[#fbbf24]',
    neutral: 'text-[#d9d9d9]',
  }

  return (
    <div className="border border-[#383838] bg-[#1e1e1e] p-4 text-center">
      <div className="text-[#b3b3b3] text-xs uppercase mb-2 tracking-wider">{label}</div>
      <div className={`text-2xl font-bold ${statusColors[status]}`}>
        {value}
      </div>
      {subValue && (
        <div className="text-[#a0a0a0] text-xs mt-1">{subValue}</div>
      )}
    </div>
  )
}

interface AsciiProgressProps {
  value: number
  max?: number
  width?: number
  showPercent?: boolean
  label?: string
}

export function AsciiProgress({
  value,
  max = 100,
  width = 20,
  showPercent = true,
  label
}: AsciiProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  const filled = Math.round((percent / 100) * width)
  const empty = width - filled

  const bar = '█'.repeat(filled) + '░'.repeat(empty)

  // Color based on percentage
  const color = percent >= 80 ? 'text-[#22c55e]' : percent >= 50 ? 'text-[#fbbf24]' : 'text-[#ef4444]'

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-[#b3b3b3] text-sm min-w-[80px]">{label}</span>}
      <span className={color}>[{bar}]</span>
      {showPercent && <span className="text-[#a0a0a0] text-sm">{percent.toFixed(1)}%</span>}
    </div>
  )
}

interface AsciiSparklineProps {
  data: number[]
  width?: number
}

export function AsciiSparkline({ data, width = 20 }: AsciiSparklineProps) {
  if (data.length === 0) return null

  const chars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█']
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  // Sample data to fit width
  const step = Math.max(1, Math.floor(data.length / width))
  const sampled = []
  for (let i = 0; i < data.length; i += step) {
    sampled.push(data[i])
    if (sampled.length >= width) break
  }

  const sparkline = sampled.map(v => {
    const normalized = (v - min) / range
    const charIndex = Math.min(chars.length - 1, Math.floor(normalized * chars.length))
    return chars[charIndex]
  }).join('')

  return <span className="text-[#d9d9d9]">{sparkline}</span>
}

interface AsciiDividerProps {
  char?: string
  width?: number
}

export function AsciiDivider({ char = '─', width }: AsciiDividerProps) {
  return (
    <div className="text-[#383838] overflow-hidden">
      {width ? char.repeat(width) : <div className="w-full border-b border-[#383838]" />}
    </div>
  )
}

interface AsciiStatusProps {
  status: 'online' | 'offline' | 'delinquent' | 'unknown'
}

export function AsciiStatus({ status }: AsciiStatusProps) {
  const configs = {
    online: { text: '● ONLINE', color: 'text-[#22c55e]' },
    offline: { text: '○ OFFLINE', color: 'text-[#ef4444]' },
    delinquent: { text: '◐ DELINQ', color: 'text-[#fbbf24]' },
    unknown: { text: '? UNKNOWN', color: 'text-[#666666]' },
  }

  const config = configs[status] || configs.unknown

  return (
    <span className={`${config.color} font-bold`}>
      [{config.text}]
    </span>
  )
}
