import styled from "styled-components";

import { BarChart } from "./lib/d3/charts/BarChart";

function App() {
  // data from https://observablehq.com/@d3/bar-chart/2
  const letterFrequency = [
    { label: "A", value: 0.08167 },
    { label: "B", value: 0.01492 },
    { label: "C", value: 0.02782 },
    { label: "D", value: 0.04253 },
    { label: "E", value: 0.12 },
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
  ];

  return (
    <Page>
      <BarChart
        margin={{ top: 20, right: 60, bottom: 20, left: 40 }}
        data={letterFrequency}
        height={500}
        width={928}
      />
    </Page>
  );
}

export default App;

const Page = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  padding: 20px 40px;
`;
