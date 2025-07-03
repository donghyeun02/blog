'use client';

import LogicGateSimulator from './CS/LogicGateSimulator';
import { nanoid } from 'nanoid';
import React from 'react';
import type { MDXComponents } from 'mdx/types';
import HttpFlowDemo from './Backend/HttpFlowDemo';
import DecimalToBinaryConverter from './CS/DecimalToBinaryConverter';

// AND 게이트 시뮬레이터 (미리 구성된 회로)
function AndGateSimulator() {
  const { initialNodes, initialEdges, initialInputValues, instanceId } =
    React.useMemo(() => {
      const instanceId = nanoid(8);
      const input1Id = `and-${instanceId}-in1`;
      const input2Id = `and-${instanceId}-in2`;
      const andGateId = `and-${instanceId}-gate`;
      const outputId = `and-${instanceId}-out`;
      return {
        initialNodes: [
          {
            id: input1Id,
            type: 'inputCustom',
            position: { x: 100, y: 160 },
            data: { value: 1 },
          },
          {
            id: input2Id,
            type: 'inputCustom',
            position: { x: 100, y: 200 },
            data: { value: 0 },
          },
          {
            id: andGateId,
            type: 'and',
            position: { x: 225, y: 140 },
            data: {},
          },
          {
            id: outputId,
            type: 'outputCustom',
            position: { x: 450, y: 180 },
            data: {},
          },
        ],
        initialEdges: [
          {
            id: `and-${instanceId}-e1`,
            source: input1Id,
            target: andGateId,
            sourceHandle: 'out',
            targetHandle: 'a',
          },
          {
            id: `and-${instanceId}-e2`,
            source: input2Id,
            target: andGateId,
            sourceHandle: 'out',
            targetHandle: 'b',
          },
          {
            id: `and-${instanceId}-e3`,
            source: andGateId,
            target: outputId,
            sourceHandle: 'out',
            targetHandle: 'in',
          },
        ],
        initialInputValues: { [input1Id]: 1, [input2Id]: 0 },
        instanceId,
      };
    }, []);

  return (
    <LogicGateSimulator
      key={instanceId}
      initialNodes={initialNodes}
      initialEdges={initialEdges}
      initialInputValues={initialInputValues}
      showControls={false}
      height="400px"
      width="100%"
      interactive={true}
    />
  );
}

// OR 게이트 시뮬레이터
function OrGateSimulator() {
  const { initialNodes, initialEdges, initialInputValues, instanceId } =
    React.useMemo(() => {
      const instanceId = nanoid(8);
      const input1Id = `or-${instanceId}-in1`;
      const input2Id = `or-${instanceId}-in2`;
      const orGateId = `or-${instanceId}-gate`;
      const outputId = `or-${instanceId}-out`;
      return {
        initialNodes: [
          {
            id: input1Id,
            type: 'inputCustom',
            position: { x: 100, y: 160 },
            data: { value: 0 },
          },
          {
            id: input2Id,
            type: 'inputCustom',
            position: { x: 100, y: 200 },
            data: { value: 1 },
          },
          { id: orGateId, type: 'or', position: { x: 225, y: 140 }, data: {} },
          {
            id: outputId,
            type: 'outputCustom',
            position: { x: 450, y: 180 },
            data: {},
          },
        ],
        initialEdges: [
          {
            id: `or-${instanceId}-e1`,
            source: input1Id,
            target: orGateId,
            sourceHandle: 'out',
            targetHandle: 'a',
          },
          {
            id: `or-${instanceId}-e2`,
            source: input2Id,
            target: orGateId,
            sourceHandle: 'out',
            targetHandle: 'b',
          },
          {
            id: `or-${instanceId}-e3`,
            source: orGateId,
            target: outputId,
            sourceHandle: 'out',
            targetHandle: 'in',
          },
        ],
        initialInputValues: { [input1Id]: 0, [input2Id]: 1 },
        instanceId,
      };
    }, []);

  return (
    <LogicGateSimulator
      key={instanceId}
      initialNodes={initialNodes}
      initialEdges={initialEdges}
      initialInputValues={initialInputValues}
      showControls={false}
      height="400px"
      width="100%"
      interactive={true}
    />
  );
}

// NOT 게이트 시뮬레이터
function NotGateSimulator() {
  const { initialNodes, initialEdges, initialInputValues, instanceId } =
    React.useMemo(() => {
      const instanceId = nanoid(8);
      const inputId = `not-${instanceId}-in`;
      const notGateId = `not-${instanceId}-gate`;
      const outputId = `not-${instanceId}-out`;
      return {
        initialNodes: [
          {
            id: inputId,
            type: 'inputCustom',
            position: { x: 100, y: 180 },
            data: { value: 1 },
          },
          {
            id: notGateId,
            type: 'not',
            position: { x: 225, y: 140 },
            data: {},
          },
          {
            id: outputId,
            type: 'outputCustom',
            position: { x: 450, y: 180 },
            data: {},
          },
        ],
        initialEdges: [
          {
            id: `not-${instanceId}-e1`,
            source: inputId,
            target: notGateId,
            sourceHandle: 'out',
            targetHandle: 'a',
          },
          {
            id: `not-${instanceId}-e2`,
            source: notGateId,
            target: outputId,
            sourceHandle: 'out',
            targetHandle: 'in',
          },
        ],
        initialInputValues: { [inputId]: 1 },
        instanceId,
      };
    }, []);

  return (
    <LogicGateSimulator
      key={instanceId}
      initialNodes={initialNodes}
      initialEdges={initialEdges}
      initialInputValues={initialInputValues}
      showControls={false}
      height="400px"
      width="100%"
      interactive={true}
    />
  );
}

