'use client';

import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';

import CreateRouteForm from '@/components/organisms/Form/CreateRouteForm';
import { RouteService } from '@/lib/services /RouteService';
import type { Location } from '@/redux/slice/humanSearchDoneThingsSlice';

export default function Page() {
  const router = useRouter();
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0
  });
  const [time, setTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  const handleSubmit = e => {
    e.preventDefault();
    RouteService.createRoute({
      maxLength: distance,
      maxTime: time,
      location
    });
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('auth-tokens-development');
      if (!token) {
        router.push('/login'); // Use the router object from useRouter hook for redirection
      }
    };

    checkLoginStatus();
  }, [router]);

  return (
    <Card>
      <CreateRouteForm
        onFormSubmit={handleSubmit}
        location={location}
        time={time}
        distance={distance}
        setLocation={setLocation}
        setTime={setTime}
        setDistance={setDistance}
      />
    </Card>
  );
}
