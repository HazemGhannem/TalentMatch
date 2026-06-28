import { Check } from "lucide-react";

interface StrengthsListProps {
  items?: string[];
}

export default function StrengthsList({ items = [] }: StrengthsListProps) {
  if (items.length === 0) {
    return <p className="upload-sub">No strengths identified yet.</p>;
  }

  return (
    <ul className="result-list">
      {items.map((item, i) => (
        <li key={i} className="result-item">
          <Check className="result-dot success" size={14} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
