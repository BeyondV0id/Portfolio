import React from "react";

import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  reverse?: boolean;
}

export function Container({
  children,
  className,
  delay = 0,
  reverse = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("animate-fade-in-blur", className)}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: "both",
        ...(reverse ? { animationDirection: "reverse" } : {}),
      }}
      {...props}
    >
      {children}
    </div>
  );
}
