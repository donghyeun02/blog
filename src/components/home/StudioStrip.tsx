import Link from 'next/link';

const ICON = 28;

// [x, y, 아이콘, 라벨] — 좌표는 아이콘 왼쪽 위
const NODES = [
  [8, 54, 'internet', '사용자'],
  [96, 54, 'load-balancer', 'LB'],
  [176, 30, 'server', 'API'],
  [176, 84, 'server', 'API'],
  [262, 54, 'cloud-db-for-mysql', 'DB'],
] as const;

const WIRES = [
  'M38 68H92',
  'M126 68H150V44H172',
  'M150 68V98H172',
  'M206 44H232V68H258',
  'M206 98H232V68',
];

// 홈 왼쪽 열에 놓는 스튜디오 입구. 스튜디오에서 만들 수 있는 도면 하나를 그대로 보여준다.
export default function StudioStrip() {
  return (
    <Link href="/studio" className="group block stack-sm">
      <div className="border border-[#E5E5EA] bg-white px-2 py-1 transition-[border-color] duration-150 group-hover:border-[#AEAEB2]">
        <svg
          viewBox="0 0 320 150"
          className="block h-auto w-full"
          role="img"
          aria-label="사용자에서 로드밸런서, API 서버 두 대, DB로 이어지는 아키텍처 다이어그램"
        >
          <defs>
            <marker
              id="studio-strip-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="#1D1D1F" />
            </marker>
          </defs>

          <rect
            x="70"
            y="12"
            width="244"
            height="130"
            rx="4"
            fill="#F7FBFF"
            stroke="#4A9BE8"
            strokeDasharray="4 3"
          />
          <text x="78" y="26" fontSize="9" fill="#4A9BE8" className="font-mono">
            VPC
          </text>

          <g fill="none" stroke="#1D1D1F" strokeWidth="1.2">
            {WIRES.map((d, i) => (
              <path
                key={d}
                d={d}
                markerEnd={i === 4 ? undefined : 'url(#studio-strip-arrow)'}
              />
            ))}
          </g>

          {NODES.map(([x, y, icon, label], i) => (
            <g key={i}>
              <image
                href={`/studio/icons/${icon}.png`}
                x={x}
                y={y}
                width={ICON}
                height={ICON}
              />
              <text
                x={x + ICON / 2}
                y={y + ICON + 12}
                fontSize="10"
                textAnchor="middle"
                fill="#3C3C43"
              >
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <p className="text-[13px] leading-snug text-[#6E6E73]">
        ERD, 아키텍처, 흐름도를 만드는 곳.{' '}
        <span className="whitespace-nowrap text-[#1D1D1F] underline underline-offset-2 transition-[color] duration-150 group-hover:text-[#6E6E73]">
          스튜디오 열기 →
        </span>
      </p>
    </Link>
  );
}
