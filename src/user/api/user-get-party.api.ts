import apiClient from '@api/client';
import type { PartyDetailed } from '@user/types/party.types';
import routes from '@/constants/routes';
import { route } from '@/api/routes';

export async function getParty(id: string): Promise<PartyDetailed> {
    const response = await apiClient.get(route(routes.PartyByID, { id }));
    return response.data;
}
