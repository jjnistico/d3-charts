import { Axes } from "../components/Axes";
import { useScale } from "../hooks";
import * as d3 from "d3";

export const BarChart = () => {
  const data = [
    { label: "A", value: 0.08167 },
    { label: "B", value: 0.01492 },
    { label: "C", value: 0.02782 },
    { label: "D", value: 0.04253 },
    { label: "E", value: 0.12702 },
    { label: "F", value: 0.02288 },
    { label: "G", value: 0.02015 },
  ];

  // Declare the chart dimensions and margins.
  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;

  const {
    length: xLength,
    scale: xScale,
    scaleTicks: xTicks,
  } = useScale({
    type: "band",
    domain: d3.groupSort(
      data,
      ([d]) => -d.value,
      (d) => d.label,
    ),
    padding: 0.1,
    range: [marginLeft, width - marginRight],
  });

  const {
    length: yLength,
    scale: yScale,
    scaleTicks: yTicks,
  } = useScale({
    type: "linear",
    domain: [0, d3.max(data, (d) => d.value) ?? 0],
    range: [height - marginBottom, marginTop],
  });

  console.log({ xLength, yLength });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMax"
      style={{ maxWidth: width, width: "100%" }}
    >
      <Axes
        marginLeft={marginLeft}
        marginBottom={marginBottom}
        xScale={{
          width: xLength + marginLeft * 2,
          ticks: xTicks,
          gap: 5,
        }}
        yScale={{ height: yLength, ticks: yTicks }}
      >
        <g aria-label="bar" fill="steelblue">
          {data.map((d) => (
            <rect
              key={`${d.label}-bar`}
              x={xScale(d.label)}
              y={yScale(d.value)}
              height={yScale(0) - yScale(d.value)}
              width={xScale.bandwidth()}
            />
          ))}
        </g>
      </Axes>
    </svg>
  );
};
