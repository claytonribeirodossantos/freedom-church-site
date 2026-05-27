# 📋 HANDOFF — Site Freedom Church

> **Documento de transferência completo.** Cole isto no início de uma nova conversa com Claude (Code ou app) pra continuar exatamente de onde paramos.

---

## 🎯 PROJETO

Estou construindo o site da **Freedom Church**, uma igreja brasileira em **Kensington, Maryland (EUA)**. Sou voluntário tecnicamente curioso mas **não-programador profissional** — você precisa me guiar passo a passo, sem jargão, com exemplos visuais.

### Contexto da igreja
- **Nome**: Freedom Church (variação: OurFreedomChurch)
- **Endereço**: 5020 Nicholson Court, Kensington, MD 20895, USA
- **Cultos**: Domingos às 10:30 AM
- **Pastores principais**: Adaelton de Souza + Jheini de Souza (casal há mais de 10 anos)
- **Instagram igreja**: [@ourfreedomchurch_md](https://www.instagram.com/ourfreedomchurch_md/)
- **YouTube canal**: [@ourfreedomchurch](https://www.youtube.com/@ourfreedomchurch) (channel ID: `UCmItF2T27GJFT6gFJti_9SA`)
- **Pr Adaelton**: [@adaelton_desouza](https://www.instagram.com/adaelton_desouza/)
- **Pra Jheini**: [@jheinidesouza](https://www.instagram.com/jheinidesouza/)
- **Idiomas**: Português (principal) + Inglês + Espanhol
- **Público**: brasileiros, americanos, latinos — "para todas as nações"
- **Ministérios ativos**: Kids, Jovens, Casais, Mulheres, Homens, Louvor, Células

---

## 🚨 RESTRIÇÕES CRÍTICAS (NÃO QUEBRAR)

### Domínio e email
- Domínio `ourfreedomchurch.com` está registrado na **Turbify** (antiga Yahoo Small Business)
- **Eu (Clayton) tenho acesso ao Turbify** e autorização do pastor pra mexer em DNS
- **PROIBIDO MEXER nos registros MX** (email) — eles estão vinculados a recebimento de ofertas (Zelle, Venmo, etc) do pastor
- MX records atuais: `mx-biz.mail.am0.yahoodns.net` (preferences 20 e 30)
- Snapshot DNS salvo em `site/docs/dns-snapshot-pre.txt`

### Hierarquia
- Pastor (Adaelton de Souza) é o dono do domínio e das contas financeiras
- Decisões grandes (mudar nameservers, alterar email, conectar contas de pagamento) precisam ser confirmadas comigo
- **EU implemento, mas o pastor é o dono**

### Credenciais
- **Nunca peça senhas no chat** — só username/identificadores públicos
- Eu (Clayton) já vazei senha do Gmail uma vez por engano — fui ensinado a trocar e ativar 2FA
- Se eu mandar credencial sem pedir, alerte imediatamente

---

## 💻 STACK TÉCNICA

| Camada | Ferramenta |
|---|---|
| Framework | **Astro 6** (output: static) |
| Estilização | **Tailwind CSS v4** (com `@theme` block, sem `tailwind.config.js`) |
| Hospedagem | **Cloudflare Workers** (NÃO Pages — versão nova Workers Builds) |
| Repositório | **GitHub**: [github.com/claytonribeirodossantos/freedom-church-site](https://github.com/claytonribeirodossantos/freedom-church-site) (público) |
| CMS | **Sveltia CMS** preparado em `/admin` (precisa do GitHub App pra autenticar) |
| Conteúdo dinâmico | **Astro Content Collections** (`src/content/sermons`, `events`, `blog`) |
| Pregações | **YouTube RSS feed** lido em build time + client-side (rss2json + allorigins fallback) |
| Forms | **Web3Forms** (preparado, precisa access key) |
| Doações | **Zelle + Venmo + Cash App** (placeholders, precisam handles reais) |
| i18n | Nativo Astro: PT (default, `/`) + EN (`/en/`) + ES (`/es/`) — slugs PT em todas |
| Fontes | **Fraunces** (display serif) + **Geist** (sans) |
| Cores | Preto `#0A0908` + cream `#FAFAF7` + champagne gold `#C9A961` |

### URL live
**https://freedom-church-site.claytonribeirodossantos.workers.dev**

### Domínio próprio
Ainda não apontado. Plano: subdomínio `preview.ourfreedomchurch.com` quando pastor aprovar. Cloudflare Workers Custom Domains exige migrar DNS pro Cloudflare (Cloudflare detecta e preserva MX). **Não foi feito ainda.**

---

## 📂 ESTRUTURA DO PROJETO

```
C:/Users/ClaytonRibeirodosSan/freedom-church/
├── HANDOFF.md ← este arquivo
├── docs/ (legado, conteúdo movido pra site/docs/)
└── site/                           ← projeto Astro (= git repo root)
    ├── astro.config.mjs            ← i18n PT/EN/ES + sitemap + Tailwind
    ├── wrangler.jsonc              ← NÃO existe (foi tentado e removido)
    ├── package.json                ← deps: astro, tailwindcss, @astrojs/sitemap
    ├── public/
    │   ├── logo.png                ← logo cruz preta em círculo
    │   ├── favicon.svg / favicon.ico
    │   ├── hero/intro.mp4          ← vídeo Pexels worship 4.5MB
    │   ├── pastors/
    │   │   ├── adaelton.jpg        ← AINDA NÃO EXISTE — placeholder ativo
    │   │   └── jheini.jpg          ← AINDA NÃO EXISTE — placeholder ativo
    │   ├── uploads/                ← pra fotos novas (events, gallery, blog, ministries)
    │   └── admin/
    │       └── config.yml          ← Sveltia CMS (compatível Decap)
    ├── src/
    │   ├── pages/
    │   │   ├── index.astro         ← Home PT
    │   │   ├── en/index.astro      ← Home EN
    │   │   ├── es/index.astro      ← Home ES
    │   │   ├── [page].astro        ← PT dynamic (slugs: sobre, cultos, pregacoes...)
    │   │   ├── en/[page].astro     ← EN dynamic
    │   │   ├── es/[page].astro     ← ES dynamic
    │   │   ├── 404.astro           ← Erro custom com versículo
    │   │   └── admin/index.astro   ← Sveltia CMS loader
    │   ├── layouts/
    │   │   └── BaseLayout.astro    ← head, header, footer, scripts globais (live detection, parallax, reveal, tilt)
    │   ├── components/
    │   │   ├── Header.astro        ← Mega menu 4 itens, mobile drawer
    │   │   ├── Footer.astro        ← Cinematic dark, 3 colunas nav
    │   │   ├── LanguageSwitcher.astro ← Click toggle (mobile-friendly)
    │   │   ├── Hero.astro          ← Vídeo MP4 + mouse parallax + Ken Burns + light leaks + particles + marquee
    │   │   ├── Manifesto.astro     ← Mega text editorial + keywords marquee
    │   │   ├── NextService.astro   ← Stats (6 anos, 300+ famílias...)
    │   │   ├── SermonFeature.astro ← Vídeo destacado + 3 últimos (YouTube)
    │   │   ├── AboutPreview.astro  ← 4 pilares numerados
    │   │   ├── PageHero.astro      ← Hero pras páginas internas (mesma vibe Hero)
    │   │   ├── Section.astro       ← Wrapper (bg light/dark/tint)
    │   │   ├── SectionHeader.astro ← eyebrow + title + intro
    │   │   └── pages/              ← um component por página interna
    │   │       ├── AboutPageContent.astro
    │   │       ├── ServicesPageContent.astro
    │   │       ├── SermonsPageContent.astro     ← client-side fetch YouTube
    │   │       ├── EventsPageContent.astro      ← lê Content Collection
    │   │       ├── MinistriesPageContent.astro
    │   │       ├── GivePageContent.astro        ← Zelle+Venmo+CashApp cards
    │   │       ├── NewHerePageContent.astro     ← Manifesto + steps + FAQ
    │   │       ├── PrayerPageContent.astro      ← Web3Forms
    │   │       ├── ContactPageContent.astro     ← Web3Forms
    │   │       ├── LeadershipPageContent.astro  ← Adaelton + Jheini JUNTOS (casal)
    │   │       ├── LivePageContent.astro        ← YouTube embed live_stream
    │   │       ├── KidsPageContent.astro
    │   │       ├── YouthPageContent.astro
    │   │       ├── GalleryPageContent.astro
    │   │       ├── ResourcesPageContent.astro
    │   │       ├── PastoralServicesPageContent.astro
    │   │       ├── NewsletterPageContent.astro
    │   │       ├── PrivacyPageContent.astro
    │   │       └── TermsPageContent.astro
    │   ├── content.config.ts       ← Collections schemas (sermons, events, blog)
    │   ├── content/
    │   │   ├── sermons/*.md        ← 3 exemplos (placeholders — vídeos reais vêm do YouTube)
    │   │   ├── events/*.md         ← 4 exemplos (placeholders, editáveis via /admin)
    │   │   └── blog/               ← vazio
    │   ├── data/
    │   │   └── church.ts           ← FONTE ÚNICA: nome, endereço, pastores, social, giving, web3FormsAccessKey
    │   ├── i18n/
    │   │   ├── ui.ts               ← strings da interface (PT/EN/ES)
    │   │   ├── pages.ts            ← títulos/subtítulos das páginas (PT/EN/ES)
    │   │   ├── utils.ts            ← getLangFromUrl, useTranslations, localizedPath, switchLangPath
    │   │   └── format.ts           ← formatDate, formatMonthDay, pickLocalized
    │   ├── lib/
    │   │   └── youtube.ts          ← Fetch RSS feed do canal (build time)
    │   └── styles/
    │       └── global.css          ← @theme tokens + components + animations
    └── docs/                       ← guias práticos (vão pro GitHub)
        ├── MANUTENCAO-DO-SITE.md   ← 10 seções: postar pregação, ir ao vivo, fotos, eventos, /admin, doações, formulários, domínio, troubleshooting
        ├── COMO-BAIXAR-DO-INSTAGRAM.md ← 4 opções (saveinsta.io recomendado)
        ├── MAPA-DO-SITE.md         ← tabela onde editar cada coisa
        ├── PREVIEW-NO-DOMINIO.md   ← passo-a-passo Cloudflare + Turbify
        ├── resumo-para-o-pastor.md ← documento pra Clayton apresentar
        └── dns-snapshot-pre.txt    ← baseline DNS antes de qualquer mudança
```

---

## ✅ O QUE ESTÁ PRONTO

### Páginas (todas em PT/EN/ES, total ~62 páginas geradas)
- ✅ **Home**: Hero com vídeo + Manifesto + Stats + Sermon Feature + Pilares
- ✅ **Sobre** (/sobre)
- ✅ **Cultos** (/cultos) com mapa Google embed
- ✅ **Pregações** (/pregacoes) lendo YouTube RSS (build + client fallback)
- ✅ **Eventos** (/eventos) lendo Content Collection
- ✅ **Ministérios** (/ministerios) com cards linkando pra Kids/Youth/etc
- ✅ **Contribua** (/contribua) com Zelle/Venmo/CashApp (placeholders)
- ✅ **Sou Novo Aqui** (/sou-novo-aqui) Manifesto + 6 steps + 6 FAQs + CTA WhatsApp
- ✅ **Pedidos de Oração** (/pedidos-de-oracao) form Web3Forms
- ✅ **Contato** (/contato) form Web3Forms
- ✅ **Liderança** (/lideranca) Pastores Adaelton + Jheini JUNTOS (casal)
- ✅ **Live** (/live) YouTube embed live_stream
- ✅ **Freedom Kids** (/kids)
- ✅ **Freedom Youth** (/jovens)
- ✅ **Galeria** (/galeria)
- ✅ **Recursos** (/recursos)
- ✅ **Serviços Pastorais** (/servicos-pastorais)
- ✅ **Newsletter** (/newsletter)
- ✅ **Privacidade** (/privacidade) + **Termos** (/termos)
- ✅ **404 customizada** com versículo

### Features funcionais
- ✅ **Mega menu** 4 itens: Sobre ▾ | Conecte-se ▾ | Ministérios ▾ | Contribua
- ✅ **Mobile**: full-screen drawer + dropdowns nativos (<details>)
- ✅ **Language switcher** com click toggle (funciona em touch)
- ✅ **Live detection** real-time: client-side fetch via CORS proxy (allorigins → corsproxy.io → heurística domingo 10:00-12:30 ET)
- ✅ **YouTube auto-feed**: pregações atualizam sozinhas quando posta no canal
- ✅ **Animações ricas**: mouse parallax multi-camadas, Ken Burns, light leaks animados, partículas douradas, 3D tilt em cards, scroll reveal com blur
- ✅ **SEO**: JSON-LD Church schema, hreflang PT/EN/ES, OG tags, sitemap.xml
- ✅ **Trilingual**: PT default em `/`, EN em `/en/`, ES em `/es/`

### Deploy
- ✅ **Cloudflare Workers** com GitHub auto-deploy (cada push rebuilda em ~2min)
- ✅ **SSL** automático
- ✅ **CDN global** (300+ data centers)
- ✅ **Custo**: $0/mês

### Documentação
- ✅ 5 guias em `site/docs/` cobrindo todos os fluxos de manutenção

---

## ⏳ O QUE ESTÁ PENDENTE

### Setup pelo Clayton (não-código)
- ⏳ **Trocar handles reais** Zelle/Venmo/CashApp em `src/data/church.ts` (placeholders genéricos: `contato@ourfreedomchurch.com`, `@ourfreedomchurch`, `$ourfreedomchurch`)
- ⏳ **Criar Web3Forms account** + colocar access key em `src/data/church.ts` (placeholder: `'REPLACE_WITH_WEB3FORMS_ACCESS_KEY'`)
- ⏳ **Criar GitHub App** pro `/admin` funcionar (Sveltia CMS) — instruções no `docs/MANUTENCAO-DO-SITE.md` seção 6
- ⏳ **Baixar fotos pastores** do Instagram → salvar em `public/pastors/adaelton.jpg` e `jheini.jpg`
- ⏳ **Apontar domínio** (Caminho A: ficar com `.workers.dev` até pastor aprovar / Caminho B: migrar DNS pro Cloudflare quando der)

### Desenvolvimento técnico
- ⏳ **Tasks #9, #10, #16, #27, #28** da minha lista interna (verificar com `TaskList`)
- ⏳ Detecção de live ainda usa CORS proxies de terceiros (funciona mas frágil); idealmente usar Cloudflare Function quando migrar pro adapter @astrojs/cloudflare
- ⏳ Substituir mais fotos Unsplash por fotos reais quando Clayton baixar do Instagram

---

## 🔑 DECISÕES TÉCNICAS IMPORTANTES

### Por que essas escolhas (e o que NÃO foi escolhido)

| Decisão | Por quê | Alternativas descartadas |
|---|---|---|
| **Astro + Cloudflare Workers (estático)** | Performance, zero custo, SSL automático | WordPress no HostGator (tentamos avaliar — pesado, antiquado) |
| **Slugs em PT pra todas linguagens** | Pragmático, fácil de manter | Slugs traduzidos (mais SEO mas mais complexo) |
| **Sveltia CMS (não Decap)** | GitHub auth client-side sem Worker function | Decap CMS (requer servidor OAuth) |
| **YouTube RSS** | Free, sem API key, atualiza sozinho | YouTube Data API (precisa key, cota) |
| **Live via CORS proxy** | Sem precisar Cloudflare Function | API server-side (tentei @astrojs/cloudflare adapter mas quebrou deploy — abandonei) |
| **Vídeo MP4 hospedado em public/** | Confiável, sem dependência externa | Pexels URLs (mostraram bandeira India, criança VR — não confiáveis) |
| **Pastores juntos no Liderança** | São casal | Cards separados (era assim antes) |
| **Menu 4 itens com dropdowns** | Inspirado transformchurch.us, mais clean | 6 itens horizontais (era assim antes) |

### Tentativas que NÃO funcionaram
- **@astrojs/cloudflare adapter**: instalei, quebrou o deploy do Workers Builds. Desinstalei. Hoje site é 100% estático.
- **wrangler.jsonc**: tentei criar, quebrou build. Não existe.
- **Pexels random URLs**: pegaram bandeira da Índia e criança com VR. Hoje uso só URLs confirmadas via `curl -I`.
- **API routes server-side**: não funcionam sem adapter. Tudo é estático + client-side JS.

---

## 👤 SOBRE MIM (Clayton)

- Email: `claytonribeirodossantos@gmail.com`
- GitHub: `claytonribeirodossantos`
- Localização: Brasil (computador) / acessa site nos EUA (igreja)
- Sou **não-programador profissional** — entendo conceitos mas precisa de orientação clara
- **Prefiro decisões visuais** — me mostre screenshots antes de implementar mudanças grandes
- **Quero o site MODERNO** (referência: [transformchurch.us](https://transformchurch.us/), [hillsong.com](https://hillsong.com/), [churchome.org](https://churchome.org/))
- Tenho conta GitHub, Cloudflare, Turbify
- Posso editar arquivos no GitHub pelo navegador do celular
- **Aceito** que algumas coisas precisam config minha (criar GitHub App, Web3Forms account, baixar fotos)
- **NÃO aceito** complicação técnica sem necessidade

---

## 🚀 COMO CONTINUAR EM CHAT NOVO

### Se for Claude Code (no computador):
1. Cole o conteúdo deste arquivo no início da conversa
2. Diga: _"Estou continuando o desenvolvimento do site Freedom Church. Leia o HANDOFF.md em `C:\Users\ClaytonRibeirodosSan\freedom-church\HANDOFF.md` e me confirme que está alinhado. Próxima coisa que quero fazer é: [X]"_

### Se for Claude no celular/app (claude.ai):
1. Cole o conteúdo deste documento no início da conversa
2. Diga: _"Sou voluntário construindo o site da Freedom Church. Tô no celular, sem acesso ao código direto. Preciso de ajuda com [X] — pode me orientar passo a passo? O site está em https://freedom-church-site.claytonribeirodossantos.workers.dev e o código em https://github.com/claytonribeirodossantos/freedom-church-site"_

### URLs essenciais pro novo chat
- **Site live**: https://freedom-church-site.claytonribeirodossantos.workers.dev
- **Repo GitHub**: https://github.com/claytonribeirodossantos/freedom-church-site
- **Cloudflare dashboard**: https://dash.cloudflare.com
- **Histórico de mudanças**: https://github.com/claytonribeirodossantos/freedom-church-site/commits/main
- **Guias salvos**: https://github.com/claytonribeirodossantos/freedom-church-site/tree/main/docs
- **Mapa do site (onde editar)**: https://github.com/claytonribeirodossantos/freedom-church-site/blob/main/docs/MAPA-DO-SITE.md
- **Como manter**: https://github.com/claytonribeirodossantos/freedom-church-site/blob/main/docs/MANUTENCAO-DO-SITE.md

---

## 📊 HISTÓRICO RESUMIDO

Construído em ~50 rounds de iteração. Marcos principais:

1. ✅ Decisão de stack (Astro vs WordPress) — escolhi modern
2. ✅ Setup Astro + Tailwind + i18n
3. ✅ Design system inicial (preto + dourado)
4. ✅ 19 páginas em 3 idiomas (62 páginas total)
5. ✅ Astro Content Collections (sermons, events, blog)
6. ✅ Sveltia CMS preparado
7. ✅ Push pro GitHub + deploy Cloudflare Workers
8. ✅ Redesign cinematográfico (Hero, Manifesto, layouts editoriais)
9. ✅ YouTube RSS automático
10. ✅ Live detection real-time
11. ✅ Mobile responsivo (mega menu, language switcher click)
12. ✅ 4 guias de manutenção
13. ✅ Animações ricas (mouse parallax, 3D tilt, scroll reveal)
14. ✅ Vídeo real no Hero (Pexels worship)
15. ✅ Pastores como casal na Liderança
16. ✅ Menu simplificado (4 itens, estilo transformchurch)

### Bugs corrigidos importantes
- Bandeira da Índia aparecia em /contribua (URL Unsplash errada) → trocada
- Hero mostrava criança com VR (URL Unsplash errada) → trocada por foto worship confirmada → trocada por vídeo
- Mobile menu height: 0 → fix com `style="height: calc(100dvh - 5rem)"`
- Live link "Assistir ao vivo" da Home não funcionava → corrigido
- Header texto invisível em hero escuro → simplificado pra sempre claro
- LanguageSwitcher hover não funcionava em mobile → click toggle
- @astrojs/cloudflare adapter quebrou deploy → revertido pra static

---

## 🔚 ESTADO ATUAL (último commit: `f020cc7`)

- Site **NO AR** em https://freedom-church-site.claytonribeirodossantos.workers.dev
- Build time: ~2.5s
- 62 páginas geradas
- Total deploys: ~30+
- Última feature: Vídeo de adoração Pexels no Hero (4.5MB, 540p)

**Tudo funcionando.** Próxima rodada pode focar em: trocar handles reais, fotos dos pastores, ativar /admin, ou apontar domínio.

---

_Documento gerado em 2026-05-27. Mantenha atualizado conforme o projeto evolui._
