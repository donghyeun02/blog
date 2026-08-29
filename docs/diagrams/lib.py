import base64, os, html

ICONS = os.path.expanduser('~/Downloads/ncp-icons')
_cache = {}

def icon_uri(name):
    if name not in _cache:
        with open(os.path.join(ICONS, f'{name}.png'), 'rb') as f:
            _cache[name] = 'data:image/png;base64,' + base64.b64encode(f.read()).decode()
    return _cache[name]

INK   = '#1D1D1F'
SOFT  = '#6E6E73'
MUTED = '#AEAEB2'
LINE  = '#D2D2D7'
ACC   = '#0E7490'
BG    = '#FAFAFA'
SURF  = '#F2F2F7'

FS = "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
FM = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

def esc(s): return html.escape(str(s), quote=True)

class Svg:
    def __init__(self, w, h):
        self.w, self.h, self.p = w, h, []
    def add(self, s): self.p.append(s); return self
    def text(self, x, y, s, size=13, fill=INK, weight='400', mono=False, anchor='start', op=1):
        f = FM if mono else FS
        self.add(f'<text x="{x}" y="{y}" font-family="{f}" font-size="{size}" '
                 f'fill="{fill}" font-weight="{weight}" text-anchor="{anchor}" '
                 f'opacity="{op}" dominant-baseline="middle">{esc(s)}</text>')
    def rect(self, x, y, w, h, stroke=INK, sw=1.5, fill='none', dash=None, r=0):
        d = f' stroke-dasharray="{dash}"' if dash else ''
        self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" '
                 f'stroke="{stroke}" stroke-width="{sw}"{d}/>')
    def img(self, name, x, y, size=28):
        self.add(f'<image href="{icon_uri(name)}" x="{x}" y="{y}" width="{size}" height="{size}"/>')
    def path(self, d, stroke=INK, sw=1.5, dash=None, marker=True, fill='none'):
        ds = f' stroke-dasharray="{dash}"' if dash else ''
        mk = ' marker-end="url(#ah)"' if marker else ''
        self.add(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{ds}{mk} '
                 f'stroke-linecap="round" stroke-linejoin="round"/>')
    def line_label(self, x, y, s, size=11, bg=BG):
        w = len(s) * (size * 0.62) + 10
        self.add(f'<rect x="{x-w/2}" y="{y-9}" width="{w}" height="18" fill="{bg}" stroke="none"/>')
        self.text(x, y, s, size=size, fill=SOFT, mono=True, anchor='middle')
    def cross(self, x, y, s=9):
        for dx, dy in ((-1,-1),(1,-1)):
            self.add(f'<line x1="{x-s*dx*0+ (-s if dx<0 else s)*-1}" y1="{y-s}" x2="0" y2="0" stroke="none"/>')
        self.add(f'<line x1="{x-s}" y1="{y-s}" x2="{x+s}" y2="{y+s}" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
        self.add(f'<line x1="{x+s}" y1="{y-s}" x2="{x-s}" y2="{y+s}" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
    def render(self):
        return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" '
                f'viewBox="0 0 {self.w} {self.h}">'
                f'<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" '
                f'markerHeight="7" orient="auto-start-reverse">'
                f'<path d="M 0 0 L 10 5 L 0 10 z" fill="{INK}"/></marker></defs>'
                f'<rect width="{self.w}" height="{self.h}" fill="{BG}"/>'
                + ''.join(self.p) + '</svg>')

def titled(s, title, subtitle):
    s.text(40, 44, title, size=25, weight='700')
    s.text(40, 74, subtitle, size=13, fill=SOFT)

def footnotes(s, y, notes):
    for i, n in enumerate(notes):
        s.text(40, y + i*20, '— ' + n, size=12, fill=SOFT)
