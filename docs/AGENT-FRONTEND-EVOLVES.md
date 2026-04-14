# AGENT-FRONTEND-EVOLVES.md - Learning & Pattern Registry

## Purpose

This document captures learnings, validated patterns, architectural decisions, and evolving best practices as the SWOO e-commerce frontend is developed. It serves as a **self-updating knowledge base** for the agent to learn from actual development experience.

**Updated After Each Phase**

---

## Learning Cycle Process

1. **Propose**: Agent suggests implementation based on DESIGN-SYSTEM.md + FEATURE-STRUCTURE.md
2. **Develop**: Developer implements feature
3. **Validate**: Developer reviews & confirms if approach is good
4. **Document**: Agent consolidates learning here
5. **Apply**: Future features use consolidated patterns

---

## Part 1: Consolidated Patterns

### Pattern: Form Component Structure

**Status**: 🟢 VALIDATED (Phase 3 - Auth)

**Rule**: All form components follow this structure:

```typescript
// 1. Define Zod schema
const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// 2. Type from schema
type FormData = z.infer<typeof FormSchema>;

// 3. Use react-hook-form with zodResolver
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(FormSchema),
});

// 4. Submit via custom hook
const { mutate, isPending } = useMutation(apiCall);

// 5. Render with shared UI components
<Input label="Email" errorMessage={errors.email?.message} {...register('email')} />
```

**Why**: Ensures type safety + validation + consistent error handling  
**How to apply**: Use this for LoginForm, RegisterForm, CheckoutForm, ProfileForm  
**Files**: FEATURE-STRUCTURE.md `/src/features/{feature}/components/{Name}Form.tsx`

---

### Pattern: Custom Hook for API Calls

**Status**: 🟢 VALIDATED (Phase 2 - Products)

**Rule**: API calls go through custom hooks, not directly in components:

```typescript
// ✅ Good
export const useProducts = (filters?: ProductFilter) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
  });
};

// Then in component:
const { data, isLoading, error } = useProducts(filters);

// ❌ Bad
const [products, setProducts] = useState([]);
useEffect(() => {
  productService.getProducts(filters).then(setProducts);
}, [filters]); // ← Race conditions, no caching
```

**Why**: TanStack Query handles caching, retries, stale data  
**How to apply**: All data-fetching components use useQuery/useMutation  
**Files**: FEATURE-STRUCTURE.md `/src/features/{feature}/hooks/useFeature.ts`

---

### Pattern: Service Layer with Zod Validation

**Status**: 🟢 VALIDATED (Phase 2 - Products & Phase 3 - Auth)

**Rule**: All API responses validated with Zod schemas BEFORE leaving service layer:

```typescript
// In productService.ts
const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  // ...
});

export const productService = {
  async getProducts(filters?: ProductFilter) {
    const response = await api.get<unknown>('/products', { params: filters });
    // Validate before returning
    return z.array(ProductSchema).parse(response.data);
  },
};

// Component receives already-typed data
const { data: products } = useProducts(); // type: Product[]
```

**Why**: Prevents type mismatch between API and UI; Zod catches schema changes  
**How to apply**: Define schema at top of service, use .parse() for every response  
**Files**: FEATURE-STRUCTURE.md `/src/features/{feature}/services/{name}Service.ts`

---

### Pattern: Responsive Grid Layouts

**Status**: 🟡 IN PROGRESS (Phase 2 ongoing)

**Rule**: Always use mobile-first responsive grid:

```typescript
// ProductGrid.tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</div>

// Breakdowns:
// - Mobile (< 640px): 1 column
// - Tablets (640px+): 2 columns
// - Laptop (768px+): 3 columns
// - Desktop (1024px+): 4 columns
```

**Why**: Matches template layouts; ensures mobile experience is good  
**How to apply**: All grid/flex layouts use mobile-first breakpoints  
**Files**: Page components in `/src/features/{feature}/pages/`

---

### Pattern: Error Handling in Components

**Status**: 🟡 IN PROGRESS (Phase 3 Auth)

**Rule**: Handle 3 levels of errors:

```typescript
// 1. Form validation errors (Zod)
const { errors: fieldErrors } = useForm({ resolver: zodResolver(schema) });
{fieldErrors.email && <span>{fieldErrors.email.message}</span>}

// 2. API call errors (mutation/query)
const { error: apiError } = useLogin();
{apiError && <Toast type="error" message={apiError.message} />}

// 3. Unexpected errors (try-catch)
try {
  await submit();
} catch (err) {
  showToast('Something went wrong');
  console.error(err);
}
```

