'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import CVSection from './CVSection';
import { downloadCV, toPlainText } from '@/lib/utils';
import type { RewrittenCV as RewrittenCVData } from '@/lib/types';

interface RewrittenCVProps {
  cv: RewrittenCVData;
  fileName?: string;
}

export default function RewrittenCV({
  cv,
  fileName = 'rewritten-cv',
}: RewrittenCVProps) {
  const [copied, setCopied] = useState(false);


  const handleCopy = async () => {
    await navigator.clipboard.writeText(toPlainText(cv));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="panel-label" style={{ marginBottom: 0 }}>
            Rewritten CV
          </span>
          <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-2)] px-2 py-0.5 rounded-full">
            {cv.layout}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? 'Copied ✓' : 'Copy'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => downloadCV(cv, fileName)}
          >
            Download PDF
          </Button>
        </div>
      </div>

      {/* CV Body */}
      <div className="rewrite-box flex flex-col gap-5">
        {/* Identity */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {cv.name}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">{cv.title}</p>
        </div>

        {/* Summary */}
        <CVSection title="Summary">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {cv.summary}
          </p>
        </CVSection>

        {/* Experience */}
        <CVSection title="Experience">
          <div className="flex flex-col gap-4">
            {cv.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {exp.role}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {exp.dates}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-1">
                  {exp.company}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {exp.achievements.map((a, j) => (
                    <li
                      key={j}
                      className="text-sm text-[var(--text-secondary)] flex gap-2"
                    >
                      <span className="text-[var(--accent)] mt-0.5">•</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CVSection>

        {/* Education */}
        <CVSection title="Education">
          <div className="flex flex-col gap-2">
            {cv.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {edu.degree}
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">
                    {' '}
                    — {edu.institution}
                  </span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">
                  {edu.dates}
                </span>
              </div>
            ))}
          </div>
        </CVSection>

        {/* Skills */}
        <CVSection title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {cv.skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--text-secondary)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </CVSection>
      </div>
    </div>
  );
}
