import { useAuth } from 'react-oidc-context';

export default function Login() {
  const auth = useAuth();
  const login = async () => {
    await auth.signinRedirect();
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <p>Для доступа на защищённые страницы нужна авторизация.</p>
      <button onClick={login}>Login via OIDC</button>
    </div>
  );
}
