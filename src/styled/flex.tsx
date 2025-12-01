import styled from "styled-components";

interface BaseFlex {
  // main axis
  $xStart?: boolean;
  $xEnd?: boolean;
  $xCenter?: boolean;
  $xSpaceAround?: boolean;
  $xSpaceBetween?: boolean;
  $xSpaceEvenly?: boolean;

  // cross axis
  $yStart?: boolean;
  $yEnd?: boolean;
  $yCenter?: boolean;
  $ySpaceAround?: boolean;
  $ySpaceBetween?: boolean;
  $ySpaceEvenly?: boolean;

  $flex?: string;

  $wrap?: boolean;

  $gap?: string;
  $rowGap?: string;
  $columnGap?: string;
}
export const FlexBox = styled.div<
  BaseFlex & { $flexDir?: "row" | "row-reverse" | "column" | "column-reverse" }
>`
  display: flex;
  ${(props) => props.$flexDir && `flex-direction: ${props.$flexDir};`};

  ${(props) => props.$xStart && `${getXAxis(props.$flexDir)}: flex-start;`};
  ${(props) => props.$xEnd && `${getXAxis(props.$flexDir)}: flex-end;`};
  ${(props) => props.$xCenter && `${getXAxis(props.$flexDir)}: center;`};
  ${(props) =>
    props.$xSpaceAround && `${getXAxis(props.$flexDir)}: space-around;`};
  ${(props) =>
    props.$xSpaceBetween && `${getXAxis(props.$flexDir)}: space-between;`};

  ${(props) => props.$yStart && `${getYAxis(props.$flexDir)}: flex-start;`};
  ${(props) => props.$yEnd && `${getYAxis(props.$flexDir)}: flex-end;`};
  ${(props) => props.$yCenter && `${getYAxis(props.$flexDir)}: center;`};
  ${(props) =>
    props.$ySpaceAround && `${getYAxis(props.$flexDir)}: space-around;`};
  ${(props) =>
    props.$ySpaceBetween && `${getYAxis(props.$flexDir)}: space-between;`};

  ${(props) => props.$flex && `flex: ${props.$flex};`};

  ${(props) => props.$wrap && "flex-wrap: wrap;"};

  ${(props) => props.$gap && `gap: ${props.$gap};`};
  ${(props) => props.$rowGap && `row-gap: ${props.$rowGap};`};
  ${(props) => props.$columnGap && `column-gap: gap: ${props.$columnGap};`};
`;

const getXAxis = (
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse",
) =>
  !flexDirection || flexDirection === "row" || flexDirection === "row-reverse"
    ? "justify-content"
    : "align-items";

const getYAxis = (
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse",
) =>
  !flexDirection || flexDirection === "row" || flexDirection === "row-reverse"
    ? "align-items"
    : "justify-content";
