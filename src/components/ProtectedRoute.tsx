import { useAuth } from 'react-oidc-context';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoading) {
    return <p className="container">Загрузка…</p>;
  }

  if (!auth.isAuthenticated) {
    sessionStorage.setItem('post_login_redirect', location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
