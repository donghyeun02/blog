'use client';

import React from 'react';

interface Props {
  inputA: number;
  inputB: number;
}

export default function LogicXorGate({ inputA, inputB }: Props) {
  const output = inputA ^ inputB;
  return (
    <svg width={180} height={120}>
      <path
        d="M 22 20 L 28 20 C 47 63 47 57 28 100 L 22 100 C 41 58 41 62 22 20"
        fill="#222"
        stroke="#fff"
        strokeWidth="2"
      />
      <path
        d="M 95 100 C 125 95 145 75 150 61 C 145 45 125 25 95 20 L 30 20 Q 62 60 30 100 Z"
        fill="#222"
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
