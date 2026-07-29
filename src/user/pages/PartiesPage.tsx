import { useState } from 'react';

import DataList from '@components/data-list/DataList';
import { useUserParties } from '@user/hooks/useUserParties';
import type { UserPartiesFilter } from '@user/types/parties.types';

export default function UserPartiesPage() {
    const [filters, setFilters] = useState<UserPartiesFilter>({
        page: 1,
        limit: 10,
        type: 'organized',
        name: '',
        startAt: '',
        endAt: '',
    });

    const { data, isLoading } = useUserParties(filters);

    function updateFilter(key: string, value: string) {
        setFilters({
            ...filters,

            [key]: value,

            page: 1,
        });
    }

    function changePage(page: number) {
        setFilters({
            ...filters,
            page,
        });
    }

    if (isLoading) {
        return <p>Loading parties...</p>;
    }

    return (
        <DataList
            title="My Parties"

            data={data}

            filters={[
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

                {
                    key: 'type',
                    label: 'Participation',
                    type: 'select',

                    options: [
                        {
                            label: 'Organized by me',
                            value: 'organized',
                        },

                        {
                            label: 'Participating',
                            value: 'member',
                        },
                    ],
                },
            ]}

            values={{
                name: filters.name ?? '',
                startAt: filters.startAt ?? '',
                endAt: filters.endAt ?? '',
                type: filters.type ?? '',
            }}

            onFilterChange={updateFilter}

            onPageChange={changePage}

            columns={[
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
            ]}
        />
    );
}
