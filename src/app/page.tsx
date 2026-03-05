import Link from "next/link";
import { allTenants } from "@/config/tenants";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const active = allTenants.filter((t) => t.isActive);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <h1 className="mb-2 text-2xl font-bold">エネルギー申し込みサービス</h1>
      <p className="mb-8 text-muted-foreground">
        ご利用のエネルギー事業者を選択してください
      </p>
      <div className="grid w-full max-w-md gap-4">
        {active.map((t) => (
          <Link key={t.code} href={`/${t.code}`}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle>{t.name}</CardTitle>
                <CardDescription>{t.contactPhone}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
