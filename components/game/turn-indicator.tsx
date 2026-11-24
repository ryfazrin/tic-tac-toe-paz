"use client";

import { GameMode, PlayerMark, ThemeMode, WinResult } from "@/lib/game-engine";
import {
  Lightning,
  Target,
  Trophy,
  Handshake,
  CircleNotch,
  Robot,
  User,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface TurnIndicatorProps {
  turn: PlayerMark;
  winResult: WinResult | null;
  isDraw: boolean;
  isThinking: boolean;
  gameMode: GameMode;
  theme: ThemeMode;
}

export function TurnIndicator({
  turn,
  winResult,
  isDraw,
  isThinking,
  gameMode,
  theme,
}: TurnIndicatorProps) {
  const isAi = gameMode === "ai-unbeatable";

  // Winner Announcement
  if (winResult) {
    const isAiWinner = isAi && winResult.winner === "O";
    const winnerLabel = isAiWinner ? "AI (Unbeatable)" : `Player ${winResult.winner}`;

    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold tracking-wide animate-in fade-in zoom-in-95 duration-200",
          theme === "cyberpunk"
            ? "border-emerald-500/50 bg-emerald-950/60 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.35)]"
            : "border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 shadow-sm"
        )}
      >
        <Trophy weight="fill" className="size-4 text-emerald-400 animate-bounce" />
        <span>{winnerLabel} Won the Game!</span>
      </div>
    );
  }

  // Draw Announcement
  if (isDraw) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold tracking-wide animate-in fade-in zoom-in-95 duration-200",
          theme === "cyberpunk"
            ? "border-amber-500/40 bg-amber-950/50 text-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.25)]"
            : "border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 shadow-sm"
        )}
      >
        <Handshake weight="bold" className="size-4 text-amber-400" />
        <span>It&apos;s a Tie! Well Played.</span>
      </div>
    );
  }

  // AI Thinking State
  if (isThinking) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-sm font-medium tracking-wide animate-pulse",
          theme === "cyberpunk"
            ? "border-pink-500/30 bg-pink-950/40 text-pink-300"
            : "border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300"
        )}
      >
        <CircleNotch className="size-4 animate-spin text-pink-400" />
        <span>AI is computing optimal move...</span>
      </div>
    );
  }

  // Active Player Turn State
  const isAiTurn = isAi && turn === "O";
  const playerLabel = isAiTurn ? "AI's Turn (O)" : `Player ${turn}'s Turn`;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-sm font-medium tracking-wide transition-all duration-200",
        theme === "cyberpunk"
          ? turn === "X"
            ? "border-cyan-500/30 bg-slate-950/60 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
            : "border-pink-500/30 bg-slate-950/60 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.15)]"
          : "border-border/80 bg-muted/50 text-foreground"
      )}
    >
      {turn === "X" ? (
        theme === "cyberpunk" ? (
          <Lightning weight="fill" className="size-4 text-cyan-400" />
        ) : (
          <User weight="bold" className="size-4 text-slate-800 dark:text-slate-200" />
        )
      ) : isAiTurn ? (
        <Robot weight="bold" className="size-4 text-pink-400" />
      ) : theme === "cyberpunk" ? (
        <Target weight="bold" className="size-4 text-pink-400" />
      ) : (
        <User weight="bold" className="size-4 text-indigo-600 dark:text-indigo-400" />
      )}
      <span>{playerLabel}</span>
    </div>
  );
}
