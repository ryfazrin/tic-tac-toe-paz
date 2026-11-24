"use client";

import { useState, useCallback, useRef, useSyncExternalStore, useMemo } from "react";
import {
  Board,
  PlayerMark,
  GameMode,
  ThemeMode,
  WinResult,
  checkWin,
  checkDraw,
  getBestMove,
} from "@/lib/game-engine";
import {
  playClickSound,
  playWinSound,
  playDrawSound,
  triggerConfetti,
} from "@/lib/fx";

export interface Scores {
  xWins: number;
  oWins: number;
  draws: number;
}

const STORAGE_KEYS = {
  SCORES: "ttt_scores_v2",
  MODE: "ttt_mode_v2",
  SOUND: "ttt_sound_v2",
  THEME: "ttt_theme_v2",
} as const;

const DEFAULT_SCORES_STR = '{"xWins":0,"oWins":0,"draws":0}';

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("local-storage-update", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("local-storage-update", callback);
  };
}

function setLocalStorageItem(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event("local-storage-update"));
  } catch {
    // Ignore storage write errors in restricted environments
  }
}

export function useTicTacToe() {
  const [board, setBoard] = useState<Board>(() => Array(9).fill(null));
  const [turn, setTurn] = useState<PlayerMark>("X");
  const [isThinking, setIsThinking] = useState<boolean>(false);

  // Sync external stores (localStorage) safely across tabs and SSR without cascading effects
  const scoresRaw = useSyncExternalStore(
    subscribeToStorage,
    () => localStorage.getItem(STORAGE_KEYS.SCORES) ?? DEFAULT_SCORES_STR,
    () => DEFAULT_SCORES_STR
  );

  const modeRaw = useSyncExternalStore(
    subscribeToStorage,
    () => (localStorage.getItem(STORAGE_KEYS.MODE) as GameMode | null) ?? "pvp",
    () => "pvp" as GameMode
  );

  const soundRaw = useSyncExternalStore(
    subscribeToStorage,
    () => localStorage.getItem(STORAGE_KEYS.SOUND) ?? "true",
    () => "true"
  );

  const themeRaw = useSyncExternalStore(
    subscribeToStorage,
    () => (localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode | null) ?? "cyberpunk",
    () => "cyberpunk" as ThemeMode
  );

  // Derived typed values
  const scores: Scores = useMemo(() => {
    try {
      const parsed = JSON.parse(scoresRaw);
      if (
        typeof parsed.xWins === "number" &&
        typeof parsed.oWins === "number" &&
        typeof parsed.draws === "number"
      ) {
        return parsed;
      }
    } catch {
      // fallback
    }
    return { xWins: 0, oWins: 0, draws: 0 };
  }, [scoresRaw]);

  const gameMode: GameMode = modeRaw === "ai-unbeatable" ? "ai-unbeatable" : "pvp";
  const soundEnabled: boolean = soundRaw !== "false";
  const theme: ThemeMode = themeRaw === "minimalist" ? "minimalist" : "cyberpunk";

  const winResult: WinResult | null = checkWin(board);
  const isDraw: boolean = !winResult && checkDraw(board);
  const isGameOver: boolean = Boolean(winResult || isDraw);

  const aiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const persistScores = useCallback((newScores: Scores) => {
    setLocalStorageItem(STORAGE_KEYS.SCORES, JSON.stringify(newScores));
  }, []);

  const resetGame = useCallback(() => {
    if (aiTimeoutRef.current) {
      clearTimeout(aiTimeoutRef.current);
    }
    setBoard(Array(9).fill(null));
    setTurn("X");
    setIsThinking(false);
  }, []);

  const resetScores = useCallback(() => {
    persistScores({ xWins: 0, oWins: 0, draws: 0 });
  }, [persistScores]);

  const setGameMode = useCallback(
    (mode: GameMode) => {
      setLocalStorageItem(STORAGE_KEYS.MODE, mode);
      resetGame();
    },
    [resetGame]
  );

  const toggleSound = useCallback(() => {
    setLocalStorageItem(STORAGE_KEYS.SOUND, soundEnabled ? "false" : "true");
  }, [soundEnabled]);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setLocalStorageItem(STORAGE_KEYS.THEME, newTheme);
  }, []);

  // AI execution trigger
  const executeAiMove = useCallback(
    (currentBoard: Board) => {
      setIsThinking(true);
      aiTimeoutRef.current = setTimeout(() => {
        const bestIndex = getBestMove(currentBoard, "O");
        if (bestIndex >= 0 && currentBoard[bestIndex] === null) {
          const aiBoard: Board = [...currentBoard];
          aiBoard[bestIndex] = "O";
          playClickSound(soundEnabled);
          setBoard(aiBoard);

          const aiWin = checkWin(aiBoard);
          if (aiWin) {
            playWinSound(soundEnabled);
            persistScores({
              ...scores,
              oWins: scores.oWins + 1,
            });
          } else if (checkDraw(aiBoard)) {
            playDrawSound(soundEnabled);
            persistScores({
              ...scores,
              draws: scores.draws + 1,
            });
          } else {
            setTurn("X");
          }
        }
        setIsThinking(false);
      }, 320);
    },
    [persistScores, scores, soundEnabled]
  );

  // Human move trigger
  const makeMove = useCallback(
    (index: number) => {
      if (
        board[index] !== null ||
        isGameOver ||
        isThinking ||
        (gameMode === "ai-unbeatable" && turn === "O")
      ) {
        return;
      }

      const nextBoard: Board = [...board];
      nextBoard[index] = turn;
      playClickSound(soundEnabled);
      setBoard(nextBoard);

      const win = checkWin(nextBoard);
      if (win) {
        playWinSound(soundEnabled);
        triggerConfetti();
        persistScores({
          ...scores,
          xWins: turn === "X" ? scores.xWins + 1 : scores.xWins,
          oWins: turn === "O" ? scores.oWins + 1 : scores.oWins,
        });
        return;
      }

      if (checkDraw(nextBoard)) {
        playDrawSound(soundEnabled);
        persistScores({
          ...scores,
          draws: scores.draws + 1,
        });
        return;
      }

      const nextTurn: PlayerMark = turn === "X" ? "O" : "X";
      setTurn(nextTurn);

      if (gameMode === "ai-unbeatable" && nextTurn === "O") {
        executeAiMove(nextBoard);
      }
    },
    [
      board,
      isGameOver,
      isThinking,
      gameMode,
      turn,
      soundEnabled,
      scores,
      persistScores,
      executeAiMove,
    ]
  );

  return {
    board,
    turn,
    gameMode,
    theme,
    soundEnabled,
    scores,
    isThinking,
    winResult,
    isDraw,
    isGameOver,
    makeMove,
    resetGame,
    resetScores,
    setGameMode,
    toggleSound,
    setTheme,
  };
}
