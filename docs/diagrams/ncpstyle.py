from lib import Svg, icon_uri, esc, FS, FM
CW, M = 752, 24
CONTENT = CW - M*2

# 레퍼런스 아키텍처 팔레트
INK   = '#1D1D1F'
SOFT  = '#5A5F66'
MUTED = '#9AA0A6'
EDGE  = '#C9CDD2'      # 그룹 테두리
FILLG = '#EEF1F4'      # 서버 배열 바탕
BLUE  = '#1E88E5'      # 존 · 사용자
BLUED = '#4A9BE8'      # VPC 점선
BG    = '#FFFFFF'

def canvas(h):
    return Svg(CW, h)

def title(s, t, sub):
    s.text(M, 30, t, size=17, weight='700', fill=INK)
    s.text(M, 52, sub, size=11, fill=SOFT)
    s.top_cut = 66

# ── 아이콘 + 아래 라벨. 개별 테두리를 두르지 않는다.
def node(s, cx, cy, icon, label, sub=None, size=38):
    s.img(icon, cx-size/2, cy-size/2, size)
    s.text(cx, cy+size/2+14, label, size=10.5, weight='600', fill=INK, anchor='middle')
    if sub:
        s.text(cx, cy+size/2+29, sub, size=9, fill=MUTED, mono=True, anchor='middle')

# ── 그룹 상자 : 얇은 테두리와 좌상단 라벨
def group(s, x, y, w, h, label=None, dash=None, stroke=EDGE, sw=1.1, fill='none', lc=None):
    s.rect(x, y, w, h, stroke=stroke, sw=sw, fill=fill, dash=dash)
    if label:
        s.text(x+12, y+16, label, size=10, weight='700', fill=lc or SOFT)

def vpc(s, x, y, w, h, label):
    group(s, x, y, w, h, dash='5 4', stroke=BLUED, sw=1.4)
    s.text(x+12, y-8, label, size=10.5, weight='700', fill=BLUED, mono=True)

def zone(s, x, y, w, h, label, right=False):
    s.rect(x, y, w, h, stroke='#8FC0EA', sw=1.1, fill='#F7FBFF')
    tx = x+w-12 if right else x+12
    s.text(tx, y+16, label, size=10, weight='700', fill=BLUE,
           anchor='end' if right else 'start')

# ── 서버 배열 : 회색 셰브론 안에 서버 아이콘과 ···
def array(s, x, y, w, h, n=2, icon='server', label=None, dots=True):
    t = 16
    s.add(f'<path d="M {x} {y+h/2} L {x+t} {y} L {x+w-t} {y} L {x+w} {y+h/2} '
          f'L {x+w-t} {y+h} L {x+t} {y+h} Z" fill="{FILLG}" stroke="none"/>')
    slots = n + (1 if dots else 0)
    step = (w - t*2) / slots
    cx = x + t + step/2
    for i in range(n):
        if dots and i == n//2:
            s.text(cx, y+h/2, '· · ·', size=13, fill=SOFT, anchor='middle'); cx += step
        s.img(icon, cx-14, y+h/2-14, 28); cx += step
    if label:
        s.text(x+w/2, y+h+16, label, size=10.5, weight='600', fill=INK, anchor='middle')

def arrow(s, d, dash=None, sw=1.1):
    s.path(d, stroke=INK, sw=sw, dash=dash)

def plain(s, d, dash=None, sw=1.1):
    s.path(d, stroke=INK, sw=sw, dash=dash, marker=False)

def user(s, cx, cy, label='학습자 PC'):
    s.add(f'<circle cx="{cx}" cy="{cy}" r="20" fill="{BLUE}"/>')
    s.add(f'<circle cx="{cx}" cy="{cy-5}" r="6" fill="#FFF"/>')
    s.add(f'<path d="M {cx-10} {cy+13} a 10 9 0 0 1 20 0 Z" fill="#FFF"/>')
    s.text(cx, cy+36, label, size=10.5, weight='600', fill=INK, anchor='middle')

def cross(s, x, y, r=7):
    for a, b in (((-r,-r),(r,r)), ((r,-r),(-r,r))):
        s.add(f'<line x1="{x+a[0]}" y1="{y+a[1]}" x2="{x+b[0]}" y2="{y+b[1]}" '
              f'stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')

def label(s, x, y, t, size=9.5, fill=None, mono=True, anchor='middle'):
    s.text(x, y, t, size=size, fill=fill or SOFT, mono=mono, anchor=anchor)

def notes(s, y, items):
    for i, n in enumerate(items):
        s.text(M, y+i*17, '· ' + n, size=9.5, fill=SOFT)
    s.bot_cut = y - 14

# 라벨을 아이콘 오른쪽에 붙이는 변형. 위아래로 선이 지나갈 때 쓴다.
def node_side(s, cx, cy, icon, label, sub=None, size=38):
    s.img(icon, cx-size/2, cy-size/2, size)
    s.text(cx+size/2+10, cy-3 if sub else cy, label, size=10.5, weight='600', fill=INK)
    if sub:
        s.text(cx+size/2+10, cy+12, sub, size=9, fill=MUTED, mono=True)
