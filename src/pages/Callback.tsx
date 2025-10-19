import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
  const auth = useAuth();
  const navigate = useNavigate();

  // После того как провайдер обработает callback и авторизует пользователя,
  // делаем редирект туда, где хотели оказаться до логина.
  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      const to = sessionStorage.getItem('post_login_redirect') || '/';
      navigate(to, { replace: true });
    }
  }, [auth.isLoading, auth.isAuthenticated, navigate]);

  return <div className="container">Завершаем вход…</div>;
}
