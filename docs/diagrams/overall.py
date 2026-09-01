from ncpstyle import *

s = canvas(1080)
title(s, '엿새 동안 만든 것', 'Ops VPC · Workload VPC · K3s · 그리고 NKS')

HW = (CONTENT-28-16)/2          # 절반 폭
L, R = M+14, M+14+HW+16         # 왼쪽·오른쪽 칸
CL, CR = L+HW/2, R+HW/2

# ── 바깥 : 들어오는 길은 왼쪽, 나가는 길은 오른쪽 ──────────────
user(s, 66, 108, '학습자 PC')
arrow(s, 'M 94 108 L 168 108')
node_side(s, 190, 108, 'ssl-vpn', 'SSL VPN', 'VPN Pool 대역')
node_side(s, CR, 108, 'internet', '인터넷')

# ── Ops VPC ────────────────────────────────────────────────
OY, OH = 176, 150
vpc(s, M, OY, CONTENT, OH, 'cnp-s01-ops-vpc  10.50.0.0/16')
group(s, L, OY+20, HW, 110, 'Private Subnet  10.50.0.0/24')
node(s, CL, OY+56, 'server', '관리 서버', 'kubectl · Prometheus · Grafana')
group(s, R, OY+20, HW, 110, 'Public Subnet')
node(s, CR, OY+56, 'nat-gateway', 'NAT Gateway', '공인 IP')
arrow(s, f'M 190 129 L 190 {OY+20}')
arrow(s, f'M {CR} {OY+20} L {CR} 129')

# ── Peering ────────────────────────────────────────────────
PY = OY+OH
plain(s, f'M {CW/2} {PY} L {CW/2} {PY+14}')
s.img('vpc-peering', CW/2-14, PY+14, 28)
plain(s, f'M {CW/2} {PY+42} L {CW/2} {PY+58}')
s.text(CW/2+28, PY+28, 'VPC Peering ×2  ·  양쪽 Route Table에 상대 CIDR을 넣어야 통한다',
       size=9.5, fill=SOFT)

# ── Workload VPC ───────────────────────────────────────────
WY, WH = 384, 300
vpc(s, M, WY, CONTENT, WH, 'cnp-s01-wld-vpc  10.60.0.0/16')
group(s, L, WY+20, CONTENT-28, 84, 'Public Subnet  ·  NAT Gateway는 존별로 하나씩')
node(s, CL, WY+50, 'nat-gateway', 'NAT Gateway  KR-1', size=30)
node(s, CR, WY+50, 'nat-gateway', 'NAT Gateway  KR-2', size=30)

ZY, ZH = WY+124, 128
for i, (zl, host, roles) in enumerate([
        ('KR-1 존', 'cnp-s01-…-kr1-svr', ['Docker Swarm Manager', 'K3s Server']),
        ('KR-2 존', 'cnp-s01-…-kr2-svr', ['Docker Swarm Worker', 'K3s Agent'])]):
    zx = L + i*(HW+16)
    zone(s, zx, ZY, HW, ZH, zl, right=bool(i))
    node_side(s, zx+44, ZY+44, 'server', host, None, size=30)
    for j, r in enumerate(roles):
        s.text(zx+26, ZY+82+j*17, '· ' + r, size=9.5, fill=SOFT, mono=True)
    plain(s, f'M {zx+HW/2} {ZY} L {zx+HW/2} {WY+104}')

arrow(s, f'M {CR} {ZY+ZH+24} L {CL} {ZY+ZH+24}')
s.line_label(CW/2, ZY+ZH+24, 'VXLAN UDP 4789  ·  K3s는 Agent가 TCP 6443을 연다')

# ── 관문 범례 ──────────────────────────────────────────────
GY = WY+WH+16
s.img('nacl', M, GY, 22)
s.text(M+28, GY+11, 'NACL — Subnet 경계에 선다 (Stateless)', size=9.5, fill=MUTED)
s.img('acg', M+280, GY, 22)
s.text(M+308, GY+11, 'ACG — 서버 랜카드에 붙는다 (Stateful)', size=9.5, fill=MUTED)

# ── NKS (6일차) ────────────────────────────────────────────
NY, NH = 730, 248
group(s, M, NY, CONTENT, NH, None, stroke=BLUED, sw=1.4, dash='5 4')
s.img('kubernetes-service', M+14, NY+12, 22)
s.text(M+44, NY+24, 'NKS 클러스터  ·  6일차', size=10.5, weight='700', fill=BLUE)
s.text(M+44, NY+40, '컨트롤 플레인은 보이지 않는다', size=9, fill=MUTED)

node(s, CW/2, NY+72, 'application-load-balancer', 'ALB Ingress', 'ingressClassName: alb')
NRAIL = NY+146
plain(s, f'M {CW/2} {NY+130} L {CW/2} {NRAIL}')
plain(s, f'M {CL} {NRAIL} L {CR} {NRAIL}')
s.line_label(CL+40, NRAIL-12, 'NodePort 30080', size=9.5)
for i, zl in enumerate(('노드 풀 · KR-1 존', '노드 풀 · KR-2 존')):
    zx = L + i*(HW+16)
    arrow(s, f'M {zx+HW/2} {NRAIL} L {zx+HW/2} {NY+168}')
    array(s, zx+16, NY+168, HW-32, 46, n=2, label=zl)

notes(s, 1010, [
  '1~5일차는 VPC부터 K3s까지 직접 만들었고, 6일차는 같은 매니페스트를 NKS 위에 올렸다',
  'NACL·ACG·Route는 층이 올라가도 사라지지 않는다. Overlay도 결국 그 위를 지나간다',
])
open('overall.svg','w',encoding='utf-8').write(s.render())
print('overall ok')
