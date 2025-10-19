import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    auth
      .signinRedirectCallback()
      .then(() => {
        const to = sessionStorage.getItem('post_login_redirect') || '/';
        navigate(to, { replace: true });
      })
      .catch((e) => setError(String(e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <div className="container">Ошибка входа: {error}</div>;
  return <div className="container">Завершаем вход…</div>;
}
