from lib import *
from narrow import *

# 나흘 동안 쌓아 올린 층 — 위로 갈수록 추상적이고, 막히면 증상은 다 같다
LAYERS = [
    ('K3s Pod',          '4일차', 'Pod CIDR 10.42.0.0/16 · Service 10.43.0.0/16'),
    ('Docker Container', '3일차', 'bridge · Overlay UDP 4789'),
    ('Server',           '2일차', 'ACG · 서버 NIC에서 검사'),
    ('Subnet',           '1일차', 'NACL · Subnet 경계에서 검사'),
    ('VPC',              '1일차', 'Route Table · IGW · NAT · Peering'),
]

def stack(show_symptom):
    H = 150 + len(LAYERS)*66 + (86 if show_symptom else 56)
    s = Svg(CW, H)
    if show_symptom:
        head(s, '어느 층에서 막혀도 증상은 하나다', '요청이 그냥 멈춘다. 그래서 층을 알고 있어야 한다')
    else:
        head(s, '나흘 동안 쌓아 올린 층', '위로 갈수록 편해지고, 아래층은 사라지지 않는다')

    BW2 = 420 if show_symptom else CONTENT
    for i, (nm, day, det) in enumerate(LAYERS):
        y = 100 + i*66
        s.rect(M, y, BW2, 56, sw=1.7)
        s.text(M+16, y+22, nm, size=11.5, weight='700')
        s.text(M+16, y+39, det, size=9, fill=SOFT, mono=True)
        s.text(M+BW2-14, y+22, day, size=9, fill=ACC, mono=True, anchor='end')
        if show_symptom:
            s.text(M+BW2+22, y+22, '요청이 멈춘다', size=10, fill=MUTED)
            s.text(M+BW2+22, y+39, '에러 메시지 없음', size=9, fill=MUTED, mono=True)
    # 위로 갈수록 추상 / 아래로 갈수록 구체
    y2 = 100 + len(LAYERS)*66 + 8
    if show_symptom:
        notes(s, y2+8, ['어느 층이 비었는지는 증상으로 구분되지 않는다. 층을 알고 하나씩 짚어야 한다'])
    else:
        notes(s, y2+8, ['위로 갈수록 추상적이고 편하다. 아래로 갈수록 구체적이고 귀찮다',
                        '위층은 아래층 위에 얹혀 있을 뿐이지 아래층을 대신하지 않는다'])
    return s

open('stack.svg','w',encoding='utf-8').write(stack(False).render())
open('stack-symptom.svg','w',encoding='utf-8').write(stack(True).render())
print('2장 생성')
