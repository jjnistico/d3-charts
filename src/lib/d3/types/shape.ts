const Shapes = [
  "arc",
  "area",
  "curve",
  "line",
  "link",
  "pie",
  "stack",
  "symbol",
  "areaRadial",
  "lineRadial",
  "linkRadial",
] as const;

export type Shape = (typeof Shapes)[number];

export type D3Shape =
  | d3.Arc<unknown, unknown>
  | d3.Area<unknown>
  | d3.Line<unknown>
  | d3.Link<unknown, unknown, unknown>
  | d3.Pie<unknown, unknown>
  | d3.Stack<unknown, unknown, unknown>
  | d3.Symbol<unknown, unknown>
  | d3.AreaRadial<unknown>
  | d3.LineRadial<unknown>
  | d3.LinkRadial<unknown, unknown, unknown>;

export type ShapeI<T> = T extends "arc"
  ? d3.Arc<any, d3.NumberValue>
  : T extends "area"
    ? d3.Area<d3.NumberValue>
    : T extends "line"
      ? d3.Line<d3.NumberValue>
      : T extends "link"
        ? d3.Link<any, d3.NumberValue, d3.NumberValue>
        : T extends "pie"
          ? d3.Pie<any, d3.NumberValue>
          : never;
