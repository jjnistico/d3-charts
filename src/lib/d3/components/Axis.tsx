import type { ScaleTick } from "../types/scale";
import styled from "styled-components";
import { renderTickLabel } from "./util";

interface AxisScale {
  // offset axis (can be used to change sides)
  offset?: number;
  tickFormatter?: (tickVal: ScaleTick[0]) => string;
  tickOffset?: number;
  tickSize?: number;
  ticks: ScaleTick[];
  length: number;
}

export interface D3Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const Axis = <AX extends "x" | "y">({
  axis,
  className,
  margin,
  scale,
}: {
  axis: AX;
  className?: string;
  margin: D3Margin;
  scale: AxisScale;
}) => {
  const tickSize = scale.tickSize ?? 8;

  if (axis === "x") {
    return (
      <g
        transform={`translate(0,${scale.offset ?? 0})`}
        fontSize={10}
        fontFamily="sans-serif"
        textAnchor="middle"
        className={className}
      >
        {scale.ticks.map((xTick) => (
          <g
            className="tick x-tick"
            opacity={1}
            transform={`translate(${xTick[1] + Number(scale.tickOffset ?? 0)},0)`}
            key={`y-tick-${xTick[0]}-${xTick[1]}`}
          >
            <line stroke="currentColor" y1={margin.bottom - tickSize} />
            <text y={margin.bottom - tickSize} dy={"1em"}>
              {scale.tickFormatter?.(renderTickLabel(xTick[0])) ??
                renderTickLabel(xTick[0])}
            </text>
          </g>
        ))}
        <AxisLine
          className="domain x-domain"
          x1={margin.left}
          x2={scale.length - margin.right}
        />
      </g>
    );
  }

  return (
    <g
      transform={`translate(${scale.offset ?? 0},${scale.length})`}
      fontSize={10}
      fontFamily="sans-serif"
      textAnchor="middle"
      className={className}
    >
      {scale.ticks.map((yTick) => (
        <g
          className="tick y-tick"
          opacity={1}
          transform={`translate(0,${yTick[1]})`}
          key={`y-tick-${yTick[0]}-${yTick[1]}`}
        >
          <line
            stroke="currentColor"
            x1={margin.left - tickSize}
            x2={margin.left}
          />
          <text x={tickSize + 5} y="0.25em">
            {scale.tickFormatter?.(renderTickLabel(yTick[0])) ??
              renderTickLabel(yTick[0])}
          </text>
        </g>
      ))}
      <AxisLine
        className="domain y-domain"
        x1={margin.left}
        x2={margin.left}
        y1={-scale.length}
      />
    </g>
  );
};

export const AxisLine = styled.line`
  stroke: currentColor;
`;
