import { useMutation } from '@tanstack/react-query';

import { verifyEmail } from '@auth/api/auth.api';

export function useVerifyEmail() {
    return useMutation({
        mutationFn: verifyEmail,
    });
}
