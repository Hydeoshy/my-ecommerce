# My E-Commerce - Frontend

Uma plataforma de e-commerce moderna built com **React 18+**, **TypeScript**, **Tailwind CSS**, e **TanStack Query**.

## 📋 Stack Instalado

### Core Dependencies
- **React**: 19.2.5
- **TypeScript**: 6.0.2
- **Tailwind CSS**: 4.2.2 (com @tailwindcss/postcss)
- **React Hook Form**: 7.72.1
- **Zod**: 4.3.6 (Validação)
- **@tanstack/react-query**: 5.99.0 (State Management)
- **Axios**: 1.15.0 (HTTP Client)

### Development Dependencies
- **Vite**: 8.0.8 (Build tool)
- **Vitest**: 4.1.4 (Unit Testing)
- **React Testing Library**: 16.3.2
- **MSW (Mock Service Worker)**: 2.13.2 (API Mocking)
- **ESLint**: 10.2.0 (Linting)
- **Prettier**: 3.8.2 (Code Formatting)

## 🚀 Comandos Disponíveis

```bash
# Development
npm run dev          # Inicia o servidor de desenvolvimento (porta 3000)

# Build & Preview
npm run build        # Compila TypeScript e constrói para produção
npm run preview      # Visualiza o build de produção localmente

# Testing
npm run test         # Executa os testes
npm run test:ui      # Executa os testes com UI visual
npm run test:coverage # Gera relatório de cobertura

# Code Quality
npm run lint         # Verifica linting
npm run lint:fix     # Corrige problemas de linting automaticamente
npm run format       # Formata o código com Prettier
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── ui/              # Componentes básicos reutilizáveis
├── features/            # Componentes de negócio por feature
├── hooks/               # Custom hooks
├── services/            # Integração com Axios e API
├── types/               # Tipings TypeScript
├── styles/              # Estilos globais
├── mocks/               # MSW handlers para testes
├── __tests__/           # Setup de testes
├── App.tsx
└── main.tsx

public/                 # Arquivos estáticos
dist/                   # Build final (gerado)
```

## 🎯 Princípios Arquiteturais

### Feature-Driven Architecture
```
Component (View) → Custom Hook (Logic) → Service (API/Gateway) → Axios
```

### Regras Principais
- ✅ TypeScript **strict mode** (sem `any`)
- ✅ Validação com **Zod** antes do estado React
- ✅ Sem `useEffect` direto para API calls (use Custom Hooks)
- ✅ Tailwind CSS para 99% dos casos
- ✅ Testes unitários para hooks e componentes
- ✅ WCAG acessibilidade

## 🧪 Testing

O projeto usa:
- **Vitest**: Framework de testes
- **React Testing Library**: Testes de componentes
- **MSW**: Mocking de chamadas de API

Com setup automático em `src/__tests__/setup.ts`

## 🔧 Configuração de Paths

Use imports com alias `@` no projeto:

```typescript
import { Button } from '@components/ui/Button'
import { useProducts } from '@hooks/useProducts'
import { api } from '@services/api'
```

## 📝 Path Aliases Disponíveis

- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@features/*` → `src/features/*`
- `@hooks/*` → `src/hooks/*`
- `@services/*` → `src/services/*`
- `@types/*` → `src/types/*`
- `@styles/*` → `src/styles/*`

## 🌐 Integração com Backend

O backend já está desenvolvido. Configure o URL da API no `.env`:

```env
VITE_API_URL=http://localhost:3001
```

### Configurando Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edite `.env.local` com seus valores locais:
   ```env
   VITE_API_URL=http://localhost:3001
   VITE_API_TIMEOUT=30000
   VITE_ENV=development
   ```

**Nota**: Arquivos `.env.local` e `.env` nunca são versionados (ver `.gitignore`). Sempre use `.env.example` para documentar as variáveis necessárias.

## 📖 Workflow Típico para Novas Features

1. Defina types em `src/types/`
2. Crie o custom hook em `src/hooks/`
3. Implemente o serviço em `src/services/`
4. Desenvolva os componentes em `src/features/feature-name/`
5. Adicione testes
6. Valide a feature com `npm run lint` e `npm run test`

## ✨ Next Steps

Agora você pode:
1. Criar a **branch-test**
2. Começar a developing das features do e-commerce
3. Integrar com o backend

Pronto para começar! 🚀
