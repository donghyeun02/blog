import Link from 'next/link';
import Image from 'next/image';
import { postsMeta } from './postsMeta';
import BinaryStrip from './home/BinaryStrip';
import FilterablePosts from './home/FilterablePosts';

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

// 배열 뒤쪽이 최신이라 뒤집어서 최신순으로 둔다.
const listed = postsMeta.filter((post) => post.listed !== false).reverse();

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

        <FilterablePosts posts={listed} />
      </div>
    </div>
  );
}
