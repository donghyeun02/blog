# donghyeun02.com

직접 만든 도구를 하나씩 얹어 가는 개인 사이트입니다.
글 원본을 IPFS에 올리고 그 CID를 Polygon 컨트랙트에 기록하는 블로그에서 시작했습니다.

→ [donghyeun02.com](https://www.donghyeun02.com)

## 이 레포에서 볼 만한 것

**하드닝 사이클** — 자체 기준 보안 점수 **62 → 99**

- 레드팀이 찾고, 검증을 통과한 것만 블루팀이 고치는 `/harden` 사이클을 이 사이트에 돌렸습니다.
- 코드를 고치기 전에 제안서부터 남깁니다.
- [점수표](docs/hardening/scoreboard.md) · [제안서](docs/hardening/proposals) · [글](https://www.donghyeun02.com/post/hardening)

**인터랙티브 위젯** — 글 페이지 JS **476KB → 176KB**

- 논리 게이트·HTTP 흐름 같은 위젯을 글 안에 넣고, 지연 로딩합니다.

**다이어그램 스튜디오** — 글 속 도면 **17장**을 움직이는 도면으로 교체

- 구성도·ERD·흐름도를 그리는 `/studio` 편집기입니다.
- 글 안의 도면도 같은 렌더러를 읽기 전용으로 씁니다. · [문서](docs/studio/README.md)

**무결성 검증**

- 글 원본은 IPFS(Pinata)에, CID는 Polygon 컨트랙트에 기록합니다.
- `/contract/registry`에서 확인할 수 있습니다.

## 하드닝 기록

| Cycle | Date | Dim | Score (자체 기준) | Δ |
|---|---|---|---|---|
| 1 | 2026-06-04 | security | 62 → 99 | +37 |

1회차에 고친 것

- 경로 탈출 (Critical)
- 공개 접두사 시크릿, XSS 싱크, 보안 헤더 (Medium)
- 죽은 코드 (Low)

CSP는 런타임 검증이 필요해 다음 사이클로 넘겼습니다.

## 기술 스택

- **Next.js 16** (App Router) · **React 19** · **TypeScript** · **MDX**
- **React Flow** (다이어그램 스튜디오)
- **IPFS** (Pinata) · **Polygon** · **Ethers.js**
- **Vercel**

## 실행

```bash
npm install
npm run dev          # 개발 서버
npm run type-check   # tsc
npm run lint         # ESLint
npm run build
```

블록체인 조회에는 `NEXT_PUBLIC_POLYGON_RPC_URL`이 필요합니다.

## 구조

```
src/
  app/
    post/[slug]/      글 페이지
    posts/  log/  about/  resume/
    studio/           다이어그램 편집기
    contract/registry CID 무결성 확인
  components/
    mdx/              글 안 인터랙티브 위젯
    studio/           편집기·뷰어·노드
  utils/blockchain.ts Polygon 조회
docs/
  hardening/          하드닝 점수표와 사이클별 제안서
  studio/             아이콘·예시 생성 스크립트
scripts/              MDX 다운로드 등
```

## 라이선스

MIT License
