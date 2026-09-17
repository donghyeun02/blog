"""블로그 글에 들어가는 스튜디오 도면을 코드로 만든다.

손으로 끌어다 만든 도면은 좌표가 매번 달라져 diff를 읽을 수 없다. 여기서 id와 좌표를
고정해 public/studio/docs/<id>.json으로 쓰고, 글에는 <StudioDiagram doc="<id>" ratio={...}/>로
넣는다. ratio는 이 스크립트가 도형 크기를 어림해서 계산해 출력한다.

    python3 docs/studio/build_docs.py
"""
import json, os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(ROOT, 'public', 'studio', 'docs')
ICON_IDS = set(re.findall(r"id:\s*['\"]([^'\"]+)['\"]",
                          open(os.path.join(ROOT, 'src', 'components', 'studio', 'icons.ts'), encoding='utf-8').read()))
ARROW = {'type': 'arrowclosed', 'width': 16, 'height': 16, 'color': '#1D1D1F'}


def text_width(text, size):
    # 한글은 글자 크기만큼, 라틴·숫자는 그 절반 남짓을 차지한다.
    return sum(size * (1.0 if ord(c) > 0x2E7F else 0.6) for c in text)


class Doc:
    def __init__(self, id, title):
        self.id, self.title = id, title
        self.areas, self.nodes, self.edges, self.bounds = [], [], [], {}

    def _add(self, node, w, h, top_extra=0, back=False):
        (self.areas if back else self.nodes).append(node)
        p = node['position']
        self.bounds[node['id']] = (p['x'], p['y'] - top_extra, w, h + top_extra)
        return node['id']

    def icon(self, id, icon, label, x, y, sub=None):
        assert icon in ICON_IDS, f'{self.id}: 없는 아이콘 {icon}'
        data = {'iconId': icon, 'label': label, **({'sub': sub} if sub else {})}
        w = max(92, min(170, max(text_width(label, 12.5), text_width(sub or '', 10.5)) + 16))
        return self._add({'id': id, 'type': 'icon', 'position': {'x': x, 'y': y}, 'data': data}, w, 82 + (20 if sub else 0))

    def box(self, id, kind, label, x, y, sub=None, width=None):
        data = {'label': label, 'kind': kind, **({'sub': sub} if sub else {}), **({'width': width} if width else {})}
        w = width or max(132, max(text_width(label, 13.5), text_width(sub or kind, 10.5)) + 36)
        return self._add({'id': id, 'type': 'box', 'position': {'x': x, 'y': y}, 'data': data}, w, 62 + (8 if kind == 'database' else 0))

    def area(self, id, variant, label, x, y, w, h):
        node = {'id': id, 'type': 'area', 'position': {'x': x, 'y': y}, 'zIndex': -1, 'width': w, 'height': h,
                'data': {'label': label, 'variant': variant}}
        # VPC 이름은 영역 위쪽 바깥에 붙는다.
        return self._add(node, w, h, top_extra=20 if variant == 'vpc' else 0, back=True)

    def note(self, id, text, x, y):
        lines = text.split('\n')
        w = min(280, max(text_width(l, 13) for l in lines) + 12)
        return self._add({'id': id, 'type': 'note', 'position': {'x': x, 'y': y}, 'data': {'text': text}}, w, len(lines) * 20 + 8)

    def edge(self, source, target, sh='r', th='l', **data):
        assert source in self.bounds and target in self.bounds, f'{self.id}: {source} → {target}'
        animated = data.pop('animated', None)
        if animated is None:
            animated = not data.get('cardinality')
        clean = {'animated': animated, **{k: v for k, v in data.items() if v not in (None, False, '')}}
        edge = {'id': f'e{len(self.edges) + 1}', 'type': 'flow', 'source': source, 'target': target,
                'sourceHandle': sh, 'targetHandle': th, 'data': clean}
        if not clean.get('blocked') and not clean.get('cardinality'):
            edge['markerEnd'] = ARROW
        self.edges.append(edge)

    def save(self):
        xs0 = min(b[0] for b in self.bounds.values())
        ys0 = min(b[1] for b in self.bounds.values())
        xs1 = max(b[0] + b[2] for b in self.bounds.values())
        ys1 = max(b[1] + b[3] for b in self.bounds.values())
        loop = lambda side: any(e['sourceHandle'] == side and e['targetHandle'] == side for e in self.edges)
        # 뷰어의 화면 맞춤은 노드만 본다. 도형 밖으로 돌아 나가는 선, 영역 바깥에 붙는 VPC 이름까지
        # 들어가도록 보이지 않는 영역으로 감싼다.
        fx0 = xs0 - 12 - (40 if loop('l') else 0)
        fx1 = xs1 + 12 + (40 if loop('r') else 0)
        fy0 = ys0 - 10 - (40 if loop('t') else 0)
        fy1 = ys1 + 10 + (40 if loop('b') else 0)
        frame = {'id': 'frame', 'type': 'area', 'position': {'x': fx0, 'y': fy0}, 'zIndex': -2,
                 'width': fx1 - fx0, 'height': fy1 - fy0, 'selectable': False, 'draggable': False,
                 'data': {'label': '', 'variant': 'ghost'}}
        doc = {'id': self.id, 'title': self.title, 'updatedAt': 0,
               'nodes': [frame] + self.areas + self.nodes, 'edges': self.edges}
        with open(os.path.join(OUT, f'{self.id}.json'), 'w', encoding='utf-8') as fh:
            json.dump(doc, fh, ensure_ascii=False, indent=1)
            fh.write('\n')
        return round((fx1 - fx0) / (fy1 - fy0), 3)


