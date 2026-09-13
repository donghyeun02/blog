'use client';

import { useEffect } from 'react';
import {
  Handle,
  Position,
  useUpdateNodeInternals,
  type NodeProps,
} from '@xyflow/react';
import { cx } from './nodes';
import { usePlayback } from './playback';
import type { TableNodeType } from './types';

export function TableNode({ id, data, selected }: NodeProps<TableNodeType>) {
  const active = usePlayback().activeNodes.has(id);
  const updateNodeInternals = useUpdateNodeInternals();
  const columnKey = data.columns.map((c) => c.id).join('|');

  // 컬럼마다 핸들이 있어서, 컬럼이 늘거나 줄면 React Flow에 핸들 위치를 다시 재라고 알려야 한다.
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, columnKey, updateNodeInternals]);

  return (
    <div
      className={cx(
        'studio-table',
        selected && 'is-selected',
        active && 'is-active'
      )}
    >
      <div className="studio-table-head">{data.name}</div>
      <ul className="studio-table-rows">
        {data.columns.map((col) => (
          <li key={col.id} className="studio-table-row">
            <Handle
              id={`${col.id}-l`}
              type="source"
              position={Position.Left}
              className="studio-handle studio-handle--row"
            />
            <span className="studio-col-key">
              {col.pk ? 'PK' : col.fk ? 'FK' : ''}
            </span>
            <span className="studio-col-name">{col.name}</span>
            <span className="studio-col-type">{col.type}</span>
            <Handle
              id={`${col.id}-r`}
              type="source"
              position={Position.Right}
              className="studio-handle studio-handle--row"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
