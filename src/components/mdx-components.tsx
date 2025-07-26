'use client';

import React from 'react';
import LogicGateSimulator from './CS/LogicGateSimulator';
import {
  createGateSimulator,
  createAdderSimulator,
  createFullAdderFromHalfAdders,
} from './CS/SimulatorFactory';
import HttpFlowDemo from './Backend/HttpFlowDemo';
import DecimalToBinaryConverter from './CS/Binary/DecimalToBinaryConverter';
import TextToBinaryConverter from './CS/Binary/TextToBinaryConverter';
import ColorToBinaryConverter from './CS/Binary/ColorToBinaryConverter';
import CentralizedVsDecentralized from './Blockchain/CentralizedVsDecentralized';
import SmartContractLegalQuiz from './Blockchain/SmartContractLegalQuiz';

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
    { x: 500, y: 200 }, // Sum
    { x: 500, y: 260 }, // Carry
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
    { x: 500, y: 200 }, // Sum
    { x: 500, y: 260 }, // Cout
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

export const mdxComponents = {
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
  HttpFlowDemo,
  DecimalToBinaryConverter,
  TextToBinaryConverter,
  ColorToBinaryConverter,
  CentralizedVsDecentralized,
  SmartContractLegalQuiz,
};
