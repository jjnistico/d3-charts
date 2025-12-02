import styled from "styled-components";

import { AlphabetFrequency } from "./examples/AlphabetFrequency";
import { FlexBox, media } from "./styled";
import { AlphabetFrequencyHorizontal } from "./examples/AlphabetFrequencyHorizontal";

function App() {
  return (
    <Page $flexDir="column">
      <AlphabetFrequency />
      <AlphabetFrequencyHorizontal />
    </Page>
  );
}

export default App;

const Page = styled(FlexBox)`
  width: 100%;
  background-color: white;
  padding: 20px 40px;

  ${media.mobile`
    padding: 10px;
  `}
`;
