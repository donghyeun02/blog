import { getBezierPath, EdgeProps } from 'reactflow';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });
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
