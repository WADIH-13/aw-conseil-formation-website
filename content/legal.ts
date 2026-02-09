export type LegalConfig = {
  companyName: string;
  legalForm: string;
  address: string;
  siret: string;
  nda: string;
  publicationDirector: string;
  email: string;
  phone?: string;
  hostName: string;
  hostAddress: string;
  hostPhone?: string;
  hostWebsite?: string;
  contactDataRetentionMonths: number;
};

const PLACEHOLDER = "[À renseigner]";

export const LEGAL: LegalConfig = {
  companyName: "AW Conseil et Formation (Monsieur Ahmed Wadih)",
  legalForm: "Auto-entrepreneur",
  address: "131 rue des Lantanas, Les Eucalyptus B1, 83600 Fréjus",
  siret: "42411834700030",
  nda: "93830819383",
  publicationDirector: "Ahmed Wadih",
  email: "ahmed.wadih@gmail.com",
  phone: "06 51 45 50 83",
  hostName: PLACEHOLDER,
  hostAddress: PLACEHOLDER,
  hostPhone: undefined,
  hostWebsite: undefined,
  contactDataRetentionMonths: 12,
};

function asNonEmpty(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

function asNonEmptyNumber(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export function getLegalConfig(): {
  legal: LegalConfig;
  missingKeys: Array<keyof LegalConfig>;
} {
  const env: Partial<LegalConfig> = {
    companyName: asNonEmpty(process.env.LEGAL_COMPANY_NAME),
    legalForm: asNonEmpty(process.env.LEGAL_LEGAL_FORM),
    address: asNonEmpty(process.env.LEGAL_ADDRESS),
    siret: asNonEmpty(process.env.LEGAL_SIRET),
    nda: asNonEmpty(process.env.LEGAL_NDA),
    publicationDirector: asNonEmpty(process.env.LEGAL_PUBLICATION_DIRECTOR),
    email: asNonEmpty(process.env.LEGAL_EMAIL),
    phone: asNonEmpty(process.env.LEGAL_PHONE),
    hostName: asNonEmpty(process.env.LEGAL_HOST_NAME),
    hostAddress: asNonEmpty(process.env.LEGAL_HOST_ADDRESS),
    hostPhone: asNonEmpty(process.env.LEGAL_HOST_PHONE),
    hostWebsite: asNonEmpty(process.env.LEGAL_HOST_WEBSITE),
    contactDataRetentionMonths: asNonEmptyNumber(process.env.LEGAL_CONTACT_RETENTION_MONTHS),
  };

  const legal: LegalConfig = {
    ...LEGAL,
    ...Object.fromEntries(
      Object.entries(env).filter(([, v]) => v !== undefined)
    ),
  } as LegalConfig;

  const missingKeys = (Object.keys(legal) as Array<keyof LegalConfig>).filter(
    (key) => {
      const value = legal[key];
      if (typeof value === "number") return false;
      if (typeof value === "string") return value.trim() === PLACEHOLDER;
      return value === undefined;
    }
  );

  return { legal, missingKeys };
}

export function isPlaceholder(value: string | undefined): boolean {
  return !value || value.trim() === PLACEHOLDER;
}

export { PLACEHOLDER };
