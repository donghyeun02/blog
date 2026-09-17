import type { MetadataRoute } from 'next';
import { postsMeta } from '@/components/postsMeta';
import { SITE_URL } from '@/utils/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = postsMeta.map((post) => ({
    url: `${SITE_URL}/post/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const pages = ['/posts', '/log', '/about', '/studio'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...pages,
    ...posts,
  ];
}
