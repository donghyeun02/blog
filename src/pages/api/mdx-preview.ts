import { promises as fs } from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = path.join(process.cwd(), 'src/local-mdx/sample.mdx');
  try {
    const mdxContent = await fs.readFile(filePath, 'utf8');
    res.status(200).json({ mdx: mdxContent });
  } catch {
    res.status(404).json({ error: 'MDX 파일을 찾을 수 없습니다.' });
  }
}
