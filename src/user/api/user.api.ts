import apiClient from '@api/client';

export async function getMe() {
    const response = await apiClient.get('/users/me');

    return response.data;
}
