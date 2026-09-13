"""네이버 클라우드 "서비스 아이콘 및 활용예시" PPTX에서 스튜디오 아이콘을 뽑는다.

PPTX는 zip이다. 슬라이드 XML에서 그림(<p:pic>)과 글상자(<p:sp>)의 좌표를 읽고,
그림 바로 아래에 있는 글상자를 그 아이콘의 이름으로, 슬라이드 맨 위 글상자를
카테고리로 삼는다. 뒤쪽의 활용예시 슬라이드는 같은 아이콘이 반복되므로 뺀다.

    python3 docs/studio/build_icons.py "<PPTX 경로>"
"""
import hashlib, json, math, os, re, shutil, sys, zipfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT_DIR = os.path.join(ROOT, 'public', 'studio', 'icons')
OUT_TS = os.path.join(ROOT, 'src', 'components', 'studio', 'icons.ts')
SKIP = {'Auto Scaling을 활용한가용성 확보', 'E-Commerce, Retail (소규모)',
        'Hybrid Cloud Hosting', 'IoT Analysis Platform'}
RENAME = {'Others (add)': 'Others'}
BOX = re.compile(r'<a:off x="(-?\d+)" y="(-?\d+)"/><a:ext cx="(\d+)" cy="(\d+)"/>')


def unescape(s):
    return s.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').strip()


def extract(pptx):
    z = zipfile.ZipFile(pptx)
    slides = sorted((n for n in z.namelist() if re.match(r'ppt/slides/slide\d+\.xml$', n)),
                    key=lambda n: int(re.findall(r'\d+', n)[0]))
    found = []
    for name in slides:
        num = int(re.findall(r'\d+', name)[0])
        xml = z.read(name).decode('utf-8')
        rels = z.read(f'ppt/slides/_rels/slide{num}.xml.rels').decode('utf-8')
        media = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="\.\./media/([^"]+)"', rels))
        pics, texts = [], []
        for m in re.finditer(r'<p:pic>.*?</p:pic>', xml, re.S):
            embed, box = re.search(r'r:embed="(rId\d+)"', m.group(0)), BOX.search(m.group(0))
            if embed and box and embed.group(1) in media:
                pics.append((*map(int, box.groups()), media[embed.group(1)]))
        for m in re.finditer(r'<p:sp>.*?</p:sp>', xml, re.S):
            box = BOX.search(m.group(0))
            text = ''.join(re.findall(r'<a:t>([^<]*)</a:t>', m.group(0))).strip()
            if box and text:
                texts.append((*map(int, box.groups()), text))
        if not pics or not texts:
            continue
        title = min(texts, key=lambda t: t[1])[4]
        for x, y, cx, cy, file in pics:
            best, dist = None, float('inf')
            for tx, ty, tcx, tcy, text in texts:
                if text == title or ty + tcy / 2 < y + cy / 2:
                    continue
                d = math.hypot(tx + tcx / 2 - (x + cx / 2), ty - (y + cy))
                if d < dist:
                    best, dist = text, d
            if best and dist < max(cx, cy) * 3:
                found.append((unescape(title), unescape(best), file))
    return z, found


def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-') or 'icon'


def main(pptx):
    z, found = extract(pptx)
    os.makedirs(OUT_DIR, exist_ok=True)
    for f in os.listdir(OUT_DIR):
        os.remove(os.path.join(OUT_DIR, f))
    seen_media, used, icons, total = set(), set(), [], 0
    for category, name, file in found:
        category = RENAME.get(category, category)
        ext = os.path.splitext(file)[1].lower()
        if category in SKIP or ext not in ('.png', '.svg'):
            continue
        data = z.read('ppt/media/' + file)
        digest = hashlib.sha1(data).hexdigest()
        if digest in seen_media:
            continue
        seen_media.add(digest)
        name = re.sub(r'\s+', ' ', name).replace('K ubernetes', 'Kubernetes')
        base = slug = slugify(name)
        n = 2
        while slug in used:
            slug, n = f'{base}-{n}', n + 1
        used.add(slug)
        with open(os.path.join(OUT_DIR, slug + ext), 'wb') as fh:
            fh.write(data)
        total += len(data)
        icons.append({'id': slug, 'name': name, 'category': category, 'src': f'/studio/icons/{slug}{ext}'})
    # PPTX 서비스 카탈로그에는 없지만 구성도에 꼭 필요한 기본 아이콘을 옛 아이콘 폴더에서 보충한다.
    extra_dirs = [os.environ.get('NCP_ICONS', ''), '~/Desktop/ncp-icons', '~/Downloads/ncp-icons']
    extra_dir = next((d for d in map(os.path.expanduser, extra_dirs) if d and os.path.isdir(d)), None)
    for slug, name, category in [('internet', 'Internet', 'Others')]:
        src = os.path.join(extra_dir, slug + '.png') if extra_dir else ''
        if slug in used or not os.path.exists(src):
            continue
        shutil.copyfile(src, os.path.join(OUT_DIR, slug + '.png'))
        used.add(slug)
        total += os.path.getsize(src)
        icons.append({'id': slug, 'name': name, 'category': category, 'src': f'/studio/icons/{slug}.png'})
    categories = list(dict.fromkeys(i['category'] for i in icons))
    ts = (
        '// 네이버 클라우드 "서비스 아이콘 및 활용예시" PPTX에서 뽑은 아이콘 목록.\n'
        '// 직접 고치지 말고 docs/studio/build_icons.py로 다시 만든다.\n\n'
        'export type StudioIcon = { id: string; name: string; category: string; src: string };\n\n'
        f'export const ICONS: readonly StudioIcon[] = {json.dumps(icons, ensure_ascii=False, indent=2)};\n\n'
        f'export const ICON_CATEGORIES: readonly string[] = {json.dumps(categories, ensure_ascii=False, indent=2)};\n\n'
        'const BY_ID = new Map(ICONS.map((icon) => [icon.id, icon]));\n\n'
        'export const getIcon = (id: string): StudioIcon | undefined => BY_ID.get(id);\n\n'
        '/** 이름으로 아이콘을 찾는다. 같은 이름을 먼저, 없으면 이름에 포함된 것을 고른다. 없으면 빈 문자열. */\n'
        'export function findIconId(query: string): string {\n'
        '  const q = query.toLowerCase();\n'
        '  const exact = ICONS.find((icon) => icon.name.toLowerCase() === q);\n'
        '  return (exact ?? ICONS.find((icon) => icon.name.toLowerCase().includes(q)))?.id ?? \'\';\n'
        '}\n'
    )
    os.makedirs(os.path.dirname(OUT_TS), exist_ok=True)
    with open(OUT_TS, 'w', encoding='utf-8') as fh:
        fh.write(ts)
    print(f'아이콘 {len(icons)}개 · 카테고리 {len(categories)}개 · {total/1024:.0f}KB')
    print('카테고리:', ', '.join(categories))


if __name__ == '__main__':
    main(sys.argv[1])
