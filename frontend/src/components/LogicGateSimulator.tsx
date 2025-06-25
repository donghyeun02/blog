'use client';

import React, { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
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
import LogicXorGate from './LogicGates/LogicXorGate';
import LogicNandGate from './LogicGates/LogicNandGate';
import LogicNorGate from './LogicGates/LogicNorGate';
import LogicXnorGate from './LogicGates/LogicXnorGate';
import CustomEdge from './CustomEdge';

import { nanoid } from 'nanoid';

// 시뮬레이터 props 타입 정의
interface LogicGateSimulatorProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  initialInputValues?: Record<string, number>;
  showControls?: boolean;
  height?: string;
  width?: string;
  interactive?: boolean; // 상호작용 가능 여부
}

// 커스텀 노드 래퍼
const nodeTypes = {
  inputCustom: InputNode,
  outputCustom: OutputNode,
  and: (props: NodeProps) => <LogicAndGateNode {...props} />,
  or: (props: NodeProps) => <LogicOrGateNode {...props} />,
  not: (props: NodeProps) => <LogicNotGateNode {...props} />,
  xor: (props: NodeProps) => <LogicXorGateNode {...props} />,
  nand: (props: NodeProps) => <LogicNandGateNode {...props} />,
  nor: (props: NodeProps) => <LogicNorGateNode {...props} />,
  xnor: (props: NodeProps) => <LogicXnorGateNode {...props} />,
};

