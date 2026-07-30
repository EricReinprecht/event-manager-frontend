import apiClient from '@api/client';
import type { Party } from '@user/types/party.types';

export async function getParty(id: string): Promise<Party> {
    const response = await apiClient.get(`/parties/${id}`);

    return response.data;
}
