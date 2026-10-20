// Single source of copy for the "Kinetic" portfolio layout.
// Ported verbatim from the design handoff (portfolio-content.js) — edit copy here.

/** `focus` = CSS object-position, so tall phone crops of wide photos keep the right person in frame. */
export type Photo = { src: string; alt: string; focus?: string };
export type Role = { y: string; when: string; title: string; org: string; bullets: string[] };
export type Quote = { t: string; n: string; r: string; short?: boolean };
export type Item = { t: string; d: string };
export type Company = { name: string; tag: string; period: string; logo: string };
export type Cred = { k: string; t: string; s: string };
export type GalleryItem = Photo & { cap: string };
export type ChatQA = { label: string; a: string };

export const content = {
  name: "Arlind Minushi",
  first: "Arlind",
  last: "Minushi",
  role: "Senior Tech Lead – Application Development",
  company: "Genpact",
  location: "Prishtina, Kosovo",
  intro: "Engineer, lead, and the person the team keeps turning to — building enterprise platforms in Prishtina, Kosovo.",
  statement: "Six years turning gnarly enterprise requirements into software people actually use — and, lately, into teams that build it well.",
  quote: "“Simplicity is prerequisite for reliability.” — Dijkstra",
  cert: "Databricks Certified Data Engineer Associate",
  engLine: "I’m hands-on by default — Python and Django on the backend, React and React Native on the front, SQL and Databricks underneath.",
  leadLine: "Leading a 16-person team day to day — sprint delivery, performance reviews, career growth, resource planning, and holding the hiring bar.",
  stack: ["Python", "Django", "React", "TypeScript", "Databricks", "Azure AD", "AWS", "React Native", "PostgreSQL", "OAuth 2.0", "Docker", "Unity Catalog"],
  promo: {
    date: "Oct 2026",
    from: "Principal Consultant / Tech Lead",
    to: "Senior Tech Lead",
    sub: "Application Development · Genpact",
    p1: "This year taught me a lot about ownership, from keeping client delivery running through a demanding period to mentoring engineers and growing our team in Kosovo.",
    p2: "Thank you to the people who saw more in me than I sometimes saw in myself. I’m excited to pay that forward.",
  },
  hack: {
    name: "Genpact × Agilyti Hackathon",
    place: "2nd",
    line: "A full weekend of ideas, late builds, and a lot of good energy in the room.",
    proud: "Proud of my team for taking 2nd place and for how they showed up from start to finish.",
    photos: [
      { src: "/uploads/hack-group.jpg", alt: "Hackathon participants and mentors on stage" },
      { src: "/uploads/hack-award.jpg", alt: "Award moment at the Genpact × Agilyti Hackathon", focus: "44% 50%" },
      { src: "/uploads/hack-team.jpg", alt: "Arlind with the hackathon team", focus: "8% 50%" },
    ] as Photo[],
    quotes: [
      { t: "The energy was amazing and it was way harder than expected to pick the top 3 in each category, well done Arlind and great job to all the awesome mentors!", n: "Andre Chapman", r: "Founder & CEO, Agilyti" },
      { t: "Being mentored by someone with your experience was an honour. Thank you for the guidance and support throughout the weekend. Looking forward to working with you again in the future!", n: "Alban Rrahmani", r: "Software & Network Engineer · Team" },
      { t: "Really grateful to have had you guiding us through this experience. Your feedback made a real difference!!", n: "Rinesa Merovci", r: "Full stack developer · Team" },
      { t: "You did an amazing job. Your team were lucky to have you assigned as their mentor!", n: "Lorik Korca", r: "Senior Data Engineer, Genpact" },
    ] as Quote[],
  },
  words: [
    { t: "One of our XponentL Xperts.", n: "XponentL Data", r: "From the company", short: true },
    { t: "Arlind has a strong ability to quickly understand business needs, translate them into technical requirements, and deliver practical solutions. He was instrumental in building our acquisition application from the ground up, transforming a spreadsheet-based process into a self-service application that significantly improved how stakeholders request and manage data.", n: "Kevin Tsai", r: "Sr. Director Data Platform, Genmab" },
    { t: "Arlind was hands-on at every layer of the Data Onboarding and Data Marketplace applications, key components of our data strategy. He’s a strong, versatile engineer and a reliable teammate. I’d work with him again without hesitation.", n: "Peter Couture", r: "Platform Engineer, Genmab" },
    { t: "Good teams are built with people you can rely on – Arlind has definitely been one of those people. Great to work with, easy to collaborate with, and never short of a solution.", n: "Saumya Mishra", r: "Platform Engineer, Genmab" },
    { t: "A solid and thorough developer, who is a great addition to any team/project he is part of. Would work with again!", n: "Rudolfs Berzins", r: "Senior Data Platform Engineer, Genmab" },
  ] as Quote[],
  build: [
    { t: "Full-Stack Engineering", d: "Python & Django on the backend, React & React Native on the front, Node.js and REST APIs in between. I care about clean architecture, reusable components, and code the next person can actually read." },
    { t: "Cloud & Security", d: "Azure AD, OAuth 2.0, MSAL and SSO for enterprise identity; AWS S3, Secrets Manager, Elastic Beanstalk, Lambda and Cognito for the things that run in the cloud." },
    { t: "Data Platforms", d: "SQL across PostgreSQL, MySQL, SQL Server and BigQuery, plus Databricks Unity Catalog and metadata-driven workflows — the governed foundation under every data product." },
  ] as Item[],
  lead: [
    { t: "Engineering Leadership", d: "Leading a 16-person team day to day — sprint delivery, performance reviews, career growth, resource planning, and holding the hiring bar. I optimize for engineers who can own a problem end to end." },
    { t: "Delivery & Agile", d: "Agile/Scrum with Jira, requirements gathering, UI/UX documentation and stakeholder management — turning fuzzy asks into a plan a team can actually ship against." },
    { t: "Mentoring & Hiring", d: "Technical interviews and evaluation frameworks, structured onboarding, and the slower work of helping engineers grow into their next role." },
  ] as Item[],
  roles: [
    { y: "2026", when: "Oct 2026 — Now", title: "Senior Tech Lead – Application Development", org: "Genpact", bullets: ["Senior Tech Lead in the Kosovo Engineering leadership team at Genpact, leading engineering teams and delivery for enterprise clients.", "Manage a team of 16 engineers, owning resource allocation, performance reviews, career development and day-to-day operations.", "Mentored a team to 2nd place at the Genpact × Agilyti Hackathon."] },
    { y: "2025", when: "2025 — 2026", title: "Principal Consultant / Tech Lead", org: "Genpact / Xponentl Data", bullets: ["Lead and manage a 16-person engineering team — resource allocation, performance reviews, career development, and delivery.", "Part of the Kosovo Data Engineering leadership team — practice strategy, capability building, and hiring standards.", "Run technical interviews and assessments; helped define evaluation frameworks for software and data engineering hires.", "Built data-onboarding and acquisition-tracking applications that standardize how new data products enter and move through enterprise marketplace platforms.", "Integrated Azure AD SSO (OAuth 2.0 + MSAL) in Django and connected workflows to Databricks Unity Catalog for governed access."] },
    { y: "2022", when: "2022 — 2025", title: "Software Engineer / Data Engineer", org: "Kubit (I.T.E SHPK)", bullets: ["Hybrid software + data engineering role building data-driven web apps and client-facing products.", "Full-stack work with clear separation of frontend, backend, and data layers — JS/TS, React, React Native, SQL Server.", "Shipped a React Native app to both Google Play and the Apple App Store — builds, certificates, release submission.", "Modernized dashboards and redesigned interfaces for usability and presentation quality."] },
    { y: "2020", when: "2020 — 2022", title: "Data Engineer", org: "Cacttus", bullets: ["Supported data architecture, relational modelling, and pipeline development for analytics and reporting.", "Worked with Python and SQL to improve data processing, reporting accuracy, and operational availability.", "Contributed to data-lifecycle workflows and foundational data engineering practices across internal systems."] },
  ] as Role[],
  companies: [
    { name: "Genpact", tag: "Senior Tech Lead · Application Development", period: "2025 — Now", logo: "/uploads/genpactlogo.jpg" },
    { name: "Xponentl Data", tag: "Data products · platform engineering", period: "2025 — Now", logo: "/uploads/xponentl.png" },
    { name: "A global biotech", tag: "Healthcare · data platform", period: "2025", logo: "" },
    { name: "A global information & media company", tag: "Enterprise engagement", period: "—", logo: "" },
    { name: "A major energy company", tag: "Enterprise engagement", period: "—", logo: "" },
    { name: "Interex", tag: "Client engagement", period: "—", logo: "/uploads/InterEx_logo.png" },
    { name: "Origin3 Agency", tag: "Client engagement", period: "—", logo: "/uploads/origin3.webp" },
    { name: "Kubit", tag: "Software & data engineering", period: "2022 — 2025", logo: "/uploads/kubitlogo.png" },
    { name: "Cacttus", tag: "Data engineering", period: "2020 — 2022", logo: "/uploads/cacttus.png" },
  ] as Company[],
  aboutQuote: "“The best technical decision is the one the whole team understands.”",
  about: [
    "I got into leadership the way most good leads do — by being the person the team kept turning to. Today I lead a 16-person engineering team as Senior Tech Lead at Genpact in Prishtina, splitting my days between architecture, code reviews, hiring, and making sure good work actually ships.",
    "I’m hands-on by default — Python and Django on the backend, React and React Native on the front, SQL and Databricks underneath. I like clean architecture, reusable components, and authentication that doesn’t keep anyone up at night.",
  ],
  principles: ["Ship small, review everything.", "Hire for trajectory, not just résumé.", "The hard part is people, not code."],
  creds: [
    { k: "Certification", t: "Databricks Certified Data Engineer Associate", s: "Credential ID · 108344349" },
    { k: "Education", t: "B.Sc. Computer Science & Engineering", s: "University for Business and Technology · 2017–2020" },
    { k: "Languages", t: "Albanian (native) · English (C2)", s: "" },
  ] as Cred[],
  galleryIntro: "The work matters, but it’s not the whole picture. A few things from outside the editor — and when I’m not shipping products, I might just be taking your elo on FACEIT.",
  hobbies: ["Lifting heavy", "Football", "Padel", "CS2"],
  gallery: [
    { src: "/uploads/football.jpg", alt: "Arlind playing football", cap: "Before dev, there was football — where I first learned to play for the team." },
    { src: "/uploads/Un2.jpg", alt: "With mentor and friends", cap: "Mentors and friends. The people who shape how you lead." },
    { src: "/uploads/audi2.jpg", alt: "Black Audi Q8", cap: "Weekends. Matte black, a different kind of fine engineering." },
    { src: "/uploads/cat.jpg", alt: "My cat", cap: "My most senior reviewer. Approves PRs by sitting on the keyboard." },
    { src: "/uploads/amerik2.JPG", alt: "Philadelphia", cap: "Philadelphia, golden hour down the avenue." },
    { src: "/uploads/genpact2.jpg", alt: "Desk setup", cap: "Where the work happens — two screens, good headphones." },
    { src: "/uploads/unavnietnik.JPG", alt: "In New York with the crew", cap: "New York with the crew — One World Trade in the distance." },
  ] as GalleryItem[],
  contact: {
    lead: "Whether it’s about systems, scaling teams, or just the craft — I’m always happy to talk. Reach out through any of the channels below and I’ll get back to you.",
    note: "Based in Pristina (CET), usually replies within a day.",
    email: "arlind.minushi06@gmail.com",
    linkedin: "https://www.linkedin.com/in/arlind-minushi-1b61a51a4/",
    linkedinLabel: "/in/arlind-minushi",
    resume: "/Arlind-Minushi-Resume.pdf",
  },
  chat: {
    intro: "Hey — I’m Arlind’s assistant. Ask me anything about his work, stack, or experience.",
    qa: [
      { label: "How do you lead a team?", a: "Ship small, review everything. Hire for trajectory, not just résumé. And the hard part is people, not code. Day to day that means sprint delivery, performance reviews, career growth and holding the hiring bar for a 16-person team." },
      { label: "What’s new?", a: "Promoted to Senior Tech Lead – Application Development at Genpact in October 2026, and mentored a team to 2nd place at the Genpact × Agilyti Hackathon." },
      { label: "What’s your stack?", a: "Python & Django on the backend, React & React Native on the front, with SQL and Databricks Unity Catalog underneath." },
      { label: "Where are you based?", a: "Prishtina, Kosovo (CET). He usually replies within a day." },
    ] as ChatQA[],
  },
};
