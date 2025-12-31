import * as d3 from "d3";
import { useMemo } from "react";
import {
  type D3Scale,
  type MethodChainable,
  type Scale,
  type ScaleI,
  type ScaleTick,
  getEntries,
} from "../types";

/**
 * Create a scale of type `type`. Accepts a map of arguments which
 * represents the setter methods for properties on the scale itself.
 *
 * @returns {D3Scale} scale The D3 instance for the scale
 * @returns {ScaleTick[]} ticks - The position data for the axis ticks
 * @returns {number} size The length of the axis
 */
export const useScale = <S extends Scale>({
  numTicks = 5,
  type,
  ...chainables
}: {
  numTicks?: number;
  type: S;
} & Partial<MethodChainable<S>>): {
  scale: ScaleI<S>;
  ticks: ScaleTick[];
  size: number;
} => {
  const scale = useMemo(() => {
    let d3Scale: D3Scale;
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
        d3Scale = d3.scaleOrdinal<string, number>();
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
      case "utc":
        d3Scale = d3.scaleUtc();
        break;
      default:
        throw new Error(`scale type ${type} not supported`);
    }

    for (const [func, val] of getEntries(chainables)) {
      if (typeof d3Scale[func] === "function") {
        d3Scale = d3Scale[func](val);
      }
    }

    return d3Scale;
  }, [type, chainables]);

  // Generate position data for the ticks for this scale.
  const ticks = useMemo(() => {
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

  // Calculate the size of the axis (width for `x` or height for `y`)
  // NOTE: The length is calculated the same for all D3 scale types, but
  // the type system complains without using a discriminator (Hence the if/else)
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

  return { size, scale: scale as ScaleI<S>, ticks };
};
