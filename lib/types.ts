
export interface RewrittenCV {
  layout: 'Modern' | 'Classic' | 'Minimal' | 'Tech';
  name: string;
  title: string;
  summary: string;
  experience: {
    company: string;
    role: string;
    dates: string;
    achievements: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    dates: string;
  }[];
  skills: string[];
}

export interface AnalysisResult {
  score: number;
  apply: Boolean;
  strengths: string[];
  gaps: string[];
  rewrittenCV: RewrittenCV;
}

export type AnalysisStatus = 'idle' | 'analyzing' | 'done' | 'error';
