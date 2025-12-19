# Senshac

High-performance interior design portfolio website built with Astro 5.0+ and Islands Architecture.

## Stack

| Component | Technology |
|-----------|------------|
| Framework | Astro 5.0+ (SSR) |
| Adapter | @astrojs/cloudflare |
| Styling | UnoCSS |
| UI State | Alpine.js |
| Server Comms | HTMX + Hyperscript |
| Deployment | Cloudflare Pages |

## Development

### Prerequisites

- [Nix](https://nixos.org/) with flakes enabled
- [direnv](https://direnv.net/) (optional)

### Setup

```bash
# Enter dev shell
nix develop

# Or with direnv
direnv allow

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

### Commands

| Command | Description |
|---------|-------------|
| `dev` | Start Astro dev server |
| `build` | Build for production |
| `preview` | Preview production build |
| `check` | Run Astro check |
| `lint` | Run ESLint |
| `fmt` | Format with Prettier |
| `fmt-nix` | Format Nix files |
| `menu` | Show all available commands |

## Languages

- Spanish (es)
- Catalan (ca)
- English (en)

## License

All Rights Reserved. See [LICENSE.md](LICENSE.md).
