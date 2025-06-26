'use client';

import React from 'react';
import { UnaryGateProps } from '@/types/LogicGates';

export default function LogicNotGate({ input }: UnaryGateProps) {
  const output = input ? 0 : 1;
  const fillColor = output === 1 ? '#22c55e' : '#222';
  return (
    <svg width={210} height={180}>
      <path
        d="M 40 20 L 40 100 L 90 60 M 90 60 C 90 69 104 69 104 60 C 104 51 90 51 90 60"
        fill={fillColor}
        stroke="#fff"
        strokeWidth="2"
      />
      <text
        x={57}
        y={60}
        fontSize="28"
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
