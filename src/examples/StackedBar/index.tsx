import { useEffect, useState } from "react";
import * as d3 from "d3";
import usPopCSV from "./us-population-state-age.csv?url";
import { AxisLine, ChartSvg, useScale, XAxis, YAxis } from "../../lib/d3";
import { FlexBox, media } from "../../styled";
import { useIsMobile } from "../../hooks/useMediaQuery";
import styled from "styled-components";

interface AgeDemographic {
  "<10": number;
  "10-19": number;
  "20-29": number;
  "30-39": number;
  "40-49": number;
  "50-59": number;
  "60-69": number;
  "70-79": number;
  ">=80": number;
}

interface PopulationData {
  state: string;
  age: keyof AgeDemographic;
  population: number;
}

const width = 928;
const height = 500;
const margin = { top: 10, right: 10, bottom: 20, left: 40 };

export const StackedBar = () => {
  const [data, setData] = useState<PopulationData[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    (async () => {
      const csvRows = await d3.csv(usPopCSV).catch(console.error);
      if (!csvRows) return;

      const parsedRows: PopulationData[] = [];

      for (const row of csvRows) {
        const { name, ...populationData } = row;
        Object.entries(populationData).forEach((pData) => {
          parsedRows.push({
            state: name,
            age: pData[0] as keyof AgeDemographic,
            population: Number(pData[1]),
          });
        });
      }
      setData(parsedRows);
    })();
  }, []);

  const populationGroups = new Set(Array.from(data).map((d) => d.age));
  const stateTotals = data.reduce(
    (acc, pData) => {
      if (acc[pData.state]) {
        acc[pData.state] += pData.population;
      } else {
        acc[pData.state] = pData.population;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
  const ageGroupTotals = data.reduce(
    (acc, pData) => {
      if (acc[pData.age]) {
        acc[pData.age] += pData.population;
      } else {
        acc[pData.age] = pData.population;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
  const maxAge = Object.keys(ageGroupTotals).length
    ? Object.entries(ageGroupTotals).sort(
        ([, aPop], [, bPop]) => bPop - aPop,
      )[0][1]
    : 0;

  const { scale: xScale, ticks: xTicks } = useScale({
    type: "band",
    domain: d3.groupSort(
      Object.entries(stateTotals),
      (D) => -d3.sum(D, (d) => d[1]),
      (d) => d[0],
    ),
    padding: 0.1,
    range: [margin.left, width - margin.right],
  });

  const {
    scale: yScale,
    size: yAxisSize,
    ticks: yTicks,
  } = useScale({
    type: "linear",
    domain: [0, maxAge],
    range: [height - margin.bottom, 0],
  });

  const { scale: colorScale } = useScale({
    type: "ordinal",
    domain: Array.from(populationGroups),
    range: (d3.schemeSpectral[populationGroups.size] ?? []) as Iterable<number>,
  });

  return (
    <FlexBox
      $flexDir={isMobile ? "column" : "row"}
      $yCenter={!isMobile}
      style={{ width: "100%", height: "100%" }}
    >
      <YAxisLabel $xCenter={isMobile}>Population (in Millions)</YAxisLabel>
      <FlexBox $flex="1">
        <ChartSvg height={height} margin={margin} width={width}>
          <BarsContainer>
            {data.map(({ state, age, population }) => {
              // console.log({
              //   color: colorScale(age),
              //   xScale: xScale(state),
              //   yScale: yScale(population),
              // });
              return (
                <Bar
                  fill={`${colorScale(age)}`}
                  key={`bar-${age}-${state}`}
                  x={xScale(state)}
                  y={yScale(population)}
                  height={yScale(population)}
                  width={xScale.bandwidth()}
                />
              );
            })}
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
            tickFormatter={(tick) => `${Number(tick) / 1e6}`}
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
