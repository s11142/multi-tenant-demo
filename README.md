# マルチテナント エネルギー申し込みサイト

Next.js 16 + React 19 ベースのマルチテナント対応エネルギー申し込み Web アプリケーションです。
URL パスでテナントを識別し、テナントごとにブランドカラー・ロゴ・連絡先を動的に切り替えます。

## 主な技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) / React 19 |
| 言語 | TypeScript (strict) |
| スタイリング | Tailwind CSS v4 / CSS 変数 (OKLCH 色空間) / culori |
| UI コンポーネント | shadcn/ui (New York スタイル) / Radix UI |
| フォーム | react-hook-form + zod |
| テスト | Vitest / Playwright |
| アイコン | Lucide React |

## プロジェクト構成

```
src/
├── app/
│   ├── layout.tsx                  # ルートレイアウト
│   ├── page.tsx                    # トップページ（テナント選択）
│   ├── not-found.tsx               # 404 ページ
│   ├── globals.css                 # グローバルスタイル / CSS 変数定義
│   └── [tenant]/                   # テナント別 動的ルート
│       ├── layout.tsx              # テナントレイアウト（テーマ適用）
│       ├── page.tsx                # テナントトップ
│       └── apply/                  # 申し込みフロー
│           ├── page.tsx            #   入力画面
│           ├── confirm/page.tsx    #   確認画面
│           └── complete/page.tsx   #   完了画面
├── components/
│   ├── layout/
│   │   ├── header.tsx              # ヘッダー（ロゴ・テナント名・連絡先）
│   │   └── footer.tsx              # フッター
│   └── ui/                         # shadcn/ui コンポーネント
├── config/
│   ├── tenants.ts                  # テナント設定データ
│   └── tenants.schema.ts           # テナント設定の型定義
├── lib/
│   ├── theme.ts                    # テナントカラー → CSS 変数生成
│   ├── color.ts                    # HEX → OKLCH 色変換ユーティリティ
│   └── utils.ts                    # clsx + tailwind-merge
├── __tests__/
│   ├── color.test.ts              # color.ts のユニットテスト
│   └── theme.test.ts              # theme.ts のユニットテスト
└── middleware.ts                   # テナント検証ミドルウェア
e2e/
└── apply-flow.test.ts             # 申し込みフローの E2E テスト
```

## マルチテナントの仕組み

### テナント判別

URL パスの第 1 セグメントでテナントを識別します。

```
/{tenant_code}/...
例: /aozora-energy/apply → 青空エナジーの申し込み画面
```

- `middleware.ts` が全リクエストを検査し、無効なテナントコードは 404 へリライト
- `[tenant]/layout.tsx` の `generateStaticParams()` で有効テナントを静的生成

### テーマ切り替え

各テナントの `primaryColor`（HEX）から OKLCH 色空間で自動的にテーマカラーを生成します。

```
primaryColor (#0066CC)
  → culori で HEX → OKLCH 変換
  → CSS 変数 (--primary, --secondary, --accent 等) を生成
  → [tenant]/layout.tsx でインラインスタイルとして適用
```

### テナント個別カラーカスタマイズ

`primaryColor` に加え、以下のオプショナルプロパティでテナント単位の色カスタマイズが可能です。

| プロパティ | 用途 | 未指定時の動作 |
|---|---|---|
| `secondaryColor` | セカンダリ色（バッジ・サブボタン等） | primaryColor から自動生成 |
| `ctaColor` | CTA 色（お申し込みボタン・CTA カード背景等） | primaryColor と同じ色を使用 |

```
テナント設定 (tenants.ts)
  primaryColor: "#D4A800"   → 黄色テーマ（ヘッダー等）
  ctaColor:     "#1B813E"   → 緑の CTA ボタン・カード
```

**CTA カラーが影響する UI 要素：**
- `<Button variant="cta">` — CTA ボタン（お申し込みボタン等）
- `<Card variant="cta">` — CTA カード（「簡単お申し込み」等のハイライトカード）

