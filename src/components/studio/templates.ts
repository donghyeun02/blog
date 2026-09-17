import { column, createNode, flowEdge } from './factory';
import autoscaling from './examples/ncp-autoscaling.json';
import ecommerce from './examples/ncp-ecommerce.json';
import hybrid from './examples/ncp-hybrid.json';
import iot from './examples/ncp-iot.json';
import type { AddSpec, FlowEdgeType, StudioNode } from './types';

export type TemplateId =
  | 'ncp-autoscaling'
  | 'ncp-ecommerce'
  | 'ncp-hybrid'
  | 'ncp-iot'
  | 'erd'
  | 'blank';

export const TEMPLATES: readonly {
  id: TemplateId;
  title: string;
  description: string;
}[] = [
  {
    id: 'ncp-autoscaling',
    title: 'Auto Scaling 가용성 확보',
    description: '로드밸런서와 Auto Scaling으로 웹·앱 계층을 늘린다',
  },
  {
    id: 'ncp-ecommerce',
    title: 'E-Commerce (소규모)',
    description: '두 존에 나눈 Web·WAS와 Cloud DB, 외부 결제 연동',
  },
  {
    id: 'ncp-hybrid',
    title: 'Hybrid Cloud Hosting',
    description: '클라우드와 데이터센터를 Private Subnet·VPN으로 잇는다',
  },
  {
    id: 'ncp-iot',
    title: 'IoT Analysis Platform',
    description: 'MQTT 수집부터 스트림 처리·저장·머신러닝까지',
  },
  { id: 'erd', title: 'ERD', description: '테이블과 컬럼, 1:N 관계' },
  { id: 'blank', title: '빈 캔버스', description: '처음부터 그리기' },
];

type Built = { title: string; nodes: StudioNode[]; edges: FlowEdgeType[] };

// 네이버 클라우드 「서비스 아이콘 및 활용 예시」 20~23쪽을 옮긴 도면.
// docs/studio/build_examples.py로 만들고, 직접 고치지 않는다.
const EXAMPLES = {
  'ncp-autoscaling': autoscaling,
  'ncp-ecommerce': ecommerce,
  'ncp-hybrid': hybrid,
  'ncp-iot': iot,
} as const;

// 모듈에 한 벌만 있는 JSON을 도면마다 따로 편집하므로 깊은 복사해서 넘긴다.
function fromExample(json: (typeof EXAMPLES)[keyof typeof EXAMPLES]): Built {
  const copy = structuredClone(json);
  return {
    title: copy.title,
    nodes: copy.nodes as unknown as StudioNode[],
    edges: copy.edges as unknown as FlowEdgeType[],
  };
}

const at = (spec: AddSpec, x: number, y: number) => createNode(spec, { x, y });

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
    case 'erd':
      return erd();
    case 'blank':
      return { title: '새 도면', nodes: [], edges: [] };
    default:
      return fromExample(EXAMPLES[id]);
  }
}
