'use client';

import { meta } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import Content from './content.mdx';
import CookieSimulator from '@/components/Backend/CookieSimulator';
import SessionSimulator from '@/components/Backend/SessionSimulator';
import AuthFlowSimulator from '@/components/Backend/AuthFlowSimulator';

export default function CookieSessionPage() {
  return (
    <BlogPostLayout
      title={meta.title}
      summary={meta.summary}
      date={meta.date}
      tags={meta.tags}
    >
      <Content
        components={{ CookieSimulator, SessionSimulator, AuthFlowSimulator }}
      />
    </BlogPostLayout>
  );
}
