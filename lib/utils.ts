import jsPDF from 'jspdf';
import { RewrittenCV } from './types';

export const downloadCV = (cv: RewrittenCV, fileName = 'rewritten-cv') => {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const writeLine = (
    text: string,
    size: number,
    style: 'normal' | 'bold' = 'normal',
    color = '#111111',
  ) => {
    const blockH = size * 1.6;
    checkPageBreak(blockH);
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(color);
    doc.text(text, margin, y);
    y += blockH;
  };

  const writeWrapped = (
    text: string,
    size: number,
    style: 'normal' | 'bold' = 'normal',
    color = '#333333',
  ) => {
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(color);
    const lines = doc.splitTextToSize(text, contentWidth) as string[];
    const lineH = size * 1.5;
    // Pre-check the whole block, then draw without interruption
    checkPageBreak(lines.length * lineH);
    lines.forEach((line) => {
      doc.text(line, margin, y);
      y += lineH;
    });
  };

  const drawDivider = () => {
    checkPageBreak(20);
    y += 4;
    doc.setDrawColor('#e5e5e5');
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
  };

  const sectionHeading = (title: string) => {
    y += 6;
    drawDivider();
    checkPageBreak(22);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor('#6b6969');
    doc.text(title.toUpperCase(), margin, y);
    y += 14;
  };

  // — Name & title —
  writeLine(cv.name, 18, 'bold', '#111111');
  writeLine(cv.title, 11, 'normal', '#555555');

  // — Summary —
  sectionHeading('Summary');
  writeWrapped(cv.summary, 10, 'normal', '#333333');

  // — Experience —
  sectionHeading('Experience');
  cv.experience.forEach((exp) => {
    // Pre-measure entire job block before drawing any of it
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const achievementLines = exp.achievements.flatMap(
      (a) => doc.splitTextToSize(`• ${a}`, contentWidth - 8) as string[],
    );
    const blockH = 13 + 14 + achievementLines.length * 13 + 6;
    checkPageBreak(blockH);

    // Role + dates
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor('#111111');
    doc.text(exp.role, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor('#888888');
    doc.text(exp.dates, pageWidth - margin, y, { align: 'right' });
    y += 13;

    // Company
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor('#666666');
    doc.text(exp.company, margin, y);
    y += 14;

    // Achievements — already measured, just draw
    achievementLines.forEach((line) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor('#333333');
      doc.text(line, margin + 4, y);
      y += 13;
    });

    y += 6;
  });

  // — Education —
  sectionHeading('Education');
  cv.education.forEach((edu) => {
    const dateText = edu.dates;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const dateWidth = doc.getTextWidth(dateText) + 8;
    const maxLabelWidth = contentWidth - dateWidth;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    const labelLines = doc.splitTextToSize(
      `${edu.degree} — ${edu.institution}`,
      maxLabelWidth,
    ) as string[];

    // Pre-measure then draw atomically
    const blockH = labelLines.length * 15 + 4;
    checkPageBreak(blockH);

    labelLines.forEach((line, i) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor('#111111');
      doc.text(line, margin, y);

      if (i === 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor('#888888');
        doc.text(dateText, pageWidth - margin, y, { align: 'right' });
      }

      y += 15;
    });

    y += 4;
  });

  // — Skills —
  sectionHeading('Skills');
  // Pre-measure skills block too
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const skillsLine = cv.skills.join('  ·  ');
  const skillLines = doc.splitTextToSize(skillsLine, contentWidth) as string[];
  checkPageBreak(skillLines.length * 15);
  doc.setTextColor('#333333');
  skillLines.forEach((line) => {
    doc.text(line, margin, y);
    y += 15;
  });

  doc.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
};
export const toPlainText = (cv: RewrittenCV) =>
  [
    cv.name,
    cv.title,
    '',
    'SUMMARY',
    cv.summary,
    '',
    'EXPERIENCE',
    ...cv.experience.flatMap((e) => [
      `${e.role} — ${e.company} (${e.dates})`,
      ...e.achievements.map((a) => `  • ${a}`),
      '',
    ]),
    'EDUCATION',
    ...cv.education.map((e) => `${e.degree} — ${e.institution} (${e.dates})`),
    '',
    'SKILLS',
    cv.skills.join(', '),
  ].join('\n');
export function formatSize(bytes: number) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}