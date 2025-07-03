'use client';

import LogicGateSimulator from './CS/LogicGateSimulator';
import {
  createGateSimulator,
  createAdderSimulator,
} from './CS/SimulatorFactory';
import React from 'react';
import type { MDXComponents } from 'mdx/types';
import HttpFlowDemo from './Backend/HttpFlowDemo';
import DecimalToBinaryConverter from './CS/DecimalToBinaryConverter';

const AndGateSimulator = createGateSimulator({
  type: 'and',
  inputs: [
    { value: 1, position: { x: 100, y: 160 } },
    { value: 0, position: { x: 100, y: 200 } },
  ],
  gatePosition: { x: 225, y: 140 },
  outputPosition: { x: 450, y: 180 },
});

const OrGateSimulator = createGateSimulator({
  type: 'or',
  inputs: [
    { value: 0, position: { x: 100, y: 160 } },
    { value: 1, position: { x: 100, y: 200 } },
  ],
  gatePosition: { x: 225, y: 140 },
  outputPosition: { x: 450, y: 180 },
});

const NotGateSimulator = createGateSimulator({
  type: 'not',
  inputs: [{ value: 1, position: { x: 100, y: 180 } }],
  gatePosition: { x: 225, y: 140 },
  outputPosition: { x: 450, y: 180 },
});

const XorGateSimulator = createGateSimulator({
  type: 'xor',
  inputs: [
    { value: 1, position: { x: 100, y: 160 } },
    { value: 0, position: { x: 100, y: 200 } },
  ],
  gatePosition: { x: 225, y: 140 },
  outputPosition: { x: 450, y: 180 },
});

const BufferGateSimulator = createGateSimulator({
  type: 'buffer',
  inputs: [{ value: 1, position: { x: 100, y: 180 } }],
  gatePosition: { x: 225, y: 140 },
  outputPosition: { x: 450, y: 180 },
});

function FreeSimulator() {
  return (
    <LogicGateSimulator
      showControls={true}
      height="600px"
      width="100%"
      interactive={true}
    />
  );
}

const HalfAdderSimulator = createAdderSimulator({
  type: 'halfAdder',
  inputs: [
    { value: 1, position: { x: 140, y: 200 } },
    { value: 0, position: { x: 140, y: 260 } },
  ],
  gatePosition: { x: 250, y: 140 },
  outputPositions: [
    { x: 450, y: 200 }, // Sum
    { x: 450, y: 260 }, // Carry
  ],
});

const FullAdderSimulator = createAdderSimulator({
  type: 'fullAdder',
  inputs: [
    { value: 1, position: { x: 140, y: 160 } },
    { value: 0, position: { x: 140, y: 200 } },
    { value: 1, position: { x: 140, y: 300 } },
  ],
  gatePosition: { x: 250, y: 140 },
  outputPositions: [
    { x: 450, y: 200 }, // Sum
    { x: 450, y: 260 }, // Cout
  ],
});

// 진리표 컴포넌트
interface TruthTableProps {
  headers: string[];
  rows: (string | number)[][];
  outputStartIndex: number;
}

function TruthTable({ headers, rows, outputStartIndex }: TruthTableProps) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={`border border-gray-300 px-4 py-3 bg-gray-50 text-center font-semibold ${
                  index === outputStartIndex ? 'output-start' : ''
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border border-gray-300 px-4 py-2.5 text-center ${
                    cellIndex === outputStartIndex ? 'output-start' : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    AndGateSimulator,
    OrGateSimulator,
    NotGateSimulator,
    XorGateSimulator,
    BufferGateSimulator,
    FreeSimulator,
    HalfAdderSimulator,
    FullAdderSimulator,
    TruthTable,
    HttpFlowDemo,
    DecimalToBinaryConverter,
  };
}
