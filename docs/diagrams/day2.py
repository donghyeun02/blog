from lib import *
from narrow import *

W, H = CW, 716
s = Svg(W, H)
head(s, '2일차 — 요청과 응답은 다른 문으로 지나간다', 'NACL은 연결을 기억하지 않고, ACG는 기억한다')

# 진입
s.rect(M, 92, 200, 46, sw=1.6)
s.text(M+100, 108, '학습자 PC', size=11.5, weight='600', anchor='middle')
s.text(M+100, 126, 'Agent · OTP', size=9.5, fill=SOFT, mono=True, anchor='middle')
VPNX = M+240
s.rect(VPNX, 92, 250, 46, sw=1.6)
s.img('ssl-vpn', VPNX+10, 100, 24)
s.text(VPNX+42, 108, 'SSL VPN', size=11.5, weight='600')
s.text(VPNX+42, 126, 'IP Pool /23 · TCP 443', size=9, fill=SOFT, mono=True)
s.path(f'M {M+200} 115 L {VPNX} 115')
s.path(f'M {VPNX+125} 138 L {VPNX+125} 168')

# Ops VPC
vpcbox(s, M, 168, CONTENT, 110, 'cnp-s01-ops-vpc', '10.50.0.0/16')
srv(s, M+240, 182, 442, 82, 'cnp-s01-ops-mgmt-svr',
    ['Prometheus 9090 · Grafana 3000 · ACG cnp-s01-ops-mgmt-acg'])

# Peering
s.img('vpc-peering', CW/2-14, 292, 28)
s.text(CW/2+24, 306, 'Peering', size=9.5, fill=SOFT, mono=True)

# Workload VPC
WY = 344
vpcbox(s, M, WY, CONTENT, 252, 'cnp-s01-wld-vpc', '10.60.0.0/16')
sub(s, M+12, WY+48, CONTENT-24, 188, 'Monitoring · 10.60.48.0/24', 'cnp-s01-wld-mon-kr1-sbn', right=True)

GY, GH2, GW = WY+72, 52, 124
def gate(x, icon, name, tag, solid2):
    s.rect(x, GY, GW, GH2, sw=1.7)
    s.img(icon, x+7, GY+15, 22)
    s.text(x+34, GY+26, name, size=10.5, weight='700')
    s.text(x+GW-9, GY+26, 'IN', size=10.5, weight='700', mono=True, anchor='end')
    if solid2:
        s.rect(x, GY+62, GW, GH2, sw=1.7)
        s.text(x+GW/2, GY+88, 'OUT', size=10.5, weight='700', mono=True, anchor='middle')
    else:
        s.rect(x, GY+62, GW, GH2, stroke=LINE, sw=1.2, dash='4 4')
        s.text(x+GW/2, GY+88, '검사 없음', size=9.5, fill=MUTED, anchor='middle')
    s.text(x+GW/2, GY+130, tag, size=9.5, fill=ACC, mono=True, anchor='middle')

NX, AX = M+34, M+192
gate(NX, 'nacl', 'NACL', 'Stateless', True)
gate(AX, 'acg',  'ACG',  'Stateful',  False)
SX = M+366
srv(s, SX, GY-8, 306, 128, 'cnp-s01-wld-mon-svr',
    ['Node Exporter 9100', 'ACG cnp-s01-wld-mon-acg', 'NACL cnp-s01-wld-node-nacl'])

REQ_Y, RES_Y = GY+26, GY+88
s.path(f'M {NX+GW} {REQ_Y} L {AX} {REQ_Y}')
s.path(f'M {AX+GW} {REQ_Y} L {SX} {REQ_Y}')
s.text((AX+GW+SX)/2, REQ_Y-13, 'TCP 22', size=9.5, fill=SOFT, mono=True, anchor='middle')
s.path(f'M {SX} {RES_Y} L {AX+GW} {RES_Y}', dash='4 4')
s.path(f'M {AX} {RES_Y} L {NX+GW} {RES_Y}', dash='4 4')
s.text(430, RES_Y+52, '응답 · 임시포트 32768-65535', size=9, fill=SOFT, mono=True, anchor='middle')

# Ops 서버 ↔ NACL : 왼쪽 빈 자리를 따라 내려간다
CORR = 10
s.path(f'M {M+240} 223 L {CORR} 223 L {CORR} {GY+26} L {NX} {GY+26}')
s.path(f'M {NX} {GY+88} L {CORR} {GY+88}', dash='4 4')

notes(s, 622, [
  'NACL은 Stateless — 요청과 응답을 각각 열어야 한다. 응답이 OUT 칸을 지나는 이유다',
  'ACG는 Stateful — 허용한 요청의 응답은 검사 없이 통과한다',
  'VPN 세션은 Ops VPC에서 끝난다. Workload는 Ops Mgmt를 거쳐야 닿는다',
  'Ops 쪽 Subnet에도 같은 구조가 있다. 그림에서는 목적지 쪽만 펼쳤다',
])
open('day2.svg','w',encoding='utf-8').write(s.render())
print('ok')
