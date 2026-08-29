from lib import *
from narrow import *

W, H = CW, 760
s = Svg(W, H)
head(s, '3일차 — Overlay는 VPC 위를 지나간다', '가상 네트워크와 실제 네트워크를 두 층으로 나눠 본다')

C1, C2, BW = M+16, CW/2+16, 320   # 두 노드 열

# ── 위층
s.rect(M, 88, CONTENT, 128, stroke=LINE, sw=1.3, fill=SURF)
s.text(M+14, 106, '가상 — Overlay 평면', size=11, weight='700', fill=SOFT)
s.text(M+14, 122, 'campus-market-net · 노드가 달라도 한 네트워크', size=9, fill=MUTED, mono=True)
for x, nm, pt in [(C1, 'web', 'nginx 80'), (C2, 'api', 'node 3000')]:
    s.rect(x, 144, BW, 54, sw=1.6, fill=BG)
    s.text(x+BW/2, 162, nm, size=12, weight='700', mono=True, anchor='middle')
    s.text(x+BW/2, 182, pt, size=9, fill=SOFT, mono=True, anchor='middle')
s.path(f'M {C1+BW} 171 L {C2} 171', marker=False)
s.line_label((C1+BW+C2)/2, 171, '이름으로 통신', bg=SURF)

# 두 층을 잇는 세로 점선
for x in (C1+BW/2, C2+BW/2):
    s.path(f'M {x} 198 L {x} 300', dash='3 5', marker=False, stroke=MUTED)
s.text(C1+BW/2+10, 250, '같은 것을 다르게 본 것', size=9, fill=MUTED)

# ── 아래층
VY = 262
vpcbox(s, M, VY, CONTENT, 396, 'cnp-s01-wld-vpc', '10.60.0.0/16 · 실제 VPC 평면')
for x, sn, cd in [(C1-16, 'cnp-s01-dkr-node-kr1-sbn', '10.60.0.0/24'),
                  (C2-16, 'cnp-s01-dkr-node-kr2-sbn', '10.60.1.0/24')]:
    sub(s, x, VY+56, 352, 320, f'Docker 노드 · {cd}', sn)

for x, host, role, cn, pt in [
        (C1, 'cnp-s01-dkr-mgr-kr1-svr', 'Swarm Manager', 'web', 'nginx 80'),
        (C2, 'cnp-s01-dkr-wkr-kr2-svr', 'Swarm Worker',  'api', 'node 3000')]:
    s.rect(x, VY+96, BW, 262, sw=1.7)
    s.img('server', x+12, VY+106, 24)
    s.text(x+44, VY+118, host, size=10, weight='600', mono=True)
    s.text(x+44, VY+134, role, size=9, fill=SOFT, mono=True)
    s.rect(x+18, VY+156, BW-36, 118, stroke=MUTED, sw=1.2, dash='4 4')
    s.text(x+30, VY+172, 'bridge · 호스트 안에서 끝난다', size=9, fill=MUTED, mono=True)
    s.rect(x+56, VY+190, BW-112, 62, sw=1.5)
    s.text(x+BW/2, VY+212, cn, size=11, weight='700', mono=True, anchor='middle')
    s.text(x+BW/2, VY+232, pt, size=9, fill=SOFT, mono=True, anchor='middle')
    s.rect(x+18, VY+290, 160, 38, sw=1.5)
    s.text(x+34, VY+309, 'eth0', size=10, weight='600', mono=True)
    s.text(x+78, VY+309, '· 사설 IP', size=9, fill=SOFT, mono=True)

# 노드 사이 실제 통신
EY = VY+309
GAP = 376  # 두 서버 박스 사이 빈 통로
s.path(f'M {C1+178} {EY} L {C2+18} {EY}', marker=False)
s.path(f'M {C2+18} {EY} L {C1+178} {EY}', marker=False)
s.img('acg', GAP-11, EY-34, 22)
s.line_label(GAP, EY+22, 'UDP 4789')
s.text(GAP, EY-42, 'ACG', size=8.5, fill=MUTED, mono=True, anchor='middle')

notes(s, 682, [
  'bridge는 호스트 밖으로 나가지 못한다. 그래서 노드를 넘으려면 Overlay가 필요하다',
  'Overlay를 깔아도 노드 사이 UDP 4789가 ACG·NACL에서 막히면 통신이 안 된다',
  '포트는 세 층이다 — SSH 터널 30080 · 호스트 Published 30080 · Container 80',
])
open('day3.svg','w',encoding='utf-8').write(s.render())
print('ok')
