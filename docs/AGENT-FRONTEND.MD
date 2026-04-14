# Agent Frontend - Documentação

## Paleta de Cores (cor 3)

Paleta de cores definida para o projeto E-commerce:

| Cor | Hexadecimal | Uso |
|-----|-------------|-----|
| Branco | `#FFFFFF` | Fundo principal, cards, elementos claros |
| Amarelo/Ouro | `#FFD300` | Botões de ação, destaques, chamados |
| Cinza | `#757B81` | Elementos secundários, borders |
| Cinza Escuro | `#262B32` | Texto principal, backgrounds escuros |
| Preto | `#090C11` | Fundo, contraste máximo |

### Uso Recomendado:
- **Fundo da página:** #FFFFFF ou #262B32
- **Botões primários:** #FFD300 com texto em #262B32 ou #090C11
- **Texto:** #262B32 em fundos claros, #FFFFFF em fundos escuros
- **Borders/Divisores:** #757B81
- **Links/Hover:** #FFD300

---

## Capacidades do Agent Frontend

O agente de frontend é capaz de:

### 📄 Leitura de Dados
- ✅ **Leitura de PDFs** — análise de protótipos, documentos
- ✅ **Leitura de Imagens** — PNG, JPG, visualização de designs
- ✅ **Leitura de Arquivos** — JSON, YAML, Markdown, código-fonte
- ✅ **Análise de Screenshots** — capturas de tela e wireframes

### 🛠️ Funcionalidades
- ✅ Criação de componentes React/Vue
- ✅ Análise de design e UX
- ✅ Desenvolvimento de páginas
- ✅ Integração com APIs
- ✅ Debugging e otimização
- ✅ Documentação de componentes

---

## Arquitetura Frontend

### Estrutura de Pastas
```
src/
├── components/      # Componentes reutilizáveis
├── features/        # Funcionalidades/páginas
├── hooks/          # Custom hooks
├── services/       # Serviços (API, auth, etc)
├── types/          # TypeScript types
├── App.tsx         # Componente raiz
└── index.tsx       # Entrada da aplicação
```

---

## Estrutura de Componentes ✅ (Status)

### Componentes Base (UI) ✅ CONCLUÍDO + CORES AMARELO
- [x] Button - Amarelo #FFD300
- [x] Card
- [x] Badge
- [x] Rating
- [x] Input
- [x] Select
- [x] Modal
- [x] Toast - Cores atualizadas
- [x] Pagination
- [x] Breadcrumb - Amarelo
- [x] ProductCard - Amarelo
- [x] Carousel - **NOVO** 
- [x] CountdownTimer - **NOVO**

### Componentes Específicos da Home ✅ EM PROGRESSO
- [x] Header - Amarelo #FFD300
- [x] Footer - Amarelo #FFD300
- [x] HeroBanner - **NOVO**
- [x] CategoriesGrid - **NOVO**
- [x] ProductCarousel - **NOVO**
- [x] BestDealsSection - **NOVO**
- [x] SectionHeader - **NOVO**
- [x] BestSellerSection - **NOVO**
- [x] NewsletterSignup - **NOVO**
- [x] TrustSignals - **NOVO**
- [ ] BlogSection
- [ ] Testimonial
- [ ] PopularBrandsSection
- [ ] SuggestTodaySection

### Estrutura Pastas Atualizada ✅
```
_legacy/                       (⚠️ NÃO USAR - Código antigo em .js)
├── components/
│   └── ui/                    (Componentes .js antigos)
└── features/
    └── shared/                (Features antigas .js)

src/
├── components/
│   └── ui/                    (✅ ATIVO - TypeScript)
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Carousel.tsx ✅
│       ├── CountdownTimer.tsx ✅
│       ├── ProductCard.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Modal.tsx
│       ├── Runtime.tsx
│       ├── Pagination.tsx
│       ├── Breadcrumb.tsx
│       ├── Toast.tsx
│       └── index.ts
│
├── features/
│   ├── shared/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── NewsletterSignup.tsx ✅
│   │   │   ├── TrustSignals.tsx ✅
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   └── home/                  (✅ NOVO)
│       ├── components/
│       │   ├── HeroBanner.tsx ✅
│       │   ├── CategoriesGrid.tsx ✅
│       │   ├── ProductCarousel.tsx ✅
│       │   ├── BestDealsSection.tsx ✅
│       │   ├── SectionHeader.tsx ✅
│       │   ├── BestSellerSection.tsx ✅
│       │   └── index.ts
│       └── index.ts
```
- [ ] NewsletterSection

---

## 📋 Stack & Padrões

**Stack**: React 19 + TypeScript + Tailwind CSS 4
**Padrão**: Atomic Design (base → compostos → features)
**Cores**: Ver arquivo `docs/COLORS.md` e `docs/DESIGN-SYSTEM.md`

---

## Próximas Etapas

- [ ] Criar componentes base (Button, Card, Badge, Rating)
- [ ] Implementar Header e Footer
- [ ] Criar ProductCard com todas as variações
- [ ] Desenvolver seções da Home Page
- [ ] Integração com API backend
- [ ] Formulários (Login, Checkout)
- [ ] Carrinho de compras
- [ ] Detalhes do produto
