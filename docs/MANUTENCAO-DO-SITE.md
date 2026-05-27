# 📖 Guia de Manutenção do Site Freedom Church

> Tudo o que você (ou qualquer voluntário) precisa pra manter o site atualizado.
> **Não precisa saber programar.**

🌐 **Site no ar**: https://freedom-church-site.claytonribeirodossantos.workers.dev
📦 **Código no GitHub**: https://github.com/claytonribeirodossantos/freedom-church-site

---

## 🎬 1. Postar uma pregação nova

✅ **Você não precisa fazer NADA no site.**

1. Faz o upload normal no canal YouTube `@ourfreedomchurch`
2. O site lê automaticamente o feed do canal
3. A pregação nova aparece em `/pregacoes` em até **30 segundos**

### 💡 Dica de título no YouTube
Pra ficar bem organizado, use esse padrão:
```
Pastor [Nome] | [Nome da Série] | Part [N] | Freedom Church Maryland
```

Exemplos:
- `Pastor Adaelton de Souza | Cartas de Jesus | Part 5 | Freedom Church Maryland`
- `Pastora Jheini de Souza | Vinho novo | Freedom Church Maryland`
- `Sunday service - Freedom Church Maryland`

O site detecta automaticamente:
- **Pastor** (do início)
- **Série** (do meio)
- **Limpa o "Freedom Church Maryland"** do título exibido

---

## 🔴 2. Transmitir AO VIVO no domingo

✅ **Você só faz o que já faz: live no YouTube Studio.**

1. Abre o YouTube Studio (celular ou computador)
2. Clica em "Criar" → "Transmitir ao vivo"
3. Configura título, descrição (igual sempre faz)
4. Inicia transmissão

### O que o site faz automaticamente:
- 🔴 **Bolinha vermelha** começa a pulsar no header (e no botão "Assistir ao vivo" da home)
- 📺 **Página `/live`** mostra a transmissão automaticamente
- O JavaScript do site verifica a cada **60 segundos** se está ao vivo

### Quando terminar a transmissão:
- O YouTube para o stream
- Bolinha vermelha vira cinza em ~1 minuto
- O vídeo gravado vai pra `/pregacoes` (atualiza em até 30 segundos)

**Zero trabalho extra. Você só faz a transmissão.**

---

## 📸 3. Adicionar fotos novas (pastores, galeria, eventos)

### Forma A — Pelo GitHub (3 cliques, sem instalar nada)

1. Acessa https://github.com/claytonribeirodossantos/freedom-church-site
2. Navega até a pasta onde quer adicionar:
   - **Pastores**: `site/public/pastors/`
   - **Eventos/Galeria**: `site/public/uploads/`
3. Clica no botão **"Add file"** (canto superior direito) → **"Upload files"**
4. Arrasta as fotos pra área indicada
5. Embaixo: clica no botão verde **"Commit changes"**
6. Pronto! O Cloudflare rebuilda automático em **~2 minutos** e as fotos aparecem

### Forma B — Pelo painel /admin (depois de configurado)
Ver seção 6 deste guia.

### 📐 Recomendações de imagem
- **Pastores**: vertical 4:5 (ex: 800×1000px), rosto centralizado
- **Galeria/eventos**: horizontal 16:9 (ex: 1920×1080px)
- Formato: `.jpg` ou `.webp`
- Tamanho: idealmente abaixo de 500 KB

---

## ✏️ 4. Editar textos (Sobre, manifesto, etc.)

### Forma A — Pede pro Clayton
A maneira mais rápida no curto prazo: você me diz "muda o texto X pra Y" e eu faço.

### Forma B — Pelo GitHub
1. Acessa o repo no GitHub
2. Navega até `site/src/components/pages/`
3. Abre o arquivo da página (ex: `AboutPageContent.astro`)
4. Clica no ícone do lápis ✏️ pra editar
5. Faz as mudanças
6. Embaixo: **"Commit changes"** → confirma
7. Site atualiza em ~2min

