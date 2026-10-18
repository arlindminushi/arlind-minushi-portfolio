import fs from "node:fs";
import path from "node:path";
import Portfolio from "@/components/Portfolio";
import { content } from "@/lib/content";
import { getStructuredData } from "@/lib/structured-data";

// The résumé button only renders once the PDF has actually been added to /public.
const hasResume = fs.existsSync(path.join(process.cwd(), "public", content.contact.resume));

export default function Page() {
  const jsonLd = getStructuredData();
  return (
    <>
      <script
        type="application/ld+json"
        // Schema.org JSON-LD for rich results. Safe: server-generated, no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Portfolio hasResume={hasResume} />
    </>
  );
}
