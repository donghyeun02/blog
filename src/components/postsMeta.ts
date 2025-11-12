import { PostMeta } from '@/types';

export const postsMeta: PostMeta[] = [
  {
    title: '컴퓨터는 0.1 + 0.2도 계산을 못해요',
    path: '/post/floatingpoint',
    slug: 'floatingpoint',
    summary: '0.1 + 0.2는 0.3이 아닙니다.',
    category: 'CS',
    order: 1,
  },
  {
    title: '"컴퓨터는 왜 0과 1만 알까?"',
    path: '/post/binary',
    slug: 'binary',
    summary: '왜 컴퓨터는 우리처럼 0~9를 사용하지 않고 0과 1만 사용할까?',
    category: 'CS',
    order: 2,
  },
  {
    title: '계산기는 작은 디지털 교과서다',
    path: '/post/calculator',
    slug: 'calculator',
    summary:
      '계산기는 버튼 몇 개로 컴퓨터의 본질을 보여주는 작은 디지털 교과서다.',
    category: 'CS',
    order: 3,
  },
  {
    slug: 'nft',
    title: 'NFT는 사기일 수 있지만, 블록체인은 아니다',
    path: '/post/nft',
    summary: 'NFT 시장은 거품일 지라도, 블록체인 기술 자체는 혁신이다.',
    category: 'Blockchain',
  },
  {
    title: '코레일 홈페이지 리뉴얼에 대응하기',
    path: '/post/korailReserve',
    slug: 'korailReserve',
    summary:
      '2024년 6월, 코레일 홈페이지가 대대적으로 리뉴얼되면서 기존 KTX 자동 예매 크롤러가 동작하지 않게 되었습니다.',
    category: 'Dev',
  },
  {
    title: '블록체인 위에서 자동으로 실행되는 계약',
    path: '/post/smartContract',
    slug: 'smartContract',
    summary: '중간 기관 없이도 신뢰할 수 있는 거래를 가능하게 하는 기술',
    category: 'Blockchain',
  },
  {
    title: '블록 하나가 바뀌면 다 날라간다',
    path: '/post/immutability',
    slug: 'immutability',
    summary: '근데 블록 데이터를 바꿀 수 있나요?',
    category: 'Blockchain',
  },
  {
    title: '당신의 서버를 믿으시나요?',
    path: '/post/trust-your-server',
    slug: 'trust-your-server',
    summary: '믿었던 서버가 해킹당하고, 로그가 사라진다면...',
    category: 'Blockchain',
  },
  {
    title: '같은 알고리즘인데 왜 결과가 다를까?',
    path: '/post/languagePerformance',
    slug: 'languagePerformance',
    summary: 'JavaScript로 시간초과, Go로는 통과',
    category: 'Dev',
  },
  {
    title: '왜 회사마다 사용하는 node.js 버전이 다른가..',
    path: '/post/nodeVersion',
    slug: 'nodeVersion',
    summary: '버전을 고민해야 하는 이유',
    category: 'Dev',
  },
  {
    title: 'Fastify에서 Swagger 사용하기',
    path: '/post/FastifySwagger',
    slug: 'FastifySwagger',
    summary: 'Swagger로 자동 문서화하기',
    category: 'Dev',
  },
  {
    title: '왜 if (window.ethereum)부터 시작할까?',
    path: '/post/windowEthereum',
    slug: 'windowEthereum',
    summary:
      'DApp에서 항상 보이는 if (window.ethereum) 체크, 왜 필요한지 지갑이 주입한 provider 관점에서 설명한다.',
    category: 'Blockchain',
  },
];
