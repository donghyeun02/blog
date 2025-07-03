'use client';

import React from 'react';
import { nanoid } from 'nanoid';
import LogicGateSimulator from './LogicGateSimulator';

interface GateConfig {
  type: string;
  inputs: Array<{ value: number; position: { x: number; y: number } }>;
  gatePosition: { x: number; y: number };
  outputPosition: { x: number; y: number };
}

interface AdderConfig {
  type: 'halfAdder' | 'fullAdder';
  inputs: Array<{ value: number; position: { x: number; y: number } }>;
  gatePosition: { x: number; y: number };
  outputPositions: Array<{ x: number; y: number }>;
}

interface FullAdderFromHalfAddersConfig {
  inputs: Array<{ value: number; position: { x: number; y: number } }>;
  halfAdder1Position: { x: number; y: number };
  halfAdder2Position: { x: number; y: number };
  orGatePosition: { x: number; y: number };
  outputPositions: Array<{ x: number; y: number }>;
}

export function createGateSimulator(config: GateConfig) {
  return function GateSimulator() {
    const { initialNodes, initialEdges, initialInputValues, instanceId } =
      React.useMemo(() => {
        const instanceId = nanoid(8);
        const inputIds = config.inputs.map(
          (_, index) => `${config.type}-${instanceId}-in${index + 1}`
        );
        const gateId = `${config.type}-${instanceId}-gate`;
        const outputId = `${config.type}-${instanceId}-out`;

        const nodes = [
          ...config.inputs.map((input, index) => ({
            id: inputIds[index],
            type: 'inputCustom',
            position: input.position,
            data: { value: input.value },
          })),
          {
            id: gateId,
            type: config.type,
            position: config.gatePosition,
            data: {},
          },
          {
            id: outputId,
            type: 'outputCustom',
            position: config.outputPosition,
            data: {},
          },
        ];

        const edges = [
          ...inputIds.map((inputId, index) => ({
            id: `${config.type}-${instanceId}-e${index + 1}`,
            source: inputId,
            target: gateId,
            sourceHandle: 'out',
            targetHandle:
              config.inputs.length === 1 ? 'a' : index === 0 ? 'a' : 'b',
          })),
          {
            id: `${config.type}-${instanceId}-e${inputIds.length + 1}`,
            source: gateId,
            target: outputId,
            sourceHandle: 'out',
            targetHandle: 'in',
          },
        ];

        const inputValues = Object.fromEntries(
          inputIds.map((id, index) => [id, config.inputs[index].value])
        );

        return {
          initialNodes: nodes,
          initialEdges: edges,
          initialInputValues: inputValues,
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
  };
}

export function createAdderSimulator(config: AdderConfig) {
  return function AdderSimulator() {
    const { initialNodes, initialEdges, initialInputValues, instanceId } =
      React.useMemo(() => {
        const instanceId = nanoid(8);
        const inputIds = config.inputs.map(
          (_, index) => `${config.type}-${instanceId}-in${index + 1}`
        );
        const gateId = `${config.type}-${instanceId}-gate`;
        const outputIds = config.outputPositions.map(
          (_, index) => `${config.type}-${instanceId}-out${index + 1}`
        );

        const nodes = [
          ...config.inputs.map((input, index) => ({
            id: inputIds[index],
            type: 'inputCustom',
            position: input.position,
            data: { value: input.value },
          })),
          {
            id: gateId,
            type: config.type,
            position: config.gatePosition,
            data: {},
          },
          ...config.outputPositions.map((position, index) => ({
            id: outputIds[index],
            type: 'outputCustom',
            position,
            data: {},
          })),
        ];

        const inputHandles =
          config.type === 'halfAdder' ? ['a', 'b'] : ['a', 'b', 'cin'];
        const outputHandles =
          config.type === 'halfAdder' ? ['sum', 'carry'] : ['sum', 'cout'];

        const edges = [
          ...inputIds.map((inputId, index) => ({
            id: `${config.type}-${instanceId}-e${index + 1}`,
            source: inputId,
            target: gateId,
            sourceHandle: 'out',
            targetHandle: inputHandles[index],
          })),
          ...outputIds.map((outputId, index) => ({
            id: `${config.type}-${instanceId}-e${inputIds.length + index + 1}`,
            source: gateId,
            target: outputId,
            sourceHandle: outputHandles[index],
            targetHandle: 'in',
          })),
        ];

        const inputValues = Object.fromEntries(
          inputIds.map((id, index) => [id, config.inputs[index].value])
        );

        return {
          initialNodes: nodes,
          initialEdges: edges,
          initialInputValues: inputValues,
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
  };
}

export function createFullAdderFromHalfAdders(
  config: FullAdderFromHalfAddersConfig
) {
  return function FullAdderFromHalfAddersSimulator() {
    const { initialNodes, initialEdges, initialInputValues, instanceId } =
      React.useMemo(() => {
        const instanceId = nanoid(8);

        const inputCinId = `fulladder-${instanceId}-inCin`;
        const inputAId = `fulladder-${instanceId}-inA`;
        const inputBId = `fulladder-${instanceId}-inB`;

        const halfAdder1Id = `fulladder-${instanceId}-ha1`;
        const halfAdder2Id = `fulladder-${instanceId}-ha2`;
        const orGateId = `fulladder-${instanceId}-or`;

        const outputSumId = `fulladder-${instanceId}-sum`;
        const outputCoutId = `fulladder-${instanceId}-cout`;

        const nodes = [
          {
            id: inputCinId,
            type: 'inputCustom',
            position: config.inputs[0].position,
            data: { value: config.inputs[0].value },
          },
          {
            id: inputAId,
            type: 'inputCustom',
            position: config.inputs[1].position,
            data: { value: config.inputs[1].value },
          },
          {
            id: inputBId,
            type: 'inputCustom',
            position: config.inputs[2].position,
            data: { value: config.inputs[2].value },
          },
          {
            id: halfAdder1Id,
            type: 'halfAdder',
            position: config.halfAdder1Position,
            data: {},
          },
          {
            id: halfAdder2Id,
            type: 'halfAdder',
            position: config.halfAdder2Position,
            data: {},
          },
          {
            id: orGateId,
            type: 'or',
            position: config.orGatePosition,
            data: {},
          },
          {
            id: outputSumId,
            type: 'outputCustom',
            position: config.outputPositions[0],
            data: {},
          },
          {
            id: outputCoutId,
            type: 'outputCustom',
            position: config.outputPositions[1],
            data: {},
          },
        ];

        const edges = [
          {
            id: `fulladder-${instanceId}-e1`,
            source: inputAId,
            target: halfAdder1Id,
            sourceHandle: 'out',
            targetHandle: 'a',
          },
          {
            id: `fulladder-${instanceId}-e2`,
            source: inputBId,
            target: halfAdder1Id,
            sourceHandle: 'out',
            targetHandle: 'b',
          },
          {
            id: `fulladder-${instanceId}-e3`,
            source: halfAdder1Id,
            target: halfAdder2Id,
            sourceHandle: 'sum',
            targetHandle: 'b',
          },
          {
            id: `fulladder-${instanceId}-e4`,
            source: inputCinId,
            target: halfAdder2Id,
            sourceHandle: 'out',
            targetHandle: 'a',
          },
          {
            id: `fulladder-${instanceId}-e5`,
            source: halfAdder2Id,
            target: orGateId,
            sourceHandle: 'carry',
            targetHandle: 'a',
          },
          {
            id: `fulladder-${instanceId}-e6`,
            source: halfAdder1Id,
            target: orGateId,
            sourceHandle: 'carry',
            targetHandle: 'b',
          },
          {
            id: `fulladder-${instanceId}-e7`,
            source: halfAdder2Id,
            target: outputSumId,
            sourceHandle: 'sum',
            targetHandle: 'in',
          },
          {
            id: `fulladder-${instanceId}-e8`,
            source: orGateId,
            target: outputCoutId,
            sourceHandle: 'out',
            targetHandle: 'in',
          },
        ];

        const inputValues = {
          [inputCinId]: config.inputs[0].value,
          [inputAId]: config.inputs[1].value,
          [inputBId]: config.inputs[2].value,
        };

        return {
          initialNodes: nodes,
          initialEdges: edges,
          initialInputValues: inputValues,
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
        height="600px"
        width="100%"
        interactive={true}
      />
    );
  };
}
