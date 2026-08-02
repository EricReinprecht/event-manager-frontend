import { useMutation, useQueryClient } from '@tanstack/react-query';

import { publishParty } from '@user/api/user-publish-party.api';

export function usePartyPublication(id: string) {
    const queryClient = useQueryClient();

    function updateParty(data: Awaited<ReturnType<typeof publishParty>>) {
        queryClient.setQueryData(['party', id], data);
        void queryClient.invalidateQueries({ queryKey: ['user-parties'] });
    }

    const publish = useMutation({
        mutationFn: () => publishParty(id),
        onSuccess: updateParty,
    });

    return publish;
}
