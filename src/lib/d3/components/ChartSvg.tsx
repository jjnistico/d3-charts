import type { PropsWithChildren } from "react";
import type { D3Margin } from "./Axis";

/**
 * svg which acts as the chart's container.
 *
 */
export const ChartSvg = ({
  children,
  className,
  height,
  margin,
  width,
}: PropsWithChildren<{
  className?: string;
  height: number;
  margin: D3Margin;
  width: number;
}>) => {
  const vbWidth = width + margin.left + margin.right;
  const vbHeight = height + margin.bottom + margin.top;

  return (
    <svg viewBox={`0 0 ${vbWidth} ${vbHeight}`} className={className}>
      {children}
    </svg>
  );
};
