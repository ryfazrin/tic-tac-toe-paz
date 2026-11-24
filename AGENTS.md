<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AI Agent System Instructions & Project Constitution

This repository is governed by the **Enterprise AI Software Development Life Cycle (AI SDLC)** framework documented in [`docs/ai-sdlc/`](docs/ai-sdlc/). All AI agents (Cursor, Claude Code, Antigravity, Copilot) assisting with this codebase **MUST** strictly follow the specifications, architectural patterns, and quality gates outlined below.

---

## 1. Ground Truth Documentation Index

Before proposing changes, generating code, or modifying architectural boundaries, consult the relevant AI SDLC phase module:

- 📋 [**Phase 1: Specification & Requirements**](docs/ai-sdlc/01-spec-and-requirements.md)  
  *Core contracts, MoSCoW feature matrix, Gherkin acceptance criteria, and PRD.*
- 🎨 [**Phase 2: UI/UX & Design System Architecture**](docs/ai-sdlc/02-ui-ux-design-system.md)  
  *Tailwind CSS v4 token conventions, dual theme specifications (Cyberpunk Neon vs Clean Minimalist), component hierarchy, and Finite State Machine.*
- ⚡ [**Phase 3: Context-Aware Code Generation & Anti-Hallucination**](docs/ai-sdlc/03-context-aware-code-generation.md)  
  *Anti-hallucination guardrails, atomic prompt sequence, and Minimax algorithm implementation contracts.*
- 🧪 [**Phase 4: QA, Testing & Quality Gates**](docs/ai-sdlc/04-qa-testing-and-verification.md)  
  *Automated test suites (Vitest), WCAG AA accessibility rules, and deterministic pre-commit gates.*
- 🚀 [**Phase 5: Deployment & CI/CD Pipeline**](docs/ai-sdlc/05-deployment-and-ci-cd.md)  
  *Vercel production build protocols, SSR hydration mismatch prevention, and release verification.*
- 📦 [**Phase 6: Submission Engineering & Reviewer Artifacts**](docs/ai-sdlc/06-submission-and-reviewer-artifacts.md)  
  *Evaluation form criteria (`apply.capm.us`), demo video storyboard script, and reviewer notes.*

---

## 2. Technical Stack & Invariant Rules

| Layer | Version / Library | Invariant Rules for AI Agents |
| :--- | :--- | :--- |
| **Framework** | Next.js `16.4.6` (App Router) | Interactive components must declare `'use client'`. Prerendered static pages must not access browser APIs during SSR. |
| **UI Library** | React `19.3.1` | **No `React.forwardRef`** (accept `ref` directly as a prop). **No `setState` in `useEffect`** (use `useSyncExternalStore` for external state like `localStorage`). |
| **Styling** | Tailwind CSS `v4` (`@tailwindcss/postcss`) | **Do NOT create or modify `tailwind.config.js`**. Use CSS variables under `@theme` in `app/globals.css`. |
| **Icons** | Phosphor Icons (`@phosphor-icons/react`) | Use semantic icons (`Lightning`, `Target`, `X`, `Circle`, `Robot`, `ArrowClockwise`). |
| **Components** | shadcn/ui + Base UI (`@base-ui/react`) | Follow the established atomic component hierarchy in `components/game/`. |
| **TypeScript** | TypeScript `5` | Strict type checking. **Never use `any`**. All game state, actions, and props must be strictly typed. |

---

## 3. Mandatory Quality Gate Protocol

Never commit or deploy code without running and passing all three quality gate steps:

```bash
# 1. Strict TypeScript compilation check (0 errors)
npm run typecheck

# 2. Strict ESLint & React 19 core web vitals check (0 errors, 0 warnings)
npm run lint

# 3. Production static compilation verification
npm run build
```

---

## 4. Live Environment Reference

- **Production URL:** [https://tic-tac-toe-paz.vercel.app](https://tic-tac-toe-paz.vercel.app)
- **GitHub Repository:** [https://github.com/ryfazrin/tic-tac-toe-paz](https://github.com/ryfazrin/tic-tac-toe-paz)
- **Submission Form:** [https://apply.capm.us](https://apply.capm.us) (Select `1) Tic-Tac-Toe`)
