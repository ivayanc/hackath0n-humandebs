import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import {
  addFatherName,
  addFirstName,
  addLastName,
  addPhone
} from '@/redux/slice/humanBaseInfoSlice';
import { changeStep, Steps } from '@/redux/slice/stepSlice';



export default function HumanBaseInfoForm() {
  const dispatch = useAppDispatch();
  const { firstName, lastName, fatherName, phoneNumber } = useAppSelector(
    state => state.baseInfo
  );

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const fatherNameInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);
  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !firstNameInputRef.current ||
      !lastNameInputRef.current ||
      !fatherNameInputRef.current ||
      !phoneNumberInputRef.current
    )
      return;
    dispatch(addFirstName(firstNameInputRef.current.value));
    dispatch(addLastName(lastNameInputRef.current.value));
    dispatch(addPhone(phoneNumberInputRef.current.value));
    dispatch(addFatherName(fatherNameInputRef.current.value));
    dispatch(changeStep(Steps.ADDITIONAL));
  };
  return (
    <form onSubmit={handleFormSubmission}>
      <div className="card p-fluid">
        <h5>Дані людини</h5>
        <div className="field">
          <label htmlFor="firstName">Імʼя</label>
          <InputText
            required
            ref={firstNameInputRef}
            id="firstName"
            value={firstName}
            type="text"
          />
        </div>
        <div className="field">
          <label htmlFor="lastName">Прізвище</label>
          <InputText
            required
            ref={lastNameInputRef}
            id="lastName"
            value={lastName}
            type="text"
          />
        </div>
        <div className="field">
          <label htmlFor="fathersName">Імʼя побатькові</label>
          <InputText
            required
            ref={fatherNameInputRef}
            id="fathersName"
            value={fatherName}
            type="text"
          />
        </div>
        <div className="field">
          <label htmlFor=""> Номер телефону</label>
          <InputText
            required
            ref={phoneNumberInputRef}
            id="phoneNumber"
            value={phoneNumber}
            type="tel"
          />
        </div>
        <Button label="Next" type="submit" />
      </div>
    </form>
  );
}
