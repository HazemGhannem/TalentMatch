import { FileText, Target } from 'lucide-react';
import type { ReactNode } from 'react';

interface NavbarProps {
  title?: string;
  href?: string;
}

export default function Navbar({ title = 'TalentMatch', href = '/' }: NavbarProps) {
  return (
    <nav className="navbar">
      <a href={href} className="navbar-logo">
        <span className="navbar-logo-icon">
          <FileText size={24} />
        </span>
        {title}
      </a>
    </nav>
  );
}
