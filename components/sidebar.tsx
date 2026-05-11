import Link from "next/link";
import type { Sub } from "@/types";

export default function Sidebar({ subs }: { subs: Sub[] }) {
  return (
    <aside>
      <section>
        <h2>Popular Communities</h2>
        <ul>
          {subs.map((sub) => (
            <li key={sub.name}>
              <Link href={`/sub/${sub.name}`}>
                s/{sub.name} - {sub.memberCount} members
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Rules</h2>
        <ol>
          <li>Remember the human</li>
          <li>Behave like you would in real life</li>
          <li>Look for the original source of content</li>
          <li>Search for duplicates before posting</li>
          <li>Read the community rules</li>
        </ol>
      </section>
    </aside>
  );
}
