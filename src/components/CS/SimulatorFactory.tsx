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
