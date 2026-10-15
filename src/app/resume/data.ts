// 이력서·포트폴리오 내용. 2024.03 이력서·포트폴리오 PDF와 이 블로그에 기록된 활동에서만 옮긴다.
// 화면은 page.tsx가 그린다.

export type Link = { label: string; href: string };

export type Profile = {
  name: string;
  role: string;
  photo: string;
  intro: readonly string[];
  contacts: readonly Link[];
};

export type SkillGroup = { label: string; items: string; primary?: boolean };

export type TimelineItem = {
  period: string;
  title: string;
  sub?: string;
  detail?: string;
};

export type Project = {
  name: string;
  kind: string;
  period: string;
  summary: string;
  stack: string;
  did: readonly string[];
  solved?: readonly { title: string; body: string }[];
  links?: readonly Link[];
  images?: readonly ProjectImage[];
};

// width·height가 없으면 원본 비율 그대로 그린다(GIF).
export type ProjectImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export const PROFILE: Profile = {
  name: '신동현',
  role: '백엔드 개발자',
  photo:
    'https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/A64D1C12-596E-4016-8EB5-063B2BA1DEBE_1_201_a-Photoroom.png',
  intro: [
    '사용자 중심의 기능 개발을 즐기는 백엔드 개발자입니다.',
    '이슈를 끝까지 파고들어 해결하고, 그 과정을 글로 남깁니다.',
    '서비스가 어떤 구조 위에서 돌아가는지, 그 구조가 비용과 안정성에 어떤 영향을 주는지 고민합니다.',
  ],
  contacts: [
    { label: 'GitHub', href: 'https://github.com/donghyeun02' },
    { label: 'Blog', href: 'https://www.donghyeun02.com' },
    { label: 'Velog', href: 'https://velog.io/@bandh/posts' },
  ],
};

// 주력 스택은 primary로 맨 위에 따로 강조하고, 아래 줄에서는 겹치지 않게 뺀다.
export const SKILLS: readonly SkillGroup[] = [
  { label: '주력', items: 'Node.js · Express · MySQL', primary: true },
  { label: '언어', items: 'JavaScript · TypeScript · Java' },
  { label: '프레임워크', items: 'Fastify · Spring Boot · Next.js' },
  { label: 'DB', items: 'PostgreSQL · Prisma' },
  {
    label: '인프라',
    items:
      'AWS(EC2 · RDS · ALB · Lambda · CloudWatch) · Naver Cloud · Docker · Kubernetes(K3s · NKS)',
  },
];

export const EXPERIENCE: readonly TimelineItem[] = [
  {
    period: '2027.01',
    title: '아이지니',
    sub: '현장실습 · 1개월 (예정)',
    detail:
      '네이버 클라우드 플랫폼 상위 등급 파트너사에서 클라우드 실무 현장실습',
  },
  {
    period: '2023.07 — 08',
    title: '인티그레이션',
    sub: '백엔드 인턴',
    detail:
      'OpenAI를 활용한 한의원 비즈니스 컨설팅 서비스 개발 · Node.js, Fastify, PostgreSQL, Prisma',
  },
];

export const EDUCATION: readonly TimelineItem[] = [
  {
    period: '2026.08',
    title: '네이버클라우드 아카데미 심화 과정',
    sub: '최우수 수료',
    detail:
      'VPC·방화벽부터 Docker, K3s, 관리형 쿠버네티스(NKS)까지 6일 과정 · NCP(Naver Cloud Platform Certified Professional) 자격 취득',
  },
  {
    period: '2025.11',
    title: '네이버 클라우드 소버린 AI 과정',
    detail: 'NCP 기반 AI API(Papago, CLOVA OCR·Speech, HyperCLOVA X) 실습',
  },
  {
    period: '2023.04 — 10',
    title: 'Wecode 부트캠프',
    detail: '팀 프로젝트 2개와 4주 기업 협업 인턴십',
  },
  {
    period: '2021.03 —',
    title: '영남대학교',
    sub: '컴퓨터공학과',
  },
];

export const ACTIVITIES: readonly TimelineItem[] = [
  {
    period: '2026.09',
    title: 'skill-kit 공개',
    detail:
      'Claude Code 플러그인 4종 — 글결 윤문(gyeol), 보안 하드닝, 게임 레퍼런스, 강의 요약',
  },
  {
    period: '2026.05',
    title: 'everything-claude-code 오픈소스 기여',
    detail: 'prisma-patterns 스킬 PR merge',
  },
  {
    period: '2024.08',
    title: '인프콘 2024 서포터',
    detail: '인프런 주최 개발자 컨퍼런스 세션 운영 지원',
  },
];