// XOR 게이트 시뮬레이터
function XorGateSimulator() {
  const { initialNodes, initialEdges, initialInputValues, instanceId } =
    React.useMemo(() => {
      const instanceId = nanoid(8);
      const input1Id = `xor-${instanceId}-in1`;
      const input2Id = `xor-${instanceId}-in2`;
      const xorGateId = `xor-${instanceId}-gate`;
      const outputId = `xor-${instanceId}-out`;
      return {
        initialNodes: [
          {
            id: input1Id,
            type: 'inputCustom',
            position: { x: 100, y: 160 },
            data: { value: 1 },
          },
          {
            id: input2Id,
            type: 'inputCustom',
            position: { x: 100, y: 200 },
            data: { value: 0 },
          },
          {
            id: xorGateId,
            type: 'xor',
            position: { x: 225, y: 140 },
            data: {},
          },
          {
            id: outputId,
            type: 'outputCustom',
            position: { x: 450, y: 180 },
            data: {},
          },
        ],
        initialEdges: [
          {
            id: `xor-${instanceId}-e1`,
            source: input1Id,
            target: xorGateId,
            sourceHandle: 'out',
            targetHandle: 'a',
          },
          {
            id: `xor-${instanceId}-e2`,
            source: input2Id,
            target: xorGateId,
            sourceHandle: 'out',
            targetHandle: 'b',
          },
          {
            id: `xor-${instanceId}-e3`,
            source: xorGateId,
            target: outputId,
            sourceHandle: 'out',
            targetHandle: 'in',
          },
        ],
        initialInputValues: { [input1Id]: 1, [input2Id]: 0 },
        instanceId,
      };
    }, []);

  return (
    <LogicGateSimulator
      key={instanceId}
      initialNodes={initialNodes}
      initialEdges={initialEdges}
      initialInputValues={initialInputValues}
      showControls={false}
      height="400px"
      width="100%"
      interactive={true}
    />
  );
}

// Buffer 게이트 시뮬레이터
function BufferGateSimulator() {
  const { initialNodes, initialEdges, initialInputValues, instanceId } =
    React.useMemo(() => {
      const instanceId = nanoid(8);
      const inputId = `buffer-${instanceId}-in`;
      const bufferGateId = `buffer-${instanceId}-gate`;
      const outputId = `buffer-${instanceId}-out`;
      return {
        initialNodes: [
          {
            id: inputId,
            type: 'inputCustom',
            position: { x: 100, y: 180 },
            data: { value: 1 },
          },
          {
            id: bufferGateId,
            type: 'buffer',
            position: { x: 225, y: 140 },
            data: {},
          },
          {
            id: outputId,
            type: 'outputCustom',
            position: { x: 450, y: 180 },
            data: {},
          },
        ],
        initialEdges: [
          {
            id: `buffer-${instanceId}-e1`,
            source: inputId,
            target: bufferGateId,
            sourceHandle: 'out',
            targetHandle: 'a',
          },
          {
            id: `buffer-${instanceId}-e2`,
            source: bufferGateId,
            target: outputId,
            sourceHandle: 'out',
            targetHandle: 'in',
          },
        ],
        initialInputValues: { [inputId]: 1 },
        instanceId,
      };
    }, []);

  return (
    <LogicGateSimulator
      key={instanceId}
      initialNodes={initialNodes}
      initialEdges={initialEdges}
      initialInputValues={initialInputValues}
      showControls={false}
      height="400px"
      width="100%"
      interactive={true}
    />
  );
}

// 자유 시뮬레이터 (기존과 동일)
function FreeSimulator() {
  const instanceId = React.useMemo(() => nanoid(8), []);
  return (
    <LogicGateSimulator
      key={instanceId}
      showControls={true}
      height="600px"
      width="100%"
      interactive={true}
    />
  );
}

