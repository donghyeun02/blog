'use client';

import React from 'react';
import { BinaryGateProps } from '@/types/LogicGates';

export default function LogicAndGate({ inputA, inputB }: BinaryGateProps) {
  const output = inputA & inputB;
  const fillColor = output === 1 ? '#22c55e' : '#222';

  return (
    <svg width={180} height={120}>
      <path
        d="M 30 20 H 110 C 130 20 145 45 145 60 C 145 75 130 100 110 100 H 30 Z"
        fill={fillColor}
        stroke="#fff"
        strokeWidth="2"
      />
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
