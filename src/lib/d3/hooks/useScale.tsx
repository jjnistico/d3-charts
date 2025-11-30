import * as d3 from "d3";
import { useMemo } from "react";
import {
  type D3Scale,
  type Scale,
  type ScaleChainable,
  type ScaleI,
  type ScaleTick,
} from "../types/scale";
import { getEntries } from "../util";

export const useScale = <S extends Scale>({
  numTicks = 5,
  type,
  ...chainables
}: {
  numTicks?: number;
  type: S;
} & Partial<ScaleChainable<S>>): {
  scale: ScaleI<S>;
  scaleTicks: ScaleTick[];
  size: number;
} => {
  const scale = useMemo(() => {
    let d3Scale;
    switch (type) {
      case "band":
        d3Scale = d3.scaleBand();
        break;
      case "linear":
        d3Scale = d3.scaleLinear();
        break;
      case "log":
        d3Scale = d3.scaleLog();
        break;
      case "ordinal":
        d3Scale = d3.scaleOrdinal<number>();
        break;
      case "point":
        d3Scale = d3.scalePoint();
        break;
      case "pow":
        d3Scale = d3.scalePow();
        break;
      case "symlog":
        d3Scale = d3.scaleSymlog();
        break;
      case "time":
        d3Scale = d3.scaleTime();
        break;
    }

    for (const [func, val] of getEntries(
      // meh
      chainables as Required<ScaleChainable<S>>,
    )) {
      if (typeof d3Scale[func] === "function") {
        d3Scale = d3Scale[func](val);
      }
    }

    return d3Scale as D3Scale;
  }, [type, chainables]);

  // Generate position data for the ticks for this scale.
  const scaleTicks = useMemo(() => {
    if ("ticks" in scale) {
      const tickVals = scale.ticks(numTicks);
      return tickVals.reduce((ticks, curr) => {
        const tickPos = scale(curr) - scale(0);
        ticks.push([curr, tickPos]);
        return ticks;
      }, [] as ScaleTick[]);
    } else {
      const tickVals = scale.domain().reduce((ticks, curr) => {
        const tickPos = scale(curr);
        if (tickPos === undefined) {
          console.error(`could not calculate tick position for band ${curr}`);
        } else {
          ticks.push([curr, tickPos]);
        }
        return ticks;
      }, [] as ScaleTick[]);
      return tickVals;
    }
  }, [scale]);

  const size = useMemo(() => {
    let startBand: number | undefined;
    let endBand: number | undefined;
    if ("ticks" in scale) {
      startBand = scale(scale.domain()[0]);
      endBand = scale(scale.domain()[scale.domain().length - 1]);
    } else {
      startBand = scale(scale.domain()[0]);
      endBand = scale(scale.domain()[scale.domain().length - 1]);
    }

    if (typeof startBand !== "number" || typeof endBand !== "number") return 0;
    return Math.abs(endBand - startBand);
  }, [scale]);

  return { size, scale: scale as ScaleI<S>, scaleTicks };
};
