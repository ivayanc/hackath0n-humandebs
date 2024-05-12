import { axiosInstance } from '@/http/api';
import type { HumanBackRequest } from '@/lib/services /HumanRequestService';

export interface MainRegion {
  id: number;
  region_name: string;
  longitude: number;
  latitude: number;
}

export interface Checkpoint {
  id: number;
  region: MainRegion;
  position: number;
  google_map_url: string;
  human_requests?: HumanBackRequest[];
}
export const CheckpointService = {
  async getCheckpointsByRouteId({ routeId }: { routeId: number }) {
    return axiosInstance.get<Checkpoint[]>(`/routes/${routeId}/checkpoints/`);
  }
};
