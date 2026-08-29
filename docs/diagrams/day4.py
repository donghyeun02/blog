from ncpstyle import *

s = canvas(640)
title(s, '4일차', 'K3s')

vpc(s, M, 86, CONTENT, 86, 'cnp-s01-ops-vpc  10.50.0.0/16')
node_side(s, 300, 130, 'server', 'cnp-s01-ops-mgmt-svr', 'kubectl')
s.img('vpc-peering', 470, 116, 26)
label(s, 540, 130, 'Peering · TCP 6443', anchor='start')

VY = 208
vpc(s, M, VY, CONTENT, 336, 'cnp-s01-wld-vpc  10.60.0.0/16')
group(s, M+14, VY+20, CONTENT-28, 300, None, stroke='#8FC0EA')
s.img('kubernetes-service', M+26, VY+28, 22)
s.text(M+56, VY+40, 'K3s 클러스터', size=10.5, weight='700', fill=BLUE)

BW = 322
for i, (cd, sn, host, decide, note) in enumerate([
    ('K3s Server  10.60.8.0/24', 'cnp-s01-k3s-node-kr1-sbn', 'cnp-s01-k3s-srv-kr1-svr',
     ['kube-apiserver', '저장소 SQLite', 'kube-scheduler', 'controller-manager'], None),
    ('K3s Agent  10.60.9.0/24', 'cnp-s01-k3s-node-kr2-sbn', 'cnp-s01-k3s-agt-kr2-svr',
     None, 'ACG cnp-s01-k3s-node-acg')]):
    x = M+26 + i*(BW+16)
    group(s, x, VY+58, BW, 246, cd)
    s.text(x+12, VY+90, sn, size=8.5, fill=MUTED, mono=True)
    node_side(s, x+40, VY+118, 'server', host, None, size=30)
    y = VY+156
    if decide:
        s.text(x+18, y, '결정', size=10, weight='700', fill=BLUE)
        for j, d in enumerate(decide):
            s.text(x+18, y+18+j*16, '· ' + d, size=9, fill=SOFT, mono=True)
        y += 18 + len(decide)*16 + 12
    else:
        s.rect(x+14, y-12, BW-28, 40, stroke=EDGE, sw=1.1, dash='4 4')
        s.text(x+BW/2, y+8, '결정 구성요소 없음', size=10, fill=MUTED, anchor='middle')
        y += 48
    s.text(x+18, y, '실행', size=10, weight='700', fill=INK)
    s.text(x+18, y+18, '· kubelet · containerd · kube-proxy', size=9, fill=SOFT, mono=True)
    if note:
        s.text(x+18, y+36, note, size=9, fill=MUTED, mono=True)

N1, N2 = M+26, M+26+BW+16
arrow(s, f'M 300 152 L 300 {VY+58}')
MY = VY+322
arrow(s, f'M {N2+BW/2} {VY+304} L {N2+BW/2} {MY} L {N1+BW/2} {MY} L {N1+BW/2} {VY+304}')
label(s, CW/2, MY-12, 'TCP 6443 · Agent가 연다')
arrow(s, f'M {N1+BW} {VY+190} L {N2} {VY+190}', dash='4 4')
cross(s, (N1+BW+N2)/2, VY+190, 6)

notes(s, 600, ['연결을 여는 쪽은 언제나 Agent다'])
open('day4.svg','w',encoding='utf-8').write(s.render())
print('day4 ok')
