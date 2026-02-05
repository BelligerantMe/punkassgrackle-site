# Punkassgrackle.com Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform punkassgrackle.com with a DJ mix hero player, grackle-iridescent synthwave aesthetic, and Starbug Admin auth.

**Architecture:** Static HTML/CSS/JS site deployed to Cloudflare Pages. Unified audio player wraps SoundCloud/Mixcloud embeds and HTML5 audio. JSON-driven mix metadata. No frameworks.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS, Cloudflare Pages, SoundCloud Widget API, Mixcloud Widget API

**Worktree:** `/home/agador/punkassgrackle-site/.worktrees/redesign`

**Design Doc:** `/home/agador/agador_migration/docs/plans/2026-02-04-punkassgrackle-redesign.md`

---

## Phase 1: Foundation & Visual Refresh

### Task 1: Set Up CSS Architecture

**Files:**
- Create: `_deploy/css/variables.css`
- Create: `_deploy/css/base.css`

**Step 1: Create CSS variables file**

Create `_deploy/css/variables.css`:
```css
:root {
  /* Background */
  --bg-deep: #0a0a0f;
  --bg-card: #12121a;

  /* Grackle Iridescence */
  --iridescent-purple: #6b3fa0;
  --iridescent-teal: #1a936f;
  --iridescent-bronze: #a67c52;
  --iridescent-blue: #2d5a7b;

  /* Synthwave Punch */
  --accent-pink: #ff006e;
  --accent-cyan: #00f5d4;

  /* Text */
  --text-primary: #e0e0e0;
  --text-muted: #4a4a5a;
  --text-heading: #f0f0f0;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;

  /* Borders */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
}
```

**Step 2: Create base styles file**

Create `_deploy/css/base.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@400;500;600&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: 'JetBrains Mono', monospace;
  background-color: var(--bg-deep);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
}

h1, h2, h3, h4 {
  font-family: 'Press Start 2P', cursive;
  color: var(--text-heading);
  line-height: 1.4;
}

a {
  color: var(--accent-cyan);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--accent-pink);
}
```

**Step 3: Create directory structure**

Run:
```bash
mkdir -p _deploy/css _deploy/js _deploy/data _deploy/assets _deploy/icons _deploy/audio
```

**Step 4: Commit**

```bash
git add _deploy/css/
git commit -m "feat: add CSS architecture with grackle color palette"
```

---

### Task 2: Add Retro Effects CSS

**Files:**
- Create: `_deploy/css/retro.css`

**Step 1: Create retro effects file**

Create `_deploy/css/retro.css`:
```css
/* Scanline overlay */
.scanlines::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 9999;
  opacity: 0.08;
}

/* CRT glow effect */
.crt-glow {
  box-shadow:
    0 0 10px rgba(0, 245, 212, 0.3),
    0 0 20px rgba(0, 245, 212, 0.2),
    0 0 30px rgba(0, 245, 212, 0.1);
  transition: box-shadow var(--transition-normal);
}

.crt-glow:hover {
  box-shadow:
    0 0 15px rgba(255, 0, 110, 0.4),
    0 0 30px rgba(255, 0, 110, 0.3),
    0 0 45px rgba(255, 0, 110, 0.2);
}

/* Iridescent border gradient */
.iridescent-border {
  position: relative;
  background: var(--bg-card);
  border-radius: var(--radius-md);
}

.iridescent-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: calc(var(--radius-md) + 2px);
  background: linear-gradient(
    135deg,
    var(--iridescent-purple),
    var(--iridescent-teal),
    var(--iridescent-bronze),
    var(--iridescent-blue)
  );
  z-index: -1;
  opacity: 0.6;
  transition: opacity var(--transition-normal);
}

.iridescent-border:hover::before {
  opacity: 1;
}

/* Pixel font for headings */
.pixel-text {
  font-family: 'Press Start 2P', cursive;
  text-transform: uppercase;
  letter-spacing: 2px;
}
```

**Step 2: Commit**

```bash
git add _deploy/css/retro.css
git commit -m "feat: add retro CRT and iridescent effects"
```

---

### Task 3: Create Grackle Grid Background SVG

**Files:**
- Create: `_deploy/assets/grackle-grid.svg`

**Step 1: Create the SVG**

