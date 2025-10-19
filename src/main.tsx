import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';
import { QueryClientProvider } from '@tanstack/react-query';

import { router } from './routes';
import { oidcConfig } from '@/auth/oidc';
import { queryClient } from '@/api/queryClient';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);