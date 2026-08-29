from lib import *

W, H = 1500, 920
s = Svg(W, H)
titled(s, '4일차 — 연결을 여는 쪽은 언제나 Agent다',
       'K3s Server와 Agent는 들어 있는 것이 다르다')

# ── Ops
s.rect(40, 150, 300, 200, sw=2.5)
s.img('vpc', 56, 164)
s.text(94, 171, 'cnp-s01-ops-vpc', size=13, weight='700', mono=True)
s.text(94, 190, '10.50.0.0/16', size=11, fill=SOFT, mono=True)
s.rect(64, 218, 252, 110, sw=1.8)
s.img('server', 78, 232)
s.text(114, 244, 'cnp-s01-ops-mgmt-svr', size=11, weight='600', mono=True)
s.text(80, 288, 'kubectl', size=13, weight='700', mono=True)
s.text(80, 310, '조종석은 여기 하나', size=10, fill=MUTED)

s.img('vpc-peering', 372, 196, 36)
s.text(390, 246, 'Peering', size=10, fill=SOFT, mono=True, anchor='middle')

# ── Workload
WX, WW = 440, 1020
s.rect(WX, 150, WW, 550, sw=2.5)
s.img('vpc', WX+16, 164)
s.text(WX+54, 171, 'cnp-s01-wld-vpc', size=13, weight='700', mono=True)
s.text(WX+54, 190, '10.60.0.0/16', size=11, fill=SOFT, mono=True)

s.rect(WX+24, 218, WW-48, 402, stroke=ACC, sw=1.8)
s.img('kubernetes-service', WX+38, 230)
s.text(WX+74, 244, 'K3s 클러스터', size=12, weight='700', fill=ACC)

def node(x, w, sbn, cidr, host, decide, run, note=None):
    s.rect(x, 274, w, 326, stroke=MUTED, sw=1.3, dash='6 5')
    s.text(x+14, 292, sbn, size=10, fill=MUTED, mono=True)
    s.text(x+w-14, 292, cidr, size=10, fill=MUTED, mono=True, anchor='end')
    s.rect(x+20, 310, w-40, 260, sw=1.8)
    s.img('server', x+34, 322)
    s.text(x+70, 334, host, size=11, weight='600', mono=True)
    y = 378
    if decide:
        s.text(x+36, y, '결정', size=11, weight='700', fill=ACC)
        for i, d in enumerate(decide):
            s.text(x+36, y+22+i*19, '· ' + d, size=10, fill=SOFT, mono=True)
        y += 22 + len(decide)*19 + 16
    else:
        s.rect(x+30, y-14, w-100, 50, stroke=LINE, sw=1.2, dash='4 4')
        s.text(x+(w-40)/2, y+11, '결정 구성요소 없음', size=11, fill=MUTED, anchor='middle')
        y += 62
    s.text(x+36, y, '실행', size=11, weight='700')
    for i, r in enumerate(run):
        s.text(x+36, y+22+i*19, '· ' + r, size=10, fill=SOFT, mono=True)
    if note:
        s.text(x+36, y+22+len(run)*19+18, note, size=10, fill=MUTED, mono=True)

RUN = ['kubelet', 'containerd', 'kube-proxy']
N1X, N2X, NW = WX+48, WX+552, 420
node(N1X, NW, 'cnp-s01-k3s-node-kr1-sbn', '10.60.8.0/24', 'cnp-s01-k3s-srv-kr1-svr',
     ['kube-apiserver', '저장소 SQLite', 'kube-scheduler', 'controller-manager'], RUN)
node(N2X, NW, 'cnp-s01-k3s-node-kr2-sbn', '10.60.9.0/24', 'cnp-s01-k3s-agt-kr2-svr',
     None, RUN, 'ACG cnp-s01-k3s-node-acg')

# kubectl → apiserver
s.path(f'M 340 334 L {N1X+20} 334')
s.text(424, 316, 'TCP 6443', size=10, fill=SOFT, mono=True, anchor='middle')

# Agent가 여는 연결
SRV_R, AGT_L = N1X+NW-20, N2X+20
MY = 650
s.path(f'M {AGT_L+180} 570 L {AGT_L+180} {MY} L {SRV_R-180} {MY} L {SRV_R-180} 570')
s.line_label((SRV_R+AGT_L)/2, MY, 'TCP 6443 · Agent가 연다')

# Server → Agent 는 없다
s.path(f'M {SRV_R} 440 L {AGT_L} 440', dash='5 4')
s.cross((SRV_R+AGT_L)/2, 440)

# 클러스터 대역
s.rect(40, 400, 300, 130, stroke=LINE, sw=1.4, fill=SURF)
s.text(60, 424, '클러스터 대역', size=11, weight='700', fill=SOFT)
for i, (k, v) in enumerate([('Pod CIDR','10.42.0.0/16'),('Service CIDR','10.43.0.0/16'),('Cluster DNS','10.43.0.10')]):
    s.text(60, 452+i*22, k, size=10, fill=SOFT, mono=True)
    s.text(320, 452+i*22, v, size=10, fill=INK, mono=True, anchor='end')

# 실패 사례
FX, FY, FW, FH = 1000, 740, 460, 160
s.rect(FX, FY, FW, FH, stroke=MUTED, sw=1.3, dash='6 5')
s.text(FX+16, FY+24, '설치 옵션을 빠뜨렸을 때', size=11, weight='700', fill=SOFT)
s.text(FX+16, FY+44, 'K3S_URL 없이 설치 → 클러스터가 두 개. 에러는 안 난다', size=10, fill=MUTED)
for i, host in enumerate(['cnp-s01-k3s-srv-kr1-svr', 'cnp-s01-k3s-agt-kr2-svr']):
    cx = FX+130 + i*200
    s.add(f'<circle cx="{cx}" cy="{FY+96}" r="34" fill="none" stroke="{INK}" stroke-width="1.6"/>')
    s.img('server', cx-13, FY+83, 26)
    s.text(cx, FY+146, host, size=9, fill=MUTED, mono=True, anchor='middle')

footnotes(s, 740, [
  'Server에는 Agent 구성요소가 함께 들어 있지만 Agent에는 Server 것이 없다',
  '연결을 여는 쪽은 언제나 Agent다. Server가 Agent의 6443으로 접속하지 않는다',
  'K3s 노드에는 Docker Engine을 설치하지 않는다. kubelet이 containerd에 직접 말한다',
])

open('day4.svg','w',encoding='utf-8').write(s.render())
print('ok')
