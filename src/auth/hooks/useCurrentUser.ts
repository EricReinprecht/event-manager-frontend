import { useQuery } from '@tanstack/react-query';

import apiClient from '@api/client';

export function useCurrentUser() {
    return useQuery({
        queryKey: ['current-user'],

        queryFn: async () => {
            const response = await apiClient.get('/users/me');

            return response.data;
        },

        enabled: !!localStorage.getItem('token'),
    });
}
