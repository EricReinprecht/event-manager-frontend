import api from '@/api/client';

import routes from '@/constants/routes';

import type { UserPartiesFilter, PaginatedParties } from '@user/types/parties.types';

export async function getUserParties(filters: UserPartiesFilter): Promise<PaginatedParties> {
    const response = await api.get(`${routes.UserParties}`, {
        params: filters,
    });

    return response.data;
}