# ── 1일차 ────────────────────────────────────────────────────────
def day1():
    d = Doc('day1', '1일차 — VPC, Subnet, Route Table')
    d.icon('inet', 'internet', '인터넷', 329, 0)
    d.area('ops', 'vpc', 'cnp-s01-ops-vpc  10.50.0.0/16', 0, 130, 320, 322)
    d.area('opsPub', 'subnet', 'Public  10.50.80.0/26', 15, 158, 290, 134)
    d.icon('opsNat', 'nat-gateway', 'NAT Gateway', 111, 192, sub='공인 IP')
    d.area('opsPri', 'subnet', 'Private  10.50.0.0/24', 15, 308, 290, 124)
    d.box('opsSvr', 'external', '관리 서버', 85, 340, sub='2일차에 만든다', width=150)
    d.area('wld', 'vpc', 'cnp-s01-wld-vpc  10.60.0.0/16', 430, 130, 320, 322)
    d.area('wldPub', 'subnet', 'Public  NAT는 존마다', 445, 158, 290, 134)
    d.icon('wldNat', 'nat-gateway', 'NAT Gateway ×2', 530, 192, sub='KR-1 · KR-2')
    d.area('wldPri', 'subnet', 'Private  노드 대역', 445, 308, 290, 124)
    d.box('wldSvr', 'external', '노드', 515, 340, sub='2~4일차', width=150)
    d.icon('peer', 'vpc-peering', 'Peering ×2', 329, 330)
    d.edge('opsSvr', 'opsNat', 't', 'b', step=1)
    d.edge('wldSvr', 'wldNat', 't', 'b', step=1)
    d.edge('opsNat', 'inet', 't', 'l', step=2, label='Internet Gateway')
    d.edge('wldNat', 'inet', 't', 'r', step=2)
    d.edge('opsSvr', 'peer', 'r', 'l', dashed=True, animated=False)
    d.edge('peer', 'wldSvr', 'r', 'l', dashed=True, animated=False)
    return d

def net_direction():
    d = Doc('net-direction', 'Internet Gateway와 NAT Gateway')
    d.area('p1', 'plain', 'Internet Gateway — Public Subnet', 0, 0, 350, 230)
    d.icon('i1', 'internet', '인터넷', 25, 66)
    d.icon('s1', 'server', '공인 서버', 233, 66)
    d.edge('i1', 's1', step=1, label='들어온다')
    d.edge('s1', 'i1', 'b', 'b', step=2, label='나간다')
    d.area('p2', 'plain', 'NAT Gateway — Private Subnet', 380, 0, 370, 230)
    d.icon('i2', 'internet', '인터넷', 392, 66)
    d.icon('nat', 'nat-gateway', 'NAT', 519, 66)
    d.icon('s2', 'server', '사설 서버', 646, 66)
    d.edge('s2', 'nat', 'l', 'r', step=1)
    d.edge('nat', 'i2', 'l', 'r', step=2)
    d.edge('i2', 's2', 'b', 'b', step=3, blocked=True, label='먼저 들어올 수 없다')
    return d

