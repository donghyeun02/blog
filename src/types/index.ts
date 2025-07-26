// 블로그 포스트 메타데이터 타입
export interface PostMeta {
  title: string;
  path: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  category: string;
  thumbnail?: string;
  prevPost?: {
    slug: string;
    title: string;
    path: string;
  } | null;
  nextPost?: {
    slug: string;
    title: string;
    path: string;
  } | null;
}

// 이더리움 관련 타입
export interface EthereumProvider {
  request: (args: { method: string }) => Promise<unknown>;
}

export interface EthereumWindow extends Window {
  ethereum?: EthereumProvider;
}

// 블록체인 연동 관련 타입
export interface BlockchainError {
  message: string;
  code?: string;
}

// UI 상태 타입
export type ViewType = 'card' | 'thumbnail';
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
