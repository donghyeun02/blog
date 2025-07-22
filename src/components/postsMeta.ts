const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE || '';
const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || '';

export let postsMeta = [
  {
    title: '컴퓨터는 0.1 + 0.2도 계산을 못해요',
    path: '/post/floatingpoint',
    slug: 'floatingpoint',
    date: '2025-06-06',
    summary: '0.1 + 0.2는 0.3이 아닙니다.',
    tags: ['부동소수점', '컴퓨터오차', '이진수', 'CS기초', 'IEEE754'],
    category: 'CS',
    thumbnail: IMAGE_BASE + '0.1%2B0.2.png',
    mdxUrl:
      IPFS_GATEWAY +
      'bafkreifd5rv67jq454drymqn275sb7bsjpxcgpabrnsvcc5le7ei3g3qlm',
  },
  {
    title: '"컴퓨터는 왜 0과 1만 알까?"',
    path: '/post/binary',
    slug: 'binary',
    date: '2025-07-05',
    summary: '왜 컴퓨터는 우리처럼 0~9를 사용하지 않고 0과 1만 사용할까?',
    tags: ['이진수', 'CS기초', '컴퓨터구조'],
    category: 'CS',
    thumbnail: IMAGE_BASE + 'binaryforPC.jpg',
    mdxUrl:
      IPFS_GATEWAY +
      'bafkreihxpei57vd5sovh32vgvrhqapxinpaltejeuap5xjn7yinxdaayk4',
  },
  {
    title: '계산기는 작은 디지털 교과서다',
    path: '/post/calculator',
    slug: 'calculator',
    date: '2025-07-09',
    summary:
      '계산기는 버튼 몇 개로 컴퓨터의 본질을 보여주는 작은 디지털 교과서다.',
    tags: ['논리회로', '계산기', '디지털', '컴퓨터구조', 'ALU', '이진수'],
    category: 'CS',
    thumbnail:
      IMAGE_BASE +
      '%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2025-07-02+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+11.25.22.png',
    mdxUrl:
      IPFS_GATEWAY +
      'bafkreift5xmhh6m6tz2j34k2z3eivcurjkf6ldf4rq6bxfa5eq53dxk54i',
  },
  {
    slug: 'nft',
    title: 'NFT는 사기일 수 있지만, 블록체인은 아니다',
    path: '/post/nft',
    date: '2025-07-13',
    summary: 'NFT 시장은 거품일 지라도, 블록체인 기술 자체는 혁신이다.',
    tags: ['NFT', '블록체인', '스마트컨트랙트', 'ERC-721'],
    category: 'Blockchain',
    thumbnail: IMAGE_BASE + 'nft.jpg',
    mdxUrl:
      IPFS_GATEWAY +
      'bafkreiaje6weafi63k47xebi77kui7b6aaecqsabi47qrnjhvcqyfqawfm',
  },
  {
    title: '코레일 홈페이지 리뉴얼에 대응하기',
    path: '/post/korailReserve',
    slug: 'korailReserve',
    date: '2025-07-17',
    summary:
      '2024년 6월, 코레일 홈페이지가 대대적으로 리뉴얼되면서 기존 KTX 자동 예매 크롤러가 동작하지 않게 되었습니다.',
    tags: ['KTX', 'Selenium', '웹 크롤링', '자동화'],
    category: 'Dev',
    thumbnail:
      IMAGE_BASE +
      '%E1%84%92%E1%85%B4%E1%86%AB%E1%84%83%E1%85%AE%E1%86%BC%E1%84%8B%E1%85%B5.jpg',
    mdxUrl:
      IPFS_GATEWAY +
      'bafkreiflua3rawazx6fm4ow3e5jqtlvtlymlxxa5vukptxtmfozfalw3x4',
  },
  {
    title: '블록체인 위에서 돌아가는 자동화된 계약, 스마트컨트랙트',
    path: '/post/smartContract',
    slug: 'smartContract',
    date: '2025-07-18',
    summary:
      '중간 기관이나 제3자 없이도 신뢰할 수 있는 거래를 가능하게 하는 이 혁신적인 기술',
    tags: ['스마트컨트랙트', '블록체인', 'Web3', '자동화', '탈중앙화'],
    category: 'Blockchain',
    thumbnail: IMAGE_BASE + 'smartContract.jpg',
    mdxUrl:
      IPFS_GATEWAY +
      'bafkreihm5vshmbdmecnxwj7vvhfmfwdfisiig3wxpq3hmgsckfimmaa6gq',
  },
];

postsMeta = postsMeta.map((post, idx, arr) => ({
  ...post,
  prevPost:
    idx > 0
      ? {
          slug: arr[idx - 1].slug,
          title: arr[idx - 1].title,
          path: arr[idx - 1].path,
        }
      : null,
  nextPost:
    idx < arr.length - 1
      ? {
          slug: arr[idx + 1].slug,
          title: arr[idx + 1].title,
          path: arr[idx + 1].path,
        }
      : null,
}));