def net_layers():
    d = Doc('net-layers', '패킷이 통과해야 하는 네 개의 관문')
    d.box('req', 'client', '요청', 20, 0, width=180)
    gates = [('route', 'Route Table', '어디로 보낼지 정한다', '비면 — 목적지 경로 없음'),
             ('nacl', 'NACL', 'Subnet 경계에서 검사', '비면 — 반환 규칙 없음'),
             ('acg', 'ACG', '서버 NIC에서 검사', '비면 — 포트 미허용'),
             ('svc', 'Service', '그 포트를 듣고 있는가', '비면 — 프로세스 미기동')]
    prev = 'req'
    for i, (gid, name, sub, fail) in enumerate(gates):
        y = 110 + i * 94
        d.box(gid, 'service', name, 0, y, sub=sub, width=220)
        d.note(f'{gid}Fail', fail, 270, y + 16)
        d.edge(prev, gid, 'b', 't', step=i + 1)
        prev = gid
    return d


# ── 2일차 ────────────────────────────────────────────────────────
def ssh_hang():
    d = Doc('ssh-hang', '요청은 도착했고 응답이 버려졌다')
    d.note('term', 'ubuntu@ops-mgmt:~$ ssh 10.60.48.6\n→ confused 에러', 0, 0)
    d.icon('mgmt', 'server', 'ops-mgmt', 20, 84, sub='10.50.0.x')
    d.icon('naclIn', 'acl', 'NACL IN', 320, 84, sub='TCP 22 허용')
    d.icon('mon', 'server', 'wld-mon', 620, 84, sub='10.60.48.6')
    d.icon('naclOut', 'acl', 'NACL OUT', 320, 250, sub='임시 포트 규칙 없음')
    d.edge('mgmt', 'naclIn', step=1, label='TCP 22')
    d.edge('naclIn', 'mon', step=2, label='도착')
    d.edge('mon', 'naclOut', 'b', 'r', step=3, dashed=True, label='응답')
    d.edge('naclOut', 'mgmt', 'l', 'b', step=4, blocked=True, label='여기서 버려진다')
    return d

def day2():
    d = Doc('day2', '2일차 — NACL과 ACG')
    d.box('pc', 'client', '학습자 PC', 0, 40, width=120)
    d.icon('vpn', 'ssl-vpn', 'SSL VPN', 170, 22, sub='IP Pool /23 · 443')
    d.area('ops', 'vpc', 'cnp-s01-ops-vpc  10.50.0.0/16', 400, 20, 300, 140)
    d.icon('mgmt', 'server', '관리 서버', 480, 36, sub='Prometheus · kubectl')
    d.area('wld', 'vpc', 'cnp-s01-wld-vpc  10.60.0.0/16', 0, 230, 750, 300)
    d.area('mon', 'subnet', 'Monitoring Subnet  10.60.48.0/24', 15, 258, 720, 252)
    d.icon('nacl', 'acl', 'NACL', 50, 318, sub='Stateless · IN과 OUT 따로')
    d.icon('acg', 'acg', 'ACG', 330, 318, sub='Stateful · IN만')
    d.icon('svr', 'server', 'wld-mon 서버', 580, 318, sub='Node Exporter 9100')
    d.edge('pc', 'vpn', step=1)
    d.edge('vpn', 'mgmt', step=2)
    d.edge('mgmt', 'nacl', 'b', 't', step=3, label='TCP 22')
    d.edge('nacl', 'acg', step=4, label='IN 허용')
    d.edge('acg', 'svr', step=5, label='IN 허용')
    d.edge('svr', 'acg', 'b', 'b', step=6, dashed=True, label='응답 · 알아서 통과')
    d.edge('acg', 'nacl', 'b', 'b', step=7, dashed=True, label='OUT 규칙이 있어야 나간다')
    return d

