import { GoogleMap } from '@react-google-maps/api';
import Link from 'next/link';
import { Button } from 'primereact/button';

import Text from '@/components/atoms/Text';
import { useAppSelector } from '@/hooks/useApp';
import type { HumanRequest } from '@/lib/services /HumanRequestService';
import { HumanRequestService } from '@/lib/services /HumanRequestService';

export default function HumanSearchSummary() {
  const { firstName, lastName, fatherName, phoneNumber } = useAppSelector(
    state => state.baseInfo
  );
  const {
    contactFirstName,
    contactLastName,
    contactFathersName,
    contactPhone
  } = useAppSelector(state => state.contactInfo);
  const { doneThings, location } = useAppSelector(
    state => state.searchDoneThings
  );
  const { humanDesc, canBeDied, military, humanImage } = useAppSelector(
    state => state.addInfo
  );

  const createData: HumanRequest = {
    firstName,
    lastName,
    fatherName,
    phoneNumber,
    contactFathersName,
    canBeDied,
    military,
    contactPhone,
    contactLastName,
    contactFirstName,
    humanImage,
    humanDesc,
    doneThings,
    longitude: location.longitude,
    latitude: location.latitude
  };
  const handleConfirm = () => {
    HumanRequestService.createRequest({ data: createData });
  };

  const containerStyle = {
    width: '100%',
    height: '300px'
  };
  console.log(location.latitude, location.longitude);
  return (
    <div className="card p-fluid">
      <h5>Підтвердьте інформацію</h5>
      <div className="field">
        <Text text="ПІБ:" />
        <p>{`${firstName} ${lastName} ${fatherName}`}</p>
      </div>
      <div className="field">
        <Text text="Номер телефону:" />
        <p>{phoneNumber}</p>
      </div>
      <div className="field">
        <Text text="Опис людини:" />
        <p>{humanDesc}</p>
      </div>
      <div className="field">
        <Text text="Можливо мертвий:" />
        <p>{canBeDied ? 'Так' : 'Ні'}</p>
      </div>
      <div className="field">
        <Text text="Військовий:" />
        <p>{military ? 'Так' : 'Ні'}</p>
      </div>
      <div className="field">
        <Text text=" Загружене зображення:" />
        {humanImage ? (
          <img
            src={humanImage}
            alt="Uploaded"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        ) : (
          <p>Немає зображення.</p>
        )}
      </div>
      <div className="field">
        <Text text=" Контактна особа:" />
        <p>{`${contactFirstName} ${contactLastName} ${contactFathersName}`}</p>
      </div>
      <div className="field">
        <Text text=" Контактний номер телефону:" />
        <p>{contactPhone}</p>
      </div>
      <div className="field">
        <Text text="Зроблені дії:" />
        <p>{doneThings || 'Немає інформації'}</p>
      </div>
      <div className="field">
        {location.latitude && location.longitude && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: location.latitude, lng: location.longitude }}
            zoom={15}
            options={{
              zoomControl: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              draggable: false,
              streetViewControl: false,
              mapTypeControl: false
            }}
          />
        )}
      </div>
      <Link href="/">
        <Button label="Підтвердити" onClick={handleConfirm} />
      </Link>
    </div>
  );
}