// Half Adder 시뮬레이터
function HalfAdderSimulator() {
  const { initialNodes, initialEdges, initialInputValues, instanceId } =
    React.useMemo(() => {
      const instanceId = nanoid(8);
      const inputAId = `half-${instanceId}-a`;
      const inputBId = `half-${instanceId}-b`;
      const halfAdderId = `half-${instanceId}-adder`;
      const sumOutputId = `half-${instanceId}-sum`;
      const carryOutputId = `half-${instanceId}-carry`;
      return {
        initialNodes: [
          {
            id: inputAId,
            type: 'inputCustom',
            position: { x: 75, y: 140 },
            data: { value: 1 },
          },
          {
            id: inputBId,
            type: 'inputCustom',
            position: { x: 75, y: 200 },
            data: { value: 0 },
          },
          {
            id: halfAdderId,
            type: 'halfAdder',
            position: { x: 200, y: 80 },
            data: {},
          },
          {
            id: sumOutputId,
            type: 'outputCustom',
            position: { x: 450, y: 140 },
            data: { label: 'Sum' },
          },
          {
            id: carryOutputId,
            type: 'outputCustom',
            position: { x: 450, y: 200 },
            data: { label: 'Carry' },
          },
        ],
        initialEdges: [
          {
            id: `half-${instanceId}-e1`,
            source: inputAId,
            target: halfAdderId,
            sourceHandle: 'out',
            targetHandle: 'a',
          },
          {
            id: `half-${instanceId}-e2`,
            source: inputBId,
            target: halfAdderId,
            sourceHandle: 'out',
            targetHandle: 'b',
          },
          {
            id: `half-${instanceId}-e3`,
            source: halfAdderId,
            target: sumOutputId,
            sourceHandle: 'sum',
            targetHandle: 'in',
          },
          {
            id: `half-${instanceId}-e4`,
            source: halfAdderId,
            target: carryOutputId,
            sourceHandle: 'carry',
            targetHandle: 'in',
          },
        ],
        initialInputValues: { [inputAId]: 1, [inputBId]: 0 },
        instanceId,
      };
    }, []);

  return (
    <LogicGateSimulator
      key={instanceId}
      initialNodes={initialNodes}
      initialEdges={initialEdges}
      initialInputValues={initialInputValues}
      showControls={false}
      height="400px"
      width="100%"
      interactive={true}
    />
  );
}

// Full Adder 시뮬레이터
function FullAdderSimulator() {
  const { initialNodes, initialEdges, initialInputValues, instanceId } =
    React.useMemo(() => {
      const instanceId = nanoid(8);
      const inputAId = `full-${instanceId}-a`;
      const inputBId = `full-${instanceId}-b`;
      const inputCinId = `full-${instanceId}-cin`;
      const fullAdderId = `full-${instanceId}-adder`;
      const sumOutputId = `full-${instanceId}-sum`;
      const coutOutputId = `full-${instanceId}-cout`;
      return {
        initialNodes: [
          {
            id: inputAId,
            type: 'inputCustom',
            position: { x: 75, y: 110 },
            data: { value: 1 },
          },
          {
            id: inputBId,
            type: 'inputCustom',
            position: { x: 75, y: 150 },
            data: { value: 1 },
          },
          {
            id: inputCinId,
            type: 'inputCustom',
            position: { x: 75, y: 240 },
            data: { value: 0 },
          },
          {
            id: fullAdderId,
            type: 'fullAdder',
            position: { x: 200, y: 80 },
            data: {},
          },
          {
            id: sumOutputId,
            type: 'outputCustom',
            position: { x: 450, y: 140 },
            data: { label: 'Sum' },
          },
          {
            id: coutOutputId,
            type: 'outputCustom',
            position: { x: 450, y: 200 },
            data: { label: 'Cout' },
          },
        ],
        initialEdges: [
          {
            id: `full-${instanceId}-e1`,
            source: inputAId,
            target: fullAdderId,
            sourceHandle: 'out',
            targetHandle: 'a',
          },
          {
            id: `full-${instanceId}-e2`,
            source: inputBId,
            target: fullAdderId,
            sourceHandle: 'out',
            targetHandle: 'b',
          },
          {
            id: `full-${instanceId}-e3`,
            source: inputCinId,
            target: fullAdderId,
            sourceHandle: 'out',
            targetHandle: 'cin',
          },
          {
            id: `full-${instanceId}-e4`,
            source: fullAdderId,
            target: sumOutputId,
            sourceHandle: 'sum',
            targetHandle: 'in',
          },
          {
            id: `full-${instanceId}-e5`,
            source: fullAdderId,
            target: coutOutputId,
            sourceHandle: 'cout',
            targetHandle: 'in',
          },
        ],
        initialInputValues: { [inputAId]: 1, [inputBId]: 1, [inputCinId]: 0 },
        instanceId,
      };
    }, []);

  return (
    <LogicGateSimulator
      key={instanceId}
      initialNodes={initialNodes}
      initialEdges={initialEdges}
      initialInputValues={initialInputValues}
      showControls={false}
      height="400px"
      width="100%"
      interactive={true}
    />
  );
}

export const mdxComponents = {
  DecimalToBinaryConverter,
  HttpFlowDemo,
  LogicGateSimulator: FreeSimulator,
  AndGateSimulator,
  OrGateSimulator,
  NotGateSimulator,
  XorGateSimulator,
  BufferGateSimulator,
  FreeSimulator,
  HalfAdderSimulator,
  FullAdderSimulator,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    HttpFlowDemo,
    DecimalToBinaryConverter,
    LogicGateSimulator,
  };
}
