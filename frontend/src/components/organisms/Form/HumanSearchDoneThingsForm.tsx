import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import {
  addDoneThings,
  setLocation
} from '@/redux/slice/humanSearchDoneThingsSlice';
import { changeStep, Steps } from '@/redux/slice/stepSlice';

export default function HumanSearchDoneThingsForm() {
  const dispatch = useAppDispatch();
  const { doneThings, location } = useAppSelector(
    state => state.searchDoneThings
  );

  const doneThingsInputRef = useRef<HTMLInputElement>(null);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: location.latitude ?? 48.58862829983634,
    longitude: location.longitude ?? 37.83539730105749
  });

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!doneThingsInputRef.current) return;
    dispatch(addDoneThings(doneThingsInputRef.current.value));
    dispatch(setLocation(currentPosition));
    dispatch(changeStep(Steps.CONTACT));
  };

  const handleMapClick = event => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCurrentPosition({ latitude: lat, longitude: lng });
  };

  const containerStyle = {
    width: '100%',
    height: '300px'
  };
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API || ''
  });
  return (
    <div className="card p-fluid">
      <h5>Зроблені дії</h5>
      <form onSubmit={handleFormSubmission}>
        <div className="field">
          <label htmlFor="doneThings">Зроблені дії</label>
          <InputTextarea
            required
            ref={doneThingsInputRef}
            id="doneThings"
            value={doneThings}
          />
        </div>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: currentPosition.latitude,
              lng: currentPosition.longitude
            }}
            zoom={10}
            onClick={handleMapClick}
          >
            {currentPosition.latitude && currentPosition.longitude && (
              <Marker
                position={{
                  lat: currentPosition.latitude,
                  lng: currentPosition.longitude
                }}
              />
            )}
          </GoogleMap>
        ) : (
          <></>
        )}
        <Button type="submit" label="Next" />
      </form>
    </div>
  );
}
