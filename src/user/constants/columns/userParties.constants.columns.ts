import type { DataListColumn } from '@components/data-list/types';

import type { UserParty } from '@user/types/parties.types';

import type { TFunction } from 'i18next';

export function USER_PARTIES_COLUMNS(t: TFunction<'user'>): DataListColumn<UserParty>[] {
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
            key: 'location',
            label: t('party.table.location'),
            sortable: true,
        },
    ];
}
