import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  reverse?: boolean;
}

export function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  const { delay: omittedDelay, reverse: omittedReverse, ...divProps } = props;
  void omittedDelay;
  void omittedReverse;

  return (
    <div className={className} {...divProps}>
      {children}
    </div>
  );
}
