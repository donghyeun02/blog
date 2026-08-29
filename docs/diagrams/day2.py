from lib import *

W, H = 1620, 600
s = Svg(W, H)
titled(s, '2일차 — 요청과 응답은 다른 문으로 지나간다',
       'NACL은 연결을 기억하지 않고, ACG는 기억한다')

lx = 1210
s.path(f'M {lx} 60 L {lx+34} 60'); s.text(lx+42, 60, '요청', size=11, fill=SOFT)
s.path(f'M {lx+110} 60 L {lx+144} 60', dash='5 4'); s.text(lx+152, 60, '응답', size=11, fill=SOFT)

REQ_Y, RES_Y = 280, 350
VY, VH = 150, 350

def vpc(x, w, name, cidr):
    s.rect(x, VY, w, VH, sw=2.5)
    s.img('vpc', x+16, VY+14)
    s.text(x+54, VY+21, name, size=14, weight='700', mono=True)
    s.text(x+54, VY+40, cidr, size=11, fill=SOFT, mono=True)

def subnet(x, w, name, cidr):
    s.rect(x, 215, w, 265, stroke=MUTED, sw=1.3, dash='6 5')
    s.text(x+14, 233, name, size=11, fill=MUTED, mono=True)
    s.text(x+w-14, 233, cidr, size=11, fill=MUTED, mono=True, anchor='end')

def server(x, w, host, procs):
    s.rect(x, 240, w, 200, sw=1.8)
    s.img('server', x+14, 254)
    s.text(x+50, 266, host, size=12, weight='600', mono=True)
    for i, p in enumerate(procs):
        s.text(x+16, 310+i*20, p, size=11, fill=SOFT, mono=True)

# 학습자 PC / SSL VPN
s.rect(40, 240, 130, 80, sw=1.6)
s.text(105, 268, '학습자 PC', size=13, weight='600', anchor='middle')
s.text(105, 292, 'Agent · OTP', size=11, fill=SOFT, mono=True, anchor='middle')
s.rect(215, 240, 215, 80, sw=1.6)
s.img('ssl-vpn', 229, 252)
s.text(263, 264, 'SSL VPN', size=13, weight='600')
s.text(229, 292, 'cnp-s01-ops-sslvpn', size=10, fill=SOFT, mono=True)
s.text(229, 308, 'IP Pool /23 · TCP 443', size=10, fill=MUTED, mono=True)

vpc(470, 400, 'cnp-s01-ops-vpc', '10.50.0.0/16')
subnet(494, 352, 'cnp-s01-ops-mgmt-kr1-sbn', '10.50.0.0/24')
server(514, 312, 'cnp-s01-ops-mgmt-svr',
       ['Prometheus 9090 · Grafana 3000', 'ACG cnp-s01-ops-mgmt-acg', 'NACL cnp-s01-ops-pri-nacl'])

s.img('vpc-peering', 887, 262, 36)
s.text(905, 315, 'Peering', size=10, fill=SOFT, mono=True, anchor='middle')

vpc(940, 620, 'cnp-s01-wld-vpc', '10.60.0.0/16')
subnet(964, 572, 'cnp-s01-wld-mon-kr1-sbn', '10.60.48.0/24')

NX, NY, NW, CH = 986, 250, 92, 60
def gate(x, icon, label, sub, second_solid):
    s.rect(x, NY, NW, CH, sw=1.8)
    s.img(icon, x+8, NY+18, 22)
    s.text(x+NW-10, NY+30, 'IN', size=12, weight='700', mono=True, anchor='end')
    if second_solid:
        s.rect(x, NY+70, NW, CH, sw=1.8)
        s.text(x+NW/2, NY+100, 'OUT', size=12, weight='700', mono=True, anchor='middle')
    else:
        s.rect(x, NY+70, NW, CH, stroke=LINE, sw=1.2, dash='4 4')
        s.text(x+NW/2, NY+100, '검사 없음', size=10, fill=MUTED, anchor='middle')
    s.text(x+NW/2, NY+155, label, size=12, weight='600', anchor='middle')
    s.text(x+NW/2, NY+174, sub, size=10, fill=ACC, mono=True, anchor='middle')

gate(NX, 'nacl', 'NACL', 'Stateless', True)
AX = NX+140
gate(AX, 'acg', 'ACG', 'Stateful', False)
s.text(NX+NW/2, NY+193, 'cnp-s01-wld-node-nacl', size=9, fill=MUTED, mono=True, anchor='middle')
s.text(AX+NW/2, NY+193, 'cnp-s01-wld-mon-acg', size=9, fill=MUTED, mono=True, anchor='middle')

SVX = AX+148
server(SVX, 250, 'cnp-s01-wld-mon-svr', ['Node Exporter 9100'])

# 요청 — IN 칸을 지난다
for a, b in [(170,215), (430,470), (826,NX), (NX+NW,AX), (AX+NW,SVX)]:
    s.path(f'M {a} {REQ_Y} L {b} {REQ_Y}')
s.text(856, REQ_Y-18, 'TCP 22', size=11, fill=SOFT, mono=True, anchor='middle')

# 응답 — NACL은 OUT 칸을 지나고 ACG는 검사 없이 통과
for a, b in [(SVX, AX+NW), (AX, NX+NW), (NX, 826)]:
    s.path(f'M {a} {RES_Y} L {b} {RES_Y}', dash='5 4')
s.line_label(906, RES_Y+24, '임시포트 32768-65535')

footnotes(s, 528, [
  'NACL은 Stateless — 요청과 응답을 각각 열어야 한다. 응답이 OUT 칸을 지나는 이유다',
  'ACG는 Stateful — 허용한 요청의 응답은 검사 없이 통과한다',
  'VPN 세션은 Ops VPC에서 끝난다. Workload는 Ops Mgmt를 거쳐야 닿는다',
  'Ops 쪽 Subnet에도 같은 NACL·ACG가 있다. 그림에서는 목적지 쪽만 펼쳤다',
])

open('day2.svg','w',encoding='utf-8').write(s.render())
print('ok')
