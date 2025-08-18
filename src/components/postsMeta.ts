import { PostMeta } from '@/types';

const IMAGE_BASE =
  process.env.NEXT_PUBLIC_IMAGE_BASE ||
  'https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/';

export const postsMeta: PostMeta[] = [
  {
    title: '컴퓨터는 0.1 + 0.2도 계산을 못해요',
    path: '/post/floatingpoint',
    slug: 'floatingpoint',
    date: '2025-06-06',
    summary: '0.1 + 0.2는 0.3이 아닙니다.',
    category: 'CS',
    thumbnail: IMAGE_BASE + '0.1%2B0.2.png',
  },
  {
    title: '"컴퓨터는 왜 0과 1만 알까?"',
    path: '/post/binary',
    slug: 'binary',
    date: '2025-07-05',
    summary: '왜 컴퓨터는 우리처럼 0~9를 사용하지 않고 0과 1만 사용할까?',
    category: 'CS',
    thumbnail: IMAGE_BASE + 'binaryforPC.jpg',
  },
  {
    title: '계산기는 작은 디지털 교과서다',
    path: '/post/calculator',
    slug: 'calculator',
    date: '2025-07-09',
    summary:
      '계산기는 버튼 몇 개로 컴퓨터의 본질을 보여주는 작은 디지털 교과서다.',
    category: 'CS',
    thumbnail:
      IMAGE_BASE +
      '%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2025-07-02+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+11.25.22.png',
  },
  {
    slug: 'nft',
    title: 'NFT는 사기일 수 있지만, 블록체인은 아니다',
    path: '/post/nft',
    date: '2025-07-14',
    summary: 'NFT 시장은 거품일 지라도, 블록체인 기술 자체는 혁신이다.',
    category: 'Blockchain',
    thumbnail: IMAGE_BASE + 'nft.jpg',
  },
  {
    title: '코레일 홈페이지 리뉴얼에 대응하기',
    path: '/post/korailReserve',
    slug: 'korailReserve',
    date: '2025-07-17',
    summary:
      '2024년 6월, 코레일 홈페이지가 대대적으로 리뉴얼되면서 기존 KTX 자동 예매 크롤러가 동작하지 않게 되었습니다.',
    category: 'Dev',
    thumbnail:
      IMAGE_BASE +
      '%E1%84%92%E1%85%B4%E1%86%AB%E1%84%83%E1%85%AE%E1%86%BC%E1%84%8B%E1%85%B5.jpg',
  },
  {
    title: '블록체인 위에서 자동으로 실행되는 계약',
    path: '/post/smartContract',
    slug: 'smartContract',
    date: '2025-07-18',
    summary: '중간 기관 없이도 신뢰할 수 있는 거래를 가능하게 하는 기술',
    category: 'Blockchain',
    thumbnail: IMAGE_BASE + 'smartContract.jpg',
  },
  {
    title: '블록 하나가 바뀌면 다 날라간다',
    path: '/post/immutability',
    slug: 'immutability',
    date: '2025-08-05',
    summary: '근데 블록 데이터를 바꿀 수 있나요?',
    category: 'Blockchain',
    thumbnail: IMAGE_BASE + 'blockchainValid.png',
  },
  {
    title: '당신의 서버를 믿으시나요?',
    path: '/post/trust-your-server',
    slug: 'trust-your-server',
    date: '2025-08-07',
    summary: '믿었던 서버가 해킹당하고, 로그가 사라진다면...',
    category: 'Blockchain',
    thumbnail:
      IMAGE_BASE +
      '%E1%84%87%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%E1%84%89%E1%85%A6%E1%86%AF%E1%84%85%E1%85%A5.png',
  },
  {
    title: '같은 알고리즘인데 왜 결과가 다를까?',
    path: '/post/languagePerformance',
    slug: 'languagePerformance',
    date: '2025-08-18',
    summary: 'JavaScript로 시간초과, Go로는 통과',
    category: 'Dev',
    thumbnail: IMAGE_BASE + '%E1%84%8B%E1%85%AB.jpeg',
  },
];
