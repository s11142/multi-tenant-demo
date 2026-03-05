import type { TenantConfig } from "@/config/tenants.schema";

type HeaderProps = {
  tenant: TenantConfig;
};

export function Header({ tenant }: HeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            {tenant.shortName.charAt(0)}
          </div>
          <span className="text-lg font-semibold">{tenant.name}</span>
        </div>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{tenant.contactPhone}</span>
        </nav>
      </div>
    </header>
  );
}
