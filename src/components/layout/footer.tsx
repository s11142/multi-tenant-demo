import type { TenantConfig } from "@/config/tenants.schema";

type FooterProps = {
  tenant: TenantConfig;
};

export function Footer({ tenant }: FooterProps) {
  return (
    <footer className="border-t bg-card py-8">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
        <p>{tenant.name}</p>
        <p className="mt-1">
          TEL: {tenant.contactPhone} / Email: {tenant.contactEmail}
        </p>
      </div>
    </footer>
  );
}
