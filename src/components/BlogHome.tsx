'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { postsMeta } from './postsMeta';

const HOME_POST_LIMIT = 8;

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

const recentPosts = [...postsMeta].reverse().slice(0, HOME_POST_LIMIT);

export default function BlogHome() {
  return (
    <div className="max-w-2xl mx-auto px-6 flex flex-col gap-10 pb-20">
      {/* Profile */}
      <section className="pt-16 sm:pt-24">
        <div className="flex items-start justify-between gap-6 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight mb-4">
              신동현
            </h1>
            <p className="text-base text-[#3C3C43] leading-[1.8]">
              어떻게 동작하는지 궁금한 게 많은 백엔드 개발자입니다.
              <br />
              파고파서 나온 결과를 이곳에 정리합니다.{' '}
              <a
                href="https://github.com/donghyeun02"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1D1D1F] underline underline-offset-2 hover:text-[#6E6E73] transition-[color] duration-150"
              >
                GitHub
              </a>
            </p>
          </div>
          <div className="relative flex-shrink-0 w-32 sm:w-44 aspect-square">
            <Image
              src="https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/A64D1C12-596E-4016-8EB5-063B2BA1DEBE_1_201_a-Photoroom.png"
              alt="donghyeun02"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-sm font-semibold text-[#AEAEB2] uppercase tracking-widest mb-3">
          프로젝트
        </h2>
        <div className="flex flex-col">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-0 px-3 -mx-3 hover:bg-[#F2F2F7] transition-[background-color] duration-150"
            >
              <div className="flex items-center justify-between gap-4 mb-0.3">
                <h3 className="text-base font-semibold text-[#1D1D1F] group-hover:text-[#6E6E73] transition-[color] duration-150 leading-snug">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {project.stars != null && (
                    <span className="text-sm text-[#AEAEB2] tabular-nums">
                      ★ {project.stars}
                    </span>
                  )}
                  <ExternalLink className="w-4 h-4 text-[#C7C7CC]" />
                </div>
              </div>
              <p className="text-[15px] text-[#6E6E73] leading-snug">
                {project.description}
              </p>
              <p className="text-sm text-[#AEAEB2] mt-0.5">{project.tech}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section>
        <h2 className="text-sm font-semibold text-[#AEAEB2] uppercase tracking-widest mb-3">
          최근 글
        </h2>
        <div className="flex flex-col">
          {recentPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/post/${post.slug}`}
              className="group block py-0 px-3 -mx-3 hover:bg-[#F2F2F7] transition-[background-color] duration-150 post-item"
              style={{ '--stagger-index': index } as React.CSSProperties}
            >
              <h3 className="text-base font-semibold text-[#1D1D1F] group-hover:text-[#6E6E73] transition-[color] duration-150 leading-snug mb-0.5">
                {post.title}
              </h3>
              <p className="text-[15px] text-[#6E6E73] leading-snug">
                {post.summary}
              </p>
              <p className="text-sm text-[#AEAEB2] mt-0.5">
                {post.category} · {post.date?.replace('.', '/')}
              </p>
            </Link>
          ))}
        </div>
        <Link
          href="/posts"
          className="inline-block mt-8 text-sm text-[#1D1D1F] underline underline-offset-2 hover:text-[#6E6E73] transition-[color] duration-150"
        >
          모든 글 보기 →
        </Link>
      </section>
    </div>
  );
}
