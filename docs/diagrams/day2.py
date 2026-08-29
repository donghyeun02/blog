from ncpstyle import *

s = canvas(600)
title(s, '2일차', 'NACL과 ACG')

user(s, 90, 100)
node_side(s, 250, 100, 'ssl-vpn', 'SSL VPN', 'IP Pool /23 · 443')
arrow(s, 'M 118 100 L 231 100')
arrow(s, 'M 400 100 L 400 172')

# Ops VPC
vpc(s, M, 172, CONTENT, 96, 'cnp-s01-ops-vpc  10.50.0.0/16')
node_side(s, 300, 220, 'server', 'cnp-s01-ops-mgmt-svr', 'Prometheus · Grafana · kubectl')

# Peering
s.img('vpc-peering', CW/2-14, 282, 28)
label(s, CW/2+52, 296, 'Peering')

# Workload VPC
WY = 316
vpc(s, M, WY, CONTENT, 216, 'cnp-s01-wld-vpc  10.60.0.0/16')
group(s, M+14, WY+20, CONTENT-28, 178, 'Monitoring Subnet  10.60.48.0/24')

GY, GW, GH = WY+52, 116, 50
def gate(x, icon, name, tag, solid2):
    s.rect(x, GY, GW, GH, stroke=INK, sw=1.3)
    s.img(icon, x+8, GY+13, 24)
    s.text(x+38, GY+27, name, size=10.5, weight='700', fill=INK)
    s.text(x+GW-9, GY+27, 'IN', size=10, weight='700', mono=True, fill=SOFT, anchor='end')
    if solid2:
        s.rect(x, GY+60, GW, GH, stroke=INK, sw=1.3)
        s.text(x+GW/2, GY+87, 'OUT', size=10, weight='700', mono=True, fill=INK, anchor='middle')
    else:
        s.rect(x, GY+60, GW, GH, stroke=EDGE, sw=1.1, dash='4 4')
        s.text(x+GW/2, GY+87, '검사 없음', size=9.5, fill=MUTED, anchor='middle')
    s.text(x+GW/2, GY+134, tag, size=9.5, fill=BLUE, mono=True, anchor='middle')

NX, AX = M+40, M+192
gate(NX, 'nacl', 'NACL', 'Stateless', True)
gate(AX, 'acg',  'ACG',  'Stateful',  False)
SX = M+372
node_side(s, SX, GY+34, 'server', 'cnp-s01-wld-mon-svr', 'Node Exporter 9100')

REQ, RES = GY+25, GY+85
arrow(s, f'M {NX+GW} {REQ} L {AX} {REQ}')
arrow(s, f'M {AX+GW} {REQ} L {SX-22} {REQ}')
label(s, (AX+GW+SX-22)/2, REQ-12, 'TCP 22')
arrow(s, f'M {SX-22} {RES} L {AX+GW} {RES}', dash='4 4')
arrow(s, f'M {AX} {RES} L {NX+GW} {RES}', dash='4 4')
label(s, (AX+GW+SX-22)/2, RES+16, '임시포트')

CORR = 12
arrow(s, f'M 250 246 L {CORR} 246 L {CORR} {REQ} L {NX} {REQ}')
arrow(s, f'M {NX} {RES} L {CORR} {RES}', dash='4 4')

notes(s, 560, ['NACL은 요청과 응답을 각각 열어야 한다'])
open('day2.svg','w',encoding='utf-8').write(s.render())
print('ok')