def scrape_path():
    d = Doc('scrape-path', 'Prometheus가 메트릭을 긁어오는 길')
    d.icon('prom', 'server', 'Ops', 0, 0, sub='Prometheus')
    checks = [('Peering Route', '상대 CIDR 경로'), ('Ops NACL', 'OUT 9100'), ('Ops ACG', 'OUT 9100'),
              ('Wld NACL', 'IN 9100'), ('Wld ACG', 'IN 9100')]
    prev, sh, th = 'prom', 'r', 'l'
    for i, (name, sub) in enumerate(checks):
        cid = f'c{i}'
        d.box(cid, 'service', name, 220, 14 + i * 96, sub=sub, width=240)
        d.edge(prev, cid, sh, th, step=i + 1)
        prev, sh, th = cid, 'b', 't'
    d.icon('exp', 'server', 'Node Exporter', 540, 14 + 4 * 96 - 14, sub='LISTEN 9100')
    d.edge(prev, 'exp', 'r', 'l', step=6)
    return d


# ── 3일차 ────────────────────────────────────────────────────────
def docker_isolated():
    d = Doc('docker-isolated', '같은 호스트라도 붙은 네트워크가 다르면 통하지 않는다')
    d.area('host', 'subnet', 'Docker 호스트 한 대', 0, 0, 760, 240)
    d.area('b1', 'plain', 'bridge (기본)', 20, 44, 340, 176)
    d.area('b2', 'plain', 'bridge (다른 네트워크)', 400, 44, 340, 176)
    d.icon('web', 'server', 'web', 144, 90, sub='nginx 80')
    d.icon('api', 'server', 'api', 524, 90, sub='node 3000')
    d.edge('web', 'api', blocked=True, label='이름으로 못 찾는다')
    return d


def day3():
    d = Doc('day3', '3일차 — Overlay 평면과 실제 VPC 평면')
    d.area('ovl', 'zone', 'Overlay  campus-market-net', 0, 0, 750, 130)
    d.icon('webO', 'server', 'web', 144, 26, sub='nginx 80')
    d.icon('apiO', 'server', 'api', 514, 26, sub='node 3000')
    d.edge('webO', 'apiO', label='이름으로 부른다 · api:3000')
    d.area('vpc', 'vpc', 'cnp-s01-wld-vpc  10.60.0.0/16', 0, 200, 750, 330)
    d.area('n1', 'subnet', 'KR-1  10.60.0.0/24 · Swarm Manager', 15, 228, 352, 286)
    d.area('n2', 'subnet', 'KR-2  10.60.1.0/24 · Swarm Worker', 383, 228, 352, 286)
    d.area('b1', 'plain', 'bridge · 호스트 안에서 끝난다', 30, 262, 322, 144)
    d.area('b2', 'plain', 'bridge · 호스트 안에서 끝난다', 398, 262, 322, 144)
    d.icon('web', 'server', 'web 컨테이너', 145, 290, sub='docker0')
    d.icon('api', 'server', 'api 컨테이너', 513, 290, sub='docker0')
    d.box('eth1', 'service', 'eth0', 126, 428, sub='10.60.0.x', width=130)
    d.box('eth2', 'service', 'eth0', 494, 428, sub='10.60.1.x', width=130)
    d.edge('web', 'eth1', 'b', 't', step=1)
    d.edge('eth1', 'eth2', step=2, label='VXLAN · UDP 4789')
    d.edge('eth2', 'api', 't', 'b', step=3)
    return d

# ── 4일차 ────────────────────────────────────────────────────────
def k3s_split():
    d = Doc('k3s-split', 'K3S_URL 없이 설치하면 서버 두 대가 각자 클러스터가 된다')
    d.area('c1', 'vpc', '클러스터 1', 0, 20, 360, 230)
    d.area('c2', 'vpc', '클러스터 2', 400, 20, 360, 230)
    d.icon('s1', 'server', 'k3s.service', 125, 74, sub='srv-kr1 · server')
    d.icon('s2', 'server', 'k3s.service', 515, 74, sub='agt-kr2 · server로 깔림')
    d.edge('s2', 's1', 'l', 'r', blocked=True, label='연결을 시도한 적이 없다')
    return d


