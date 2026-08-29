from lib import *

W, H = 1500, 800
s = Svg(W, H)
titled(s, '1일차 — 나가는 길만 있다',
       '네이버 클라우드 VPC 경로 구성 · 서버는 아직 없다')

# 범례
lx = 1090
s.path(f'M {lx} 60 L {lx+34} 60'); s.text(lx+42, 60, '나가는 요청', size=11, fill=SOFT)
s.cross(lx+150, 60, 7);            s.text(lx+166, 60, '불가', size=11, fill=SOFT)

# 인터넷
IN_X, IN_Y, IN_W, IN_H = 520, 100, 460, 46
s.rect(IN_X, IN_Y, IN_W, IN_H, sw=2)
s.text(IN_X+IN_W/2, IN_Y+IN_H/2, '인터넷', size=15, weight='600', anchor='middle')
IN_MID = IN_Y + IN_H/2

# Internet Gateway
IGW_Y, IGW_H = 170, 40
def igw(cx):
    s.rect(cx-95, IGW_Y, 190, IGW_H, sw=1.6)
    s.text(cx, IGW_Y+IGW_H/2, 'Internet Gateway', size=12, weight='600', anchor='middle')
IGW_O, IGW_W = 420, 1195
igw(IGW_O); igw(IGW_W)

# VPC
VY, VH = 250, 420
def vpc(x, w, name, cidr):
    s.rect(x, VY, w, VH, sw=2.5)
    s.img('vpc', x+16, VY+14)
    s.text(x+54, VY+21, name, size=15, weight='700', mono=True)
    s.text(x+54, VY+40, cidr, size=12, fill=SOFT, mono=True)
OX, OW = 40, 620
WX, WW = 840, 620
vpc(OX, OW, 'cnp-s01-ops-vpc', '10.50.0.0/16')
vpc(WX, WW, 'cnp-s01-wld-vpc', '10.60.0.0/16')

def subnet(x, y, w, h, kind, name, cidr=None):
    s.rect(x, y, w, h, stroke=MUTED, sw=1.3, dash='6 5')
    s.text(x+14, y+20, kind, size=12, weight='600', fill=SOFT)
    s.text(x+14, y+38, name, size=11, fill=MUTED, mono=True)
    if cidr: s.text(x+w-14, y+20, cidr, size=11, fill=MUTED, mono=True, anchor='end')

PUB_Y, PRI_Y, SN_H = 320, 495, 150
NAT_Y, NAT_H = 382, 64
BOX_Y, BOX_H = 553, 60

# Ops
subnet(OX+24, PUB_Y, OW-48, SN_H, 'Public · NAT Gateway 전용', 'cnp-s01-ops-nat-kr1-sbn', '10.50.80.0/26')
s.rect(OX+180, NAT_Y, 340, NAT_H, sw=1.6)
s.img('nat-gateway', OX+194, NAT_Y+18)
s.text(OX+232, NAT_Y+24, 'NAT Gateway', size=13, weight='600')
s.img('public-ip', OX+232, NAT_Y+33, 15)
s.text(OX+253, NAT_Y+41, '공인 IP', size=11, fill=SOFT, mono=True)

subnet(OX+24, PRI_Y, OW-48, SN_H, 'Private · KR-1', 'cnp-s01-ops-mgmt-kr1-sbn', '10.50.0.0/24')
s.rect(OX+180, BOX_Y, 340, BOX_H, stroke=MUTED, dash='5 4', sw=1.3)
s.text(OX+350, BOX_Y+22, '관리 서버 자리', size=13, fill=MUTED, anchor='middle')
s.text(OX+350, BOX_Y+42, '2일차에 생성', size=11, fill=MUTED, anchor='middle', mono=True)

# Workload
subnet(WX+24, PUB_Y, WW-48, SN_H, 'Public · NAT Gateway 전용 · KR-1 / KR-2', 'cnp-s01-wld-nat-kr1-sbn · kr2-sbn')
for i, nm in enumerate(['cnp-s01-wld-nat-kr1', 'cnp-s01-wld-nat-kr2']):
    bx = WX+44 + i*282
    s.rect(bx, NAT_Y, 262, NAT_H, sw=1.6)
    s.img('nat-gateway', bx+12, NAT_Y+18)
    s.text(bx+48, NAT_Y+24, 'NAT Gateway', size=12, weight='600')
    s.text(bx+48, NAT_Y+43, nm, size=10, fill=SOFT, mono=True)

subnet(WX+24, PRI_Y, WW-48, SN_H, 'Private · KR-1 / KR-2', 'Docker · K3s · 모니터링 노드 자리')
s.rect(WX+44, BOX_Y, 544, BOX_H, stroke=MUTED, dash='5 4', sw=1.3)
s.text(WX+316, BOX_Y+22, '노드 자리', size=13, fill=MUTED, anchor='middle')
s.text(WX+316, BOX_Y+42, '2~4일차에 생성', size=11, fill=MUTED, anchor='middle', mono=True)

# ── 나가는 경로
OUT_O = 420
s.path(f'M {OUT_O} {BOX_Y} L {OUT_O} {NAT_Y+NAT_H}')
s.path(f'M {OUT_O} {NAT_Y} L {OUT_O} {IGW_Y+IGW_H}')
s.path(f'M {OUT_O} {IGW_Y} L {OUT_O} {IN_MID} L {IN_X-8} {IN_MID}')
s.line_label(OUT_O, (NAT_Y + IGW_Y+IGW_H)/2, 'TCP 80·443')

K1, K2 = WX+260, WX+457
for c in (K1, K2):
    s.path(f'M {c} {BOX_Y} L {c} {NAT_Y+NAT_H}')
s.path(f'M {K1} {NAT_Y} L {K1} 232 L {IGW_W} 232 L {IGW_W} {IGW_Y+IGW_H}')
s.path(f'M {K2} {NAT_Y} L {K2} 232 L {IGW_W} 232', marker=False)
s.path(f'M {IGW_W} {IGW_Y} L {IGW_W} {IN_MID} L {IN_X+IN_W+8} {IN_MID}')

# ── 불가 경로
BLK = 520
s.path(f'M {BLK} {NAT_Y+NAT_H} L {BLK} {BOX_Y}', dash='5 4')
s.cross(BLK, (PUB_Y+SN_H + PRI_Y)/2)

# ── Peering
PX = (OX+OW + WX)/2
s.img('vpc-peering', PX-18, 445, 36)
s.path(f'M {OX+OW} 420 L {PX+10} 420')
s.text(PX, 402, 'cnp-s01-ops-wld-peer', size=10, fill=SOFT, mono=True, anchor='middle')
s.path(f'M {WX} 520 L {PX-10} 520')
s.text(PX, 540, 'cnp-s01-wld-ops-peer', size=10, fill=SOFT, mono=True, anchor='middle')

footnotes(s, 715, [
  'NAT Gateway에 공인 IP가 붙어 있어도 인터넷에서 사설 서버로는 들어올 수 없다',
  'KR-2 Private Subnet은 KR-1이 아니라 자기 존의 NAT를 쓴다',
  'Subnet 전체 목록과 대역은 본문 표 참고',
])

open('day1.svg','w',encoding='utf-8').write(s.render())
print('ok')
