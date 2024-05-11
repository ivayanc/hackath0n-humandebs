import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
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
    latitude: location.latitude ?? 50.4501, // Default latitude for Kyiv
    longitude: location.longitude ?? 30.5234 // Default longitude for Kyiv
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
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: currentPosition.latitude,
              lng: currentPosition.longitude
            }} // Set initial center
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
        </LoadScript>
        <Button type="submit" label="Next" />
      </form>
    </div>
  );
}
