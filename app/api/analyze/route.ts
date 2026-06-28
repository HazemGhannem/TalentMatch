import { NextRequest, NextResponse } from 'next/server';
import { parsePDF } from '@/lib/parsePDF';
import { analyzeMatch } from '@/lib/Gemini';
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('cv') as File | null;
  const jobDescription = formData.get('jobDescription') as string | null;
  if (!file || !jobDescription) {
    return NextResponse.json(
      { error: 'Missing CV file or job description.' },
      { status: 400 },
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let cvText: string;
  try {
    cvText = await parsePDF(buffer);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Couldn't read this PDF.";
    return NextResponse.json({ error: message }, { status: 422 });
  }

  try {
    const result = await analyzeMatch({ cvText, jobDescription });
    return NextResponse.json(result);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Analysis failed. Please try again.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
