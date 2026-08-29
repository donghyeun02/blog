from ncpstyle import *

# ── 1. IGW와 NAT의 방향 차이
s = canvas(320)
title(s, '방향', 'Internet Gateway와 NAT Gateway')
PW = (CONTENT-24)/2
for i, (nm, sub_l, both) in enumerate([
        ('Internet Gateway', 'Public Subnet의 인터넷 경로', True),
        ('NAT Gateway', 'Private 서버가 먼저 시작한 연결만', False)]):
    x = M + i*(PW+24)
    group(s, x, 86, PW, 190, f'{nm} — {sub_l}')
    node(s, x+72, 148, 'internet', '인터넷', size=32)
    if not both:
        node(s, x+PW/2, 148, 'nat-gateway', 'NAT', size=30)
    node(s, x+PW-72, 148, 'server', '사설 서버', size=32)
    y1, y2 = 200, 226
    if both:
        arrow(s, f'M {x+100} {y1} L {x+PW-100} {y1}')
        arrow(s, f'M {x+PW-100} {y2} L {x+100} {y2}')
        label(s, x+PW/2, y2+22, '양쪽 다 열린다', fill=BLUE)
    else:
        arrow(s, f'M {x+100} {y1} L {x+PW-100} {y1}', dash='4 4')
        cross(s, x+PW/2, y1, 6)
        arrow(s, f'M {x+PW-100} {y2} L {x+100} {y2}')
        label(s, x+PW/2, y2+22, '나가는 방향만 열린다', fill=BLUE)
notes(s, 300, ['NAT에 공인 IP가 붙어 있어도 그 주소로 사설 서버에 들어올 수는 없다'])
open('net-direction.svg','w',encoding='utf-8').write(s.render())

# ── 2. 네 개의 관문
LAY = [('Route Table','어디로 보낼지 정한다','목적지 경로 없음'),
       ('NACL','Subnet 경계에서 검사','반환 규칙 없음'),
       ('ACG','서버 NIC에서 검사','포트 미허용'),
       ('Service','그 포트를 듣고 있는가','프로세스 미기동')]
s = canvas(88 + len(LAY)*62 + 60)
title(s, '관문', '어디서 막혀도 증상은 같다')
for i,(nm,desc,fail) in enumerate(LAY):
    y = 86 + i*62
    group(s, M, y, 400, 48)
    s.text(M+16, y+26, str(i+1), size=11, weight='700', fill=BLUE, mono=True)
    s.text(M+38, y+19, nm, size=11, weight='700', fill=INK)
    s.text(M+38, y+35, desc, size=9, fill=SOFT, mono=True)
    s.text(M+424, y+19, fail, size=9.5, fill=MUTED, mono=True)
    s.text(M+424, y+35, '→  요청이 멈춘다', size=9.5, fill=BLUE, mono=True)
    if i < len(LAY)-1:
        plain(s, f'M {M+200} {y+48} L {M+200} {y+62}')
notes(s, 88+len(LAY)*62+16, ['넷 중 하나만 비어도 통신은 안 되는데 증상은 넷 다 같다'])
open('net-layers.svg','w',encoding='utf-8').write(s.render())

# ── 3. 멈춘 SSH
s = canvas(300)
title(s, '멈춘 SSH', '요청은 도착했고 응답이 버려졌다')
s.rect(M, 86, CONTENT, 84, stroke='#1D1D1F', sw=1.2, fill='#1D1D1F')
s.text(M+18, 110, 'ubuntu@cnp-s01-ops-mgmt-svr:~$ ssh 10.60.48.6', size=10, fill='#E8EAED', mono=True)
s.text(M+18, 146, '_', size=10, fill='#E8EAED', mono=True)
s.text(CW-M-18, 146, '응답 없음 · 에러도 없음', size=9, fill='#9AA0A6', mono=True, anchor='end')
node_side(s, M+50, 218, 'server', 'ops-mgmt')
node_side(s, CW-M-190, 218, 'server', 'wld-mon')
arrow(s, f'M {M+190} 206 L {CW-M-212} 206')
label(s, CW/2, 194, '요청 TCP 22 — 도착')
arrow(s, f'M {CW-M-212} 234 L {M+190} 234', dash='4 4')
cross(s, CW/2, 234, 6)
label(s, CW/2, 258, '응답 — NACL 아웃바운드 규칙이 없어 버려진다', fill=MUTED)
notes(s, 284, ['거절이 아니라 무응답이라 에러가 안 난다'])
open('ssh-hang.svg','w',encoding='utf-8').write(s.render())

