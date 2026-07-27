import { useMutation } from '@tanstack/react-query';

import { verifyEmail } from '@auth/api/auth.api';

export function useVerifyEmail(
    onSuccess: (data: { token: string }) => void,
    onError: (error: unknown) => void,
) {
    return useMutation({
        mutationFn: verifyEmail,

        onSuccess,

        onError,
    });
}
