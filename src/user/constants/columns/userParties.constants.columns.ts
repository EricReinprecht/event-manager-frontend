import type { DataListColumn } from '@components/data-list/types';

import type { UserParty } from '@user/types/parties.types';

export const USER_PARTIES_COLUMNS: DataListColumn<UserParty>[] = [
    {
        key: 'title',
        label: 'Name',
    },

    {
        key: 'startAt',
        label: 'Start',
        render: (party) => new Date(party.startAt).toLocaleString(),
    },

    {
        key: 'endAt',
        label: 'End',
        render: (party) => new Date(party.endAt).toLocaleString(),
    },

    {
        key: 'location',
        label: 'Location',
    },

    {
        key: 'role',
        label: 'Role',
        render: (party) => (party.role === 'organizer' ? 'Organizer' : 'Member'),
    },
];
