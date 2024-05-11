import type { Metadata } from 'next';

import Layout from '@/layout/layout';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PROJECT_NAME,
  description: 'Project desc this is template',
  robots: { index: false, follow: false },
  viewport: { initialScale: 1, width: 'device-width' },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <Layout>{children}</Layout>;
}
