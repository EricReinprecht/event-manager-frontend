import { useMutation, useQueryClient } from '@tanstack/react-query';

import { completeProfile } from '@user/api/user.api';

export function useCompleteProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: completeProfile,

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['current-user'],
            });
        },
    });
}