**未指定テナントへの影響はゼロです。** `ctaColor` を設定しないテナントでは：
- CTA ボタンは primary カラーで表示（従来通り）
- CTA カードは通常の白背景カードとして表示

#### 仕組み

```
ctaColor 指定あり:
  ctaColor (#1B813E) → OKLCH変換 → --cta, --cta-foreground を生成
  → bg-cta / text-cta-foreground で緑の CTA 要素

ctaColor 未指定:
  primaryColor → --cta, --cta-foreground にも同じ値をセット
  → CTA ボタンは primary と同色
  → CTA カードは variant="default" が選択され白背景のまま
```

CSS 変数 `--cta` / `--cta-foreground` は `theme.ts` の `generateThemeVariables()` が**常に** inline style としてセットします。`globals.css` の `:root` フォールバックには依存しません（`:root` のデフォルト値は inline style が未適用のスコープ外ページ用の安全策です）。

### 登録済みテナント

| テナントコード | テナント名 | ブランドカラー | CTA カラー |
|---|---|---|---|
| `aozora-energy` | 青空エナジーサービス | `#0066CC`（青） | — (primary と同色) |
| `hinata-energy` | ひなたエナジーサービス | `#E85D1A`（オレンジ） | — (primary と同色) |
| `sakura-energy` | さくらエナジーサービス | `#D4A800`（黄） | `#1B813E`（緑） |

## セットアップ

### 前提条件

- Node.js 18 以上
- npm（または yarn / pnpm / bun）

### インストール

```bash
git clone <repository-url>
cd multi-tenant
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開くとテナント選択画面が表示されます。

### その他のコマンド

```bash
npm run build      # プロダクションビルド
npm run start      # プロダクションサーバー起動
npm run lint       # ESLint 実行
npm test           # ユニットテスト (Vitest)
npm run test:watch # ユニットテスト (ウォッチモード)
npm run test:e2e   # E2E テスト (Playwright)
```

---

# オンボーディングガイド（初心者向け）

このガイドでは、プロジェクトに初めて触れる方がコードを理解し、開発を始められるようになることを目指します。

## Step 1: プロジェクトの目的を理解する

このアプリは**エネルギー事業者向けの申し込みサイト**です。1 つのコードベースで複数のエネルギー事業者（テナント）に対応しています。

テナントごとに異なるのは以下の点です：
- ブランドカラー（サイト全体の配色）
- ロゴ画像
- 会社名・連絡先

逆に、**画面の構造やフォームのロジックは全テナント共通**です。

## Step 2: 画面遷移を把握する

```
/ (テナント選択)
  → /{tenant}/           (テナントトップ：サービス概要)
    → /{tenant}/apply          (申し込み入力フォーム)
      → /{tenant}/apply/confirm  (入力内容の確認)
        → /{tenant}/apply/complete (申し込み完了)
