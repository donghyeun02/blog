'use client';

import React from 'react';
import { BinaryGateProps } from '@/types/LogicGates';

export default function LogicNorGate({ inputA, inputB }: BinaryGateProps) {
  const output = inputA | inputB ? 0 : 1;
  const fillColor = output === 1 ? '#22c55e' : '#222';
  return (
    <svg width={180} height={120}>
      <path
        d="M 95 100 C 125 95 145 75 150 61 C 145 45 125 25 95 20 L 30 20 Q 62 60 30 100 Z"
        fill={fillColor}
        stroke="#fff"
        strokeWidth="2"
      />
      <circle
        cx="160"
        cy="60"
        r="8"
        fill={fillColor}
        stroke="#fff"
        strokeWidth="2"
      />
      <text
        x={85}
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
