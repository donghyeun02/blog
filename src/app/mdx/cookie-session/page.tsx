'use client';

import { meta } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import Content from './content.mdx';
import CookieSimulator from '@/components/Backend/CookieSimulator';
import SessionSimulator from '@/components/Backend/SessionSimulator';
import AuthFlowSimulator from '@/components/Backend/AuthFlowSimulator';
import { postsMeta } from '@/components/postsMeta';

export default function CookieSessionPage() {
  const currentPath = '/mdx/cookie-session';
  const idx = postsMeta.findIndex((p) => p.path === currentPath);
  const prevPost = idx > 0 ? postsMeta[idx - 1] : undefined;
  const nextPost = idx < postsMeta.length - 1 ? postsMeta[idx + 1] : undefined;
  return (
    <BlogPostLayout
      title={meta.title}
      summary={meta.summary}
      date={meta.date}
      tags={meta.tags}
      prevPost={prevPost}
      nextPost={nextPost}
    >
      <Content
        components={{ CookieSimulator, SessionSimulator, AuthFlowSimulator }}
      />
    </BlogPostLayout>
  );
}
