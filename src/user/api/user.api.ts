import apiClient from '@api/client';
import type { CompleteProfileRequest } from '@user/types/user.types';

export async function getMe() {
    const response = await apiClient.get('/users/me');

    return response.data;
}

export async function completeProfile(data: CompleteProfileRequest) {
    const response = await apiClient.put('/users/me/profile', {
        firstName: data.firstName,
        lastName: data.lastName,
    });

    return response.data;
}
