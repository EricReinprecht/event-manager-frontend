import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteParty } from '@user/api/user-delete-party.api';

export function useDeleteParty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteParty,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['user-parties'] });
        },
    });
}
