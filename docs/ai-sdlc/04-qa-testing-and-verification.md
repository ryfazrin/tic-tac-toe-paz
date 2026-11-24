# Phase 4: AI-Assisted QA, Testing & Quality Gates

> **Goal:** Deploy automated AI testing routines to rigorously verify game logic correctness, Minimax optimality, accessibility standards (WCAG AA), and build determinism before any deployment.

---

## 1. Automated Test Matrix

The test strategy splits into two automated layers: pure logic unit testing (Vitest) and accessibility/component integration testing.

```
                          ┌─────────────────────────────────────┐
                          │         TEST SUITE MATRIX           │
                          └──────────────────┬──────────────────┘
                                             │
               ┌─────────────────────────────┴─────────────────────────────┐
               │                                                           │
┌──────────────▼────────────────────────────┐               ┌──────────────▼────────────────────────────┐
│      1. PURE ENGINE & ALGORITHM           │               │       2. COMPONENT & ACCESSIBILITY        │
├───────────────────────────────────────────┤               ├───────────────────────────────────────────┤
│ • 8 Win lines detection (rows, cols, diag)│               │ • Cell click handlers & turn alternation  │
│ • Draw detection on full board            │               │ • Disabled cell clicks after game over    │
│ • Minimax: Optimal blocking moves         │               │ • Keyboard navigation (Enter / Space / R) │
│ • Minimax: Immediate win seizure          │               │ • aria-live screen reader announcements   │
│ • Minimax: Zero loss rate (invariant)     │               │ • LocalStorage hydration safety           │
└───────────────────────────────────────────┘               └───────────────────────────────────────────┘
```

---

## 2. AI Prompt for Automated Test Generation

Use this prompt to generate test suites that rigorously validate the core game mechanics:

```markdown
Prompt to AI:
Write a comprehensive test suite using Vitest / React Testing Library for our Tic-Tac-Toe game engine:

Target File: `lib/game-engine.test.ts`
Requirements:
1. `checkWin`:
   - Test all 3 horizontal winning rows ([0,1,2], [3,4,5], [6,7,8]).
   - Test all 3 vertical winning columns ([0,3,6], [1,4,7], [2,5,8]).
   - Test both diagonal winning lines ([0,4,8], [2,4,6]).
   - Return null for unfinished or drawn games.
2. `checkDraw`:
   - Returns true when all 9 squares are filled and there is no winner.
   - Returns false when board has empty spaces or a player has won.
3. `getBestMove` (Minimax Proofs):
   - Win immediately: If AI has two marks in a row and the third is empty, pick the winning index.
   - Block immediately: If opponent has two marks in a row and the third is empty, block that index.
   - Invariant test: Simulate games of Minimax AI playing against random moves; assert that AI NEVER loses a single match.
```

### Complete Test Contract Example (`lib/game-engine.test.ts`)

```typescript
import { describe, it, expect } from 'vitest';
import { checkWin, checkDraw, getBestMove, Board } from './game-engine';

describe('Tic-Tac-Toe Game Engine', () => {
  it('correctly detects horizontal wins', () => {
    const board: Board = ['X', 'X', 'X', null, 'O', null, 'O', null, null];
    const result = checkWin(board);
    expect(result).not.toBeNull();
    expect(result?.winner).toBe('X');
    expect(result?.line).toEqual([0, 1, 2]);
  });

  it('correctly detects diagonal wins', () => {
    const board: Board = ['O', 'X', null, 'X', 'O', null, null, null, 'O'];
    const result = checkWin(board);
    expect(result).not.toBeNull();
    expect(result?.winner).toBe('O');
    expect(result?.line).toEqual([0, 4, 8]);
  });

  it('detects a draw when board is full without a winner', () => {
    const board: Board = [
      'X', 'O', 'X',
      'X', 'O', 'O',
      'O', 'X', 'X'
    ];
    expect(checkWin(board)).toBeNull();
    expect(checkDraw(board)).toBe(true);
  });

  it('Minimax AI blocks opponent from winning on next move', () => {
    // Opponent 'X' has [0, 1] filled; AI 'O' must block at 2
    const board: Board = [
      'X', 'X', null,
      'O', null, null,
      null, null, null
    ];
    const bestMove = getBestMove(board, 'O');
    expect(bestMove).toBe(2);
  });

  it('Minimax AI chooses winning move over blocking move', () => {
    // AI 'O' has [3, 4] (can win at 5); Opponent 'X' has [0, 1] (threatens at 2)
    const board: Board = [
      'X', 'X', null,
      'O', 'O', null,
      null, null, null
    ];
    const bestMove = getBestMove(board, 'O');
    expect(bestMove).toBe(5); // AI takes immediate win
  });
});
```

---

## 3. Accessibility (a11y) & Edge-Case Verification Protocol

Run through this manual verification matrix to ensure zero usability flaws:

| Category | Verification Step | Expected Behavior | Pass Criteria |
| :--- | :--- | :--- | :---: |
| **Keyboard Nav** | Press `Tab` through the page | Focus indicator clearly outlines cells 0 to 8 sequentially. | ✅ |
| **Action Key** | Press `Space` or `Enter` on cell | Cell is marked with current turn symbol; focus remains stable. | ✅ |
| **Quick Reset** | Press key `r` or `R` during a match | Active board resets to blank; status resets to "Player X's Turn". | ✅ |
| **Screen Reader** | Run VoiceOver / NVDA on cell click | Announces: *"Square 5, marked with X. Player O's turn."* | ✅ |
| **Double Click** | Rapidly click already marked cell | Sound does not retrigger; state remains unchanged; no flicker. | ✅ |
| **Persistence** | Refresh browser after 3 wins | Scoreboard retains 3-0 count from `localStorage`. | ✅ |
| **Theme Toggle** | Switch from Cyberpunk to Minimalist | Background and text color transitions smoothly without layout shift. | ✅ |

---

## 4. Deterministic Pre-Commit Quality Gate

Before pushing commits to GitHub or deploying to Vercel, run the three-step terminal quality gate:

```bash
# 1. Check TypeScript compilation and strict types
npm run typecheck

# 2. Check ESLint rules (Next.js 16 core web vitals + React 19 rules)
npm run lint

# 3. Verify clean production build output
npm run build
```

**Quality Gate Rules:**
- If any command fails with a non-zero exit code, do **not** push to GitHub.
- Prompt your AI coding agent with the exact terminal error output using the command:
  `"Fix this TypeScript error in lib/game-engine.ts while adhering to strict null checks and React 19 rules."`
