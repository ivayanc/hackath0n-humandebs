import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import Layout from '@/layout/layout';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <Suspense fallback={<div>Loading...</div>}>
    <Layout>{children}</Layout>;
  </Suspense>
}
