'use client';

import '@xyflow/react/dist/style.css';
import './studio.css';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ConnectionMode,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import { PlaybackContext, useStepPlayback } from './playback';
import { edgeTypes, nodeTypes } from './registry';
import { isDoc } from './storage';
import type { FlowEdgeType, PlayMode, StudioDoc, StudioNode } from './types';

type Props = { doc: string; caption: string; visible: boolean };

const FIT = { padding: 0.05 };

/** 네이버 클라우드 서비스 아이콘을 쓴 도면에만 출처를 붙인다. */
function NcpCredit({ data }: { data: StudioDoc }) {
  if (!data.nodes.some((node) => node.type === 'icon')) return null;
  return (
    <a
      className="studio-credit"
      href="https://www.ncloud.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      아이콘 © NAVER Cloud Corp.
    </a>
  );
}
const MODE_LABEL: Record<PlayMode, string> = {
  off: '정지',
  continuous: '흐름',
  steps: '단계',
};

export default function StudioViewer({ doc, caption, visible }: Props) {
  const [loaded, setLoaded] = useState<StudioDoc | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`/studio/docs/${doc}.json`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))
      )
      .then((json: unknown) => {
        if (!alive) return;
        if (isDoc(json)) setLoaded(json);
        else setFailed(true);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, [doc]);

  if (!loaded) {
    return (
      <>
        <div className="studio-viewer-stage">
          {failed ? (
            <p className="studio-viewer-error">도면을 불러오지 못했습니다.</p>
          ) : null}
        </div>
        <div className="studio-viewer-bar" aria-hidden="true" />
      </>
    );
  }
  return (
    <ReactFlowProvider>
      <Canvas data={loaded} doc={doc} caption={caption} visible={visible} />
    </ReactFlowProvider>
  );
}

// 틀 크기가 바뀔 때마다 도면을 다시 맞춘다. 창 크기·화면 회전뿐 아니라, 크게 보기 모달이
// 크기 0으로 그려졌다가 열리며 커지는 경우도 여기서 잡는다. fitView 옵션은 첫 렌더만 맞춘다.
function FitOnResize() {
  const width = useStore((state) => state.width);
  const height = useStore((state) => state.height);
  const { fitView } = useReactFlow();
  useEffect(() => {
    if (width === 0 || height === 0) return;
    const frame = requestAnimationFrame(() => void fitView(FIT));
    return () => cancelAnimationFrame(frame);
  }, [width, height, fitView]);
  return null;
}

// 글 속 도면과 크게 보기가 같은 설정을 쓰되, 크게 보기에서만 이동·확대를 허용한다.
function DiagramFlow({
  data,
  interactive,
}: {
  data: StudioDoc;
  interactive: boolean;
}) {
  return (
    <ReactFlow<StudioNode, FlowEdgeType>
      defaultNodes={data.nodes}
      defaultEdges={data.edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      // 핸들을 전부 source로 두고 느슨한 모드로 target처럼 쓴다. 편집기와 같아야 선이 이어진다.
      connectionMode={ConnectionMode.Loose}
      nodesDraggable={false}
      nodesConnectable={false}
      nodesFocusable={false}
      edgesFocusable={false}
      elementsSelectable={false}
      // 글을 읽는 중에는 휠·드래그·핀치를 페이지 스크롤에 양보한다.
      panOnDrag={interactive}
      panOnScroll={false}
      zoomOnScroll={interactive}
      zoomOnPinch={interactive}
      zoomOnDoubleClick={interactive}
      preventScrolling={interactive}
      fitView
      fitViewOptions={FIT}
      minZoom={0.05}
      maxZoom={interactive ? 3 : 1.4}
    >
      <FitOnResize />
      {interactive ? <Controls showInteractive={false} /> : null}
    </ReactFlow>
  );
}

function Canvas({
  data,
  doc,
  caption,
  visible,
}: {
  data: StudioDoc;
  doc: string;
  caption: string;
  visible: boolean;
}) {
  const hasFlow = data.edges.some((e) => e.data?.animated);
  const [mode, setMode] = useState<PlayMode>(() =>
    data.edges.some((e) => typeof e.data?.step === 'number')
      ? 'steps'
      : hasFlow
        ? 'continuous'
        : 'off'
  );
  const [expanded, setExpanded] = useState(false);
  const { playback, hasSteps, stepLabel, resetSteps } = useStepPlayback(
    data.edges,
    mode,
    !visible && !expanded
  );

  const modes: PlayMode[] = [
    'off',
    ...(hasFlow ? ['continuous' as const] : []),
    ...(hasSteps ? ['steps' as const] : []),
  ];

  return (
    <PlaybackContext value={playback}>
      <div className="studio-viewer-stage">
        <div className="studio-viewer-flow" role="img" aria-label={caption}>
          <DiagramFlow data={data} interactive={false} />
        </div>
        <NcpCredit data={data} />
      </div>
      <div className="studio-viewer-bar">
        {modes.length > 1 ? (
          <div className="studio-seg" role="radiogroup" aria-label="흐름 재생">
            {modes.map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                className={`studio-seg-btn ${mode === m ? 'is-on' : ''}`}
                onClick={() => {
                  setMode(m);
                  resetSteps();
                }}
              >
                {MODE_LABEL[m]}
              </button>
            ))}
          </div>
        ) : null}
        {mode === 'steps' && stepLabel ? (
          <span className="studio-step-count">{stepLabel}</span>
        ) : null}
        <button
          type="button"
          className="studio-viewer-action"
          onClick={() => setExpanded(true)}
        >
          크게 보기
        </button>
        <Link
          className="studio-viewer-open"
          href={`/studio?open=${doc}`}
          prefetch={false}
        >
          스튜디오에서 열기 ↗
        </Link>
      </div>
      {expanded ? (
        <Expanded data={data} caption={caption} onOpenChange={setExpanded} />
      ) : null}
    </PlaybackContext>
  );
}

function Expanded({
  data,
  caption,
  onOpenChange,
}: {
  data: StudioDoc;
  caption: string;
  onOpenChange: (open: boolean) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  // 모달 dialog로 띄워 포커스를 가두고 Esc로 닫는다. 뒤 페이지는 스크롤되지 않게 잠근다.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    const onCancel = (event: Event) => {
      event.preventDefault();
      onOpenChange(false);
    };
    dialog.addEventListener('cancel', onCancel);
    return () => {
      dialog.removeEventListener('cancel', onCancel);
      root.style.overflow = previous;
      if (dialog.open) dialog.close();
    };
  }, [onOpenChange]);

  return (
    <dialog
      ref={ref}
      className="studio-expanded"
      aria-label={caption}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div className="studio-expanded-head">
        <span className="studio-expanded-title">{caption}</span>
        <button
          type="button"
          className="studio-x"
          aria-label="크게 보기 닫기"
          onClick={() => onOpenChange(false)}
        >
          ×
        </button>
      </div>
      <div className="studio-expanded-stage">
        <ReactFlowProvider>
          <DiagramFlow data={data} interactive />
        </ReactFlowProvider>
        <NcpCredit data={data} />
      </div>
    </dialog>
  );
}
