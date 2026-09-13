'use client';

import { Handle, NodeResizer, Position, type NodeProps } from '@xyflow/react';
import { getIcon } from './icons';
import { usePlayback } from './playback';
import type {
  AreaNodeType,
  BoxKind,
  BoxNodeType,
  IconNodeType,
  NoteNodeType,
} from './types';

const SIDES = [
  { id: 't', position: Position.Top },
  { id: 'r', position: Position.Right },
  { id: 'b', position: Position.Bottom },
  { id: 'l', position: Position.Left },
] as const;

// 연결은 느슨한 모드라 source 핸들끼리도 이어진다. 네 변에 하나씩만 둔다.
export function SideHandles() {
  return (
    <>
      {SIDES.map((side) => (
        <Handle
          key={side.id}
          id={side.id}
          type="source"
          position={side.position}
          className="studio-handle"
        />
      ))}
    </>
  );
}

export const cx = (...names: (string | false | null | undefined)[]) =>
  names.filter(Boolean).join(' ');

export function IconNode({ id, data, selected }: NodeProps<IconNodeType>) {
  const icon = getIcon(data.iconId);
  const active = usePlayback().activeNodes.has(id);
  return (
    <div
      className={cx(
        'studio-icon',
        selected && 'is-selected',
        active && 'is-active'
      )}
    >
      <SideHandles />
      {icon ? (
        // 캔버스 안의 작은 아이콘이라 이미지 최적화가 필요 없고, 이미지 내보내기에도 그대로 잡혀야 한다.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={icon.src}
          alt={icon.name}
          width={44}
          height={44}
          draggable={false}
          className="studio-icon-img"
        />
      ) : (
        <span className="studio-icon-missing" aria-hidden="true" />
      )}
      <span className="studio-icon-label">{data.label}</span>
      {data.sub ? <span className="studio-icon-sub">{data.sub}</span> : null}
    </div>
  );
}

export function AreaNode({ data, selected }: NodeProps<AreaNodeType>) {
  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={120}
        minHeight={80}
        lineClassName="studio-resize-line"
        handleClassName="studio-resize-handle"
      />
      <div
        className={cx(
          'studio-area',
          `studio-area--${data.variant}`,
          selected && 'is-selected'
        )}
      >
        <span className="studio-area-label">{data.label}</span>
      </div>
    </>
  );
}

const KIND_HINT: Record<BoxKind, string> = {
  client: 'client',
  service: 'service',
  database: 'database',
  queue: 'queue',
  external: 'external',
};

export function BoxNode({ id, data, selected }: NodeProps<BoxNodeType>) {
  const active = usePlayback().activeNodes.has(id);
  return (
    <div
      style={data.width ? { width: data.width } : undefined}
      className={cx(
        'studio-box',
        `studio-box--${data.kind}`,
        selected && 'is-selected',
        active && 'is-active'
      )}
    >
      <SideHandles />
      <span className="studio-box-label">{data.label}</span>
      <span className="studio-box-sub">{data.sub || KIND_HINT[data.kind]}</span>
    </div>
  );
}

export function NoteNode({ data, selected }: NodeProps<NoteNodeType>) {
  return (
    <div className={cx('studio-note', selected && 'is-selected')}>
      {data.text}
    </div>
  );
}
