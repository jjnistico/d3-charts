import type { PropsWithChildren } from "react";
import type { ScaleTick } from "../types/scale";
import styled from "styled-components";

export const Axes = ({
  children,
  marginLeft,
  marginBottom,
  marginTop,
  xScale,
  yScale,
}: PropsWithChildren<{
  marginLeft?: number;
  marginBottom?: number;
  marginTop?: number;
  xScale: { ticks: ScaleTick[]; width: number; gap?: number };
  yScale: { ticks: ScaleTick[]; height: number; gap?: number };
}>) => {
  return (
    <>
      <g
        transform="translate(0,470)"
        fontSize={10}
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        <Axis
          className="domain"
          x1={marginLeft ?? 0}
          x2={xScale.width}
          y1={0}
          y2={0}
        />
        <Axis
          className="domain"
          x1={marginLeft}
          x2={marginLeft}
          y1={marginTop ?? 0}
          y2={-yScale.height}
        />
      </g>
      {children}
    </>
  );
};

const Axis = styled.line`
  stroke: currentColor;
`;
