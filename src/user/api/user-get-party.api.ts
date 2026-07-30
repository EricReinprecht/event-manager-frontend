import apiClient from '@api/client';
import type { Party } from '@user/types/party.types';
import routes from '@/constants/routes';
import { route } from '@/api/routes';

export async function getParty(id: string): Promise<Party> {
    const response = await apiClient.get(route(routes.PartyByID, { id }));
    return response.data;
}
