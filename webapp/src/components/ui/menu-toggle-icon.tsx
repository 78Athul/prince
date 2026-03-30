import React from "react";
import { cn } from "@/lib/utils";

interface MenuToggleIconProps extends React.ComponentProps<"svg"> {
  open: boolean;
  duration?: number;
}

export function MenuToggleIcon({ open, className, duration, ...props }: MenuToggleIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-transform", className)}
      style={{ transitionDuration: `${duration}ms` }}
      {...props}
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}
