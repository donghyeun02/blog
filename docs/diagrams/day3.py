from lib import *

W, H = 1500, 860
s = Svg(W, H)
titled(s, '3일차 — Overlay는 VPC 위를 지나간다',
       '가상 네트워크와 실제 네트워크를 두 층으로 나눠 본다')

K1X, K2X = 100, 800   # 서버 박스 왼쪽 좌표
SVW = 600

# ── 위층 : Overlay 평면
s.rect(40, 130, 1420, 170, stroke=LINE, sw=1.4, fill=SURF)
s.text(64, 152, '가상 — Overlay 평면', size=12, weight='700', fill=SOFT)
s.text(64, 172, 'campus-market-net · 노드가 달라도 한 네트워크로 보인다', size=11, fill=MUTED, mono=True)

for x, nm, port in [(K1X+150, 'web', 'nginx 80'), (K2X+150, 'api', 'node 3000')]:
    s.rect(x, 205, 300, 70, sw=1.8, fill=BG)
    s.text(x+150, 230, nm, size=14, weight='700', mono=True, anchor='middle')
    s.text(x+150, 253, port, size=11, fill=SOFT, mono=True, anchor='middle')

s.path(f'M {K1X+450} 240 L {K2X+150} 240', marker=False)
s.line_label((K1X+450+K2X+150)/2, 240, '서비스 이름으로 통신', bg=SURF)

# ── 아래층 : 실제 VPC 평면
s.rect(40, 390, 1420, 380, sw=2.5)
s.img('vpc', 56, 404)
s.text(94, 411, 'cnp-s01-wld-vpc', size=14, weight='700', mono=True)
s.text(94, 430, '10.60.0.0/16  ·  실제 — VPC 평면', size=11, fill=SOFT, mono=True)

for i, (sx, sn, cidr) in enumerate([
        (70, 'cnp-s01-dkr-node-kr1-sbn', '10.60.0.0/24'),
        (770, 'cnp-s01-dkr-node-kr2-sbn', '10.60.1.0/24')]):
    s.rect(sx, 450, 660, 296, stroke=MUTED, sw=1.3, dash='6 5')
    s.text(sx+14, 468, sn, size=11, fill=MUTED, mono=True)
    s.text(sx+646, 468, cidr, size=11, fill=MUTED, mono=True, anchor='end')

for x, host, role, cname, port in [
        (K1X, 'cnp-s01-dkr-mgr-kr1-svr', 'Swarm Manager', 'web', 'nginx 80'),
        (K2X, 'cnp-s01-dkr-wkr-kr2-svr', 'Swarm Worker',  'api', 'node 3000')]:
    s.rect(x, 490, SVW, 236, sw=1.8)
    s.img('server', x+14, 502)
    s.text(x+50, 514, host, size=12, weight='600', mono=True)
    s.text(x+50, 532, role, size=10, fill=SOFT, mono=True)
    # bridge
    s.rect(x+40, 556, SVW-80, 108, stroke=MUTED, sw=1.3, dash='5 4')
    s.text(x+54, 574, 'bridge · 호스트 안에서 끝난다', size=10, fill=MUTED, mono=True)
    s.rect(x+180, 588, 260, 60, sw=1.5)
    s.text(x+310, 610, cname, size=12, weight='700', mono=True, anchor='middle')
    s.text(x+310, 630, port, size=10, fill=SOFT, mono=True, anchor='middle')
    # eth0
    s.rect(x+40, 674, 200, 38, sw=1.5)
    s.text(x+60, 693, 'eth0', size=11, weight='600', mono=True)
    s.text(x+120, 693, '· VPC 사설 IP', size=10, fill=SOFT, mono=True)

# ── 두 층을 잇는 세로 점선
for x in (K1X+300, K2X+300):
    s.path(f'M {x} 275 L {x} 490', dash='3 5', marker=False, stroke=MUTED)
s.text(K1X+310, 340, '같은 것을 다르게 본 것', size=10, fill=MUTED)

# ── 노드 사이 실제 통신
s.path(f'M {K1X+240} 693 L {K2X+40} 693', marker=False)
s.path(f'M {K2X+40} 693 L {K1X+240} 693', marker=False)
GAP = 750
s.img('acg', GAP-11, 682, 22)
s.line_label(GAP, 730, 'UDP 4789 (VXLAN)')
s.text(GAP, 748, 'cnp-s01-dkr-node-acg', size=10, fill=MUTED, mono=True, anchor='middle')

footnotes(s, 800, [
  'bridge는 호스트 밖으로 나가지 못한다. 그래서 노드를 넘으려면 Overlay가 필요하다',
  'Overlay를 깔아도 노드 사이 UDP 4789가 ACG·NACL에서 막히면 통신이 안 된다',
  '포트는 세 층이다 — SSH 터널 30080 · 호스트 Published 30080 · Container 80',
])

open('day3.svg','w',encoding='utf-8').write(s.render())
print('ok')
