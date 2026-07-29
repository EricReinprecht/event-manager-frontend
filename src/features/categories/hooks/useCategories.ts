import { useQuery } from '@tanstack/react-query';

import api from '@/api/client';

import type { Category } from '@/category/types/category.types';

import routes from '@/constants/routes';

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],

        queryFn: async (): Promise<Category[]> => {
            const response = await api.get(routes.CategoryListPopular);

            return response.data;
        },
    });
}
