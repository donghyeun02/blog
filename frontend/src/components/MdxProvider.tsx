'use client';

import { MDXProvider } from '@mdx-js/react';
import { ReactNode } from 'react';
import { mdxComponents } from '../components/mdx-components';

export default function MdxProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
