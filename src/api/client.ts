import { useAuth } from 'react-oidc-context';

export class ForbiddenError extends Error {}

export const useApi = () => {
  const auth = useAuth();
  const base = (import.meta.env.VITE_BACKEND_API as string) ?? '/api';

  const apiFetch = async <T = unknown>(path: string, init?: RequestInit): Promise<T> => {
    const headers = new Headers(init?.headers);
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

    const token = auth.user?.access_token;
    if (token) headers.set('Authorization', `Bearer ${token}`);

    const res = await fetch(`${base}${path}`, { ...init, headers });

    if (res.status === 403) throw new ForbiddenError('Forbidden');
    if (res.status === 401) throw new Error('Unauthorized');
    if (!res.ok) throw new Error(`API error ${res.status}`);

    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return (await res.json()) as T;
    return (await res.text()) as unknown as T;
  };

  return { apiFetch };
};
