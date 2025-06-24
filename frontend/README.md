## 🧭 프로젝트 소개

**인터랙티브 기술 블로그**를 목표로 하는 프로젝트입니다. 논리회로(AND, OR, NOT 등) 시뮬레이터를 시작으로, 백엔드/CS/데이터 등 다양한 실습형 콘텐츠를 MDX 기반으로 확장을 목표로 합니다.

- **Next.js + TypeScript + Tailwind CSS + MDX** 기반
- `.mdx` 파일로 글을 작성하고, 실습 컴포넌트를 직접 포함
- **react-flow**로 자유롭게 게이트/노드 배치 및 신호 시뮬레이션
- **CLI 자동화**로 글 생성 및 폴더 구조 관리

---

## 📁 폴더 구조

```
frontend/
  src/
    app/
      mdx/
        [post_title]/
          content.mdx   # 글 본문 (MDX)
          page.tsx      # 글 페이지
    components/
      LogicGates/      # 게이트별 컴포넌트 (AND, OR, NOT 등)
      LogicGateSimulator.tsx  # 시뮬레이터 메인
      mdx-components.tsx      # MDX용 컴포넌트 매핑
    types/             # 타입 명세
  scripts/
    create-post.js     # 글 생성 CLI
  README.md
```

---

## 주요 기능

- **실습형 MDX 블로그**: 글과 실습 컴포넌트(논리 게이트 등)를 함께 작성
- **논리 게이트 시뮬레이터**: AND, OR, NOT 등 게이트를 자유롭게 배치/연결/실행
- **신호 전파(Propagation)**: 여러 단계 게이트 연결도 정확히 시뮬레이션
- **SVG 기반 커스텀 UI**: 전통적인 논리회로 실루엣, 직관적 입출력 단자
- **CLI 자동화**: `npm run create-post [slug]`로 새 글/폴더 자동 생성
- **Git Flow 브랜치 전략**: main → develop → feature/\*

---

## 🧩 앞으로의 발전 방향

- **게이트 컴포넌트 구조화**: LogicAndGate.tsx, LogicOrGate.tsx 등 완전 분리, Simulator는 배치/연결/신호전파만 담당
- **게이트 확장**: XOR, NAND, XNOR 등 추가, 공통 로직 추상화
- **MDX 실습 확장**: REST API, JSON 파싱, Git 시뮬레이터 등 다양한 실습형 컴포넌트 도입
- **공통 UI 컴포넌트화**: Button, Toggle 등 라이브러리화
- **문서화 자동화**: MDX 메타데이터 기반 목록/최근글 자동화

---

## 🙌 기여/문의

- 개선 아이디어, 버그 제보, PR 모두 환영합니다!
- 기술/구조/UX 관련 질문은 언제든 이슈로 남겨주세요.
