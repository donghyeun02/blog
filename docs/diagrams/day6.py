from ncpstyle import *

s = canvas(590)
title(s, '6일차 — 관리형으로 옮긴 뒤', 'NKS · ALB Ingress · 노드 풀과 존')

# 인터넷
INET_X, INET_Y = CW/2-40, 96
node_side(s, INET_X, INET_Y, 'internet', '인터넷')

VY, VH = 170, 330
vpc(s, M, VY, CONTENT, VH, 'NKS VPC  ·  컨트롤 플레인은 보이지 않는다')

# LB 서브넷 : ALB 한 대
LBY, LBH = 188, 84
group(s, M+14, LBY, CONTENT-28, LBH, 'LB Subnet')
node(s, CW/2, LBY+26, 'application-load-balancer', 'ALB Ingress',
     'ingressClassName: alb')
arrow(s, f'M {INET_X} {INET_Y+21} L {INET_X} {LBY+4}')
label(s, INET_X+34, 152, 'TCP 80', anchor='start')

# ALB → 두 존의 노드 풀
RAIL = 296
ZY, ZH, ZW = 312, 166, (CONTENT-28-16)/2
Z1, Z2 = M+14, M+14+ZW+16
C1, C2 = Z1+ZW/2, Z2+ZW/2

plain(s, f'M {CW/2} {LBY+LBH} L {CW/2} {RAIL}')
plain(s, f'M {C1} {RAIL} L {C2} {RAIL}')
s.line_label(CW/2, RAIL-13, 'NodePort 30080 · Service는 NodePort 타입이어야 한다', size=9.5)

for i, (zx, cx, zl) in enumerate([(Z1, C1, 'KR-1 존'), (Z2, C2, 'KR-2 존')]):
    zone(s, zx, ZY, ZW, ZH, zl, right=bool(i))
    arrow(s, f'M {cx} {RAIL} L {cx} {ZY+34}')
    array(s, zx+20, ZY+34, ZW-40, 54, n=2, label='노드 풀  ·  같은 사양의 묶음')
    s.img('auto-scaling', zx+28, ZY+122, 24)
    s.text(zx+60, ZY+134, 'Cluster Autoscaler', size=9.5, weight='600', fill=INK)
    s.text(zx+60, ZY+148, 'Pending Pod를 보고 노드를 늘린다', size=8.5, fill=MUTED)

notes(s, 534, [
  '매니페스트와 kubectl은 5일차와 같다. 달라지는 건 클라우드 자원과 닿는 지점이다',
  'Service 하나가 실제 로드밸런서 하나로 만들어지고 시간 단위로 과금된다',
])
open('day6.svg','w',encoding='utf-8').write(s.render())
print('day6 ok')