Create `_deploy/assets/grackle-grid.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="gridGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:#2d5a7b;stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:#0a0a0f;stop-opacity:0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="#0a0a0f"/>

  <!-- Horizon glow -->
  <ellipse cx="960" cy="800" rx="1200" ry="200" fill="url(#gridGrad)"/>

  <!-- Vertical lines converging to grackle-shaped vanishing point -->
  <g stroke="#6b3fa0" stroke-opacity="0.3" fill="none">
    <!-- Lines converge toward point that suggests bird head profile at ~960,720 -->
    <path d="M0,1080 Q480,900 960,720"/>
    <path d="M240,1080 Q600,880 960,720"/>
    <path d="M480,1080 Q720,860 960,720"/>
    <path d="M720,1080 Q840,820 960,720"/>
    <path d="M960,1080 L960,720"/>
    <path d="M1200,1080 Q1080,820 960,720"/>
    <path d="M1440,1080 Q1200,860 960,720"/>
    <path d="M1680,1080 Q1320,880 960,720"/>
    <path d="M1920,1080 Q1440,900 960,720"/>
  </g>

  <!-- Horizontal lines with subtle curve suggesting bird silhouette -->
  <g stroke="#1a936f" stroke-opacity="0.2" fill="none">
    <path d="M0,1000 Q960,980 1920,1000"/>
    <path d="M0,920 Q960,880 1920,920"/>
    <path d="M0,840 Q960,780 1920,840"/>
    <path d="M0,760 Q960,700 1920,760"/>
  </g>
</svg>
```

**Step 2: Commit**

```bash
git add _deploy/assets/grackle-grid.svg
git commit -m "feat: add synthwave grid with grackle convergence motif"
```

---

### Task 4: Restructure index.html with New Layout

**Files:**
- Modify: `index.html`
- Modify: `_deploy/index.html`

**Step 1: Update index.html with new structure**

Replace contents of `index.html` with the new structure (hero + tools grid). This is a large file - create it with the basic structure first:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Punkass Grackle - Music & Digital Tools</title>
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/retro.css">
  <link rel="stylesheet" href="css/player.css">
  <link rel="stylesheet" href="css/cards.css">
