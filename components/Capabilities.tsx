import { content as C } from "@/lib/content";
import type { Item } from "@/lib/content";

function Column({ title, items, outline }: { title: string; items: Item[]; outline?: boolean }) {
  return (
    <div className="cap-col">
      <h2 data-rv className={`cap-h${outline ? " is-outline" : ""}`}>{title}</h2>
      {items.map((b) => (
        <div data-rv key={b.t} className="cap-item">
          <span className="cap-t">{b.t}</span>
          <span className="cap-d">{b.d}</span>
        </div>
      ))}
    </div>
  );
}

export default function Capabilities() {
  return (
    <section className="sec cap-sec">
      <Column title="ENGINEER" items={C.build} />
      <Column title="LEAD" items={C.lead} outline />
    </section>
  );
}
