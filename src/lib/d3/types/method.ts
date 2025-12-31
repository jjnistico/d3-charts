import type { Scale, ScaleI } from "./scale";
import type { Shape } from "./shape";

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
 * Create a map of chainable methods from a D3 interface
 */
export type MethodChainable<T extends Scale | Shape> = OmitNever<
  ChainableMethods<ScaleI<T>>
>;
