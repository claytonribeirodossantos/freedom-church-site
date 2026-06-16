# 📋 HANDOFF — Site Freedom Church (atualizado 2026-06-16)

> **Documento de transferência completo.** Cole isto no início de uma nova conversa com Claude (Code, no computador) pra continuar exatamente de onde paramos. Tudo que o assistente anterior sabia está aqui.

---

## 🎯 PROJETO

Site da **Freedom Church**, igreja brasileira em **Kensington, Maryland (EUA)**. Clayton é voluntário **não-programador** — precisa de orientação passo a passo, sem jargão, com decisões visuais (screenshots antes de mudanças grandes).

- **Endereço:** 5020 Nicholson Court, Kensington, MD 20895, USA
- **Culto:** Domingos 10h30
- **Pastores:** Adaelton de Souza + Jheini de Souza (casal, pastores principais)
- **Instagram igreja:** [@ourfreedomchurch_md](https://www.instagram.com/ourfreedomchurch_md/) ← handle CORRETO
- **YouTube:** canal ID `UCmItF2T27GJFT6gFJti_9SA` ([@ourfreedomchurch](https://www.youtube.com/@ourfreedomchurch))
- **Pr Adaelton:** [@adaelton_desouza](https://www.instagram.com/adaelton_desouza/) · **Pra Jheini:** [@jheinidesouza](https://www.instagram.com/jheinidesouza/)
- **Idiomas:** PT (principal, `/`) + EN (`/en/`) + ES (`/es/`)
- **Ministérios:** Kids, Jovens (Youth), Casais, Mulheres, Homens, Louvor, Células

---

## 🔗 URLS ESSENCIAIS

| O quê | URL |
|---|---|
| **Site de TESTES (dev)** — use este pra ver mudanças | https://freedom-church-site.claytonribeirodossantos.workers.dev |
| **Domínio oficial (público vê "Em breve")** | https://ourfreedomchurch.com |
| **Ver site real no domínio (bypass manutenção)** | https://ourfreedomchurch.com/?preview |
| **Repositório GitHub** | https://github.com/claytonribeirodossantos/freedom-church-site |
| **Cloudflare dashboard** | https://dash.cloudflare.com (account: `a883a62138a3227585f3722468d05f07`) |

---

## 🚨 RESTRIÇÕES CRÍTICAS (NÃO QUEBRAR)

1. **EMAIL / MX — sagrado.** O email da igreja recebe comprovantes de oferta (Zelle/Venmo/etc). MX aponta pro **Yahoo**: `mx-biz.mail.am0.yahoodns.net` (preferências 20 e 30). **NUNCA apagar/alterar** os registros de email no DNS. Snapshot completo em `docs/dns-snapshot-pre.txt`.
2. **Hierarquia:** o Pastor Adaelton é dono do domínio e das contas financeiras. Clayton **implementa**, mas decisões de domínio/email/pagamento precisam do **OK do pastor**.
3. **CREDENCIAIS:** **NUNCA pedir senha** de nada. Só identificadores públicos (handle do Instagram, @ do Venmo, etc). Sempre avisar: "só o usuário, NUNCA a senha". Clayton já vazou senha do Gmail uma vez por engano.

---

## 💻 STACK TÉCNICA

| Camada | Ferramenta |
|---|---|
| Framework | **Astro 6** (output **static** — 100% estático) |
| Estilo | **Tailwind CSS v4** (`@theme` em `src/styles/global.css`, sem tailwind.config.js) |
| Hospedagem | **Cloudflare Workers** (Workers Builds, auto-deploy do GitHub) |
| Config deploy | **`wrangler.jsonc`** força assets estáticos (ver gotcha #2 abaixo) |
| Vídeos pregação | **YouTube RSS** (build-time em `src/lib/youtube.ts` + refresh client-side via proxies rss2json/allorigins) |
| Formulários | **Web3Forms** (preparado, FALTA access key) |
| Doações | Zelle + Venmo + Cash App (placeholders, FALTAM handles reais) |
| Fontes | Fraunces (serif) + Geist (sans) via Google Fonts; Youth usa **Archivo Black**, Kids usa **Fredoka** |
| Cores | Preto `#0A0908` (ink) + cream `#FAFAF7` + **dourado `#C9A961`** (gold). Kids e Youth têm paletas próprias. |

**Deploy:** cada `git push` na branch `main` dispara build automático na Cloudflare (~1 min). Verificar status via GitHub check-runs ou dashboard.

---

## 🌐 DOMÍNIO — JÁ MIGRADO E NO AR (feito nas últimas sessões)

Estado **completo e funcional**:

- ✅ Domínio `ourfreedomchurch.com` registrado na **Turbify** (Clayton tem acesso).
- ✅ **Nameservers migrados** Turbify → **Cloudflare**: `rosemary.ns.cloudflare.com` + `yadiel.ns.cloudflare.com`.
- ✅ **Email preservado na migração** — todos os registros copiados pra Cloudflare (MX x2, `mail`→mail-redirect.turbify.com, `k2/k3._domainkey`→dkim2/3.mcsv.net, TXT _dmarc + google-site-verification). **Testado, email funciona.**
- ✅ **Apex + www** conectados ao Worker como Custom Domains (registro A antigo `69.49.241.24` da Turbify/HostGator foi deletado; o `www` CNAME também foi deletado e reconectado como custom domain). SSL ativo nos dois.
- ✅ **Site antigo do HostGator** (abandonado, tinha sido hackeado) foi substituído. O Google tinha marcado o domínio como **"Dangerous" (páginas enganosas)** por causa disso → solicitamos revisão no **Google Search Console** → **JÁ FOI REMOVIDO**.

### ⚙️ MODO MANUTENÇÃO — IMPORTANTE
- Arquivo **`src/config.ts`** tem `SITE.maintenance = true`.
- Com isso, **o público que acessa `ourfreedomchurch.com` é redirecionado pra página `/em-breve/`** (um "Em breve" elegante). A equipe testa o site real no link `.workers.dev` (nunca bloqueado) ou em `ourfreedomchurch.com/?preview`.
- **PARA LANÇAR PRO PÚBLICO:** trocar `maintenance: true` → `false` em `src/config.ts`, commit e push. Pronto, sai do "Em breve".
- O gate está no `<head>` do `src/layouts/BaseLayout.astro` (script inline por hostname).

---

## ✅ O QUE JÁ ESTÁ PRONTO (todas as páginas em PT/EN/ES)

### Páginas
- **Home** (`/`): Hero com vídeo + Manifesto + Stats + **SermonFeature (vídeo em destaque, atualiza AO VIVO)** + AboutPreview + **InstagramBand** (faixa de seguir).
- **Sobre** (`/sobre`): página ÚNICA com história + missão + valores + **Liderança (pastores casal, âncora `#lideranca`)**. "Sobre" no menu é link direto (sem dropdown).
- **Cultos** (`/cultos`): horário, "o que esperar", **vídeo de fundo no hero**, mapa.
- **Pregações** (`/pregacoes`): **CARROSSEL moderno** de vídeos (scroll-snap + setas), ordenado por data, selo "Mais recente" no primeiro, filtros por série, fetch ao vivo.
- **Ao Vivo** (`/live`): **nunca fica vazia** — mostra o último culto por padrão; detecta live e troca pra transmissão + selo "AO VIVO AGORA"; botão vermelho "Assistir no YouTube".
- **Eventos** (`/eventos`): lê Content Collection.
- **Ministérios** (`/ministerios`): grid de 8 ministérios. (Item "Todos os ministérios" foi REMOVIDO do menu.)
- **Freedom Kids** (`/kids`): **design colorido/infantil próprio** (Fredoka, paleta vibrante, hero com vídeo de fundo, 5 valores, faixas etárias, processo de check-in adesivo+número). **NÃO MEXER — Clayton aprovou.**
- **Freedom Youth** (`/jovens`): **design jovem próprio** (preto + violeta/lima, Archivo Black gigante com outline, marquee "Até que Ele venha", foto com adesivos, glows). Distinta do resto.
- **Galeria** (`/galeria`): 3 fotos reais (oração, parede de memórias, jantar).
- **Contribua** (`/contribua`): **modernizada** — cards com faixa colorida da marca (Zelle roxo/Venmo azul/Cash App verde), botão copiar em pílula, botão "Abrir app". Handles ainda PLACEHOLDER.
- **Contato** (`/contato`): formulário Web3Forms (FALTA key).
- **Sou Novo Aqui** (`/sou-novo-aqui`), **Serviços Pastorais**, **Newsletter**, **Recursos**, **Privacidade**, **Termos**, **404 custom**.

### Identidade visual
- **Logo NOVO** (sem a curva antiga): arte oficial `brand/logo-color.png` recolorida pra preto via `scripts/make-logo.mjs` → `public/logo.png` (+ `logo.svg`). Cruz limpa no círculo.
- **Animações/movimento:** scroll-reveal (`data-reveal`) em quase todas as páginas, barra de progresso de scroll no topo, sublinhado animado no menu, hover-lift em cards, parallax no Hero, respeito a `prefers-reduced-motion`.

### Menu (Header) — estado atual
- **Sobre** (link direto → /sobre)
- **Conecte-se** ▾ : Cultos · Pregações · Eventos · Galeria
- **Ministérios** ▾ : Freedom Kids · Freedom Youth
- **Contribua** (link direto)
- + botão "Sou novo aqui", ícone Instagram, "Ao vivo", seletor de idioma

---

## ⏳ O QUE FALTA (pendências)

| Item | Depende de | Detalhe |
|---|---|---|
| 💳 Handles reais Zelle/Venmo/Cash App | Pastor confirmar | Editar `src/data/church.ts` → `giving`. Hoje: `@ourfreedomchurch`, `$ourfreedomchurch`, email zelle genérico. |
| 📧 Web3Forms access key | Clayton criar conta grátis (web3forms.com) | Editar `src/data/church.ts` → `web3FormsAccessKey` (hoje `'REPLACE_WITH_WEB3FORMS_ACCESS_KEY'`). Sem isso, formulários de contato/oração não enviam. |
| 🖼️ Fotos reais | Clayton baixar do Instagram | Várias páginas ainda usam imagens Unsplash (placeholder) no `PageHero`. |
| 🚀 **LANÇAR pro público** | Clayton decidir | Trocar `SITE.maintenance` pra `false` em `src/config.ts`. Clayton quer ajustar mais coisas antes. |

---

## 🧨 GOTCHAS / ARMADILHAS (lições aprendidas — NÃO repetir erros)

1. **Site é 100% ESTÁTICO.** NÃO instalar `@astrojs/cloudflare` adapter — ele cria um KV Namespace que dá conflito (erro 10014) e quebra o deploy. Já aconteceu. O `wrangler.jsonc` existe pra forçar deploy de assets estáticos e impedir o auto-setup.
2. **NÃO adicionar React/Three.js/shadcn.** Uma sessão interrompida instalou isso + deixou `@import "tw-animate-css"` e `@import "shadcn/..."` órfãos no `global.css`, que quebraram o build na Cloudflare (mas passava local porque node_modules ainda tinha). Mantenha o projeto **lean: só Astro + Tailwind + sitemap**.
3. **Windows Defender** dava falso-positivo (`Trojan:HTML/FakeLogin`) em `ContactPageContent.astro` (é só um form) e apagava o arquivo do disco. Resolvido: pasta `freedom-church` está nas **exclusões do Defender**. Se um arquivo "sumir" sozinho, é isso.
4. **Cloudflare reporta build "0.0s"** mesmo nos que dão certo — não é sinal de erro. Olhar `conclusion: success/failure`.
5. **Screenshots no preview travam** por causa do (a) script de live-detection que fica buscando proxies e (b) vídeos autoplay — a página nunca fica "idle". Solução: rodar `window.stop()` via preview_eval antes do screenshot, ou verificar via inspeção do DOM (preview_eval).
6. **Vídeo de pregação "desatualizado":** o site é estático (build-time). Já corrigido com (a) ordenação por data no `youtube.ts` e (b) refresh client-side na home e na Pregações. Mas lembre: pra o snapshot do build ficar fresco, precisa de um novo deploy.
7. **DNS/domínio:** os nameservers JÁ estão na Cloudflare. Pra qualquer mudança de DNS, é no painel Cloudflare (não mais na Turbify). Nunca mexer nos registros de email.

---

## 📂 ARQUIVOS-CHAVE

```
site/  <- raiz do repositorio git (rode git/npm AQUI)
├── wrangler.jsonc            <- forca deploy estatico (NAO remover)
├── src/
│   ├── config.ts             <- SITE.maintenance (chave do "Em breve")
│   ├── data/church.ts        <- FONTE UNICA: nome, endereco, pastores, social, giving, web3FormsAccessKey
│   ├── layouts/BaseLayout.astro  <- head, gate de manutencao, scripts globais (reveal, parallax, live-detect, scroll-progress)
│   ├── lib/youtube.ts        <- fetch RSS YouTube (build-time, ordenado por data)
│   ├── styles/global.css     <- @theme tokens + animacoes (SO @import "tailwindcss")
│   ├── components/
│   │   ├── Header.astro / Footer.astro / Hero.astro / Manifesto.astro
│   │   ├── SermonFeature.astro   <- video destaque home (refresh ao vivo)
│   │   ├── InstagramBand.astro / PastorsCouple.astro / SectionHeader.astro / Section.astro (aceita id)
│   │   └── pages/*.astro     <- conteudo de cada pagina
│   └── pages/ [page].astro, en/[page].astro, es/[page].astro, index (x3), em-breve.astro, admin/
├── public/
│   ├── logo.png / logo.svg / logo-color.png / favicon.svg
│   ├── pastors/pastores.jpg
│   ├── kids/freedom-kids.mp4, youth/freedom-yth-camiseta.jpg, cultos/culto-1.mp4
│   └── uploads/galeria/*.jpg
├── brand/logo-color.png      <- arte oficial colorida (fonte do logo)
├── scripts/make-logo.mjs     <- regenera logo.png preto a partir da arte
├── scripts/audit-links.py    <- audita todos os links do build (python3)
└── docs/
    ├── APONTAR-DOMINIO.md    <- guia DNS Turbify->Cloudflare
    ├── dns-snapshot-pre.txt  <- snapshot DNS completo (seguranca)
    ├── MANUTENCAO-DO-SITE.md, MAPA-DO-SITE.md, COMO-BAIXAR-DO-INSTAGRAM.md, etc.
```

---

## 🚀 COMO CONTINUAR EM UM CHAT NOVO (Claude Code, no computador)

1. Diretório do projeto: `C:\Users\ClaytonRibeirodosSan\freedom-church\site`
2. Cole este HANDOFF no início e diga: *"Estou continuando o site da Freedom Church. Leia este handoff e confirme que está alinhado. Próxima coisa que quero: [X]."*
3. Fluxo de trabalho: editar arquivos → `npm run build` (verificar) → `git add/commit/push` → Cloudflare deploya em ~1 min → verificar no link `.workers.dev`.
4. Sempre que tocar em layout, **mostrar screenshot/preview** antes (Clayton decide visualmente). Usar `window.stop()` antes de screenshot.

---

## 📊 HISTÓRICO RESUMIDO (o que foi feito além do site base)

1. ✅ Foto real dos pastores (casal) na Liderança
2. ✅ Removida FAQ de ofertas e "Pedidos de Oração" do menu
3. ✅ Check-in do Kids: adesivo numerado (não pulseira)
4. ✅ Logo novo (cruz limpa, sem curva, preto)
5. ✅ Instagram corrigido pra @ourfreedomchurch_md em todo o site
6. ✅ Galeria no menu + faixa Instagram + animações/movimento
7. ✅ Fotos na Galeria + foto camiseta no Youth + vídeos (Kids hero, Cultos hero)
8. ✅ Página Kids redesenhada (colorida/infantil) — APROVADA
9. ✅ Página Youth redesenhada (jovem)
10. ✅ Sobre virou página única com Liderança
11. ✅ **Domínio migrado** Turbify→Cloudflare (email preservado), apex + www, SSL
12. ✅ Modo manutenção ("Em breve") + página /em-breve
13. ✅ Google removeu aviso "Dangerous"
14. ✅ Bug do link "ao vivo" (channel ID cortado) corrigido
15. ✅ Pregações em carrossel + correção do "vídeo mais recente"
16. ✅ Página Ao Vivo modernizada (nunca vazia)
17. ✅ Contribua modernizada
18. ✅ Removido "Todos os ministérios" do menu
19. ✅ Limpeza de dependências pesadas não usadas (React/Three/shadcn)

---

_Última atualização: 2026-06-16. O site está NO AR no domínio em modo manutenção. Próximo grande marco: ajustes finais de conteúdo/visual e depois LANÇAR (trocar maintenance pra false)._
