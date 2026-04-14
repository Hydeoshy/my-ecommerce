# DESIGN SYSTEM - SWOO E-Commerce

## Overview

O Design System documenta todos os componentes UI reutilizáveis do SWOO e-commerce. Baseia-se em **Atomic Design Lite** com componentes base (átomos) e compostos (moléculas).

**Stack**: React 19 + TypeScript + Tailwind CSS 4

---

## 1. Paleta de Cores - COR 3

### Cores Primárias
- **Amarelo Primário**: `#FFD300` (acções, CTA, highlights, botões)
- **Amarelo Hover**: `#E6B800` (hover state)
- **Amarelo Claro**: `#FFF9E6` (backgrounds, subtly)

### Cores Neutras
- **Branco**: `#FFFFFF` (backgrounds principais, cards)
- **Cinza Claro**: `#757B81` (texto secundário, borders, dividers)
- **Cinza Escuro**: `#262B32` (texto principal, backgrounds escuros)
- **Preto**: `#090C11` (fundo máximo contraste, footer)

### Cores Semânticas
- **Sucesso**: `#10B981` (verde para "In Stock", checkmarks)
- **Erro/Desconto**: `#FF6B6B` ou `#EF4444` (para badges "% OFF")
- **Aviso**: `#F59E0B` (amber para avisos)
- **Info**: `#3B82F6` (blue para info badges)

### CSS Variables (Tailwind)
```css
:root {
  --color-white: #FFFFFF;
  --color-yellow: #FFD300;
  --color-gray: #757B81;
  --color-dark-gray: #262B32;
  --color-black: #090C11;
  --color-yellow-hover: #E6B800;
  --color-yellow-light: #FFF9E6;
}
```

### Aplicação
```css
/* Primary actions - Amarelo */
.btn-primary { @apply bg-yellow-400 hover:bg-yellow-500 text-gray-900; }

/* Secondary actions - Cinza Escuro */
.btn-secondary { @apply bg-gray-800 hover:bg-gray-900 text-white; }

/* Text - Cinza Escuro */
.text-primary { @apply text-gray-900; }
.text-secondary { @apply text-gray-600; }

/* Error/Discount badges - Vermelho */
.error { @apply text-red-600 bg-red-50; }
.badge-discount { @apply bg-red-600 text-white; }
```

---

## 2. Tipografia

### Famílias
- **Sans-serif primária**: Inter (via Tailwind)
- **Alternativa**: Roboto (menção nos templates)
- **Fallback**: sistema sans-serif

### Escalas
| Uso | Tamanho | Weight | Line Height |
|-----|---------|--------|-------------|
| xs | 12px | 400 | 1.25 |
| sm | 14px | 400 | 1.5 |
| base | 16px | 400 | 1.5 |
| lg | 18px | 500 | 1.75 |
| xl | 20px | 600 | 1.75 |
| 2xl | 24px | 700 | 2 |
| 3xl | 30px | 700 | 2.25 |

### Uso Comum
- **H1 (Títulos página)**: 3xl, bold
- **H2 (Títulos seção)**: 2xl, bold
- **H3 (Subtítulos)**: xl, semibold
- **Body text**: base, regular
- **Labels**: sm, medium
- **Captions**: xs, regular

---

## 3. Espaçamento & Sizing

### Base Unit: 4px (Tailwind default)
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)   <- "safe space" do projeto
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

### Padding/Margin Comuns
- **Componentes**: `p-4` (16px)
- **Seções**: `p-6` (24px)
- **Containers**: `p-8` (32px)
- **Gap entre items**: `gap-4` (16px)

### Responsive Spacing
```tsx
<div className="p-4 md:p-6 lg:p-8">
  {/* Mobile: p-4, Tablet: p-6, Desktop: p-8 */}
</div>
```

---

## 4. Breakpoints

Seguir Tailwind defaults (mobile-first):
| Device | Breakpoint | CSS |
|--------|-----------|-----|
| Mobile | - | base (320px+) |
| Small tablets | `sm` | (640px+) |
| Tablets | `md` | (768px+) |
| Laptops | `lg` | (1024px+) |
| Desktops | `xl` | (1280px+) |
| Large screens | `2xl` | (1536px+) |

