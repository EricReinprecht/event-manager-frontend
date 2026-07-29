import { useState } from 'react';
import { Link } from 'react-router-dom';

import DataList from '@components/data-list/DataList';
import type { DataListSort } from '@components/data-list/types';

import { useUserParties } from '@user/hooks/useUserParties';
import type { UserPartiesFilter } from '@user/types/parties.types';

import { USER_PARTIES_FILTERS } from '@user/constants/filters/userParties.constants.filters';
import { USER_PARTIES_COLUMNS } from '@user/constants/columns/userParties.constants.columns';

import { ROUTES } from '@/routes/paths';
import { useDebounce } from '@/hooks/useDebounce';

export default function UserPartiesPage() {
    const [filters, setFilters] = useState<UserPartiesFilter>({
        page: 1,
        limit: 10,
        name: '',
        startAt: '',
        endAt: '',
    });

    const [sorts, setSorts] = useState<DataListSort[]>([]);

    const debouncedFilters = useDebounce(filters, 500);

    const debouncedSorts = useDebounce(sorts, 500);

    const sortQuery = debouncedSorts.map((sort) => `${sort.key}:${sort.direction}`).join(',');

    console.log('SORT:', sortQuery);

    const { data, isLoading } = useUserParties({
        ...debouncedFilters,
        sorts: sortQuery,
    });

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
            }}
            onFilterChange={updateFilter}
            onPageChange={changePage}
            onSort={setSorts}
            sorts={sorts}
            action={
                <Link to={ROUTES.USER_PARTY_CREATE} className="btn btn-primary">
                    Create Party
                </Link>
            }
        />
    );
}
