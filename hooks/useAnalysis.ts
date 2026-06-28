import { useState } from 'react';
import type { AnalysisResult, AnalysisStatus } from '@/lib/types';

export function useAnalysis() {
  const [jobDescription, setJobDescription] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const canAnalyze =
    jobDescription.trim().length > 0 &&
    cvFile !== null &&
    status !== 'analyzing';

  const analyze = async () => {
    if (!cvFile) return;
    setStatus('analyzing');
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('cv', cvFile);
      formData.append('jobDescription', jobDescription);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const { error } = await res.json();
        setUploadError(error ?? 'Analysis failed. Please try again.');
        setStatus('error');
        return;
      }

      setResult(await res.json());
      setStatus('done');
    } catch {
      setUploadError('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return {
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
  };
}
