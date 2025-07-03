import { getBezierPath, EdgeProps, Position } from 'reactflow';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps) {
  // 베지어 곡선으로 더 자연스러운 연결선 생성
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  });
  const isActive = data?.active;

  return (
    <g>
      <defs>
        <linearGradient
          id={`edge-gradient-${id}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={isActive ? '#22c55e' : '#aaa'} />
          <stop offset="100%" stopColor={isActive ? '#bbf7d0' : '#aaa'} />
        </linearGradient>
      </defs>
      <path
        id={id}
        d={edgePath}
        stroke={`url(#edge-gradient-${id})`}
        strokeWidth={4}
        fill="none"
        style={{
          strokeDasharray: isActive ? '8 6' : '0',
          animation: isActive ? 'dashmove 1s linear infinite' : 'none',
        }}
      />
      {/* 출력용: SVG path를 시각적으로 확인할 수 있도록 title 추가 */}
      <title>{edgePath}</title>
      <style>
        {`
          @keyframes dashmove {
            to {
              stroke-dashoffset: -14;
            }
          }
        `}
      </style>
    </g>
  );
}