def day4():
    d = Doc('day4', '4일차 — Server와 Agent')
    d.area('ops', 'vpc', 'cnp-s01-ops-vpc  10.50.0.0/16', 0, 20, 750, 118)
    d.icon('mgmt', 'server', '관리 서버', 210, 32, sub='kubectl')
    d.area('wld', 'vpc', 'cnp-s01-wld-vpc  10.60.0.0/16', 0, 200, 750, 390)
    d.area('k3s', 'zone', 'K3s 클러스터', 15, 228, 720, 346)
    d.area('sA', 'subnet', 'K3s Server  10.60.8.0/24', 30, 262, 340, 296)
    d.area('aA', 'subnet', 'K3s Agent  10.60.9.0/24', 380, 262, 340, 296)
    # Server와 Agent를 멀리 떼어 가운데 선 라벨이 아이콘을 덮지 않게 하고,
    # 막힌 방향은 아이콘 아래로 돌려 kubectl 선과 겹치지 않게 한다.
    d.icon('srv', 'server', 'k3s-srv', 210, 310, sub='k3s.service')
    d.note('srvN', '결정 — apiserver · SQLite\n         scheduler · controller-manager\n실행 — kubelet · containerd · kube-proxy', 48, 474)
    d.icon('agt', 'server', 'k3s-agt', 510, 310, sub='k3s-agent.service')
    d.note('agtN', '결정 — 없음\n실행 — kubelet · containerd · kube-proxy', 398, 474)
    d.edge('mgmt', 'srv', 'b', 't', step=1, label='kubectl')
    d.edge('agt', 'srv', 'l', 'r', step=2, label='Agent가 먼저 연다 · 6443')
    d.edge('srv', 'agt', 'b', 'b', step=3, blocked=True, label='Server는 먼저 안 건다')
    return d

# ── 5일차 ────────────────────────────────────────────────────────
def k8s_selector():
    d = Doc('k8s-selector', 'Service는 Label로 Pod를 고른다')
    d.area('ok', 'plain', '맞을 때', 0, 0, 380, 420)
    d.area('ng', 'plain', '한 글자가 다를 때', 420, 0, 380, 420)
    for side, x, selector, endpoints, good in [('a', 95, 'app: market-web', 'Pod IP 2개', True),
                                               ('b', 515, 'app: market-web-old', '비어 있음', False)]:
        d.box(f'svc{side}', 'service', 'Service', x, 50, sub=f'selector: {selector}', width=190)
        d.box(f'pod{side}', 'service', 'Pod ×2', x, 180, sub='Running · app: market-web', width=190)
        d.box(f'ep{side}', 'database' if good else 'external', 'Endpoints', x, 310, sub=endpoints, width=190)
    d.edge('svca', 'poda', 'b', 't', step=1, label='일치')
    d.edge('poda', 'epa', 'b', 't', step=2, label='등록')
    d.edge('svcb', 'podb', 'b', 't', step=1, blocked=True, label='불일치')
    return d


# ── 6일차 ────────────────────────────────────────────────────────
def day6():
    d = Doc('day6', '6일차 — ALB Ingress에서 두 존의 노드 풀로')
    d.icon('inet', 'internet', '인터넷', 329, 0)
    d.area('vpc', 'vpc', 'NKS VPC  ·  컨트롤 플레인은 보이지 않는다', 0, 130, 750, 424)
    d.area('lb', 'subnet', 'LB Subnet', 15, 158, 720, 128)
    d.icon('alb', 'application-load-balancer', 'ALB Ingress', 301, 170, sub='ingressClassName: alb')
    d.area('z1', 'zone', 'KR-1 존', 15, 304, 352, 234)
    d.area('z2', 'zone', 'KR-2 존', 383, 304, 352, 234)
    # ALB에서 갈라지는 가로선이 존 이름 아래를 지나도록 노드를 존 안쪽 깊이 둔다.
    d.icon('p1', 'server', '노드 풀', 40, 430, sub='NodePort 30080')
    d.icon('a1', 'auto-scaling', 'Cluster Autoscaler', 200, 430, sub='Pending이면 노드 추가')
    d.icon('p2', 'server', '노드 풀', 408, 430, sub='NodePort 30080')
    d.icon('a2', 'auto-scaling', 'Cluster Autoscaler', 568, 430, sub='Pending이면 노드 추가')
    d.edge('inet', 'alb', 'b', 't', step=1, label='HTTPS')
    d.edge('alb', 'p1', 'b', 't', step=2, label='NodePort 30080')
    d.edge('alb', 'p2', 'b', 't', step=2)
    d.edge('a1', 'p1', 'l', 'r', dashed=True, animated=False, label='노드를 늘린다')
    d.edge('a2', 'p2', 'l', 'r', dashed=True, animated=False)
    return d

