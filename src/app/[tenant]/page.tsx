import Link from "next/link";
import { getTenantByCode } from "@/config/tenants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  params: Promise<{ tenant: string }>;
};

export default async function TenantTopPage({ params }: Props) {
  const { tenant } = await params;
  const config = getTenantByCode(tenant)!;
  const hasCtaColor = !!config.ctaColor;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-3xl font-bold">
          {config.name}へようこそ
        </h1>
        <p className="mt-4 text-muted-foreground">
          エネルギーの申し込み手続きをオンラインで簡単に行えます。
        </p>
        <div className="mt-8">
          <Button variant="cta" asChild size="lg">
            <Link href={`/${tenant}/apply`}>お申し込みはこちら</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card variant={hasCtaColor ? "cta" : "default"}>
          <CardHeader>
            <CardTitle>簡単お申し込み</CardTitle>
            <CardDescription className={hasCtaColor ? "text-cta-foreground/80" : ""}>
              オンラインで24時間いつでも申し込み可能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className={hasCtaColor ? "text-sm text-cta-foreground/70" : "text-sm text-muted-foreground"}>
              必要事項を入力するだけで、簡単にエネルギーの開栓・閉栓の手続きができます。
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>安心サポート</CardTitle>
            <CardDescription>
              お困りの際はお電話でもサポート
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {config.contactPhone} までお気軽にお問い合わせください。
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>スピード対応</CardTitle>
            <CardDescription>最短翌営業日に対応</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              お申し込み後、担当者より迅速にご連絡いたします。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* テーマカラー確認用 */}
      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">テーマカラー確認</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="cta">CTA</Button>
        </div>
        <div className="mt-4">
          <Card variant={hasCtaColor ? "cta" : "default"} className="max-w-xs">
            <CardHeader>
              <CardTitle>CTA Card</CardTitle>
              <CardDescription className={hasCtaColor ? "text-cta-foreground/80" : ""}>
                ctaColor が反映されたカード
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}
