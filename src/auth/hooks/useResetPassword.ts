import { useMutation } from '@tanstack/react-query';

import apiClient from '@api/client';

type ResetPasswordRequest = {
    token: string;
    newPassword: string;
};

export function useResetPassword() {
    return useMutation({
        mutationFn: async (data: ResetPasswordRequest) => {
            const response = await apiClient.post('/auth/reset-password', data);

            return response.data;
        },
    });
}
