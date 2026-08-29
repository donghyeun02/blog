from ncpstyle import *

s = canvas(560)
title(s, '1일차 — 나가는 길만 있다', 'VPC 경로 구성 · 서버는 아직 없다')

# 인터넷
node_side(s, CW/2-30, 100, 'internet', '인터넷')

VY, VH = 176, 300
VW = 310
OX, WX = M, CW - M - VW

vpc(s, OX, VY, VW, VH, 'cnp-s01-ops-vpc  10.50.0.0/16')
vpc(s, WX, VY, VW, VH, 'cnp-s01-wld-vpc  10.60.0.0/16')

PUB_Y, PRI_Y, SH = VY+22, VY+170, 124
for x, plab, natlab, natsub, rlab, ghost in [
    (OX, 'Public · NAT Gateway  10.50.80.0/26', 'NAT Gateway', '공인 IP 연결',
         'Private  10.50.0.0/24', '관리 서버 · 2일차'),
    (WX, 'Public · NAT Gateway  존별 1개', 'NAT Gateway ×2', 'KR-1 · KR-2',
         'Private  노드 대역', '노드 · 2~4일차')]:
    group(s, x+14, PUB_Y, VW-28, SH, plab)
    node(s, x+VW/2, PUB_Y+62, 'nat-gateway', natlab, natsub)
    group(s, x+14, PRI_Y, VW-28, SH, rlab)
    s.rect(x+VW/2-90, PRI_Y+42, 180, 46, stroke=MUTED, sw=1, dash='4 4')
    s.text(x+VW/2, PRI_Y+66, ghost, size=10, fill=MUTED, anchor='middle')

    # 나가는 길 : 빈 자리 → NAT → 인터넷
    c = x + VW - 62
    arrow(s, f'M {c} {PRI_Y+42} L {c} {PUB_Y+SH}')
    arrow(s, f'M {c} {PUB_Y} L {c} 124')
    # 들어오는 길은 없다
    b = x + 170
    arrow(s, f'M {b} {PUB_Y+SH} L {b} {PRI_Y+42}', dash='4 4')
    cross(s, b, (PUB_Y+SH+PRI_Y)/2)

label(s, OX+VW-62, 160, 'TCP 80·443')

# Peering
GC = (OX+VW + WX)/2
s.img('vpc-peering', GC-14, VY+120, 28)
arrow(s, f'M {OX+VW} {VY+96} L {GC+12} {VY+96}')
arrow(s, f'M {WX} {VY+182} L {GC-12} {VY+182}')
label(s, GC, VY+164, 'Peering ×2', fill=MUTED)

notes(s, 510, [
  'NAT에 공인 IP가 붙어 있어도 인터넷에서 사설 서버로는 들어올 수 없다',
  'KR-2 Private Subnet은 자기 존의 NAT를 쓴다',
  'Peering은 방향이 반대인 두 개다 — ops-wld-peer / wld-ops-peer',
])
open('day1.svg','w',encoding='utf-8').write(s.render())
print('ok')
