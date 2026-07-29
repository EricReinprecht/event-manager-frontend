import api from '@/api/client';

import type { UserPartiesFilter, PaginatedParties } from '@user/types/parties.types';

export async function getUserParties(filters: UserPartiesFilter): Promise<PaginatedParties> {
    const response = await api.get('/api/users/me/parties', {
        params: filters,
    });

    return response.data;
}