def nodeport_ports():
    d = Doc('nodeport-ports', 'nodePort · port · targetPort')
    d.box('pc', 'client', '내 PC', 0, 14, width=110)
    d.icon('node', 'server', '노드', 215, 0, sub='어느 노드든')
    d.icon('svc', 'kubernetes-service', 'Service', 440, 0, sub='ClusterIP')
    d.icon('ctr', 'server', '컨테이너', 655, 0, sub='nginx')
    d.edge('pc', 'node', step=1, label='nodePort 30080')
    d.edge('node', 'svc', step=2, label='port 80')
    d.edge('svc', 'ctr', step=3, label='targetPort 80')
    d.area('row', 'plain', 'Pod가 없는 노드로 들어와도 응답이 온다', 0, 130, 750, 170)
    d.box('ext', 'client', '외부 요청', 25, 196, width=130)
    d.icon('na', 'server', '노드 A', 280, 180, sub='Pod 없음')
    d.icon('nb', 'server', '노드 B', 600, 180, sub='Pod 2개')
    d.edge('ext', 'na', step=4)
    d.edge('na', 'nb', step=5, label='kube-proxy가 넘긴다')
    return d

def alb_health():
    d = Doc('alb-health', '헬스체크가 깨졌을 때')
    d.box('user', 'client', '사용자', 0, 30)
    d.icon('alb', 'application-load-balancer', 'ALB', 260, 0, sub='헬스체크 경로가 틀림')
    d.icon('nodes', 'server', '노드 · Pod', 560, 0, sub='전부 Running')
    d.edge('user', 'alb', step=1, label='HTTP')
    d.edge('alb', 'nodes', step=2, blocked=True, label='보낼 곳이 없다')
    d.edge('alb', 'user', 't', 't', step=3, dashed=True, label='503')
    d.area('diff', 'plain', '같은 시점에 두 쪽이 다르게 보인다', 0, 190, 720, 130)
    d.box('k', 'service', 'kubectl get pods', 40, 236, sub='전부 Running · 문제 없음', width=300)
    d.box('c', 'external', '콘솔 · 로드밸런서 상태', 380, 236, sub='모든 노드 비정상', width=300)
    return d


# ── 허브 ─────────────────────────────────────────────────────────
def stack():
    d = Doc('stack', '실습에서 쌓아 올린 층')
    layers = [('노출과 확장', 'NodePort · Ingress · ALB · HPA — 6일차'),
              ('K3s · NKS Pod', 'Deployment · Service · Label — 4~6일차'),
              ('Docker Container', 'bridge · Overlay UDP 4789 — 3일차'),
              ('Server', 'ACG · 서버 NIC에서 검사 — 2일차'),
              ('Subnet', 'NACL · Subnet 경계에서 검사 — 1일차'),
              ('VPC', 'Route Table · IGW · NAT · Peering — 1일차')]
    for i, (name, sub) in enumerate(layers):
        d.box(f'l{i}', 'service', name, 0, i * 100, sub=sub, width=520)
    # 쌓아 올린 순서, 아래에서 위로 흐른다.
    for n, i in enumerate(range(len(layers) - 1, 0, -1), start=1):
        d.edge(f'l{i}', f'l{i - 1}', 't', 'b', step=n)
    return d


