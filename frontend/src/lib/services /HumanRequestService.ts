import axios from 'axios';

export interface HumanRequest {
  firstName: string | undefined;
  lastName: string | undefined;
  fatherName: string | undefined;
  phoneNumber: string | undefined;
  contactFirstName: string | undefined;
  contactLastName: string | undefined;
  contactFathersName: string | undefined;
  contactPhone: string | undefined;
  humanDesc: string | undefined;
  canBeDied: boolean;
  military: boolean;
  humanImage: string | undefined;
  doneThings: string | undefined;
  latitude: number | null;
  longitude: number | null;
}

export const HumanRequestService = {
  async createRequest({ data }: { data: HumanRequest }) {
    const uploadedFileInfo = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_URL}/public_api/upload/file/`,
      { file_data: data.humanImage }
    );
    const parsedUploadedFileInfo = await uploadedFileInfo.data;
    const createData = {
      first_name: data.firstName,
      last_name: data.lastName,
      surname: data.fatherName,
      description: data.humanDesc,
      completed_actions: data.doneThings,
      phone_number: data.phoneNumber,
      contact_phone_number: data.contactPhone,
      probably_dead: data.canBeDied,
      is_soldier: data.military,
      last_location_longitude: data.longitude,
      last_location_latitude: data.longitude,
      attachment_id: parsedUploadedFileInfo.id
    };
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_URL}/public_api/request/create/`,
      createData
    );
  }
};