---

## 📅 5. Adicionar eventos novos

### Forma A — Pelo GitHub (manual)
1. Vai pra pasta `site/src/content/events/`
2. Clica em **"Add file"** → **"Create new file"**
3. Nome do arquivo: `2026-08-15-conferencia-mulheres.md` (formato: AAAA-MM-DD-titulo)
4. Cola este template:

```markdown
---
title: "Conferência de Mulheres"
titleEn: "Women's Conference"
titleEs: "Conferencia de Mujeres"
tag: "Mulheres"
date: 2026-08-15
time: "19h00"
place: "Templo principal"
description: "Duas noites de adoração e ministração para as mulheres da igreja."
descriptionEn: "Two nights of worship and ministry for the church women."
descriptionEs: "Dos noches de alabanza y ministración para las mujeres de la iglesia."
---
```

5. Personaliza os campos com os dados do evento real
6. Embaixo: **"Commit new file"**
7. Site atualiza em ~2min

### Tags disponíveis (campo `tag`):
- Conferência
- Comunhão
- Jovens
- Missão
- Família
- Casais
- Mulheres
- Homens
- Kids
- Batismo

### Forma B — Pelo painel /admin (depois de configurado)
Ver seção 6.

---

## 🎛️ 6. Painel /admin (Sveltia CMS) — edição visual

> **Status atual**: painel já está montado em `/admin`, mas precisa de **1 passo** pra começar a funcionar: criar um GitHub App.

### O que é
Um painel visual igual o WordPress onde você (ou voluntários) edita pregações, eventos, posts de blog. Não precisa programar — interface gráfica.

### Setup inicial (você faz UMA VEZ, ~5 minutos)

1. **Cria um GitHub App** (não confunde com OAuth App):
   - Acessa: https://github.com/settings/apps/new
   - **GitHub App name**: `Freedom Church Admin`
   - **Homepage URL**: `https://freedom-church-site.claytonribeirodossantos.workers.dev`
   - **Callback URL**: `https://freedom-church-site.claytonribeirodossantos.workers.dev/admin/`
   - **Request user authorization (OAuth) during installation**: ✅ marca
   - **Webhook**: desmarca "Active"
   - **Permissions** → **Repository permissions**:
     - **Contents**: Read and write
     - **Metadata**: Read-only
     - **Pull requests**: Read and write
   - **Where can this GitHub App be installed?**: Only on this account
   - Clica em **"Create GitHub App"**

2. Na próxima tela:
   - **Copia o "App ID"** (número que aparece no topo)
   - Vai até **"Private keys"** → clica **"Generate a private key"** → baixa o `.pem`
   - Em **"Install App"** (menu lateral) → instala no seu repo `freedom-church-site`

3. **Me passa o App ID** (só o número) e o `.pem` por mensagem segura.
   ⚠️ **Não cole a private key direto no chat** — manda por email criptografado ou Signal.

4. Eu coloco a config no Cloudflare como secret e ativo o painel.

### Como usar depois de pronto

1. Acessa: `https://freedom-church-site.claytonribeirodossantos.workers.dev/admin/`
2. Clica em **"Entrar com GitHub"**
3. Autoriza com sua conta
4. Painel abre:
   - **Pregações** (edita lista do YouTube com metadados extra)
   - **Eventos** (cria/edita)
   - **Blog/Devocional** (cria/edita posts)
5. Edita o que quiser
6. Clica em **"Publicar"** → vai pro GitHub → Cloudflare rebuilda → ar em 2min

---

## 💰 7. Atualizar handles de doação (Zelle, Venmo, Cash App)

Os handles atuais são **placeholders**. Pra trocar pelos reais:

1. Acessa o arquivo: https://github.com/claytonribeirodossantos/freedom-church-site/edit/main/site/src/data/church.ts
2. Encontra essa seção:

