from lib import *
from narrow import *

W, H = CW, 640
s = Svg(W, H)
head(s, '1일차 — 나가는 길만 있다', 'VPC 경로 구성 · 서버는 아직 없다')

s.rect(M, 88, CONTENT, 38, sw=2)
s.text(CW/2, 107, '인터넷', size=13, weight='700', anchor='middle')

VW = 320
OX, WX2 = M, CW - M - VW
VY, VH = 186, 300
GAPC = (OX+VW + WX2)/2
PUB_Y, PRI_Y, SH = 246, 362, 100
NAT_Y, NAT_H, GH_Y, GH_H = 284, 50, 400, 50

vpcbox(s, OX,  VY, VW, VH, 'cnp-s01-ops-vpc', '10.50.0.0/16')
vpcbox(s, WX2, VY, VW, VH, 'cnp-s01-wld-vpc', '10.60.0.0/16')

for x, pk, pn, n1, n2, rk, rn, g1, g2 in [
    (OX,  'Public · NAT · 10.50.80.0/26', 'cnp-s01-ops-nat-kr1-sbn',
          'NAT Gateway', '공인 IP 연결',
          'Private · 10.50.0.0/24', 'cnp-s01-ops-mgmt-kr1-sbn',
          '관리 서버 자리', '2일차에 생성'),
    (WX2, 'Public · NAT · 존별 1개', 'cnp-s01-wld-nat-kr1 · kr2',
          'NAT Gateway ×2', 'KR-1 · KR-2',
          'Private · 노드 대역', 'cnp-s01-dkr / k3s / mon',
          '노드 자리', '2~4일차에 생성')]:
    sub(s, x+12, PUB_Y, VW-24, SH, pk, pn)
    s.rect(x+28, NAT_Y, VW-56, NAT_H, sw=1.6)
    s.img('nat-gateway', x+40, NAT_Y+13, 24)
    s.text(x+74, NAT_Y+19, n1, size=11, weight='600')
    s.text(x+74, NAT_Y+36, n2, size=9.5, fill=SOFT, mono=True)
    sub(s, x+12, PRI_Y, VW-24, SH, rk, rn)
    ghost(s, x+28, GH_Y, VW-56, GH_H, g1, g2)

    OUT, BLK = x+268, x+208
    s.path(f'M {OUT} {GH_Y} L {OUT} {NAT_Y+NAT_H}')
    s.path(f'M {OUT} {NAT_Y} L {OUT} 126')
    s.line_label(OUT, 160, 'Internet Gateway')
    s.path(f'M {BLK} {NAT_Y+NAT_H} L {BLK} {GH_Y}', dash='4 4')
    s.cross(BLK, (PUB_Y+SH+PRI_Y)/2, 7)

s.line_label(OX+268, (GH_Y+NAT_Y+NAT_H)/2, 'TCP 80·443')

s.img('vpc-peering', GAPC-14, 294, 28)
s.path(f'M {OX+VW} 270 L {GAPC+9} 270')
s.path(f'M {WX2} 356 L {GAPC-9} 356')
s.text(GAPC, 336, 'Peering ×2', size=8.5, fill=SOFT, mono=True, anchor='middle')

notes(s, 522, [
  'NAT에 공인 IP가 붙어 있어도 인터넷에서 사설 서버로는 들어올 수 없다 (✕)',
  'KR-2 Private Subnet은 KR-1이 아니라 자기 존의 NAT를 쓴다',
  'Peering은 방향이 반대인 두 개다 — ops-wld-peer / wld-ops-peer',
  'Subnet 전체 목록과 대역은 본문 표 참고',
])
open('day1.svg','w',encoding='utf-8').write(s.render())
print('ok')
