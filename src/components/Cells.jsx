function Cell({ onClick, value, disabled = false, isWinning = false }) {
  const isEmpty = value == null;

  return (
    <button
      type="button"
      className={[
        "relative flex h-20 w-20 items-center justify-center rounded-xl sm:h-24 sm:w-24",
        "border border-border bg-surface text-4xl font-semibold",
        "transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        isEmpty && !disabled
          ? "cursor-pointer hover:border-border-strong hover:bg-surface-muted hover:shadow-sm active:scale-[0.97]"
          : "cursor-default",
        disabled && isEmpty ? "opacity-40" : "",
        isWinning ? "animate-win-pulse border-accent bg-indigo-50" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={disabled || !isEmpty}
      aria-label={isEmpty ? "Empty cell" : `Cell marked with ${value}`}
    >
      {value && (
        <span
          key={value}
          className={[
            "animate-mark-pop leading-none",
            value === "X" ? "player-x" : "player-o",
          ].join(" ")}
        >
          {value}
        </span>
      )}
    </button>
  );
}

export default Cell;
