'use client';

import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('auth-tokens-development');
      if (!token) {
        router.push('/login');
      }
    };

    checkLoginStatus().then();
  }, [router]);
  return (
    <Card
      style={{
        height: '600px'
      }}
    />
  );
}
