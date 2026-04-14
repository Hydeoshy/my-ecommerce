# FEATURE STRUCTURE - SWOO E-Commerce

## Directory Layout

Cada feature no SWOO segue uma estrutura consistente para facilitar navegação, testabilidade e manutenção.

---

## 1. Padrão Base de Feature

```
src/features/{feature-name}/
├── components/              # UI components específicos da feature
│   ├── index.ts            # barrel export
│   ├── ComponentName.tsx    # componentes principais
│   └── ComponentName.spec.tsx
├── hooks/                  # Custom hooks (state, data fetching)
│   ├── index.ts
│   ├── useFeatureName.ts
│   └── useFeatureName.spec.ts
├── services/               # API integration
│   ├── index.ts
│   └── featureService.ts   # axios calls + data mapping
├── types/                  # TypeScript interfaces locais
│   ├── index.ts
│   └── Feature.types.ts
├── pages/                  # Page components (rotas)
│   └── FeaturePage.tsx
├── __tests__/              # Testes integração
│   └── Feature.integration.spec.tsx
└── index.ts                # main export
```

---

## 2. Exemplo Prático: Feature `auth`

```
src/features/auth/
├── components/
│   ├── index.ts
│   ├── LoginForm.tsx       # Form com validação
│   ├── RegisterForm.tsx
│   ├── LoginForm.spec.tsx
│   └── RegisterForm.spec.tsx
├── hooks/
│   ├── index.ts
│   ├── useLogin.ts         # hook para fazer login
│   ├── useRegister.ts
│   ├── useAuth.ts          # hook acesso contexto auth
│   ├── useLogin.spec.ts
│   └── useRegister.spec.ts
├── services/
│   ├── index.ts
│   └── authService.ts      # axios calls
├── types/
│   ├── index.ts
│   └── Auth.types.ts       # LoginRequest, User, etc.
├── pages/
│   └── AuthPage.tsx        # Layout página de login
├── providers/              # (opcional)
│   └── AuthProvider.tsx    # Context provider
├── __tests__/
│   └── Auth.integration.spec.tsx
└── index.ts
```

### Arquivo: `src/features/auth/types/Auth.types.ts`
```typescript
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}
```

### Arquivo: `src/features/auth/services/authService.ts`
```typescript
import axios from 'axios';
import { z } from 'zod';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/Auth.types';

// Zod schemas para validação API response
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin']),
  createdAt: z.string(),
});

const AuthResponseSchema = z.object({
  user: UserSchema,
  token: z.string(),
});

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

export const authService = {
  async login(data: LoginRequest): Promise<User> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    
    // Validar response com Zod
    const validated = AuthResponseSchema.parse(response.data);
    
    // Armazenar token
    localStorage.setItem('authToken', validated.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${validated.token}`;
    
    return validated.user;
  },

  async register(data: RegisterRequest): Promise<User> {
    const { confirmPassword, ...payload } = data;
    const response = await api.post<AuthResponse>('/auth/register', payload);
    
    const validated = AuthResponseSchema.parse(response.data);
    localStorage.setItem('authToken', validated.token);
    
    return validated.user;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<{ user: User }>('/auth/me');
    return UserSchema.parse(response.data.user);
  },
};
```

### Arquivo: `src/features/auth/hooks/useLogin.ts`
```typescript
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useAuth } from './useAuth';

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authService.login(data),
    onSuccess: (user) => {
      setUser(user);
      setError(null);
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  return {
    ...mutation,
    error,
    isLoading: mutation.isPending,
    login: (email: string, password: string) =>
      mutation.mutateAsync({ email, password }),
  };
};
```

### Arquivo: `src/features/auth/components/LoginForm.tsx`
```typescript
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { useLogin } from '../hooks/useLogin';

const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password min 6 chars'),
});

type LoginFormData = z.infer<typeof LoginSchema>;

