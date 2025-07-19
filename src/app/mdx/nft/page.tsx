import { createMDXPage } from '@/components/MDXPage';

const { generateMetadata, default: NftPage } = createMDXPage('nft');

export { generateMetadata };
export default NftPage;
