# XanTerm - Terminal-Style pNode Analytics

```
██╗  ██╗ █████╗ ███╗   ██╗████████╗███████╗██████╗ ███╗   ███╗
╚██╗██╔╝██╔══██╗████╗  ██║╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
 ╚███╔╝ ███████║██╔██╗ ██║   ██║   █████╗  ██████╔╝██╔████╔██║
 ██╔██╗ ██╔══██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
██╔╝ ██╗██║  ██║██║ ╚████║   ██║   ███████╗██║  ██║██║ ╚═╝ ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
```

> Monitor Xandeum pNodes like a hacker

**Live Demo:** https://xanterm.vercel.app

---

## Overview

XanTerm is a terminal-style analytics platform for monitoring Xandeum pNodes (storage provider nodes). Featuring a retro CLI aesthetic with green-on-black terminal visuals, command-bar navigation, and keyboard shortcuts.

---

## Features

### Terminal Experience
- **Retro CLI Aesthetic** - Matrix-style green on black theme
- **Command Bar** - Type commands like `list`, `node <pubkey>`, `status`
- **Keyboard Navigation** - Full keyboard support with vim-style bindings
- **ASCII Art** - Terminal-style progress bars, tables, and decorations

### Core Features
- **Network Status** - Real-time overview of network health
- **pNode Explorer** - Browse all nodes with filtering and search
- **Node Details** - Deep dive into individual node metrics
- **Watchlist** - Track your favorite pNodes
- **Compare Tool** - Side-by-side node comparison

---

## Commands

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

---

## Keyboard Shortcuts

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
git clone https://github.com/Pavilion-devs/XanTerm.git
cd XanTerm

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) + React 19 |
| Styling | Tailwind CSS 4 |
| Font | JetBrains Mono |
| Data Fetching | TanStack React Query |
| Language | TypeScript |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Network status (home)
│   ├── nodes/            # pNode list & details
│   ├── watch/            # Watchlist
│   ├── compare/          # Node comparison
│   └── help/             # Help/commands
├── components/
│   ├── terminal/         # Terminal UI components
│   │   ├── terminal-layout.tsx
│   │   ├── command-bar.tsx
│   │   ├── ascii-box.tsx
│   │   └── ascii-table.tsx
│   └── ...
├── hooks/                # Data fetching hooks
├── services/             # API services
└── lib/                  # Utilities
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com/new)
3. Deploy!

No environment variables required.

---

## Hackathon Submission

Built for the **Xandeum pNode Analytics Hackathon**.

### Requirements Met

| Requirement | Status |
|-------------|--------|
| Web-based analytics platform | Yes |
| Retrieve pNodes via pRPC | Yes |
| Display pNode information | Yes |
| Live, functional website | Yes |
| Documentation provided | Yes |

### Innovation

- Unique terminal/CLI aesthetic
- Command-driven navigation
- Keyboard-first design
- Retro hacker vibes

---

## Links

- [Xandeum Website](https://xandeum.network)
- [Xandeum Discord](https://discord.gg/uqRSmmM5m)
- [GitHub Repository](https://github.com/Pavilion-devs/XanTerm)

---

## License

MIT License - Built for the Xandeum ecosystem

---

<p align="center">
  <code>$ exit</code>
</p>