// AND 게이트 노드
function LogicAndGateNode({ data }: NodeProps) {
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
          left: 14,
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
          left: 14,
          background: '#fff',
          border: '2px solid #aaa',
          width: 16,
          height: 16,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
      <LogicAndGate inputA={data.inputA} inputB={data.inputB} />
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
function LogicOrGateNode({ data }: NodeProps) {
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
function LogicNotGateNode({ data }: NodeProps) {
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
// XOR 게이트 노드
function LogicXorGateNode({ data }: NodeProps) {
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
          left: 14,
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
          left: 14,
          background: '#fff',
          border: '2px solid #aaa',
          width: 16,
          height: 16,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
      <LogicXorGate inputA={data.inputA} inputB={data.inputB} />
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
// NAND 게이트 노드
function LogicNandGateNode({ data }: NodeProps) {
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
          left: 14,
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
          left: 14,
          background: '#fff',
          border: '2px solid #aaa',
          width: 16,
          height: 16,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
      <LogicNandGate inputA={data.inputA} inputB={data.inputB} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{
          top: 60,
          right: 3,
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
// NOR 게이트 노드
function LogicNorGateNode({ data }: NodeProps) {
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
      <LogicNorGate inputA={data.inputA} inputB={data.inputB} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{
          top: 60,
          right: -2,
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
// XNOR 게이트 노드
function LogicXnorGateNode({ data }: NodeProps) {
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
          left: 14,
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
          left: 14,
          background: '#fff',
          border: '2px solid #aaa',
          width: 16,
          height: 16,
          borderRadius: 8,
          zIndex: 2,
        }}
      />
      <LogicXnorGate inputA={data.inputA} inputB={data.inputB} />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{
          top: 60,
          right: -2,
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

    nodes.forEach((node) => {
      const prev = nodeOutputs[node.id];
      if (node.type === 'and') {
        const a = nodeInputs[node.id]['a'] ?? 0;
        const b = nodeInputs[node.id]['b'] ?? 0;
        nodeOutputs[node.id] = a & b;
      } else if (node.type === 'or') {
        const a = nodeInputs[node.id]['a'] ?? 0;
        const b = nodeInputs[node.id]['b'] ?? 0;
        nodeOutputs[node.id] = a | b;
      } else if (node.type === 'xor') {
        const a = nodeInputs[node.id]['a'] ?? 0;
        const b = nodeInputs[node.id]['b'] ?? 0;
        nodeOutputs[node.id] = a ^ b;
      } else if (node.type === 'nand') {
        const a = nodeInputs[node.id]['a'] ?? 0;
        const b = nodeInputs[node.id]['b'] ?? 0;
        nodeOutputs[node.id] = a & b ? 0 : 1;
      } else if (node.type === 'nor') {
        const a = nodeInputs[node.id]['a'] ?? 0;
        const b = nodeInputs[node.id]['b'] ?? 0;
        nodeOutputs[node.id] = a | b ? 0 : 1;
      } else if (node.type === 'xnor') {
        const a = nodeInputs[node.id]['a'] ?? 0;
        const b = nodeInputs[node.id]['b'] ?? 0;
        nodeOutputs[node.id] = a ^ b ? 0 : 1;
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

const edgeTypes = {
  animated: CustomEdge,
};

export default function LogicGateSimulator({
  initialNodes = [],
  initialEdges = [],
  initialInputValues = { in1: 1, in2: 0 },
  showControls = true,
  height = '100vh',
  width = '100vw',
  interactive = true,
}: LogicGateSimulatorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [inputValues, setInputValues] =
    useState<Record<string, number>>(initialInputValues);
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
        const incoming = edges.find(
          (e) => e.target === node.id && e.targetHandle === 'in'
        );
        return {
          ...node,
          data: {
            value: incoming ? nodeOutputs[incoming.source] ?? 0 : 0,
          },
        };
      } else if (
        node.type === 'and' ||
        node.type === 'or' ||
        node.type === 'xor' ||
        node.type === 'nand' ||
        node.type === 'nor' ||
        node.type === 'xnor'
      ) {
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
    } else if (
      type === 'and' ||
      type === 'or' ||
      type === 'xor' ||
      type === 'nand' ||
      type === 'nor' ||
      type === 'xnor'
    ) {
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

  // displayEdges는 그대로, edges에 data.active 추가
  const displayEdges = useMemo(() => {
    return edges.map((edge) => {
      let active = 0;
      if (edge.source && nodeOutputs[edge.source] !== undefined) {
        active = nodeOutputs[edge.source];
      }
      return {
        ...edge,
        type: 'animated',
        data: { active },
      };
    });
  }, [edges, nodeOutputs]);

  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {showControls && interactive && (
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: 16,
            background: '#f8fafc',
            borderRadius: 16,
            boxShadow: '0 2px 8px #0001',
            marginBottom: 12,
            alignItems: 'center',
            flexWrap: 'wrap',
            minHeight: 56,
          }}
        >
          <button
            style={{
              background: '#e0e7ef',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            onClick={() => addNode('input')}
          >
            ⬤ 입력
          </button>
          <button
            style={{
              background: '#e0e7ef',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            onClick={() => addNode('output')}
          >
            ⬤ 출력
          </button>
          <button
            style={{
              background: '#e0e7ef',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            onClick={() => addNode('and')}
          >
            AND
          </button>
          <button
            style={{
              background: '#e0e7ef',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            onClick={() => addNode('or')}
          >
            OR
          </button>
          <button
            style={{
              background: '#e0e7ef',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            onClick={() => addNode('not')}
          >
            NOT
          </button>
          <button
            style={{
              background: '#e0e7ef',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            onClick={() => addNode('xor')}
          >
            XOR
          </button>
          <button
            style={{
              background: '#e0e7ef',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            onClick={() => addNode('nand')}
          >
            NAND
          </button>
          <button
            style={{
              background: '#e0e7ef',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            onClick={() => addNode('nor')}
          >
            NOR
          </button>
          <button
            style={{
              background: '#e0e7ef',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            onClick={() => addNode('xnor')}
          >
            XNOR
          </button>
          {selectedNodes.length > 0 && (
            <button
              style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
              onClick={deleteSelectedNodes}
            >
              🗑️ 삭제
            </button>
          )}
        </div>
      )}
      <div style={{ flex: 1, background: '#f8fafc' }}>
        <ReactFlow
          nodes={displayNodes}
          edges={displayEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={onSelectionChange}
          nodeTypes={nodeTypes}
          edgeTypes={{ animated: CustomEdge }}
          fitView
          snapToGrid
          snapGrid={[20, 20]}
          style={{ background: '#f8fafc' }}
          nodesDraggable={interactive}
          nodesConnectable={interactive}
          elementsSelectable={true}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
        >
          <Background />
          {interactive && <Controls />}
        </ReactFlow>
      </div>
    </div>
  );
}
