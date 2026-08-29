from lib import *
from narrow import *

# ── 1. IGW와 NAT의 방향 차이
s = Svg(CW, 300)
head(s, '나가는 문과 들어오는 문은 같은 문이 아니다', 'Internet Gateway와 NAT Gateway의 방향 비교')
PW = (CONTENT-24)/2
for i, (name, sub_l, both) in enumerate([
        ('Internet Gateway', 'Public Subnet의 인터넷 경로', True),
        ('NAT Gateway', 'Private 서버가 먼저 시작한 연결만', False)]):
    x = M + i*(PW+24)
    s.rect(x, 88, PW, 178, sw=1.8)
    s.text(x+16, 110, name, size=12, weight='700')
    if not both:
        s.img('nat-gateway', x+PW-44, 100, 24)
    s.text(x+16, 128, sub_l, size=9.5, fill=SOFT, mono=True)
    s.rect(x+20, 152, 110, 40, sw=1.4); s.text(x+75, 172, '인터넷', size=10.5, anchor='middle')
    s.rect(x+PW-130, 152, 110, 40, sw=1.4)
    s.text(x+PW-75, 172, '서버', size=10.5, anchor='middle')
    if both:
        s.path(f'M {x+132} 164 L {x+PW-132} 164')      # 밖 → 안
        s.path(f'M {x+PW-132} 186 L {x+132} 186')      # 안 → 밖
        s.text(x+PW/2, 216, '양쪽 다 열린다', size=10, fill=ACC, mono=True, anchor='middle')
    else:
        s.path(f'M {x+132} 164 L {x+PW-132} 164', dash='4 4')   # 밖 → 안 : 불가
        s.cross(x+PW/2, 164, 7)
        s.path(f'M {x+PW-132} 186 L {x+132} 186')               # 안 → 밖 : 가능
        s.text(x+PW/2, 216, '나가는 방향만 열린다', size=10, fill=ACC, mono=True, anchor='middle')
    s.text(x+PW/2, 234, '위: 밖에서 안으로   아래: 안에서 밖으로', size=8.5, fill=MUTED, anchor='middle')
notes(s, 282, ['NAT에 공인 IP가 붙어 있어도 그 주소로 사설 서버에 들어올 수는 없다'])
open('net-direction.svg','w',encoding='utf-8').write(s.render())

# ── 2. 네 개의 관문
s = Svg(CW, 396)
head(s, '패킷이 통과해야 하는 네 개의 관문', '어디서 막혀도 사람이 보는 증상은 똑같다')
LAYERS = [('Route Table', '어디로 보낼지 정한다', '목적지 경로 없음'),
          ('NACL',        'Subnet 경계에서 검사',  '반환 규칙 없음'),
          ('ACG',         '서버 NIC에서 검사',     '포트 미허용'),
          ('Service',     '그 포트를 듣고 있는가',  '프로세스 미기동')]
BY, BH, GAPY = 96, 52, 14
for i, (nm, desc, fail) in enumerate(LAYERS):
    y = BY + i*(BH+GAPY)
    s.rect(M, y, 430, BH, sw=1.7)
    s.text(M+16, y+21, f'{i+1}', size=11, weight='700', fill=ACC, mono=True)
    s.text(M+40, y+21, nm, size=11.5, weight='700')
    s.text(M+40, y+38, desc, size=9.5, fill=SOFT, mono=True)
    s.text(M+446, y+21, fail, size=9.5, fill=MUTED, mono=True)
    s.text(M+446, y+38, '↓  증상: 타임아웃', size=9.5, fill=ACC, mono=True)
    if i < 3:
        s.path(f'M {M+215} {y+BH} L {M+215} {y+BH+GAPY}')
notes(s, 358, ['넷 중 하나만 비어 있어도 통신은 안 된다. 그런데 증상은 넷 다 같다',
               '서버를 먼저 띄우지 않고 길부터 깐 이유가 여기에 있다'])
open('net-layers.svg','w',encoding='utf-8').write(s.render())

# ── 3. 멈춘 SSH
s = Svg(CW, 290)
head(s, '거절당한 게 아니라 대답이 안 온 것', '요청은 나갔고 응답이 Subnet 경계에서 버려졌다')
s.rect(M, 88, CONTENT, 96, sw=1.6, fill='#1D1D1F')
for i, l in enumerate(['ubuntu@cnp-s01-ops-mgmt-svr:~$ ssh 10.60.48.6',
                       '', '_']):
    s.text(M+18, 112+i*24, l, size=10.5, fill='#E2E6E9', mono=True)
s.text(CW-M-18, 168, '응답 없음 · 에러도 없음', size=9.5, fill='#AEAEB2', mono=True, anchor='end')
FY = 206
s.rect(M, FY, 190, 44, sw=1.5)
s.text(M+95, FY+22, 'ops-mgmt', size=10.5, mono=True, anchor='middle')
s.rect(CW-M-190, FY, 190, 44, sw=1.5)
s.text(CW-M-95, FY+22, 'wld-mon', size=10.5, mono=True, anchor='middle')
s.path(f'M {M+190} {FY+14} L {CW-M-190} {FY+14}')
s.text(CW/2, FY+4, '요청 TCP 22 — 도착', size=9, fill=SOFT, mono=True, anchor='middle')
s.path(f'M {CW-M-190} {FY+34} L {M+190} {FY+34}', dash='4 4')
s.cross(CW/2, FY+34, 7)
s.text(CW/2, FY+58, '응답 — NACL 아웃바운드 규칙이 없어 버려진다', size=9, fill=MUTED, mono=True, anchor='middle')
open('ssh-hang.svg','w',encoding='utf-8').write(s.render())

