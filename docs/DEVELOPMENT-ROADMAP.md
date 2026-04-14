# DEVELOPMENT ROADMAP - SWOO E-Commerce

## Overview

Este roadmap descreve o plano de desenvolvimento incremental do SWOO e-commerce frontend, dividido em 6 fases. Cada fase constrói sobre a anterior e segue a arquitetura definida em `FEATURE-STRUCTURE.md`.

---

## Timeline & Dependencies

```
Phase 1 (Foundation)
    ↓
Phase 2 (Products)
    ↓
Phase 3 (Auth) ←→ Phase 4 (Product Detail) ←→ Phase 5 (Cart/Checkout)
    ↓
Phase 6 (User & Static Pages)
```

---

## PHASE 1: FOUNDATION (UI Components + Layout)

**Duration**: 3-5 days | **Priority**: 🔴 CRITICAL

### Objectives
- [ ] Build 11+ reusable UI components
- [ ] Create main Layout (Header + Footer)
- [ ] Setup responsive grid system
- [ ] Establish design consistency

### Components to Create
```
src/components/ui/
├── Button.tsx            ✓ primary, secondary, outline, danger variants
├── Card.tsx              ✓ base container
├── Badge.tsx             ✓ NEW, SALE, status colors
├── Input.tsx             ✓ text, email, password
├── Select.tsx            ✓ dropdown
├── Rating.tsx            ✓ stars (0-5)
├── ProductCard.tsx       ✓ composed: image, name, price, rating, actions
├── Pagination.tsx        ✓ page navigation
├── Breadcrumb.tsx        ✓ hierarchical nav
├── Modal.tsx             ✓ generic dialog
└── Toast.tsx             ✓ notifications
```

### Shared Feature
```
src/features/shared/
├── Layout.tsx            ✓ wraps pages
├── Header.tsx            ✓ logo, nav, search, cart, login
└── Footer.tsx            ✓ links, newsletter, socials, payment methods
```

### Types
```
src/types/
├── index.ts
└── product.ts            ✓ Product, ProductFilter interfaces
```

### Deliverables
- ✅ All UI components tested & responsive
- ✅ Header/Footer match design templates
- ✅ Cypress/Vitest coverage for critical components
- ✅ Figma → Components parity verified

### Blockers & Notes
- Need to decide icon library (lucide-react recommended)
- Tailwind config may need fine-tuning for brand colors
- Responsive behavior critical for mobile

---

## PHASE 2: CORE PRODUCTS (Listing + Filters + Search)

**Duration**: 5-7 days | **Priority**: 🔴 CRITICAL | **Dependencies**: Phase 1 ✅

### Objectives
- [ ] Build product listing page (Exemplo 2 template)
- [ ] Implement filter sidebar (price, category, rating, etc)
- [ ] Add search functionality
- [ ] Setup product service with mock data

### Feature: `src/features/products/`

**Components**:
```
├── ProductGrid.tsx          Grid com 4 colunas responsivo
├── ProductCard.tsx          Individual product card
├── FilterSidebar.tsx        Filtros: categoria, preço, rating, cor, memória
├── SearchBar.tsx            Search input + results
├── CategoriesCarousel.tsx   Carousel com categorias (prev/next)
├── ProductListingPage.tsx   Main page component
```

**Hooks**:
```
├── useProducts.ts           Fetch + filter products
├── useProductFilters.ts     Manage filter state
├── useSearch.ts             Handle search
```

**Services**:
```
├── productService.ts        API: getProducts, searchProducts, getFilters
```

**Types**:
```
├── Product.types.ts         Product, Filter, SearchResult
```

### Mock Data
- Create mock handlers in `/src/mocks/handlers.ts`
- 20-50 products mock dataset
- Filter combinations tested

### API Endpoints (mocked)
```
GET /api/products?category=phones&priceMin=100&priceMax=500&page=1
GET /api/products/categories
GET /api/products/search?q=laptop
GET /api/products/filters/price  (min/max available)
```

### Deliverables
- ✅ Product listing page fully functional
- ✅ Filters working with URL params
- ✅ Search integrated with debouncing
- ✅ Responsive: mobile 1 col, tablet 2 cols, desktop 4 cols
- ✅ MSW handlers for all endpoints
- ✅ Tests covering filter combinations

### Success Criteria
- [ ] Can see 20+ products
- [ ] Filter changes immediately update grid
- [ ] Search returns correct results
- [ ] Pagination works
- [ ] Mobile responsive layout

