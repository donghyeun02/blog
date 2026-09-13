import type { Edge, Node, Viewport } from '@xyflow/react';

/** ghost는 보이지 않는 여백 영역이다. 글 속 뷰어가 화면 맞춤에 선·라벨까지 넣도록 도면 전체를 감싼다 */
export type GroupVariant = 'vpc' | 'subnet' | 'zone' | 'plain' | 'ghost';
export type BoxKind = 'client' | 'service' | 'database' | 'queue' | 'external';
export type Cardinality = 'none' | '1:1' | '1:N' | 'N:M';
export type PlayMode = 'off' | 'continuous' | 'steps';

export type IconData = { iconId: string; label: string; sub?: string };
export type AreaData = { label: string; variant: GroupVariant };
export type BoxData = {
  label: string;
  kind: BoxKind;
  sub?: string;
  /** 목록처럼 폭을 맞출 때만 준다 */ width?: number;
};
export type NoteData = { text: string };
export type Column = {
  id: string;
  name: string;
  type: string;
  pk?: boolean;
  fk?: boolean;
};
export type TableData = { name: string; columns: Column[] };

export type IconNodeType = Node<IconData, 'icon'>;
export type AreaNodeType = Node<AreaData, 'area'>;
export type BoxNodeType = Node<BoxData, 'box'>;
export type NoteNodeType = Node<NoteData, 'note'>;
export type TableNodeType = Node<TableData, 'table'>;

export type StudioNode =
  | IconNodeType
  | AreaNodeType
  | BoxNodeType
  | NoteNodeType
  | TableNodeType;
export type NodeKind = NonNullable<StudioNode['type']>;

export type FlowData = {
  label?: string;
  dashed?: boolean;
  /** 흐름 재생 때 이 선 위로 패킷이 지나가는가 */
  animated?: boolean;
  /** 단계 재생 순서. 같은 번호끼리는 함께 흐른다 */
  step?: number;
  cardinality?: Cardinality;
  /** 이 선의 통신이 도중에 막힌다. 빨간 점선과 ✕로 그리고 패킷이 중간에서 사라진다 */
  blocked?: boolean;
};
export type FlowEdgeType = Edge<FlowData, 'flow'>;

export type StudioDoc = {
  id: string;
  title: string;
  updatedAt: number;
  nodes: StudioNode[];
  edges: FlowEdgeType[];
  viewport?: Viewport;
};
export type DocMeta = Pick<StudioDoc, 'id' | 'title' | 'updatedAt'>;

/** 팔레트에서 캔버스로 넘기는 "무엇을 만들지"에 대한 설명 */
export type AddSpec =
  | { type: 'icon'; iconId: string; label: string; sub?: string }
  | {
      type: 'area';
      variant: GroupVariant;
      label: string;
      width?: number;
      height?: number;
    }
  | { type: 'box'; kind: BoxKind; label: string; sub?: string; width?: number }
  | { type: 'note'; text?: string }
  | { type: 'table'; name?: string; columns?: Column[] };
