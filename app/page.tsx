"use client";

import { useEffect } from "react";
import { useTicTacToe } from "@/hooks/use-tic-tac-toe";
import { BoardCell } from "@/components/game/board-cell";
import { ScoreBoard } from "@/components/game/score-board";
import { TurnIndicator } from "@/components/game/turn-indicator";
import { GameControls } from "@/components/game/game-controls";
import { GameController } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export default function TicTacToePage() {
  const {
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
  } = useTicTacToe();

  // Global hotkey: Press 'R' to restart game
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key.toLowerCase() === "r" && !e.metaKey && !e.ctrlKey) {
        resetGame();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetGame]);

  return (
    <main
      data-theme={theme}
      className={cn(
        "relative flex min-h-svh flex-col items-center justify-between p-4 sm:p-8 transition-colors duration-300",
        theme === "cyberpunk"
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-black"
          : "bg-background text-foreground"
      )}
    >
      {/* Background ambient decorative glow for Cyberpunk theme */}
      {theme === "cyberpunk" && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30">
          <div className="absolute -top-40 -left-40 size-96 rounded-full bg-cyan-600/30 blur-3xl" />
          <div className="absolute top-1/2 -right-40 size-96 rounded-full bg-pink-600/25 blur-3xl" />
        </div>
      )}

      {/* Top Header */}
      <header className="z-10 flex flex-col items-center gap-2 text-center w-full max-w-md pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-card/60 backdrop-blur-xs text-xs font-semibold tracking-wider uppercase text-muted-foreground shadow-xs">
          <GameController weight="bold" className="size-3.5 text-primary" />
          <span>React 19 &bull; Next.js 16</span>
          <span className="inline-block size-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-500">Live</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Tic-Tac-Toe{" "}
          <span
            className={cn(
              "font-mono text-base font-normal px-2 py-0.5 rounded-md",
              theme === "cyberpunk"
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "bg-muted text-muted-foreground"
            )}
          >
            Pro
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">
          Classic gameplay with intelligent AI, multi-theming, sound effects, and persistent scores.
        </p>
      </header>

      {/* Main Interactive Game Container */}
      <section className="z-10 flex flex-col items-center gap-4 sm:gap-5 w-full max-w-md my-4">
        {/* Scoreboard */}
        <ScoreBoard
          scores={scores}
          turn={turn}
          gameMode={gameMode}
          theme={theme}
          isGameOver={isGameOver}
        />

        {/* Turn & Status Indicator */}
        <TurnIndicator
          turn={turn}
          winResult={winResult}
          isDraw={isDraw}
          isThinking={isThinking}
          gameMode={gameMode}
          theme={theme}
        />

        {/* 3x3 Grid Board */}
        <div
          role="grid"
          aria-label="Tic-Tac-Toe Game Board"
          className={cn(
            "grid grid-cols-3 gap-2.5 sm:gap-3.5 p-3.5 sm:p-4 rounded-3xl border w-full aspect-square max-w-[340px] sm:max-w-[380px] transition-all duration-300 shadow-lg",
            theme === "cyberpunk"
              ? "bg-slate-900/60 border-cyan-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.1)]"
              : "bg-card/70 border-border/80 backdrop-blur-md shadow-md"
          )}
        >
          {board.map((cellValue, index) => {
            const isWinningCell = winResult?.line.includes(index) ?? false;
            return (
              <BoardCell
                key={index}
                index={index}
                value={cellValue}
                isWinning={isWinningCell}
                disabled={isGameOver || isThinking}
                theme={theme}
                onSelect={() => makeMove(index)}
              />
            );
          })}
        </div>

        {/* Controls: New Game, Mode, Theme, Sound */}
        <GameControls
          gameMode={gameMode}
          theme={theme}
          soundEnabled={soundEnabled}
          onResetGame={resetGame}
          onResetScores={resetScores}
          onSelectMode={setGameMode}
          onSelectTheme={setTheme}
          onToggleSound={toggleSound}
        />
      </section>

      {/* Footer & Shortcut Hints */}
      <footer className="z-10 flex flex-col items-center gap-1.5 text-center text-xs text-muted-foreground pb-2">
        <div className="flex items-center gap-2">
          <span>
            Shortcut: Press <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono text-[10px]">R</kbd> to restart
          </span>
          <span>&bull;</span>
          <span>
            Press <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono text-[10px]">D</kbd> for dark mode
          </span>
        </div>
        <p className="text-[11px] opacity-75">
          Engineered with AI SDLC &bull; Semprove / Capm Developer Assessment
        </p>
      </footer>
    </main>
  );
}
