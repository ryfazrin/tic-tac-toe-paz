# Phase 6: Submission Engineering & Reviewer Artifacts

> **Goal:** Synthesize all deliverables required by the submission form at `https://apply.capm.us` (under **"1) Tic-Tac-Toe"**), transforming the submission from a simple code delivery into a compelling demonstration of professional AI-augmented software engineering.

---

## 1. Submission Form Checklist (`apply.capm.us`)

| Form Field | Status | Requirement Specification |
| :--- | :---: | :--- |
| **Which test are you submitting?** | Required | Select: **`1) Tic-Tac-Toe`** |
| **Live app URL** | Required | Public Vercel production URL (e.g., `https://[your-app].vercel.app`). Do not use preview URLs. |
| **GitHub repo URL** | Required | Public GitHub URL with clear README and clean commit history. |
| **Screenshots** | Required | 3-4 high-resolution screenshots highlighting gameplay, themes, and win states. |
| **Demo video** | Recommended | 90-120 second video link (Loom, YouTube, or Vimeo set to Public or Unlisted). |
| **Notes for the reviewer** | Recommended | Strategic pitch explaining architectural decisions and the AI SDLC methodology. |

---

## 2. Screenshot Curation & Staging Guide

Prepare 4 distinct screenshots showcasing the craftsmanship of the application:

1. **`01_gameplay_cyberpunk.png`**:
   - Active mid-game state in Cyberpunk theme.
   - Shows cyan and magenta Phosphor icons placed on the grid with turn indicator highlighting.
2. **`02_victory_confetti.png`**:
   - Winning state with the 3 winning cells glowing.
   - Active particle confetti explosion and updated Scoreboard (+1 win).
3. **`03_minimalist_theme.png`**:
   - Clean Modern theme toggle showcasing slate aesthetics, crisp typography, and high WCAG contrast.
4. **`04_unbeatable_ai_mode.png`**:
   - 1-Player vs AI mode in action, demonstrating smart blocking and game status.

---

## 3. Demo Video Storyboard & Script (Loom / 90 Seconds)

A concise, professional walkthrough video dramatically increases recruiter conversion. Use this minute-by-minute script:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       LOOM DEMO SCRIPT (90-120 SECONDS)                     │
├──────────────┬───────────────────────────────┬──────────────────────────────┤
│ Timestamp    │ Screen Action                 │ Spoken Talking Points        │
├──────────────┼───────────────────────────────┼──────────────────────────────┤
│ 00:00 - 00:20│ Show home screen & tech stack │ "Hi! Here is my Tic-Tac-Toe  │
│              │ badge in header.              │ challenge built with React 19│
│              │                               │ and Next.js 16 App Router."  │
├──────────────┼───────────────────────────────┼──────────────────────────────┤
│ 00:20 - 00:45│ Play standard 2-player game.  │ "First, fulfilling the core  │
│              │ Trigger win line & New Game.  │ specs: responsive 3x3 board, │
│              │ Demonstrate a draw game.      │ win line detection, draw     │
│              │                               │ banner, and instant restart."│
├──────────────┼───────────────────────────────┼──────────────────────────────┤
│ 00:45 - 01:15│ Toggle Cyberpunk to Minimalist│ "For personality, I built a  │
│              │ theme; play vs AI mode;       │ dual-theming engine with     │
│              │ show scoreboard incrementing. │ Tailwind v4, Web Audio SFX,  │
│              │                               │ persistent localStorage, and │
│              │                               │ an unbeatable Minimax AI."   │
├──────────────┼───────────────────────────────┼──────────────────────────────┤
│ 01:15 - 01:40│ Briefly show GitHub repo &    │ "The entire project was built│
│              │ docs/ai-sdlc/ directory.      │ using a 6-phase AI SDLC with │
│              │                               │ strict Next.js 16 guardrails │
│              │                               │ and automated test suites."  │
├──────────────┼───────────────────────────────┼──────────────────────────────┤
│ 01:40 - 01:50│ Return to live app.           │ "Thank you for the challenge,│
│              │                               │ looking forward to your team's│
│              │                               │ feedback!"                   │
└──────────────┴───────────────────────────────┴──────────────────────────────┘
```

---

## 4. "Notes for the Reviewer" Copy-Ready Pitch

Copy and adapt this text directly into the **"Notes for the reviewer"** field on `apply.capm.us`:

```markdown
Hi Team,

Thank you for the opportunity to complete this challenge! Per your prompt ("Building well with AI is a skill we're looking for"), I approached this project not merely as a quick coding exercise, but as a showcase of modern, disciplined AI-augmented Software Engineering.

### 🌟 Key Highlights & Differentiators:
1. Core Pass Criteria (100% Complete):
   - Fully interactive 3x3 board with smooth turn orchestration.
   - Real-time win line detection across all 8 winning axes + draw state evaluation.
   - Instant "New Game" restart with keyboard shortcut ('R').

2. Style, Personality & Advanced Polish:
   - Dynamic Dual Theming: Switch seamlessly between "Cyberpunk Neon" and "Clean Minimalist" using Tailwind CSS v4 design tokens.
   - Audio & Visual Delight: Synthesized Web Audio API sound effects (no external audio assets) and victory particle confetti.
   - Persistent Scoreboard: Tracks Player X, Player O, and Draws with SSR-hydration-safe localStorage synchronization.
   - Unbeatable AI Mode (Minimax): Toggle from 2-Player local pass-and-play to 1-Player vs AI, powered by a mathematically optimal Minimax algorithm.

3. Engineering & AI SDLC Rigor:
   - Built on React 19.3.1 and Next.js 16.4.6 App Router with zero deprecation warnings and strict TypeScript typing.
   - Comprehensive documentation of the entire AI Software Development Life Cycle included directly in the repo under `/docs/ai-sdlc/`.
   - Full automated test suite (Vitest) validating game mechanics and Minimax invariants.
   - Fully accessible (WCAG AA compliant, keyboard-navigable grid, ARIA live announcements for screen readers).

Live Production App: [Insert your Vercel URL here]
GitHub Repository: [Insert your GitHub URL here]

Looking forward to discussing the role and building great products together!
```

---

## 5. Final Submission Verification Checklist

Before clicking **Submit**:
- [ ] Vercel app is live on a public domain and verified on mobile.
- [ ] GitHub repository visibility is set to **Public**.
- [ ] Screenshots are saved in `.png` format and ready to upload.
- [ ] Loom demo video link is tested in an incognito window.
- [ ] "Notes for the reviewer" text is personalized with your URLs.
