'use client';

import React from 'react';
import { BinaryGateProps } from '@/types/LogicGates';

export default function LogicXnorGate({ inputA, inputB }: BinaryGateProps) {
  const output = inputA ^ inputB ? 0 : 1;
  const fillColor = output === 1 ? '#22c55e' : '#222';
  return (
    <svg width={180} height={120}>
      <path
        d="M 22 20 L 28 20 C 47 63 47 57 28 100 L 22 100 C 41 58 41 62 22 20"
        fill={fillColor}
        stroke="#fff"
        strokeWidth="2"
      />
      <path
        d="M 95 100 C 125 95 145 75 150 61 C 145 45 125 25 95 20 L 30 20 Q 62 60 30 100 Z"
        fill={fillColor}
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="157" cy="60" r="8" fill={fillColor} />
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
