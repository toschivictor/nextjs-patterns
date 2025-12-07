# The `lib` Folder - Complete Guide

## Overview

The `lib` folder (short for "library") is a **convention** in Next.js projects for storing **shared, reusable code** that isn't specific to routes or components. It's where you put utilities, helpers, API clients, and business logic that can be used across your application.

> **Note**: `lib` is a convention, not a Next.js requirement. You could use `utils`, `helpers`, or any other name, but `lib` is the most common.

## What Goes in `lib/`?

### ✅ **DO Include:**
- API client functions
- Utility functions (formatters, validators, helpers)
- Business logic functions
- Data transformation functions
- Configuration helpers
- Third-party service wrappers
- Database queries/helpers
- Authentication helpers
- Validation schemas
- Constants (or use a separate `constants/` folder)

### ❌ **DON'T Include:**
- React components (use `components/`)
- React hooks (use `hooks/`)
- Route handlers (use `app/api/`)
- Type definitions (use `types/`)
- Test files (colocate with source files)

## Common `lib` Folder Structure

```
src/lib/
├── api/                    # API client functions
│   ├── user-authentication.ts
│   ├── products.ts
│   └── orders.ts
├── utils/                  # General utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   └── helpers.ts
├── validations/            # Validation schemas (Zod, Yup, etc.)
│   ├── user-schema.ts
│   └── product-schema.ts
├── services/               # External service integrations
│   ├── email.ts
│   ├── payment.ts
│   └── analytics.ts
├── db/                     # Database helpers (if using)
│   ├── queries.ts
│   └── migrations.ts
└── config/                 # Configuration helpers
    ├── env.ts
    └── constants.ts
```

## Detailed Examples

### 1. **API Client Functions** (`lib/api/`)

Functions that make HTTP requests to your API routes or external APIs.

```typescript
// lib/api/user-authentication.ts
export const postUserAuthentication = async (formData: {
  email: string;
  password: string;
}): Promise<void> => {
  const response = await fetch('/api/submit', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  return response.json();
};

// lib/api/products.ts
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  return response.json();
};

export const createProduct = async (product: CreateProductDto) => {
  const response = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
  return response.json();
};
```

### 2. **Utility Functions** (`lib/utils/`)

Reusable helper functions that don't depend on React or Next.js.

```typescript
// lib/utils/formatters.ts
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// lib/utils/validators.ts
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

// lib/utils/helpers.ts
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
```

### 3. **Validation Schemas** (`lib/validations/`)

Schema definitions for form validation (using Zod, Yup, etc.).

```typescript
// lib/validations/user-schema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
```

### 4. **External Services** (`lib/services/`)

Wrappers for third-party services or integrations.

```typescript
// lib/services/email.ts
export const sendWelcomeEmail = async (email: string, name: string) => {
  // Integration with SendGrid, Resend, etc.
  const response = await fetch('https://api.email-service.com/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: email, template: 'welcome', data: { name } }),
  });
  return response.json();
};

// lib/services/analytics.ts
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Integration with analytics service
  if (typeof window !== 'undefined') {
    window.gtag?.('event', eventName, properties);
  }
};
```

### 5. **Database Helpers** (`lib/db/`)

Database query functions (if using Prisma, Drizzle, etc.).

```typescript
// lib/db/queries.ts
import { prisma } from './client';

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const createUser = async (data: { email: string; name: string }) => {
  return prisma.user.create({ data });
};
```

### 6. **Configuration Helpers** (`lib/config/`)

Environment variable validation and configuration.

```typescript
// lib/config/env.ts
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
} as const;

// Validate required env vars
if (!env.databaseUrl) {
  throw new Error('DATABASE_URL is required');
}
```

## When to Use `lib/` vs Other Folders

| Type of Code | Folder | Example |
|-------------|--------|---------|
| API client functions | `lib/api/` | `postUserAuthentication()` |
| Utility functions | `lib/utils/` | `formatCurrency()`, `debounce()` |
| Validation schemas | `lib/validations/` | `loginSchema` |
| React components | `components/` | `<Button>`, `<Input>` |
| React hooks | `hooks/` | `useInput()`, `useAuth()` |
| Type definitions | `types/` | `interface User`, `type Product` |
| Constants | `constants/` or `lib/config/` | `API_ENDPOINTS`, `MAX_FILE_SIZE` |
| Route handlers | `app/api/` | `route.ts` files |
| Page components | `app/` | `page.tsx` files |

## Best Practices

### 1. **Keep Functions Pure When Possible**
```typescript
// ✅ Good - Pure function
export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// ⚠️ Avoid - Side effects in lib functions
export const logAndCalculate = (items: CartItem[]): number => {
  console.log('Calculating...'); // Side effect
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
```

### 2. **Use TypeScript Types**
```typescript
// ✅ Good - Explicit types
export const formatUser = (user: { name: string; email: string }): string => {
  return `${user.name} <${user.email}>`;
};

// ✅ Better - Use type definitions
import type { User } from '@/types/user';

export const formatUser = (user: User): string => {
  return `${user.name} <${user.email}>`;
};
```

### 3. **Organize by Feature or Type**
```typescript
// Option A: By feature
lib/
  ├── user/
  │   ├── api.ts
  │   ├── validations.ts
  │   └── utils.ts
  └── product/
      ├── api.ts
      └── validations.ts

// Option B: By type (current approach)
lib/
  ├── api/
  │   ├── user.ts
  │   └── product.ts
  └── validations/
      ├── user.ts
      └── product.ts
```

### 4. **Export from Index Files (Optional)**
```typescript
// lib/api/index.ts
export * from './user-authentication';
export * from './products';
export * from './orders';

// Then import like:
import { postUserAuthentication, getProducts } from '@/lib/api';
```

## Your Current Structure

Currently, you have:
```
src/lib/
└── api/
    └── user-authentication.ts
```

This is a good start! As your project grows, you might add:

```
src/lib/
├── api/
│   ├── user-authentication.ts  ✅ (you have this)
│   ├── products.ts
│   └── orders.ts
├── utils/
│   ├── formatters.ts
│   └── validators.ts
└── validations/
    └── user-schema.ts
```

## Summary

The `lib` folder is your **shared code library** - it contains reusable functions, utilities, and business logic that can be imported and used anywhere in your application. It's separate from:
- **Components** (UI elements)
- **Hooks** (React-specific logic)
- **Routes** (Next.js routing)
- **Types** (TypeScript definitions)

Keep it organized, typed, and focused on **pure, reusable functionality**.

