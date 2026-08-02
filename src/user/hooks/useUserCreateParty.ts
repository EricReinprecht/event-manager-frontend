import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createParty } from '@user/api/user-create-party.api';
import type { CreatePartyRequest } from '@user/types/party.types';
import { getValidationErrors } from '@/api/errors/validation.errors';

export function useCreateParty() {
    const queryClient = useQueryClient();
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const mutation = useMutation({
        mutationFn: (data: CreatePartyRequest) => createParty(data),
        onSuccess() {
            setValidationErrors({});
            queryClient.invalidateQueries({ queryKey: ['user-parties'] });
        },
        onError(error) {
            setValidationErrors(getValidationErrors(error) ?? {});
        },
    });
    return { ...mutation, validationErrors };
}
