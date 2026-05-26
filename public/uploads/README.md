# 📁 Pasta de Uploads do Site

Aqui ficam as imagens do site. **Não precisa decorar** — basta usar a pasta certa.

## Estrutura

```
uploads/
├── events/      ← Fotos de eventos (conferências, retiros)
├── gallery/     ← Galeria geral (cultos, comunidade)
├── blog/        ← Imagens de posts/devocionais
└── ministries/  ← Imagens dos ministérios (Kids, Youth, etc.)
```

## Não sabe qual pasta usar?

- **Foto de um culto/momento da igreja** → `gallery/`
- **Foto de um evento específico** (retiro, conferência) → `events/`
- **Imagem de capa pra post de blog** → `blog/`
- **Imagem de algum ministério** (Kids, Youth, etc.) → `ministries/`
- **Logo, banner, ou imagem genérica** → `uploads/` (pasta raiz)

## Forma MAIS FÁCIL (recomendado): use o painel /admin

Quando o `/admin` estiver configurado (Sveltia CMS), você:
1. Acessa `ourfreedomchurch.com/admin`
2. Cria/edita um post/evento
3. Clica em "adicionar imagem"
4. Carrega da galeria do seu celular
5. **O painel coloca na pasta certa automaticamente** 🎯

Você não precisa nem saber a estrutura de pastas. O painel cuida.

## Forma manual (pelo GitHub)

1. Acessa github.com/claytonribeirodossantos/freedom-church-site
2. Navega até `site/public/uploads/<pasta-certa>/`
3. Botão **"Add file"** → **"Upload files"** → arrasta e dropa
4. **"Commit changes"** → site atualiza em 2min

## Recomendações técnicas

- **Tamanho**: idealmente abaixo de 500 KB por imagem
- **Formato**: `.jpg` ou `.webp` (não use BMP/TIFF)
- **Nome do arquivo**: sem espaços, sem acentos, tudo minúsculo
  - ✅ `retiro-jovens-2026.jpg`
  - ❌ `Retiro Jovens 2026!.JPG`
- **Dimensões sugeridas**:
  - Foto vertical (pastores, kids): 800×1000px (4:5)
  - Foto horizontal (eventos, galeria): 1920×1080px (16:9)
