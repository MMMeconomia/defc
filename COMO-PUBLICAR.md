# Diagnóstico de Clareza Patrimonial
## Como publicar no Vercel — passo a passo

---

### O que você vai precisar
- Uma conta gratuita no GitHub (github.com)
- Uma conta gratuita no Vercel (vercel.com)
- Os arquivos desta pasta

---

### PASSO 1 — Criar repositório no GitHub

1. Acesse **github.com** e faça login
2. Clique no botão verde **"New"** (canto superior esquerdo)
3. Em "Repository name", escreva: `clareza-patrimonial`
4. Deixe como **Public**
5. Clique em **"Create repository"**

---

### PASSO 2 — Subir os arquivos

Após criar o repositório, o GitHub vai mostrar uma página com instruções.
Clique em **"uploading an existing file"** (link azul no meio da página).

Arraste **todos os arquivos e pastas** desta pasta para a área de upload:
```
clareza-patrimonial/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    └── App.jsx
```

> ⚠️ Importante: a pasta `src` precisa ser enviada com seus arquivos dentro.

Clique em **"Commit changes"** (botão verde no final da página).

---

### PASSO 3 — Publicar no Vercel

1. Acesse **vercel.com** e clique em **"Sign Up"**
2. Escolha **"Continue with GitHub"** — isso conecta as duas contas
3. Na dashboard do Vercel, clique em **"Add New Project"**
4. Encontre o repositório `clareza-patrimonial` e clique em **"Import"**
5. Na tela de configuração:
   - **Framework Preset**: selecione **Vite**
   - Todo o resto pode ficar como está
6. Clique em **"Deploy"**

Aguarde cerca de 1 minuto. O Vercel vai gerar um link como:
```
https://clareza-patrimonial.vercel.app
```

---

### PASSO 4 — Usar no Instagram

**Link na bio:**
Cole o link gerado diretamente na bio do Instagram.
Sugestão de texto: *"Diagnóstico gratuito: você tem clareza do seu patrimônio?"*

**Stories (mais eficaz):**
1. Grave um Story falando uma das frases de reconhecimento da ferramenta
   Ex: *"Você já disse para si mesma: 'vou cuidar disso quando tiver tempo'?"*
2. Adicione o **Link Sticker** apontando para o seu link do Vercel
3. Finalize com: *"Diagnóstico gratuito — link aqui"*

---

### Personalizar o link (opcional)

Se quiser um link mais profissional como `diagnostico.seusite.com.br`:
- No painel do Vercel, vá em **Settings → Domains**
- Adicione seu domínio personalizado
- O Vercel mostra as instruções de configuração DNS

---

### Dúvidas frequentes

**Posso editar as perguntas?**
Sim. Abra o arquivo `src/App.jsx` no GitHub, clique no ícone de lápis (editar),
faça as alterações e clique em "Commit changes". O Vercel republica automaticamente.

**O link vai sair do ar?**
Não. O plano gratuito do Vercel é permanente para projetos pessoais.

**Quantas pessoas podem acessar?**
O plano gratuito suporta até 100GB de tráfego por mês — mais do que suficiente.
