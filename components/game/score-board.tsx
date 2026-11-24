"use client";

import { Scores } from "@/hooks/use-tic-tac-toe";
import { GameMode, PlayerMark, ThemeMode } from "@/lib/game-engine";
import {LightningIcon, UserIcon, RobotIcon, TargetIcon, HandshakeIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface ScoreBoardProps {
  scores: Scores;
  turn: PlayerMark;
  gameMode: GameMode;
  theme: ThemeMode;
  isGameOver: boolean;
}

export function ScoreBoard({
  scores,
  turn,
  gameMode,
  theme,
  isGameOver,
}: ScoreBoardProps) {
  const isAi = gameMode === "ai-unbeatable";

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full">
      {/* Player X Score Card */}
      <div
        className={cn(
          "flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all duration-200",
          theme === "cyberpunk"
            ? "bg-slate-950/70 border-cyan-500/30"
            : "bg-card border-border/80 shadow-xs",
          turn === "X" && !isGameOver && (
            theme === "cyberpunk"
              ? "border-cyan-400 shadow-[0_0_14px_rgba(6,182,212,0.4)]"
              : "ring-2 ring-primary/40 border-primary"
          )
        )}
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase mb-1">
          {theme === "cyberpunk" ? (
            <LightningIcon weight="fill" className="size-4 text-cyan-400" />
          ) : (
            <UserIcon weight="bold" className="size-3.5 text-slate-700 dark:text-slate-300" />
          )}
          <span className="text-muted-foreground">Player X</span>
        </div>
        <span className="text-xl sm:text-2xl font-bold font-mono text-muted-foreground">
          {scores.xWins}
        </span>
      </div>

      {/* Ties / Draws Card */}
      <div
        className={cn(
          "flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all duration-200",
          theme === "cyberpunk"
            ? "bg-slate-950/70 border-amber-500/20"
            : "bg-card border-border/80 shadow-xs"
        )}
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase mb-1">
          <HandshakeIcon weight="bold" className="size-4 text-amber-500" />
          <span className="text-muted-foreground">Ties</span>
        </div>
        <span className="text-xl sm:text-2xl font-bold font-mono text-muted-foreground">
          {scores.draws}
        </span>
      </div>

      {/* Player O / AI Score Card */}
      <div
        className={cn(
          "flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border transition-all duration-200",
          theme === "cyberpunk"
            ? "bg-slate-950/70 border-pink-500/30"
            : "bg-card border-border/80 shadow-xs",
          turn === "O" && !isGameOver && (
            theme === "cyberpunk"
              ? "border-pink-500 shadow-[0_0_14px_rgba(236,72,153,0.4)]"
              : "ring-2 ring-indigo-500/40 border-indigo-500"
          )
        )}
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase mb-1">
          {isAi ? (
            <RobotIcon weight="bold" className="size-4 text-pink-400" />
          ) : theme === "cyberpunk" ? (
            <TargetIcon weight="bold" className="size-4 text-pink-400" />
          ) : (
            <UserIcon weight="bold" className="size-3.5 text-indigo-600 dark:text-indigo-400" />
          )}
          <span className="text-muted-foreground">
            {isAi ? "AI (O)" : "Player O"}
          </span>
        </div>
        <span className="text-xl sm:text-2xl font-bold font-mono text-muted-foreground">
          {scores.oWins}
        </span>
      </div>
    </div>
  );
}
