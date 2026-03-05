import { describe, it, expect } from "vitest";
import { generateThemeVariables } from "@/lib/theme";

describe("generateThemeVariables", () => {
  it("必要なCSS変数をすべて生成する", () => {
    const vars = generateThemeVariables({ primaryHex: "#0066CC" });
    expect(vars).toHaveProperty("--primary");
    expect(vars).toHaveProperty("--primary-foreground");
    expect(vars).toHaveProperty("--secondary");
    expect(vars).toHaveProperty("--secondary-foreground");
    expect(vars).toHaveProperty("--accent");
    expect(vars).toHaveProperty("--accent-foreground");
    expect(vars).toHaveProperty("--ring");
  });

  it("値がoklch形式である", () => {
    const vars = generateThemeVariables({ primaryHex: "#E85D1A" });
    for (const value of Object.values(vars)) {
      expect(value).toMatch(/^oklch\(/);
    }
  });

  it("暗いカラーの場合、primary-foregroundが明るくなる", () => {
    const vars = generateThemeVariables({ primaryHex: "#003366" });
    // 暗い色 → foreground は l: 0.985
    expect(vars["--primary-foreground"]).toContain("0.985");
  });

  it("明るいカラーの場合、primary-foregroundが暗くなる", () => {
    const vars = generateThemeVariables({ primaryHex: "#FFD700" });
    // 明るい色 → foreground は l: 0.145
    expect(vars["--primary-foreground"]).toContain("0.145");
  });
});
