from ncpstyle import *

LAYERS = [
    ('K3s Pod',          '4일차', 'Pod CIDR 10.42.0.0/16 · Service 10.43.0.0/16'),
    ('Docker Container', '3일차', 'bridge · Overlay UDP 4789'),
    ('Server',           '2일차', 'ACG · 서버 NIC에서 검사'),
    ('Subnet',           '1일차', 'NACL · Subnet 경계에서 검사'),
    ('VPC',              '1일차', 'Route Table · IGW · NAT · Peering'),
]

def stack(symptom):
    s = canvas(88 + len(LAYERS)*58 + 56)
    if symptom:
        title(s, '증상', '어느 층에서 막혀도 요청이 그냥 멈춘다')
    else:
        title(s, '층', '나흘 동안 쌓아 올린 것')
    BW = 400 if symptom else CONTENT
    for i, (nm, day, det) in enumerate(LAYERS):
        y = 86 + i*58
        group(s, M, y, BW, 46)
        s.text(M+16, y+18, nm, size=11, weight='700', fill=INK)
        s.text(M+16, y+34, det, size=9, fill=SOFT, mono=True)
        s.text(M+BW-14, y+18, day, size=9, fill=BLUE, mono=True, anchor='end')
        if symptom:
            s.text(M+BW+24, y+18, '요청이 멈춘다', size=9.5, fill=MUTED)
            s.text(M+BW+24, y+34, '에러 메시지 없음', size=9, fill=MUTED, mono=True)
    y2 = 88 + len(LAYERS)*58
    if symptom:
        notes(s, y2+12, ['어느 층이 비었는지는 증상으로 구분되지 않는다'])
    else:
        notes(s, y2+12, ['위로 갈수록 추상적이고 편하다. 아래로 갈수록 구체적이고 귀찮다',
                         '위층은 아래층 위에 얹혀 있을 뿐이지 아래층을 대신하지 않는다'])
    return s

open('stack.svg','w',encoding='utf-8').write(stack(False).render())
open('stack-symptom.svg','w',encoding='utf-8').write(stack(True).render())
print('hub 2장')
