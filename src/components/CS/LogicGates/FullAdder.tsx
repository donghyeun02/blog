'use client';

import React from 'react';

interface FullAdderProps {
  inputA: number;
  inputB: number;
  inputCin: number;
  sumOutput?: number;
  coutOutput?: number;
}

export default function FullAdder({
  inputA,
  inputB,
  inputCin,
  sumOutput,
  coutOutput,
}: FullAdderProps) {
  const sum = sumOutput ?? inputA ^ inputB ^ inputCin;
  const cout =
    coutOutput ?? (inputA & inputB) | (inputB & inputCin) | (inputA & inputCin);

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
          FULL
        </tspan>
        <tspan x={90} dy="20">
          ADDER
        </tspan>
      </text>

      <text
        x={25}
        y={69}
        fontSize="10"
        fill={inputA === 1 ? '#4ade80' : '#fff'}
        fontWeight="bold"
        textAnchor="start"
      >
        A
      </text>

      <text
        x={25}
        y={114}
        fontSize="10"
        fill={inputB === 1 ? '#4ade80' : '#fff'}
        fontWeight="bold"
        textAnchor="start"
      >
        B
      </text>

      <text
        x={25}
        y={159}
        fontSize="10"
        fill={inputCin === 1 ? '#4ade80' : '#fff'}
        fontWeight="bold"
        textAnchor="start"
      >
        Cin
      </text>

      <text
        x={133}
        y={82}
        fontSize="10"
        fill={sum ? '#4ade80' : '#fff'}
        fontWeight="bold"
        textAnchor="start"
      >
        Sum
      </text>

      <text
        x={133}
        y={144}
        fontSize="10"
        fill={cout ? '#4ade80' : '#fff'}
        fontWeight="bold"
        textAnchor="start"
      >
        Cout
      </text>
    </svg>
  );
}
