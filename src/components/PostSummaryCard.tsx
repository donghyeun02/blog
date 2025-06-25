import Link from 'next/link';

interface PostSummaryCardProps {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  path?: string; // 홈에서는 링크, 상세에서는 링크 없음
}

export default function PostSummaryCard({
  title,
  summary,
  date,
  tags,
  path,
}: PostSummaryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transition hover:shadow-md">
      <div className="flex gap-2 mb-1 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="text-lg sm:text-xl font-semibold font-mono text-neutral-900 group-hover:text-blue-700 mb-1 transition-colors">
        {path ? (
          <Link href={path} className="align-middle hover:text-blue-700">
            <span className="align-middle">📄</span> {title}
          </Link>
        ) : (
          <>
            <span className="align-middle">📄</span> {title}
          </>
        )}
      </h2>
      <p className="text-neutral-600 text-sm sm:text-base mb-2">{summary}</p>
      <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
        <span>
          {new Date(date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
}
