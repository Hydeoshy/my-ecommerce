# AGENTS-FRONTEND.md – E-COMMERCE

## Architecture Overview
**Feature-Driven Architecture** com separação clara de responsabilidades. O fluxo de dados deve ser:
`Component (View) → Custom Hook (Logic) → Service (API/Gateway) → Axios/Fetch`

**Princípio Chave**: Componentes visuais não devem conhecer a lógica de negócio ou detalhes de implementação da API.

---

## Layer-Specific Rules

### 1. **Component Layer** (`src/components/` & `src/features/`)
- **Atomic Design Lite**: Use `components/ui` para componentes básicos (botões, inputs) e `features/` para componentes de negócio.
- **Responsividade**: **MUST** usar Tailwind CSS (mobile-first).
- **Acessibilidade**: Devem seguir padrões WCAG (uso de `aria-labels`, contraste adequado).
- **Regra**: Proibido usar `useEffect` para chamadas de API diretamente no componente. Use Hooks.

### 2. **Hook Layer** (`src/hooks/` & `src/features/feature-name/hooks/`)
- **Responsabilidade**: Gerenciamento de estado e efeitos.
- **Clean Code**: Transformar lógicas complexas de formulários ou cálculos em Custom Hooks reutilizáveis.
- **Exemplo**: `useProcessPayment.ts` encapsula a lógica de chamar o gateway e gerenciar estados de `loading` e `error`.

### 3. **Service Layer** (`src/services/`)
- **Mapper**: Assim como no backend, transforme o `snake_case` da API (Mercado Pago) para `camelCase` do Front-End aqui.
- **Gateway**: Isole a configuração do Axios ou SDKs externos.
- **Validação**: Use **Zod** para validar o schema das respostas da API antes de chegarem ao estado do React.

### 4. **Styles Layer** (`Tailwind CSS`)
- **Preferência**: Tailwind para 99% dos casos.
- **Custom CSS**: Apenas se estritamente necessário em `src/styles/` usando CSS Modules.
- **Temas**: Use variáveis do Tailwind (`tailwind.config.js`) para cores e espaçamentos.

---

## Data Models & TypeScript

### **Interfaces & Types**
- **Localização**: `src/types/` ou dentro da feature correspondente.
- **Naming**: Use `PaymentOrder` para entidades de domínio e `PaymentRequestDTO` para dados de envio.
- **Strictness**: Proibido o uso de `any`. Use tipos genéricos ou `unknown` se necessário.

---

## Testing Pattern (Unit & Integration)
- **Ferramentas**: Vitest + React Testing Library.
- **Mocking**: Use MSW (Mock Service Worker) para simular chamadas de API em testes de integração.
- **Regra**: Cada novo componente de UI deve ter um teste de renderização e cada Hook de negócio deve ter um teste unitário cobrindo casos de sucesso e erro.

---

## Common Workflows

### **Adicionando uma Nova Tela de Checkout**
1. Defina as rotas no `src/routes/`.
2. Crie o componente de UI em `src/features/checkout/components/`.
3. Crie o Custom Hook `useCheckout` para gerenciar o estado do formulário (React Hook Form + Zod).
4. Implemente a chamada no Service correspondente.
5. Adicione testes unitários para o Hook e para o componente de formulário.

---

## Key Files Reference

| Purpose | Directory/File |
|---------|---------|
| UI Base (Botões, Cards) | `src/components/ui/` |
| Lógica de Negócio por Feature | `src/features/{feature}/hooks/` |
| Integração API (Axios/Services) | `src/services/` |
| Tipagem Global | `src/types/` |
| Configuração Tailwind | `tailwind.config.js` |

---

## Stack Versions
- **React**: 18+ (Hooks, Suspense)
- **TypeScript**: 5.0+
- **Tailwind CSS**: 3.0+
- **Forms**: React Hook Form + Zod
- **State Management**: Context API ou TanStack Query (para server-state).

---

## Security & Configuration Guidelines

