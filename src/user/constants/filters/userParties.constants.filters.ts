import type { DataListFilter } from '@components/data-list/types';

export const USER_PARTIES_FILTERS: DataListFilter[] = [
    {
        key: 'name',
        label: 'Name',
        type: 'text',
    },

    {
        key: 'startAt',
        label: 'Start date',
        type: 'date',
    },

    {
        key: 'endAt',
        label: 'End date',
        type: 'date',
    },
];
