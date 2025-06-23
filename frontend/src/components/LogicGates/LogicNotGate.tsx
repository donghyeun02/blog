'use client';

import React from 'react';

interface Props {
  input: number;
}

export default function LogicNotGate({ input }: Props) {
  const output = input ? 0 : 1;
  return (
    <svg width={210} height={180}>
      <path
        d="M 40 20 L 40 100 L 90 60 M 90 60 C 90 69 104 69 104 60 C 104 51 90 51 90 60"
        fill="#222"
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
