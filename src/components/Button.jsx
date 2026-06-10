function Button({ children, className = "", onClick, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm",
        "transition-all duration-200",
        "hover:bg-accent-hover hover:shadow-md",
        "active:scale-[0.98]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ].join(" ")}
      {...props}
    >
      {children ?? "Reset"}
    </button>
  );
}

export default Button;
