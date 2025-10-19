import { useAuth } from 'react-oidc-context';
import { Link, Outlet } from 'react-router-dom';

export default function App() {
  const auth = useAuth();

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/protected">Protected</Link>
        {auth.isAuthenticated ? (
          <span>👤 {auth.user?.profile?.name || 'user'}</span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Outlet />
    </>
  );
}
