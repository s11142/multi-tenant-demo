import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  params: Promise<{ tenant: string }>;
};

export default async function CompletePage({ params }: Props) {
  const { tenant } = await params;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            お申し込みが完了しました
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            ご登録いただいたメールアドレスに確認メールをお送りしました。
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link href={`/${tenant}`}>トップページへ戻る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
