import { useLayoutEffect, useState } from "react";
import { DEVICE_MAX } from "../styled";

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

// from https://usehooks-ts.com/react-hook/use-media-query
export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (query: string): boolean => {
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  // Handles the change event of the media query.
  function handleChange() {
    setMatches(getMatches(query));
  }

  useLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);

  return matches;
}

export const useIsMobile = () => {
  return useMediaQuery(`(max-width: ${DEVICE_MAX.mobile}px)`);
};

export const useIsTablet = () => {
  return useMediaQuery(
    `(min-width: ${DEVICE_MAX.mobile + 1} and max-width: ${DEVICE_MAX.tablet}px)`,
  );
};

export const useIsDesktop = () => {
  return useMediaQuery(`(min-width: ${DEVICE_MAX.tablet + 1}px)`);
};
