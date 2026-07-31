import type { DataListColumn } from '@components/data-list/types';

import type { Party } from '@user/types/party.types';

import type { TFunction } from 'i18next';

export function USER_PARTIES_COLUMNS(t: TFunction<'user'>): DataListColumn<Party>[] {
    return [
        {
            key: 'title',
            label: t('party.table.name'),
            sortable: true,
        },

        {
            key: 'startAt',
            label: t('party.table.start'),
            sortable: true,
            render: (party) => new Date(party.startAt).toLocaleDateString('de-DE'),
        },

        {
            key: 'endAt',
            label: t('party.table.end'),
            sortable: true,
            render: (party) => new Date(party.endAt).toLocaleDateString('de-DE'),
        },

        {
            key: 'locationName',
            label: t('party.table.locationName'),
            sortable: true,
        },
    ];
}
