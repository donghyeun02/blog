import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그 · donghyeun02',
  description:
    '이 블로그를 만들면서 크게 바꾼 것들을 시간 순으로 정리한 기록입니다.',
};

type Milestone = {
  date: string;
  title: string;
  body: string;
  tags?: readonly string[];
  note?: string;
};

const MILESTONES: readonly Milestone[] = [
  {
    date: '2025.06',
    title: '블로그를 직접 만들기 시작했다',
    body: '플랫폼에 글을 쌓는 대신 처음부터 짜기로 했다. 글 하나를 만들어 주는 CLI, 소개 페이지, 방문 통계까지 붙이고 나니 최소한의 블로그 모양이 됐다.',
    tags: ['Next.js', 'MDX', 'Tailwind CSS'],
  },
  {
    date: '2025.07',
    title: '글 안에서 직접 만져볼 수 있게 했다',
    body: '논리 게이트 시뮬레이터 하나를 글에 넣어본 게 시작이었다. 이후 HTTP 요청 흐름, 쿠키와 세션, 진법 변환기, 반가산기와 전가산기까지 붙였다. 지금 열두 개가 글 안에서 돈다.',
    tags: ['React Flow'],
  },
  {
    date: '2025.07',
    title: '글이 사라지지 않게 만들었다',
    body: '글 원본을 IPFS에 올리고 그 CID를 기준으로 렌더링하도록 바꿨다. 이어서 스마트 컨트랙트에 CID를 기록하고 무결성을 검증하는 화면을 붙였고, Sepolia 테스트넷에서 Polygon 메인넷으로 옮겼다.',
    tags: ['IPFS', 'Polygon', 'Solidity'],
  },
  {
    date: '2025.08',
    title: '글을 슬라이드로 넘겨 읽게 했다',
    body: '긴 글을 한 번에 스크롤하는 대신 장 단위로 넘기는 형식으로 바꿨다. 모바일까지 맞췄는데, 결국 뒤의 개편에서 되돌렸다.',
    note: '지금은 쓰지 않는다',
  },
  {
    date: '2025.08',
    title: '처음으로 전체 디자인을 갈아엎었다',
    body: '레이아웃과 타이포그래피를 새로 잡고 다크모드를 넣었다. 애드센스도 이때 붙였다.',
  },
  {
    date: '2025.11',
    title: '다크를 기본으로 다시 개편했다',
    body: '다크모드를 선택지가 아니라 기본값으로 삼고 화면 전체를 그 위에 다시 그렸다.',
  },
  {
    date: '2026.06',
    title: '보안을 점수로 재고 고쳤다',
    body: '공격과 방어를 번갈아 돌리는 하드닝 사이클을 한 바퀴 돌려 점수를 62에서 99로 올렸다. 보안 헤더를 세우고, 클라이언트에서 MDX를 받아 파싱하던 460줄짜리 로더와 무결성 검증 코드를 걷어냈다.',
    tags: ['CSP', 'HSTS'],
  },
  {
    date: '2026.08',
    title: '프레임워크를 최신으로 올렸다',
    body: 'Next.js 16과 React Compiler로 옮기고, 런타임에 하던 MDX 컴파일을 빌드 타임으로 내렸다. 위젯은 지연 로딩으로 떼어내 글 페이지가 받는 자바스크립트가 476KB에서 176KB로 줄었다. 화면 전환과 스크롤 움직임도 이때 다시 짰다.',
    tags: ['Next.js 16', 'React Compiler', 'View Transitions', 'Tailwind v4'],
  },
  {
    date: '2026.08',
    title: '첫 화면을 다시 짰다',
    body: '글 목록만 있던 홈을 프로젝트를 먼저 보여주고 글은 필터 하나로 합치는 구조로 바꿨다. 남는 가로 공간은 목차와 소개 레일에 내줬고, 소개 글도 새로 썼다.',
  },
] as const;

export default function LogPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-[3lh] pb-[3lh]">
      <header>
        <Link className="ext" href="/">
          ← 홈
        </Link>
        <div className="label mt-[1.5lh]">
          <h2>로그</h2>
          <span className="label-meta">
            {MILESTONES.length}개 · 2025 — 2026
          </span>
        </div>
        <p className="text-[15px] leading-[1.85] text-[#3C3C43]">
          이 블로그를 만들면서 크게 바꾼 것들만 골라 시간 순으로 적어 둡니다.
          되돌린 것도 그대로 남겨 뒀습니다.
        </p>
      </header>

      <ol className="mt-[2lh]">
        {MILESTONES.map((m, i) => {
          const last = i === MILESTONES.length - 1;
          return (
            <li
              key={m.title}
              className="grid grid-cols-[3.4rem_1fr] items-baseline gap-x-4 sm:grid-cols-[4.5rem_1fr] sm:gap-x-6"
            >
              <time className="row-date">{m.date}</time>

              <div
                className={`relative pl-6 ${
                  last ? 'pb-0' : 'border-l border-[#D2D2D7] pb-[1.6lh]'
                }`}
              >
                {/* 마지막 항목은 세로선을 점까지만 그린다 */}
                {last && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-[0.62lh] w-px bg-[#D2D2D7]"
                  />
                )}
                {/* 점은 제목 줄 한가운데에 맞춘다 — 레일에서 왼쪽 여백만큼 되돌린다 */}
                <h3 className="relative text-[1.02rem] font-semibold tracking-tight text-[#1D1D1F]">
                  <span
                    aria-hidden
                    className="absolute -left-[27.5px] top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[#1D1D1F] ring-4 ring-[#FAFAFA]"
                  />
                  {m.title}
                </h3>

                <p className="mt-[0.35lh] text-[15px] leading-[1.85] text-[#3C3C43]">
                  {m.body}
                </p>

                {(m.tags || m.note) && (
                  <div className="mt-[0.5lh] flex flex-wrap items-center gap-x-3 gap-y-1">
                    {m.tags && (
                      <span className="font-mono text-[0.72rem] tracking-tight text-[#6E6E73]">
                        {m.tags.join('  ·  ')}
                      </span>
                    )}
                    {m.note && (
                      <span className="font-mono text-[0.72rem] tracking-tight text-[#AEAEB2]">
                        {m.note}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-[2lh] text-[15px] leading-[1.85] text-[#3C3C43]">
        왜 이렇게까지 직접 만들었는지는{' '}
        <Link
          href="/about"
          className="text-[#1D1D1F] underline underline-offset-2 transition-[color] duration-150 hover:text-[#6E6E73]"
        >
          소개
        </Link>
        에 적어 뒀습니다.
      </p>
    </div>
  );
}
