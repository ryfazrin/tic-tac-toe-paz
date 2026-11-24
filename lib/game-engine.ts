export type PlayerMark = 'X' | 'O';
export type Board = (PlayerMark | null)[];

export interface WinResult {
  winner: PlayerMark;
  line: [number, number, number];
}

export type GameMode = 'pvp' | 'ai-unbeatable';
export type ThemeMode = 'cyberpunk' | 'minimalist';

export const WINNING_LINES: [number, number, number][] = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Checks if there is a winner on the board.
 * Returns the winning mark and the line indices, or null if no winner.
 */
export function checkWin(board: Board): WinResult | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const markA = board[a];
    if (markA && markA === board[b] && markA === board[c]) {
      return { winner: markA, line };
    }
  }
  return null;
}

/**
 * Checks if the board has reached a draw state (all cells filled, no winner).
 */
export function checkDraw(board: Board): boolean {
  if (checkWin(board)) return false;
  return board.every((cell) => cell !== null);
}

/**
 * Returns all indices of currently empty cells.
 */
export function getAvailableMoves(board: Board): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

/**
 * Unbeatable Minimax Algorithm for Tic-Tac-Toe.
 * Calculates optimal move index for the AI player using depth-penalized evaluation.
 */
export function getBestMove(board: Board, aiMark: PlayerMark): number {
  const humanMark: PlayerMark = aiMark === 'X' ? 'O' : 'X';
  const availableMoves = getAvailableMoves(board);

  // If board is empty, picking center or corner is mathematically best
  if (availableMoves.length === 9) {
    return 4; // Center
  }

  // If center is available on move 2, take it
  if (availableMoves.length === 8 && board[4] === null) {
    return 4;
  }

  function minimax(currentBoard: Board, depth: number, isMaximizing: boolean): number {
    const winResult = checkWin(currentBoard);
    if (winResult) {
      return winResult.winner === aiMark ? 10 - depth : depth - 10;
    }
    if (checkDraw(currentBoard)) {
      return 0;
    }

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = aiMark;
          const score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          maxScore = Math.max(maxScore, score);
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = humanMark;
          const score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          minScore = Math.min(minScore, score);
        }
      }
      return minScore;
    }
  }

  let bestScore = -Infinity;
  let bestMove = availableMoves[0] ?? 0;

  for (const move of availableMoves) {
    board[move] = aiMark;
    const score = minimax(board, 0, false);
    board[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}
