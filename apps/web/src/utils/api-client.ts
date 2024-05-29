/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosInstance } from 'axios';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { auth } from '@/auth';
import { apiBaseUrl } from '@/config/const';

const apiClient: AxiosInstance = axios.create({
  baseURL: `${apiBaseUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config: any) => {
    let session;
    if (typeof window === 'undefined') session = await auth();
    else session = await getSession();
    // console.log(
    //   '!!!!!!!!!!!!!!!!!!!!!here',
    //   typeof window !== 'undefined' ? 'CLIENT SIDE' : 'SERVER SIDE'
    // );
    const access_token = session?.sessionToken;
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default apiClient;
