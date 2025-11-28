import styled from "styled-components";

import { BarChart } from "./lib/d3/charts/BarChart";

function App() {
  return (
    <Page>
      <BarChart />
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
