'use client';

import LogicGateSimulator from './LogicGateSimulator';
import {
  createGateSimulator,
  createAdderSimulator,
  createFullAdderFromHalfAdders,
} from './SimulatorFactory';

// reactflow를 끌고 오는 무거운 모듈이라 mdx-components에서 dynamic import로만
// 참조한다. 시뮬레이터를 쓰지 않는 글에는 이 청크가 내려가지 않는다.

export const AndGateSimulator = createGateSimulator({
  type: 'and',
  inputs: [
    { value: 1, position: { x: 100, y: 160 } },
    { value: 0, position: { x: 100, y: 200 } },
  ],
  gatePosition: { x: 225, y: 140 },
  outputPosition: { x: 450, y: 180 },
});

export const OrGateSimulator = createGateSimulator({
  type: 'or',
  inputs: [
    { value: 0, position: { x: 100, y: 160 } },
    { value: 1, position: { x: 100, y: 200 } },
  ],
  gatePosition: { x: 225, y: 140 },
  outputPosition: { x: 450, y: 180 },
});

export const NotGateSimulator = createGateSimulator({
  type: 'not',
  inputs: [{ value: 0, position: { x: 100, y: 180 } }],
  gatePosition: { x: 225, y: 140 },
  outputPosition: { x: 450, y: 180 },
});

export const XorGateSimulator = createGateSimulator({
  type: 'xor',
  inputs: [
    { value: 1, position: { x: 100, y: 160 } },
    { value: 0, position: { x: 100, y: 200 } },
  ],
  gatePosition: { x: 225, y: 140 },
  outputPosition: { x: 450, y: 180 },
});

export const BufferGateSimulator = createGateSimulator({
  type: 'buffer',
  inputs: [{ value: 0, position: { x: 100, y: 180 } }],
  gatePosition: { x: 225, y: 140 },
  outputPosition: { x: 450, y: 180 },
});

export function FreeSimulator() {
  return (
    <LogicGateSimulator
      showControls={true}
      height="600px"
      width="100%"
      interactive={true}
    />
  );
}

export const HalfAdderSimulator = createAdderSimulator({
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

export const FullAdderSimulator = createAdderSimulator({
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

export const FullAdderFromHalfAddersSimulator = createFullAdderFromHalfAdders({
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
