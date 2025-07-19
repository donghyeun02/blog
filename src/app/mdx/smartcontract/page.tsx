import { createMDXPage } from '@/components/MDXPage';

const { generateMetadata, default: SmartcontractPage } =
  createMDXPage('smartcontract');

export { generateMetadata };
export default SmartcontractPage;
