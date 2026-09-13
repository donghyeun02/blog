'use client';

import { useState } from 'react';
import { DND_MIME } from './factory';
import { ICONS, ICON_CATEGORIES, type StudioIcon } from './icons';
import type { AddSpec } from './types';

const SHAPES: readonly { spec: AddSpec; label: string; hint: string }[] = [
  {
    spec: { type: 'box', kind: 'client', label: '클라이언트' },
    label: '클라이언트',
    hint: '브라우저·앱',
  },
  {
    spec: { type: 'box', kind: 'service', label: '서비스' },
    label: '서비스',
    hint: 'API·서버',
  },
  {
    spec: { type: 'box', kind: 'database', label: '데이터베이스' },
    label: 'DB',
    hint: '저장소',
  },
  {
    spec: { type: 'box', kind: 'queue', label: '메시지 큐' },
    label: '큐',
    hint: '메시지',
  },
  {
    spec: { type: 'box', kind: 'external', label: '외부 서비스' },
    label: '외부',
    hint: '3rd party',
  },
  { spec: { type: 'table' }, label: '테이블', hint: 'ERD' },
  {
    spec: { type: 'area', variant: 'vpc', label: 'VPC' },
    label: 'VPC',
    hint: '점선 영역',
  },
  {
    spec: { type: 'area', variant: 'subnet', label: 'Subnet' },
    label: 'Subnet',
    hint: '영역',
  },
  {
    spec: { type: 'area', variant: 'zone', label: 'KR-1 존' },
    label: '존',
    hint: '영역',
  },
  { spec: { type: 'note' }, label: '메모', hint: '글' },
];

type Props = { onAdd: (spec: AddSpec) => void };

export function Palette({ onAdd }: Props) {
  const [query, setQuery] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>(
    ICON_CATEGORIES[0] ?? null
  );
  const q = query.trim().toLowerCase();
  const matches = q
    ? ICONS.filter((icon) => icon.name.toLowerCase().includes(q))
    : null;

  // 끌어다 놓기와 눌러서 추가를 같이 준다. 터치 기기에서는 HTML 드래그가 안 되기 때문이다.
  const itemProps = (spec: AddSpec) => ({
    draggable: true,
    onDragStart: (event: React.DragEvent) => {
      event.dataTransfer.setData(DND_MIME, JSON.stringify(spec));
      event.dataTransfer.effectAllowed = 'move';
    },
    onClick: () => onAdd(spec),
  });

  const iconGrid = (icons: readonly StudioIcon[]) => (
    <div className="studio-icon-grid">
      {icons.map((icon) => (
        <button
          key={icon.id}
          type="button"
          className="studio-icon-item"
          title={icon.name}
          {...itemProps({ type: 'icon', iconId: icon.id, label: icon.name })}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={icon.src}
            alt=""
            width={32}
            height={32}
            loading="lazy"
            draggable={false}
          />
          <span>{icon.name}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="studio-palette-inner">
      <section>
        <h2 className="studio-panel-title">도형</h2>
        <div className="studio-shape-grid">
          {SHAPES.map((shape) => (
            <button
              key={shape.label}
              type="button"
              className="studio-shape-item"
              {...itemProps(shape.spec)}
            >
              <span className="studio-shape-name">{shape.label}</span>
              <span className="studio-shape-hint">{shape.hint}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="studio-panel-title">
          아이콘 <span className="studio-count">{ICONS.length}</span>
        </h2>
        <p className="studio-palette-credit">
          아이콘{' '}
          <a
            href="https://www.ncloud.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            © NAVER Cloud Corp.
          </a>
        </p>
        <input
          type="search"
          className="studio-input"
          placeholder="아이콘 찾기 — 예) Load Balancer"
          aria-label="아이콘 찾기"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {matches ? (
          matches.length ? (
            iconGrid(matches)
          ) : (
            <p className="studio-empty">맞는 아이콘이 없습니다.</p>
          )
        ) : (
          <ul className="studio-categories">
            {ICON_CATEGORIES.map((category) => {
              const isOpen = openCategory === category;
              const icons = ICONS.filter((icon) => icon.category === category);
              return (
                <li key={category}>
                  <button
                    type="button"
                    className="studio-category"
                    aria-expanded={isOpen}
                    onClick={() => setOpenCategory(isOpen ? null : category)}
                  >
                    <span>{category}</span>
                    <span className="studio-count">{icons.length}</span>
                  </button>
                  {isOpen ? iconGrid(icons) : null}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
