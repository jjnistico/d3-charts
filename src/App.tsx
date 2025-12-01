import styled from "styled-components";

import { AlphabetFrequency } from "./examples/AlphabetFrequency";
import { media } from "./styled";

function App() {
  return (
    <Page>
      <AlphabetFrequency />
    </Page>
  );
}

export default App;

const Page = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  padding: 20px 40px;

  ${media.mobile`
    padding: 10px;
  `}
`;
