import { css } from "styled-components";

export const DEVICE_MAX = {
  mobile: 600,
  tablet: 1200,
};

type CSSStyledParams = Parameters<typeof css>;

export const media = {
  mobile: (...args: CSSStyledParams) => css`
    @media (max-width: ${DEVICE_MAX.mobile}px) {
      ${css(...args)};
    }
  `,
  tablet: (...args: CSSStyledParams) => css`
    @media (${DEVICE_MAX.mobile}px < width <= ${DEVICE_MAX.tablet}px) {
      ${css(...args)};
    }
  `,
  desktop: (...args: CSSStyledParams) => css`
    @media (min-width: ${DEVICE_MAX.tablet + 1}px) {
      ${css(...args)};
    }
  `,
};
