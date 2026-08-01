import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateParty } from '@user/api/user-update-party.api';

import { getValidationErrors } from '@/api/errors/validation.errors';

export function useUpdateParty() {
    const queryClient = useQueryClient();

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const mutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => updateParty(id, data),

        onSuccess(_, variables) {
            setValidationErrors({});

            queryClient.invalidateQueries({
                queryKey: ['party', variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ['user-parties'],
            });
        },

        onError(error) {
            const errors = getValidationErrors(error);

            if (errors) {
                setValidationErrors(errors);
            }
        },
    });

    return {
        ...mutation,

        validationErrors,

        clearValidationErrors() {
            setValidationErrors({});
        },
    };
}
