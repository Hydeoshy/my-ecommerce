# 📊 Análise de Componentes - Relatório Completo

## ✅ Componentes Existentes (.tsx)

### UI Base
- [x] Button.tsx - ⚠️ **CORES A ALTERAR** (verde → amarelo)
- [x] Card.tsx - ✅ Neutro (branco)
- [x] Badge.tsx - ⚠️ **CORES A ALTERAR** (badges semânticas OK, mas warning etc)
- [x] Input.tsx - ✅ Neutro
- [x] Select.tsx - ✅ Neutro
- [x] Rating.tsx - ⚠️ **CORES A ALTERAR** (verde → amarelo para estrelas)
- [x] Breadcrumb.tsx - ⚠️ **CORES A ALTERAR**
- [x] Pagination.tsx - ⚠️ **CORES A ALTERAR**
- [x] Modal.tsx - ⚠️ **CORES A ALTERAR**
- [x] ProductCard.tsx - ⚠️ **CORES A ALTERAR** (verde → amarelo em 3 lugares)
- [x] Toast.tsx - ⚠️ **CORES A ALTERAR**
- [x] useToast.tsx - ✅ Hook

### Features (Shared)
- [x] Header.tsx - ⚠️ **CORES A ALTERAR** (MUITOS verdes para alterar)
- [x] Footer.tsx - ⚠️ **CORES A ALTERAR** (verdes para amarelo)
- [x] Layout.tsx - ✅ Neutro

---

## ❌ Componentes FALTANDO

### UI Base Necessários
- [ ] **Carousel.tsx** - Slider de produtos (CRÍTICO) - usado em Hero, Featured, Brands, Pre-order
- [ ] **CountdownTimer.tsx** - Timer regressivo (CRÍTICO) - usado em Best Deals
- [ ] **SearchBar.tsx** - Busca com categorias
- [ ] **CategoryDropdown.tsx** - Dropdown de categorias
- [ ] **SectionHeader.tsx** - Title + View All link (reutilizável)

### Features Necessários
- [ ] **HeroBanner.tsx** - Com carousel, promo text, CTAs
- [ ] **CategoriesGrid.tsx** - Grid de 12 categorias
- [ ] **ProductCarousel.tsx** - Carousel de produtos específico
- [ ] **BestDealsSection.tsx** - Com timer + grid de produtos
- [ ] **BestSellerSection.tsx** - Com filter pills + product grid
- [ ] **PopularBrandsSection.tsx** - Carousel de marcas
- [ ] **SuggestTodaySection.tsx** - Com filter pills
- [ ] **BlogSection.tsx** - Com artigos + testimonials
- [ ] **NewsletterSignup.tsx** - Newsletter section
- [ ] **TrustSignals.tsx** - Info bar (shipping, money back, etc)
- [ ] **Testimonial.tsx** - Card de testimunhos de cliente

### Total FALTANDO: **16 componentes**

---

## 🎨 Alterações de Cores NECESSÁRIAS

### Mapeamento: Verde → Amarelo

| Verde (Atual) | Amarelo (Correto) | Onde encontrar |
|---------------|-------------------|---|
| `bg-green-600` | `bg-yellow-400` | Button, Header, Footer buttons |
| `hover:bg-green-700` | `hover:bg-yellow-500` | Button hover, links |
| `text-green-600` | `text-yellow-400` | ProductCard price, Footer links |
| `hover:text-green-600` | `hover:text-yellow-400` | Links, hovers |
| `border-green-600` | `border-yellow-400` | Button outline |
| `focus:ring-green-500` | `focus:ring-yellow-400` | Focus states |
| `bg-green-50` | `bg-yellow-50` | Button outline hover |
| `focus:ring-green-600` | `focus:ring-yellow-400` | Input focus |
| `text-green-800` | `text-yellow-700` | Badge warning |
| `text-green-400` | `text-yellow-300` | Footer links |
| `bg-green-700` | `bg-yellow-500` | Category bar select |

---

## 📁 Reorganização da Estrutura

