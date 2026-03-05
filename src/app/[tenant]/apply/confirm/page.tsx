import Link from "next/link";
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

export default async function ConfirmPage({ params }: Props) {
  const { tenant } = await params;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>お申し込み内容確認</CardTitle>
          <CardDescription>
            以下の内容でよろしければ「送信する」を押してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">
              （確認画面のスケルトンです。実際のフォームデータは後続タスクで実装します。）
            </p>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href={`/${tenant}/apply`}>修正する</Link>
            </Button>
            <Button asChild>
              <Link href={`/${tenant}/apply/complete`}>送信する</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
