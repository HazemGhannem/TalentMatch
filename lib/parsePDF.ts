import 'pdf-parse/worker';
import { PDFParse } from 'pdf-parse';

 
export async function parsePDF(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    const text = result.text.trim();

    if (!text) {
      throw new Error(
        "Couldn't find any text in this PDF — it may be a scanned image. Try a text-based PDF instead.",
      );
    }

    return text;
  } finally {
    await parser.destroy();
  }
}
