import type d3 from "d3";

const Scales = [
  "band",
  "linear",
  "log",
  "ordinal",
  "point",
  "pow",
  "symlog",
  "time",
  "utc",
] as const;

export type Scale = (typeof Scales)[number];

export type D3Scale =
  | d3.ScaleBand<string>
  | d3.ScaleLinear<number, number>
  | d3.ScaleLogarithmic<number, number>
  | d3.ScaleOrdinal<string, number>
  | d3.ScalePoint<string>
  | d3.ScalePower<number, number>
  | d3.ScaleSymLog<number, number>
  | d3.ScaleTime<number, number>;

export type ScaleI<T> = T extends "band"
  ? d3.ScaleBand<string>
  : T extends "linear"
    ? d3.ScaleLinear<number, number>
    : T extends "log"
      ? d3.ScaleLogarithmic<number, number>
      : T extends "ordinal"
        ? d3.ScaleOrdinal<string, number>
        : T extends "point"
          ? d3.ScalePoint<string>
          : T extends "pow"
            ? d3.ScalePower<number, number>
            : T extends "symlog"
              ? d3.ScaleSymLog<number, number>
              : T extends "time"
                ? d3.ScaleTime<number, number>
                : T extends "utc"
                  ? d3.ScaleTime<number, number>
                  : never;

export type ScaleTick = [number | Date | string, number];
