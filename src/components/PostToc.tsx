import { slugify } from '@/utils/slug';

// 본문 MDX에서 뽑아낸 h2 목록. 빌드 타임에 만들어지므로 클라이언트 JS가 없다.
export default function PostToc({ headings }: { headings: string[] }) {
  if (headings.length < 3) return null;

  return (
    <nav aria-label="목차" className="toc">
      <p className="toc-label">목차</p>
      <ol className="toc-list">
        {headings.map((heading, i) => (
          <li key={heading}>
            <a href={`#${slugify(heading)}`}>
              <span className="toc-num">{String(i + 1).padStart(2, '0')}</span>
              <span>{heading}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
