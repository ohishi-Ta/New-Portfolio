// app/api/works/route.ts

import { NextResponse } from 'next/server';
import { createClient } from 'microcms-js-sdk';

export async function GET() {
  const apiKey = process.env.MICROCMS_API_KEY; // NEXT_PUBLIC_なし
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'microCMS API key is not configured' },
      { status: 500 }
    );
  }

  const client = createClient({
    serviceDomain: 'portfolio-oishi',
    apiKey: apiKey,
  });

  try {
    const data = await client.get({
      endpoint: 'blog',
      queries: {
        limit: 100
      }
    });

    return NextResponse.json(data.contents);
  } catch (error) {
    console.error('microCMS API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch works' },
      { status: 500 }
    );
  }
}