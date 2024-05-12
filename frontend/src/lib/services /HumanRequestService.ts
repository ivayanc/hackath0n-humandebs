import axios from 'axios';

import { axiosInstance } from '@/http/api';
import type { MainRegion } from '@/lib/services /CheckpointService';

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

export interface HumanComment {
  id: number;
}

export interface HumanBackRequest {
  id: number;
  first_name: string;
  last_name: string;
  surname: string;
  description: string;
  completed_actions: string;
  phone_number: string;
  contact_phone_number: string;
  probably_dead: boolean;
  is_soldier: boolean;
  last_location_longitude: number;
  last_location_latitude: number;
  region: MainRegion;
  photo: string;
  contact_last_name: string;
  contact_surname: string;
  contact_first_name: string;
  comments: HumanComment[];
}

export const HumanRequestService = {
  async getRequests({ id }: { id: number }) {
    return axiosInstance.get<HumanBackRequest[]>(`/requests/list/${id}/`);
  },

  async closeRequest({ id }: { id: number }) {
    axiosInstance.post(`/requests/${id}/close/`);
  },

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
      attachment_id: parsedUploadedFileInfo.id,
      contact_first_name: data.contactFirstName,
      contact_last_name: data.contactLastName,
      contact_surname: data.contactFathersName
    };
    return axios.post(
      `${process.env.NEXT_PUBLIC_BACK_URL}/public_api/request/create/`,
      createData
    );
  }
};
