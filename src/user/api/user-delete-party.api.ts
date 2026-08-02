import apiClient from '@/api/client';
import { route } from '@/api/routes';
import routes from '@/constants/routes';

export async function deleteParty(id: string) {
    const response = await apiClient.delete(route(routes.PartyDelete, { id }));
    return response.data;
}