### Estratégia: Mobile-First
```tsx
// ❌ Errado: desktop-first
<div className="w-full lg:w-1/3" />

// ✅ Correto: mobile-first
<div className="w-full md:w-1/2 lg:w-1/3" />
```

---

## 4.1 Estrutura da Home Page (Baseada no Protótipo "Home 3")

### Seções Principais (em ordem)

#### 1. **Header/Navigation**
- Logo + Brand name
- Search bar com categoria dropdown
- Cart, Wishlist, Profile, Language selector icons
- Hotline info
- **Cor**: Fundo branco #FFFFFF, texto cinza escuro #262B32

#### 2. **Hero Banner Section**
- Promo text "Special Get 10% Discount for first order"
- Product carousel (iPad, Air Purifier, Washing Machine)
- Navigation arrows (prev/next)
- CTA buttons (Shop Now, Discover Now)
- **Cor**: Fundo claro, botões amarelo #FFD300

#### 3. **Popular Categories Grid**
- 12 categorias em grid 4x3 (desktop)
- Ícone + nome + hover effect
- Categories: Gaming, Sport, Kitchen, Robot Cleaner, Mobiles, Office, Cameras, Computers, Televisions, Audios, etc.
- **Cor**: Cards brancos, bordas cinza #757B81, hover com shadow

#### 4. **Featured Products Carousel**
- 3-4 produtos mais destacados
- Slide com navegação
- Product images grandes
- **Cor**: Branco com amarelo para CTAs

#### 5. **Best Weekly Deals Section**
- **Timer**: Countdown regressivo (Days : Hours : Minutes : Seconds)
- Grid 4-6 produtos com:
  - Imagem do produto
  - Badge de desconto (15% OFF) - vermelho #FF6B6B
  - Badge de installment (0% Installment) - cinza #757B81
  - Nome do produto
  - Rating (⭐ com estrelas amarelas #FFD300)
  - Preço original (strikethrough) e desconto
  - Barra de progresso (Sold: 24/80)
  - Botão "Shop Now" em amarelo
- **Cor**: Amarelo para destaques, branco para cards, vermelho para desconto

#### 6. **Trending Search Tags**
- Cloud de tags com buscas populares
- Exemplos: "Vacuum Robot", "Bluetooth Speaker", "Air Condition Inverter", etc.
- **Cor**: Tags com border cinza, hover em amarelo

#### 7. **Pre Order Section**
- Carousel de produtos para pré-encomenda
- Badge "pre order", "be the first to own"
- "Starting at Price"
- "Discover Now" button
- **Cor**: Amarelo para CTA

#### 8. **Best Seller Section**
- Category pills (View All, Top 30, Televisions, PC Gaming, Cameras, etc.)
- Grid 3-4 produtos com:
  - Badges (new, best seller, top rated, discount %)
  - Mesma estrutura do ProductCard
  - Installment info
- **Cor**: Amarelo para CTAs, badges coloridas para status

#### 9. **Popular Brands Carousel**
- Brand cards com logos
- Product showcase
- "Shop Now" button
- **Cor**: Branco cards, amarelo buttons

#### 10. **Suggest Today**
- Filter pills (Recommend For You, Top Best Seller, Top Rated, 70% OFF, 50% OFF, 30% OFF)
- Grid de produtos
- múltiplas seções/páginas
- **Cor**: Amarelo ativo na pill selecionada

#### 11. **Just Landing / Blog Section**
- Artigos recentes
- Blog cards com imagem, título, data, categoria
- Lado direito: Customer testimonials
- **Cor**: Branco cards, cinza text

#### 12. **Customer Testimonials**
- Card com foto, nome, cidade, verificado
- Review text
- Rating
- Product link
- **Cor**: Branco background, amarelo para rating

#### 13. **Newsletter Signup**
- "Subscribe & Get 10% OFF for first order"
- Email input
- Subscribe button em amarelo
- **Cor**: Fundo cinza claro #FFF9E6, button amarelo

#### 14. **Info Bar / Trust Signals**
- 4 items: Free Shipping over $99, 30 Days money back, 100% Secure Payment, 24/7 Dedicated Support
- Ícones + texto
- **Cor**: Branco background, texto cinza escuro

#### 15. **Footer**
- Company info (logo, address, hotline, email)
- 4-column links (Top Categories, Company, Help Center, Partner)
- Newsletter form
- Social media links
- Payment method icons
- Copyright
- **Cor**: Fundo preto/cinza escuro #262B32 ou #090C11, texto branco

---

## 5. Componentes Base (Átomos)

### Button
**Arquivo**: `/src/components/ui/Button.tsx`

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

// Variantes
- primary: bg-green-600, texto branco, ativa por padrão
- secondary: bg-gray-200, texto cinza
- outline: border green-600, texto green-600
- danger: bg-red-600, texto branco
```

### Badge
**Arquivo**: `/src/components/ui/Badge.tsx`

```tsx
interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
}

