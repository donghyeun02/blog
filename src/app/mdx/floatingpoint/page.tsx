import { createMDXPage } from '@/components/MDXPage';

const { generateMetadata, default: FloatingpointPage } =
  createMDXPage('floatingpoint');

export { generateMetadata };
export default FloatingpointPage;