def overall():
    d = Doc('overall', '엿새 동안 만든 것')
    # SSL VPN을 관리 서버 바로 위에 두어 선이 곧게 내려가고 VPC 이름을 가로지르지 않게 한다.
    d.box('pc', 'client', '학습자 PC', 0, 26, width=120)
    d.icon('vpn', 'ssl-vpn', 'SSL VPN', 177, 10, sub='VPN Pool')
    d.icon('inet', 'internet', '인터넷', 560, 10)
    d.area('ops', 'vpc', 'cnp-s01-ops-vpc  10.50.0.0/16', 0, 150, 750, 166)
    d.area('opsPri', 'subnet', 'Private  10.50.0.0/24', 15, 178, 350, 124)
    d.icon('mgmt', 'server', '관리 서버', 150, 196, sub='kubectl · Prometheus')
    d.area('opsPub', 'subnet', 'Public', 385, 178, 350, 124)
    d.icon('opsNat', 'nat-gateway', 'NAT Gateway', 511, 196, sub='공인 IP')
    d.icon('peer', 'vpc-peering', 'Peering ×2', 329, 340)
    # 서버 존을 위로, NAT 서브넷을 아래로 둬서 Peering에서 내려오는 선이 영역 이름을 피한다.
    d.area('wld', 'vpc', 'cnp-s01-wld-vpc  10.60.0.0/16', 0, 470, 750, 340)
    d.area('z1', 'zone', 'KR-1 존', 15, 530, 352, 140)
    d.area('z2', 'zone', 'KR-2 존', 383, 530, 352, 140)
    d.icon('s1', 'server', 'kr1-svr', 106, 560, sub='Swarm Manager · K3s Server')
    d.icon('s2', 'server', 'kr2-svr', 474, 560, sub='Swarm Worker · K3s Agent')
    d.area('wldPub', 'subnet', 'Public  NAT Gateway 존별 1개', 15, 686, 720, 110)
    d.icon('nat1', 'nat-gateway', 'NAT KR-1', 250, 712)
    d.icon('nat2', 'nat-gateway', 'NAT KR-2', 618, 712)
    d.area('nks', 'vpc', 'NKS 클러스터  ·  6일차', 0, 870, 750, 262)
    d.box('user', 'client', '사용자', 25, 900)
    d.icon('alb', 'application-load-balancer', 'ALB Ingress', 301, 886, sub='ingressClassName: alb')
    d.icon('p1', 'server', '노드 풀 KR-1', 120, 1016, sub='NodePort 30080')
    d.icon('p2', 'server', '노드 풀 KR-2', 526, 1016, sub='NodePort 30080')
    d.edge('pc', 'vpn', step=1)
    d.edge('vpn', 'mgmt', 'b', 't', step=2)
    d.edge('mgmt', 'peer', 'b', 'l', step=3)
    d.edge('peer', 's1', 'b', 't', step=3, label='kubectl · Peering')
    d.edge('s2', 's1', 'l', 'r', step=4, label='TCP 6443 · VXLAN 4789')
    d.edge('mgmt', 'opsNat', dashed=True, label='나가는 길')
    d.edge('opsNat', 'inet', 't', 'b', dashed=True)
    d.edge('user', 'alb', step=5, label='HTTPS')
    d.edge('alb', 'p1', 'b', 't', step=6)
    d.edge('alb', 'p2', 'b', 't', step=6)
    return d

# ── skill-kit 글 ─────────────────────────────────────────────────
def gyeol_flow():
    """위 줄은 코드, 아래 줄은 AI. 흐름이 두 줄을 오가며 판정은 늘 코드 쪽에서 난다."""
    d = Doc('gyeol-flow', 'gyeol — 고치는 AI와 판정하는 코드')
    d.area('code', 'plain', '코드 — 재고 판정한다', 150, 0, 860, 150)
    d.area('ai', 'plain', 'AI — 고친다', 150, 200, 420, 150)
    d.box('draft', 'client', '초안', 0, 45, sub='AI가 쓴 글')
    d.box('profile', 'service', '계량', 180, 45, sub='profile.py')
    d.box('gate', 'service', '게이트', 520, 45, sub='verify_gates.py')
    d.box('deliver', 'external', '결과 전달', 820, 45, sub='경고면 걸린 축을 알린다')
    d.box('rewrite', 'service', '윤문', 320, 245, sub='rewriter')
    d.edge('draft', 'profile', 'r', 'l', step=1)
    d.edge('profile', 'rewrite', 'b', 'l', step=2, label='이탈 축')
    d.edge('rewrite', 'gate', 'r', 'b', step=3)
    d.edge('gate', 'deliver', 'r', 'l', step=4, label='통과 · 경고')
    d.edge('gate', 'rewrite', 'l', 't', step=4, blocked=True, label='중단 · 롤백')
    return d


DIAGRAMS = [day1, net_direction, net_layers, ssh_hang, day2, scrape_path, docker_isolated, day3,
            k3s_split, day4, k8s_selector, day6, nodeport_ports, alb_health, stack, overall, gyeol_flow]


def main():
    os.makedirs(OUT, exist_ok=True)
    ratios = {build().id: None for build in []}
    for build in DIAGRAMS:
        doc = build()
        ratios[doc.id] = doc.save()
    print(json.dumps(ratios, ensure_ascii=False, indent=1))


if __name__ == '__main__':
    main()
