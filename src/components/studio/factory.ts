import { MarkerType, type EdgeMarker, type XYPosition } from '@xyflow/react';
import type {
  AddSpec,
  Column,
  FlowData,
  FlowEdgeType,
  GroupVariant,
  StudioNode,
} from './types';

export const DND_MIME = 'application/x-studio-node';

export const ARROW: EdgeMarker = {
  type: MarkerType.ArrowClosed,
  width: 16,
  height: 16,
  color: '#1D1D1F',
};

const AREA_SIZE: Record<GroupVariant, { width: number; height: number }> = {
  vpc: { width: 560, height: 340 },
  subnet: { width: 360, height: 200 },
  zone: { width: 320, height: 240 },
  plain: { width: 280, height: 180 },
  ghost: { width: 400, height: 300 },
};

export const newId = (prefix = 'n') =>
  `${prefix}_${crypto.randomUUID().slice(0, 8)}`;

export function column(
  name: string,
  type: string,
  flags: Pick<Column, 'pk' | 'fk'> = {}
): Column {
  return { id: newId('c'), name, type, ...flags };
}

/** ERD 관계선은 끝에 1·N 표기가 붙으므로 화살촉을 달지 않는다. */
export const markerFor = (data?: FlowData) =>
  data?.blocked || (data?.cardinality && data.cardinality !== 'none')
    ? undefined
    : ARROW;

export function createNode(spec: AddSpec, position: XYPosition): StudioNode {
  const id = newId();
  switch (spec.type) {
    case 'icon':
      return {
        id,
        type: 'icon',
        position,
        data: {
          iconId: spec.iconId,
          label: spec.label,
          ...(spec.sub ? { sub: spec.sub } : {}),
        },
      };
    case 'area':
      return {
        id,
        type: 'area',
        position,
        zIndex: -1,
        width: spec.width ?? AREA_SIZE[spec.variant].width,
        height: spec.height ?? AREA_SIZE[spec.variant].height,
        data: { label: spec.label, variant: spec.variant },
      };
    case 'box':
      return {
        id,
        type: 'box',
        position,
        data: {
          label: spec.label,
          kind: spec.kind,
          ...(spec.sub ? { sub: spec.sub } : {}),
          ...(spec.width ? { width: spec.width } : {}),
        },
      };
    case 'note':
      return {
        id,
        type: 'note',
        position,
        data: { text: spec.text ?? '메모' },
      };
    case 'table':
      return {
        id,
        type: 'table',
        position,
        data: {
          name: spec.name ?? 'table',
          columns: spec.columns ?? [
            column('id', 'bigint', { pk: true }),
            column('created_at', 'timestamp'),
          ],
        },
      };
  }
}

export function flowEdge(
  source: string,
  target: string,
  data: FlowData = {},
  handles: { sourceHandle?: string | null; targetHandle?: string | null } = {}
): FlowEdgeType {
  const merged: FlowData = {
    animated: !data.cardinality || data.cardinality === 'none',
    ...data,
  };
  return {
    id: newId('e'),
    type: 'flow',
    source,
    target,
    sourceHandle: handles.sourceHandle ?? undefined,
    targetHandle: handles.targetHandle ?? undefined,
    data: merged,
    markerEnd: markerFor(merged),
  };
}

const SPEC_TYPES = new Set<string>(['icon', 'area', 'box', 'note', 'table']);

/** 끌어다 놓기로 넘어온 문자열을 검사한다. 다른 앱에서 끌어온 데이터일 수 있다. */
export function parseSpec(raw: string): AddSpec | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return null;
    const type = (value as { type?: unknown }).type;
    return typeof type === 'string' && SPEC_TYPES.has(type)
      ? (value as AddSpec)
      : null;
  } catch {
    return null;
  }
}
