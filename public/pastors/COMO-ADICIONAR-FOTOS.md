# Como adicionar fotos dos pastores

A página `/lideranca` está pronta pra mostrar fotos dos pastores. Enquanto não tem foto, ela mostra um placeholder bonito com as iniciais.

## 📥 Como adicionar as fotos reais

### 1. Baixe as fotos do Instagram

**Pastor Adaelton:** https://www.instagram.com/adaelton_desouza/
**Pastora Jheini:** https://www.instagram.com/jheinidesouza/

Como baixar (no celular):
1. Abre o perfil do Instagram no app
2. Toca na foto de perfil pra ver em tamanho grande
3. Print da tela (Volume baixo + Power)
4. Salva no celular
5. Manda pra você por WhatsApp ou Google Drive

Ou no computador:
1. Abre o perfil no navegador
2. Botão direito na foto de perfil → "Salvar imagem como..."
3. Salva na pasta de Downloads

### 2. Renomeia e move pra cá

Salva os arquivos exatamente com esses nomes:
- `adaelton.jpg` — foto do Pastor Adaelton de Souza
- `jheini.jpg` — foto da Pastora Jheini de Souza

Move pra esta pasta: **`site/public/pastors/`**

(É a mesma pasta onde está este arquivo)

### 3. Recomendações de foto

Pra ficar bonito:
- **Formato vertical** (4:5, ex: 800×1000px) ou quadrado
- **Rosto centralizado**, com algum espaço acima da cabeça
- **Foto bem iluminada** (luz natural se possível)
- **Sem outras pessoas no quadro** (corta se necessário)
- **Sem texto sobreposto**

### 4. Commit e push

Depois de salvar, no terminal:
```bash
cd site
git add public/pastors/
git commit -m "Adicionar fotos dos pastores"
git push
```

O Cloudflare rebuilda em ~2min e as fotos aparecem automaticamente.

## ⚙️ Como funciona

Se a foto NÃO existe, a página mostra um placeholder com as iniciais do pastor em um gradiente dourado. Quando você adiciona o arquivo `.jpg`, ele substitui o placeholder automaticamente (sem precisar mexer no código).
