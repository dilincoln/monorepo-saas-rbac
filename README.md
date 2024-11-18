# Full-Stack SaaS Boilerplate with RBAC

A modern, production-ready boilerplate for building scalable SaaS applications with built-in multi-tenancy and Role-Based Access Control (RBAC).

## 🚀 Tech Stack

### Backend

- **Fastify** - High-performance web framework
- **Prisma** - Type-safe ORM and database migrations
- **CASL** - Isomorphic authorization library
- **JWT** - Authentication using JSON Web Tokens
- **OpenAPI/Swagger** - API documentation with Scalar UI

### Frontend

- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable components built on Radix UI

## Shared

#### Packages

- **packages/env** - Runtime type validation
- **packages/i18n** - Internationalization for backend and frontend
- **packages/auth** - CASL example, so you can take a look how to implement RBAC
- **packages/api-types** - Automatically generate and provide API types by reading `apps/api` OpenAPI schema

#### Configs

- **config/eslint-config** - ESLint config
- **config/prettier-config** - Prettier config
- **config/tsconfig** - TypeScript config
