import { axiosInstance } from '@/http/api';
import type { Location } from '@/redux/slice/humanSearchDoneThingsSlice';

export interface RouteCreateData {
  location: Location;
  maxTime: number;
  maxLength: number;
}

export const RouteService = {
  async createRoute(data: RouteCreateData) {
    const params = {
      longitude: data.location.longitude,
      latitude: data.location.latitude,
      max_distance: data.maxLength,
      max_time: data.maxTime * 3600
    };
    return axiosInstance.post('/routes/generate/', params);
  }
};
