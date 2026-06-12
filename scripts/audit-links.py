# Audita todos os links do site gerado em dist/ (internos e externos).
# Uso: python3 scripts/audit-links.py
import os, re, glob
from collections import defaultdict

dist = 'dist'
hrefs = defaultdict(set)
for f in glob.glob(dist + '/**/*.html', recursive=True):
    page = f.replace(os.sep, '/').replace('dist', '').replace('/index.html', '/') or '/'
    html = open(f, encoding='utf-8', errors='ignore').read()
    for m in re.finditer(r'(?:href|src)="([^"]+)"', html):
        u = m.group(1)
        if u.startswith(('#', 'data:', 'mailto:', 'tel:')):
            continue
        hrefs[u].add(page)

internal, external, anchors = [], [], []
for u in sorted(hrefs):
    if u.startswith('http'):
        external.append(u)
    elif u.startswith('/'):
        if '#' in u:
            anchors.append(u)
        internal.append(u.split('#')[0].split('?')[0])

missing = []
for u in sorted(set(internal)):
    if not u or u == '/':
        continue
    p = u.rstrip('/')
    candidates = ['dist' + p, 'dist' + p + '/index.html', 'dist' + p + '.html']
    if not any(os.path.exists(c) for c in candidates):
        missing.append(u)

print("=== LINKS INTERNOS QUEBRADOS ===")
for u in missing:
    pages = ', '.join(sorted(hrefs.get(u, hrefs.get(u + '/', set())))[:3]) or '?'
    print("  %s    <- linkado em: %s" % (u, pages))
if not missing:
    print("  (nenhum!)")

ext_unique = sorted({u for u in external if 'fonts.g' not in u and 'unsplash' not in u})
print("\n=== EXTERNOS UNICOS (%d, sem fontes/unsplash) ===" % len(ext_unique))
for u in ext_unique:
    print(' ', u)

print("\n=== ANCORAS internas ===")
for u in sorted(set(anchors)):
    print(' ', u)

uns = sorted({u for u in external if 'unsplash' in u})
print("\n=== UNSPLASH: %d imagens placeholder em uso ===" % len(uns))

# href="#" (links mortos)
dead = defaultdict(set)
for f in glob.glob(dist + '/**/*.html', recursive=True):
    page = f.replace(os.sep, '/').replace('dist', '').replace('/index.html', '/') or '/'
    html = open(f, encoding='utf-8', errors='ignore').read()
    if re.search(r'href="#"', html):
        dead[page] = len(re.findall(r'href="#"', html))
print("\n=== href=\"#\" (botoes sem destino) ===")
for p, n in sorted(dead.items()):
    print("  %s  (%d)" % (p, n))
if not dead:
    print("  (nenhum)")