### **Deprecated Features & Security**
- **CRÍTICO**: Nunca ignorar ou desabilitar avisos de depreciação de features.
- **Razão**: Arquivos depreciados podem expor vulnerabilidades de segurança no projeto.
- **Ação**:
  - Sempre resolver avisos de depreciação migrandos para as soluções recomendadas.
  - Manter o projeto atualizado com as práticas contemporâneas.
  - Relatar à equipe caso encontre deprecações críticas que não possam ser resolvidas imediatamente.
  - **Nunca** usar `ignoreDeprecations` ou similares para silenciar avisos.

### **TypeScript Configuration**
- **module**: Use `ESNext` para melhor tree-shaking e compatibilidade com bundlers.
- **moduleResolution**: Use `'bundler'` - é a escolha moderna para projetos com Vite/Webpack.
- **paths**: Usar caminhos relativos (ex: `"@/*": ["./src/*"]`) sem necessidade de `baseUrl`.
- **baseUrl**: Não utilize - está deprecado, use paths relativos no lugar.
- **resolveJsonModule**: Habilitado para importar JSONs diretamente.
- **Sempre validar** avisos de compilação e configuração antes de deploy.

#### TypeScript 7.0 Migration Notes
- ✅ Removido `ignoreDeprecations: "6.0"`
- ✅ Removido `baseUrl` (deprecado)
- ✅ Configuração sem warnings de depreciação
- 📅 Plano: Monitorar TypeScript 7.0 para futuras melhorias

### **.gitignore Maintenance & Secrets Protection**

**CRÍTICO**: Manter `.gitignore` atualizado é essencial para evitar expor informações sensíveis.

#### Regras de Ouro
- **NUNCA** commitar arquivos `.env*` com credentials/secrets
- **NUNCA** commitar configs locais (`.vscode/settings.json`, `.idea/`, IDE configs)
- **NUNCA** commitar node_modules, dist, build artifacts
- **SEMPRE** usar `.env.example` como template documentado (SEM valores sensíveis)

#### Arquivos que NUNCA devem subir
```
# Secrets & Credentials
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE & Local Config
.vscode/settings.json
.vscode/extensions.json
.idea/
.sublime-project
.sublime-workspace

# Build & Dependencies
node_modules/
dist/
build/
.cache/

# Debug & Logs
npm-debug.log*
yarn-debug.log*
.DS_Store
Thumbs.db

# Temporary files
tmpclaude-*
tmp*
```

#### Como Proceder com Novos Arquivos
1. Se criar novo arquivo de config local → adicione ao `.gitignore`
2. Se adicionar nova variável de ambiente → documente em `.env.example`
3. Se instalar novo package → `.gitignore` é atualizado automaticamente via `.npmrc` ou similar
4. **Sempre verificar** antes de fazer commit: `git status` deve mostrar limpo

#### Verificação de Segurança
```bash
# Verificar o que será commitado
git diff --cached

# Verificar arquivos rastreados vs ignorados
git status

# NUNCA fazer commit de .env!
# Se acidentalmente commitou, remova do histórico:
git rm --cached .env
```

#### .env.example - Documentação Segura
- ✅ Sempre commitar `.env.example`
- ✅ Documentar TODAS as variáveis necessárias
- ✅ Usar valores dummy/placeholders (nunca valores reais)
- ✅ Adicionar comentários explicativos

---

## 6. Ciclo de Autoaprendizado e Evolução

Para garantir que o agente se torne uma "powerhouse" cada vez mais eficiente, devem ser aplicadas as seguintes regras de feedback:

* **Validação de Implementação**: Após sugerir um código ou refatoração, o agente deve perguntar se a abordagem atendeu às expectativas e aos padrões do projeto.
* **Loop de Feedback**: Se o desenvolvedor ajustar a sugestão do agente, o agente deve "aprender" esse novo padrão e utilizá-lo como base para futuras interações.
* **Atualização do Manifesto**: Sempre que um novo padrão for consolidado (ex: uma nova forma de lidar com estados globais ou um padrão de animação específico), o agente deve sugerir a atualização do ficheiro .md para incluir a nova diretriz.
* **Consistência Contextual**: O agente deve utilizar a capacidade de "ler" o projeto para identificar padrões recorrentes que ainda não foram documentados e sugerir a sua formalização no guia.