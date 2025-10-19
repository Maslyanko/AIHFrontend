import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'react-oidc-context';
import { useApi, ForbiddenError } from '@/api/client';
import { useLocation } from 'react-router-dom';

export default function Protected() {
  const auth = useAuth();
  const { apiFetch } = useApi();
  const location = useLocation();
  const force403 = new URLSearchParams(location.search).get('force403') === '1';

  const { data, isLoading, error } = useQuery({
    queryKey: ['secureData', force403],
    queryFn: () =>
      apiFetch<{ message: string }>('/protected', {
        headers: force403 ? { 'x-force-403': '1' } : undefined,
      }),
  });

  const logout = async () => {
    await auth.signoutRedirect();
  };

  if (isLoading) return <div className="container">Загрузка…</div>;
  if (error) {
    if (error instanceof ForbiddenError)
      return (
        <div className="container">
          <h1>Forbidden</h1>Нет прав доступа.
        </div>
      );
    return <div className="container">Ошибка: {(error as Error).message}</div>;
  }

  return (
    <div className="container">
      <h1>Защищённая страница</h1>
      <p>Данные API: {data?.message}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}