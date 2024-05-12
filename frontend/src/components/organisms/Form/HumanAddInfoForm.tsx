import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

import IsCanBeDied from '@/components/molecules/IsCanBeDied';
import IsMilitary from '@/components/molecules/IsMilitary';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { addHumanDesc, addHumanImage } from '@/redux/slice/humanAddInfoSlice';
import { changeStep, Steps } from '@/redux/slice/stepSlice';

export default function HumanAddInfoForm() {
  const dispatch = useAppDispatch();
  const { humanDesc } = useAppSelector(state => state.addInfo);
  const humanDescInputRef = useRef<HTMLInputElement>(null);
  const toast = useRef<Toast>(null);
  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!humanDescInputRef.current) return;
    dispatch(addHumanDesc(humanDescInputRef.current.value));
    dispatch(changeStep(Steps.SEARCH_DONE_THINGS));
  };

  const customBase64Uploader = async event => {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = loadEvent => {
        const base64 = loadEvent.target?.result;
        if (typeof base64 === 'string') {
          dispatch(addHumanImage(base64));
          toast.current?.show({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded and Converted',
            life: 3000
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card p-fluid">
      <h5>Додаткова інформація</h5>
      <form onSubmit={handleFormSubmission}>
        <div className="field">
          <label htmlFor="humanDesc">Опис людини</label>
          <InputTextarea
            required
            ref={humanDescInputRef}
            id="humanDesc"
            value={humanDesc}
          />
        </div>
        <IsCanBeDied />
        <IsMilitary />
        <div className="field">
          <FileUpload
            mode="basic"
            auto
            name="demo[]"
            accept="image/*"
            customUpload
            uploadHandler={customBase64Uploader}
          />
        </div>
        <Button label="Next" type="submit" />
      </form>
      <Toast ref={toast} /> {/* Add this line to render Toast component */}
    </div>
  );
}
