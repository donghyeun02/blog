import Link from 'next/link';
import Image from 'next/image';
import { postsMeta } from './postsMeta';
import PostRow from './PostRow';
import BinaryStrip from './home/BinaryStrip';

const HOME_ROWS_PER_CATEGORY = 4;

// 홈에서 보여줄 순서. 글이 많은 순으로 두되 순서는 고정한다.
const CATEGORY_ORDER = ['Dev', 'CS', 'Blockchain'] as const;

// 글 안에서 실제로 돌아가는 것들. 글이 아니라 만든 것으로 따로 세운다.
const WORKS = [
  {
    name: '논리 게이트로 덧셈기 만들기',
    description: 'AND·OR·XOR을 이어 붙여 반가산기와 전가산기를 조립해 본다',
    href: '/post/calculator',
  },
  {
    name: '진수 · 문자 · 색 변환기',
    description: '십진수, 텍스트, RGB가 각각 어떻게 8비트로 바뀌는지 본다',
    href: '/post/binary',
  },
  {
    name: '경로 탈출 데모',
    description: '이 블로그에 실제로 있었던 취약점을 그대로 재현해 둔 것',
    href: '/post/hardening',
  },
  {
    name: '중앙화 vs 탈중앙화',
    description: '노드 하나가 죽었을 때 두 구조가 어떻게 달라지는지 비교한다',
    href: '/post/nft',
  },
] as const;

const PROJECTS = [
  {
    name: 'KTX 자동 예매',
    description: 'KTX 잔여석을 모니터링하고 자동으로 예매하는 크롤러',
    tech: 'Java · Spring',
    href: 'https://github.com/donghyeun02/KTX_auto_reserve',
    stars: 17,
  },
  {
    name: '스케줄 알림 봇',
    description: 'Google Calendar 일정을 Slack으로 자동 전송하는 알림 봇',
    tech: 'JavaScript · AWS Lambda',
    href: 'https://github.com/donghyeun02/schedule-helper',
    stars: null,
  },
] as const;

const listed = postsMeta.filter((post) => post.listed !== false);

function byCategory(category: string) {
  return listed
    .filter((post) => post.category === category)
    .slice()
    .reverse();
}

export default function BlogHome() {
  return (
    <div className="home-shell max-w-5xl mx-auto px-6 pb-[3lh] pt-[3lh]">
      {/* 소개 — 왼쪽 레일 */}
      <header className="home-rail">
        <div className="flex items-start gap-5 lg:flex-col lg:gap-[0.8lh]">
          <div className="stack-sm order-2 lg:order-none">
            <h1 className="text-[1.35rem] font-bold text-[#1D1D1F] tracking-tight">
              신동현
            </h1>
            <p className="text-[15px] text-[#3C3C43] leading-[1.75] max-w-[34ch]">
              어떻게 동작하는지 궁금한 게 많은 백엔드 개발자입니다.
              <br />
              파고파서 나온 결과를 이곳에 정리합니다.
            </p>
          </div>
          <div className="relative aspect-square w-20 flex-shrink-0 sm:w-24 order-1 lg:order-none">
            <Image
              src="https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/A64D1C12-596E-4016-8EB5-063B2BA1DEBE_1_201_a-Photoroom.png"
              alt="신동현"
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <nav className="flex items-baseline gap-x-4 mt-[0.8lh]">
          <a
            className="ext"
            href="https://github.com/donghyeun02"
            target="_blank"
            rel="noopener noreferrer"
          >
            github ↗
          </a>
          <a
            className="ext"
            href="https://instagram.com/donghyeun_02"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram ↗
          </a>
          <Link className="ext" href="/about">
            about →
          </Link>
        </nav>

        {/* 설명 대신 하나 돌려 본다. 이 블로그가 뭘 하는 곳인지가 한 줄로 보인다. */}
        <div className="mt-[1.4lh]">
          <BinaryStrip />
        </div>
      </header>

      <div className="stack-lg mt-[2lh] lg:mt-0">
        {/* 글 — 카테고리별로 나눠서 최근 것만 */}
        {CATEGORY_ORDER.map((category) => {
          const posts = byCategory(category);
          if (posts.length === 0) return null;
          const shown = posts.slice(0, HOME_ROWS_PER_CATEGORY);
          const rest = posts.length - shown.length;

          return (
            <section key={category}>
              <div className="label">
                <h2>{category}</h2>
                <Link className="label-meta" href={`/blog/${category}`}>
                  {rest > 0 ? `+${rest}편 더` : `${posts.length}편`} →
                </Link>
              </div>
              <div className="flex flex-col">
                {shown.map((post) => (
                  <PostRow key={post.slug} post={post} />
                ))}
              </div>
            </section>
          );
        })}

        {/* 작업 — 글 안에서 도는 것들 */}
        <section>
          <div className="label">
            <h2>작업</h2>
            <span className="label-meta">{WORKS.length}개</span>
          </div>
          <div className="flex flex-col">
            {WORKS.map((work) => (
              <Link
                key={work.href}
                href={work.href}
                className="group -mx-[0.6rem] px-[0.6rem] py-[0.34lh] transition-[background-color] duration-150 hover:bg-[#F2F2F7]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[0.98rem] font-medium text-[#1D1D1F] transition-[color] duration-150 group-hover:text-[#6E6E73]">
                    {work.name}
                  </span>
                  <span className="label-meta">열기 →</span>
                </div>
                <p className="mt-[0.1lh] text-[14px] leading-snug text-[#6E6E73]">
                  {work.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 프로젝트 */}
        <section>
          <div className="label">
            <h2>프로젝트</h2>
            <span className="label-meta">{PROJECTS.length}개</span>
          </div>
          <div className="flex flex-col">
            {PROJECTS.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-[0.6rem] -mx-[0.6rem] py-[0.34lh] transition-[background-color] duration-150 hover:bg-[#F2F2F7]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[0.98rem] font-medium text-[#1D1D1F] group-hover:text-[#6E6E73] transition-[color] duration-150">
                    {project.name}
                  </span>
                  <span className="label-meta">
                    {project.stars != null ? `★ ${project.stars}` : '↗'}
                  </span>
                </div>
                <p className="text-[14px] text-[#6E6E73] leading-snug mt-[0.1lh]">
                  {project.description}
                </p>
                <p className="label-meta mt-[0.1lh]">{project.tech}</p>
              </a>
            ))}
          </div>
        </section>

        <p>
          <Link className="ext" href="/posts">
            글 전체 보기 →
          </Link>
        </p>
      </div>
    </div>
  );
}