**Why**: Different error types need different user feedback  
**How to apply**: Forms show field errors, API errors as toasts  
**Files**: Form components + page components

---

### Pattern: Component Composition (Atomic Design)

**Status**: 🟡 IN PROGRESS (Phase 1-2)

**Rule**: Compose UI from base components:

```typescript
// ❌ Monolithic
export const ProductCard = ({ product }) => (
  <div className="...">
    <img src={product.image} />
    <h3>{product.name}</h3>
    <div className="flex gap-2">
      <button>Add to Cart</button>
      <button>View</button>
    </div>
  </div>
);

// ✅ Composed
export const ProductCard = ({ product }) => (
  <Card>
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <div className="flex gap-2">
      <Button variant="primary" onClick={...}>Add to Cart</Button>
      <Button variant="outline" onClick={...}>View</Button>
    </div>
  </Card>
);
```

**Why**: Enables reusability, consistency, easier testing  
**How to apply**: Use Button, Card, Badge, Input, etc from ui/  
**Files**: DESIGN-SYSTEM.md defines base components

---

## Part 2: Architecture Decisions

### Decision 1: State Management Strategy

**Context**: How to manage app state?

**Options Considered**:
1. Context API (simple, built-in)
2. Redux (powerful, complex)
3. TanStack Query (for server state) + Context (for UI state)

**Decision**: ✅ TanStack Query + Context API

**Reasoning**:
- Server state (products, orders) → TanStack Query (handles caching, refetching)
- UI state (filters, modal open) → Context API (lightweight)
- Auth state → Context API + TanStack Query

**Impact**: Simpler than Redux, sufficient for current scope  
**Files**: Each feature's `useFeature.ts` hook + optional `AuthProvider.tsx`

---

### Decision 2: Service Layer as API Gateway

**Context**: Where to handle Zod validation + axios config?

**Options Considered**:
1. APIgw via axios interceptors
2. Separate service per feature
3. Shared gateway + per-feature validators

**Decision**: ✅ Shared API gateway + per-feature services with Zod

**Reasoning**:
- `/src/services/api.ts` - Axios config, interceptors, auth
- `/src/features/{feature}/services/` - Zod schemas, specific endpoints

**Impact**: Cleaner separation, reusable interceptors  
**Files**: `src/services/api.ts` + `/src/features/{feature}/services/`

---

### Decision 3: Form Validation Approach

**Context**: Zod vs React Hook Form?

**Options Considered**:
1. Only React Hook Form (less boilerplate)
2. Only Zod (more control)
3. React Hook Form + Zod together

**Decision**: ✅ React Hook Form + Zod together

**Reasoning**:
- React Hook Form: handles form state, re-renders
- Zod: validates at form AND service layer (defense in depth)

**Impact**: Requires both libs, but catches errors early + at API boundary  
**Files**: Form components in `/src/features/{feature}/components/`

---

## Part 3: Evolved Best Practices

### Testing Strategy for Components

**What Changed**: Initial thought was snapshot tests. Evolved to assertion tests.

**Before**:
```typescript
// Not ideal for e-commerce
expect(render(<ProductCard {...product} />)).toMatchSnapshot();
```

**After** (✅ Validated):
```typescript
// Test actual behavior
it('should display price and add to cart button', () => {
  const { getByText } = render(<ProductCard {...product} />);
  expect(getByText(`$${product.price}`)).toBeInTheDocument();
  expect(getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
});
```

**Why**: Snapshots break on style changes; assertions test behavior  
**Apply to**: All component spec files

---

### Naming Conventions for Types

**Pattern**: Suffix types by purpose:

```typescript
// Domain model
export type Product = { id: string; name: string; ... };

// API Request/Response
export type CreateProductRequest = { name: string; price: number };
export type ProductResponse = { id: string; ... };

// Component Props
export interface ProductCardProps { ... }

// Context
export interface ProductContextType { ... }
```

**Why**: Immediately clear what a type is used for  
**Apply to**: All new types in `/src/types/` and feature types

---

### Responsive Design Mobile-First Enforcement

**Practice**: Always design/build mobile layout first, then add breakpoints.

```typescript
// Enforce mobile-first
<div className="
  // Mobile (base)
  flex flex-col gap-2 p-4
  // Tablet
  md:flex-row md:p-6
  // Desktop
  lg:p-8
">
```

**Why**: Optimizes for 70%+ mobile traffic  
**Verify**: Use DevTools to test 375px, 768px, 1024px widths

---

