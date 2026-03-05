import { oklch, parse, formatCss } from "culori";

type OKLCH = { l: number; c: number; h: number };

export function hexToOklch(hex: string): OKLCH {
  const result = oklch(parse(hex));
  if (!result) throw new Error(`Invalid color: ${hex}`);
  return {
    l: result.l,
    c: result.c,
    h: result.h ?? 0,
  };
}

export function formatOklch(oklch: OKLCH): string {
  return formatCss({ mode: "oklch", l: oklch.l, c: oklch.c, h: oklch.h });
}
