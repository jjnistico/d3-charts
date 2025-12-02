import styled from "styled-components";
import { FlexBox } from "../../styled/flex";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { media } from "../../styled";
import { AxisLine, ChartSvg, useScale, XAxis, YAxis } from "../../lib/d3";
import * as d3 from "d3";
import { alphabetFrequency } from "../data";

const height = 500;
const width = 928;
const margin = { top: 20, right: 20, bottom: 40, left: 40 };

const data = alphabetFrequency;

// example from https://observablehq.com/@d3/bar-chart/2
export const AlphabetFrequency = () => {
  const isMobile = useIsMobile();

  const { scale: xScale, ticks: xTicks } = useScale({
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
    size: yAxisSize,
    scale: yScale,
    ticks: yTicks,
  } = useScale({
    type: "linear",
    domain: [0, d3.max(data, (d) => d.value) ?? 0],
    range: [height - margin.bottom, margin.top],
  });

  return (
    <FlexBox
      $flexDir={isMobile ? "column" : "row"}
      $yCenter={!isMobile}
      style={{ width: "100%", height: "100%" }}
    >
      <YAxisLabel $xCenter={isMobile}>Frequency (descending)</YAxisLabel>
      <FlexBox $flex="1">
        <ChartSvg height={height} margin={margin} width={width}>
          <BarsContainer>
            {data.map((d) => (
              <Bar
                key={`bar-${d.label}-${d.value}`}
                x={xScale(d.label) ?? 0}
                y={yScale(d.value)}
                width={xScale.bandwidth()}
                height={yScale(0) - yScale(d.value)}
              />
            ))}
          </BarsContainer>
          <XAxis
            height={yAxisSize}
            width={width}
            margin={margin}
            ticks={xTicks}
            tickOffset={xScale.bandwidth() / 2}
          />
          <StyledYAxis
            width={width}
            height={yAxisSize}
            margin={margin}
            ticks={yTicks}
            tickFormatter={(tick) => `${Number(tick) * 100}%`}
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

const StyledYAxis = styled(YAxis)`
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
