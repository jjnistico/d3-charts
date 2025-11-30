import type { PropsWithChildren } from "react";
import type { ScaleTick } from "../types/scale";
import styled from "styled-components";

export const Axes = ({
  children,
  margin,
  xScale,
  yScale,
}: PropsWithChildren<{
  margin: D3Margin;
  xScale: {
    tickFormatter?: (tickVal: ScaleTick[0]) => string;
    ticks: ScaleTick[];
    tickOffset?: number;
    tickSize?: number;
    width: number;
  };
  yScale: {
    tickFormatter?: (tickVal: ScaleTick[0]) => string;
    ticks: ScaleTick[];
    tickSize?: number;
    height: number;
  };
}>) => {
  const xTickSize = xScale.tickSize ?? 8;
  const yTickSize = yScale.tickSize ?? -8;

  return (
    <>
      {children}
      <g
        transform={`translate(0,${yScale.height})`}
        fontSize={10}
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        <Axis
          className="domain x-domain"
          x1={margin.left}
          x2={xScale.width + margin.left}
          y1={0}
          y2={0}
        />
        {xScale.ticks.map((xTick) => (
          <g
            className="tick x-tick"
            opacity={1}
            transform={`translate(${xTick[1] + Number(xScale.tickOffset ?? 0)},0)`}
          >
            <line stroke="currentColor" y2={xScale.tickSize ?? 8} />
            <text y={-yTickSize} dy={"1em"}>
              {xScale.tickFormatter?.(renderTickLabel(xTick[0])) ??
                renderTickLabel(xTick[0])}
            </text>
          </g>
        ))}
        <Axis
          className="domain y-domain"
          x1={margin.left}
          x2={margin.left}
          y1={-yScale.height}
          y2={0}
        />
        {yScale.ticks.map((yTick) => (
          <g
            className="tick y-tick"
            opacity={1}
            transform={`translate(0,${yTick[1]})`}
          >
            <line
              stroke="currentColor"
              x1={margin.left}
              x2={margin.left - xTickSize}
            />
            <text x={xTickSize + 5} y="0.25em">
              {yScale.tickFormatter?.(renderTickLabel(yTick[0])) ??
                renderTickLabel(yTick[0])}
            </text>
          </g>
        ))}
      </g>
    </>
  );
};

const Axis = styled.line`
  stroke: currentColor;
`;

const renderTickLabel = (tick: ScaleTick[0]): string => {
  if (typeof tick === "string") return tick;
  if (typeof tick === "number") return tick.toString();
  if (tick instanceof Date) return tick.toDateString();

  console.warn(`unsupported tick type: ${tick}`);
  return "";
};

export type D3Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};
