'use client';

import React from 'react';

interface Props {
  inputA: number;
  inputB: number;
}

export default function LogicXorGate({ inputA, inputB }: Props) {
  const output = inputA ^ inputB;
  const fillColor = output === 1 ? '#22c55e' : '#222';
  return (
    <svg width={180} height={120}>
      <path
        d="M 25 20 Q 55 60 25 100"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <path
        d="M 35 20 Q 65 60 35 100 Q 95 110 155 60 Q 95 10 35 20 Z"
        fill={fillColor}
        stroke="#fff"
        strokeWidth="2"
      />
      <text
        x={90}
        y={68}
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
