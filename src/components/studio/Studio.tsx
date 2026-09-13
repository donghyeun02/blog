'use client';

import '@xyflow/react/dist/style.css';
import './studio.css';

import { useEffect, useRef, useState } from 'react';
import {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  ConnectionMode,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
} from '@xyflow/react';

import { Inspector } from './Inspector';
import { Palette } from './Palette';
import { Toolbar, type ExportKind } from './Toolbar';
import {
  DND_MIME,
  createNode,
  flowEdge,
  markerFor,
  newId,
  parseSpec,
} from './factory';
import { PlaybackContext, useStepPlayback } from './playback';
import { edgeTypes, nodeTypes } from './registry';
import {
  deleteDoc,
  downloadUrl,
  exportJson,
  fileSlug,
  importJson,
  isDoc,
  listDocs,
  loadDoc,
  saveDoc,
} from './storage';
import { buildTemplate, type TemplateId } from './templates';
import type {
  AddSpec,
  DocMeta,
  FlowData,
  FlowEdgeType,
  PlayMode,
  StudioDoc,
  StudioNode,
} from './types';

const SAVE_DELAY_MS = 400;
const EXPORT_PADDING = 48;
const POST_DOC = /^[a-z0-9-]{1,60}$/;

const metaOf = (doc: StudioDoc): DocMeta => ({
  id: doc.id,
  title: doc.title,
  updatedAt: doc.updatedAt,
});

function freshDoc(template: TemplateId): StudioDoc {
  return { id: newId('d'), updatedAt: Date.now(), ...buildTemplate(template) };
}

// 처음 들어오면 가장 최근 도면을 열고, 없으면 움직임이 바로 보이는 요청 흐름 예시로 시작한다.
function initialDoc(): StudioDoc {
  const latest = listDocs()[0];
  return (latest && loadDoc(latest.id)) || freshDoc('flow');
}

// 글 속 도면의 "스튜디오에서 열기"는 /studio?open=<도면 이름>으로 들어온다.
function readOpenParam(): string | null {
  const value = new URLSearchParams(window.location.search).get('open');
  return value && POST_DOC.test(value) ? value : null;
}

export default function Studio() {
  return (
    <ReactFlowProvider>
      <Editor />
    </ReactFlowProvider>
  );
}

