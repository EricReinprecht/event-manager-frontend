import apiClient from '@api/client';
import type { RegisterRequest } from '@auth/types/register.types';
import { getRefreshToken } from '@auth/storage/refresh-token.storage';

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
    const response = await apiClient.post('/auth/login', data);

    return response.data;
}

export function logoutRequest() {
    return apiClient.post('/auth/logout', {
        refreshToken: getRefreshToken(),
    });
}
