# Nuxt Boilerplate

Clean Nuxt starter for real projects. REST-first. JWT-ready. No GraphQL.

## Stack

- Nuxt 4 + Vue 3
- TypeScript strict mode
- Pinia state management
- Nuxt i18n: `en`, `uz`, `ru`
- Biome for lint + format
- Vitest + Nuxt Test Utils
- JWT auth helpers
- Typed REST API helper
- Lightweight Vue animations with VueUse Motion
- Docker production build

## Start

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev          # local dev
npm run build        # production build
npm run preview      # preview build
npm run typecheck    # TypeScript check
npm run lint         # Biome check
npm run lint:fix     # Biome fix
npm run test -- --run
npm run check        # typecheck + lint + tests
```

## Environment

```env
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
NUXT_PUBLIC_AUTH_LOGIN_PATH=/auth/login
NUXT_PUBLIC_AUTH_REFRESH_PATH=/auth/refresh
NUXT_PUBLIC_AUTH_ME_PATH=/auth/me
NUXT_PUBLIC_AUTH_LOGOUT_PATH=/auth/logout
```

## REST API

Use `useApi()` for backend calls:

```ts
const api = useApi()
const users = await api.get<User[]>('/users')
```

JWT token auto-attaches as `Authorization: Bearer <token>`. On `401`, refresh token is tried once.

## JWT auth

Files:

- `src/stores/auth.ts` — login, refresh, logout, user state
- `src/composables/useApi.ts` — REST client with auth headers
- `src/middleware/auth.ts` — route protection
- `src/pages/login.vue` — simple login page

Protect page:

```ts
definePageMeta({
  middleware: ['auth']
})
```

Expected login response:

```json
{
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token",
  "user": {
    "id": "1",
    "email": "user@example.com"
  }
}
```

Snake case also works: `access_token`, `refresh_token`.

## i18n

Locale files live here:

- `src/locales/en.json`
- `src/locales/uz.json`
- `src/locales/ru.json`

Keep keys aligned in every locale.

## Animations

Use VueUse Motion for lightweight UI animations:

```vue
<section
  v-motion
  :initial="{ opacity: 0, y: 24 }"
  :enter="{ opacity: 1, y: 0, transition: { duration: 420 } }"
>
  Content
</section>
```

## Docker

```bash
docker build -t nuxt-boilerplate .
docker run -p 3000:3000 --env-file .env nuxt-boilerplate
```

## Notes

- ESLint removed. Biome handles lint and format.
- GraphQL not included. Use REST endpoints.
- `npm audit` currently reports `0 vulnerabilities`.
