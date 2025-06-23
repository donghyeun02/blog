'use client';

import React, { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  Handle,
  Position,
  NodeProps,
  Edge,
  Connection,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import InputNode from './LogicGates/InputNode';
import OutputNode from './LogicGates/OutputNode';
import LogicAndGate from './LogicGates/LogicAndGate';
import LogicOrGate from './LogicGates/LogicOrGate';
import LogicNotGate from './LogicGates/LogicNotGate';
// 추후 LogicNotGate, LogicXorGate 추가

import { nanoid } from 'nanoid';

// 커스텀 노드 래퍼
const nodeTypes = {
  inputCustom: InputNode,
  outputCustom: OutputNode,
  and: (props: NodeProps) => <LogicAndGateNode {...props} />,
  or: (props: NodeProps) => <LogicOrGateNode {...props} />,
  not: (props: NodeProps) => <LogicNotGateNode {...props} />,
};

// AND 게이트 노드
function LogicAndGateNode({ data, id }: NodeProps) {
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
        style={{
          top: 40,
          left: 16,
          background: '#fff',
          border: '2px solid #aaa',
          width: 16,
          height: 16,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{
          top: 80,
          left: 16,
          background: '#fff',
          border: '2px solid #aaa',
          width: 16,
          height: 16,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
      <LogicAndGate
        inputA={data.inputA}
        inputB={data.inputB}
        svgWidth={180}
        svgHeight={120}
        gateX={22}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{
          top: 60,
          right: 20,
          background: '#fff',
          border: '2px solid #aaa',
          width: 16,
          height: 16,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
    </div>
  );
}
// OR 게이트 노드
function LogicOrGateNode({ data, id }: NodeProps) {
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
        style={{
          top: 40,
          left: 26,
          background: '#fff',
          border: '2px solid #aaa',
          width: 16,
          height: 16,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        style={{
          top: 80,
          left: 26,
          background: '#fff',
          border: '2px solid #aaa',
          width: 16,
          height: 16,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
      <LogicOrGate inputA={data.inputA} inputB={data.inputB} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{
          top: 60,
          right: 15,
          background: '#fff',
          border: '2px solid #aaa',
          width: 16,
          height: 16,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
    </div>
  );
}
// NOT 게이트 노드
function LogicNotGateNode({ data, id }: NodeProps) {
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
        style={{
          top: 60,
          left: 24,
          background: '#fff',
          border: '2px solid #aaa',
          width: 14,
          height: 14,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
      <LogicNotGate input={data.input} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{
          top: 60,
          right: 21,
          background: '#fff',
          border: '2px solid #aaa',
          width: 14,
          height: 14,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
    </div>
  );
}

// 샘플 초기 회로: 입력-AND-출력
const initialNodes: Node[] = [
  {
    id: 'in1',
    type: 'inputCustom',
    position: { x: 50, y: 100 },
    data: { value: 1 },
  },
  {
    id: 'in2',
    type: 'inputCustom',
    position: { x: 50, y: 200 },
    data: { value: 0 },
  },
  { id: 'and1', type: 'and', position: { x: 250, y: 150 }, data: {} },
  { id: 'out1', type: 'outputCustom', position: { x: 450, y: 150 }, data: {} },
];
const initialEdges: Edge[] = [
  {
    id: 'e1',
    source: 'in1',
    sourceHandle: 'out',
    target: 'and1',
    targetHandle: 'a',
  },
  {
    id: 'e2',
    source: 'in2',
    sourceHandle: 'out',
    target: 'and1',
    targetHandle: 'b',
  },
  {
    id: 'e3',
    source: 'and1',
    sourceHandle: 'out',
    target: 'out1',
    targetHandle: 'in',
  },
];

// 회로 전체 신호 흐름 계산
function calculateNodeValues(
  nodes: Node[],
  edges: Edge[],
  inputValues: Record<string, number>
) {
  const nodeInputs: Record<string, Record<string, number>> = {};
  nodes.forEach((node) => {
    nodeInputs[node.id] = {};
  });

  // 초기 nodeOutputs: input 노드만
  const nodeOutputs: Record<string, number> = {};
  nodes.forEach((node) => {
    if (node.type === 'inputCustom') {
      nodeOutputs[node.id] = inputValues[node.id] ?? node.data.value ?? 0;
    }
  });

  // 반복적으로 신호 전파
  let changed = true;
  let iter = 0;
  while (changed && iter < 10) {
    changed = false;
    // edge 연결로 nodeInputs 채우기
    edges.forEach((edge) => {
      let sourceVal = 0;
      if (inputValues.hasOwnProperty(edge.source)) {
        sourceVal = inputValues[edge.source];
      } else if (nodeOutputs.hasOwnProperty(edge.source)) {
        sourceVal = nodeOutputs[edge.source];
      }
      if (edge.target in nodeInputs && edge.targetHandle) {
        nodeInputs[edge.target][edge.targetHandle] = sourceVal;
      }
    });
    // 게이트/출력 노드의 nodeOutputs 계산
    nodes.forEach((node) => {
      let prev = nodeOutputs[node.id];
      if (node.type === 'and') {
        const a = nodeInputs[node.id]['a'] ?? 0;
        const b = nodeInputs[node.id]['b'] ?? 0;
        nodeOutputs[node.id] = a & b;
      } else if (node.type === 'or') {
        const a = nodeInputs[node.id]['a'] ?? 0;
        const b = nodeInputs[node.id]['b'] ?? 0;
        nodeOutputs[node.id] = a | b;
      } else if (node.type === 'not') {
        const a = nodeInputs[node.id]['a'] ?? 0;
        nodeOutputs[node.id] = a === 1 ? 0 : 1;
      } else if (node.type === 'outputCustom') {
        const a = nodeInputs[node.id]['in'] ?? 0;
        nodeOutputs[node.id] = a;
      }
      if (nodeOutputs[node.id] !== prev) changed = true;
    });
    iter++;
  }

  return { nodeInputs, nodeOutputs };
}

export default function LogicGateSimulator() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [inputValues, setInputValues] = useState<Record<string, number>>({
    in1: 1,
    in2: 0,
  });
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  // 신호 흐름 계산
  const { nodeOutputs } = useMemo(
    () => calculateNodeValues(nodes, edges, inputValues),
    [nodes, edges, inputValues]
  );

  // 입력 노드 값 변경 핸들러
  const handleInputChange = useCallback((id: string, v: number) => {
    setInputValues((prev) => ({ ...prev, [id]: v }));
  }, []);

  // 노드에 입력/출력값 props 전달
  const displayNodes = useMemo(() => {
    return nodes.map((node) => {
      if (node.type === 'inputCustom') {
        return {
          ...node,
          data: {
            value: inputValues[node.id] ?? 0,
            onChange: (v: number) => handleInputChange(node.id, v),
          },
        };
      } else if (node.type === 'outputCustom') {
        // 자신에게 들어오는 edge의 source 노드의 출력값을 그대로 표시
        const incoming = edges.find(
          (e) => e.target === node.id && e.targetHandle === 'in'
        );
        return {
          ...node,
          data: {
            value: incoming ? nodeOutputs[incoming.source] ?? 0 : 0,
          },
        };
      } else if (node.type === 'and' || node.type === 'or') {
        return {
          ...node,
          data: {
            inputA: nodeInputs(node.id, edges, nodeOutputs, 'a'),
            inputB: nodeInputs(node.id, edges, nodeOutputs, 'b'),
          },
        };
      } else if (node.type === 'not') {
        return {
          ...node,
          data: {
            input: nodeInputs(node.id, edges, nodeOutputs, 'a'),
          },
        };
      }
      return node;
    });
  }, [nodes, edges, inputValues, nodeOutputs]);

  // 노드 입력값 추출 함수 (포트별)
  function nodeInputs(
    nodeId: string,
    edges: Edge[],
    nodeOutputs: Record<string, number>,
    port: string
  ) {
    const incoming = edges.find(
      (e) => e.target === nodeId && e.targetHandle === port
    );
    if (incoming) {
      return nodeOutputs[incoming.source] ?? 0;
    }
    return 0;
  }

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // 노드 추가 함수
  const addNode = (type: string) => {
    const id = nanoid(6);
    let node: Node;
    const baseY = 60 + Math.random() * 400;
    if (type === 'input') {
      node = {
        id,
        type: 'inputCustom',
        position: { x: 50, y: baseY },
        data: { value: 0 },
      };
    } else if (type === 'output') {
      node = {
        id,
        type: 'outputCustom',
        position: { x: 600, y: baseY },
        data: {},
      };
    } else if (type === 'and' || type === 'or') {
      node = { id, type, position: { x: 300, y: baseY }, data: {} };
    } else if (type === 'not') {
      node = { id, type: 'not', position: { x: 300, y: baseY }, data: {} };
    } else {
      return;
    }
    setNodes((nds) => [...nds, node]);
  };

  // 노드 삭제 함수
  const deleteSelectedNodes = () => {
    setNodes((nds) => nds.filter((n) => !selectedNodes.includes(n.id)));
    setEdges((eds) =>
      eds.filter(
        (e) =>
          !selectedNodes.includes(e.source) && !selectedNodes.includes(e.target)
      )
    );
    setSelectedNodes([]);
  };

  // 노드 선택 핸들러
  const onSelectionChange = useCallback((params: { nodes: Node[] }) => {
    setSelectedNodes(params.nodes.map((n) => n.id));
  }, []);

  return (
    <div style={{ width: '100vw', height: '80vh' }}>
      {/* 노드 추가/삭제 UI */}
      <div style={{ display: 'flex', gap: 8, padding: 8 }}>
        <button onClick={() => addNode('input')}>입력 추가</button>
        <button onClick={() => addNode('and')}>AND 추가</button>
        <button onClick={() => addNode('or')}>OR 추가</button>
        <button onClick={() => addNode('not')}>NOT 추가</button>
        <button onClick={() => addNode('output')}>출력 추가</button>
        <button
          onClick={deleteSelectedNodes}
          disabled={selectedNodes.length === 0}
          style={{ marginLeft: 16 }}
        >
          선택 삭제
        </button>
      </div>
      <ReactFlow
        nodes={displayNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        onSelectionChange={onSelectionChange}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
