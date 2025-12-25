'use client'

import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface CommandBarProps {
  onCommand?: (command: string) => void
}

const COMMANDS = [
  { cmd: 'help', desc: 'Show available commands' },
  { cmd: 'status', desc: 'Network overview' },
  { cmd: 'list', desc: 'List all pNodes' },
  { cmd: 'node <pubkey>', desc: 'View node details' },
  { cmd: 'search <query>', desc: 'Search nodes' },
  { cmd: 'watch', desc: 'View watchlist' },
  { cmd: 'compare', desc: 'Compare nodes' },
  { cmd: 'clear', desc: 'Clear terminal output' },
  { cmd: 'theme <name>', desc: 'Change theme (green/amber/cyan)' },
]

export const CommandBar = forwardRef<HTMLInputElement, CommandBarProps>(
  function CommandBar({ onCommand }, ref) {
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [suggestions, setSuggestions] = useState<typeof COMMANDS>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useImperativeHandle(ref, () => inputRef.current!, [])

    const executeCommand = (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase()
      const [command, ...args] = trimmed.split(' ')

      // Add to history
      if (trimmed) {
        setHistory(prev => [...prev.slice(-50), trimmed])
      }

      // Handle commands
      switch (command) {
        case 'help':
        case '?':
          router.push('/help')
          break
        case 'status':
        case 'home':
          router.push('/')
          break
        case 'list':
        case 'nodes':
        case 'ls':
          router.push('/nodes')
          break
        case 'node':
        case 'view':
          if (args[0]) {
            router.push(`/nodes/${args[0]}`)
          }
          break
        case 'search':
          if (args[0]) {
            router.push(`/nodes?search=${args.join(' ')}`)
          }
          break
        case 'watch':
        case 'watchlist':
          router.push('/watch')
          break
        case 'compare':
          router.push('/compare')
          break
        case 'clear':
        case 'cls':
          // Will be handled by parent component if needed
          onCommand?.('clear')
          break
        case 'theme':
          // Theme switching will be implemented later
          onCommand?.(`theme:${args[0] || 'green'}`)
          break
        default:
          // Try to navigate if it looks like a pubkey
          if (command.length > 20) {
            router.push(`/nodes/${command}`)
          }
      }

      setInput('')
      setSuggestions([])
      setHistoryIndex(-1)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        executeCommand(input)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (history.length > 0) {
          const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex
          setHistoryIndex(newIndex)
          setInput(history[history.length - 1 - newIndex] || '')
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          setHistoryIndex(newIndex)
          setInput(history[history.length - 1 - newIndex] || '')
        } else {
          setHistoryIndex(-1)
          setInput('')
        }
      } else if (e.key === 'Tab') {
        e.preventDefault()
        if (suggestions.length > 0) {
          setInput(suggestions[0].cmd.split(' ')[0])
          setSuggestions([])
        }
      } else if (e.key === 'Escape') {
        setInput('')
        setSuggestions([])
        inputRef.current?.blur()
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInput(value)

      // Show suggestions
      if (value.length > 0) {
        const matches = COMMANDS.filter(c =>
          c.cmd.toLowerCase().startsWith(value.toLowerCase())
        )
        setSuggestions(matches.slice(0, 5))
      } else {
        setSuggestions([])
      }
    }

    return (
      <div className="mb-4 relative">
        <div className="border border-[#383838] bg-[#1e1e1e] p-3 flex items-center">
          <span className="text-[#d9d9d9] mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a command... (help for list)"
            className="flex-1 bg-transparent outline-none text-[#f2f2f2] placeholder-[#4a4a4a]"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="cursor-blink text-[#d9d9d9]">█</span>
        </div>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full border border-t-0 border-[#383838] bg-[#1e1e1e] z-50">
            {suggestions.map((s, i) => (
              <button
                key={s.cmd}
                onClick={() => {
                  setInput(s.cmd.split(' ')[0])
                  setSuggestions([])
                  inputRef.current?.focus()
                }}
                className={`
                  w-full text-left px-4 py-2 flex justify-between
                  hover:bg-[#2e2e2e] transition-colors
                  ${i === 0 ? 'bg-[#2e2e2e]' : ''}
                `}
              >
                <span className="text-[#d9d9d9]">{s.cmd}</span>
                <span className="text-[#b3b3b3] text-sm">{s.desc}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
)
