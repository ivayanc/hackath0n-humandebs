import axios from 'axios';

export interface Region {
  region_name: string;
  open_requests: number;
}

export interface Dashboard {
  closed_requests: number;
  active_requests: number;
  active_volunteers: number;
  top5_regions: Region[];
}
export const DashboardService = {
  async getDashboards() {
    const response = await axios.get<Dashboard>(
      `${process.env.NEXT_PUBLIC_BACK_URL}/public_api/dashboard/`
    );
    return response.data;
  }
};
