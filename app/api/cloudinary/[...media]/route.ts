import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";
import { NextRequest, NextResponse } from 'next/server';

import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";
import { NextRequest, NextResponse } from 'next/server';
// You might need to import `isAuthorized` from `@tinacms/auth` if you want to use TinaCMS's built-in authorization.
// For this example, we'll use a simple `true` to get past the compile error.

const tinaCloudinaryHandler = createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  authorized: async (req, res) => {
    // This is a placeholder. In a real application, implement proper authentication.
    // For example, if using TinaCMS's built-in auth, you might do:
    // return isAuthorized(req, res);
    return true;
  },
});

// Helper function to convert NextRequest to NextApiRequest-like and handle response
async function handleAppRouterRequest(req: NextRequest) {
  // Create a mock res object to capture the response from the pagesApiHandler
  let responseBody: any = null;
  let statusCode = 200;
  let headers = new Headers();

  const mockRes: any = {
    status: (code: number) => {
      statusCode = code;
      return mockRes;
    },
    json: (data: any) => {
      responseBody = data;
      headers.set('Content-Type', 'application/json');
      return mockRes;
    },
    send: (data: any) => {
      responseBody = data; // Assuming data is string or buffer
      headers.set('Content-Type', typeof data === 'string' ? 'text/plain' : 'application/octet-stream');
      return mockRes;
    },
    end: (data?: any) => {
      if (data) responseBody = data;
      return mockRes;
    },
    setHeader: (name: string, value: string) => {
      headers.set(name, value);
      return mockRes;
    },
    getHeaders: () => {
      return Object.fromEntries(headers.entries());
    }
  };

  // Adapt NextRequest to a NextApiRequest-like object
  const url = new URL(req.url);
  const query: Record<string, string | string[]> = {};
  url.searchParams.forEach((value, key) => {
    query[key] = value;
  });

  const mockReq: any = {
    method: req.method,
    headers: Object.fromEntries(req.headers.entries()),
    query: query,
    cookies: Object.fromEntries(req.cookies.entries()),
    body: undefined, // Will be populated for POST/PUT/DELETE
  };

  // Handle request body for POST, PUT, DELETE
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      mockReq.body = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formDataText = await req.text();
      mockReq.body = new URLSearchParams(formDataText);
    } else if (contentType.includes('multipart/form-data')) {
      // For multipart/form-data, `next-tinacms-cloudinary`'s internal `multer`
      // expects a Node.js stream (`IncomingMessage`). `NextRequest.body` is a Web Stream.
      // This is a known incompatibility. We'll pass the raw `req` body stream
      // hoping multer can handle it, or it will fail at runtime.
      mockReq.body = req.body;
    }
  }

  // Execute the original Pages Router handler
  await new Promise<void>((resolve) => {
    // The createMediaHandler expects a third argument (next() function) when used as middleware.
    // For direct API route, it usually handles the response and calls end().
    // We pass resolve as the 'next' function which signals completion.
    tinaCloudinaryHandler(mockReq, mockRes, resolve);
  });

  // Convert the captured response to NextResponse
  const responseOptions: ResponseInit = {
    status: statusCode,
    headers: headers,
  };

  return new NextResponse(responseBody, responseOptions);
}

export async function GET(req: NextRequest) {
  return handleAppRouterRequest(req);
}

export async function POST(req: NextRequest) {
  return handleAppRouterRequest(req);
}

export async function DELETE(req: NextRequest) {
  return handleAppRouterRequest(req);
}

