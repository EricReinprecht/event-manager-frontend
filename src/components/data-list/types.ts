import type { ReactNode } from 'react';

export interface DataListColumn<T> {
    key: string;

    label: string;

    sortable?: boolean;

    render?: (item: T) => ReactNode;
}

export interface DataListFilter {
    key: string;

    label: string;

    type: 'text' | 'date' | 'select';

    options?: {
        label: string;
        value: string;
    }[];
}

export interface PaginatedResponse<T> {
    data: T[];

    page: number;

    totalPages: number;

    total: number;
}

export type SortDirection = 'asc' | 'desc';

export interface DataListSort {
    key: string;

    direction: SortDirection;

    priority: number;
}

export interface DataAction<T> {
    render(item: T): ReactNode;
}