// 최신순. 이미지는 2024 포트폴리오 PDF와 블로그에서 가져온 실제 화면이다.
export const PROJECTS: readonly Project[] = [
  {
    name: '이 블로그',
    kind: '개인 프로젝트',
    period: '2025.06 —',
    summary:
      '글을 IPFS와 블록체인에 남기는 블로그에서 시작해, 직접 만든 도구들을 얹어 가는 개인 사이트',
    stack: 'Next.js · TypeScript · MDX · React Flow · IPFS · Polygon · Vercel',
    did: [
      '글 원본을 IPFS에 올리고 CID를 Polygon 스마트 컨트랙트에 기록해 무결성을 검증하게 했습니다.',
      '논리 게이트·HTTP 흐름 같은 인터랙티브 위젯을 글 안에 넣고, 지연 로딩으로 글 페이지 자바스크립트를 476KB에서 176KB로 줄였습니다.',
      'ERD·아키텍처·흐름도를 그리는 다이어그램 스튜디오를 만들고, 글 속 도면 17장을 움직이는 도면으로 바꿨습니다.',
    ],
    solved: [
      {
        title: '보안 하드닝',
        body: '레드팀이 찾고 검증된 것만 블루팀이 고치는 사이클을 돌려 보안 점수를 62에서 99로 올렸습니다. 경로 탈출 취약점을 고치고 보안 헤더를 세웠습니다.',
      },
    ],
    links: [
      { label: '로그', href: '/log' },
      { label: '하드닝 글', href: '/post/hardening' },
    ],
    images: [
      {
        src: '/images/resume/blog-studio.png',
        alt: '직접 만든 다이어그램 스튜디오',
        width: 1440,
        height: 860,
      },
    ],
  },
  {
    name: 'KTX 자동 예매',
    kind: '개인 프로젝트',
    period: '2024.04 —',
    summary: '원하는 시간대의 KTX 잔여석을 감시하다 자동으로 예매하는 크롤러',
    stack: 'Java · Spring Boot · Selenium · Swagger',
    did: [
      'Selenium으로 로그인부터 조회·예매까지 자동화하고, 서버 배포를 위해 헤드리스 모드를 지원했습니다.',
      'KTX-산천에서만 뜨는 모달처럼 차종별 예외 흐름을 처리했습니다.',
      'Swagger로 예매 API를 문서화해 브라우저에서 바로 실행할 수 있게 했습니다.',
    ],
    solved: [
      {
        title: '코레일 홈페이지 리뉴얼 대응',
        body: '2024년 6월 리뉴얼로 기존 셀렉터가 전부 무효화됐습니다. 동적 모달·로딩을 기다리는 로직을 넣고, 한 클래스에 몰려 있던 코드를 Controller·Service·Util로 나눠 다시 구현했습니다.',
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/donghyeun02/KTX_auto_reserve',
      },
      { label: '리뉴얼 대응 글', href: '/post/korailReserve' },
    ],
    images: [
      {
        src: 'https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/korailreserve.gif',
        alt: 'Swagger에서 예매를 실행하는 모습',
      },
    ],
  },
  {
    name: '스케줄 헬퍼',
    kind: '개인 프로젝트 · 1인 개발',
    period: '2023.09 — 2024.01',
    summary: '구글 캘린더 일정을 슬랙으로 알려주는 일정 관리·알림 서비스',
    stack:
      'Node.js · Express · MySQL · AWS(EC2, RDS, ALB, Lambda, CloudWatch) · Docker',
    did: [
      'Google OAuth 2.0으로 로그인을 구현하고, 슬랙 ID·팀 ID와 함께 인증해 슬랙 앱에서 바로 쓸 수 있게 했습니다.',
      'Google Calendar 웹훅으로 캘린더를 구독해 일정 등록·변경·삭제를 슬랙 채널로 실시간 알렸습니다.',
      'node-schedule로 사용자가 정한 시간에 그날 일정을 보내는 리마인더를 만들었습니다.',
      'Lambda와 CloudWatch로 일정 시작 15분 전 알림을 서버리스로 분리했습니다.',
    ],
    solved: [
      {
        title: 'Lambda의 인터넷 연결',
        body: 'Lambda용 VPC를 새로 만들고 서브넷을 나눠, Google·Slack API처럼 인터넷이 필요한 호출은 Public, RDS 접근은 Private 서브넷으로 분리했습니다.',
      },
      {
        title: 'NAT Gateway 비용',
        body: '트래픽이 적은데도 NAT Gateway가 15일에 $20.43 나왔습니다. 프리티어 EC2에 iptables로 NAT 인스턴스를 구성해 한 달 기준 $32.4에서 $4.2로 줄였습니다.',
      },
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/donghyeun02/schedule-helper',
      },
      { label: 'NAT 비용 글', href: '/post/NATInstance' },
    ],
    images: [
      {
        src: '/images/resume/schedule-architecture.png',
        alt: '서버 아키텍처',
        width: 1252,
        height: 948,
      },
      {
        src: '/images/resume/schedule-slack.png',
        alt: '슬랙으로 오는 일정 등록·변경·삭제 알림',
        width: 940,
        height: 590,
      },
      {
        src: '/images/resume/schedule-nat-cost.png',
        alt: 'NAT Gateway 비용 — 15일에 $20.43',
        width: 3034,
        height: 1096,
      },
    ],
  },
  {
    name: '알고봇',
    kind: '인턴십 프로젝트 · 백엔드 2명',
    period: '2023.07 — 08',
    summary:
      'AI로 한의원 데이터를 분석해 운영 피드백을 주는 비즈니스 컨설팅 서비스',
    stack:
      'Node.js · Fastify · PostgreSQL · Prisma · OpenAI(gpt-3.5-turbo-16k) · Swagger',
    did: [
      '한의원 데이터를 GPT에 넣어 분석과 피드백 질문 10개씩을 생성하고 DB에 저장했습니다.',
      '사용자·기간 조건으로 이전에 생성된 피드백을 조회하는 API를 만들었습니다.',
      '요청·응답 스키마에서 Swagger 문서를 자동 생성해 수동 문서 관리를 없앴습니다.',
    ],
    solved: [
      {
        title: 'GPT 입력 데이터 형식',
        body: '객체 형식으로 넘기자 분석과 질문이 같은 문장으로 반복됐습니다. 데이터를 CSV 텍스트로 바꿔 전달해 해결했습니다.',
      },
    ],
    links: [{ label: 'Swagger 글', href: '/post/FastifySwagger' }],
    images: [
      {
        src: '/images/resume/algobot-output.png',
        alt: 'GPT가 생성한 분석 10개와 피드백 질문',
        width: 2076,
        height: 620,
      },
      {
        src: '/images/resume/algobot-swagger.png',
        alt: '자동 생성된 Swagger 문서',
        width: 1272,
        height: 596,
      },
    ],
  },
];
