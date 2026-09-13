'use client';

import { useRef } from 'react';
import { TEMPLATES, type TemplateId } from './templates';
import type { DocMeta, PlayMode } from './types';

export type ExportKind = 'png' | 'svg' | 'json';

type Props = {
  docs: readonly DocMeta[];
  currentId: string;
  onSwitch: (id: string) => void;
  onNew: (template: TemplateId) => void;
  onDeleteDoc: () => void;
  mode: PlayMode;
  onMode: (mode: PlayMode) => void;
  stepLabel: string | null;
  onExport: (kind: ExportKind) => void;
  onImport: (file: File) => void;
  notice: string | null;
  onDismiss: () => void;
};

const MODES: readonly { value: PlayMode; label: string; title: string }[] = [
  { value: 'off', label: '정지', title: '움직임 없이 봅니다' },
  {
    value: 'continuous',
    label: '흐름',
    title: '움직임을 켠 선마다 패킷이 계속 흐릅니다',
  },
  {
    value: 'steps',
    label: '단계',
    title: '단계 번호 순서대로 한 구간씩 흐릅니다',
  },
];

const TEMPLATE_IDS = new Set<string>(TEMPLATES.map((t) => t.id));

export function Toolbar({
  docs,
  currentId,
  onSwitch,
  onNew,
  onDeleteDoc,
  mode,
  onMode,
  stepLabel,
  onExport,
  onImport,
  notice,
  onDismiss,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="studio-bar-wrap">
      <div className="studio-bar" role="toolbar" aria-label="도면 도구">
        <div className="studio-bar-group">
          <span className="studio-brand">스튜디오</span>
          <select
            className="studio-input studio-input--bar"
            aria-label="도면 고르기"
            value={currentId}
            onChange={(e) => onSwitch(e.target.value)}
          >
            {docs.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title || '제목 없음'}
              </option>
            ))}
          </select>
          <select
            className="studio-input studio-input--bar"
            aria-label="새 도면 만들기"
            value=""
            onChange={(e) => {
              if (TEMPLATE_IDS.has(e.target.value))
                onNew(e.target.value as TemplateId);
            }}
          >
            <option value="">+ 새 도면</option>
            {TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title} — {t.description}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="studio-btn studio-btn--ghost"
            onClick={onDeleteDoc}
          >
            도면 지우기
          </button>
        </div>

        <div className="studio-bar-group">
          <div className="studio-seg" role="radiogroup" aria-label="흐름 재생">
            {MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                role="radio"
                aria-checked={mode === m.value}
                title={m.title}
                className={`studio-seg-btn ${mode === m.value ? 'is-on' : ''}`}
                onClick={() => onMode(m.value)}
              >
                {m.label}
              </button>
            ))}
          </div>
          {mode === 'steps' ? (
            <span className="studio-step-count" aria-live="polite">
              {stepLabel ?? '단계 번호가 매겨진 선이 없습니다'}
            </span>
          ) : null}
        </div>

        <div className="studio-bar-group">
          <button
            type="button"
            className="studio-btn studio-btn--ghost"
            onClick={() => fileRef.current?.click()}
          >
            불러오기
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImport(file);
              e.target.value = '';
            }}
          />
          <button
            type="button"
            className="studio-btn studio-btn--ghost"
            onClick={() => onExport('json')}
          >
            JSON
          </button>
          <button
            type="button"
            className="studio-btn studio-btn--ghost"
            onClick={() => onExport('svg')}
          >
            SVG
          </button>
          <button
            type="button"
            className="studio-btn"
            onClick={() => onExport('png')}
          >
            PNG로 내보내기
          </button>
        </div>
      </div>

      {notice ? (
        <p className="studio-notice" role="status">
          <span>{notice}</span>
          <button
            type="button"
            className="studio-x"
            aria-label="알림 닫기"
            onClick={onDismiss}
          >
            ×
          </button>
        </p>
      ) : null}
    </div>
  );
}
