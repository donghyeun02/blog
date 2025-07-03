'use client';

import { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from './mdx-components';

export default function MdxProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
