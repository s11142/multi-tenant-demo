import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApplyNotes } from "@/components/apply-notes";
import { getTenantByCode } from "@/config/tenants";

type Props = {
  params: Promise<{ tenant: string }>;
};

export default async function ApplyPage({ params }: Props) {
  const { tenant } = await params;
  const config = getTenantByCode(tenant);

  if (!config) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>エネルギー開栓 お申し込み</CardTitle>
          <CardDescription>
            以下の必要事項をご入力ください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          {config.applyNotes && config.applyNotes.length > 0 && (
            <div className="mb-6">
              <ApplyNotes notes={config.applyNotes} />
            </div>
          )}
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">お名前</Label>
              <Input id="name" placeholder="山田 太郎" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" placeholder="taro@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">電話番号</Label>
              <Input id="phone" type="tel" placeholder="090-1234-5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">住所</Label>
              <Input id="address" placeholder="○○県△△市□□町1-2-3" />
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link href={`/${tenant}`}>戻る</Link>
              </Button>
              <Button asChild>
                <Link href={`/${tenant}/apply/confirm`}>確認画面へ</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
