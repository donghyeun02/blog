'use client';

import { newId } from './factory';
import { ICONS, ICON_CATEGORIES } from './icons';
import type {
  BoxKind,
  Cardinality,
  Column,
  FlowData,
  FlowEdgeType,
  GroupVariant,
  NodeKind,
  StudioNode,
  TableNodeType,
} from './types';

type NodePatch = (id: string, patch: Record<string, unknown>) => void;

type Props = {
  node?: StudioNode;
  edge?: FlowEdgeType;
  title: string;
  onTitle: (title: string) => void;
  onNode: NodePatch;
  onEdge: (id: string, patch: Partial<FlowData>) => void;
  onDelete: () => void;
};

const TYPE_LABEL: Record<NodeKind, string> = {
  icon: '아이콘',
  area: '영역',
  box: '박스',
  note: '메모',
  table: '테이블',
};

const BOX_KINDS: readonly { value: BoxKind; label: string }[] = [
  { value: 'client', label: '클라이언트' },
  { value: 'service', label: '서비스' },
  { value: 'database', label: '데이터베이스' },
  { value: 'queue', label: '메시지 큐' },
  { value: 'external', label: '외부 서비스' },
];

const AREA_VARIANTS: readonly { value: GroupVariant; label: string }[] = [
  { value: 'vpc', label: 'VPC — 파란 점선' },
  { value: 'subnet', label: 'Subnet — 회색 실선' },
  { value: 'zone', label: '존 — 옅은 파랑' },
  { value: 'plain', label: '묶음 — 테두리만' },
];

const CARDINALITIES: readonly { value: Cardinality; label: string }[] = [
  { value: 'none', label: '화살표' },
  { value: '1:1', label: '1 : 1' },
  { value: '1:N', label: '1 : N' },
  { value: 'N:M', label: 'N : M' },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="studio-field">
      <span className="studio-field-label">{label}</span>
      {children}
    </label>
  );
}

function pick<T extends string>(
  options: readonly { value: T }[],
  value: string
): T | undefined {
  return options.find((option) => option.value === value)?.value;
}

export function Inspector({
  node,
  edge,
  title,
  onTitle,
  onNode,
  onEdge,
  onDelete,
}: Props) {
  if (edge)
    return <EdgeFields edge={edge} onEdge={onEdge} onDelete={onDelete} />;
  if (node)
    return <NodeFields node={node} onNode={onNode} onDelete={onDelete} />;
  return (
    <div className="studio-panel">
      <h2 className="studio-panel-title">도면</h2>
      <Field label="제목">
        <input
          className="studio-input"
          value={title}
          onChange={(event) => onTitle(event.target.value)}
        />
      </Field>
      <div className="studio-help">
        <p>왼쪽에서 끌어다 놓거나 눌러서 추가합니다.</p>
        <p>
          도형에 마우스를 올리면 네 변에 점이 나옵니다. 점을 끌어 다른 도형에
          놓으면 선이 이어집니다.
        </p>
        <p>
          선을 골라 <b>단계 번호</b>를 매기고 위에서 <b>단계</b>를 누르면 번호
          순서대로 한 구간씩 흐릅니다.
        </p>
        <p>
          Delete로 지우고 휠이나 핀치로 확대합니다. 편집 내용은 이 브라우저에
          자동으로 저장됩니다.
        </p>
      </div>
    </div>
  );
}

