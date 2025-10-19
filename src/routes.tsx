import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import Callback from '@/pages/Callback';
import Forbidden from '@/pages/Forbidden';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Protected from '@/pages/Protected';

import App from './App';

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
