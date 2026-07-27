import apiClient from '@api/client';
import type { RegisterRequest } from '@auth/types/auth.types';

export async function register(data: RegisterRequest) {
    const response = await apiClient.post('/auth/register', data);

    return response.data;
}

export async function verifyEmail(token: string) {
    console.log('VERIFY API CALL');

    const response = await apiClient.get('/auth/verify-email', {
        params: {
            token,
        },
    });

    console.log('VERIFY API RESPONSE JSON', JSON.stringify(response.data, null, 2));

    return response.data;
}
