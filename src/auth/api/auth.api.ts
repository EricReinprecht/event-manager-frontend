import apiClient from '@api/client';
import type { RegisterRequest } from '@auth/types/auth.types';

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