// Usages
- "NEW": info badge
- "SALE" ou "15% OFF": warning/danger badge
- "In Stock": success
```

### Card
**Arquivo**: `/src/components/ui/Card.tsx`

```tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean; // shadow on hover
}

// Default: border, rounded-lg, shadow-sm
// com hover: shadow-md transition
```

### Input
**Arquivo**: `/src/components/ui/Input.tsx`

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  fullWidth?: boolean;
}

// Features
- Label opcional acima
- Erro message em vermelho abaixo
- Responsive: full width mobile, auto desktop
```

### Select
**Arquivo**: `/src/components/ui/Select.tsx`

```tsx
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  errorMessage?: string;
}
```

### Rating
**Arquivo**: `/src/components/ui/Rating.tsx`

```tsx
interface RatingProps {
  value: number; // 0-5
  count?: number; // total de review
  readonly?: boolean;
  onChange?: (value: number) => void;
}

// Exibe: ⭐⭐⭐⭐☆ (4) 152 reviews
```

---

## 6. Componentes Compostos (Moléculas)

### ProductCard
**Arquivo**: `/src/components/ui/ProductCard.tsx`

```tsx
interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number; // percentage
  rating: number;
  reviewCount: number;
  inStock: boolean;
  onAddToCart: () => void;
  onViewDetails: () => void;
}

// Layout
// [Image con badge "NEW" or "SALE XX%"]
// [Name]
// [Rating ⭐ (count)]
// [Price | Original Price (strikethrough)]
// [Buttons: "Add to Cart" | "View Details"]
```

### Pagination
**Arquivo**: `/src/components/ui/Pagination.tsx`

```tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
}

// Layout
// [< Prev] [1] [2] [3] ... [10] [Next >]
```

### Breadcrumb
**Arquivo**: `/src/components/ui/Breadcrumb.tsx`

```tsx
interface BreadcrumbProps {
  items: Array<{ label: string; href: string }>;
}

// Layout: Home > Shop > Category > Product
```

### Modal / Dialog
**Arquivo**: `/src/components/ui/Modal.tsx`

```tsx
interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: Array<{ label: string; onClick: () => void }>;
}

// Features
- Overlay fundo cinzento
- Center dialog
- Close button (X)
- Action buttons (OK, Cancel, etc)
```

### Toast
**Arquivo**: `/src/components/ui/Toast.tsx`

```tsx
interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number; // ms (default 3000)
  onClose: () => void;
}

// Context Hook
export const useToast = () => {
  // showToast(type, message)
  // closeToast()
}
```

---

## 7. Ícones e Símbolos

### Recomendação
Use uma biblioteca como **lucide-react** ou **react-icons**:

```tsx
import { ShoppingCart, Home, User, LogOut, Search, Menu } from 'lucide-react';

// Tamanhos standard
- sm: 16px (w-4 h-4)
- md: 20px (w-5 h-5)
- lg: 24px (w-6 h-6)
```

---

## 8. Transições & Animações