## Part 4: Incomplete Patterns (TBD)

### Pattern: Global State Management

**Status**: 🔴 TO BE DEFINED (Phase 6 onward)

**Question**: How to manage user auth state across features?

**Pending Options**:
1. AuthProvider + Context (current approach, simple)
2. Persistent Context with localStorage
3. zustand mini-store

**Decision**: TBD after Phase 3 (Auth) is complete

---

### Pattern: Error Boundaries + Fallback UI

**Status**: 🟡 PARTIAL (basic error handling exists, needs structure)

**Question**: How to gracefully handle component crashes?

**Pending Implementation**:
- [ ] React Error Boundary component
- [ ] 404, 500, loading fallback pages
- [ ] Toast error notifications

**Decision**: TBD after Phase 2

---

### Pattern: Image Optimization

**Status**: 🟡 PARTIAL (basic <img> tags work, needs optimization)

**Question**: How to handle product image galleries efficiently?

**Pending Considerations**:
- [ ] Lazy loading (Intersection Observer)
- [ ] Image compression (WebP format)
- [ ] Responsive src (srcset)
- [ ] Placeholder blur

**Decision**: TBD after Phase 4 (Product Detail)

---

## Part 5: Learning Logs

### Log 1: Phase 1 - Foundation (Sample Entry)

**Date**: [To be filled]  
**Feature**: UI Components  
**What Happened**: Built Button, Card, Badge components  
**Key Learning**: Tailwind variant plugins reduce component variants  
**Decision Made**: Use className strategy over styled-components  
**Updated Docs**: DESIGN-SYSTEM.md section 5

---

### Log 2: Phase 2 - Products (Sample Entry)

**Date**: [To be filled]  
**Feature**: Product Listing  
**What Happened**: Implemented ProductGrid with MSW mocks  
**Key Learning**: Filter URL params make component reusable across routes  
**Decision Made**: Always keep filters in URL? Or component state?  
**Updated Docs**: [To be linked]

---

### Log 3: Phase 3 - Auth (Sample Entry)

**Date**: [To be filled]  
**Feature**: Login Form  
**What Happened**: Built LoginForm with Zod + React Hook Form  
**Key Learning**: Zod provides better type safety than runtime checks  
**Decision Made**: All forms use Zod from now on  
**Updated Docs**: FEATURE-STRUCTURE.md section 8

---

## Part 6: Backlog of Decisions

### To Review After Phase 1
- [ ] Should UI components use `className` or CSS Modules?
- [ ] Icon library choice (lucide-react vs react-icons)?
- [ ] Optimize Tailwind config for bundle size?

### To Review After Phase 2
- [ ] Pagination strategy: URL params vs client state?
- [ ] Infinite scroll vs traditional pagination?
- [ ] Filtering: AND/OR combinations for multiple filters?

### To Review After Phase 3
- [ ] OAuth integration needed or just email/password?
- [ ] Session expiry & token refresh strategy?
- [ ] Protected routes structure?

### To Review After Phase 4
- [ ] Image gallery: lightbox vs in-page?
- [ ] Product comparison feature?
- [ ] Wishlist implementation?

### To Review After Phase 5
- [ ] Persistent cart (localStorage vs server)?
- [ ] Guest checkout option?
- [ ] Coupon/promo code redemption?

---

## Part 7: Metrics & Health Check

### Code Quality Metrics
- [ ] TypeScript strict: 0 errors
- [ ] Test coverage: 80%+
- [ ] Eslint: 0 warnings
- [ ] Lighthouse: mobile 85+, desktop 90+

### Developer Experience Metrics
- [ ] Time per component: 2-3 hours (trend)
- [ ] Bug escape rate: <5%
- [ ] Code review feedback: mostly style nits (good sign)

### Performance Metrics (per phase end)
- [ ] FCP (First Contentful Paint): <2s
- [ ] LCP (Largest Contentful Paint): <3s
- [ ] CLS (Cumulative Layout Shift): <0.1
- [ ] Time to Interactive: <3.5s

---

## How to Update This Document

1. After each Feature Phase is complete, add a **Log** entry
2. If new pattern emerges, validate with developer → move to **Part 1**
3. If architecture decision is made, document in **Part 2**
4. Keep **Part 6** backlog updated as questions arise
5. Review **Metrics** monthly

---

## Next Session Checklist

- [ ] Review this entire document before starting new feature
- [ ] Check if any patterns from Part 1 apply
- [ ] Verify architecture aligns with Part 2 decisions
- [ ] Use metrics to gauge progress