function NodeFields({
  node,
  onNode,
  onDelete,
}: {
  node: StudioNode;
  onNode: NodePatch;
  onDelete: () => void;
}) {
  const set = (patch: Record<string, unknown>) => onNode(node.id, patch);
  return (
    <div className="studio-panel">
      <h2 className="studio-panel-title">{TYPE_LABEL[node.type ?? 'box']}</h2>

      {node.type === 'icon' ? (
        <>
          <Field label="이름">
            <input
              className="studio-input"
              value={node.data.label}
              onChange={(e) => set({ label: e.target.value })}
            />
          </Field>
          <Field label="설명">
            <input
              className="studio-input"
              value={node.data.sub ?? ''}
              placeholder="예) 10.0.1.0/24"
              onChange={(e) => set({ sub: e.target.value })}
            />
          </Field>
          <Field label="아이콘">
            <select
              className="studio-input"
              value={node.data.iconId}
              onChange={(e) => set({ iconId: e.target.value })}
            >
              {ICON_CATEGORIES.map((category) => (
                <optgroup key={category} label={category}>
                  {ICONS.filter((icon) => icon.category === category).map(
                    (icon) => (
                      <option key={icon.id} value={icon.id}>
                        {icon.name}
                      </option>
                    )
                  )}
                </optgroup>
              ))}
            </select>
          </Field>
        </>
      ) : null}

      {node.type === 'box' ? (
        <>
          <Field label="이름">
            <input
              className="studio-input"
              value={node.data.label}
              onChange={(e) => set({ label: e.target.value })}
            />
          </Field>
          <Field label="설명">
            <input
              className="studio-input"
              value={node.data.sub ?? ''}
              onChange={(e) => set({ sub: e.target.value })}
            />
          </Field>
          <Field label="폭 (비우면 자동)">
            <input
              className="studio-input"
              type="number"
              min={80}
              value={node.data.width ?? ''}
              onChange={(e) => {
                const n = Math.floor(Number(e.target.value));
                set({
                  width:
                    e.target.value === '' || !Number.isFinite(n)
                      ? undefined
                      : Math.max(80, n),
                });
              }}
            />
          </Field>
          <Field label="종류">
            <select
              className="studio-input"
              value={node.data.kind}
              onChange={(e) => {
                const kind = pick(BOX_KINDS, e.target.value);
                if (kind) set({ kind });
              }}
            >
              {BOX_KINDS.map((k) => (
                <option key={k.value} value={k.value}>
                  {k.label}
                </option>
              ))}
            </select>
          </Field>
        </>
      ) : null}

      {node.type === 'area' ? (
        <>
          <Field label="이름">
            <input
              className="studio-input"
              value={node.data.label}
              onChange={(e) => set({ label: e.target.value })}
            />
          </Field>
          <Field label="모양">
            <select
              className="studio-input"
              value={node.data.variant}
              onChange={(e) => {
                const variant = pick(AREA_VARIANTS, e.target.value);
                if (variant) set({ variant });
              }}
            >
              {AREA_VARIANTS.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </Field>
          <p className="studio-help">
            선택하면 모서리를 끌어 크기를 바꿀 수 있습니다.
          </p>
        </>
      ) : null}

      {node.type === 'note' ? (
        <Field label="내용">
          <textarea
            className="studio-input"
            rows={4}
            value={node.data.text}
            onChange={(e) => set({ text: e.target.value })}
          />
        </Field>
      ) : null}

      {node.type === 'table' ? <TableFields node={node} set={set} /> : null}

      <button
        type="button"
        className="studio-btn studio-btn--danger"
        onClick={onDelete}
      >
        지우기
      </button>
    </div>
  );
}

function TableFields({
  node,
  set,
}: {
  node: TableNodeType;
  set: (patch: Record<string, unknown>) => void;
}) {
  const columns = node.data.columns;
  const update = (id: string, patch: Partial<Column>) =>
    set({
      columns: columns.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    });
  const remove = (id: string) =>
    set({ columns: columns.filter((c) => c.id !== id) });
  const add = () =>
    set({
      columns: [
        ...columns,
        { id: newId('c'), name: 'column', type: 'varchar' },
      ],
    });

  return (
    <>
      <Field label="테이블 이름">
        <input
          className="studio-input studio-input--mono"
          value={node.data.name}
          onChange={(e) => set({ name: e.target.value })}
        />
      </Field>
      <div className="studio-field-label">컬럼</div>
      <ul className="studio-col-list">
        {columns.map((col) => (
          <li key={col.id} className="studio-col-edit">
            <input
              className="studio-input studio-input--mono"
              aria-label="컬럼 이름"
              value={col.name}
              onChange={(e) => update(col.id, { name: e.target.value })}
            />
            <input
              className="studio-input studio-input--mono"
              aria-label="타입"
              value={col.type}
              onChange={(e) => update(col.id, { type: e.target.value })}
            />
            <button
              type="button"
              className={`studio-chip ${col.pk ? 'is-on' : ''}`}
              aria-pressed={!!col.pk}
              onClick={() => update(col.id, { pk: !col.pk })}
            >
              PK
            </button>
            <button
              type="button"
              className={`studio-chip ${col.fk ? 'is-on' : ''}`}
              aria-pressed={!!col.fk}
              onClick={() => update(col.id, { fk: !col.fk })}
            >
              FK
            </button>
            <button
              type="button"
              className="studio-x"
              aria-label={`${col.name} 컬럼 지우기`}
              onClick={() => remove(col.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="studio-btn" onClick={add}>
        컬럼 추가
      </button>
    </>
  );
}

function EdgeFields({
  edge,
  onEdge,
  onDelete,
}: {
  edge: FlowEdgeType;
  onEdge: Props['onEdge'];
  onDelete: () => void;
}) {
  const data = edge.data ?? {};
  const set = (patch: Partial<FlowData>) => onEdge(edge.id, patch);
  return (
    <div className="studio-panel">
      <h2 className="studio-panel-title">연결선</h2>
      <Field label="라벨">
        <input
          className="studio-input"
          value={data.label ?? ''}
          placeholder="예) HTTPS · 443"
          onChange={(e) => set({ label: e.target.value })}
        />
      </Field>
      <Field label="단계 번호">
        <input
          className="studio-input"
          type="number"
          min={1}
          value={data.step ?? ''}
          placeholder="비우면 단계 재생에서 빠집니다"
          onChange={(e) => {
            const n = Math.floor(Number(e.target.value));
            set({
              step:
                e.target.value === '' || !Number.isFinite(n)
                  ? undefined
                  : Math.max(1, n),
            });
          }}
        />
      </Field>
      <Field label="끝 모양">
        <select
          className="studio-input"
          value={data.cardinality ?? 'none'}
          onChange={(e) => {
            const cardinality = pick(CARDINALITIES, e.target.value);
            if (cardinality) set({ cardinality });
          }}
        >
          {CARDINALITIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      <label className="studio-check">
        <input
          type="checkbox"
          checked={!!data.animated}
          onChange={(e) => set({ animated: e.target.checked })}
        />
        흐름 재생 때 패킷이 지나감
      </label>
      <label className="studio-check">
        <input
          type="checkbox"
          checked={!!data.blocked}
          onChange={(e) => set({ blocked: e.target.checked })}
        />
        막힘 — 도중에 버려지는 통신
      </label>
      <label className="studio-check">
        <input
          type="checkbox"
          checked={!!data.dashed}
          onChange={(e) => set({ dashed: e.target.checked })}
        />
        점선
      </label>
      <button
        type="button"
        className="studio-btn studio-btn--danger"
        onClick={onDelete}
      >
        지우기
      </button>
    </div>
  );
}
