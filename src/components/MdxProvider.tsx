'use client';

import { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { mdxComponents } from './mdx-components';
import DecimalToBinaryConverter from './CS/DecimalToBinaryConverter';

const components = {
  DecimalToBinaryConverter,
  // ... other components
};

export default function MdxProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}
