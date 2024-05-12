import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import type { Messages } from 'primereact/messages';
import React, { useRef } from 'react';

interface Location {
  latitude: number | null;
  longitude: number | null;
}

// Define a type for the component props
interface CreateRouteFormProps {
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  location: Location;
  time: number | null;
  distance: number | null;
  setLocation: (location: Location) => void;
  setTime: (time: number) => void;
  setDistance: (distance: number) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px' // Adjust size as needed
};

const center = {
  lat: 50.4501,
  lng: 30.5234
};

const CreateRouteForm: React.FC<CreateRouteFormProps> = ({
  onFormSubmit,
  location,
  time,
  distance,
  setLocation,
  setTime,
  setDistance
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API || ''
  });
  const message = useRef<Messages>(null);

  const addSuccessMessage = () => {
    message.current?.show({
      severity: 'success',
      content: 'Успішно створений маршрут'
    });
  };
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const newLocation = {
      latitude: event.latLng?.lat() || null,
      longitude: event.latLng?.lng() || null
    };
    setLocation(newLocation);
  };

  if (loadError) return <div>Error loading maps</div>;

  return (
    <form onSubmit={onFormSubmit}>
      <div className="field">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              location.latitude && location.longitude
                ? { lat: location.latitude, lng: location.longitude }
                : center
            }
            zoom={10}
            onClick={handleMapClick}
          >
            {location.latitude && location.longitude && (
              <Marker
                position={{ lat: location.latitude, lng: location.longitude }}
              />
            )}
          </GoogleMap>
        ) : (
          <>Loading...</>
        )}
      </div>
      <div className="p-fluid formgrid grid">
        <div className="field col-12 md:col-6">
          <label htmlFor="time">Максимальна тривалість (год)</label>
          <InputNumber
            id="time"
            value={time || 0}
            onValueChange={e => setTime(e.value)}
          />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="distance">Максимальна дальність (км)</label>
          <InputNumber
            id="distance"
            value={distance || 0}
            onValueChange={e => setDistance(e.value)}
          />
        </div>
      </div>
      <Button onClick={addSuccessMessage} type="submit" label="Build Route" />
    </form>
  );
};

export default CreateRouteForm;
