import { test, expect } from "@playwright/test";

test.describe("申し込みフロー", () => {
  test("aozora-energy: トップ→申し込み→確認→完了の遷移", async ({ page }) => {
    await page.goto("/aozora-energy");
    await expect(page).toHaveTitle(/青空エナジー/);

    // 申し込みページへ遷移
    await page.getByRole("link", { name: /申し込み/ }).click();
    await expect(page).toHaveURL(/\/aozora-energy\/apply$/);

    // フォーム入力
    await page.getByLabel(/氏名/).fill("テスト太郎");
    await page.getByLabel(/メールアドレス/).fill("test@example.com");
    await page.getByLabel(/電話番号/).fill("09012345678");

    // 確認画面へ
    await page.getByRole("button", { name: /確認/ }).click();
    await expect(page).toHaveURL(/\/aozora-energy\/apply\/confirm/);

    // 申し込み完了
    await page.getByRole("button", { name: /申し込む|送信/ }).click();
    await expect(page).toHaveURL(/\/aozora-energy\/apply\/complete/);
  });
});
