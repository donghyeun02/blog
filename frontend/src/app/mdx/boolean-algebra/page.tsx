'use client';

import Link from 'next/link';
import BooleanAlgebraContent from './content.mdx';
import MdxProviderWrapper from '@/components/MdxProvider';

export default function BooleanAlgebraPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <nav className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← 홈으로 돌아가기
            </Link>
          </nav>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              논리회로
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              수학
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
              기초
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            불린 대수 기초
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime="2024-01-16">
              {new Date('2024-01-16').toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>읽는 시간: 8분</span>
          </div>
        </div>
      </header>

      {/* 글 내용 */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
          <MdxProviderWrapper>
            <BooleanAlgebraContent />
          </MdxProviderWrapper>
        </div>
      </article>

      {/* 하단 네비게이션 */}
      <footer className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                이 글이 도움이 되셨나요?
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors">
                  👍 도움됨
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors">
                  👎 도움안됨
                </button>
              </div>
            </div>

            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              다른 글 보기
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