---

## PHASE 3: AUTHENTICATION (Login + Register)

**Duration**: 3-4 days | **Priority**: 🔴 CRITICAL | **Dependencies**: Phase 1 ✅

### Objectives
- [ ] Build login form
- [ ] Build register form
- [ ] Setup Auth context/provider
- [ ] Implement auth service

### Feature: `src/features/auth/`

**Components**:
```
├── LoginForm.tsx            Email/password form
├── RegisterForm.tsx         Name/email/password/confirm form
├── LoginPage.tsx            Page wrapper
├── RegisterPage.tsx
```

**Hooks**:
```
├── useLogin.ts              Handle login mutation
├── useRegister.ts           Handle register mutation
├── useAuth.ts               Access auth context
└── useAuthGuard.ts          Protect routes
```

**Services**:
```
├── authService.ts           POST /auth/login, /auth/register, /auth/logout
```

**Providers**:
```
├── AuthProvider.tsx         Context + state management
```

**Types**:
```
├── Auth.types.ts            LoginRequest, User, AuthResponse
```

### Form Validation
- Zod schemas for email, password strength, etc
- Client-side validation required
- Error messages displayed

### API Endpoints (mocked)
```
POST /api/auth/login          Body: { email, password }
POST /api/auth/register       Body: { name, email, password }
POST /api/auth/logout
GET /api/auth/me              Get current user
```

### Deliverables
- ✅ Login/Register pages match templates
- ✅ Form validation with Zod
- ✅ Auth context provides user state
- ✅ Protected routes reject unauthorized
- ✅ MSW handlers for auth endpoints
- ✅ Tests for success/error flows

### Success Criteria
- [ ] Can login with valid credentials
- [ ] Register creates new user
- [ ] Validation errors shown for bad input
- [ ] Logout clears auth state
- [ ] Auth token persisted

---

## PHASE 4: PRODUCT DETAIL

**Duration**: 4-5 days | **Priority**: 🟡 HIGH | **Dependencies**: Phase 1 ✅, Phase 2 ✅

### Objectives
- [ ] Build single product detail page
- [ ] Implement image gallery with thumbnails
- [ ] Show product reviews/ratings
- [ ] Add "Add to Cart" button (connected to Phase 5)

### Feature: `src/features/product-detail/`

**Components**:
```
├── ProductImages.tsx        Image gallery + thumbnails
├── ProductInfo.tsx          Name, specs, description
├── ProductReviews.tsx       Reviews section + rating summary
├── ProductActions.tsx       Add to cart, wishlist, compare
├── RelatedProducts.tsx      Similar items carousel
├── ProductDetailPage.tsx    Main page
```

**Hooks**:
```
├── useProductDetail.ts      Fetch single product
├── useProductReviews.ts     Fetch reviews
├── useRelatedProducts.ts    Suggest similar items
```

**Services**:
```
├── productDetailService.ts  GET /products/{id}, /products/{id}/reviews
```

**Types**:
```
├── ProductDetail.types.ts   Review, DetailedProduct
```

### API Endpoints (mocked)
```
GET /api/products/:id
GET /api/products/:id/reviews
GET /api/products/:id/related
```

### Deliverables
- ✅ Detail page matches "Single Product.pdf" template
- ✅ Gallery works (click thumbnails)
- ✅ Reviews displayed with pagination
- ✅ Add to Cart button functional (with cart integration)
- ✅ Related products carousel
- ✅ Responsive images
- ✅ Tests for data loading & interactions

### Success Criteria
- [ ] Can navigate between product images
- [ ] Reviews fully visible with ratings
- [ ] Add to cart updates cart state
- [ ] Related products display correctly
- [ ] Page handles no reviews gracefully

---

## PHASE 5: CART + CHECKOUT

**Duration**: 5-6 days | **Priority**: 🟡 HIGH | **Dependencies**: Phase 1 ✅, Phase 3 ✅

### Objectives
- [ ] Build Cart context/state management
- [ ] Create Cart page with item management
- [ ] Build Checkout flow form
- [ ] Integrate payment method selection (mock)

### Features: `src/features/cart/` + `src/features/checkout/`

**Cart Components**:
```
├── CartItems.tsx            List of items in cart
├── CartSummary.tsx          Subtotal, shipping, tax, total
├── CartPage.tsx             Full page
```

