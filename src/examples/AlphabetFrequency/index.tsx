import styled from "styled-components";
import { FlexBox } from "../../styled/flex";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { media } from "../../styled";
import { ChartSvg } from "../../lib/d3/components/ChartSvg";
import { useScale } from "../../lib/d3";
import * as d3 from "d3";
import { Axes } from "../../lib/d3/components";

const data = [
  { label: "A", value: 0.08167 },
  { label: "B", value: 0.01492 },
  { label: "C", value: 0.02782 },
  { label: "D", value: 0.04253 },
  { label: "E", value: 0.12702 },
  { label: "F", value: 0.02288 },
  { label: "G", value: 0.02015 },
  { label: "H", value: 0.06094 },
  { label: "I", value: 0.06966 },
  { label: "J", value: 0.00153 },
  { label: "K", value: 0.00772 },
  { label: "L", value: 0.04025 },
  { label: "M", value: 0.02406 },
  { label: "N", value: 0.06749 },
  { label: "O", value: 0.07507 },
  { label: "P", value: 0.01929 },
  { label: "Q", value: 0.00095 },
  { label: "R", value: 0.05987 },
  { label: "S", value: 0.06327 },
  { label: "T", value: 0.09056 },
  { label: "U", value: 0.02758 },
  { label: "V", value: 0.00978 },
  { label: "W", value: 0.0236 },
  { label: "X", value: 0.0015 },
  { label: "Y", value: 0.01974 },
  { label: "Z", value: 0.00074 },
];

const height = 500;
const width = 928;
const margin = { top: 20, right: 20, bottom: 20, left: 40 };

// example from https://observablehq.com/@d3/bar-chart/2
export const AlphabetFrequency = () => {
  const isMobile = useIsMobile();

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
                {...{
                  key: `bar-${d.label}-${d.value}`,
                  x: xScale(d.label) ?? 0,
                  y: yScale(d.value),
                  width: xScale.bandwidth(),
                  height: yScale(0) - yScale(d.value),
                }}
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
              tickFormatter: (tick) => `${Number(tick) * 100}%`,
              ticks: yTicks,
            }}
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

const YAxisLabel = styled(FlexBox)`
  text-align: center;

  ${media.mobile`
    font-size: 12px; 
  `}

  ${media.tablet`
    transform: rotate(-90deg);
    max-width: 60px;
  `}
`;
