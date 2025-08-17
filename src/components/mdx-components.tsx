'use client';

import React from 'react';
import LogicGateSimulator from './CS/LogicGateSimulator';
import {
  createGateSimulator,
  createAdderSimulator,
  createFullAdderFromHalfAdders,
} from './CS/SimulatorFactory';
import DecimalToBinaryConverter from './CS/DecimalToBinaryConverter';
import TextToBinaryConverter from './CS/Binary/TextToBinaryConverter';
import ColorToBinaryConverter from './CS/Binary/ColorToBinaryConverter';
import HttpFlowDemo from './Backend/HttpFlowDemo';
import CentralizedVsDecentralized from './Blockchain/CentralizedVsDecentralized';
import SmartContractLegalQuiz from './Blockchain/SmartContractLegalQuiz';
import SplitSection from './SplitSection';

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
  inputs: [{ value: 0, position: { x: 100, y: 180 } }],
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
  inputs: [{ value: 0, position: { x: 100, y: 180 } }],
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
    { value: 0, position: { x: 100, y: 200 } },
    { value: 0, position: { x: 100, y: 260 } },
  ],
  gatePosition: { x: 250, y: 140 },
  outputPositions: [
    { x: 500, y: 200 },
    { x: 500, y: 260 },
  ],
});

const FullAdderSimulator = createAdderSimulator({
  type: 'fullAdder',
  inputs: [
    { value: 0, position: { x: 100, y: 160 } },
    { value: 0, position: { x: 100, y: 200 } },
    { value: 0, position: { x: 100, y: 300 } },
  ],
  gatePosition: { x: 250, y: 140 },
  outputPositions: [
    { x: 500, y: 200 },
    { x: 500, y: 260 },
  ],
});

const FullAdderFromHalfAddersSimulator = createFullAdderFromHalfAdders({
  inputs: [
    { value: 0, position: { x: 50, y: 160 } },
    { value: 0, position: { x: 50, y: 230 } },
    { value: 0, position: { x: 50, y: 290 } },
  ],
  halfAdder1Position: { x: 150, y: 170 },
  halfAdder2Position: { x: 350, y: 100 },
  orGatePosition: { x: 550, y: 240 },
  outputPositions: [
    { x: 750, y: 160 },
    { x: 750, y: 280 },
  ],
});

interface TruthTableProps {
  title: string;
  headers: string[];
  rows: (string | number)[][];
}

function TruthTable({ title, headers, rows }: TruthTableProps) {
  return (
    <div className="my-6">
      <h4 className="text-lg font-semibold mb-3">{title}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  SplitSection,

  HttpFlowDemo,
  DecimalToBinaryConverter,
  TextToBinaryConverter,
  ColorToBinaryConverter,
  CentralizedVsDecentralized,
  SmartContractLegalQuiz,
  AndGateSimulator,
  OrGateSimulator,
  NotGateSimulator,
  XorGateSimulator,
  BufferGateSimulator,
  FreeSimulator,
  HalfAdderSimulator,
  FullAdderSimulator,
  FullAdderFromHalfAddersSimulator,
  TruthTable,

  p: ({ children, ...props }) => {
    // children이 React 요소인지 확인하고 blockquote가 포함되어 있는지 체크
    const hasBlockquote = React.Children.toArray(children).some(
      (child) => React.isValidElement(child) && child.type === 'blockquote'
    );

    if (hasBlockquote) {
      // blockquote가 포함되어 있으면 p 태그를 사용하지 않고 div로 감싸기
      return <div {...props}>{children}</div>;
    }

    return <p {...props}>{children}</p>;
  },
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      style={{
        borderLeft: '4px solid #bfdbfe',
        backgroundColor: '#eff6ff',
        color: '#1e40af',
        padding: '1rem',
        borderRadius: '0.375rem',
        fontWeight: '500',
        margin: '0.5rem 0',
        display: 'block',
      }}
    >
      {children}
    </blockquote>
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    SplitSection,

    HttpFlowDemo,
    DecimalToBinaryConverter,
    TextToBinaryConverter,
    ColorToBinaryConverter,
    CentralizedVsDecentralized,
    SmartContractLegalQuiz,
    AndGateSimulator,
    OrGateSimulator,
    NotGateSimulator,
    XorGateSimulator,
    BufferGateSimulator,
    FreeSimulator,
    HalfAdderSimulator,
    FullAdderSimulator,
    FullAdderFromHalfAddersSimulator,
    TruthTable,

    blockquote: ({ children, ...props }) => (
      <blockquote
        {...props}
        style={{
          borderLeft: '4px solid #bfdbfe',
          backgroundColor: '#eff6ff',
          color: '#1e40af',
          padding: '1rem',
          borderRadius: '0.375rem',
          fontWeight: '500',
          margin: '0.5rem 0',
          display: 'block',
        }}
      >
        {children}
      </blockquote>
    ),
  };
}
