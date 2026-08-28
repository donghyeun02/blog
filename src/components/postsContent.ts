import type { ComponentType } from 'react';

// slug -> 컴파일된 MDX 모듈.
// 템플릿 리터럴로 import하면 번들러가 컨텍스트 모듈을 만들어 모든 글을 한
// 청크에 묶는다. 글마다 별도 청크로 쪼개려면 이렇게 명시적으로 적어야 한다.
export const postsContent: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  FastifySwagger: () => import('@/app/local-mdx/FastifySwagger.mdx'),
  NATInstance: () => import('@/app/local-mdx/NATInstance.mdx'),
  binary: () => import('@/app/local-mdx/binary.mdx'),
  calculator: () => import('@/app/local-mdx/calculator.mdx'),
  dhcp: () => import('@/app/local-mdx/dhcp.mdx'),
  dockerNetwork: () => import('@/app/local-mdx/dockerNetwork.mdx'),
  eccOpensource: () => import('@/app/local-mdx/eccOpensource.mdx'),
  floatingpoint: () => import('@/app/local-mdx/floatingpoint.mdx'),
  hardening: () => import('@/app/local-mdx/hardening.mdx'),
  immutability: () => import('@/app/local-mdx/immutability.mdx'),
  k3sAgentJoin: () => import('@/app/local-mdx/k3sAgentJoin.mdx'),
  korailReserve: () => import('@/app/local-mdx/korailReserve.mdx'),
  languagePerformance: () => import('@/app/local-mdx/languagePerformance.mdx'),
  naclAcg: () => import('@/app/local-mdx/naclAcg.mdx'),
  ncpNetwork: () => import('@/app/local-mdx/ncpNetwork.mdx'),
  ncpProfessional: () => import('@/app/local-mdx/ncpProfessional.mdx'),
  nft: () => import('@/app/local-mdx/nft.mdx'),
  nodeVersion: () => import('@/app/local-mdx/nodeVersion.mdx'),
  sample: () => import('@/app/local-mdx/sample.mdx'),
  smartContract: () => import('@/app/local-mdx/smartContract.mdx'),
  'trust-your-server': () => import('@/app/local-mdx/trust-your-server.mdx'),
  windowEthereum: () => import('@/app/local-mdx/windowEthereum.mdx'),
  whyTechBlog: () => import('@/app/local-mdx/whyTechBlog.mdx'),
};
