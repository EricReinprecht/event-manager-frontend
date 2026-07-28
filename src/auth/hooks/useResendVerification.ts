import { useMutation } from '@tanstack/react-query';
import apiClient from '@api/client';

import type { ResendVerificationRequest } from '@auth/types/resend-verification.types';

export function useResendVerification() {
    return useMutation({
        mutationFn: async (data: ResendVerificationRequest) => {
            const response = await apiClient.post('/auth/resend-verification', data);

            return response.data;
        },
    });
}
