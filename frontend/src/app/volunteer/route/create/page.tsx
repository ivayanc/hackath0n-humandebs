'use client';

import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import type { Messages } from 'primereact/messages';
import { useEffect, useRef, useState } from 'react';

import CreateRouteForm from '@/components/organisms/Form/CreateRouteForm';
import { RouteService } from '@/lib/services /RouteService';
import type { Location } from '@/redux/slice/humanSearchDoneThingsSlice';

export default function Page() {
  const router = useRouter();
  const [location, setLocation] = useState<Location>({
    latitude: 48.58862829983634,
    longitude: 37.83539730105749
  });
  const [time, setTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const message = useRef<Messages>(null);

  const handleSubmit = e => {
    e.preventDefault();
    RouteService.createRoute({
      maxLength: distance,
      maxTime: time,
      location
    })
      .then(() => {
        setLocation({ latitude: 0, longitude: 0 });
        setTime(0);
        setDistance(0);
        message.current?.show({
          severity: 'success',
          content: 'Успішно створений маршрут'
        });
      })
      .catch(error => {
        console.error('Failed to create route:', error);
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
