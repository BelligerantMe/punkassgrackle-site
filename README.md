# punkassgrackle-site

D&D 5e Digital Tools hosted at https://punkassgrackle.com

## Active Tools

| Tool | URL | Description |
|------|-----|-------------|
| Battle Map VTT | https://vtt.punkassgrackle.com | Virtual tabletop (hosted on Starbug) |
| Character Survey | /dnd/survey/ | Character questionnaire for backstory |
| Barbarian Calculator | /barbarian_calculator | Rage damage and combat calculator |

## Archived Tools

| Tool | Archive Location | Date | Reason |
|------|-----------------|------|--------|
| Character Builder | `archived/dnd_character_builder.html` | 2026-02-01 | Superseded by Character Survey |

## Deployment

Deployed via Cloudflare Pages from `_deploy/` directory.

```bash
npx wrangler pages deploy _deploy --project-name=punkassgrackle-v4
```
