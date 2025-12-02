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

/**
 * Create a map from methods of T where T is returned by the method
 * i.e. Suitable for method chaining
 */
type ChainableMethods<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => infer Ret
    ? Ret extends T
      ? Args[number]
      : never
    : never;
};

type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };

/**
 * Create a map of chainable methods from a D3 Scale interface
 */
export type ScaleChainable<T extends Scale> = OmitNever<
  ChainableMethods<ScaleI<T>>
>;

export type ScaleTick = [number | Date | string, number];
