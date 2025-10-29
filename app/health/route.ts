import { NextResponse } from 'next/server';

/**
 * Health check endpoint
 * Returns 200 OK if the application is running
 */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    },
    { status: 200 }
  );
}
