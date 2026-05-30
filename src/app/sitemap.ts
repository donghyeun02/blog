import type { MetadataRoute } from 'next';
import { postsMeta } from '@/components/postsMeta';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = postsMeta.map((post) => ({
    url: `https://donghyeun02.com/post/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://donghyeun02.com',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...posts,
  ];
}
