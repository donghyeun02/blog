'use client';

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import LogicAndGate from './LogicGates/LogicAndGate';
import LogicOrGate from './LogicGates/LogicOrGate';
import LogicNotGate from './LogicGates/LogicNotGate';
import LogicXorGate from './LogicGates/LogicXorGate';
import LogicNandGate from './LogicGates/LogicNandGate';
import LogicNorGate from './LogicGates/LogicNorGate';
import LogicXnorGate from './LogicGates/LogicXnorGate';
import LogicBufferGate from './LogicGates/LogicBufferGate';
import HalfAdder from './LogicGates/HalfAdder';
import FullAdder from './LogicGates/FullAdder';

const handleStyle = {
  background: '#fff',
  border: '2px solid #aaa',
  width: 16,
  height: 16,
  borderRadius: 8,
  zIndex: 2,
};

export function LogicAndGateNode({ data }: NodeProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 180,
        height: 120,
        background: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ ...handleStyle, top: 40, left: 14 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ ...handleStyle, top: 80, left: 14 }}
      />
      <LogicAndGate inputA={data.inputA} inputB={data.inputB} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{ ...handleStyle, top: 60, right: 20 }}
      />
    </div>
  );
}

export function LogicOrGateNode({ data }: NodeProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 180,
        height: 120,
        background: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ ...handleStyle, top: 40, left: 26 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ ...handleStyle, top: 80, left: 26 }}
      />
      <LogicOrGate inputA={data.inputA} inputB={data.inputB} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{ ...handleStyle, top: 60, right: 15 }}
      />
    </div>
  );
}

export function LogicNotGateNode({ data }: NodeProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 140,
        height: 60,
        background: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ ...handleStyle, top: 60, left: 24 }}
      />
      <LogicNotGate input={data.input} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{ ...handleStyle, top: 60, right: 20 }}
      />
    </div>
  );
}

export function LogicXorGateNode({ data }: NodeProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 180,
        height: 120,
        background: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ ...handleStyle, top: 40, left: 14 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ ...handleStyle, top: 80, left: 14 }}
      />
      <LogicXorGate inputA={data.inputA} inputB={data.inputB} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{ ...handleStyle, top: 60, right: 15 }}
      />
    </div>
  );
}

export function LogicNandGateNode({ data }: NodeProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 180,
        height: 120,
        background: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ ...handleStyle, top: 40, left: 14 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ ...handleStyle, top: 80, left: 14 }}
      />
      <LogicNandGate inputA={data.inputA} inputB={data.inputB} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{ ...handleStyle, top: 60, right: 4 }}
      />
    </div>
  );
}

export function LogicNorGateNode({ data }: NodeProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 220,
        height: 120,
        background: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ ...handleStyle, top: 40, left: 26 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ ...handleStyle, top: 80, left: 26 }}
      />
      <LogicNorGate inputA={data.inputA} inputB={data.inputB} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{ ...handleStyle, top: 60, right: -1 }}
      />
    </div>
  );
}

export function LogicXnorGateNode({ data }: NodeProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 180,
        height: 120,
        background: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ ...handleStyle, top: 40, left: 14 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ ...handleStyle, top: 80, left: 14 }}
      />
      <LogicXnorGate inputA={data.inputA} inputB={data.inputB} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{ ...handleStyle, top: 60, right: -1 }}
      />
    </div>
  );
}

export function LogicBufferGateNode({ data }: NodeProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 140,
        height: 60,
        background: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ ...handleStyle, top: 60, left: 24 }}
      />
      <LogicBufferGate input={data.input} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{ ...handleStyle, top: 60, right: 21 }}
      />
    </div>
  );
}

export function HalfAdderNode({ data }: NodeProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 140,
        height: 160,
        background: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ ...handleStyle, top: 80, left: 4 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ ...handleStyle, top: 140, left: 4 }}
      />
      <HalfAdder inputA={data.inputA} inputB={data.inputB} />
      <Handle
        type="source"
        position={Position.Right}
        id="sum"
        style={{ ...handleStyle, top: 80, right: -16 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="carry"
        style={{ ...handleStyle, top: 140, right: -16 }}
      />
    </div>
  );
}

export function FullAdderNode({ data }: NodeProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 140,
        height: 200,
        background: 'none',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ ...handleStyle, top: 65, left: 4 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{ ...handleStyle, top: 110, left: 4 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="cin"
        style={{ ...handleStyle, top: 155, left: 4 }}
      />
      <FullAdder
        inputA={data.inputA}
        inputB={data.inputB}
        inputCin={data.inputCin}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="sum"
        style={{ ...handleStyle, top: 80, right: -16 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="cout"
        style={{ ...handleStyle, top: 140, right: -16 }}
      />
    </div>
  );
}
