import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MDX_DIR = path.join(process.cwd(), 'src', 'app', 'local-mdx');
// Only a bare filename ending in .mdx — rejects path separators and `..` traversal.
const VALID_FILE = /^[a-zA-Z0-9_-]+\.mdx$/;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json(
      { error: 'File parameter is required' },
      { status: 400 }
    );
  }

  if (!VALID_FILE.test(file)) {
    return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
  }

  try {
    const filePath = path.join(MDX_DIR, file);

    // Defence in depth: ensure the resolved path stays inside MDX_DIR.
    const resolved = path.resolve(filePath);
    if (resolved !== filePath || !resolved.startsWith(MDX_DIR + path.sep)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    if (!fs.existsSync(resolved)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const content = fs.readFileSync(resolved, 'utf-8');

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error reading MDX file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
