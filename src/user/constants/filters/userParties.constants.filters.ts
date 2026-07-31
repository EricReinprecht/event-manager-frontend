import type { DataListFilter } from '@components/data-list/types';

import type { TFunction } from 'i18next';

export function USER_PARTIES_FILTERS(t: TFunction<'user'>): DataListFilter[] {
    return [
        {
            key: 'name',
            label: t('party.filters.name'),
            type: 'text',
        },

        {
            key: 'startAt',
            label: t('party.filters.startDate'),
            type: 'date',
        },

        {
            key: 'endAt',
            label: t('party.filters.endDate'),
            type: 'date',
        },

        {
            key: 'locationName',
            label: t('party.filters.locationName'),
            type: 'text',
        },
    ];
}
