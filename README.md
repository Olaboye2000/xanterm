# XanTerm - Dual-Mode pNode Analytics Platform

```
██╗  ██╗ █████╗ ███╗   ██╗████████╗███████╗██████╗ ███╗   ███╗
╚██╗██╔╝██╔══██╗████╗  ██║╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
 ╚███╔╝ ███████║██╔██╗ ██║   ██║   █████╗  ██████╔╝██╔████╔██║
 ██╔██╗ ██╔══██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
██╔╝ ██╗██║  ██║██║ ╚████║   ██║   ███████╗██║  ██║██║ ╚═╝ ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
```

> Two interfaces. One powerful analytics platform.

**Live Demo:** [xanterm.vercel.app](https://xanterm.vercel.app)

---

## Demo Video

[![XanTerm Demo](https://img.youtube.com/vi/5Ku7AHfIaYI/maxresdefault.jpg)](https://youtu.be/5Ku7AHfIaYI)

▶️ **[Watch the full demo on YouTube](https://youtu.be/5Ku7AHfIaYI)**

---

## Overview

XanTerm is a dual-mode analytics platform for monitoring Xandeum pNodes (storage provider nodes). Choose between a **Terminal Mode** with CLI aesthetics and keyboard-driven navigation, or a **Modern UI Dashboard** with a clean, intuitive interface. Both modes feature an **AI-powered assistant** that understands your pNode data in real-time.

---

## Key Features

### Dual Interface Modes

| Terminal Mode | UI Dashboard |
|---------------|--------------|
| CLI-style aesthetic | Modern, clean design |
| Command bar navigation | Point-and-click interface |
| Keyboard shortcuts (vim-style) | Responsive components |
| Monospace typography | Sans-serif typography |
| Charcoal/gray theme | Light/dark mode toggle |

### AI-Powered Analytics Assistant

- **Context-aware AI** - Understands live pNode data in real-time
- **Natural language queries** - Ask questions like "What's the network health?" or "Show top performers"
- **Instant insights** - Get summaries, explanations, and recommendations
- **Floating chat panel** - Available on every page in both modes

### Core Analytics

- **Network Status** - Real-time overview of network health and metrics
- **pNode Explorer** - Browse, filter, search, and sort all nodes
- **Node Details** - Deep dive into individual node performance
- **Watchlist** - Track and monitor your favorite pNodes
- **Compare Tool** - Side-by-side node comparison (up to 5 nodes)

---

## Terminal Mode Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `status` | `home` | Network overview |
| `list` | `nodes`, `ls` | List all pNodes |
| `node <pubkey>` | `view` | View node details |
| `search <query>` | - | Search nodes |
| `watch` | `watchlist` | View watchlist |
| `compare` | - | Compare nodes |
| `help` | `?` | Show help |
| `clear` | `cls` | Clear terminal |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus command bar |
| `1-4` | Quick navigation |
| `?` | Show help |
| `j/k` or `↑/↓` | Navigate lists |
| `Enter` | Select item |
| `n/p` or `→/←` | Next/Previous page |
| `Esc` | Go back / Clear |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Olaboye2000/xanterm.git
cd xanterm

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your OPENAI_API_KEY for AI features

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for Terminal Mode or [http://localhost:3000/ui](http://localhost:3000/ui) for UI Dashboard.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) + React 19 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui + Radix UI |
| Fonts | JetBrains Mono (Terminal) / Inter (UI) |
| Data Fetching | TanStack React Query |
| AI Integration | OpenAI GPT-4o-mini |
| Language | TypeScript |

---

## Project Structure

```
src/
├── app/
│   ├── (terminal)/       # Terminal mode routes
│   │   ├── page.tsx      # Network status
│   │   ├── nodes/        # pNode list & details
│   │   ├── watch/        # Watchlist
│   │   ├── compare/      # Node comparison
│   │   └── help/         # Help/commands
│   ├── ui/               # UI dashboard routes
│   │   ├── page.tsx      # Dashboard home
│   │   ├── nodes/        # Node explorer
│   │   ├── watch/        # Watchlist
│   │   ├── compare/      # Comparison tool
│   │   └── docs/         # Documentation
│   └── api/
│       ├── chat/         # AI chat endpoint
│       └── prpc/         # pNode RPC proxy
├── components/
│   ├── terminal/         # Terminal UI components
│   ├── dashboard/        # Dashboard components
│   ├── ui/               # shadcn/ui components
│   └── ai-chat/          # AI assistant components
├── hooks/                # Data fetching hooks
├── services/             # API services
└── lib/                  # Utilities
```

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI assistant | Yes (for AI features) |

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com/new)
3. Add `OPENAI_API_KEY` to environment variables
4. Deploy!

---

## Hackathon Submission

Built for the **Xandeum pNode Analytics Hackathon**.

### Requirements Met

| Requirement | Status |
|-------------|--------|
| Web-based analytics platform | ✅ |
| Retrieve pNodes via pRPC | ✅ |
| Display pNode information | ✅ |
| Live, functional website | ✅ |
| Documentation provided | ✅ |

### Innovation Highlights

- **Dual-mode interface** - Terminal CLI + Modern Dashboard
- **AI-powered assistant** - Natural language analytics queries
- **Real-time data context** - AI understands live pNode metrics
- **Keyboard-first design** - Full vim-style navigation
- **Mode switching** - Seamlessly switch between interfaces

---

## Links

- [Live Demo](https://xanterm.vercel.app)
- [Demo Video](https://youtu.be/5Ku7AHfIaYI)
- [GitHub Repository](https://github.com/Olaboye2000/xanterm)
- [Xandeum Website](https://xandeum.network)
- [Xandeum Discord](https://discord.gg/uqRSmmM5m)

---

## License

MIT License - Built for the Xandeum ecosystem

---

<p align="center">
  <code>$ xanterm --help</code>
</p>
