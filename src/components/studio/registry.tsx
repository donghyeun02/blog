'use client';

import type { EdgeTypes, NodeTypes } from '@xyflow/react';
import { FlowEdge } from './FlowEdge';
import { AreaNode, BoxNode, IconNode, NoteNode } from './nodes';
import { TableNode } from './TableNode';

// React Flow는 이 객체가 렌더마다 바뀌면 경고를 내므로 모듈 단위로 한 번만 만든다.
export const nodeTypes = {
  icon: IconNode,
  area: AreaNode,
  box: BoxNode,
  note: NoteNode,
  table: TableNode,
} satisfies NodeTypes;

export const edgeTypes = { flow: FlowEdge } satisfies EdgeTypes;
