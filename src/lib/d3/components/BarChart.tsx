import styled from "styled-components";
import { Axes, type D3Margin } from "./Axes";
import { useScale } from "../hooks";
import * as d3 from "d3";

export const BarChart = ({
  className,
  data,
  height,
  width,
  // see https://observablehq.com/@d3/margin-convention
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}: {
  className?: string;
  data: { label: string; value: number }[];
  height: number;
  width: number;
  margin: D3Margin;
}) => {
  const { scale: xScale, scaleTicks: xTicks } = useScale({
    type: "band",
    domain: d3.groupSort(
      data,
      ([d]) => -d.value,
      (d) => d.label,
    ),
    padding: 0.1,
    range: [margin.left, width - margin.right],
  });

  const {
    size: yLength,
    scale: yScale,
    scaleTicks: yTicks,
  } = useScale({
    type: "linear",
    domain: [0, d3.max(data, (d) => d.value) ?? 0],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <svg
      viewBox={`0 0 ${width + margin.left + margin.right} ${height + margin.bottom + margin.top}`}
      //   preserveAspectRatio="xMidYMax"
      className={className}
    >
      <BarsContainer aria-label="bar">
        {data.map((d) => (
          <rect
            key={`${d.label}-bar`}
            x={Number(xScale(d.label))}
            y={yScale(d.value)}
            height={yScale(0) - yScale(d.value)}
            width={xScale.bandwidth()}
          />
        ))}
      </BarsContainer>
      <Axes
        margin={margin}
        xScale={{
          width: width,
          ticks: xTicks,
          tickOffset: xScale.bandwidth() / 2,
        }}
        yScale={{
          height: yLength + margin.bottom,
          tickFormatter: (tickVal) => `${Number(tickVal) * 100}%`,
          ticks: yTicks,
        }}
      />
    </svg>
  );
};

export const BarsContainer = styled.g`
  fill: currentColor;
`;