# ── 4. 수집 경로
ST = [('Peering Route','상대 CIDR 경로'),('Ops NACL','OUT 9100'),('Ops ACG','OUT 9100'),
      ('Wld NACL','IN 9100'),('Wld ACG','IN 9100'),('Node Exporter','LISTEN 9100')]
s = canvas(96 + len(ST)*50 + 56)
title(s, '수집 경로', 'Prometheus는 Pull이라 결국 방화벽 이야기가 된다')
node_side(s, M+34, 112, 'server', 'Ops', 'Prometheus', size=30)
for i,(nm,det) in enumerate(ST):
    y = 92 + i*50
    group(s, M+200, y, 440, 40)
    s.text(M+216, y+16, nm, size=10.5, weight='600', fill=INK)
    s.text(M+216, y+31, det, size=9, fill=SOFT, mono=True)
    s.text(M+624, y+22, '☐', size=13, fill=MUTED, anchor='end')
    if i < len(ST)-1:
        plain(s, f'M {M+420} {y+40} L {M+420} {y+50}')
arrow(s, f'M {M+150} 112 L {M+200} 112')
notes(s, 96+len(ST)*50+12, ['여섯 중 하나만 비어도 그래프가 안 뜬다. 증상은 "데이터 없음" 하나다'])
open('scrape-path.svg','w',encoding='utf-8').write(s.render())

# ── 5. 같은 호스트인데 못 찾는다
s = canvas(300)
title(s, '격리', '붙은 네트워크가 다르면 호스트가 같아도 안 통한다')
group(s, M, 86, CONTENT, 168, 'Docker 호스트 한 대')
BW2 = (CONTENT-80)/2
for i,(cn,pt) in enumerate([('web','nginx 80'),('api','node 3000')]):
    x = M+20 + i*(BW2+40)
    group(s, x, 112, BW2, 126, 'bridge (기본)', dash='4 4', stroke=MUTED)
    node(s, x+BW2/2, 168, 'server', cn, pt, size=32)
arrow(s, f'M {M+20+BW2} 168 L {M+20+BW2+40} 168', dash='4 4')
cross(s, M+20+BW2+20, 168, 7)
notes(s, 274, ['사용자 정의 bridge를 만들어 둘을 같이 붙여야 이름으로 서로를 찾는다'])
open('docker-isolated.svg','w',encoding='utf-8').write(s.render())

# ── 6. 갈라진 클러스터
s = canvas(300)
title(s, '갈라진 클러스터', 'K3S_URL을 안 넘기면 각자 마스터가 된다')
BW3 = (CONTENT-40)/2
for i,(host,) in enumerate([('cnp-s01-k3s-srv-kr1-svr',),('cnp-s01-k3s-agt-kr2-svr',)]):
    x = M + i*(BW3+40)
    group(s, x, 86, BW3, 150, f'클러스터 {i+1}', dash='5 4', stroke=BLUED, lc=BLUED)
    node(s, x+BW3/2, 146, 'server', 'k3s.service', host, size=34)
plain(s, f'M {M+BW3} 146 L {M+BW3+40} 146', dash='4 4')
cross(s, M+BW3+20, 146, 8)
notes(s, 262, ['에러는 나지 않는다. 설치는 성공했고 결과가 원한 것과 달랐을 뿐이다'])
open('k3s-split.svg','w',encoding='utf-8').write(s.render())
print('extras 6장')
