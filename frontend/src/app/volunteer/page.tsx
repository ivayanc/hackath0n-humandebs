'use client';

import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';

import VolunteerDashboardTemplate from '@/components/templates/VolunteerDashboardTemplate';
import type { Dashboard } from '@/lib/services /DashboardService';
import { DashboardService } from '@/lib/services /DashboardService';

export default async function Page() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<Dashboard>();
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('auth-tokens-development');
      if (!token) {
        router.push('/login');
      }
    };

    checkLoginStatus();
    const fetchDashboard = async () => {
      try {
        const data = await DashboardService.getDashboards();
        setDashboard(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboard();
  }, [router]);
  return (
    <Card>
      {dashboard && (
        <VolunteerDashboardTemplate
          closed_requests={dashboard.closed_requests}
          active_volunteers={dashboard.active_volunteers}
          active_requests={dashboard.active_requests}
          listRegionData={dashboard.top5_regions}
        />
      )}
    </Card>
  );
}
