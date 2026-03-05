import { notFound } from "next/navigation";
import { getTenantByCode, activeTenantCodes } from "@/config/tenants";
import { generateThemeVariables } from "@/lib/theme";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ tenant: string }>;
};

export default async function TenantLayout({ children, params }: Props) {
  const { tenant } = await params;
  const config = getTenantByCode(tenant);
  if (!config || !config.isActive) notFound();

  const themeVars = generateThemeVariables({
    primaryHex: config.primaryColor,
    secondaryHex: config.secondaryColor,
    ctaHex: config.ctaColor,
  });

  return (
    <div style={themeVars as React.CSSProperties}>
      <Header tenant={config} />
      <main className="min-h-[calc(100vh-8rem)]">{children}</main>
      <Footer tenant={config} />
    </div>
  );
}

export async function generateStaticParams() {
  return activeTenantCodes.map((code) => ({ tenant: code }));
}

export const dynamicParams = false;
