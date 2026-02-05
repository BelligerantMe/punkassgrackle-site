# Punkassgrackle.com Redesign Design Document

**Date**: 2026-02-05
**Status**: Phase 1 Complete, Phase 2 Pending

---

## Overview

Redesign of punkassgrackle.com with three main components:
1. Hero DJ mix player with unified streaming
2. Grackle-iridescent synthwave visual aesthetic
3. Starbug Admin auth protection

---

## Site Architecture

```
punkassgrackle.com
├── Hero: DJ Mix Player
│   ├── Now playing display with waveform
│   ├── Filter tabs: Era | Mood | Type
│   ├── Quality toggle: Stream | HQ (self-hosted)
│   └── External links to SoundCloud/Mixcloud
│
├── Tools Grid
│   ├── D&D Tools (public)
│   ├── AI Systems (public)
│   └── Tools & Admin (VPN items + Starbug Admin auth)
│
└── Footer: Persistent mini-player
```

---

## Color Palette

### Grackle Iridescence (Primary)
| Name | Hex | Usage |
|------|-----|-------|
| Deep Black | `#0a0a0f` | Background |
| Card Black | `#12121a` | Card backgrounds |
| Iridescent Purple | `#6b3fa0` | Primary gradient, borders |
| Iridescent Teal | `#1a936f` | Gradient accent |
| Iridescent Bronze | `#a67c52` | Warm highlights, VPN badge |
| Iridescent Blue | `#2d5a7b` | Grid lines, subtle accents |

### Synthwave Punch (Accents)
| Name | Hex | Usage |
|------|-----|-------|
| Hot Pink | `#ff006e` | CTAs, active states, LOGIN badge |
| Electric Cyan | `#00f5d4` | Links, waveforms, highlights |

---

## Typography

- **Headlines**: Press Start 2P (pixel font)
- **Body**: JetBrains Mono (monospace)

---

## Visual Effects

1. **Scanlines** - Subtle CRT overlay (8% opacity)
2. **CRT Glow** - Cyan glow, pink on hover
3. **Iridescent Borders** - 4-color gradient borders on cards
4. **Grid Background** - Synthwave lines converging to grackle silhouette

---

## Grackle Motif (3 Layers)

### Layer 1: Grid Convergence (Background) ✅ Implemented
- Grid lines curve toward vanishing point shaped like grackle head
- Purple vertical lines, teal horizontal lines

### Layer 2: Gradient Mask (Hero Player) 🔲 Pending
- Grackle silhouette SVG as gradient mask
- Colors pool where bird shape is

### Layer 3: Waveform Baseline (Audio Player) 🔲 Pending
- Waveform bottom edge follows grackle profile curve

---

## Audio Player Design

### Sources (Hybrid Approach)
1. **SoundCloud** - Embedded widget API
2. **Mixcloud** - Embedded widget API
3. **Self-hosted** - HTML5 audio for HQ versions

### Filter Categories
- **Era**: All | Sean Sparks | Punkass Grackle
- **Mood**: All | Chill | High Energy | Late Night
- **Type**: All | Live Set | Studio Mix

### Features
- Quality toggle (stream vs HQ)
- External links to open in native apps
- Download button for self-hosted files
- Persistent mini-player in footer

---

## Access Control

| Item | Access |
|------|--------|
| D&D Tools | Public |
| AI Systems (Starbug, Observer) | Public |
| Cassidy | VPN (Tailscale) |
| Workshop | VPN (Tailscale) |
| Big Picture | VPN (Tailscale) |
| Little Tasks | VPN (Tailscale) |
| Starbug Admin | Auth (Cloudflare Access) |

---

## Technical Stack

- **Hosting**: Cloudflare Pages
- **Frontend**: Static HTML/CSS/JS (no framework)
- **Audio Storage**: Cloudflare R2 or Pages `/audio/`
- **Auth**: Cloudflare Access (Zero Trust)

---

## Implementation Status

### Phase 1: Visual Foundation ✅ Complete
- [x] CSS architecture with variables
- [x] Retro effects (scanlines, CRT glow, iridescent borders)
- [x] Grackle grid background SVG
- [x] HTML restructure with hero + tools grid
- [x] Card and player CSS styles

### Phase 2: Audio Player 🔲 Pending (needs mix data)
- [ ] Mix metadata JSON
- [ ] Unified player API (player.js)
- [ ] Filter logic (filters.js)
- [ ] Mini player (mini-player.js)
- [ ] SoundCloud/Mixcloud integration

### Phase 3: Grackle Motifs 🔲 Pending
- [ ] Grackle silhouette SVG
- [ ] Gradient mask (Layer 2)
- [ ] Waveform baseline (Layer 3)

### Phase 4: Polish & Auth 🔲 Pending
- [ ] Cloudflare Access for Starbug Admin
- [ ] Mobile responsiveness testing
- [ ] Upload mix catalog

---

## Open Questions

1. Mix catalog data needed from user
2. Self-hosted MP3 files location
3. Grackle reference image for silhouette tracing
