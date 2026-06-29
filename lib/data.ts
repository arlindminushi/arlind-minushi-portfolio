// Centralised content for the data-driven portfolio sections.

export type Company = {
  name: string;
  tag: string;
  period: string;
  logo: string | null;
  blurb: string;
};

export const companies: Company[] = [
  {
    name: "Genpact",
    tag: "Principal Consultant · Tech Lead",
    period: "2025 — NOW",
    logo: "/uploads/genpactlogo.jpg",
    blurb:
      "Principal Consultant & Tech Lead. I lead a 16-person engineering team and help steer the Kosovo data-engineering practice — delivery, hiring, and technical direction across enterprise engagements.",
  },
  {
    name: "Xponentl Data",
    tag: "Data products · platform engineering",
    period: "2025 — NOW",
    logo: "/uploads/xponentl.png",
    blurb:
      "Data-products and platform engineering — building and modernizing enterprise data platforms and the workflows that run on top of them.",
  },
  {
    name: "A global biotech",
    tag: "Healthcare · data platform",
    period: "2025",
    logo: null,
    blurb:
      "Enterprise data-platform engineering — onboarding and lifecycle tooling for data products in a regulated healthcare setting. Client and specifics kept confidential.",
  },
  {
    name: "A global information & media company",
    tag: "Enterprise engagement",
    period: "—",
    logo: null,
    blurb:
      "Enterprise engagement — data and application work within a large-scale, highly regulated information environment.",
  },
  {
    name: "A major energy company",
    tag: "Enterprise engagement",
    period: "—",
    logo: null,
    blurb:
      "Enterprise engagement — application and data work supporting large-scale operations.",
  },
  {
    name: "Interex",
    tag: "Client engagement",
    period: "—",
    logo: "/uploads/InterEx_logo.png",
    blurb:
      "Client engagement — full-stack and data delivery for client-facing digital products.",
  },
  {
    name: "Origin3 Agency",
    tag: "Client engagement",
    period: "—",
    logo: "/uploads/origin3.webp",
    blurb:
      "Client engagement — web and product development across a range of client work.",
  },
  {
    name: "Kubit",
    tag: "Software & data engineering",
    period: "2022 — 2025",
    logo: "/uploads/kubitlogo.png",
    blurb:
      "Software & data engineering — built data-driven web and mobile apps end-to-end, including a React Native app shipped to both app stores.",
  },
  {
    name: "Cacttus",
    tag: "Data engineering",
    period: "2020 — 2022",
    logo: "/uploads/cacttus.png",
    blurb:
      "Data engineering — data modelling, pipelines, and reporting workflows for analytics and operational use cases.",
  },
];

export type Capability = {
  title: string;
  body: string;
  /** scroll-reveal stagger in ms; undefined for the first card */
  delay?: number;
};

export const capabilities: Capability[] = [
  {
    title: "Engineering Leadership",
    body: "Leading a 16-person team day to day — sprint delivery, performance reviews, career growth, resource planning, and holding the hiring bar. I optimize for engineers who can own a problem end to end.",
  },
  {
    title: "Full-Stack Engineering",
    body: "Python & Django on the backend, React & React Native on the front, Node.js and REST APIs in between. I care about clean architecture, reusable components, and code the next person can actually read.",
    delay: 80,
  },
  {
    title: "Cloud & Security",
    body: "Azure AD, OAuth 2.0, MSAL and SSO for enterprise identity; AWS S3, Secrets Manager, Elastic Beanstalk, Lambda and Cognito for the things that run in the cloud.",
    delay: 160,
  },
  {
    title: "Data Platforms",
    body: "SQL across PostgreSQL, MySQL, SQL Server and BigQuery, plus Databricks Unity Catalog and metadata-driven workflows — the governed foundation under every data product.",
    delay: 240,
  },
  {
    title: "Delivery & Agile",
    body: "Agile/Scrum with Jira, requirements gathering, UI/UX documentation and stakeholder management — turning fuzzy asks into a plan a team can actually ship against.",
    delay: 320,
  },
  {
    title: "Mentoring & Hiring",
    body: "Technical interviews and evaluation frameworks, structured onboarding, and the slower work of helping engineers grow into their next role.",
    delay: 400,
  },
];

