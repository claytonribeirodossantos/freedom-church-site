# 📋 HANDOFF — Site Freedom Church (atualizado 2026-07-03)

> **Documento de transferência completo.** Cole isto no início de uma nova conversa com o Claude Code (no computador, pasta `C:\Users\ClaytonRibeirodosSan\freedom-church\site`) para continuar exatamente de onde paramos. Tudo que o assistente anterior sabia está aqui. **Leia inteiro e confirme alinhamento antes de mexer.**

---

## 🎯 PROJETO

Site da **Freedom Church**, igreja brasileira em **Kensington, Maryland (EUA)**. Clayton é voluntário **não-programador** — precisa de orientação passo a passo, sem jargão, decisões visuais (mostrar screenshot/preview antes de mudanças grandes). Fala português.

- **Endereço:** 5020 Nicholson Court, Kensington, MD 20895, USA
- **Pastores:** Adaelton de Souza (Pastor Principal) + Jheini (Jheinifer) de Souza (casal). Filhos: Nathan, Noah, Ana Luiza. Ordenados pelo CFNI em 2025. Igreja fundada em 2021.
- **Idiomas:** PT (principal, `/`) + EN (`/en/`) + ES (`/es/`). Site 100% trilíngue — **toda mudança de texto precisa dos 3 idiomas**.
- **Instagram:** [@ourfreedomchurch_md](https://www.instagram.com/ourfreedomchurch_md/) · **Facebook:** [ourfreedomchurchMD](https://www.facebook.com/ourfreedomchurchMD) · **YouTube:** canal ID `UCmItF2T27GJFT6gFJti_9SA` ([@ourfreedomchurch](https://www.youtube.com/@ourfreedomchurch))
- **Church Center (Planning Center):** `ourfreedomchurch.churchcenter.com` — onde a igreja gerencia eventos e grupos.

---

## 🔗 URLS ESSENCIAIS

| O quê | URL |
|---|---|
| **Site de TESTES (dev)** — veja mudanças aqui | https://freedom-church-site.claytonribeirodossantos.workers.dev |
| **Domínio oficial (público vê "Em breve")** | https://ourfreedomchurch.com |
| **Ver site real no domínio (bypass manutenção)** | https://ourfreedomchurch.com/?preview |
| **Repositório GitHub** | https://github.com/claytonribeirodossantos/freedom-church-site |
| **Cloudflare** | https://dash.cloudflare.com (account `a883a62138a3227585f3722468d05f07`) |
| **Painel de edição (CMS, ainda SEM login)** | /admin (Sveltia CMS — ver seção CMS) |

**Último commit publicado:** `8e622c9` (tudo no `main` está publicado no site de testes).

---

## 🚨 RESTRIÇÕES CRÍTICAS (NÃO QUEBRAR)

1. **EMAIL / MX — sagrado.** MX aponta pro **Yahoo** (`mx-biz.mail.am0.yahoodns.net`, pref 20/30). **NUNCA apagar/alterar** registros de email no DNS. Snapshot em `docs/dns-snapshot-pre.txt`.
2. **Autorização do Pastor:** Pr Adaelton é dono do domínio/contas. Clayton **implementa**, mas decisões de **domínio/email/pagamento/contas/acesso precisam do OK do pastor**.
3. **CREDENCIAIS:** **NUNCA pedir senha** de nada. Só identificadores públicos (handle, @, chave de API que Clayton cola sozinho no Cloudflare). Sempre avisar "só o usuário/identificador, NUNCA a senha".
4. **Manutenção ainda LIGADA:** `SITE.maintenance = true` em `src/config.ts`. O público em `ourfreedomchurch.com` vê a página "Em breve" (`/em-breve`). O time testa pelo link `.workers.dev` (nunca bloqueado). **Para LANÇAR:** trocar `maintenance: false`, commit, push.

---

## 💻 STACK + FLUXO DE DEPLOY

- **Astro 6** (output **static**, 100% estático) + **Tailwind v4** (`@theme` em `src/styles/global.css`, sem tailwind.config.js).
- Hospedagem **Cloudflare Workers** (Workers Builds, auto-deploy do GitHub). `wrangler.jsonc` força assets estáticos (**NÃO** adicionar adapter `@astrojs/cloudflare` — cria KV e quebra; **NÃO** adicionar React/Three/shadcn).
- **Fontes (Google Fonts, `<link>` no `BaseLayout.astro`):** Fraunces (serif, `--font-display`/títulos) + Geist (sans, `--font-sans`/corpo) + **Montserrat** (`--font-brand`, usada no wordmark "Freedom Church"). Kids usa Fredoka, Youth usa Archivo Black.
- **Fluxo:** editar → `npm run build` (verificar) → `git add/commit/push` no `main` → Cloudflare buildar em ~1 min. Verificar status: `gh api repos/claytonribeirodossantos/freedom-church-site/commits/<HASH>/check-runs --jq '.check_runs[0] | "\(.status) \(.conclusion)"'`. Commit ok, LF→CRLF warnings são inofensivos. Terminar mensagens de commit com `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- **Preview local:** `preview_start` (name `freedom-church`, porta 4321). O navegador do preview NÃO carrega sites externos (volta pro localhost). **Screenshots travam/atrasam** às vezes — use `window.stop()` antes, e confirme via DOM (`preview_eval`) quando o screenshot falhar. Viewport reinicia estreito — use `preview_resize` 1280 pra ver desktop.

---

## 📄 ESTADO ATUAL DE CADA PÁGINA

- **Home (`/`)** — `src/pages/index.astro`. Ordem atual: **Hero → Manifesto → SermonFeature → InstagramBand**. (REMOVIDOS nesta sessão: `NextService` = "Quem somos em números" e `AboutPreview` = "Uma igreja pra todos".) O **Manifesto** (`Manifesto.astro`) foi reescrito: texto novo "Nossa igreja é um lugar de adoração, comunhão e crescimento espiritual…" + convite. Mantém marquee de palavras-chave.
- **Sobre (`/sobre`)** — `AboutPageContent.astro`. Só tem: **Visão e Propósito** (texto oficial da igreja, PT/EN/ES) + **Pastor Adaelton de Souza** (foto P&B `/pastors/adaelton.jpg` + bio completa oficial, âncora `#lideranca`). REMOVIDOS: casal (PastorsCouple), "Nossa história", "Nossos valores". Fonte do texto unificada em Geist (sans). Hero usa foto real do louvor `/about/hero.jpg`.
- **Cultos (`/cultos`)** — `ServicesPageContent.astro`. Horários (de `church.services`): **Domingo 10:30 AM (café 9h)**, **Overflow (Quinta 8 PM, quinzenal)**, **Hubs (Sexta 8 PM, quinzenal)**. Tem galeria masonry "Momentos de adoração" com **15 fotos** (`/cultos/gallery/cultos-01..15.jpg`) + "o que esperar" + mapa.
- **Pregações (`/pregacoes`)** — `SermonsPageContent.astro`. Grade moderna: pregação **mais recente em destaque** + grade 3 col + "Ver todas no YouTube". Usa **lista de reserva** (ver seção Pregações). Nunca fica vazia.
- **Eventos (`/eventos`)** — `EventsPageContent.astro`. **Incorpora a agenda AO VIVO do Church Center** num iframe (ver seção Eventos). Hero = foto de adoração `/cultos/gallery/cultos-02.jpg`. Os arquivos em `src/content/events/*.md` e `public/events/*.jpg` (flyers de exemplo) **não são mais usados** (pode limpar depois).
- **Hubs & Groups (`/hubs-groups`)** — `HubsGroupsPageContent.astro`. SUBSTITUIU a antiga Galeria. Intro + 2 **cards animados clicáveis** (Hubs → link do Church Center; FBC Students → link) + "ver todos os grupos". Groups do Church Center **não podem ser incorporados** (ver seção). Pendente: listar grupos por dentro (precisa print).
- **Sou Novo Aqui (`/sou-novo-aqui`)** — `NewHerePageContent.astro`. Tem: manifesto + **"Comece sua jornada de fé"** (entregar a vida a Jesus → batismo → classe START → comunidade) + endereço/mapa + FAQ + CTA WhatsApp. (REMOVIDO o "Como vai ser".)
- **Contribua (`/contribua`)** — `GivePageContent.astro`. Cards modernos com cabeçalho em degradê da marca. **Zelle: Give@ourfreedomchurch.com** · Venmo @ourfreedomchurch · Cash App $ourfreedomchurch. (handles em `church.giving`).
- **Kids (`/kids`)** — `KidsPageContent.astro`. Design infantil próprio (Fredoka). Logo colorido no hero, **galeria de 10 fotos** (`/kids/gallery/kids-01..10.jpg`), marca d'água colorida de fundo. **NÃO redesenhar — aprovado.**
- **Youth (`/jovens`)** — `YouthPageContent.astro`. Design jovem (Archivo Black, violeta/lima). Galeria "Momentos da galera" (5 fotos `/youth/gallery/youth-01..05.jpg`), marca d'água colorida.
- **Ao Vivo (`/live`)**, **Ministérios**, **Contato**, **Recursos**, **Serviços Pastorais**, **Newsletter**, **Privacidade**, **Termos**, **404** — existem, sem mudanças grandes nesta sessão. Muitas ainda usam **imagem hero placeholder do Unsplash** (`PageHero.astro` → `pageImages`).
- **Liderança (`/lideranca`)** — **REMOVIDA** nesta sessão (rota + componente). O link "Liderança" do rodapé aponta pra `/sobre#lideranca`.

---

## 🧩 SISTEMAS-CHAVE (como funcionam)

### 🎥 Pregações — lista de reserva (`src/lib/youtube.ts`)
- O feed RSS do YouTube (`/feeds/videos.xml`) **dá 404 quando acessado de servidores** (build da Cloudflare, proxies). Por isso `getChannelVideos()` tem um **fallback embutido**: `FALLBACK_VIDEOS` (lista de vídeos reais, mais recentes primeiro, com data). Assim a página nunca fica vazia.
- ⚠️ **Os cultos de domingo são TRANSMISSÕES AO VIVO** — ficam na aba **/streams** do canal, NÃO em /videos. Para atualizar a reserva: veja a aba /streams (vídeos "Sunday service") **e** /videos, e liste os ids + títulos + datas mais recentes em `FALLBACK_VIDEOS`. O comentário no arquivo explica.
- Quando o feed funcionar (raro), ele atualiza por cima. Parser de título/pastor (`cleanTitle`/`extractPastor`/`extractSeries`) trata formatos "Pastor X | Série | Part N | Freedom Church" e "Título - Pr. X".

### 📅 Eventos — embed AO VIVO do Church Center (`EventsPageContent.astro`)
- **DESCOBERTA IMPORTANTE:** a agenda do Church Center pode ser incorporada num iframe usando a URL `https://ourfreedomchurch.churchcenter.com/calendar?view=gallery&embed=true`. Essa URL com `embed=true` **NÃO tem X-Frame-Options** (a /calendar normal tem SAMEORIGIN e bloqueia). Mostra os eventos reais + flyers, ao vivo, atualizado sozinho, **sem chave de API**.
- O embed **envia a própria altura** via `postMessage` (`{pageHeight: N}`). Um script na página escuta e ajusta a altura do iframe (id `cc-calendar`) pra caber tudo sem rolagem interna.
- ✅ **O time só cadastra no Church Center e o site atualiza sozinho.**

### 🔗 Groups — NÃO podem ser incorporados
- Diferente do calendário, **todas** as páginas de groups do Church Center (`/groups`, `/groups/hubs`, `/groups/fbc/fbc-students`, mesmo com `?embed=true`) têm **X-Frame-Options: SAMEORIGIN** → iframe fica em branco (testado no navegador, confirmado). E a API de groups precisa de auth (401). Church Center só liberou embed pro calendário.
- Solução atual: página Hubs & Groups **linka** pros grupos. Para listar os grupos **por dentro** da página: Clayton manda **print** das páginas de groups → montar a lista à mão (como foi feito com a bio do pastor). Ou pegar o "código de embed oficial" no admin do Church Center (Groups → Share → Embed).

### 🎨 Marca d'água (logo de fundo)
- `Section.astro` tem prop `watermark` (`'dark'` = logo preto `/logo.png`, `'color'` = logo colorido `/logo-color.png`, `'light'` = logo branco). Cor combina com a página; opacidade já subida 1 nível. Kids/Youth têm marca d'água colorida própria. `/logo-color.png` = versão transparente do logo colorido (fundo removido).

### 🔤 Wordmark "Freedom Church"
- No Header e Footer o nome usa a fonte do logo: **Montserrat** (maiúsculo, FREEDOM bold + CHURCH leve). Classe `.wordmark` em `global.css` (`--font-brand`). Se o designer tiver o nome exato da fonte do logo, dá pra trocar `--font-brand`.

### 📱 Ícones sociais (`SocialIcons.astro`)
- Instagram (degradê real), Facebook (#1877F2), YouTube (#FF0000) — **cores originais dos apps**. Usado no Header, Footer (com youtube) e menu mobile. A faixa `InstagramBand.astro` tem os 3 botões grandes.

### 🌐 Bandeiras no seletor de idioma (`LanguageSwitcher.astro`)
- Usa **imagens SVG** (`/flags/br.svg`, `us.svg`, `es.svg`) — **NÃO emoji** (o Windows renderiza emoji de bandeira como texto "BR"/"US"). es.svg é uma versão simples (faixas), não o brasão.

### 🛠️ CMS / Painel de edição (Sveltia) — pendente
- Já existe scaffold: `/admin` (`src/pages/admin/index.astro`) + `public/admin/config.yml` (Sveltia CMS, coleções Eventos/Pregações/Blog, backend GitHub). **FALTA o login** (autenticação) — não há endpoint `/api/auth` nem Worker. Plano escolhido: login pelo **GitHub OAuth** (equipe cria conta grátis, é adicionada ao repo; rastreamento = histórico git). **Precisa do OK do pastor** (contas/acesso) e Clayton fazer os passos de conta (Claude não cria conta/OAuth nem vê senha). Eventos já não dependem disso (embed resolveu).

---

## 🧨 GOTCHAS / LIÇÕES (não repetir erros)

1. **Site 100% estático.** Não instalar adapter Cloudflare (KV, erro 10014) nem React/Three/shadcn.
2. **Conteúdo do Church Center é montado por JavaScript e protegido por login** — não dá pra ler/raspar de fora sem chave. Bio do pastor foi copiada de um print. Groups idem.
3. **YouTube feed 404 em servidores** → use a lista de reserva. Cultos de domingo são livestreams (/streams).
4. **Windows não mostra emoji de bandeira** → use imagens SVG.
5. **Template literals aninhados (crase dentro de crase) no frontmatter Astro quebram o build** (erro esquisito apontando pra outra linha). Evite; use concatenação com `+`.
6. **Comentários `<!-- -->` dentro de fragmentos/JSX `{...}` no Astro quebram** — use `{/* */}`.
7. **Genéricos tipo `Record<string, X>` no frontmatter** podem confundir o parser (interpreta `<string` como tag) — remova anotações de tipo se der erro.
8. **Datas date-only (md) voltam 1 dia** em fuso atrás do UTC — formate com `timeZone: 'UTC'`.
9. **Screenshots do preview travam/atrasam** (autoplay, live-detect). Use `window.stop()`, confirme por DOM/`preview_eval`. O preview não navega pra sites externos.
10. **DNS/domínio:** nameservers na Cloudflare. Nunca mexer nos registros de email.
11. **Windows Defender** já apagou arquivo por falso-positivo; a pasta `freedom-church` está nas exclusões.

---

## ⏳ PENDÊNCIAS / TODO

| Item | Depende de | Detalhe |
|---|---|---|
| 🔐 **Login do CMS** (Sveltia + GitHub) | Pastor + Clayton | Ver seção CMS. Falar com pastor sobre contas/acesso primeiro. |
| 👥 **Listar grupos por dentro do Hubs & Groups** | Print do Clayton | Groups não incorporam; montar lista à mão a partir de screenshot. |
| 📧 **Web3Forms key** | Clayton criar conta grátis | `church.ts` → `web3FormsAccessKey` ainda é placeholder. Sem isso, formulários de contato/oração não enviam. |
| 🖼️ **Heros placeholder (Unsplash)** | Fotos reais | Várias páginas internas ainda usam imagem do Unsplash no `PageHero`. |
| 🔤 **Fonte exata do logo** | Designer | Wordmark usa Montserrat (aproximação); trocar `--font-brand` se souber a certa. |
| 🚀 **LANÇAR** | Clayton | `SITE.maintenance = false` em `src/config.ts`. |
| 🧹 **Limpeza** | — | `src/content/events/*.md` e `public/events/*.jpg` (flyers de exemplo) não são mais usados; `public/flags/es.svg` simplificado. |

---

## 📂 ARQUIVOS-CHAVE

```
site/  <- raiz do repo git (rode git/npm AQUI)
├── src/
│   ├── config.ts                  <- SITE.maintenance (chave do "Em breve")
│   ├── data/church.ts             <- FONTE ÚNICA: nome, pastores, social (instagram/facebook/youtube),
│   │                                 services (horários), giving (Zelle/Venmo/CashApp), web3FormsAccessKey
│   ├── layouts/BaseLayout.astro   <- head, fontes (Fraunces/Geist/Montserrat), gate de manutenção, scripts globais
│   ├── lib/youtube.ts             <- feed + FALLBACK_VIDEOS (lista de reserva de pregações)
│   ├── i18n/pages.ts              <- eyebrow/título/subtítulo de cada PageHero (por pageKey)
│   ├── styles/global.css          <- @theme (cores, fontes, --font-brand), .wordmark, classes
│   ├── components/
│   │   ├── Header.astro / Footer.astro       <- nav, wordmark Montserrat, SocialIcons
│   │   ├── Section.astro                      <- wrapper com prop `watermark`
│   │   ├── SocialIcons.astro / LanguageSwitcher.astro (bandeiras SVG)
│   │   ├── Manifesto.astro / Hero.astro / SermonFeature.astro / InstagramBand.astro
│   │   └── pages/*.astro                       <- conteúdo de cada página (About, Services, Sermons,
│   │                                             Events, HubsGroups, NewHere, Give, Kids, Youth, ...)
│   └── pages/ [page].astro (+ en/ es/), index (x3), em-breve.astro, admin/
├── public/
│   ├── logo.png / logo.svg / logo-color.png (transparente) / favicon.svg
│   ├── flags/br.svg us.svg es.svg
│   ├── pastors/adaelton.jpg (P&B) + pastores.jpg
│   ├── about/hero.jpg  cultos/gallery/cultos-01..15.jpg  kids/gallery/kids-01..10.jpg
│   ├── youth/gallery/youth-01..05.jpg  events/ (flyers exemplo, não usados)
│   └── admin/config.yml  uploads/
├── docs/ (dns-snapshot, guias)  scripts/ (make-logo.mjs, audit-links.py)
└── HANDOFF.md (este arquivo)
```

---

## 🚀 COMO CONTINUAR EM UM CHAT NOVO

1. Diretório: `C:\Users\ClaytonRibeirodosSan\freedom-church\site`.
2. Cole no início: *"Estou continuando o site da Freedom Church. Sou voluntário não-programador, preciso de passo a passo. Leia o HANDOFF.md nessa pasta (ou em https://github.com/claytonribeirodossantos/freedom-church-site/blob/main/HANDOFF.md) — tem TODO o estado, decisões e armadilhas. Confirme que está alinhado antes de continuar. Próxima coisa que quero: [X]."*
3. Fluxo: editar → `npm run build` → commit/push no `main` → Cloudflare deploya em ~1 min → conferir no `.workers.dev`.
4. Antes de mudanças visuais, mostrar screenshot/preview (Clayton decide no olho). Texto novo sempre nos 3 idiomas.

---

_Última atualização: 2026-07-03. Site NO AR no domínio em **modo manutenção**. Tudo do `main` publicado no site de testes (commit `8e622c9`). Próximo grande marco: login do CMS (com OK do pastor) e/ou lançar (maintenance → false)._
