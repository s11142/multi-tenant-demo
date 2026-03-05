import type { TenantConfig } from "./tenants.schema";

const tenants: TenantConfig[] = [
  {
    code: "aozora-energy",
    name: "青空エナジーサービス",
    shortName: "青空エナジー",
    primaryColor: "#0066CC",
    logoPath: "/tenants/aozora-energy/logo.svg",
    contactPhone: "0120-XXX-001",
    contactEmail: "info@aozora-energy-example.jp",
    isActive: true,
  },
  {
    code: "hinata-energy",
    name: "ひなたエナジーサービス",
    shortName: "ひなたエナジー",
    primaryColor: "#E85D1A",
    logoPath: "/tenants/hinata-energy/logo.svg",
    contactPhone: "0120-XXX-002",
    contactEmail: "info@hinata-energy-example.jp",
    isActive: true,
  },
  {
    code: "sakura-energy",
    name: "さくらエナジーサービス",
    shortName: "さくらエナジー",
    primaryColor: "#D4A800",
    ctaColor: "#1B813E",
    logoPath: "/tenants/sakura-energy/logo.svg",
    contactPhone: "0120-XXX-003",
    contactEmail: "info@sakura-energy-example.jp",
    isActive: true,
  },
];

const tenantMap: Record<string, TenantConfig> = Object.fromEntries(
  tenants.map((t) => [t.code, t])
);

export function getTenantByCode(code: string): TenantConfig | undefined {
  return tenantMap[code];
}

export const activeTenantCodes: string[] = tenants
  .filter((t) => t.isActive)
  .map((t) => t.code);

export const allTenants = tenants;
