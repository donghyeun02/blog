from lib import *
from narrow import *

W, H = CW, 800
s = Svg(W, H)
head(s, '4일차 — 연결을 여는 쪽은 언제나 Agent다', 'Server와 Agent는 들어 있는 것이 다르다')

# Ops
vpcbox(s, M, 88, CONTENT, 96, 'cnp-s01-ops-vpc', '10.50.0.0/16')
srv(s, M+240, 100, 442, 70, 'cnp-s01-ops-mgmt-svr', ['kubectl · 조종석은 여기 하나'])

# Workload
VY = 232
vpcbox(s, M, VY, CONTENT, 362, 'cnp-s01-wld-vpc', '10.60.0.0/16')
s.rect(M+12, VY+50, CONTENT-24, 276, stroke=ACC, sw=1.6)
s.img('kubernetes-service', M+22, VY+58, 22)
s.text(M+52, VY+69, 'K3s 클러스터', size=10.5, weight='700', fill=ACC)

NW2 = 322
N1, N2 = M+22, M+366
def node(x, sbn, cidr, host, decide, note=None):
    s.rect(x, VY+84, NW2, 232, stroke=MUTED, sw=1.2, dash='5 4')
    s.text(x+10, VY+100, f'{cidr}', size=10, weight='600', fill=SOFT)
    s.text(x+10, VY+115, sbn, size=8.5, fill=MUTED, mono=True)
    s.rect(x+12, VY+126, NW2-24, 178, sw=1.7)
    s.img('server', x+22, VY+134, 22)
    s.text(x+50, VY+145, host, size=9.5, weight='600', mono=True)
    y = VY+176
    if decide:
        s.text(x+26, y, '결정', size=10, weight='700', fill=ACC)
        for i, d in enumerate(decide):
            s.text(x+26, y+17+i*15, '· ' + d, size=8.5, fill=SOFT, mono=True)
        y += 17 + len(decide)*15 + 10
    else:
        s.rect(x+22, y-12, NW2-44, 38, stroke=LINE, sw=1.2, dash='4 4')
        s.text(x+NW2/2, y+7, '결정 구성요소 없음', size=10, fill=MUTED, anchor='middle')
        y += 46
    s.text(x+26, y, '실행', size=10, weight='700')
    s.text(x+26, y+17, '· kubelet · containerd · kube-proxy', size=8.5, fill=SOFT, mono=True)
    if note:
        s.text(x+26, y+34, note, size=8.5, fill=MUTED, mono=True)

node(N1, 'cnp-s01-k3s-node-kr1-sbn', 'K3s Server · 10.60.8.0/24', 'cnp-s01-k3s-srv-kr1-svr',
     ['kube-apiserver', '저장소 SQLite', 'kube-scheduler', 'controller-manager'])
node(N2, 'cnp-s01-k3s-node-kr2-sbn', 'K3s Agent · 10.60.9.0/24', 'cnp-s01-k3s-agt-kr2-svr',
     None, 'ACG cnp-s01-k3s-node-acg')

# kubectl → apiserver
s.path(f'M {M+240} 170 L {N1+NW2/2} 170 L {N1+NW2/2} {VY+126}')
s.img('vpc-peering', N1+NW2/2+12, 186, 22)
s.text(N1+NW2/2+40, 197, 'Peering · TCP 6443', size=9, fill=SOFT, mono=True)

# Agent → Server
MY = VY+344
s.path(f'M {N2+NW2/2} {VY+304} L {N2+NW2/2} {MY} L {N1+NW2/2} {MY} L {N1+NW2/2} {VY+304}')
s.line_label((N1+N2+NW2)/2, MY, 'TCP 6443 · Agent가 연다')
# Server → Agent 없음
s.path(f'M {N1+NW2} {VY+230} L {N2} {VY+230}', dash='4 4')
s.cross((N1+NW2+N2)/2, VY+230, 7)

# 대역
s.rect(M, 596, 330, 84, stroke=LINE, sw=1.3, fill=SURF)
s.text(M+14, 614, '클러스터 대역', size=10, weight='700', fill=SOFT)
for i, (k, v) in enumerate([('Pod CIDR','10.42.0.0/16'),('Service CIDR','10.43.0.0/16'),('Cluster DNS','10.43.0.10')]):
    s.text(M+14, 634+i*16, k, size=9, fill=SOFT, mono=True)
    s.text(M+316, 634+i*16, v, size=9, fill=INK, mono=True, anchor='end')

# 실패 사례
FX = M+354
s.rect(FX, 596, CONTENT-354, 84, stroke=MUTED, sw=1.2, dash='5 4')
s.text(FX+14, 614, 'K3S_URL 없이 설치하면', size=10, weight='700', fill=SOFT)
for i in range(2):
    cx = FX+90 + i*120
    s.add(f'<circle cx="{cx}" cy="650" r="20" fill="none" stroke="{INK}" stroke-width="1.5"/>')
    s.img('server', cx-9, 641, 18)
s.text(FX+250, 645, '클러스터가 두 개.', size=9, fill=MUTED)
s.text(FX+250, 661, '에러는 안 난다', size=9, fill=MUTED)

notes(s, 710, [
  'Server에는 Agent 구성요소가 함께 들어 있지만 Agent에는 Server 것이 없다',
  '연결을 여는 쪽은 언제나 Agent다. Server가 Agent의 6443으로 접속하지 않는다',
  'K3s 노드에는 Docker Engine을 설치하지 않는다. kubelet이 containerd에 직접 말한다',
])
open('day4.svg','w',encoding='utf-8').write(s.render())
print('ok')
