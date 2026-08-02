import { useMutation, useQueryClient } from '@tanstack/react-query';

import { publishParty } from '@user/api/user-publish-party.api';

export function usePublishParty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: publishParty,
        onSuccess: (party) => {
            queryClient.setQueryData(['party', party.id], party);
            void queryClient.invalidateQueries({ queryKey: ['user-parties'] });
        },
    });
}