</head>
<body class="scanlines">
  <!-- Background Grid -->
  <div class="bg-grid" style="position:fixed;inset:0;z-index:-1;background:url('assets/grackle-grid.svg') center/cover no-repeat;"></div>

  <main class="container">
    <!-- Hero: Audio Player Section -->
    <section id="hero-player" class="hero-player">
      <h1 class="pixel-text site-title">Punkass Grackle</h1>
      <p class="tagline">Music • D&D Tools • AI Systems</p>

      <div id="player-container" class="player-container iridescent-border crt-glow">
        <!-- Player UI will be injected by JS -->
        <div class="player-loading">Loading mixes...</div>
      </div>

      <!-- Filter Controls -->
      <div class="filter-controls">
        <div class="filter-group">
          <span class="filter-label pixel-text">Era:</span>
          <button class="filter-chip active" data-filter="era" data-value="all">All</button>
          <button class="filter-chip" data-filter="era" data-value="sean-sparks">Sean Sparks</button>
          <button class="filter-chip" data-filter="era" data-value="punkass-grackle">Punkass Grackle</button>
        </div>
        <div class="filter-group">
          <span class="filter-label pixel-text">Mood:</span>
          <button class="filter-chip active" data-filter="mood" data-value="all">All</button>
          <button class="filter-chip" data-filter="mood" data-value="chill">Chill</button>
          <button class="filter-chip" data-filter="mood" data-value="high-energy">High Energy</button>
          <button class="filter-chip" data-filter="mood" data-value="late-night">Late Night</button>
        </div>
      </div>

      <!-- Mix List -->
      <div id="mix-list" class="mix-list">
        <!-- Mix items will be injected by JS -->
      </div>
    </section>

    <!-- Tools Grid Section -->
    <section id="tools" class="tools-section">
      <h2 class="section-title pixel-text">D&D Tools</h2>
      <div class="card-grid">
        <a href="https://vtt.punkassgrackle.com" class="tool-card iridescent-border">
          <div class="card-icon">🗺️</div>
          <h3>Battle Map VTT</h3>
          <p>Virtual tabletop with AI-generated maps, tokens, and real-time multiplayer</p>
        </a>
        <a href="/dnd/survey/" class="tool-card iridescent-border">
          <div class="card-icon">📋</div>
          <h3>Character Survey</h3>
          <p>Detailed character questionnaire for backstory and personality</p>
        </a>
        <a href="/barbarian_calculator.html" class="tool-card iridescent-border">
          <div class="card-icon">🪓</div>
          <h3>Barbarian Calculator</h3>
          <p>Calculate rage damage, attacks, and combat options</p>
        </a>
      </div>

      <h2 class="section-title pixel-text">AI Systems</h2>
      <div class="card-grid">
        <a href="https://starbug.punkassgrackle.com" class="tool-card iridescent-border">
          <div class="card-icon">💬</div>
          <h3>Starbug Chat</h3>
          <p>AI assistant with persistent memory and context</p>
        </a>
        <a href="https://observer.punkassgrackle.com" class="tool-card iridescent-border">
          <div class="card-icon">👁️</div>
          <h3>Observer</h3>
          <p>Watch AI-to-AI conversations and collaboration</p>
        </a>
        <a href="http://100.90.51.62:8000/chat.html" class="tool-card iridescent-border">
          <div class="card-icon">🤖</div>
          <span class="badge vpn">VPN</span>
          <h3>Cassidy</h3>
          <p>Chat with Cassidy the skeleton robot</p>
        </a>
      </div>

      <h2 class="section-title pixel-text">Tools & Admin</h2>
      <div class="card-grid">
        <a href="http://100.121.190.53:8085" class="tool-card iridescent-border">
          <div class="card-icon">🔧</div>
          <span class="badge vpn">VPN</span>
          <h3>Workshop</h3>
          <p>AI-powered 3D design to print pipeline</p>
        </a>
        <a href="http://192.168.1.192:8093/bigpicture.html" class="tool-card iridescent-border">
          <div class="card-icon">📊</div>
          <span class="badge vpn">VPN</span>
          <h3>Big Picture</h3>
          <p>Strategic project and goal management</p>
        </a>
        <a href="http://192.168.1.192:8093/littletasks.html" class="tool-card iridescent-border">
          <div class="card-icon">📋</div>
          <span class="badge vpn">VPN</span>
          <h3>Little Tasks</h3>
          <p>Claude CLI monitoring and notifications</p>
        </a>
        <a href="https://starbug.punkassgrackle.com/admin" class="tool-card iridescent-border">
          <div class="card-icon">⚙️</div>
          <span class="badge login">LOGIN</span>
          <h3>Starbug Admin</h3>
          <p>System administration and monitoring</p>
        </a>
      </div>
    </section>
  </main>

  <!-- Mini Player (fixed footer) -->
  <div id="mini-player" class="mini-player hidden">
    <button id="mini-play-btn" class="mini-play-btn">▶</button>
    <span id="mini-title" class="mini-title">No track selected</span>
    <div class="mini-progress">
      <div id="mini-progress-bar" class="mini-progress-bar"></div>
    </div>
    <span id="mini-time" class="mini-time">0:00</span>
  </div>

  <script src="js/player.js"></script>
  <script src="js/filters.js"></script>
  <script src="js/mini-player.js"></script>
</body>
</html>
```

**Step 2: Copy to _deploy**

```bash
cp index.html _deploy/index.html
```

**Step 3: Commit**

```bash
git add index.html _deploy/index.html
git commit -m "feat: restructure page with hero player and tools grid"
```

---

### Task 5: Add Card and Player CSS

**Files:**
- Create: `_deploy/css/cards.css`
- Create: `_deploy/css/player.css`

**Step 1: Create cards.css**

Create `_deploy/css/cards.css`:
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-lg);
}

.tools-section {
  margin-top: var(--space-xl);
}

.section-title {
  font-size: 0.9rem;
  color: var(--accent-pink);
  margin: var(--space-xl) 0 var(--space-lg);
  text-align: center;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.tool-card {
  display: block;
  padding: var(--space-lg);
  text-decoration: none;
  color: var(--text-primary);
  transition: transform var(--transition-normal);
  position: relative;
}

.tool-card:hover {
  transform: translateY(-4px);
  color: var(--text-primary);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-md);
}

.tool-card h3 {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: var(--space-sm);
  color: var(--accent-cyan);
}

.tool-card p {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.badge {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  font-family: 'Press Start 2P', cursive;
  font-size: 0.5rem;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
}

.badge.vpn {
  background: var(--iridescent-bronze);
  color: var(--bg-deep);
}

.badge.login {
  background: var(--accent-pink);
  color: white;
}
```

