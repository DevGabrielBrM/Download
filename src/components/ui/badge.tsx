import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "positive"
  | "negative"
  | "warning"
  | "info"
  | "brand";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  className?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  children,
  dot = false,
}: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default:
      "bg-secondary text-secondary-foreground border-border",
    positive:
      "bg-positive-light text-positive-dark dark:bg-positive-dark/20 dark:text-positive border-positive/20",
    negative:
      "bg-negative-light text-negative-dark dark:bg-negative-dark/20 dark:text-negative border-negative/20",
    warning:
      "bg-warning-light text-warning-dark dark:bg-warning-dark/20 dark:text-warning border-warning/20",
    info:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/30",
    brand:
      "bg-brand-100 text-brand-800 dark:bg-brand-900/20 dark:text-brand-400 border-brand-200/50 dark:border-brand-800/30",
  };

  const sizes: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-2xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            variant === "positive" && "bg-positive",
            variant === "negative" && "bg-negative",
            variant === "warning" && "bg-warning",
            variant === "info" && "bg-blue-500",
            variant === "brand" && "bg-brand-500",
            variant === "default" && "bg-muted-foreground"
          )}
        />
      )}
      {children}
    </span>
  );
}