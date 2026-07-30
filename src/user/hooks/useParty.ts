import { useQuery } from '@tanstack/react-query';

import { getParty } from '@user/api/user-get-party.api';

export function useParty(id?: string) {
    return useQuery({
        queryKey: ['party', id],

        queryFn: () => getParty(id!),

        enabled: !!id,
    });
}