export const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const { login, isLoading, error } = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      // Redirect or success handling
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      <Input
        label="Email"
        type="email"
        errorMessage={errors.email?.message}
        {...register('email')}
      />
      
      <Input
        label="Password"
        type="password"
        errorMessage={errors.password?.message}
        {...register('password')}
      />

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};
```

---

## 3. Padrão para Shared Components

Features "compartilhadas" (Layout, Header, Footer):

```
src/features/shared/
├── components/
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Header.tsx          # Navigation, search, cart
│   ├── Footer.tsx          # Links, newsletter, payment methods
│   ├── Navbar.tsx
│   ├── Sidebar.tsx         # (se necessário)
│   └── __tests__/
├── types/
│   └── Navigation.types.ts
└── index.ts
```

---

## 4. Barrel Exports

### Arquivo: `src/features/{feature}/index.ts`
```typescript
// main exports
export * from './components';
export * from './hooks';
export * from './services';
export * from './types';
export { default as FeaturePage } from './pages/FeaturePage';
```

### Arquivo: `src/features/{feature}/components/index.ts`
```typescript
export { LoginForm } from './LoginForm';
export { RegisterForm } from './RegisterForm';
```

**Uso**:
```typescript
// ✅ Bom
import { LoginForm } from '@features/auth';

// ❌ Evitar
import { LoginForm } from '@features/auth/components/LoginForm';
```

---

## 5. Testabilidade

### Arquivo: `src/features/{feature}/hooks/useFeature.spec.ts`
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useLogin } from './useLogin';
import { authService } from '../services/authService';
import { vi } from 'vitest';

// Mock service
vi.mock('../services/authService', () => ({
  authService: {
    login: vi.fn(),
  },
}));

describe('useLogin', () => {
  it('should login successfully', async () => {
    const mockUser = { id: '1', name: 'Test', email: 'test@example.com' };
    vi.mocked(authService.login).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useLogin());

    result.current.login('test@example.com', 'password123');

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
```

---

## 6. Import Paths (Alias)

Configure em `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@features/*": ["./src/features/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@services/*": ["./src/services/*"],
      "@types/*": ["./src/types/*"],
      "@styles/*": ["./src/styles/*"]
    }
  }
}
```

**Uso**:
```typescript
import { LoginForm } from '@features/auth/components';
import { Button } from '@components/ui';
import type { User } from '@types/user';
```

---

## 7. Services Pattern

### API Gateway
```typescript
// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT),
});

// Interceptor: adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Feature Service
```typescript
// src/features/products/services/productService.ts
import { api } from '@services/api';
import { z } from 'zod';
import type { Product, ProductFilter } from '../types';

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string().url(),
  rating: z.number().min(0).max(5),
});

export const productService = {
  async getProducts(filters?: ProductFilter) {
    const response = await api.get<Product[]>('/products', {
      params: filters,
    });
    
    return z.array(ProductSchema).parse(response.data);
  },

  async getProductById(id: string) {
    const response = await api.get(`/products/${id}`);
    return ProductSchema.parse(response.data);
  },

  async searchProducts(query: string) {
    const response = await api.get('/products/search', {
      params: { q: query },
    });
    return z.array(ProductSchema).parse(response.data);
  },
};
```

---

## 8. TypeScript Best Practices

### Naming Convention
- **Components**: PascalCase (`LoginForm.tsx`)
- **Hooks**: camelCase com `use` prefix (`useLogin.ts`)
- **Services**: camelCase com `Service` suffix (`authService.ts`)
- **Types**: PascalCase com sufixo `Type` ou deixar genérico (`Auth.types.ts`)

### Tipos vs Interfaces
```typescript
// Use type para unidades/objects
type LoginRequest = { email: string; password: string };

// Use interface para extensibilidade/herança
interface ApiResponse {
  success: boolean;
  data: unknown;
}

interface UserResponse extends ApiResponse {
  data: User;
}
```

### Never use `any`
```typescript
// ❌ Errado
const data: any = response.data;

// ✅ Correto
const data: unknown = response.data;
const validated = UserSchema.parse(data); // agora type-safe
```

---

## 9. Testing Strategy

### Unit Tests (Hooks & Services)
- Arquivo: `{name}.spec.ts`
- MSW para mock API
- Vitest + React Testing Library

### Integration Tests (Components)
- Arquivo: `{name}.spec.tsx`
- Renderizar component inteiro
- Testar user interactions

### E2E Tests (Features)
- Arquivo: `{feature}.e2e.spec.ts`
- Full flow (ex: login → dashboard)
- (Usar Playwright/Cypress depois)

---

## 10. Próximas Features a Estruturar

- [ ] `src/features/auth/` - Login, Register, Auth Provider
- [ ] `src/features/products/` - Product listing, filters, search
- [ ] `src/features/product-detail/` - Single product page
- [ ] `src/features/cart/` - Cart state & management
- [ ] `src/features/checkout/` - Checkout flow
- [ ] `src/features/user-profile/` - User account
- [ ] `src/features/shared/` - Layout, Header, Footer

