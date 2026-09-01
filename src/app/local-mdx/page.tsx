import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import Sample from './sample.mdx';

// 빌드 타임에 컴파일된 MDX를 그대로 렌더한다.
export default function LocalMdxPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#AEAEB2] hover:text-[#6E6E73] transition-[color] duration-150 mb-12"
        >
          <ArrowLeft size={16} />
          홈으로
        </Link>
        <p className="flex items-center gap-2 text-sm font-semibold text-[#AEAEB2] uppercase tracking-widest mb-8">
          <FileText size={14} />
          Local MDX
        </p>
        <article className="prose max-w-none">
          <Sample />
        </article>
      </div>
    </div>
  );
}
