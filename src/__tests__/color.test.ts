import { describe, it, expect } from "vitest";
import { hexToOklch, formatOklch } from "@/lib/color";

describe("hexToOklch", () => {
  it("白(#ffffff)を変換できる", () => {
    const result = hexToOklch("#ffffff");
    expect(result.l).toBeCloseTo(1, 2);
    expect(result.c).toBeCloseTo(0, 2);
  });

  it("黒(#000000)を変換できる", () => {
    const result = hexToOklch("#000000");
    expect(result.l).toBeCloseTo(0, 2);
    expect(result.c).toBeCloseTo(0, 2);
  });

  it("赤(#ff0000)を変換できる", () => {
    const result = hexToOklch("#ff0000");
    expect(result.l).toBeCloseTo(0.6279, 2);
    expect(result.c).toBeGreaterThan(0.2);
    expect(result.h).toBeCloseTo(29.23, 0);
  });

  it("テナントカラー(#0066CC)を変換できる", () => {
    const result = hexToOklch("#0066CC");
    expect(result.l).toBeGreaterThan(0);
    expect(result.c).toBeGreaterThan(0);
    expect(result.h).toBeGreaterThan(0);
  });

  it("不正な値でエラーを投げる", () => {
    expect(() => hexToOklch("invalid")).toThrow("Invalid color");
  });
});

describe("formatOklch", () => {
  it("CSS形式の文字列を返す", () => {
    const result = formatOklch({ l: 0.5, c: 0.1, h: 200 });
    expect(result).toMatch(/^oklch\(/);
    expect(result).toContain("0.5");
  });
});
