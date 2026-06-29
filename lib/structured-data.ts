import { siteConfig } from "./site";

/**
 * Schema.org JSON-LD for the portfolio: a ProfilePage about a Person, tied to
 * the WebSite. Emitted as a single @graph so the entities cross-reference by @id.
 * Helps Google build a rich/knowledge result for "Arlind Minushi".
 */
export function getStructuredData() {
  const { url } = siteConfig;

  const person = {
    "@type": "Person",
    "@id": `${url}/#person`,
    name: siteConfig.name,
    givenName: siteConfig.firstName,
    familyName: siteConfig.lastName,
    jobTitle: "Senior Software Engineer, Tech Lead & Engineering Manager",
    description: siteConfig.description,
    url,
    image: `${url}${siteConfig.portrait}`,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.countryCode,
    },
    sameAs: siteConfig.sameAs,
    worksFor: {
      "@type": "Organization",
      name: "Genpact / Xponentl Data",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University for Business and Technology",
    },
    knowsAbout: siteConfig.knowsAbout,
    hasOccupation: {
      "@type": "Occupation",
      name: "Senior Software Engineer",
      occupationLocation: {
        "@type": "City",
        name: siteConfig.location.city,
      },
      skills: siteConfig.knowsAbout.join(", "),
    },
    knowsLanguage: [
      { "@type": "Language", name: "Albanian" },
      { "@type": "Language", name: "English" },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Databricks Certified Data Engineer Associate",
      recognizedBy: { "@type": "Organization", name: "Databricks" },
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": `${url}/#person` },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${url}/#profilepage`,
    url,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: "en",
    isPartOf: { "@id": `${url}/#website` },
    about: { "@id": `${url}/#person` },
    mainEntity: { "@id": `${url}/#person` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage],
  };
}
