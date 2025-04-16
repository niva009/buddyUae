// components/ClientProviders.jsx
'use client';

import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import QueryProvider from '../providers/QueryProvider';

export default function ClientProviders({ children }) {
  return (
    <>
      <Toaster
        style={{ zIndex: '999' }}
        toastOptions={{
          duration: 1000,
        }}
      />
      <HelmetProvider>
        <QueryProvider>{children}</QueryProvider>
      </HelmetProvider>
    </>
  );
}
