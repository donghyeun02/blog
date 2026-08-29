import Link from 'next/link';
import Image from 'next/image';
import { postsMeta } from './postsMeta';
import PostRow from './PostRow';

const HOME_ROWS_PER_CATEGORY = 4;

// 홈에서 보여줄 순서. 글이 많은 순으로 두되 순서는 고정한다.
const CATEGORY_ORDER = ['Dev', 'CS', 'Blockchain'] as const;

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
    <div className="max-w-2xl mx-auto px-6 pb-[3lh]">
      {/* 소개 */}
      <header className="pt-[3lh]">
        <div className="flex items-start justify-between gap-8">
          <div className="stack-sm">
            <h1 className="text-[1.35rem] font-bold text-[#1D1D1F] tracking-tight">
              신동현
            </h1>
            <p className="text-[15px] text-[#3C3C43] leading-[1.75] max-w-[34ch]">
              어떻게 동작하는지 궁금한 게 많은 백엔드 개발자입니다.
              <br />
              파고파서 나온 결과를 이곳에 정리합니다.
            </p>
          </div>
          <div className="relative flex-shrink-0 w-20 sm:w-24 aspect-square">
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
      </header>

      <div className="stack-lg mt-[2.5lh]">
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

        {/* 작업 */}
        <section>
          <div className="label">
            <h2>작업</h2>
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
