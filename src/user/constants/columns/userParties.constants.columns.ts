import type { DataListColumn } from '@components/data-list/types';

import type { UserParty } from '@user/types/parties.types';

export const USER_PARTIES_COLUMNS: DataListColumn<UserParty>[] = [
    {
        key: 'title',
        label: 'Name',
        sortable: true,
    },

    {
        key: 'startAt',
        label: 'Start',
        sortable: true,
        render: (party) => new Date(party.startAt).toLocaleString(),
    },

    {
        key: 'endAt',
        label: 'End',
        sortable: true,
        render: (party) => new Date(party.endAt).toLocaleString(),
    },

    {
        key: 'location',
        label: 'Location',
        sortable: true,
    },
];
