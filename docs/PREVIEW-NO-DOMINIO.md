# 🌐 Como apontar `preview.ourfreedomchurch.com` pro site (sem quebrar email)

> Vamos usar um **subdomínio** (`preview.ourfreedomchurch.com`) pro pastor testar.
> ✅ Email continua 100% funcionando — não tocamos nos MX records.
> ✅ Se algo der errado, é só deletar o registro DNS e voltar ao estado anterior.

---

## 🎯 O plano em 4 passos

### Passo 1 — Adicionar o Custom Domain no Cloudflare Worker (eu te guio)

1. Acessa: https://dash.cloudflare.com
2. Login com sua conta
3. No menu lateral, **"Workers & Pages"**
4. Clica no projeto **`freedom-church-site`**
5. Aba **"Settings"** ou **"Domains & Routes"**
6. Clica em **"Add"** ou **"Add Custom Domain"**
7. Digite: **`preview.ourfreedomchurch.com`**
8. Clica em **"Add Custom Domain"** ou **"Continue"**
9. Vai aparecer uma instrução tipo:

   > ⚠️ Add this CNAME record at your DNS provider:
   > 
   > **Name**: `preview`
   > **Target**: `freedom-church-site.claytonribeirodossantos.workers.dev`
   > (ou pode ser um valor `cfargotunnel.com` específico)

10. **Copia esse Target** (vou usar no Passo 2)

⚠️ **Manda print pra mim quando chegar nessa tela** — pra confirmar o Target exato. Cada conta Cloudflare pode dar um Target diferente.

---

### Passo 2 — Adicionar o CNAME no Turbify (você faz, com meu guia)

1. Login em https://login.turbify.com (ou onde quer que seja seu painel Turbify)
2. **Vai pra gestão de DNS** do domínio `ourfreedomchurch.com`
   - Geralmente menu: "Domínio" → "Gerenciar DNS" ou "Editar zona DNS"
3. Procura por opção **"Adicionar registro"** (Add Record)
4. Tipo: **CNAME**
5. Preenche:

   | Campo | Valor |
   |---|---|
   | **Host / Nome / Source** | `preview` (NÃO digite o domínio completo, só `preview`) |
   | **Aponta para / Target / Value** | (o que o Cloudflare mostrou no Passo 1) |
   | **TTL** | `3600` (1 hora) ou padrão |
   | **Tipo** | `CNAME` |

6. Salva o registro

---

### Passo 3 — Esperar a propagação DNS

- **Tempo**: geralmente **5–30 minutos**, pode levar até 2 horas em casos raros
- **Como testar**: abre o navegador e digita `preview.ourfreedomchurch.com`
- Se aparece o site: ✅ funcionou
- Se aparece erro: aguarde mais um pouco, depois me chama

---

### Passo 4 — (OPCIONAL) Adicionar página "Em construção" no domínio principal

Se você quer que `ourfreedomchurch.com` (sem `preview.`) mostre "Em breve" enquanto não migra oficialmente:

**Opção A — Mais simples**: deixa como está (Turbify pode estar mostrando algo)

**Opção B — Substitui por uma landing page bonita**:
1. Crio um arquivo HTML "Em construção" + redirect pro preview
2. Você faz upload no painel da Turbify (área de hospedagem)
3. Visitantes do domínio principal veem essa página
4. Email continua intacto

Me avisa se quer fazer a Opção B — preparo o HTML.

---

## ✅ O que NÃO vai acontecer (garantias)

- ❌ Email **NÃO** vai quebrar (MX records não são tocados)
- ❌ Domínio principal `ourfreedomchurch.com` **NÃO** muda enquanto não mexer nele
- ❌ Pagamentos online ligados ao email **continuam funcionando**
- ❌ Se preview der problema, é só **deletar o CNAME na Turbify** e tudo volta ao zero

## ✅ O que vai acontecer (resultado)

- ✅ `preview.ourfreedomchurch.com` mostra o site novo (mesmo conteúdo do `.workers.dev`)
- ✅ Pastor pode acessar e testar pelo celular ou computador
- ✅ URL profissional pra compartilhar com líderes da igreja
- ✅ SSL automático (cadeado verde no navegador)

---

## 🔧 Dúvidas comuns

### "Não acho onde mudar DNS na Turbify"
Manda print da tela onde está. Te guio passo a passo.

### "Já existe um registro chamado `preview`"
Provavelmente não existe (é incomum). Se existir, me manda print que avalio.

### "Posso fazer o mesmo com www.ourfreedomchurch.com?"
Sim. Mesma coisa, só troca `preview` por `www` no Passo 2. Mas atenção: se `www` já tinha um registro apontando pro Turbify hosting, vai trocar (e o site antigo deles vai parar). Por isso recomendo `preview` primeiro.

### "Como saber se o email continua funcionando?"
- Pede pra alguém enviar email pro pastor
- Ou pasor manda um email teste pra si mesmo
- Deve chegar normalmente (não tocamos em nada do email)

---

## 🚀 Quando pastor aprovar e quiser usar `ourfreedomchurch.com` (sem `preview.`)

Em outra rodada, fazemos:
- **Opção 1 (menos risco)**: mudar só o registro A da raiz, mantendo MX inalterados
- **Opção 2 (mais profissional)**: migrar nameservers pro Cloudflare (mantém MX automaticamente)

Em ambos, email **continua funcionando**. Eu te guio quando chegar a hora.

---

## 📞 Quando começar

Me avisa "vamos fazer o preview" que eu fico online te guiando passo-a-passo, com print de cada tela do Cloudflare e da Turbify.
