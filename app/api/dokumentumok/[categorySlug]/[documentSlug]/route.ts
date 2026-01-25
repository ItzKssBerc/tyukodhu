import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ categorySlug: string; documentSlug: string }> }
) {
  return new NextResponse('Document API route not yet implemented with TinaCMS', { status: 501 });
}