function Editor() {
  const [start] = useState(initialDoc);
  const [openParam] = useState(readOpenParam);
  const [meta, setMeta] = useState<DocMeta>(() => metaOf(start));
  const [docs, setDocs] = useState<DocMeta[]>(() => {
    const saved = listDocs();
    return saved.some((d) => d.id === start.id)
      ? saved
      : [metaOf(start), ...saved];
  });
  const [nodes, setNodes, onNodesChange] = useNodesState<StudioNode>(
    start.nodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdgeType>(
    start.edges
  );
  const [mode, setMode] = useState<PlayMode>('continuous');
  const [notice, setNotice] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    screenToFlowPosition,
    getNodes,
    getNodesBounds,
    fitView,
    deleteElements,
  } = useReactFlow<StudioNode, FlowEdgeType>();
  const { playback, stepLabel, resetSteps } = useStepPlayback(edges, mode);

  // 편집할 때마다 쓰지 않고 잠깐 모았다가 브라우저 저장소에 쓴다.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!saveDoc({ ...meta, updatedAt: Date.now(), nodes, edges })) {
        setNotice(
          '브라우저 저장소에 저장하지 못했습니다. JSON으로 내보내 두세요.'
        );
      }
    }, SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [meta, nodes, edges]);

  // 글에서 연 도면은 이 브라우저에 사본으로 저장해서 연다. 같은 도면을 다시 열면 사본을 새로 덮는다.
  useEffect(() => {
    if (!openParam) return;
    let alive = true;
    fetch(`/studio/docs/${openParam}.json`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))
      )
      .then((json: unknown) => {
        if (!alive) return;
        if (!isDoc(json)) throw new Error('도면 형식이 아닙니다.');
        const doc: StudioDoc = {
          ...json,
          id: `post-${openParam}`,
          updatedAt: Date.now(),
        };
        saveDoc(doc);
        setDocs((current) => [
          metaOf(doc),
          ...current.filter((d) => d.id !== doc.id),
        ]);
        setMeta(metaOf(doc));
        setNodes(doc.nodes);
        setEdges(doc.edges);
        requestAnimationFrame(
          () => void fitView({ padding: 0.2, duration: 300 })
        );
        window.history.replaceState(null, '', window.location.pathname);
        setNotice(
          `글에 있던 "${doc.title}" 도면을 열었습니다. 고친 내용은 이 브라우저에만 저장됩니다.`
        );
      })
      .catch(() => {
        if (alive) setNotice('글에서 연 도면을 불러오지 못했습니다.');
      });
    return () => {
      alive = false;
    };
  }, [openParam, setNodes, setEdges, fitView]);

  // ── 캔버스 편집 ───────────────────────────────────────────
  const onConnect = (connection: Connection) =>
    setEdges((current) =>
      addEdge(
        flowEdge(connection.source, connection.target, {}, connection),
        current
      )
    );

  const addNode = (spec: AddSpec, position: { x: number; y: number }) => {
    const node = createNode(spec, position);
    // 영역은 다른 도형 뒤에 깔려야 해서 배열 앞에 넣는다.
    setNodes((current) =>
      node.type === 'area' ? [node, ...current] : [...current, node]
    );
  };

  const addAtCenter = (spec: AddSpec) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    addNode(
      spec,
      screenToFlowPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      })
    );
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const spec = parseSpec(event.dataTransfer.getData(DND_MIME));
    if (spec)
      addNode(
        spec,
        screenToFlowPosition({ x: event.clientX, y: event.clientY })
      );
  };

  const selectedNode = nodes.find((n) => n.selected);
  const selectedEdge = selectedNode ? undefined : edges.find((e) => e.selected);

  const patchNode = (id: string, patch: Record<string, unknown>) =>
    setNodes((current) =>
      current.map((n) =>
        n.id === id
          ? ({ ...n, data: { ...n.data, ...patch } } as StudioNode)
          : n
      )
    );

  const patchEdge = (id: string, patch: Partial<FlowData>) =>
    setEdges((current) =>
      current.map((e) => {
        if (e.id !== id) return e;
        const data = { ...e.data, ...patch };
        return { ...e, data, markerEnd: markerFor(data) };
      })
    );

  const removeSelected = () =>
    void deleteElements({
      nodes: nodes.filter((n) => n.selected),
      edges: edges.filter((e) => e.selected),
    });

  // ── 도면 관리 ─────────────────────────────────────────────
  const open = (doc: StudioDoc) => {
    setMeta(metaOf(doc));
    setNodes(doc.nodes);
    setEdges(doc.edges);
    resetSteps();
    requestAnimationFrame(() => void fitView({ padding: 0.2, duration: 300 }));
  };

  const remember = (doc: StudioDoc) =>
    setDocs((current) => [
      metaOf(doc),
      ...current.filter((d) => d.id !== doc.id),
    ]);

  const onNew = (template: TemplateId) => {
    const doc = freshDoc(template);
    saveDoc(doc);
    remember(doc);
    open(doc);
  };

  const onSwitch = (id: string) => {
    const doc = loadDoc(id);
    if (doc) open(doc);
    else setNotice('도면을 불러오지 못했습니다.');
  };

  const onDeleteDoc = () => {
    if (
      !window.confirm(
        `"${meta.title || '제목 없음'}" 도면을 지울까요? 되돌릴 수 없습니다.`
      )
    )
      return;
    deleteDoc(meta.id);
    const rest = docs.filter((d) => d.id !== meta.id);
    setDocs(rest);
    const next = rest[0] ? loadDoc(rest[0].id) : null;
    if (next) open(next);
    else onNew('blank');
  };

  const onTitle = (title: string) => {
    setMeta((current) => ({ ...current, title }));
    setDocs((current) =>
      current.map((d) => (d.id === meta.id ? { ...d, title } : d))
    );
  };

  const onImport = async (file: File) => {
    try {
      const doc = {
        ...(await importJson(file)),
        id: newId('d'),
        updatedAt: Date.now(),
      };
      saveDoc(doc);
      remember(doc);
      open(doc);
      setNotice(`"${doc.title}" 도면을 불러왔습니다.`);
    } catch (error) {
      setNotice(
        error instanceof Error ? error.message : '도면을 불러오지 못했습니다.'
      );
    }
  };

  const onExport = async (kind: ExportKind) => {
    if (kind === 'json') {
      exportJson({ ...meta, updatedAt: Date.now(), nodes, edges });
      return;
    }
    const all = getNodes();
    const viewport = canvasRef.current?.querySelector<HTMLElement>(
      '.react-flow__viewport'
    );
    if (!all.length || !viewport) {
      setNotice('내보낼 도형이 없습니다.');
      return;
    }
    try {
      const { toPng, toSvg } = await import('html-to-image');
      const bounds = getNodesBounds(all);
      const width = Math.ceil(bounds.width + EXPORT_PADDING * 2);
      const height = Math.ceil(bounds.height + EXPORT_PADDING * 2);
      // 화면의 확대·이동 상태와 상관없이 도형 전체가 1배율로 들어가도록 뷰포트를 옮겨서 찍는다.
      const render = kind === 'png' ? toPng : toSvg;
      const url = await render(viewport, {
        width,
        height,
        pixelRatio: 2,
        // SVG에 웹폰트를 통째로 넣으면 수 MB가 된다. PNG는 픽셀로 굳으니 폰트를 넣고 SVG는 뺀다.
        skipFonts: kind === 'svg',
        backgroundColor: '#FAFAFA',
        style: {
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${EXPORT_PADDING - bounds.x}px, ${EXPORT_PADDING - bounds.y}px) scale(1)`,
        },
        filter: (el) =>
          !(
            el instanceof HTMLElement &&
            el.classList.contains('react-flow__handle')
          ),
      });
      downloadUrl(url, `${fileSlug(meta.title)}.${kind}`);
    } catch {
      setNotice('이미지로 내보내지 못했습니다.');
    }
  };

  const onMode = (next: PlayMode) => {
    setMode(next);
    resetSteps();
  };

  return (
    <PlaybackContext value={playback}>
      <div className="studio">
        <Toolbar
          docs={docs}
          currentId={meta.id}
          onSwitch={onSwitch}
          onNew={onNew}
          onDeleteDoc={onDeleteDoc}
          mode={mode}
          onMode={onMode}
          stepLabel={stepLabel}
          onExport={(kind) => void onExport(kind)}
          onImport={(file) => void onImport(file)}
          notice={notice}
          onDismiss={() => setNotice(null)}
        />
        <div className="studio-body">
          <aside className="studio-palette" aria-label="도형과 아이콘">
            <Palette onAdd={addAtCenter} />
          </aside>
          <div
            ref={canvasRef}
            className="studio-canvas"
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            <ReactFlow<StudioNode, FlowEdgeType>
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              connectionMode={ConnectionMode.Loose}
              connectionLineType={ConnectionLineType.SmoothStep}
              elevateNodesOnSelect={false}
              deleteKeyCode={['Backspace', 'Delete']}
              snapToGrid
              snapGrid={[8, 8]}
              minZoom={0.2}
              maxZoom={2.5}
              fitView
              fitViewOptions={{ padding: 0.2 }}
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={16}
                size={1}
                color="#D2D2D7"
              />
              <Controls showInteractive={false} />
              <MiniMap pannable zoomable className="studio-minimap" />
            </ReactFlow>
          </div>
          <aside className="studio-inspector" aria-label="속성">
            <Inspector
              node={selectedNode}
              edge={selectedEdge}
              title={meta.title}
              onTitle={onTitle}
              onNode={patchNode}
              onEdge={patchEdge}
              onDelete={removeSelected}
            />
          </aside>
        </div>
      </div>
    </PlaybackContext>
  );
}