**Checkout Components**:
```
├── BillingForm.tsx          First/last name, address, etc
├── ShippingMethod.tsx       Standard, express, overnight
├── PaymentMethod.tsx        Bank transfer, cash on delivery, PayPal
├── OrderSummary.tsx         Items + prices review
├── CheckoutPage.tsx         Multi-step form
├── OrderConfirmation.tsx    Success page with order ID
```

**Hooks**:
```
├── useCart.ts               Cart context hook
├── useCheckout.ts           Handle checkout mutation
```

**Services**:
```
├── checkoutService.ts       POST /checkout, POST /orders
```

**Types**:
```
├── Cart.types.ts            CartItem, Cart state
├── Checkout.types.ts        BillingData, PaymentMethod
```

### API Endpoints (mocked)
```
POST /api/checkout/validate
POST /api/orders              Body: { billingData, items, paymentMethod }
```

### Deliverables
- ✅ Add/remove items from cart
- ✅ Update quantities
- ✅ Cart persisted to localStorage
- ✅ Checkout form matches template
- ✅ Payment methods selectable
- ✅ Order confirmation page
- ✅ Tests for cart mutations & checkout

### Success Criteria
- [ ] Items persist in cart across page reloads
- [ ] Can update quantities
- [ ] Checkout form has validation
- [ ] Can place order with order ID confirmation
- [ ] Cart clears after successful order

---

## PHASE 6: USER PROFILE + STATIC PAGES

**Duration**: 3-4 days | **Priority**: 🟢 MEDIUM | **Dependencies**: Phase 3 ✅

### Objectives
- [ ] Build user profile page
- [ ] Show order history
- [ ] Add About, Contact, FAQ pages
- [ ] Implement newsletter signup

### Features: `src/features/user-profile/` + `src/features/common/`

**Profile Components**:
```
├── UserInfo.tsx             Name, email, phone, address
├── OrderHistory.tsx         List of past orders
├── OrderDetail.tsx          Single order details
├── AccountSettings.tsx      Password change, preferences
├── ProfilePage.tsx          Main page
```

**Common Components**:
```
├── AboutPage.tsx            Company info/mission
├── ContactPage.tsx          Contact form + map
├── FAQPage.tsx              Accordion Q&A
```

**Services**:
```
├── profileService.ts        GET /users/me, /users/me/orders
├── contactService.ts        POST /contact
```

### Deliverables
- ✅ Profile page shows user data
- ✅ Order history with details
- ✅ Contact form functional
- ✅ About & FAQ pages
- ✅ Newsletter signup in footer
- ✅ Tests for all pages

### Success Criteria
- [ ] Can view profile info
- [ ] See past orders with details
- [ ] Contact form submittable
- [ ] Newsletter signup works
- [ ] All pages responsive

---

## Component Coverage Matrix

| Component | Phase | Status |
|-----------|-------|--------|
| Button, Card, Badge, Input | 1 | 📅 |
| ProductCard, Grid, Pagination | 1-2 | 📅 |
| Header, Footer, Layout | 1 | 📅 |
| ProductListing, Filters | 2 | 📅 |
| LoginForm, RegisterForm | 3 | 📅 |
| ProductDetail, Gallery, Reviews | 4 | 📅 |
| Cart, CartPage | 5 | 📅 |
| Checkout, Billing, Payment | 5 | 📅 |
| ProfilePage, OrderHistory | 6 | 📅 |
| About, Contact, FAQ | 6 | 📅 |

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Design changes mid-development | High | Freeze templates, sign-off on Phase 1 |
| API contract mismatch | High | Define contract early, use MSW |
| Responsive design issues | Medium | Test 3 breakpoints constantly |
| TypeScript compilations errors | Medium | Strict mode, CI checks early |
| Testing coverage gaps | Medium | 80%+ coverage requirement per phase |

---

## Success Metrics

- ✅ All components tested (unit + integration)
- ✅ 80%+ code coverage
- ✅ 0 type errors (TS strict)
- ✅ Lighthouse score mobile 85+, desktop 90+
- ✅ All templates implemented
- ✅ Accessibility: WCAG AA compliant
- ✅ Performance: FCP < 2s, LCP < 3s

---

## Monitoring & Adjustments

After each phase:
1. Review actual vs estimated effort
2. Identify blockers & patterns
3. Update AGENT-FRONTEND-EVOLVES.md
4. Adjust subsequent phases if needed

