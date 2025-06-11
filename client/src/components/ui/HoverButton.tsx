import React, { useState } from "react";
import type { ButtonHTMLAttributes } from "react";

type ButtonSize = "sm" | "md" | "lg";

interface HoverButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  hoverLabel?: string;
  submittingLabel?: string;
  isSubmitting?: boolean;
  size?: ButtonSize;
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: "0.35rem 0.65rem",
    fontSize: "0.8rem",
    borderRadius: "0.25rem",
  },
  md: {
    padding: "0.5rem 1rem",
    fontSize: "0.9rem",
    borderRadius: "0.375rem",
  },
  lg: {
    padding: "0.75rem 1.25rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
  },
};

export const HoverButton: React.FC<HoverButtonProps> = ({
  label,
  hoverLabel,
  submittingLabel = "Submitting...",
  isSubmitting = false,
  disabled,
  size = "md",
  ...rest
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      {...rest}
      disabled={disabled || isSubmitting}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        ...sizeStyles[size],
        backgroundColor: isSubmitting
          ? "var(--color-cloud)"
          : isHover
          ? "var(--color-sun)"
          : "var(--color-peach)",
        color: "var(--color-sand)",
        transition: "background-color 0.3s ease",
        width: size === "sm" ? "fit-content" : "100%",
        fontWeight: 600,
        cursor: disabled || isSubmitting ? "not-allowed" : "pointer",
        border: "none",
        userSelect: "none",
      }}
    >
      {isSubmitting
        ? submittingLabel
        : isHover
        ? hoverLabel ?? "🌞 Hovering"
        : label}
    </button>
  );
};
