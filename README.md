블록체인과 IPFS를 활용한 탈중앙화 블로그 플랫폼입니다.

## 주요 기능

- **IPFS 기반 콘텐츠 저장**: 블로그 글을 IPFS에 저장하여 분산화
- **스마트컨트랙트 기반 메타데이터 관리**: 글의 CID를 이더리움 스마트컨트랙트에 등록
- **반응형 디자인**: 모바일과 데스크톱에 최적화된 UI
- **카테고리별 분류**: CS, Backend, Blockchain, Java, Go, Dev 카테고리 지원
- **다양한 뷰 모드**: 카드형과 썸네일형 뷰 지원

## 기술 스택

### Frontend

- **Next.js 14** (App Router)
- **React 18** (TypeScript)
- **Tailwind CSS** (스타일링)
- **MDX** (마크다운 + JSX)

### Blockchain & Web3

- **Ethers.js** (이더리움 연동)
- **MetaMask** (지갑 연결)
- **IPFS** (분산 저장소)
- **Sepolia Testnet** (스마트컨트랙트 배포)

### 개발 도구

- **TypeScript** (타입 안정성)
- **ESLint** (코드 품질)
- **Vercel** (배포)

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── post/[slug]/       # 블로그 포스트 페이지
│   │   ├── ClientMdxLoader.tsx  # MDX 로더 (리팩토링 완료)
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/            # React 컴포넌트
│   ├── BlogHome.tsx      # 블로그 홈 (리팩토링 완료)
│   ├── BlogRegistryUI.tsx # 블록체인 연동 UI (리팩토링 완료)
│   ├── DynamicMdxViewer.tsx
│   ├── mdx-components.tsx
│   ├── postsMeta.ts      # 포스트 메타데이터 (타입 통합)
│   └── [기타 컴포넌트들]
├── contracts/            # 스마트컨트랙트 관련
│   └── blogRegistry.ts   # 블로그 레지스트리 컨트랙트
├── types/               # TypeScript 타입 정의 (신규)
│   ├── index.ts         # 공통 타입 정의
│   └── LogicGates.ts
├── utils/               # 유틸리티 함수 (신규)
│   ├── blockchain.ts    # 블록체인 연동 유틸리티
│   ├── styles.ts        # 스타일 유틸리티
│   └── metadata.ts
└── styles/              # 글로벌 스타일
    └── globals.css
```

## 블록체인 연동

### IPFS 연동

- Pinata IPFS 서비스 사용
- CID 기반 콘텐츠 조회
- 분산 저장소 활용

## 다음 단계

- [ ] 무결성 검증 로직 구현
- [ ] 사용자 인증 시스템
- [ ] 댓글 시스템
- [ ] SEO 최적화
- [ ] 성능 모니터링

## 📄 라이선스

MIT License
