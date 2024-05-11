import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import {
  addContactFathersName,
  addContactFirstName,
  addContactLastName,
  addContactPhone
} from '@/redux/slice/humanContactInfoSlice';
import { changeStep, Steps } from '@/redux/slice/stepSlice';


export default function HumanContactInfoForm() {
  const dispatch = useAppDispatch();
  const {
    contactFirstName,
    contactLastName,
    contactFathersName,
    contactPhone
  } = useAppSelector(state => state.contactInfo);

  const contactFirstNameInputRef = useRef<HTMLInputElement>(null);
  const contactLastNameInputRef = useRef<HTMLInputElement>(null);
  const contactFathersNameInputRef = useRef<HTMLInputElement>(null);
  const contactPhoneInputRef = useRef<HTMLInputElement>(null);
  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !contactFirstNameInputRef.current ||
      !contactLastNameInputRef.current ||
      !contactFathersNameInputRef.current ||
      !contactPhoneInputRef.current
    )
      return;
    dispatch(addContactFirstName(contactFirstNameInputRef.current.value));
    dispatch(addContactLastName(contactLastNameInputRef.current.value));
    dispatch(addContactFathersName(contactFathersNameInputRef.current.value));
    dispatch(addContactPhone(contactPhoneInputRef.current.value));
    dispatch(changeStep(Steps.SUMMARY));
  };
  return (
    <div className="card p-fluid">
      <h5>Дані контактної особи</h5>
      <form onSubmit={handleFormSubmission}>
        <div className="field">
          <label htmlFor="contactFirstName">Імʼя</label>
          <InputText
            required
            id="contactFirstName"
            value={contactFirstName}
            type="text"
            ref={contactFirstNameInputRef}
          />
        </div>
        <div className="field">
          <label htmlFor="contactLastName">Прізвище</label>
          <InputText
            required
            id="contactLastName"
            value={contactLastName}
            type="text"
            ref={contactLastNameInputRef}
          />
        </div>
        <div className="field">
          <label htmlFor="contactFathersName">Імʼя побатькові</label>
          <InputText
            required
            id="contactFathersName"
            value={contactFathersName}
            type="text"
            ref={contactFathersNameInputRef}
          />
        </div>
        <div className="field">
          <label htmlFor="contactPhoneNumber"> Номер телефону</label>
          <InputText
            required
            id="contactPhoneNumber"
            value={contactPhone}
            type="tel"
            validateOnly
            ref={contactPhoneInputRef}
          />
        </div>
        <Button type="submit" label="Next" />
      </form>
    </div>
  );
}
