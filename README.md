# punkassgrackle-site

Digital Tools & AI Systems hosted at https://punkassgrackle.com

## D&D Tools

| Tool | URL | Description |
|------|-----|-------------|
| Battle Map VTT | https://vtt.punkassgrackle.com | Virtual tabletop with AI-generated maps (hosted on Starbug) |
| Character Survey | /dnd/survey/ | Character questionnaire for backstory and personality |
| Barbarian Calculator | /barbarian_calculator | Rage damage and combat calculator |

## AI Systems

| Tool | URL | Description |
|------|-----|-------------|
| Starbug Chat | https://starbug.punkassgrackle.com | AI assistant with persistent memory and context |
| Observer | https://observer.punkassgrackle.com | AI-to-AI conversation viewer |
| Cassidy (VPN) | http://100.90.51.62:8000/chat.html | Chat with Cassidy the skeleton robot (Tailscale required) |

## Tools & Admin

| Tool | URL | Description |
|------|-----|-------------|
| Workshop (VPN) | http://100.121.190.53:8085 | AI-powered 3D design to print pipeline (Tailscale required) |
| Big Picture (VPN) | http://100.121.190.53:8100 | Strategic project and goal management (Tailscale required) |
| Starbug Admin | https://starbug.punkassgrackle.com/admin | System administration and monitoring |

## Archived Tools

| Tool | Archive Location | Date | Reason |
|------|-----------------|------|--------|
| Character Builder | `archived/dnd_character_builder.html` | 2026-02-01 | Superseded by Character Survey |

## Deployment

Deployed via Cloudflare Pages from `_deploy/` directory.

```bash
npx wrangler pages deploy _deploy --project-name=punkassgrackle-v4
```

## Network Access

- **Public**: Services at `*.punkassgrackle.com` are publicly accessible via Cloudflare tunnels
- **VPN**: Services marked "(VPN)" require Tailscale VPN access to reach internal IPs
