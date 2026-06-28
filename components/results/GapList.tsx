import { CircleAlert } from "lucide-react";

interface GapsListProps {
  items?: string[];
}

export default function GapsList({ items = [] }: GapsListProps) {
  if (items.length === 0) {
    return <p className="upload-sub">No gaps identified — nice work.</p>;
  }

  return (
    <ul className="result-list">
      {items.map((item, i) => (
        <li key={i} className="result-item">
          <CircleAlert className="result-dot danger" size={14} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