**Step 2: Create player.css**

Create `_deploy/css/player.css`:
```css
.hero-player {
  text-align: center;
  padding: var(--space-xl) 0;
}

.site-title {
  font-size: 1.5rem;
  color: var(--accent-pink);
  margin-bottom: var(--space-sm);
}

.tagline {
  color: var(--text-muted);
  margin-bottom: var(--space-xl);
  font-size: 0.9rem;
}

.player-container {
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.player-loading {
  color: var(--text-muted);
  padding: var(--space-xl);
}

/* Filter Controls */
.filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  justify-content: center;
  margin-bottom: var(--space-lg);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.6rem;
  color: var(--text-muted);
  margin-right: var(--space-sm);
}

.filter-chip {
  background: var(--bg-card);
  border: 1px solid var(--iridescent-purple);
  color: var(--text-primary);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-lg);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-chip:hover {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}

.filter-chip.active {
  background: var(--iridescent-purple);
  border-color: var(--iridescent-purple);
  color: white;
}

/* Mix List */
.mix-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.mix-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.mix-item:hover {
  background: rgba(107, 63, 160, 0.2);
}

.mix-item.playing {
  background: rgba(107, 63, 160, 0.3);
  border-left: 3px solid var(--accent-pink);
}

.mix-play-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--iridescent-purple);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.mix-info {
  flex: 1;
  text-align: left;
}

.mix-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.mix-meta {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.mix-duration {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-right: var(--space-md);
}

.mix-source {
  font-size: 0.7rem;
  padding: var(--space-xs) var(--space-sm);
  background: var(--bg-deep);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
}

.mix-actions {
  display: flex;
  gap: var(--space-sm);
}

.mix-action-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: var(--space-xs);
  transition: color var(--transition-fast);
}

.mix-action-btn:hover {
  color: var(--accent-cyan);
}

/* Mini Player */
.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-card);
  border-top: 1px solid var(--iridescent-purple);
  padding: var(--space-sm) var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  z-index: 1000;
  transition: transform var(--transition-normal);
}

.mini-player.hidden {
  transform: translateY(100%);
}

.mini-play-btn {
  background: var(--accent-pink);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}

.mini-title {
  flex: 1;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-progress {
  width: 200px;
  height: 4px;
  background: var(--bg-deep);
  border-radius: 2px;
}

.mini-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--iridescent-purple), var(--accent-cyan));
  border-radius: 2px;
  width: 0%;
}

.mini-time {
  font-size: 0.75rem;
  color: var(--text-muted);
  min-width: 45px;
}
```

**Step 3: Commit**

```bash
git add _deploy/css/cards.css _deploy/css/player.css
git commit -m "feat: add card grid and player styles"
```

---

## Phase 2: Audio Player (Tasks 6-10)

See next section of plan...

---

## Task Summary

| Task | Description | Est. |
|------|-------------|------|
| 1 | CSS Architecture | 5 min |
| 2 | Retro Effects | 5 min |
| 3 | Grackle Grid SVG | 5 min |
| 4 | Restructure HTML | 10 min |
| 5 | Card & Player CSS | 10 min |
| 6 | Mix Metadata JSON | 5 min |
| 7 | Player Core JS | 15 min |
| 8 | SoundCloud Integration | 10 min |
| 9 | Filter Logic | 10 min |
| 10 | Mini Player | 10 min |
| 11 | Grackle Mask SVG | 10 min |
| 12 | Final Polish | 10 min |

**Total estimated: ~90 minutes**

---

## Open Items (Need User Input)

Before Phase 2, we need:
1. **Mix catalog data** - List of your mixes with SoundCloud/Mixcloud URLs
2. **Self-hosted audio files** - MP3s to upload to `/audio/`
3. **Grackle reference image** - For tracing the silhouette SVG
