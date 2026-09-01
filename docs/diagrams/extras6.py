from ncpstyle import *

# ── 포트 세 값 : 각각 다른 층의 포트다 ──────────────────────────────
s = canvas(410)
title(s, '포트 세 값', 'nodePort · port · targetPort는 서로 다른 층의 포트다')

CY = 122
user(s, 80, CY, '내 PC')
for cx, icon, lab, sub in [
        (270, 'server',             '노드',      '어느 노드든'),
        (450, 'kubernetes-service', 'Service',  'ClusterIP'),
        (640, 'server',             '컨테이너',   'nginx')]:
    node(s, cx, CY, icon, lab, sub)

for x1, x2, lab in [(108, 243, 'nodePort 30080'),
                    (297, 423, 'port 80'),
                    (477, 613, 'targetPort 80')]:
    arrow(s, f'M {x1} {CY} L {x2} {CY}')
    label(s, (x1+x2)/2, CY-18, lab, fill=INK)

group(s, M, 212, CONTENT, 128, 'Pod가 없는 노드로 들어와도 응답이 온다')
s.text(M+18, 266, '외부 요청', size=10, weight='600', fill=INK)
arrow(s, f'M 96 266 L 186 266')
node(s, 220, 266, 'server', '노드 A', 'Pod 없음', size=30)
arrow(s, f'M 256 266 L 494 266')
s.line_label(375, 250, 'kube-proxy가 넘긴다')
node(s, 530, 266, 'server', '노드 B', 'Pod 2개', size=30)

notes(s, 374, [
  '요청은 nodePort → port → targetPort 순으로 지나간다. 셋 다 다른 숫자여도 된다',
  'nodePort는 30000-32767 범위에서 고르고, 안 적으면 자동으로 배정된다',
])
open('nodeport-ports.svg','w',encoding='utf-8').write(s.render())
print('nodeport-ports ok')


# ── 조용한 실패 : Pod는 Running인데 밖에서는 503 ───────────────────
s = canvas(400)
title(s, '헬스체크가 깨졌을 때', '쿠버네티스 쪽만 봐서는 원인이 안 보인다')

CY = 124
user(s, 74, CY, '사용자')
arrow(s, f'M 102 {CY-10} L 202 {CY-10}')
label(s, 152, CY-28, 'HTTP')
arrow(s, f'M 202 {CY+12} L 106 {CY+12}', dash='4 4')
s.line_label(154, CY+12, '503')

node(s, 240, CY, 'application-load-balancer', 'ALB', size=34)
plain(s, f'M 278 {CY} L 452 {CY}', dash='4 4')
cross(s, 366, CY, 7)
s.line_label(366, CY-24, '헬스체크 경로가 틀리면 · 연속 실패로 판정')
array(s, 486, CY-24, 232, 48, n=2, label='노드 · Pod는 전부 Running')

GY = 224
group(s, M, GY, CONTENT, 92, '같은 시점에 두 쪽이 다르게 보인다')
plain(s, f'M {CW/2} {GY+30} L {CW/2} {GY+78}', sw=1)
for i, (cmd, verdict, col) in enumerate([
        ('kubectl get pods',      '전부 Running · 문제 없음', INK),
        ('콘솔 · 로드밸런서 상태', '모든 노드 비정상',        SOFT)]):
    cx = M + CONTENT/4 + i*CONTENT/2
    s.text(cx, GY+46, cmd, size=9.5, fill=MUTED, mono=True, anchor='middle')
    s.text(cx, GY+66, verdict, size=10.5, weight='700', fill=col, anchor='middle')

notes(s, 350, [
  '연속 성공·실패 횟수로 판정하므로 망가질 때도 회복될 때도 즉시가 아니다',
  '고치고 바로 확인해서 안 고쳐졌다고 판단하면 안 되는 이유다',
])
open('alb-health.svg','w',encoding='utf-8').write(s.render())
print('alb-health ok')
