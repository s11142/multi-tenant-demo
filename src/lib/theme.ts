import { hexToOklch, formatOklch } from "./color";

type ThemeOptions = {
  primaryHex: string;
  secondaryHex?: string;
  ctaHex?: string;
};

/**
 * テナントのベースカラー(HEX)から、shadcn/ui用CSS変数を生成する。
 * テナントカラーに依存する変数のみ上書きし、
 * 固定値（background, foreground, muted, border等）はglobals.cssのデフォルトを使う。
 */
export function generateThemeVariables(
  options: ThemeOptions
): Record<string, string> {
  const { primaryHex, secondaryHex, ctaHex } = options;
  const base = hexToOklch(primaryHex);

  const primary = { ...base };
  const primaryForeground =
    base.l > 0.6
      ? { l: 0.145, c: 0, h: 0 }
      : { l: 0.985, c: 0, h: 0 };

  const secondary = secondaryHex
    ? hexToOklch(secondaryHex)
    : {
        l: Math.min(base.l * 1.7, 0.97),
        c: base.c * 0.15,
        h: base.h,
      };
  const secondaryForeground = secondaryHex
    ? (hexToOklch(secondaryHex).l > 0.6
        ? { l: 0.145, c: 0, h: 0 }
        : { l: 0.985, c: 0, h: 0 })
    : { l: 0.205, c: 0, h: 0 };

  const accent = {
    l: Math.min(base.l * 1.6, 0.97),
    c: base.c * 0.2,
    h: base.h,
  };
  const accentForeground = { l: 0.205, c: 0, h: 0 };

  const ring = {
    l: Math.min(base.l * 1.2, 1.0),
    c: base.c * 0.8,
    h: base.h,
  };

  const vars: Record<string, string> = {
    "--primary": formatOklch(primary),
    "--primary-foreground": formatOklch(primaryForeground),
    "--secondary": formatOklch(secondary),
    "--secondary-foreground": formatOklch(secondaryForeground),
    "--accent": formatOklch(accent),
    "--accent-foreground": formatOklch(accentForeground),
    "--ring": formatOklch(ring),
  };

  const ctaBase = ctaHex ? hexToOklch(ctaHex) : primary;
  const ctaForeground =
    ctaBase.l > 0.6
      ? { l: 0.145, c: 0, h: 0 }
      : { l: 0.985, c: 0, h: 0 };
  vars["--cta"] = formatOklch(ctaBase);
  vars["--cta-foreground"] = formatOklch(ctaForeground);

  return vars;
}
