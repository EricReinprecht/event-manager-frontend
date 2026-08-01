import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import i18n from '@/i18n';

import { getToken, removeToken, setToken } from '@auth/storage/token.storage';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

interface RefreshResponse {
    accessToken: string;
}

const baseURL = 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL,
    withCredentials: true,
});

const refreshClient = axios.create({
    baseURL,
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Accept-Language'] = i18n.resolvedLanguage ?? i18n.language;

    return config;
});

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
    if (!refreshPromise) {
        refreshPromise = refreshClient
            .post<RefreshResponse>('/auth/refresh')
            .then((response) => {
                const token = response.data.accessToken;

                if (!token) {
                    throw new Error('Refresh response contains no access token.');
                }

                setToken(token);

                return token;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
}

apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequestConfig | undefined;

        if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const token = await refreshAccessToken();

            originalRequest.headers.Authorization = `Bearer ${token}`;

            return apiClient(originalRequest);
        } catch (refreshError) {
            removeToken();

            return Promise.reject(refreshError);
        }
    },
);

export default apiClient;
