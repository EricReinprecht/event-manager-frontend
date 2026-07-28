import { useMutation } from '@tanstack/react-query';

import apiClient from '@api/client';

type ForgotPasswordRequest = {
    identifier: string;
};

export function useForgotPassword() {
    return useMutation({
        mutationFn: async (data: ForgotPasswordRequest) => {
            const response = await apiClient.post('/auth/forgot-password', data);

            return response.data;
        },
    });
}
