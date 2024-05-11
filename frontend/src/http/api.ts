import axios from 'axios';
import {applyAuthTokenInterceptor, IAuthTokens, TokenRefreshRequest} from "axios-jwt";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const axiosInstance = axios.create({ baseURL: BASE_URL });

const requestRefresh: TokenRefreshRequest = async (

    refreshToken: string
): Promise<IAuthTokens | string> => {
    const response = await axios.post(`${BASE_URL}/auth/refresh/`, {
        token: refreshToken
    });

    return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token
    };
};

applyAuthTokenInterceptor(axiosInstance, {
    requestRefresh
});
