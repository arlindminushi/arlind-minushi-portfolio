// Single source of truth for site-wide SEO data.
//
// The production origin used for canonical URLs, Open Graph tags, the sitemap and
// robots. Defaults to the real domain, with an optional env override:
//   1. NEXT_PUBLIC_SITE_URL — overrides the default (e.g. http://localhost:3000 for local)
//   2. https://arlindminushi.com — production default (no config needed)

const PRODUCTION_URL = "https://arlindminushi.com";

function resolveBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  return PRODUCTION_URL;
}

export const siteConfig = {
  url: resolveBaseUrl(),
  name: "Arlind Minushi",
  firstName: "Arlind",
  lastName: "Minushi",
  title: "Arlind Minushi — Senior Software Engineer",
  jobTitle: "Senior Software Engineer · Tech Lead · Engineering Manager",
  // Kept within ~155 chars so Google shows it without truncation.
  description:
    "Senior Software Engineer, Tech Lead & Engineering Manager in Prishtina, Kosovo, building enterprise data platforms with Python, Django, React and Databricks.",
  // Bump when the site's content meaningfully changes (used for sitemap lastmod).
  lastUpdated: "2026-06-29",
  locale: "en_US",
  email: "arlind.minushi06@gmail.com",
  phone: "+383 49 313 126",
  portrait: "/uploads/Un-6f052e6c.jpg",
  location: {
    city: "Prishtina",
    region: "District of Pristina",
    country: "Kosovo",
    countryCode: "XK",
  },
  // sameAs reconciles the Person entity in Google's Knowledge Graph.
  // Add more authoritative profiles (GitHub, X, Stack Overflow) to strengthen it.
  sameAs: ["https://www.linkedin.com/in/arlind-minushi-1b61a51a4/"],
  keywords: [
    "Arlind Minushi",
    "Senior Software Engineer",
    "Tech Lead",
    "Engineering Manager",
    "Software Engineer Kosovo",
    "Data Engineer",
    "Full-Stack Engineer",
    "Python",
    "Django",
    "React",
    "React Native",
    "TypeScript",
    "Databricks",
    "Unity Catalog",
    "Azure AD",
    "OAuth 2.0",
    "AWS",
    "PostgreSQL",
    "Prishtina",
    "Kosovo",
    "Portfolio",
  ],
  knowsAbout: [
    "Software Engineering",
    "Engineering Leadership",
    "Python",
    "Django",
    "React",
    "React Native",
    "TypeScript",
    "Node.js",
    "SQL",
    "PostgreSQL",
    "Databricks",
    "Unity Catalog",
    "Azure Active Directory",
    "OAuth 2.0",
    "AWS",
    "Data Engineering",
    "Cloud Security",
    "Agile",
  ],
  ogAlt: "Arlind Minushi — Senior Software Engineer, Tech Lead & Engineering Manager",
} as const;

export type SiteConfig = typeof siteConfig;
