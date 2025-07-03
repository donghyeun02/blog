'use client';

import React from 'react';

interface HalfAdderProps {
  inputA: number;
  inputB: number;
  sumOutput?: number;
  carryOutput?: number;
}

export default function HalfAdder({
  inputA,
  inputB,
  sumOutput,
  carryOutput,
}: HalfAdderProps) {
  const sum = sumOutput ?? inputA ^ inputB; // XOR
  const carry = carryOutput ?? inputA & inputB; // AND

  return (
    <svg width={210} height={180}>
      <rect x="20" y="40" width="140" height="200" fill="#222" />

      <text
        x={105}
        y={85}
        fontSize="18"
        fill="#fff"
        fontWeight="bold"
        textAnchor="middle"
      >
        <tspan x={90} dy="20">
          HALF
        </tspan>
        <tspan x={90} dy="20">
          ADDER
        </tspan>
      </text>

      <text
        x={25}
        y={83}
        fontSize="10"
        fill={inputA === 1 ? '#4ade80' : '#fff'}
        fontWeight="bold"
        textAnchor="start"
      >
        A
      </text>

      <text
        x={25}
        y={144}
        fontSize="10"
        fill={inputB === 1 ? '#4ade80' : '#fff'}
        fontWeight="bold"
        textAnchor="start"
      >
        B
      </text>
      <text
        x={133}
        y={82}
        fontSize="10"
        fill={sum === 1 ? '#4ade80' : '#fff'}
        fontWeight="bold"
        textAnchor="start"
      >
        Sum
      </text>

      <text
        x={128}
        y={144}
        fontSize="10"
        fill={carry === 1 ? '#4ade80' : '#fff'}
        fontWeight="bold"
        textAnchor="start"
      >
        Carry
      </text>
    </svg>
  );
}
