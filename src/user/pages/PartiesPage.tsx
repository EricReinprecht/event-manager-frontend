import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DataList from '@components/data-list/DataList';
import type { DataListSort } from '@components/data-list/types';

import { useUserParties } from '@user/hooks/useUserParties';
import type { UserPartiesFilter } from '@user/types/parties.types';

import { USER_PARTIES_FILTERS } from '@user/constants/filters/userParties.constants.filters';
import { USER_PARTIES_COLUMNS } from '@user/constants/columns/userParties.constants.columns';

import { ROUTES } from '@/routes/paths';
import { useDebounce } from '@/hooks/useDebounce';

export default function UserPartiesPage() {
    const { t } = useTranslation('user');

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

    const { data, isLoading } = useUserParties({
        ...debouncedFilters,
        sorts: sortQuery,
    });

    function updateFilter(key: string, value: string) {
        setFilters((current) => ({
            ...current,
            [key]: value,
            page: 1,
        }));
    }

    function changePage(page: number) {
        setFilters((current) => ({
            ...current,
            page,
        }));
    }

    if (isLoading) {
        return <p>{t('party.list.loading')}</p>;
    }

    return (
        <DataList
            title={t('party.list.title')}
            data={data}
            columns={USER_PARTIES_COLUMNS}
            filters={USER_PARTIES_FILTERS}
            values={{
                name: filters.name ?? '',
                startAt: filters.startAt ?? '',
                endAt: filters.endAt ?? '',
            }}
            sorts={sorts}
            onSort={setSorts}
            onFilterChange={updateFilter}
            onPageChange={changePage}
            action={
                <Link to={ROUTES.USER_PARTY_CREATE} className="btn btn-primary">
                    {t('party.list.create')}
                </Link>
            }
        />
    );
}