export type WorkTag = { label: string; accent?: boolean };
export type WorkItem = {
  num: string;
  titleLines: [string, string];
  tags: WorkTag[];
  desc: string;
};

export const workItems: WorkItem[] = [
  {
    num: "01",
    titleLines: ["Data Marketplace", "Platform"],
    tags: [{ label: "Django" }, { label: "v1 + v2" }, { label: "Dashboards" }],
    desc: "Migrated the platform to a hardened SSO foundation and rebuilt the dashboards, giving the data team a single governed entry point and reducing onboarding friction.",
  },
  {
    num: "02",
    titleLines: ["Enterprise SSO", "Integration"],
    tags: [{ label: "Azure AD" }, { label: "OAuth 2.0" }, { label: "MSAL" }],
    desc: "Rolled out Azure AD SSO across the application, replacing per-app logins with centralized identity and access control.",
  },
  {
    num: "03",
    titleLines: ["Cross-Platform", "Mobile App"],
    tags: [
      { label: "React Native" },
      { label: "App Store" },
      { label: "Play Store" },
    ],
    desc: "Shipped a single React Native codebase to both the App Store and Google Play, with CI-driven releases to both platforms.",
  },
  {
    num: "04",
    titleLines: ["Data Onboarding", "Platform"],
    tags: [
      { label: "Enterprise", accent: true },
      { label: "Databricks" },
      { label: "Unity Catalog" },
    ],
    desc: "Standardized dataset onboarding into Unity Catalog, turning an ad-hoc process into a repeatable, governed workflow.",
  },
];

export type ExperienceEntry = {
  period: string;
  periodAccent: string;
  location: string;
  role: string;
  org: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    period: "2025 ",
    periodAccent: "— NOW",
    location: "KOSOVO",
    role: "Principal Consultant / Tech Lead",
    org: "Genpact / Xponentl Data",
    bullets: [
      "Lead and manage a 16-person engineering team — resource allocation, performance reviews, career development, and delivery.",
      "Part of the Kosovo Data Engineering leadership team — practice strategy, capability building, and hiring standards.",
      "Run technical interviews and assessments; helped define evaluation frameworks for software and data engineering hires.",
      "Built data-onboarding and acquisition-tracking applications that standardize how new data products enter and move through enterprise marketplace platforms.",
      "Integrated Azure AD SSO (OAuth 2.0 + MSAL) in Django and connected workflows to Databricks Unity Catalog for governed access.",
    ],
  },
  {
    period: "2022 ",
    periodAccent: "— 2025",
    location: "KOSOVO",
    role: "Software Engineer / Data Engineer",
    org: "Kubit (I.T.E SHPK)",
    bullets: [
      "Hybrid software + data engineering role building data-driven web apps and client-facing products.",
      "Full-stack work with clear separation of frontend, backend, and data layers — JS/TS, React, React Native, SQL Server.",
      "Shipped a React Native app to both Google Play and the Apple App Store — builds, certificates, release submission.",
      "Modernized dashboards and redesigned interfaces for usability and presentation quality.",
    ],
  },
  {
    period: "2020 ",
    periodAccent: "— 2022",
    location: "KOSOVO",
    role: "Data Engineer",
    org: "Cacttus",
    bullets: [
      "Supported data architecture, relational modelling, and pipeline development for analytics and reporting.",
      "Worked with Python and SQL to improve data processing, reporting accuracy, and operational availability.",
      "Contributed to data-lifecycle workflows and foundational data engineering practices across internal systems.",
    ],
  },
];

// "Ask my AI" — scripted assistant. Preset questions answer instantly with no
// backend; the free-text box keyword-matches these and otherwise says the full
// conversational AI is coming soon. Edit freely — order here = order of the chips.
export const chatIntro =
  "Hey — I'm Arlind's assistant. Tap a question below and I'll answer it. Free-text chat is coming soon.";

export const chatFallback =
  "Great question — full conversational AI is on the way. For now, tap one of the questions below and I'll answer it in detail.";

export type ChatQA = { q: string; a: string; keywords: string[] };

