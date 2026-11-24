# 🎮 Tic-Tac-Toe Pro (React 19 & Next.js 16)

> **Live Production App:** [https://tic-tac-toe-paz.vercel.app](https://tic-tac-toe-paz.vercel.app)  
> **Challenge Submission:** Developer Assessment for Semprove Inc / student marketplace via `apply.capm.us`.  
> **Development Methodology:** Engineered with a 6-phase [Enterprise AI SDLC Blueprint](docs/ai-sdlc/README.md).

---

## 🌟 Key Features & Highlights

### 1. Core Mechanics (100% Pass Criteria)
- **Interactive 3×3 Grid:** Responsive board with smooth animations and turn management.
- **Win & Draw Detection:** Real-time evaluation across all 8 winning axes with celebratory victory glows.
- **New Game Restart:** Instant board reset via button or global keyboard shortcut (<kbd>R</kbd>).

### 2. Personality & Advanced Polish (Differentiators)
- **Dual Thematic Engine:**
  - **Cyberpunk Neon:** Dark cyberpunk aesthetic with cyan and pink glowing Phosphor icons (`Lightning` and `Target`).
  - **Clean Minimalist:** Crisp slate aesthetics with high-contrast typography and subtle borders.
- **Unbeatable Minimax AI Mode:** Toggle between 2-Player local pass-and-play and 1-Player vs AI, powered by a mathematically optimal Minimax algorithm.
- **Synthesized Web Audio SFX:** 100% zero-asset, browser-native audio feedback using Web Audio API for clicks, wins, and draws.
- **Confetti Celebration:** Physics-based 60fps canvas particle explosion upon game victory.
- **Persistent Scoreboard:** Tracks Player X wins, Player O/AI wins, and Ties across browser sessions using React 19's `useSyncExternalStore` for zero-hydration mismatch.

### 3. Engineering Rigor
- **Modern Stack:** React 19.3.1, Next.js 16.4.6 App Router, Tailwind CSS v4, Base UI, `@phosphor-icons/react`.
- **Zero Hydration Errors:** Fully SSR-safe architecture.
- **Accessibility (a11y):** Keyboard navigation support, ARIA live announcements for screen readers, and WCAG AA color contrast.

---

## 📂 AI SDLC Documentation

Explore the complete software development life cycle documentation in [`docs/ai-sdlc/`](docs/ai-sdlc/):

1. 📋 [**Phase 1: Spec & Requirements**](docs/ai-sdlc/01-spec-and-requirements.md) – Deconstruction of `docs/test-1.md` into a formal PRD and Gherkin acceptance criteria.
2. 🎨 [**Phase 2: UI/UX & Design System**](docs/ai-sdlc/02-ui-ux-design-system.md) – Tailwind v4 token architecture, dual themes, and Finite State Machine.
3. ⚡ [**Phase 3: Code Generation & Guardrails**](docs/ai-sdlc/03-context-aware-code-generation.md) – Anti-hallucination guardrails and atomic prompting sequences.
4. 🧪 [**Phase 4: QA & Verification**](docs/ai-sdlc/04-qa-testing-and-verification.md) – Test matrices, Minimax proofs, and pre-commit quality gates.
5. 🚀 [**Phase 5: Deployment & CI/CD**](docs/ai-sdlc/05-deployment-and-ci-cd.md) – Vercel production deployment and release verification.
6. 📦 [**Phase 6: Submission Engineering**](docs/ai-sdlc/06-submission-and-reviewer-artifacts.md) – Loom video demo script and reviewer pitch.

---

## 🛠️ Local Development & Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript type check
npm run typecheck

# Run ESLint
npm run lint

# Build production bundle
npm run build
```

---

## 🚀 Deployment

The project is automatically deployed to Vercel upon pushing to the `main` branch.
- **Live URL:** [https://tic-tac-toe-paz.vercel.app](https://tic-tac-toe-paz.vercel.app)
- **Vercel Inspect:** [vercel.com/ryan-pazrins-projects/tic-tac-toe-paz](https://vercel.com/ryan-pazrins-projects/tic-tac-toe-paz)
