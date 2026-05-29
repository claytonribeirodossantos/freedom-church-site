# 🌐 Apontar ourfreedomchurch.com pro site (Cloudflare) — com modo manutenção

> Objetivo: domínio próprio no ar, **público vê "Em breve"**, equipe testa no `.workers.dev`.
> Regra de ouro: **NÃO derrubar o email** (MX da Yahoo/Turbify).

## 🔒 O que NÃO pode sumir (email do pastor)
- **MX:** `mx-biz.mail.am0.yahoodns.net` — preferências **20** e **30**
- Qualquer **TXT** de SPF/verificação (conferir no momento da migração)
- Snapshot completo: `docs/dns-snapshot-pre.txt`

---

## PARTE 1 — Adicionar o domínio na Cloudflare
1. Entrar em https://dash.cloudflare.com (mesma conta do Worker `freedom-church-site`).
2. Botão **"Add a domain"** (ou "Add site") → digitar `ourfreedomchurch.com` → plano **Free**.
3. A Cloudflare **escaneia e importa** os registros DNS atuais. **CONFERIR na lista:**
   - ✅ Os 2 **MX** `mx-biz.mail.am0.yahoodns.net` (pref 20 e 30) aparecem?
   - ✅ Algum **TXT** (SPF) que existia aparece?
   - ❌ Se faltar qualquer MX/TXT → **adicionar manualmente ANTES de seguir** (comparar com `dns-snapshot-pre.txt`).
4. A Cloudflare mostra **2 nameservers** novos (ex: `xxx.ns.cloudflare.com`). Anotar os dois.

## PARTE 2 — Trocar os nameservers na Turbify
5. Entrar na Turbify (conta do Clayton) → painel do domínio `ourfreedomchurch.com` → **Nameservers / DNS**.
6. Trocar `ns1.turbify.com` e `ns2.turbify.com` pelos **2 da Cloudflare**.
7. Salvar. Propagação: de minutos até algumas horas.

## PARTE 3 — Conectar o domínio ao site (Worker)
8. Cloudflare → **Workers & Pages** → `freedom-church-site` → **Settings** → **Domains & Routes** → **Add → Custom Domain**.
9. Adicionar `ourfreedomchurch.com` e `www.ourfreedomchurch.com`. SSL é automático.

## PARTE 4 — Conferir (importante!)
10. Abrir `https://ourfreedomchurch.com` → deve mostrar a **página "Em breve"**.
11. Abrir `https://ourfreedomchurch.com/?preview` → deve mostrar o **site real** (e libera aquele navegador).
12. **Testar o email:** mandar um email de teste pra `contato@ourfreedomchurch.com` e confirmar que chega. (MX intacto.)

## 🚀 LANÇAR (quando estiver pronto pro público)
- Abrir `src/config.ts`, trocar `maintenance: true` → `maintenance: false`, commit.
- A partir daí, `ourfreedomchurch.com` mostra o site completo pra todos.

## ↩️ Reverter (emergência)
- Se algo der errado, voltar os nameservers na Turbify pra `ns1.turbify.com` / `ns2.turbify.com`.
  O DNS volta ao estado anterior (email e tudo) em minutos/horas.
