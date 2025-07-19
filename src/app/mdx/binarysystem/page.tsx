import { createMDXPage } from '@/components/MDXPage';

const { generateMetadata, default: BinarySystemPage } =
  createMDXPage('binarysystem');

export { generateMetadata };
export default BinarySystemPage;
