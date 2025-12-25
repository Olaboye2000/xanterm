'use client'

import { AsciiBox, AsciiDivider } from '@/components/terminal'

const commands = [
  { cmd: 'help', alias: '?', desc: 'Show this help page' },
  { cmd: 'status', alias: 'home', desc: 'Network status overview' },
  { cmd: 'list', alias: 'nodes, ls', desc: 'List all pNodes' },
  { cmd: 'node <pubkey>', alias: 'view', desc: 'View details for a specific node' },
  { cmd: 'search <query>', alias: '', desc: 'Search nodes by pubkey or version' },
  { cmd: 'watch', alias: 'watchlist', desc: 'View your watchlist' },
  { cmd: 'compare', alias: '', desc: 'Compare multiple nodes' },
  { cmd: 'clear', alias: 'cls', desc: 'Clear command history' },
  { cmd: 'theme <name>', alias: '', desc: 'Change color theme (green, amber, cyan)' },
]

const shortcuts = [
  { key: '/', desc: 'Focus command bar' },
  { key: '1', desc: 'Go to Status page' },
  { key: '2', desc: 'Go to Nodes list' },
  { key: '3', desc: 'Go to Watchlist' },
  { key: '4', desc: 'Go to Compare' },
  { key: '?', desc: 'Show Help' },
  { key: 'j / ↓', desc: 'Navigate down in lists' },
  { key: 'k / ↑', desc: 'Navigate up in lists' },
  { key: 'Enter', desc: 'Select item' },
  { key: 'n / →', desc: 'Next page' },
  { key: 'p / ←', desc: 'Previous page' },
  { key: 'Esc', desc: 'Clear input / Go back' },
]

export default function HelpPage() {
  return (
    <div className="space-y-6">
      {/* ASCII Art Header */}
      <div className="text-center">
        <pre className="text-[#d9d9d9] text-xs leading-tight inline-block text-left">
{`
 ██╗  ██╗███████╗██╗     ██████╗
 ██║  ██║██╔════╝██║     ██╔══██╗
 ███████║█████╗  ██║     ██████╔╝
 ██╔══██║██╔══╝  ██║     ██╔═══╝
 ██║  ██║███████╗███████╗██║
 ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝
`}
        </pre>
        <div className="text-[#b3b3b3] mt-2">XanTerm v1.0.0 - Terminal-style pNode Analytics</div>
      </div>

      <AsciiDivider />

      {/* About */}
      <AsciiBox title="ABOUT">
        <div className="space-y-2 text-sm">
          <p>
            XanTerm is a terminal-style analytics platform for monitoring Xandeum pNodes.
            Navigate using the command bar or keyboard shortcuts.
          </p>
          <p className="text-[#b3b3b3]">
            Built for the Xandeum pNode Analytics Hackathon 2024.
          </p>
        </div>
      </AsciiBox>

      {/* Commands */}
      <AsciiBox title="AVAILABLE COMMANDS">
        <div className="space-y-1">
          <div className="flex text-[#b3b3b3] text-xs mb-2">
            <span className="w-40">COMMAND</span>
            <span className="w-28">ALIAS</span>
            <span className="flex-1">DESCRIPTION</span>
          </div>
          <AsciiDivider />
          {commands.map(({ cmd, alias, desc }) => (
            <div key={cmd} className="flex items-center py-1">
              <span className="w-40 text-[#a0a0a0]">$ {cmd}</span>
              <span className="w-28 text-[#b3b3b3]">{alias || '-'}</span>
              <span className="flex-1 text-[#b3b3b3]">{desc}</span>
            </div>
          ))}
        </div>
      </AsciiBox>

      {/* Keyboard Shortcuts */}
      <AsciiBox title="KEYBOARD SHORTCUTS">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
          {shortcuts.map(({ key, desc }) => (
            <div key={key} className="flex items-center py-1">
              <kbd className="w-20 px-2 py-0.5 bg-[#2e2e2e] border border-[#383838] text-[#d9d9d9] text-center text-sm">
                {key}
              </kbd>
              <span className="ml-4 text-[#b3b3b3]">{desc}</span>
            </div>
          ))}
        </div>
      </AsciiBox>

      {/* Quick Start */}
      <AsciiBox title="QUICK START">
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-[#b3b3b3]">1.</span>
            <span className="text-[#a0a0a0] ml-2">$ status</span>
            <span className="text-[#b3b3b3] ml-2">- View network overview</span>
          </div>
          <div>
            <span className="text-[#b3b3b3]">2.</span>
            <span className="text-[#a0a0a0] ml-2">$ list</span>
            <span className="text-[#b3b3b3] ml-2">- Browse all pNodes</span>
          </div>
          <div>
            <span className="text-[#b3b3b3]">3.</span>
            <span className="text-[#a0a0a0] ml-2">$ node 7xKXtg...</span>
            <span className="text-[#b3b3b3] ml-2">- View specific node</span>
          </div>
          <div>
            <span className="text-[#b3b3b3]">4.</span>
            <span className="text-[#a0a0a0] ml-2">$ watch</span>
            <span className="text-[#b3b3b3] ml-2">- Manage your watchlist</span>
          </div>
        </div>
      </AsciiBox>

      {/* Links */}
      <AsciiBox title="RESOURCES">
        <div className="flex flex-wrap gap-6">
          <a
            href="https://xandeum.network"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a0a0a0] hover:text-[#f2f2f2] hover:underline"
          >
            [xandeum.network]
          </a>
          <a
            href="https://github.com/Pavilion-devs/XanTerm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a0a0a0] hover:text-[#f2f2f2] hover:underline"
          >
            [github]
          </a>
          <a
            href="https://discord.gg/uqRSmmM5m"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a0a0a0] hover:text-[#f2f2f2] hover:underline"
          >
            [discord]
          </a>
        </div>
      </AsciiBox>

      {/* Footer */}
      <div className="text-center text-[#b3b3b3] text-xs">
        Press <kbd className="px-1 bg-[#2e2e2e] border border-[#383838]">/</kbd> to start typing a command
      </div>
    </div>
  )
}
