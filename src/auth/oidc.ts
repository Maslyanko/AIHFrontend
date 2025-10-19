import type { AuthProviderProps } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';

export const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY as string,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID as string,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI as string,
  response_type: 'code',
  scope: (import.meta.env.VITE_OIDC_SCOPE as string) ?? 'openid profile email',
  automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }), // хранение в sessionStorage
  onSigninCallback: () => {
    // чистим query-параметры после коллбэка
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
