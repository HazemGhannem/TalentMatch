import { GoogleGenAI, Type, type Schema } from '@google/genai';
import type { AnalysisResult } from './types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL = 'gemini-2.5-flash';

interface AnalyzeMatchInput {
  cvText: string;
  jobDescription: string;
}

const SYSTEM_INSTRUCTION = `You are a careful technical recruiter. You compare a candidate's CV against a job description and respond with structured analysis only.

- score: how well the CV matches the job description (0-100)
- strengths: 3-6 short strings, specific things the CV already covers well for this role
- gaps: 3-6 short strings, specific things the job description asks for that the CV is missing or underrepresents
- apply: check the candidate CV against the job description and predict whether it is worth applying for the job. Return true to apply, false to skip.
- rewrittenCV: the candidate's CV, rewritten to better target this job description. Keep it truthful to the original content, just re-emphasize, reorder, and rephrase. Return JSON.
    Also choose the best layout:
    - Modern
    - Classic
    - Minimal
    - Tech`;

// Forces Gemini's response into exactly this shape — no manual JSON parsing/fence-stripping needed.
const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.INTEGER, description: 'Match score from 0-100' },
    apply: { type: Type.BOOLEAN, description: 'appy or not to the job' },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
    rewrittenCV: {
      type: Type.OBJECT,
      properties: {
        layout: {
          type: Type.STRING,
          enum: ['Modern', 'Classic', 'Minimal', 'Tech'],
        },
        name: { type: Type.STRING },
        title: { type: Type.STRING },
        summary: { type: Type.STRING },
        experience: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              company: { type: Type.STRING },
              role: { type: Type.STRING },
              dates: { type: Type.STRING },
              achievements: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['company', 'role', 'dates', 'achievements'],
          },
        },
        education: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              institution: { type: Type.STRING },
              degree: { type: Type.STRING },
              dates: { type: Type.STRING },
            },
            required: ['institution', 'degree', 'dates'],
          },
        },
        skills: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: [
        'layout',
        'name',
        'title',
        'summary',
        'experience',
        'education',
        'skills',
      ],
    },
  },
  required: ['score', 'strengths', 'gaps', 'rewrittenCV'],
};

function buildPrompt({ cvText, jobDescription }: AnalyzeMatchInput) {
  return `JOB DESCRIPTION:\n${jobDescription}\n\nCANDIDATE CV:\n${cvText}`;
}

/**
 * Sends the CV + job description to Gemini and returns the structured
 * AnalysisResult. Throws if the API call fails or returns no text —
 * catch this in the API route.
 */
export async function analyzeMatch(
  input: AnalyzeMatchInput,
): Promise<AnalysisResult> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: buildPrompt(input),
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: 'application/json',
      responseSchema: RESPONSE_SCHEMA,
    },
  });

  if (!response.text) {
    throw new Error('Gemini returned no content.');
  }

  const parsed = JSON.parse(response.text) as AnalysisResult;

  // Defensive clamp in case the model drifts outside 0-100 despite the schema
  parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)));

  return parsed;
}