# ── 4. 9100 수집 경로
s = Svg(CW, 500)
head(s, '메트릭 하나를 긁어오는 데 여섯 군데', 'Prometheus는 Pull 방식이라 결국 방화벽 이야기가 된다')
STEPS = [('Peering Route', '상대 CIDR 경로'),
         ('Ops NACL', 'OUT 9100'),
         ('Ops ACG', 'OUT 9100'),
         ('Wld NACL', 'IN 9100'),
         ('Wld ACG', 'IN 9100'),
         ('Node Exporter', 'LISTEN 9100')]
BY2, BH2 = 108, 46
for i, (nm, det) in enumerate(STEPS):
    y = BY2 + i*(BH2+8)
    s.rect(M+150, y, 420, BH2, sw=1.5)
    s.text(M+166, y+18, nm, size=10.5, weight='600')
    s.text(M+166, y+34, det, size=9, fill=SOFT, mono=True)
    s.text(M+556, y+26, '☐', size=14, fill=MUTED, anchor='end')
    if i < len(STEPS)-1:
        s.path(f'M {M+360} {y+BH2} L {M+360} {y+BH2+8}', marker=False)
s.text(M+80, BY2+76, 'Ops', size=10.5, weight='700', fill=SOFT, anchor='middle')
s.text(M+80, BY2+94, 'Prometheus', size=9, fill=MUTED, mono=True, anchor='middle')
s.path(f'M {M+80} {BY2+62} L {M+80} {BY2+23} L {M+150} {BY2+23}', marker=True)
notes(s, 462, ['여섯 중 하나만 비어도 그래프가 안 뜬다. 증상은 "데이터 없음" 하나뿐이다'])
open('scrape-path.svg','w',encoding='utf-8').write(s.render())

# ── 5. 같은 호스트인데 못 찾는다
s = Svg(CW, 300)
head(s, '같은 서버에 있는데 서로를 못 찾는다', '붙은 네트워크가 다르면 호스트가 같아도 통하지 않는다')
s.rect(M, 92, CONTENT, 160, sw=1.8)
s.img('server', M+14, 102, 24)
s.text(M+46, 114, 'Docker 호스트 한 대', size=11, weight='700')
for i, (bn, cn, pt) in enumerate([('bridge (기본)', 'web', 'nginx 80'),
                                  ('bridge (기본)', 'api', 'node 3000')]):
    x = M + 24 + i*344
    s.rect(x, 140, 300, 96, stroke=MUTED, sw=1.2, dash='4 4')
    s.text(x+12, 158, bn, size=9, fill=MUTED, mono=True)
    s.rect(x+60, 172, 180, 50, sw=1.5)
    s.text(x+150, 190, cn, size=11, weight='700', mono=True, anchor='middle')
    s.text(x+150, 208, pt, size=9, fill=SOFT, mono=True, anchor='middle')
s.path(f'M {M+348} 197 L {M+392} 197', dash='4 4', marker=False)
s.cross(CW/2, 197, 8)
s.text(CW/2, 264, '이름으로도 IP로도 안 된다', size=9.5, fill=MUTED, anchor='middle')
notes(s, 282, ['사용자 정의 bridge를 만들어 둘을 같이 붙여야 이름으로 서로를 찾는다'])
open('docker-isolated.svg','w',encoding='utf-8').write(s.render())

# ── 6. 갈라진 클러스터
s = Svg(CW, 296)
head(s, '노드가 안 붙은 게 아니라 클러스터가 두 개가 됐다', '설치 스크립트에 K3S_URL을 넘기지 않으면 각자 마스터가 된다')
for i, (host, cmd) in enumerate([
        ('cnp-s01-k3s-srv-kr1-svr', 'curl -sfL get.k3s.io | sh -'),
        ('cnp-s01-k3s-agt-kr2-svr', 'curl -sfL get.k3s.io | sh -')]):
    cx = M + 176 + i*352
    s.add(f'<circle cx="{cx}" cy="158" r="52" fill="none" stroke="{INK}" stroke-width="1.7"/>')
    s.img('server', cx-14, 138, 28)
    s.text(cx, 186, 'k3s.service', size=9, fill=ACC, mono=True, anchor='middle')
    s.text(cx, 228, host, size=9.5, fill=SOFT, mono=True, anchor='middle')
    s.text(cx, 246, cmd, size=8.5, fill=MUTED, mono=True, anchor='middle')
    s.text(cx, 90, f'클러스터 {i+1}', size=10, weight='700', fill=MUTED, anchor='middle')
s.path(f'M {M+240} 158 L {M+464} 158', dash='4 4', marker=False)
s.cross(CW/2, 158, 9)
notes(s, 276, ['에러는 나지 않는다. 설치는 성공했고 결과가 원한 것과 달랐을 뿐이다'])
open('k3s-split.svg','w',encoding='utf-8').write(s.render())

print('6장 생성')