```ts
giving: {
  zelle: {
    identifier: 'contato@ourfreedomchurch.com',  // ← troca aqui
    ...
  },
  venmo: {
    handle: '@ourfreedomchurch',                 // ← troca aqui
    url: 'https://venmo.com/u/ourfreedomchurch', // ← troca aqui
    ...
  },
  cashapp: {
    handle: '$ourfreedomchurch',                 // ← troca aqui
    url: 'https://cash.app/$ourfreedomchurch',   // ← troca aqui
    ...
  },
},
```

3. Substitui pelos valores reais da igreja
4. Embaixo: **"Commit changes"**
5. Site atualiza em ~2min

---

## 📧 8. Ativar formulários (oração + contato)

Os formulários estão prontos mas precisam de uma **access key gratuita** do Web3Forms pra começarem a chegar no email do pastor.

### Setup (5 minutos)

1. Acessa: https://web3forms.com
2. Coloca o email que quer receber as mensagens (ex: `pastor@ourfreedomchurch.com`)
3. Clica em **"Create Access Key"**
4. Confirma no email (clique no link que chega)
5. Copia a **access key** (uma string longa tipo `a1b2c3d4-e5f6-...`)
6. Acessa: https://github.com/claytonribeirodossantos/freedom-church-site/edit/main/site/src/data/church.ts
7. Encontra:

```ts
web3FormsAccessKey: 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY',
```

8. Troca pelo seu key:

```ts
web3FormsAccessKey: 'a1b2c3d4-e5f6-...',
```

9. **"Commit changes"** → site atualiza em 2min
10. Testa: vai em `/pedidos-de-oracao`, preenche e envia. Em ~30s chega no email.

---

## 🌐 9. Apontar `ourfreedomchurch.com` pro site

> ⚠️ **NÃO MEXER nos MX records (email)** — eles continuam intactos no Turbify/Yahoo.

### Forma A — Subdomínio (mais seguro)

Adiciona 1 registro DNS na Turbify:
- **Tipo**: CNAME
- **Nome/Host**: `preview` (ou `site`)
- **Valor/Aponta para**: `freedom-church-site.claytonribeirodossantos.workers.dev`
- **TTL**: 3600

Resultado: `preview.ourfreedomchurch.com` mostra o site novo.

### Forma B — Domínio principal

Mais complexo, requer migração de nameservers. Quando o pastor aprovar o site, peço ao Clayton e fazemos juntos.

---

## 🛟 10. Problemas comuns

### "Postei uma pregação no YouTube e não aparece no site"
- Espera 30 segundos e dá **F5** (recarrega a página)
- Se ainda não aparece, espera mais 2 minutos (cache Cloudflare)
- Se ainda não aparece, me chama

### "A bolinha 'AO VIVO' não pisca apesar de eu estar no ar"
- Verifica se o vídeo do live foi configurado como **"Público"** (não Privado/Não listado)
- Pode levar até 1 minuto pro site detectar
- Se persistir, me chama

### "Site fora do ar / erro 500"
- Acessa https://github.com/claytonribeirodossantos/freedom-church-site/actions
- Olha se o último deploy falhou (X vermelho)
- Me chama com o link do erro

---

## 📞 Contatos importantes

- **Desenvolvedor**: Clayton Ribeiro dos Santos
- **Repositório**: github.com/claytonribeirodossantos/freedom-church-site
- **Hospedagem**: Cloudflare Workers (dashboard requer login)
- **Domínio**: Turbify/Yahoo Small Business (login do pastor)

---

## 🚫 O que NUNCA mexer

- ❌ **MX records** do domínio (email do pastor)
- ❌ Senhas/tokens (.env, secrets do Cloudflare)
- ❌ `package.json` / `package-lock.json` (a não ser que saiba o que está fazendo)
- ❌ Pasta `node_modules/` (não precisa subir)
- ❌ Pasta `dist/` (é gerada automático)

Se tiver dúvida, sempre me chama antes. 🙏
