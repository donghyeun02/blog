import type { DocMeta, StudioDoc } from './types';

const INDEX_KEY = 'studio:index';
const docKey = (id: string) => `studio:doc:${id}`;
const NODE_TYPES = new Set<string>(['icon', 'area', 'box', 'note', 'table']);

// 사생활 보호 모드나 저장소가 가득 찬 경우 localStorage 접근 자체가 예외를 던진다.
function read(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const isObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object';

export function isDoc(value: unknown): value is StudioDoc {
  if (!isObject(value)) return false;
  const { id, title, nodes, edges } = value;
  if (typeof id !== 'string' || typeof title !== 'string') return false;
  if (!Array.isArray(nodes) || !Array.isArray(edges)) return false;
  const nodesOk = nodes.every(
    (n) =>
      isObject(n) &&
      typeof n.id === 'string' &&
      NODE_TYPES.has(String(n.type)) &&
      isObject(n.position) &&
      isObject(n.data)
  );
  const edgesOk = edges.every(
    (e) =>
      isObject(e) &&
      typeof e.id === 'string' &&
      typeof e.source === 'string' &&
      typeof e.target === 'string'
  );
  return nodesOk && edgesOk;
}

export function listDocs(): DocMeta[] {
  const index = read(INDEX_KEY);
  if (!Array.isArray(index)) return [];
  return index
    .filter(
      (d): d is DocMeta =>
        isObject(d) &&
        typeof d.id === 'string' &&
        typeof d.title === 'string' &&
        typeof d.updatedAt === 'number'
    )
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function loadDoc(id: string): StudioDoc | null {
  const doc = read(docKey(id));
  return isDoc(doc) ? doc : null;
}

export function saveDoc(doc: StudioDoc): boolean {
  if (!write(docKey(doc.id), doc)) return false;
  const meta: DocMeta = {
    id: doc.id,
    title: doc.title,
    updatedAt: doc.updatedAt,
  };
  return write(INDEX_KEY, [meta, ...listDocs().filter((d) => d.id !== doc.id)]);
}

export function deleteDoc(id: string): void {
  try {
    localStorage.removeItem(docKey(id));
  } catch {
    // 저장소를 못 쓰는 환경이면 지울 것도 없다.
  }
  write(
    INDEX_KEY,
    listDocs().filter((d) => d.id !== id)
  );
}

export const fileSlug = (title: string) =>
  title
    .trim()
    .replace(/[\\/:*?"<>|\s]+/g, '-')
    .slice(0, 60) || 'diagram';

export function downloadUrl(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function exportJson(doc: StudioDoc) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' })
  );
  downloadUrl(url, `${fileSlug(doc.title)}.json`);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function importJson(file: File): Promise<StudioDoc> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(await file.text());
  } catch {
    throw new Error('JSON 파일이 아닙니다.');
  }
  if (!isDoc(parsed))
    throw new Error('스튜디오에서 내보낸 도면 파일이 아닙니다.');
  return parsed;
}
