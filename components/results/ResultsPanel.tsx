import { useState } from 'react';
import ScoreCard from './ScoreCard';
import StrengthsList from './StrengthsList';
import GapsList from './GapList';
import RewrittenCV from './RewrittenCV';
import type { AnalysisResult } from '@/lib/types';

interface ResultsPanelProps {
  result: AnalysisResult;
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'rewrite'>(
    'overview',
  );

  return (
    <>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'rewrite' ? 'active' : ''}`}
          onClick={() => setActiveTab('rewrite')}
        >
          Rewritten CV
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="flex flex-col gap-6 animate-in">
          <ScoreCard score={result.score} apply={result.apply as boolean} />

          <div>
            <div className="panel-label">Strengths</div>
            <StrengthsList items={result.strengths} />
          </div>

          <div>
            <div className="panel-label">Gaps</div>
            <GapsList items={result.gaps} />
          </div>
        </div>
      ) : (
        <div className="animate-in">
          <RewrittenCV cv={result.rewrittenCV} />
        </div>
      )}
    </>
  );
}
