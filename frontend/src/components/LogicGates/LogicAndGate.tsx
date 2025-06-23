'use client';

import React from 'react';

interface Props {
  inputA: number;
  inputB: number;
  svgWidth?: number;
  svgHeight?: number;
  gateX?: number;
}

export default function LogicAndGate({ inputA, inputB }: Props) {
  const output = inputA & inputB;
  const getColor = (v: number) => (v === 1 ? '#22c55e' : '#aaa'); // 초록 vs 회색

  // D자 형태: 왼쪽 세로, 위/아래 직선, 오른쪽 반원
  // 반원 중심(cx,cy): (gateX+100, 60), 반지름 60
  return (
    <svg width={180} height={120}>
      <path
        d="M 30 20 H 110 C 130 20 145 45 145 60 C 145 75 130 100 110 100 H 30 Z"
        fill="#222"
        stroke="#fff"
        strokeWidth="2"
      />
      <path d="M 32 20 L 32 100" stroke="#fff" strokeWidth="2" />
      {/* 내부 숫자 */}
      <text
        x={75}
        y={65}
        fontSize="32"
        fill="#fff"
        fontWeight="bold"
        textAnchor="middle"
        alignmentBaseline="middle"
        dominantBaseline="middle"
      >
        {output}
      </text>
    </svg>
  );
}
