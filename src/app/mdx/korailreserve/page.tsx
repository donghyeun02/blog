import { createMDXPage } from '@/components/MDXPage';

const { generateMetadata, default: KorailreservePage } =
  createMDXPage('korailreserve');

export { generateMetadata };
export default KorailreservePage;