### Padrões Recomendados
```css
/* Hover transitions */
.btn { @apply transition-all duration-200; }

/* Fade in/out */
.modal { @apply opacity-0 transition-opacity duration-300; }
.modal.open { @apply opacity-100; }

/* Slide animations */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

---

## 9. Estados & Interações

### Button States
- **Normal**: bg-green-600
- **Hover**: bg-green-700, cursor-pointer
- **Active/Pressed**: bg-green-800
- **Disabled**: bg-gray-300, cursor-not-allowed, opacity-50

### Input States
- **Normal**: border-gray-300
- **Focus**: border-green-600, outline-none, ring-1 ring-green-600
- **Error**: border-red-600, bg-red-50
- **Disabled**: bg-gray-100, cursor-not-allowed

### Card States
- **Default**: shadow-sm
- **Hover** (se interativo): shadow-md, cursor-pointer

---

## 10. Accessibility (a11y)

### Checklist por Componente
- [ ] Botões: `aria-label` se apenas ícone
- [ ] Inputs: `<label>` associada com `htmlFor`
- [ ] Links: `aria-current="page"` na página ativa
- [ ] Modals: `role="dialog"`, `aria-modal="true"`, focus trap
- [ ] Images: `alt` text descritivo
- [ ] Forms: `required` attributes, `aria-describedby` para erros

### Contraste
- Texto vs background: mínimo WCAG AA (4.5:1)
- Verde primário + branco: ✅ passa
- Cinza médio + branco: ⚠️ verificar

---

## 11. Exemplo: ProductCard Completo

```tsx
// src/components/ui/ProductCard.tsx
import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';
import { Rating } from './Rating';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  onAddToCart: () => void;
  onViewDetails: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  originalPrice,
  discount,
  rating,
  reviewCount,
  inStock,
  onAddToCart,
  onViewDetails,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded"
        />
        {discount && (
          <Badge variant="danger" className="absolute top-2 right-2">
            {discount}% OFF
          </Badge>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>

      {/* Rating */}
      <div className="mb-3 flex items-center gap-2">
        <Rating value={rating} readonly />
        <span className="text-sm text-gray-600">({reviewCount})</span>
      </div>

      {/* Price */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl font-bold text-yellow-400">${price}</span>
        {originalPrice && (
          <span className="text-sm text-gray-500 line-through">
            ${originalPrice}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="md"
          fullWidth
          disabled={!inStock}
          onClick={onAddToCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2 inline" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={onViewDetails}
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
```

---

## 12. Como Usar Este Design System

### Para Developers
1. Import componentes de `/src/components/ui/`
2. Respeitar props interface (TypeScript)
3. Não sobrescrever estilos Tailwind sem aprovação
4. Adicionar novas variantes via props, não via className

### Para Features
1. Compor componentes base para criar business componentes
2. Exemplo: `ProductGrid` compõe múltiplos `ProductCard`
3. Features em `/src/features/{name}/components/`

### Para Mudanças
1. Se novo componente base necessário → adicione aqui + export
2. Se mudança em paleta de cores → atualizar `tailwind.config.js`
3. Se novo pattern emerge → documentar e consolidar

---

## 13. Status de Implementação ✅

### ✅ Componentes Base (UI) - CONCLUÍDO
- [x] Button.tsx - Cores amarelo
- [x] Card.tsx
- [x] Badge.tsx
- [x] Rating.tsx
- [x] Input.tsx
- [x] Select.tsx
- [x] ProductCard.tsx - Cores amarelo
- [x] Pagination.tsx
- [x] Breadcrumb.tsx - Cores amarelo
- [x] Modal.tsx
- [x] Toast.tsx - Cores amarelo
- [x] Carousel.tsx - NOVO - Slider reutilizável
- [x] CountdownTimer.tsx - NOVO - Timer para deals

### ✅ Componentes Home (Features) - CONCLUÍDO
- [x] HeroBanner.tsx - NOVO
- [x] CategoriesGrid.tsx - NOVO
- [x] ProductCarousel.tsx - NOVO
- [x] BestDealsSection.tsx - NOVO
- [x] SectionHeader.tsx - NOVO (reutilizável)
- [x] BestSellerSection.tsx - NOVO
- [ ] BlogSection.tsx - TODO
- [ ] Testimonial.tsx - TODO
- [ ] PopularBrandsSection.tsx - TODO
- [ ] SuggestTodaySection.tsx - TODO

### ✅ Componentes Shared - CONCLUÍDO
- [x] Header.tsx - Cores amarelo
- [x] Footer.tsx - Cores amarelo
- [x] Layout.tsx
- [x] NewsletterSignup.tsx - NOVO
- [x] TrustSignals.tsx - NOVO

