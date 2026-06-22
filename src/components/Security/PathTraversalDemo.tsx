'use client';

import React, { useMemo, useState } from 'react';

const BASE_DIR = '/app/src/app/local-mdx';

// 브라우저에서 POSIX path.resolve 동작을 흉내낸다.
// path.resolve(baseDir, `${slug}.mdx`)와 같은 결과를 만든다.
function resolvePosix(base: string, rel: string): string {
  const isAbsolute = rel.startsWith('/');
  const combined = isAbsolute ? rel : `${base}/${rel}`;
  const stack: string[] = [];

  for (const part of combined.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') stack.pop();
    else stack.push(part);
  }

  return `/${stack.join('/')}`;
}

interface CheckResult {
  filePath: string;
  // startsWith(baseDir)만 쓴 순진한 검사
  naivePass: boolean;
  // startsWith(baseDir + path.sep)까지 붙인 검사
  fixedPass: boolean;
}

function evaluateSlug(slug: string): CheckResult {
  const filePath = resolvePosix(BASE_DIR, `${slug}.mdx`);
  const naivePass = filePath.startsWith(BASE_DIR);
  const fixedPass =
    filePath === BASE_DIR || filePath.startsWith(`${BASE_DIR}/`);
  return { filePath, naivePass, fixedPass };
}

const PRESETS: { label: string; slug: string }[] = [
  { label: '정상 요청', slug: 'hardening' },
  { label: '../../.env', slug: '../../.env' },
  { label: '../local-mdx-evil/x', slug: '../local-mdx-evil/x' },
];

type Verdict = 'served' | 'blocked' | 'bypassed';

function verdictOf({ naivePass, fixedPass }: CheckResult): Verdict {
  if (naivePass && fixedPass) return 'served';
  if (!naivePass && !fixedPass) return 'blocked';
  return 'bypassed'; // naive는 통과시켰지만 fixed는 막은, 그 함정
}

const VERDICT_TEXT: Record<Verdict, string> = {
  served: '안전하게 MDX 파일 제공',
  blocked: '두 검사 모두 차단 (404)',
  bypassed: 'naive 검사 우회 — 취약!',
};

const VERDICT_COLOR: Record<Verdict, string> = {
  served: '#1D7324',
  blocked: '#6E6E73',
  bypassed: '#D70015',
};

function CheckRow({
  label,
  code,
  pass,
}: {
  label: string;
  code: string;
  pass: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 bg-white border border-[#D2D2D7] px-3 py-2">
      <div className="min-w-0">
        <div className="text-xs sm:text-sm font-medium text-[#1D1D1F]">
          {label}
        </div>
        <div className="text-[10px] sm:text-xs font-mono text-[#6E6E73] truncate">
          {code}
        </div>
      </div>
      <div
        className="shrink-0 text-xs sm:text-sm font-mono font-bold"
        style={{ color: pass ? '#D70015' : '#6E6E73' }}
      >
        {pass ? '통과' : '차단'}
      </div>
    </div>
  );
}

const PathTraversalDemo = () => {
  const [slug, setSlug] = useState<string>('../local-mdx-evil/x');
  const result = useMemo(() => evaluateSlug(slug), [slug]);
  const verdict = verdictOf(result);

  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-3 sm:p-5 bg-[#FAFAFA] border border-[#D2D2D7]">
      <p className="text-sm sm:text-base text-[#3C3C43] mb-3">
        slug를 직접 넣어보면, 두 검사가 갈라지는 순간이 보인다.
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.slug}
            type="button"
            onClick={() => setSlug(preset.slug)}
            className={`px-2.5 py-1 text-xs sm:text-sm border transition-[background-color,border-color] duration-150 ${
              slug === preset.slug
                ? 'bg-[#1D1D1F] text-white border-[#1D1D1F]'
                : 'bg-white text-[#3C3C43] border-[#D2D2D7] hover:border-[#6E6E73]'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <label className="block text-xs sm:text-sm font-medium text-[#3C3C43] mb-1">
        GET /api/local-mdx/
        <span className="font-mono text-[#1D1D1F]">{'{slug}'}</span>
      </label>
      <div className="flex items-stretch font-mono text-xs sm:text-sm mb-4">
        <span className="flex items-center px-2 bg-[#F5F5F7] border border-r-0 border-[#D2D2D7] text-[#6E6E73]">
          .../local-mdx/
        </span>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          spellCheck={false}
          aria-label="요청 slug"
          className="flex-1 min-w-0 px-2 py-1.5 bg-white border border-[#D2D2D7] text-[#1D1D1F] focus:outline-none focus:border-[#1D1D1F]"
        />
        <span className="flex items-center px-2 bg-[#F5F5F7] border border-l-0 border-[#D2D2D7] text-[#6E6E73]">
          .mdx
        </span>
      </div>

      <div className="mb-3">
        <div className="text-xs text-[#6E6E73] mb-1">path.resolve 결과</div>
        <div className="font-mono text-xs sm:text-sm bg-white border border-[#D2D2D7] px-3 py-2 text-[#1D1D1F] break-all">
          {result.filePath}
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <CheckRow
          label="naive"
          code="filePath.startsWith(baseDir)"
          pass={result.naivePass}
        />
        <CheckRow
          label="fixed"
          code="filePath.startsWith(baseDir + path.sep)"
          pass={result.fixedPass}
        />
      </div>

      <div
        className="text-sm sm:text-base font-bold px-3 py-2 bg-white border"
        style={{
          color: VERDICT_COLOR[verdict],
          borderColor: VERDICT_COLOR[verdict],
        }}
      >
        → {VERDICT_TEXT[verdict]}
      </div>

      {verdict === 'bypassed' && (
        <p className="text-xs sm:text-sm text-[#3C3C43] mt-2">
          <span className="font-mono">local-mdx-evil</span>는 문자열상{' '}
          <span className="font-mono">local-mdx</span>로 시작하니까 naive 검사를
          그냥 통과한다. 구분자까지 붙여야 진짜 디렉토리 안쪽인지 가려진다.
        </p>
      )}
    </div>
  );
};

export default PathTraversalDemo;
