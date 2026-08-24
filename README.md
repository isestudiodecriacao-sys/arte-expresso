# 🎨 Arte Expresso — E-commerce de Quadros Pintados Sob Medida

> **Plataforma de alta conversão para ateliê e galeria de arte com fechamento direto no WhatsApp e Painel de Gestão Administrativo.**

- **Instagram Oficial:** [@arte.expresso](https://www.instagram.com/arte.expresso/)
- **WhatsApp Comercial:** `(11) 95793-4714` (`5511957934714`)

---

## 🌟 Principais Funcionalidades

1. **Simulador Sob Medida Interativo (5 Passos):**
   - Escolha do Estilo (Texturizado 3D, Folha de Ouro 24k, Abstrato Contemporâneo, Minimalista Linho/Fendi, Retratos Realistas e Artes Personalizadas).
   - Formatos e Dimensões (Tamanhos populares ou medidas customizadas em centímetros).
   - Molduras Flutuantes Filete Premium (Dourada, Preta Fosca, Madeira Freijó, Branca, Prata ou Borda Infinita).
   - Paleta de Cores & Seleção do Ambiente (Sala de Estar, Jantar, Quarto, Hall, etc.).
   - **Gerador de Mensagem Inteligente:** Envia todas as escolhas formatadas com 1 clique direto para o WhatsApp `11957934714`.

2. **Simulador de Parede Virtual ("Veja no Ambiente"):**
   - Permite alterar a cor da parede (Fendi, Cimento Queimado, Off-white, Terracota, Chumbo, Marinho, Verde Oliva).
   - Permite alternar a mobília (Sofá, Aparador, Cabeceira Queen).
   - Botão direto para pedir aquela composição específica no WhatsApp.

3. **Catálogo de Inspirações com Filtros Rápidos:**
   - Grid com fotos em alta resolução, técnicas detalhadas, tags de destaque e botão direto "Pedir no WhatsApp".

4. **Painel de Gestão Administrativo (`/admin` ou `admin.html`):**
   - Controle total do catálogo de obras: adicionar, editar preços, alterar fotos, criar tags e excluir.
   - Sincronização em tempo real via `localStorage`.
   - Botão de **Exportar JS / Backup** para salvar permanentemente no arquivo `catalog-data.js`.
   - Acesso seguro protegido por PIN (PIN padrão: **`123456`**).

---

## 🚀 Como Subir no GitHub e na Vercel

### 1. Subir no GitHub

Abra o terminal no diretório do projeto (`ARTE EXPRESS`) e execute os comandos:

```bash
# 1. Inicializar o repositório Git
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Criar o primeiro commit
git commit -m "feat: lancamento do ecommerce arte expresso com simulador whatsapp e painel admin"

# 4. Criar o branch principal main
git branch -M main

# 5. Conectar com o seu repositório no GitHub (crie um repo vazio no github.com e substitua o link abaixo):
git remote add origin https://github.com/SEU-USUARIO/arte-expresso.git

# 6. Enviar os arquivos
git push -u origin main
```

---

### 2. Subir na Vercel

Você pode publicar na Vercel de **duas formas extremamente simples**:

#### Opção A — Conectando pelo site da Vercel (Recomendado):
1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. Clique em **"Add New..."** ➜ **"Project"**.
3. Selecione o repositório **`arte-expresso`** que você acabou de subir no GitHub.
4. Clique em **"Deploy"** (as configurações do `vercel.json` já estão 100% prontas).
5. Pronto! Em 30 segundos seu site estará no ar com HTTPS gratuito e CDN global ultra rápida.

#### Opção B — Pelo Terminal (Vercel CLI):
```bash
# Instalar a CLI da Vercel (se ainda não tiver)
npm install -g vercel

# Executar o deploy
vercel

# Para deploy final de produção
vercel --prod
```

---

## ⚙️ Acessando o Painel de Gestão

- **URL Local:** `http://localhost:3000/admin.html` (ou abra `admin.html` diretamente no navegador).
- **URL na Vercel:** `https://seu-dominio.vercel.app/admin`
- **PIN de Acesso Inicial:** `123456`

---

## 📁 Estrutura de Arquivos

```
ARTE EXPRESS/
├── index.html              # Loja e Landing Page de Alta Conversão
├── admin.html              # Painel Administrativo de Gestão de Produtos
├── vercel.json             # Configurações de rotas e deploy da Vercel
├── package.json            # Metadados e scripts
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Documentação completa
├── css/
│   └── styles.css          # Estilos luxuosos, molduras e visualizador
└── js/
    ├── catalog-data.js     # Banco de dados de obras e estilos
    ├── whatsapp-service.js # Integração e formatação para WhatsApp 11957934714
    └── app.js              # Lógica do simulador, filtros e reatividade
```

---

## 📞 Suporte e Contato

- **WhatsApp Comercial:** [(11) 95793-4714](https://wa.me/5511957934714)
- **Instagram:** [@arte.expresso](https://www.instagram.com/arte.expresso/)
