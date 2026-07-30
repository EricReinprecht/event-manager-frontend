import type { CreatePartyRequest } from '@user/types/party.types';
import apiClient from '@/api/client';
import routes from '@/constants/routes';

export async function createParty(data: CreatePartyRequest) {
    const response = await apiClient.put(routes.PartyCreate, data);
    return response.data;
}
