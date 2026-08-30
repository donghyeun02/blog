from ncpstyle import *

s = canvas(412)
title(s, 'Label과 Selector', '두 YAML을 잇는 건 글자 하나뿐이다')

BW = (CONTENT-56)/2
for i, (tag, pod_label, ep, ok) in enumerate([
        ('app: market-web',     'app: market-web',     'Pod IP 2개', True),
        ('app: market-web-old', 'app: market-web',     '비어 있음',  False)]):
    x = M + i*(BW+56)
    group(s, x, 86, BW, 276, '맞을 때' if ok else '한 글자가 다를 때',
          lc=BLUE if ok else None)
    # Service
    s.text(x+BW/2, 112, 'Service', size=10.5, weight='700', fill=INK, anchor='middle')
    s.text(x+BW/2, 130, f'selector: {tag}', size=9, fill=SOFT, mono=True, anchor='middle')
    # 검사
    if ok:
        arrow(s, f'M {x+BW/2} 142 L {x+BW/2} 176')
        label(s, x+BW/2+52, 160, '일치', fill=BLUE, anchor='start')
    else:
        arrow(s, f'M {x+BW/2} 142 L {x+BW/2} 176', dash='4 4')
        cross(s, x+BW/2, 159, 7)
    # Pod
    node(s, x+BW/2, 208, 'server', 'Pod ×2', 'Running', size=32)
    s.text(x+BW/2, 274, f'labels: {pod_label}', size=9, fill=SOFT, mono=True, anchor='middle')
    # Endpoints
    s.rect(x+22, 296, BW-44, 46, stroke=INK if ok else MUTED, sw=1.4,
           dash=None if ok else '4 4')
    s.text(x+BW/2, 311, 'Endpoints', size=9.5, weight='600',
           fill=INK if ok else MUTED, anchor='middle')
    s.text(x+BW/2, 328, ep, size=10, weight='700',
           fill=BLUE if ok else MUTED, mono=True, anchor='middle')

notes(s, 386, ['Pod는 두 경우 모두 Running이다. 상태만 봐서는 구분되지 않는다',
               'kubectl get endpoints가 비어 있으면 Pod 문제가 아니라 글자 문제다'])
open('k8s-selector.svg','w',encoding='utf-8').write(s.render())
print('ok')
