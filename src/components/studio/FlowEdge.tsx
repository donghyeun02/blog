'use client';

import {
  BaseEdge,
  EdgeLabelRenderer,
  Position,
  getSmoothStepPath,
  type EdgeProps,
} from '@xyflow/react';
import { usePlayback } from './playback';
import type { Cardinality, FlowEdgeType } from './types';

const INK = '#1D1D1F';
const ACTIVE = '#1E88E5';
const MUTED = '#C7C7CC';
const BLOCKED = '#D93025';
const PACKET_SECONDS = 1.6;

const END_MARKS: Partial<Record<Cardinality, [string, string]>> = {
  '1:1': ['1', '1'],
  '1:N': ['1', 'N'],
  'N:M': ['N', 'M'],
};

// 관계 표기(1, N)를 선 끝에서 조금 떨어뜨려 놓는다.
function nearEnd(x: number, y: number, position: Position): [number, number] {
  const gap = 14;
  switch (position) {
    case Position.Left:
      return [x - gap, y - 9];
    case Position.Right:
      return [x + gap, y - 9];
    case Position.Top:
      return [x + 9, y - gap];
    default:
      return [x + 9, y + gap];
  }
}

const place = (x: number, y: number) => ({
  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
});

export function FlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
  selected,
}: EdgeProps<FlowEdgeType>) {
  const { mode, activeStep, reducedMotion } = usePlayback();
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 10,
  });

  const step = data?.step;
  const hasStep = typeof step === 'number';
  const blocked = !!data?.blocked;
  const isCurrent = mode === 'steps' && hasStep && step === activeStep;
  const isDimmed = mode === 'steps' && !isCurrent;
  const isFlowing =
    !reducedMotion &&
    (isCurrent || (mode === 'continuous' && !!data?.animated));
  const stroke = selected
    ? ACTIVE
    : blocked
      ? BLOCKED
      : isCurrent
        ? ACTIVE
        : isDimmed
          ? MUTED
          : INK;
  const marks = data?.cardinality ? END_MARKS[data.cardinality] : undefined;
  // 연속 흐름에서는 패킷 둘을 반 박자 어긋나게 보낸다. 음수 begin은 이미 출발한 것처럼 시작한다.
  const offsets = isCurrent || blocked ? [0] : [0, PACKET_SECONDS / 2];
  const showLabel = !!data?.label || hasStep || blocked;

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={{
          stroke,
          strokeWidth: isCurrent ? 2 : 1.4,
          strokeDasharray: blocked ? '5 4' : data?.dashed ? '6 5' : undefined,
          opacity: blocked && isDimmed ? 0.5 : 1,
          transition: 'stroke 200ms, opacity 200ms',
        }}
      />
      {isFlowing ? (
        <g
          key={isCurrent ? `step-${activeStep}` : 'continuous'}
          className="studio-packets"
        >
          {offsets.map((offset) => (
            <circle
              key={offset}
              r={isCurrent ? 4.5 : 3.5}
              fill={blocked ? BLOCKED : ACTIVE}
            >
              {blocked ? (
                // 막힌 선은 패킷이 가운데까지만 가다 사라진다 — 도중에 버려지는 장면이다.
                <>
                  <animateMotion
                    dur={`${PACKET_SECONDS}s`}
                    repeatCount="indefinite"
                    path={path}
                    keyPoints="0;0.5"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0"
                    keyTimes="0;0.75;1"
                    dur={`${PACKET_SECONDS}s`}
                    repeatCount="indefinite"
                  />
                </>
              ) : (
                <animateMotion
                  dur={`${PACKET_SECONDS}s`}
                  begin={`-${offset}s`}
                  repeatCount="indefinite"
                  path={path}
                />
              )}
            </circle>
          ))}
        </g>
      ) : null}
      <EdgeLabelRenderer>
        {showLabel ? (
          <div
            className={`studio-edge-label nodrag nopan ${isDimmed ? 'is-dimmed' : ''} ${blocked ? 'is-blocked' : ''}`}
            style={place(labelX, labelY)}
          >
            {hasStep ? (
              <span className={`studio-step ${isCurrent ? 'is-current' : ''}`}>
                {step}
              </span>
            ) : null}
            {blocked ? (
              <span className="studio-blocked" aria-label="막힘">
                ✕
              </span>
            ) : null}
            {data?.label ? <span>{data.label}</span> : null}
          </div>
        ) : null}
        {marks ? (
          <>
            <div
              className="studio-card nodrag nopan"
              style={place(...nearEnd(sourceX, sourceY, sourcePosition))}
            >
              {marks[0]}
            </div>
            <div
              className="studio-card nodrag nopan"
              style={place(...nearEnd(targetX, targetY, targetPosition))}
            >
              {marks[1]}
            </div>
          </>
        ) : null}
      </EdgeLabelRenderer>
    </>
  );
}
