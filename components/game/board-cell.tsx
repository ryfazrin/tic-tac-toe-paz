"use client";

import { PlayerMark, ThemeMode } from "@/lib/game-engine";
import { Lightning, Target, X, Circle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface BoardCellProps {
  index: number;
  value: PlayerMark | null;
  isWinning: boolean;
  disabled: boolean;
  theme: ThemeMode;
  onSelect: () => void;
}

export function BoardCell({
  index,
  value,
  isWinning,
  disabled,
  theme,
  onSelect,
}: BoardCellProps) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;

  // Icon rendering depending on theme and mark
  const renderIcon = () => {
    if (!value) return null;

    if (theme === "cyberpunk") {
      if (value === "X") {
        return (
          <Lightning
            weight="fill"
            className="size-10 sm:size-12 text-cyan-400 drop-shadow-[0_0_14px_rgba(6,182,212,0.85)] animate-in zoom-in-50 duration-200"
          />
        );
      }
      return (
        <Target
          weight="bold"
          className="size-10 sm:size-12 text-pink-500 drop-shadow-[0_0_14px_rgba(236,72,153,0.85)] animate-in zoom-in-50 duration-200"
        />
      );
    }

    // Minimalist theme
    if (value === "X") {
      return (
        <X
          weight="bold"
          className="size-9 sm:size-11 text-slate-800 dark:text-slate-100 animate-in zoom-in-50 duration-150"
        />
      );
    }
    return (
      <Circle
        weight="bold"
        className="size-9 sm:size-11 text-indigo-600 dark:text-indigo-400 animate-in zoom-in-50 duration-150"
      />
    );
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled || value !== null}
      aria-label={`Row ${row}, Column ${col}${value ? `, marked ${value}` : ", empty"}`}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-2xl border transition-all duration-200 outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        // Theme specific backgrounds
        theme === "cyberpunk"
          ? "border-cyan-500/20 bg-slate-950/60 shadow-[inset_0_0_12px_rgba(6,182,212,0.05)] hover:border-cyan-400/50 hover:bg-slate-900/80 active:scale-95"
          : "border-border/70 bg-card hover:bg-muted/60 active:scale-95 shadow-sm",
        // Winning cell highlight
        isWinning &&
          (theme === "cyberpunk"
            ? "border-emerald-400 bg-emerald-950/40 shadow-[0_0_24px_rgba(52,211,153,0.6)] animate-pulse"
            : "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 shadow-md ring-2 ring-emerald-500/40"),
        // Disabled without value
        disabled && !value && "opacity-60 cursor-not-allowed hover:bg-transparent"
      )}
    >
      {renderIcon()}
    </button>
  );
}
