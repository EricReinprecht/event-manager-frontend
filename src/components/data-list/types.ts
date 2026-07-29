export interface DataListColumn<T> {
    key: string;

    label: string;

    sortable?: boolean;

    render?: (item: T) => React.ReactNode;
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
