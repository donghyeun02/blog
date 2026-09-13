import { column, createNode, flowEdge } from './factory';
import { findIconId } from './icons';
import type { AddSpec, FlowEdgeType, StudioNode } from './types';

export type TemplateId = 'flow' | 'cloud' | 'erd' | 'blank';

export const TEMPLATES: readonly {
  id: TemplateId;
  title: string;
  description: string;
}[] = [
  {
    id: 'flow',
    title: '요청 흐름',
    description: '브라우저에서 DB까지 요청이 지나가는 순서',
  },
  {
    id: 'cloud',
    title: '클라우드 구성도',
    description: 'VPC와 존, 로드밸런서, 서버와 DB',
  },
  { id: 'erd', title: 'ERD', description: '테이블과 컬럼, 1:N 관계' },
  { id: 'blank', title: '빈 캔버스', description: '처음부터 그리기' },
];

type Built = { title: string; nodes: StudioNode[]; edges: FlowEdgeType[] };

const at = (spec: AddSpec, x: number, y: number) => createNode(spec, { x, y });
const SIDE = { sourceHandle: 'r', targetHandle: 'l' };
const DOWN = { sourceHandle: 'b', targetHandle: 't' };

// 아이콘을 못 찾으면 같은 이름의 박스로 대신한다.
function iconOr(
  query: string,
  label: string,
  sub: string,
  x: number,
  y: number
) {
  const iconId = findIconId(query);
  return iconId
    ? at({ type: 'icon', iconId, label, sub }, x, y)
    : at({ type: 'box', kind: 'service', label, sub }, x, y);
}

function requestFlow(): Built {
  const browser = at(
    { type: 'box', kind: 'client', label: '브라우저' },
    0,
    168
  );
  const lb = iconOr('Load Balancer', 'Load Balancer', 'HTTPS 종료', 232, 140);
  const api = at(
    { type: 'box', kind: 'service', label: 'API 서버', sub: 'Spring Boot' },
    456,
    168
  );
  const cache = at(
    { type: 'box', kind: 'database', label: 'Redis', sub: '캐시' },
    736,
    40
  );
  const db = at(
    { type: 'box', kind: 'database', label: 'MySQL', sub: '원본 데이터' },
    736,
    296
  );
  const queue = at(
    { type: 'box', kind: 'queue', label: '메시지 큐' },
    456,
    400
  );
  const worker = at(
    { type: 'box', kind: 'service', label: '알림 워커' },
    736,
    480
  );
  const note = at(
    {
      type: 'note',
      text: "위에서 '단계'를 누르면\n번호 순서대로 한 구간씩 흐릅니다.",
    },
    0,
    400
  );
  return {
    title: '요청 흐름',
    nodes: [browser, lb, api, cache, db, queue, worker, note],
    edges: [
      flowEdge(browser.id, lb.id, { step: 1, label: 'HTTPS' }, SIDE),
      flowEdge(lb.id, api.id, { step: 2 }, SIDE),
      flowEdge(api.id, cache.id, { step: 3, label: '조회' }, SIDE),
      flowEdge(
        api.id,
        db.id,
        { step: 4, label: '캐시 미스', dashed: true },
        SIDE
      ),
      flowEdge(api.id, queue.id, { step: 5, label: '이벤트 발행' }, DOWN),
      flowEdge(queue.id, worker.id, { step: 6 }, SIDE),
    ],
  };
}

function cloud(): Built {
  const vpc = at(
    {
      type: 'area',
      variant: 'vpc',
      label: 'VPC  10.0.0.0/16',
      width: 800,
      height: 470,
    },
    0,
    120
  );
  const zone1 = at(
    {
      type: 'area',
      variant: 'zone',
      label: 'KR-1 존',
      width: 360,
      height: 300,
    },
    24,
    266
  );
  const zone2 = at(
    {
      type: 'area',
      variant: 'zone',
      label: 'KR-2 존',
      width: 360,
      height: 300,
    },
    416,
    266
  );
  const user = at({ type: 'box', kind: 'client', label: '사용자' }, 332, 0);
  const lb = iconOr(
    'Load Balancer',
    'Load Balancer',
    'Public Subnet',
    356,
    150
  );
  const web1 = iconOr('Server', '웹 서버', '10.0.1.10', 158, 312);
  const web2 = iconOr('Server', '웹 서버', '10.0.2.10', 550, 312);
  const db1 = iconOr('MySQL', 'Cloud DB', 'Primary', 158, 452);
  const db2 = iconOr('MySQL', 'Cloud DB', 'Standby', 550, 452);
  return {
    title: '클라우드 구성도',
    nodes: [vpc, zone1, zone2, user, lb, web1, web2, db1, db2],
    edges: [
      flowEdge(user.id, lb.id, { step: 1, label: 'HTTPS' }, DOWN),
      flowEdge(lb.id, web1.id, { step: 2 }, DOWN),
      flowEdge(lb.id, web2.id, { step: 2 }, DOWN),
      flowEdge(web1.id, db1.id, { step: 3 }, DOWN),
      flowEdge(web2.id, db2.id, { step: 3 }, DOWN),
      flowEdge(
        db1.id,
        db2.id,
        { label: '복제', dashed: true, animated: false },
        SIDE
      ),
    ],
  };
}

function erd(): Built {
  const userId = column('id', 'bigint', { pk: true });
  const users = at(
    {
      type: 'table',
      name: 'users',
      columns: [
        userId,
        column('email', 'varchar(255)'),
        column('name', 'varchar(50)'),
        column('created_at', 'timestamp'),
      ],
    },
    0,
    80
  );
  const postId = column('id', 'bigint', { pk: true });
  const postUser = column('user_id', 'bigint', { fk: true });
  const posts = at(
    {
      type: 'table',
      name: 'posts',
      columns: [
        postId,
        postUser,
        column('title', 'varchar(200)'),
        column('body', 'text'),
        column('created_at', 'timestamp'),
      ],
    },
    380,
    0
  );
  const commentPost = column('post_id', 'bigint', { fk: true });
  const commentUser = column('user_id', 'bigint', { fk: true });
  const comments = at(
    {
      type: 'table',
      name: 'comments',
      columns: [
        column('id', 'bigint', { pk: true }),
        commentPost,
        commentUser,
        column('body', 'text'),
        column('created_at', 'timestamp'),
      ],
    },
    760,
    140
  );
  return {
    title: 'ERD',
    nodes: [users, posts, comments],
    edges: [
      flowEdge(
        users.id,
        posts.id,
        { cardinality: '1:N' },
        { sourceHandle: `${userId.id}-r`, targetHandle: `${postUser.id}-l` }
      ),
      flowEdge(
        posts.id,
        comments.id,
        { cardinality: '1:N' },
        { sourceHandle: `${postId.id}-r`, targetHandle: `${commentPost.id}-l` }
      ),
      flowEdge(
        users.id,
        comments.id,
        { cardinality: '1:N', dashed: true },
        { sourceHandle: `${userId.id}-r`, targetHandle: `${commentUser.id}-l` }
      ),
    ],
  };
}

export function buildTemplate(id: TemplateId): Built {
  switch (id) {
    case 'flow':
      return requestFlow();
    case 'cloud':
      return cloud();
    case 'erd':
      return erd();
    case 'blank':
      return { title: '새 도면', nodes: [], edges: [] };
  }
}
