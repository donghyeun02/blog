import { getSmoothStepPath, EdgeProps } from 'reactflow';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps) {
  // Y좌표 차이가 8px 이하이면 완전 직선, 그 외에는 부드러운 곡선
  const isPerfectlyStraight = Math.abs(sourceY - targetY) < 8;
  const edgePath = isPerfectlyStraight
    ? `M${sourceX},${sourceY} L${targetX},${targetY}`
    : getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        borderRadius: 20,
        offset: 0,
      })[0];
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
