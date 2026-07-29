import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { register } from '@auth/api/auth.api';
import type { RegisterRequest } from '@auth/types/register.types';

export function useRegister(options?: UseMutationOptions<unknown, Error, RegisterRequest>) {
    return useMutation({
        mutationFn: register,

        ...options,
    });
}