```

まず `npm run dev` で開発サーバーを起動し、実際にブラウザで画面遷移を確認してみてください。

## Step 3: コードの読み方

以下の順番で読むと理解しやすいです。

### 3-1. テナント設定を見る

**`src/config/tenants.ts`** — テナントの一覧と設定データです。新しいテナントを追加するときはここにエントリを追加します。

**`src/config/tenants.schema.ts`** — テナント設定の TypeScript 型定義です。どんなプロパティが必要かはここで確認できます。

### 3-2. ミドルウェアを見る

**`src/middleware.ts`** — URL の第 1 セグメントが有効なテナントコードかチェックしています。無効なら 404 ページへリライトします。

### 3-3. テナントレイアウトを見る

**`src/app/[tenant]/layout.tsx`** — テナントごとのレイアウトです。ここで以下を行っています：
1. URL パラメータからテナント設定を取得
2. `primaryColor` から CSS 変数（テーマ）を生成
3. Header / Footer にテナント情報を渡す

### 3-4. テーマ生成の仕組みを見る

**`src/lib/theme.ts`** — `generateThemeVariables()` が `primaryHex` / `secondaryHex` / `ctaHex` から CSS 変数を生成します。`secondaryHex` や `ctaHex` が省略された場合は `primaryHex` ベースで自動生成されます。

**`src/lib/color.ts`** — HEX カラーを OKLCH 色空間に変換するユーティリティです。変換処理には culori ライブラリを使用しています。

### 3-5. 申し込みフォームを見る

**`src/app/[tenant]/apply/page.tsx`** — react-hook-form + zod で入力バリデーションを行うフォーム画面です。

## Step 4: 新しいテナントを追加する

最もよくある開発タスクの例として、新しいテナントの追加手順を示します。

### 1. テナント設定を追加

`src/config/tenants.ts` に新しいエントリを追加します：

```typescript
{
  code: "midori-energy",
  name: "みどりエナジーサービス",
  shortName: "みどりエナジー",
  primaryColor: "#00A550",
  // secondaryColor: "#...",  // 任意: セカンダリ色をカスタマイズ
  // ctaColor: "#...",        // 任意: CTA ボタン・カードの色をカスタマイズ
  logoPath: "/tenants/midori-energy/logo.svg",
  contactPhone: "0120-XXX-004",
  contactEmail: "info@midori-energy-example.jp",
  isActive: true,
}
```

> **Tip:** `secondaryColor` / `ctaColor` はオプショナルです。指定しなければ `primaryColor` から自動で生成・フォールバックされるので、特別な要望がない限り省略してOKです。

### 2. ロゴ画像を配置

```
public/tenants/midori-energy/logo.svg
```

### 3. 動作確認

開発サーバーを起動して http://localhost:3000/midori-energy にアクセスすると、緑色のテーマでサイトが表示されます。

**それだけです。** URL ルーティング・テーマ生成・ミドルウェアはすべて自動で対応します。

## Step 5: 開発で知っておくべきこと

### パスエイリアス

`@/` は `src/` を指します。インポートは以下のように書けます：

```typescript
import { getTenantByCode } from "@/config/tenants";
```

### shadcn/ui コンポーネント

UI コンポーネントは shadcn/ui を使用しています。新しいコンポーネントの追加：

```bash
npx shadcn@latest add <component-name>
```

### CSS 変数とテーマ

Tailwind のクラス（`bg-primary`, `text-primary-foreground` 等）はテナントごとの CSS 変数を参照するため、テナントが変わると自動的に配色が変わります。

## よくある質問

**Q: テナントごとに異なるページレイアウトにできる？**
A: 現在は全テナント共通レイアウトです。テナント固有のレイアウトが必要な場合は、`[tenant]/layout.tsx` で条件分岐するか、テナント固有のコンポーネントを作成してください。

**Q: API 連携はどうなっている？**
A: 現時点では未実装です。申し込みフォームの送信先 API は今後の実装タスクです。

**Q: テナントごとに CTA ボタンやカードの色を変えたい**
A: `tenants.ts` で `ctaColor` を設定するだけです。`<Button variant="cta">` や `<Card variant="cta">` が自動的にその色を使います。設定しなければ primary カラーにフォールバックします。詳しくは上の「テナント個別カラーカスタマイズ」セクションを参照してください。

**Q: 今後さらに別の色（例: フッター背景色）をカスタマイズしたくなったら？**
A: 同じパターンで拡張できます。手順は以下の通りです：
1. `tenants.schema.ts` にオプショナルプロパティを追加
2. `theme.ts` で対応する CSS 変数を生成（未指定時のフォールバックも定義）
3. `globals.css` の `@theme` ブロックに Tailwind 用の `--color-*` マッピングを追加
4. コンポーネントにバリアントを追加して CSS 変数を参照

**Q: ダークモードは対応している？**
A: `globals.css` に `.dark` クラスの CSS 変数が定義されており、基盤は整っています。切り替え UI は未実装です。
