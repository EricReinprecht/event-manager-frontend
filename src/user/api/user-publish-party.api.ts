import apiClient from '@/api/client';
import { route } from '@/api/routes';
import routes from '@/constants/routes';
import type { PartyDetailed } from '@user/types/party.types';

export async function publishParty(id: string): Promise<PartyDetailed> {
    const response = await apiClient.post(route(routes.PartyPublish, { id }));
    return response.data;
}
