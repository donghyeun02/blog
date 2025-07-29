import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json(
      { error: 'File parameter is required' },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'local-mdx', file);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error reading MDX file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
