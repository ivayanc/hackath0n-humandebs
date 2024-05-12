import { axiosInstance } from '@/http/api';
import type { Location } from '@/redux/slice/humanSearchDoneThingsSlice';

export interface RouteCreateData {
  location: Location;
  maxTime: number;
  maxLength: number;
}

export interface Route {
  id: number;
  route_location: string;
  route_time: number;
  created_at: string;
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
  },

  async getAllRoutes() {
    return axiosInstance.get<Route[]>('/routes/list');
  }
};
