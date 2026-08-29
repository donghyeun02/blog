import type { ReactNode } from 'react';

// 제목에서 앵커 id를 만든다. 목차와 본문 heading이 같은 함수를 쓰므로
// 별도 플러그인 없이도 두 쪽 id가 어긋나지 않는다.
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

// heading의 children이 문자열이 아닐 수 있어서(코드, 강조 등) 평탄화한다.
export function toText(node: ReactNode): string {
  if (node == null || node === false || node === true) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(toText).join('');
  if (typeof node === 'object' && 'props' in node) {
    return toText((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}
