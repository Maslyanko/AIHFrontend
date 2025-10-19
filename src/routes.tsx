import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Callback from '@/pages/Callback';
import Protected from '@/pages/Protected';
import Forbidden from '@/pages/Forbidden';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'auth/callback', element: <Callback /> },
      {
        path: 'protected',
        element: (
          <ProtectedRoute>
            <Protected />
          </ProtectedRoute>
        ),
      },
      { path: 'forbidden', element: <Forbidden /> },
    ],
  },
]);
