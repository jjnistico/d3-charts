import type { ScaleTick } from "../types/scale";
import styled from "styled-components";
import { renderTickLabel } from "./util";

export const Axes = ({
  margin,
  xScale,
  yScale,
}: {
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
}) => {
  const xTickSize = xScale.tickSize ?? 8;
  const yTickSize = yScale.tickSize ?? 8;

  return (
    <>
      <g
        transform={`translate(0,${yScale.height})`}
        fontSize={10}
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        {xScale.ticks.map((xTick) => (
          <g
            className="tick x-tick"
            opacity={1}
            transform={`translate(${xTick[1] + Number(xScale.tickOffset ?? 0)},0)`}
            key={`y-tick-${xTick[0]}-${xTick[1]}`}
          >
            <line stroke="currentColor" y1={margin.bottom - xTickSize} />
            <text y={margin.bottom - xTickSize} dy={"1em"}>
              {xScale.tickFormatter?.(renderTickLabel(xTick[0])) ??
                renderTickLabel(xTick[0])}
            </text>
          </g>
        ))}
        <XAxis
          className="domain x-domain"
          x1={margin.left}
          x2={xScale.width - margin.right}
        />
        {yScale.ticks.map((yTick) => (
          <g
            className="tick y-tick"
            opacity={1}
            transform={`translate(0,${yTick[1]})`}
            key={`y-tick-${yTick[0]}-${yTick[1]}`}
          >
            <line
              stroke="currentColor"
              x1={margin.left - yTickSize}
              x2={margin.left}
            />
            <text x={yTickSize + 5} y="0.25em">
              {yScale.tickFormatter?.(renderTickLabel(yTick[0])) ??
                renderTickLabel(yTick[0])}
            </text>
          </g>
        ))}
        <YAxis
          className="domain y-domain"
          x1={margin.left}
          x2={margin.left}
          y1={-yScale.height}
        />
      </g>
    </>
  );
};

const Axis = styled.line`
  stroke: currentColor;
`;

const XAxis = styled(Axis)``;

const YAxis = styled(Axis)``;

export type D3Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};
