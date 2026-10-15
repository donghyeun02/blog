import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ACTIVITIES,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILLS,
  type Link as ResumeLink,
  type Project,
  type ProjectImage,
  type TimelineItem,
} from './data';

export const metadata: Metadata = {
  title: 'About · donghyeun02',
  description:
    '백엔드 개발자 신동현을 소개합니다. 경력, 교육, 기술, 프로젝트를 정리했습니다.',
  alternates: { canonical: '/resume' },
};

// 맨 위 바로가기와 섹션 id를 한곳에서 맞춘다.
const SECTIONS = [
  { id: 'skills', title: '기술' },
  { id: 'experience', title: '경력' },
  { id: 'education', title: '교육' },
  { id: 'activities', title: '활동' },
  { id: 'projects', title: '프로젝트' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

const isExternal = (href: string) => href.startsWith('http');
const linkClass =
  'text-[#1D1D1F] underline underline-offset-2 transition-[color] duration-150 hover:text-[#6E6E73]';

function TextLink({ link }: { link: ResumeLink }) {
  if (isExternal(link.href) || link.href.startsWith('mailto:')) {
    return (
      <a
        href={link.href}
        className={linkClass}
        {...(isExternal(link.href)
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {link.label}
        {isExternal(link.href) && ' ↗'}
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkClass}>
      {link.label} →
    </Link>
  );
}

function Section({
  id,
  meta,
  children,
}: {
  id: SectionId;
  meta?: string;
  children: React.ReactNode;
}) {
  const title = SECTIONS.find((s) => s.id === id)?.title;
  return (
    <section
      id={id}
      className="mt-16 scroll-mt-8 border-t border-[#D2D2D7] pt-8"
    >
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="m-0 text-[1.4rem] font-bold tracking-tight text-[#1D1D1F]">
          {title}
        </h2>
        {meta && <span className="label-meta">{meta}</span>}
      </div>
      {children}
    </section>
  );
}

// 날짜 열은 넓은 화면에서만 왼쪽에 고정하고, 좁으면 제목 위로 올린다.
const ROW = 'grid gap-x-8 gap-y-1 sm:grid-cols-[9rem_1fr] sm:items-baseline';

function Timeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <ol className="flex flex-col gap-6">
      {items.map((item) => (
        <li key={`${item.period}-${item.title}`} className={ROW}>
          <time className="row-date">{item.period}</time>
          <div>
            <p className="mb-0 text-[16px] font-semibold leading-snug text-[#1D1D1F]">
              {item.title}
              {item.sub && (
                <span className="ml-2 text-[14px] font-medium text-[#6E6E73]">
                  {item.sub}
                </span>
              )}
            </p>
            {item.detail && (
              <p className="mb-0 mt-1 text-[15px] leading-[1.75] text-[#3C3C43]">
                {item.detail}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[13px] font-semibold text-[#6E6E73]">{children}</p>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="rounded-xl border border-[#E5E5EA] bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="m-0 text-[1.35rem] font-bold tracking-tight text-[#1D1D1F]">
          {p.name}
        </h3>
        <span className="row-date">{p.period}</span>
      </div>
      <p className="mb-0 mt-1 text-[13px] text-[#6E6E73]">{p.kind}</p>
      <p className="mb-0 mt-3 text-[16px] leading-[1.75] text-[#1D1D1F]">
        {p.summary}
      </p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {p.stack.split(' · ').map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-[#F2F2F7] px-2 py-0.5 font-mono text-[12px] text-[#3C3C43]"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <SubHeading>한 일</SubHeading>
          <ul className="flex flex-col gap-2 pl-4">
            {p.did.map((line) => (
              <li
                key={line}
                className="relative text-[15px] leading-[1.75] text-[#3C3C43] before:absolute before:-left-4 before:text-[#AEAEB2] before:content-['—']"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
        {p.solved && (
          <div>
            <SubHeading>문제 해결</SubHeading>
            <div className="flex flex-col gap-4">
              {p.solved.map((s) => (
                <div key={s.title} className="border-l-2 border-[#1E88E5] pl-4">
                  <p className="mb-0 text-[15px] font-semibold text-[#1D1D1F]">
                    {s.title}
                  </p>
                  <p className="mb-0 mt-1 text-[15px] leading-[1.75] text-[#3C3C43]">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {p.images && <ProjectImages images={p.images} />}

      {p.links && (
        <p className="mb-0 mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[14px]">
          {p.links.map((l) => (
            <TextLink key={l.label} link={l} />
          ))}
        </p>
      )}
    </article>
  );
}

// 프로젝트 화면. 첫 장은 크게, 나머지는 넓은 화면에서 두 장씩 나란히 둔다.
function ProjectImages({ images }: { images: readonly ProjectImage[] }) {
  const [first, ...others] = images;
  return (
    <div className="mt-6 flex flex-col gap-4">
      <Figure image={first} />
      {others.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {others.map((image) => (
            <Figure key={image.src} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

function Figure({ image }: { image: ProjectImage }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-lg border border-[#E5E5EA] bg-white">
        {image.width && image.height ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 900px, 100vw"
            className="block h-auto w-full"
          />
        ) : (
          // 움직이는 GIF는 최적화하면 첫 프레임만 남아서 원본을 그대로 쓴다.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="block h-auto w-full"
          />
        )}
      </div>
      <figcaption className="mt-2 text-[13px] text-[#6E6E73]">
        {image.alt}
      </figcaption>
    </figure>
  );
}

export default function ResumePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-[3lh] pb-[3lh]">
      <header>
        <Link className="ext" href="/">
          ← 홈
        </Link>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative aspect-square w-24 flex-shrink-0 overflow-hidden rounded-xl">
            <Image
              src={PROFILE.photo}
              alt={PROFILE.name}
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="m-0 text-[2rem] font-bold tracking-tight text-[#1D1D1F]">
              {PROFILE.name}
              <span className="ml-3 text-[1.05rem] font-medium text-[#6E6E73]">
                {PROFILE.role}
              </span>
            </h1>
            <p className="mb-0 mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[14px]">
              {PROFILE.contacts.map((c) => (
                <TextLink key={c.label} link={c} />
              ))}
            </p>
          </div>
        </div>

        <div className="mt-6 flex max-w-3xl flex-col gap-1">
          {PROFILE.intro.map((line) => (
            <p
              key={line}
              className="mb-0 text-[17px] leading-[1.8] text-[#3C3C43]"
            >
              {line}
            </p>
          ))}
        </div>

        <nav aria-label="섹션 바로가기" className="mt-8 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-[#D2D2D7] px-3 py-1 text-[13px] text-[#3C3C43] transition-[border-color,color] duration-150 hover:border-[#1D1D1F] hover:text-[#1D1D1F]"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </header>

      <Section id="skills">
        <dl className="flex flex-col gap-4">
          {SKILLS.map((group) => (
            <div key={group.label} className={ROW}>
              <dt
                className={
                  group.primary
                    ? 'row-date font-semibold text-[#1D1D1F]'
                    : 'row-date'
                }
              >
                {group.label}
              </dt>
              <dd
                className={
                  group.primary
                    ? 'text-[17px] font-bold leading-[1.6] text-[#1D1D1F]'
                    : 'text-[15px] leading-[1.75] text-[#3C3C43]'
                }
              >
                {group.items}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="experience">
        <Timeline items={EXPERIENCE} />
      </Section>

      <Section id="education">
        <Timeline items={EDUCATION} />
      </Section>

      <Section id="activities">
        <Timeline items={ACTIVITIES} />
      </Section>

      <Section id="projects" meta={`${PROJECTS.length}개 · 최신순`}>
        <div className="flex flex-col gap-8">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </Section>
    </div>
  );
}
