import Portfolio from "@/components/Portfolio";
import { getStructuredData } from "@/lib/structured-data";

export default function Page() {
  const jsonLd = getStructuredData();
  return (
    <>
      <script
        type="application/ld+json"
        // Schema.org JSON-LD for rich results. Safe: server-generated, no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Portfolio />
    </>
  );
}
