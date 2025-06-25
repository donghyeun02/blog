'use client';

import LogicGateSimulator from './LogicGateSimulator';
import { nanoid } from 'nanoid';
import React from 'react';

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

export const mdxComponents = {
  LogicGateSimulator: FreeSimulator,
  AndGateSimulator,
  OrGateSimulator,
  NotGateSimulator,
  XorGateSimulator,
  FreeSimulator,
};
