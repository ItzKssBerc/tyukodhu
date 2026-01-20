import { NextRequest, NextResponse } from 'next/server';
import { createReader } from '@keystatic/core/reader';
import config from '@/keystatic.config';

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

    if (!document || !document.entry.file) {
      return new NextResponse('Document not found', { status: 404 });
    }

    // `document.entry.file` should contain the path relative to the public folder,
    // e.g., '/documents/my-file.pdf'.
    // We construct a new URL object to ensure the path is correctly resolved
    // against the request's base URL.
    const fileUrl = new URL(document.entry.file, request.url);

    // Redirect the client to the static file.
    return NextResponse.redirect(fileUrl);
  } catch (error) {
    console.error('Error redirecting to document:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
