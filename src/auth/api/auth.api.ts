import apiClient from '@api/client';
import type { RegisterRequest } from '@auth/types/register.types';
import { setToken, removeToken } from '@auth/storage/token.storage';

export async function register(data: RegisterRequest) {
    const response = await apiClient.post('/auth/register', data);

    return response.data;
}

export async function verifyEmail(token: string) {
    const response = await apiClient.get('/auth/verify-email', {
        params: {
            token,
        },
    });

    return response.data;
}

import type { LoginRequest, LoginResponse } from '@auth/types/login.types';

export async function login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);

    setToken(response.data.accessToken);

    return response.data;
}

export async function logoutRequest() {
    try {
        await apiClient.post('/auth/logout');
    } finally {
        removeToken();
    }
}