export const chatQA: ChatQA[] = [
  {
    q: "What's your tech stack?",
    a: "Python & Django on the backend, React & React Native on the front, with Node.js and REST APIs in between. Underneath: SQL (PostgreSQL, SQL Server, BigQuery) and Databricks Unity Catalog.",
    keywords: ["stack", "tech", "technolog", "language", "tools", "framework"],
  },
  {
    q: "How do you lead a team?",
    a: "I lead a 16-person engineering team day to day — sprint delivery, code reviews, performance reviews, career growth and hiring. Rules of thumb: ship small and review everything, hire for trajectory, and remember the hard part is people, not code.",
    keywords: ["lead", "team", "manage", "management", "people", "mentor"],
  },
  {
    q: "What have you built?",
    a: "A data marketplace platform (Django + hardened SSO), enterprise Azure AD SSO (OAuth 2.0 + MSAL), a cross-platform React Native app shipped to both app stores, and a governed data-onboarding workflow on Databricks Unity Catalog.",
    keywords: ["built", "build", "project", "work", "shipped", "made", "portfolio"],
  },
  {
    q: "How much experience do you have?",
    a: "Six years across software and data engineering. Currently Principal Consultant / Tech Lead at Genpact / Xponentl Data; previously Software/Data Engineer at Kubit and Data Engineer at Cacttus.",
    keywords: ["experience", "years", "background", "career", "history", "long"],
  },
  {
    q: "What's your cloud & security background?",
    a: "Azure AD, OAuth 2.0, MSAL and SSO for enterprise identity; on AWS I work with S3, Secrets Manager, Elastic Beanstalk, Lambda and Cognito.",
    keywords: ["cloud", "security", "aws", "azure", "auth", "oauth", "sso", "identity"],
  },
  {
    q: "Any certifications or education?",
    a: "Databricks Certified Data Engineer Associate, plus a B.Sc. in Computer Science & Engineering from the University for Business and Technology (2017–2020).",
    keywords: ["cert", "certified", "education", "degree", "study", "university", "databricks"],
  },
  {
    q: "Where are you based?",
    a: "Prishtina, Kosovo (CET). I usually reply within a day.",
    keywords: ["based", "location", "where", "live", "prishtina", "kosovo", "remote", "timezone"],
  },
  {
    q: "How can I reach you?",
    a: "Email arlind.minushi06@gmail.com, call +383 49 313 126, or connect on LinkedIn (/in/arlind-minushi). Based in Prishtina (CET).",
    keywords: ["reach", "contact", "email", "hire", "phone", "linkedin", "connect", "available"],
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** intrinsic pixel dimensions — used as width/height attrs to reserve space (no CLS) */
  width: number;
  height: number;
  /** optional accent-coloured mono tag appended after the caption, e.g. "// 02:00" */
  tag?: string;
};

export const gallery: GalleryItem[] = [
  {
    src: "/uploads/Un3.jpg",
    alt: "Arlind at the office in Prishtina",
    caption: "On the floor in Prishtina — where the team and the work come together.",
    width: 1315,
    height: 1536,
  },
  {
    src: "/uploads/Un2.jpg",
    alt: "With mentor and friends",
    caption: "Mentors and friends. The people who shape how you lead.",
    width: 1280,
    height: 858,
  },
  {
    src: "/uploads/audi2.jpg",
    alt: "Black Audi Q8",
    caption: "Weekends. Matte black, a different kind of fine engineering.",
    width: 953,
    height: 1271,
  },
  {
    src: "/uploads/cat.jpg",
    alt: "Arlind Minushi's cat resting on a desk",
    caption: "My most senior reviewer. Approves PRs by sitting on the keyboard.",
    width: 953,
    height: 1271,
  },
  {
    src: "/uploads/amerik2.JPG",
    alt: "A Philadelphia avenue at golden hour",
    caption: "Philadelphia, golden hour down the avenue.",
    width: 953,
    height: 1271,
  },
  {
    src: "/uploads/genpact2.jpg",
    alt: "Arlind Minushi's two-monitor engineering desk setup",
    caption: "Where the work happens — two screens, good headphones.",
    width: 1695,
    height: 1271,
  },
  {
    src: "/uploads/unavnietnik.JPG",
    alt: "In New York with the crew",
    caption: "New York with the crew — One World Trade in the distance.",
    width: 1695,
    height: 1271,
  },
  {
    src: "/uploads/pcatnight.jpg",
    alt: "Late night with the cat",
    caption:
      "After hours — the city dims, the cat clocks in, and the best ideas finally show up.",
    width: 2880,
    height: 2160,
    tag: "// 02:00",
  },
];
