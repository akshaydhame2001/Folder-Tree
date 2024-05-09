"use client";
import { useState } from "react";

const files = {
  children: [
    {
      name: "node_modules",
      children: [
        {
          name: "env",
          children: [
            {
              name: "package.json",
            },
          ],
        },
      ],
    },
    {
      name: "app",
      children: [
        {
          name: "layout.tsx",
        },
        {
          name: "page.tsx",
        },
      ],
    },
    {
      name: "package.json",
    },
  ],
};

type TEntry = {
  name: string;
  children?: TEntry[];
};

const Entry = ({ entry, depth }: { entry: TEntry; depth: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {entry.children ? (
        <button className="" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "-" : "+"} {entry.name}
        </button>
      ) : (
        entry.name
      )}
      {isExpanded && (
        <div className="pl-3">
          {entry.children?.map((entry, index) => (
            <Entry
              key={`${entry.name}-${index}`}
              entry={entry}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      {files.children.map((entry, index) => (
        <Entry key={`${entry.name}-${index}`} entry={entry} depth={1} />
      ))}
    </main>
  );
}
