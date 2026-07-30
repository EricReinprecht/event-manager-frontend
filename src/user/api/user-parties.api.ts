import apiClient from '@api/client';
import routes from '@/constants/routes';
import type { PartyFilter, PaginatedParties } from '@user/types/party.types';

export async function getUserParties(filters: PartyFilter): Promise<PaginatedParties> {
    const response = await apiClient.get(`${routes.UserParties}`, { params: filters });
    return response.data;
}
