import type { ScaleTick } from "../types/scale";

export const renderTickLabel = (tick: ScaleTick[0]): string => {
  if (typeof tick === "string") return tick;
  if (typeof tick === "number") return tick.toString();
  if (tick instanceof Date) return tick.toDateString();

  console.warn(`unsupported tick type: ${tick}`);
  return "";
};
