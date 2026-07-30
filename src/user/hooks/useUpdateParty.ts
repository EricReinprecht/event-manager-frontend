import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateParty } from '@user/api/user-update-party.api';

export function useUpdateParty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => updateParty(id, data),

        onSuccess(_, variables) {
            queryClient.invalidateQueries({
                queryKey: ['party', variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ['user-parties'],
            });
        },
    });
}
