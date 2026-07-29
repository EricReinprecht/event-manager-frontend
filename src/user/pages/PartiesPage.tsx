import { useState } from 'react';

import DataList from '@components/data-list/DataList';
import { useUserParties } from '@user/hooks/useUserParties';
import type { UserPartiesFilter } from '@user/types/parties.types';
import { Link } from 'react-router-dom';

import { USER_PARTIES_FILTERS } from '@user/constants/filters/userParties.constants.filters';
import { USER_PARTIES_COLUMNS } from '@user/constants/columns/userParties.constants.columns';
import { ROUTES } from '@/routes/paths';

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

            columns={USER_PARTIES_COLUMNS}
            filters={USER_PARTIES_FILTERS}

            values={{
                name: filters.name ?? '',
                startAt: filters.startAt ?? '',
                endAt: filters.endAt ?? '',
                type: filters.type ?? '',
            }}

            onFilterChange={updateFilter}

            onPageChange={changePage}
            action={
                <Link to={ROUTES.CREATE_PARTY} className="btn btn-primary">
                    Create Party
                </Link>
            }
        />
    );
}