### Problema Atual
```
src/components/ui/
├── Button.tsx      ✅ Novo
├── Button.js       ❌ Legado (duplicado)
├── Card.tsx        ✅ Novo
├── Card.js         ❌ Legado (duplicado)
├── ... (TODOS duplicados)
└── index.js        ❌ Legado
```

### Solução: Separar em pastas

```
src/components/
├── ui/             (TypeScript - ATIVO)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Rating.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Breadcrumb.tsx
│   ├── Pagination.tsx
│   ├── Modal.tsx
│   ├── ProductCard.tsx
│   ├── Toast.tsx
│   ├── Carousel.tsx      (NOVO)
│   ├── CountdownTimer.tsx (NOVO)
│   ├── SearchBar.tsx     (NOVO)
│   └── index.ts
│
└── ui-legacy/      (JavaScript - NÃO USAR)
    ├── Button.js
    ├── Card.js
    ├── Badge.js
    ├── ... (todos os .js antigos)
    └── index.js
    
src/features/
├── shared/         (Componentes compartilhados)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── NewsletterSignup.tsx    (NOVO)
│   │   ├── TrustSignals.tsx        (NOVO)
│   │   └── index.ts
│   └── index.ts
│
├── home/           (NOVO - Home Page sections)
│   ├── components/
│   │   ├── HeroBanner.tsx
│   │   ├── CategoriesGrid.tsx
│   │   ├── BestDealsSection.tsx
│   │   ├── BestSellerSection.tsx
│   │   ├── PopularBrandsSection.tsx
│   │   ├── SuggestTodaySection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── Testimonial.tsx
│   │   └── index.ts
│   └── index.ts
│
└── (outras features conforme necessário)
```

---

## 🚀 Plano de Ação (Ordem)

### Fase 1: CORES (Hoje)
1. [ ] Button.tsx - alterar 4 linhas (green → yellow)
2. [ ] ProductCard.tsx - alterar 2 linhas (green → yellow)
3. [ ] Header.tsx - alterar 6 linhas (green → yellow)
4. [ ] Footer.tsx - alterar 8 linhas (green → yellow)
5. [ ] Badge.tsx - verificar badges (já OK)
6. [ ] Rating.tsx - alterar stars para yellow
7. [ ] Breadcrumb.tsx - alterar
8. [ ] Pagination.tsx - alterar
9. [ ] Modal.tsx - alterar
10. [ ] Toast.tsx - alterar

### Fase 2: ESTRUTURA (Hoje)
1. [ ] Criar pasta `ui-legacy/` em src/components/
2. [ ] Mover todos os `.js` para `ui-legacy/`
3. [ ] Criar pasta `home/` em src/features/
4. [ ] Atualizar imports nos arquivos `.ts` se necessário

### Fase 3: COMPONENTES FALTANDO (Próximos)
1. [ ] Carousel.tsx
2. [ ] CountdownTimer.tsx
3. [ ] SearchBar.tsx
4. [ ] CategoryDropdown.tsx
5. [ ] SectionHeader.tsx
6. [ ] HeroBanner.tsx
7. [ ] CategoriesGrid.tsx
8. [ ] BestDealsSection.tsx
9. [ ] BestSellerSection.tsx
10. [ ] PopularBrandsSection.tsx
11. [ ] SuggestTodaySection.tsx
12. [ ] BlogSection.tsx
13. [ ] NewsletterSignup.tsx
14. [ ] TrustSignals.tsx
15. [ ] Testimonial.tsx
16. [ ] ProductCarousel.tsx

---

## 📝 Resumo

- **Componentes OK**: 13 (.tsx + hooks)
- **Componentes com CORES a alterar**: 12
- **Componentes FALTANDO**: 16
- **Arquivos .js LEGADO**: 12 (devem ser movidos/ignorados)
- **Pastas a criar**: 2 (ui-legacy, home/components)

**Tempo estimado:**
- Cores: ~30min
- Estrutura: ~15min
- Componentes faltando: ~2-3 horas (conforme prioridade)
