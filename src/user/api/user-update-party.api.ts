import type { CreatePartyRequest } from '@user/types/party.types';
import apiClient from '@/api/client';
import routes from '@/constants/routes';
import { route } from '@/api/routes';

export async function updateParty(id: string, data: CreatePartyRequest) {
    const response = await apiClient.put(route(routes.PartyUpdate, { id }), data);
    return response.data;
}
