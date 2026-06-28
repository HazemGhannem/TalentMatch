'use client';

import JobDescriptionInput from '@/components/input/JobDescriptionInput';
import CVUpload from '@/components/input/CVUpload';
import Button from '@/components/ui/Button';
import NoAnalysis from '@/components/NoAnalysis';
import { useAnalysis } from '@/hooks/useAnalysis';
import dynamic from 'next/dynamic';

const ResultsPanel = dynamic(
  () => import('@/components/results/ResultsPanel'),
  {
    ssr: false,
  },
);

export default function Page() {
  const {
    jobDescription,
    setJobDescription,
    cvFile,
    setCvFile,
    uploadError,
    setUploadError,
    status,
    result,
    canAnalyze,
    analyze,
  } = useAnalysis();

  return (
    <main className="page-layout">
      {/* Left: inputs */}
      <div className="card flex flex-col gap-6">
        <JobDescriptionInput
          value={jobDescription}
          onChange={setJobDescription}
          disabled={status === 'analyzing'}
        />

        <div className="divider" />

        <CVUpload
          file={cvFile}
          onFileSelect={(file) => {
            setCvFile(file);
            setUploadError(null);
          }}
          disabled={status === 'analyzing'}
          error={uploadError}
        />
        <Button
          onClick={analyze}
          disabled={!canAnalyze}
          loading={status === 'analyzing'}
        >
          {status === 'analyzing' ? 'Analyzing...' : 'Analyze match'}
        </Button>
      </div>

      {/* Right: results */}
      <div className="card flex flex-col gap-4">
        {result ? (
          <ResultsPanel result={result} />
        ) : (
          <NoAnalysis analyzing={status === 'analyzing'} />
        )}
      </div>
    </main>
  );
}
