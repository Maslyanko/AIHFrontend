# AI-hunt SPA (Vite + React + TS)

## Скрипты
- `npm run dev` — локальный запуск
- `npm run test` / `npm run test:ci` — тесты (Vitest + Testing Library + MSW)
- `npm run lint` — ESLint
- `npm run format` / `npm run format:check` — Prettier
- `npm run typecheck` — `tsc --noEmit`
- `npm run build` — прод сборка

## Переменные окружения
Смотри `.env.sample`. Важно: для Vite все переменные должны иметь префикс `VITE_`.

- `VITE_OIDC_AUTHORITY` — URL провайдера OIDC
- `VITE_OIDC_CLIENT_ID` — `client_id`
- `VITE_OIDC_REDIRECT_URI` — `https://host/auth/callback`
- `VITE_OIDC_SCOPE` — например, `openid profile email offline_access`
- `VITE_BACKEND_API` — базовый URL API (например, `http://localhost:8080/api`)

## OAuth2/OIDC (Authorization Code + PKCE)
- Кнопка **Login** делает `signinRedirect()` → редирект на провайдера
- `/auth/callback` обрабатывает `code+state+nonce` через `signinRedirectCallback()`
- Токены хранятся в `sessionStorage` (см. `userStore`)
- `ProtectedRoute` без токена ведёт на `/login`
- API-вызовы добавляют `Authorization: Bearer <access_token>` (см. `useApi`)
- **Logout** — `signoutRedirect()`

## Docker
- Мультистейдж Dockerfile (build → nginx)
- Nginx проксирует `/api` → `BACKEND_API` (envsubst в entrypoint)

### Локально (docker)