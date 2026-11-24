# Phase 1: Specification & Requirements Engineering

> **Goal:** Transform the raw challenge prompt from `docs/test-1.md` into a formal, unambiguous Product Requirements Document (PRD) and Acceptance Criteria using AI, establishing a solid contract before touching code.

---

## 1. Deconstructing the Assessment Brief (`docs/test-1.md`)

The assessment brief establishes three basic "Done" conditions, but explicitly encourages flair, personality, and advanced capabilities:

```
"A simple game passes, but we love style and personality. Past candidates have swapped X and O 
for cool icons and GIFs and added their own themes, so make it yours and have fun with it. 
Bonus (optional): a score board that counts wins and draws... Building well with AI is a skill we're looking for."
```

### MoSCoW Feature Matrix

| Priority | Feature Item | Technical Scope | AI Role in Definition |
| :--- | :--- | :--- | :--- |
| **Must Have (Pass Criteria)** | 3×3 Grid Board | Two players take turns placing marks. No cell overwriting. | State representation (Array of 9 items: `(string \| null)[]`). |
| **Must Have (Pass Criteria)** | Win & Draw Evaluation | Compute 8 winning lines (3 horizontal, 3 vertical, 2 diagonal) + full board tie. | Deterministic combinatorics validation. |
| **Must Have (Pass Criteria)** | Game Reset ("New Game") | Reset active grid, clear winning line highlight, preserve active turn. | State initialization boundary. |
| **Should Have (Differentiator)** | Dynamic Scoreboard | Track Player X wins, Player O wins, and Draws across sessions via `localStorage`. | Persistence strategy & SSR hydration safety. |
| **Should Have (Differentiator)** | Thematic Switcher | Switch between **Cyberpunk Neon** and **Clean Minimalist**, swapping icons (e.g., Neon Zap/Cross vs Minimalist Circle/Square). | Tailwind v4 theme token variables + dynamic icon bindings. |
| **Could Have (Advanced AI)** | Smart AI Mode (Minimax) | Toggle between "2-Player Local (Pass & Play)" and "1-Player vs AI (Unbeatable Minimax / Casual Random)". | Algorithmic depth and game tree evaluation. |
| **Could Have (Delight/Polish)** | Audio & Particle FX | Subtle synthesized Web Audio sound FX on click/win, plus celebratory confetti on victory. | Browser API isolation without heavy external assets. |

---

## 2. AI Requirements Engineering Prompts

To prevent scope creep and ensure adherence to Next.js best practices, use the following structured prompt sequence with your frontier LLM (e.g., Claude 3.5 Sonnet or ChatGPT):

### System Prompt for Spec Engineering
```markdown
You are a Principal Product Engineer specializing in modern React 19 and Next.js 16 architectures.
Your objective is to deconstruct a coding challenge brief into an industry-grade PRD.
Guidelines:
1. Distinguish strictly between baseline pass criteria and competitive differentiators.
2. Ensure all data structures are strictly typed in TypeScript.
3. Consider state persistence edge cases (e.g., Next.js SSR hydration mismatches with localStorage).
4. Provide testable Gherkin acceptance criteria (Given-When-Then).
```

### Operational Prompt 1.1: PRD Synthesis
```markdown
Context:
I am preparing a coding assessment project for a Software Developer role at a high-growth tech company.
The project is a Tic-Tac-Toe web application built with React 19, Next.js 16, Tailwind CSS v4, and shadcn/ui.

Brief Requirements:
1. 3x3 interactive board with turn management.
2. Win/Draw detection with visual feedback.
3. New game reset button.
4. Competitive edge: personality/theming, persistent scoreboard, and optional AI opponent.

Task:
Generate a complete, production-ready Product Requirements Document (PRD) including:
1. Executive Target & User Personas.
2. Functional Specifications for all 3 tiers (Core, Personality, Advanced).
3. Data Models & State Contracts.
4. Non-Functional Requirements (Performance, a11y, zero hydration mismatch).
```

---

## 3. Synthesized Product Requirements Document (PRD)

### 3.1. Data Models & TypeScript Contracts

```typescript
export type PlayerMark = 'X' | 'O';
export type BoardState = (PlayerMark | null)[];
export type GameMode = 'pvp' | 'ai-easy' | 'ai-unbeatable';
export type ThemeId = 'cyberpunk' | 'minimalist' | 'retro-arcade';

export interface WinCondition {
  winner: PlayerMark;
  line: [number, number, number]; // Index of cells 0..8
}

export interface ScoreState {
  xWins: number;
  oWins: number;
  draws: number;
  streak: {
    player: PlayerMark | null;
    count: number;
  };
}

export interface GameSettings {
  theme: ThemeId;
  mode: GameMode;
  soundEnabled: boolean;
  playerSymbolChoice: {
    xIcon: string;
    oIcon: string;
  };
}
```

### 3.2. Acceptance Criteria (Gherkin Syntax)

#### Scenario 1: Standard Turn Placement & Concurrency Guard
```gherkin
Given a blank 3x3 board and Player X's turn
When Player X clicks on cell index 4 (center)
Then cell 4 displays Player X's mark
And the turn indicator updates to Player O
And subsequent clicks on cell 4 are ignored
```

#### Scenario 2: Deterministic Win Detection & Line Highlighting
```gherkin
Given Player X has marks at indices [0, 1]
When Player X clicks cell index 2
Then the system detects a horizontal win for Player X on line [0, 1, 2]
And the winning cells [0, 1, 2] display an animated victory glow
And further clicks on any cell are disabled
And Player X's score increments by 1
And celebratory particle effects are triggered
```

#### Scenario 3: Draw Detection
```gherkin
Given 8 cells are filled and no player has 3 in a row
When the final empty cell is marked without creating a winning line
Then the status banner displays "Game Ended in a Draw!"
And the Draws counter increments by 1
And the board disables further moves
```

#### Scenario 4: LocalStorage Scoreboard Hydration
```gherkin
Given a user with prior scores (X: 3, O: 1, Draws: 2) stored in localStorage
When the application loads in Next.js 16 App Router
Then the initial server render matches the client snapshot without hydration mismatch warnings
And the scoreboard renders the correct persisted values immediately after mount
```

---

## 4. Quality Gate Checklist (Phase 1 Exit Criteria)

Before advancing to Phase 2 (UI/UX Architecture), ensure the following are approved:
- [x] All 3 core requirements from `docs/test-1.md` are accounted for in Must-Have criteria.
- [x] Differentiators (Themes, Scoreboard, Minimax AI) are scoped with typed contracts.
- [x] SSR hydration caveats for `localStorage` are documented.
- [x] Gherkin acceptance criteria provide unambiguous verification targets for automated QA.
