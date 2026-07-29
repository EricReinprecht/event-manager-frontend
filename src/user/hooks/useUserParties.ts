import { useQuery } from '@tanstack/react-query';

import { getUserParties } from '@user/api/user-parties.api';

import type { UserPartiesFilter } from '@user/types/parties.types';

export function useUserParties(filters: UserPartiesFilter) {
    return useQuery({
        queryKey: ['user-parties', filters],

        queryFn: () => getUserParties(filters),

        staleTime: 30_000,
    });
}
