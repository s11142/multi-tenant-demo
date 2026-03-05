export type ApplyNoteSection = {
  heading: string;
  body: string;
};

export type TenantConfig = {
  code: string;
  name: string;
  shortName: string;
  primaryColor: string;
  secondaryColor?: string;
  ctaColor?: string;
  logoPath: string;
  contactPhone: string;
  contactEmail: string;
  isActive: boolean;
  applyNotes?: ApplyNoteSection[];
};
