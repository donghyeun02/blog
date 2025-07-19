'use client';

import { useEffect, useState } from 'react';

interface MDXWrapperProps {
  slug: string;
}

export default function MDXWrapper({ slug }: MDXWrapperProps) {
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMDXContent = async () => {
      try {
        const mdxModule = await import(`../app/mdx/${slug}/content.mdx`);
        setMDXContent(() => mdxModule.default);
      } catch (err) {
        console.error(`Failed to load MDX content for ${slug}:`, err);
        setError(`Failed to load content for ${slug}`);
      }
    };

    loadMDXContent();
  }, [slug]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!MDXContent) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return <MDXContent />;
}
