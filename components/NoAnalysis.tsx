import { Ellipsis } from 'lucide-react';

interface NoAnalysisProps {
  analyzing?: boolean;
}

const NoAnalysis = ({ analyzing = false }: NoAnalysisProps) => {
  return (
    <div className="empty-state">
      <Ellipsis
        className={`empty-icon ${analyzing ? 'animate-pulse' : ''}`}
        size={28}
      />
      <span className="empty-title">
        {analyzing ? 'Analyzing...' : 'No analysis yet'}
      </span>
      <p className="empty-sub">
        {analyzing
          ? 'Comparing your CV against the job description. This takes a few seconds.'
          : 'Paste a job description and upload your CV, then run the analysis to see your match score, strengths, gaps, and a tailored rewrite.'}
      </p>
    </div>
  );
};

export default NoAnalysis;
