# 🗺️ Mapa do Site — Onde editar cada coisa

> Referência rápida pra encontrar onde mudar QUALQUER conteúdo do site.
> **Com o `/admin` configurado, não precisa decorar isto — o painel cuida.**

---

## 🏠 Página inicial (Home)

Localização: `site/src/pages/index.astro` (importa componentes)

| Seção | Onde editar | Tipo |
|---|---|---|
| Hero (Liberte-se em Cristo) | `src/components/Hero.astro` | Texto + imagem |
| Manifesto ("Cremos que a fé...") | `src/components/Manifesto.astro` | Texto |
| Estatísticas (6 anos / 300+ famílias) | `src/components/NextService.astro` | Números |
| Pregação destacada | Automático — YouTube do canal | Vídeo (auto) |
| Quem somos / 4 Pilares | `src/components/AboutPreview.astro` | Texto |

---

## 📄 Páginas internas

Cada página de conteúdo está em `site/src/components/pages/`:

| URL | Página | Arquivo |
|---|---|---|
| `/sobre` | Sobre / Quem Somos | `AboutPageContent.astro` |
| `/cultos` | Cultos & Horários | `ServicesPageContent.astro` |
| `/pregacoes` | Pregações (lê YouTube auto) | `SermonsPageContent.astro` |
| `/eventos` | Eventos (lê /content/events) | `EventsPageContent.astro` |
| `/ministerios` | Lista de Ministérios | `MinistriesPageContent.astro` |
| `/contribua` | Doações Zelle/Venmo/CashApp | `GivePageContent.astro` |
| `/sou-novo-aqui` | Bem-vindo + Manifesto + FAQ | `NewHerePageContent.astro` |
| `/pedidos-de-oracao` | Form pedido oração | `PrayerPageContent.astro` |
| `/contato` | Form contato + endereço | `ContactPageContent.astro` |
| `/lideranca` | Pastores Adaelton + Jheini | `LeadershipPageContent.astro` |
| `/live` | Transmissão ao vivo (YouTube) | `LivePageContent.astro` |
| `/kids` | Freedom Kids (landing) | `KidsPageContent.astro` |
| `/jovens` | Freedom Youth (landing) | `YouthPageContent.astro` |
| `/galeria` | Galeria de fotos | `GalleryPageContent.astro` |
| `/recursos` | Recursos/downloads | `ResourcesPageContent.astro` |
| `/servicos-pastorais` | Batismo, casamento, etc. | `PastoralServicesPageContent.astro` |
| `/newsletter` | Cadastro newsletter | `NewsletterPageContent.astro` |
| `/privacidade` | Política Privacidade | `PrivacyPageContent.astro` |
| `/termos` | Termos | `TermsPageContent.astro` |

---

## 🌐 Componentes que aparecem em TODAS as páginas

| Onde aparece | Arquivo |
|---|---|
| Header (logo, menu, language switcher) | `src/components/Header.astro` |
| Footer (endereço, links, redes) | `src/components/Footer.astro` |
| Botão "AO VIVO" (header e Hero) | `src/layouts/BaseLayout.astro` (script) |
| Hero das páginas internas (título grande com foto) | `src/components/PageHero.astro` |

---

## 📦 Dados centralizados (um arquivo só)

Mudar UMA vez aqui muda em TODO o site:

📄 **`site/src/data/church.ts`**

| Campo | Aparece em |
|---|---|
| `name`, `brandHandle` | Tudo |
| `tagline` (PT/EN/ES) | Footer, BaseLayout meta |
| `address.*` | Footer, Cultos, Contato, NextService |
| `services` (horários) | NextService, Cultos, Footer |
| `pastors[]` (Adaelton, Jheini) | Liderança, SermonFeature |
| `social.instagram`, `social.youtube` | Footer, Live, Sermons |
| `social.youtubeChannelId` | Pregações (auto-fetch), Live (detect) |
| `contact.email` | Contato, Footer, Privacy, Terms |
| `giving.zelle/venmo/cashapp` | Página Contribua |
| `ministries[]` | Footer, Ministérios |
| `web3FormsAccessKey` | Formulários Prayer + Contato |

---

## 📝 Conteúdo dinâmico (Content Collections)

Eventos, pregações com notas, posts de blog — todos em `site/src/content/`:

```
content/
├── events/        ← um arquivo .md por evento
├── sermons/       ← um arquivo .md por pregação (com notas/transcrição)
└── blog/          ← um arquivo .md por post
```

Cada arquivo tem campos no início (frontmatter YAML) — ver template em `MANUTENCAO-DO-SITE.md` seção 5.

**Pelo `/admin`, esses arquivos são criados/editados visualmente.**

---

## 🌍 Traduções (PT/EN/ES)

📄 **`site/src/i18n/ui.ts`** — strings da interface (botões, eyebrow, etc.)
📄 **`site/src/i18n/pages.ts`** — títulos e subtítulos das páginas internas

Cada string tem 3 idiomas:
```ts
'hero.eyebrow': 'Bem-vindo à Freedom Church',  // PT
// e em ui.ts pra EN: 'Welcome to Freedom Church'
// e ES: 'Bienvenido a Freedom Church'
```

---

## 🖼️ Pastas de imagens

| Pasta | O que vai aqui |
|---|---|
| `site/public/logo.png` | Logo oficial (aparece header/footer) |
| `site/public/pastors/adaelton.jpg` | Foto Pr Adaelton (Liderança) |
| `site/public/pastors/jheini.jpg` | Foto Pra Jheini (Liderança) |
| `site/public/uploads/events/` | Fotos de eventos |
| `site/public/uploads/gallery/` | Galeria geral |
| `site/public/uploads/blog/` | Capa de posts blog |
| `site/public/uploads/ministries/` | Fotos dos ministérios |
| `site/public/uploads/` | Qualquer outra imagem |

---

## 🎨 Cores e fontes

📄 **`site/src/styles/global.css`** — todas as cores e tokens do design

Pra trocar cor do site inteiro, é UM arquivo. Cuidado pra não quebrar contraste.

---

## 🚀 "Eu mexi mas o site não mudou" — checklist

1. ⏱️ Esperar 2-3 minutos (Cloudflare rebuilda)
2. 🔄 F5 / Ctrl+Shift+R no navegador (limpa cache)
3. 🔍 Conferir no GitHub se o commit subiu: github.com/.../commits/main
4. ❓ Checar se o build não falhou: github.com/.../actions

---

## 🆘 "Onde está X?" — não sei

Manda mensagem com print + descrição "quero mudar essa parte". Eu identifico o arquivo certo em 1 minuto.

Quando o `/admin` (Sveltia CMS) estiver ativo, você navega visualmente sem precisar consultar este mapa.
