import styled from "styled-components";
import { FlexBox } from "../../styled/flex";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { media } from "../../styled";
import * as d3 from "d3";
import { XAxis, YAxis, AxisLine, ChartSvg, useScale } from "../../lib/d3";
import { alphabetFrequency } from "../data";

const data = alphabetFrequency;

const width = 928;
const barHeight = 25;
const margin = { top: 40, right: 20, bottom: 40, left: 40 };
const height =
  Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;

// example from https://observablehq.com/@d3/zoomable-area-chart
export const AlphabetFrequencyHorizontal = () => {
  const isMobile = useIsMobile();

  const {
    scale: xScale,
    ticks: xTicks,
    size: xAxisSize,
  } = useScale({
    type: "linear",
    domain: [0, d3.max(data, (d) => d.value) ?? 0],
    range: [margin.left, width - margin.right],
  });

  const tickFormatter = xScale.tickFormat(1, "%");

  const {
    scale: yScale,
    ticks: yTicks,
    size: yAxisSize,
  } = useScale({
    type: "band",
    domain: d3.sort(data, (d) => -d.value).map((d) => d.label),
    rangeRound: [margin.top, height - margin.bottom],
    padding: 0.1,
  });

  return (
    <FlexBox $flexDir={isMobile ? "column" : "row"} $yCenter={!isMobile}>
      <YAxisLabel $xCenter={isMobile}>Frequency (ascending)</YAxisLabel>
      <FlexBox $flex="1">
        <ChartSvg height={yAxisSize} margin={margin} width={width}>
          <BarsContainer>
            {data.map((d) => (
              <Bar
                key={`bar-${d.label}-${d.value}`}
                x={xScale(0)}
                y={yScale(d.label)}
                width={xScale(d.value) - xScale(0)}
                height={yScale.bandwidth()}
              />
            ))}
          </BarsContainer>
          <StyledXAxis
            width={width}
            height={yAxisSize}
            margin={margin}
            position="top"
            tickFormatter={tickFormatter as any}
            tickOffset={margin.left}
            ticks={xTicks}
          />
          <YAxis
            crossAxisPosition="top"
            width={xAxisSize}
            height={height}
            margin={margin}
            tickOffset={barHeight / 2}
            ticks={yTicks}
          />
        </ChartSvg>
      </FlexBox>
    </FlexBox>
  );
};

const Bar = styled.rect``;

const BarsContainer = styled.g`
  fill: steelblue;
`;

const StyledXAxis = styled(XAxis)`
  ${AxisLine} {
    display: none;
  }
`;

const YAxisLabel = styled(FlexBox)`
  text-align: center;

  ${media.mobile`
    font-size: 12px; 
  `}

  ${media.tablet`
    font-size: 14px;
    transform: rotate(-90deg);
    max-width: 60px;
  `}
`;
