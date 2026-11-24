"use client";

import { Button } from "@/components/ui/button";
import { GameMode, ThemeMode } from "@/lib/game-engine";
import {
  ArrowClockwise,
  Users,
  Robot,
  SpeakerHigh,
  SpeakerSimpleSlash,
  Sparkle,
  PaintBrush,
  Trash,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface GameControlsProps {
  gameMode: GameMode;
  theme: ThemeMode;
  soundEnabled: boolean;
  onResetGame: () => void;
  onResetScores: () => void;
  onSelectMode: (mode: GameMode) => void;
  onSelectTheme: (theme: ThemeMode) => void;
  onToggleSound: () => void;
}

export function GameControls({
  gameMode,
  theme,
  soundEnabled,
  onResetGame,
  onResetScores,
  onSelectMode,
  onSelectTheme,
  onToggleSound,
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {/* Primary Action: New Game Button */}
      <Button
        onClick={onResetGame}
        size="lg"
        className={cn(
          "w-full font-semibold tracking-wide cursor-pointer transition-all duration-200 active:scale-98 text-base shadow-sm",
          theme === "cyberpunk"
            ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_18px_rgba(6,182,212,0.4)] border border-cyan-400/40"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        <ArrowClockwise weight="bold" className="size-5 mr-1.5" />
        New Game <span className="text-xs opacity-70 font-mono ml-1.5">(Press &apos;R&apos;)</span>
      </Button>

      {/* Control Strip: Mode, Theme, Sound */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl border bg-card/60 backdrop-blur-xs">
        {/* Game Mode Switcher */}
        <div className="inline-flex rounded-xl bg-muted/70 p-1">
          <button
            type="button"
            onClick={() => onSelectMode("pvp")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
              gameMode === "pvp"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="2-Player Local Pass & Play"
          >
            <Users weight="bold" className="size-3.5" />
            <span>2 Players</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectMode("ai-unbeatable")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
              gameMode === "ai-unbeatable"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Play against Unbeatable AI (Minimax)"
          >
            <Robot weight="bold" className="size-3.5" />
            <span>vs AI</span>
          </button>
        </div>

        {/* Secondary Toggles: Theme, Audio, Clear */}
        <div className="flex items-center gap-1">
          {/* Theme Selector Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onSelectTheme(theme === "cyberpunk" ? "minimalist" : "cyberpunk")}
            title={`Switch to ${theme === "cyberpunk" ? "Minimalist" : "Cyberpunk"} theme`}
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          >
            {theme === "cyberpunk" ? (
              <Sparkle weight="fill" className="size-4 text-cyan-400" />
            ) : (
              <PaintBrush weight="bold" className="size-4" />
            )}
            <span className="sr-only">Toggle Theme</span>
          </Button>

          {/* Sound Mute/Unmute Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggleSound}
            title={soundEnabled ? "Mute audio effects" : "Unmute audio effects"}
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          >
            {soundEnabled ? (
              <SpeakerHigh weight="bold" className="size-4 text-emerald-500" />
            ) : (
              <SpeakerSimpleSlash weight="bold" className="size-4 text-muted-foreground" />
            )}
            <span className="sr-only">Toggle Sound</span>
          </Button>

          {/* Reset Scoreboard */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onResetScores}
            title="Reset Scoreboard to 0"
            className="cursor-pointer text-muted-foreground hover:text-destructive"
          >
            <Trash weight="bold" className="size-4" />
            <span className="sr-only">Reset Scores</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
