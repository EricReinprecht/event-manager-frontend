import { useQuery } from '@tanstack/react-query';

import { getUserParties } from '@user/api/user-parties.api';
import type { PartyFilter } from '@user/types/party.types';

export function useUserParties(filters: PartyFilter) {
    return useQuery({
        queryKey: ['user-parties', filters],

        queryFn: () => getUserParties(filters),

        staleTime: 30_000,

        placeholderData: (previous) => previous,
    });
}
