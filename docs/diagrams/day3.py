from ncpstyle import *

s = canvas(660)
title(s, '3일차', 'Overlay')

# 위층 : Overlay
group(s, M, 86, CONTENT, 112, 'Overlay  campus-market-net', fill='#F7FBFF', stroke='#8FC0EA')
node(s, M+180, 132, 'server', 'web', 'nginx 80', size=32)
node(s, CW-M-180, 132, 'server', 'api', 'node 3000', size=32)
plain(s, f'M {M+220} 132 L {CW-M-220} 132')
label(s, CW/2, 122, '이름으로 통신')

for x in (M+180, CW-M-180):
    plain(s, f'M {x} 198 L {x} 268', dash='3 5')
label(s, M+256, 236, '같은 것을 다르게 본 것', anchor='start', fill=MUTED)

# 아래층 : VPC
VY = 268
vpc(s, M, VY, CONTENT, 300, 'cnp-s01-wld-vpc  10.60.0.0/16')
BW = 316
for i, (sn, cd, host, role, cn, pt) in enumerate([
        ('cnp-s01-dkr-node-kr1-sbn', '10.60.0.0/24', 'cnp-s01-dkr-mgr-kr1-svr', 'Swarm Manager', 'web', 'nginx 80'),
        ('cnp-s01-dkr-node-kr2-sbn', '10.60.1.0/24', 'cnp-s01-dkr-wkr-kr2-svr', 'Swarm Worker',  'api', 'node 3000')]):
    x = M+14 + i*(BW+24)
    group(s, x, VY+20, BW, 262, f'Docker 노드  {cd}')
    s.text(x+12, VY+52, sn, size=8.5, fill=MUTED, mono=True)
    node_side(s, x+40, VY+78, 'server', host, role, size=30)
    group(s, x+18, VY+108, BW-36, 108, 'bridge · 호스트 안에서 끝난다', dash='4 4', stroke=MUTED)
    node(s, x+BW/2, VY+156, 'server', cn, pt, size=30)
    s.rect(x+18, VY+220, 130, 34, stroke=INK, sw=1.2)
    s.text(x+34, VY+238, 'eth0', size=10, weight='700', mono=True, fill=INK)

EY = VY+237
plain(s, f'M {M+14+148} {EY} L {M+14+BW+24+18} {EY}')
s.img('acg', CW/2-11, EY-30, 22)
label(s, CW/2, EY+20, 'UDP 4789 (VXLAN)')

notes(s, 620, ['bridge는 호스트 밖으로 나가지 못한다'])
open('day3.svg','w',encoding='utf-8').write(s.render())
print('day3 ok')
