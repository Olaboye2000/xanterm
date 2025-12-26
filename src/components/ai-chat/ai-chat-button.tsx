'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react'
import { usePNodes } from '@/hooks/usePNodes'

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { data: pnodes } = usePNodes()

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Build pNode context for AI
  const buildPNodeContext = () => {
    if (!pnodes || pnodes.length === 0) return ''

    const totalNodes = pnodes.length
    const onlineNodes = pnodes.filter(n => n.status === 'online').length
    const offlineNodes = pnodes.filter(n => n.status === 'offline').length
    const delinquentNodes = pnodes.filter(n => n.status === 'delinquent').length
    const avgPerformance = pnodes.reduce((sum, n) => sum + (n.performanceScore || 0), 0) / totalNodes
    const avgUptime = pnodes.reduce((sum, n) => sum + (n.performance?.uptime || 0), 0) / totalNodes

    // Get version distribution
    const versionCounts: Record<string, number> = {}
    pnodes.forEach(n => {
      const v = n.version || 'unknown'
      versionCounts[v] = (versionCounts[v] || 0) + 1
    })
    const topVersions = Object.entries(versionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([v, count]) => `${v}: ${count} nodes`)
      .join(', ')

    // Top 5 performing nodes
    const topNodes = [...pnodes]
      .sort((a, b) => (b.performanceScore || 0) - (a.performanceScore || 0))
      .slice(0, 5)
      .map(n => `${n.id.slice(0, 12)}... (score: ${n.performanceScore}, status: ${n.status})`)
      .join('\n  ')

    return `
Network Summary:
- Total Nodes: ${totalNodes}
- Online: ${onlineNodes} (${((onlineNodes/totalNodes)*100).toFixed(1)}%)
- Offline: ${offlineNodes}
- Delinquent: ${delinquentNodes}
- Average Performance Score: ${avgPerformance.toFixed(1)}/100
- Average Uptime: ${avgUptime.toFixed(1)}%

Top Versions: ${topVersions}

Top 5 Performing Nodes:
  ${topNodes}
`
  }

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return

    setIsLoading(true)
    setResponse('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          pnodeContext: buildPNodeContext()
        })
      })

      const data = await res.json()

      if (data.error) {
        setResponse(`Error: ${data.error}`)
      } else {
        setResponse(data.response)
      }
    } catch {
      setResponse('Failed to connect to AI service. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const clearChat = () => {
    setInput('')
    setResponse('')
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-6 right-6 z-50
          h-14 w-14 rounded-full
          bg-primary text-primary-foreground
          shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 active:scale-95
          ${isOpen ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 scale-100'}
        `}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Panel */}
      <div
        className={`
          fixed right-0 top-0 h-full w-full sm:w-[420px] z-50
          bg-card border-l border-border
          shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">XanTerm AI</h3>
              <p className="text-xs text-muted-foreground">pNode Analytics Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Welcome Message */}
          {!response && !isLoading && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                <p className="text-sm text-foreground">
                  Hi! I'm your pNode analytics assistant. I can help you:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Understand network health & metrics</li>
                  <li>• Find specific nodes or compare them</li>
                  <li>• Get insights on performance trends</li>
                  <li>• Explain what different metrics mean</li>
                </ul>
              </div>

              {/* Quick Prompts */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "What's the network health?",
                    "Show top performers",
                    "Any offline nodes?",
                    "Explain performance score"
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setInput(prompt)}
                      className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
              <span className="text-sm text-muted-foreground">Analyzing pNode data...</span>
            </div>
          )}

          {/* Response */}
          {response && !isLoading && (
            <div className="space-y-3">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2 max-w-[85%]">
                  <p className="text-sm">{input}</p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{response}</p>
                </div>
              </div>

              {/* New Question Button */}
              <button
                onClick={clearChat}
                className="text-xs text-primary hover:underline"
              >
                Ask another question
              </button>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about pNode analytics..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Powered by AI • Has access to live pNode data
          </p>
        </div>
      </div>
    </>
  )
}
