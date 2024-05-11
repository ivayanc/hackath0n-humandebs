'use client';

import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';

import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';

import { LayoutProvider } from '@/layout/context/layoutcontext';
import { store } from '@/redux/store';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          id="theme-css"
          href="/themes/lara-light-indigo/theme.css"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url("/images/background.svg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Provider store={store}>
          <PrimeReactProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </PrimeReactProvider>
        </Provider>
      </body>
    </html>
  );
}
