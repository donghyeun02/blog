from lib import *

CW = 752            # 글 폭
M  = 24             # 좌우 여백
CONTENT = CW - M*2  # 704

def head(s, title, sub):
    s.text(M, 34, title, size=19, weight='700')
    s.text(M, 58, sub, size=11.5, fill=SOFT)

def vpcbox(s, x, y, w, h, name, cidr):
    s.rect(x, y, w, h, sw=2.2)
    s.img('vpc', x+12, y+12, 24)
    s.text(x+44, y+18, name, size=12, weight='700', mono=True)
    s.text(x+44, y+35, cidr, size=10, fill=SOFT, mono=True)

def sub(s, x, y, w, h, kind, name, right=False):
    # 라벨을 한쪽에 몰아 붙인다. 반대쪽을 비워 둬야 세로 선이 지날 자리가 생긴다.
    s.rect(x, y, w, h, stroke=MUTED, sw=1.2, dash='5 4')
    a = 'end' if right else 'start'
    tx = x+w-12 if right else x+12
    ty = y+h-30 if right else y+16
    s.text(tx, ty, kind, size=10.5, weight='600', fill=SOFT, anchor=a)
    s.text(tx, ty+16, name, size=9.5, fill=MUTED, mono=True, anchor=a)

def ghost(s, x, y, w, h, l1, l2):
    s.rect(x, y, w, h, stroke=MUTED, sw=1.2, dash='4 4')
    s.text(x+w/2, y+h/2-9, l1, size=11, fill=MUTED, anchor='middle')
    s.text(x+w/2, y+h/2+9, l2, size=9.5, fill=MUTED, anchor='middle', mono=True)

def srv(s, x, y, w, h, host, lines):
    s.rect(x, y, w, h, sw=1.6)
    s.img('server', x+12, y+10, 24)
    s.text(x+44, y+22, host, size=10.5, weight='600', mono=True)
    for i, l in enumerate(lines):
        s.text(x+14, y+52+i*17, l, size=9.5, fill=SOFT, mono=True)

def notes(s, y, items):
    for i, n in enumerate(items):
        s.text(M, y+i*18, '— ' + n, size=10, fill=SOFT)
