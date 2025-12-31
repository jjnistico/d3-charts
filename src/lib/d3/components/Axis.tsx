import type { ScaleTick } from "../types/scale";
import styled from "styled-components";
import { renderTickLabel } from "./util";

type AxisOrientation = "x" | "y";

type AxisPosition<AX extends AxisOrientation> = AX extends "x"
  ? "top" | "bottom"
  : "left" | "right";

type CrossAxisPosition<AX extends AxisOrientation> = AX extends "x"
  ? "left" | "right"
  : "top" | "bottom";

export interface D3Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface AxisProps<AX extends AxisOrientation> {
  className?: string;
  crossAxisPosition?: CrossAxisPosition<AX>;
  height: number;
  margin: D3Margin;
  position?: AxisPosition<AX>;
  ticks: ScaleTick[];
  tickFormatter?: (tickVal: ScaleTick[0]) => string;
  tickOffset?: number;
  tickSize?: number;
  width: number;
}

export const XAxis = ({
  className,
  crossAxisPosition = "left",
  height,
  margin,
  position = "bottom",
  ticks,
  tickFormatter = (tickVal) => tickVal.toString(),
  tickOffset = 0,
  tickSize = 8,
  width,
}: AxisProps<"x">) => {
  return (
    <g
      transform={`
        translate(${crossAxisPosition === "left" ? 0 : width + margin.left},
        ${position === "top" ? margin.top : height + margin.top})`}
      fontSize={10}
      fontFamily="sans-serif"
      textAnchor="middle"
      className={className}
    >
      {ticks.map((xTick) => (
        <g
          className="tick x-tick"
          opacity={1}
          transform={`translate(${xTick[1] + tickOffset},${position === "top" ? -tickSize : 0})`}
          key={`y-tick-${xTick[0]}-${xTick[1]}`}
        >
          <line stroke="currentColor" y1={tickSize} />
          <text y={position === "top" ? -tickSize - 5 : tickSize} dy={"1em"}>
            {tickFormatter?.(renderTickLabel(xTick[0])) ??
              renderTickLabel(xTick[0])}
          </text>
        </g>
      ))}
      <AxisLine
        className="domain x-domain"
        x1={margin.left}
        x2={width - margin.right}
      />
    </g>
  );
};

export const YAxis = ({
  className,
  crossAxisPosition = "bottom",
  height,
  margin,
  position = "left",
  ticks,
  tickFormatter = (tickVal) => tickVal.toString(),
  tickOffset = 0,
  tickSize = 8,
  width,
}: AxisProps<"y">) => {
  return (
    <g
      transform={`
        translate(${position === "left" ? margin.left : width + margin.left},
        ${crossAxisPosition === "bottom" ? height + margin.top : 0})`}
      fontSize={10}
      fontFamily="sans-serif"
      textAnchor="middle"
      className={className}
    >
      {ticks.map((yTick) => (
        <g
          className="tick y-tick"
          opacity={1}
          transform={`translate(0,${yTick[1] + tickOffset})`}
          key={`y-tick-${yTick[0]}-${yTick[1]}`}
        >
          <line stroke="currentColor" x1={0} x2={-tickSize} />
          <text x={-tickSize - 15} y="0.25em">
            {tickFormatter?.(renderTickLabel(yTick[0])) ??
              renderTickLabel(yTick[0])}
          </text>
        </g>
      ))}
      <AxisLine
        className="domain y-domain"
        y1={crossAxisPosition === "top" ? margin.top : 0}
        y2={
          crossAxisPosition === "top"
            ? height + margin.top
            : -height - margin.top
        }
      />
    </g>
  );
};

export const AxisLine = styled.line`
  stroke: currentColor;
`;
