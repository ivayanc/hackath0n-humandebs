import { setAuthTokens } from 'axios-jwt';

import { axiosInstance } from '@/http/api';

export const AuthService = {
  async login(params: { email: string; password: string }) {
    const response = await axiosInstance.post(`/auth/login/`, params);
    await setAuthTokens({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token
    });
  }
};
