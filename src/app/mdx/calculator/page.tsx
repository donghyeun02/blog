import { createMDXPage } from '@/components/MDXPage';

const { generateMetadata, default: CalculatorPage } =
  createMDXPage('calculator');

export { generateMetadata };
export default CalculatorPage;
