import { NextRequest, NextResponse } from 'next/server';
import { createReader } from "@keystatic/core/reader";
import config from "@/keystatic.config";
import * as fs from 'fs';
import * as path from 'path';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ categorySlug: string; documentSlug: string }> }
) {
  try {
    const resolvedParams = await context.params;
    const { categorySlug, documentSlug } = resolvedParams;
    const reader = createReader(process.cwd(), config);
    const documents = await reader.collections.documents.all();

    const document = documents.find(
      (doc) =>
        doc.entry.category === categorySlug &&
        doc.slug === documentSlug
    );

    if (!document) {
      return new NextResponse('Document not found', { status: 404 });
    }

    const filePath = path.join(process.cwd(), 'public', document.entry.file);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found on disk', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', 'inline; filename="' + path.basename(filePath) + '"');

    return new NextResponse(fileBuffer, { headers });
  } catch (error) {
    console.error('Error serving document:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
