import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DataList from '@components/data-list/DataList';

import { useUserParties } from '@user/hooks/useUserParties';
import type { UserParty, UserPartiesFilter } from '@user/types/parties.types';

import { USER_PARTIES_FILTERS } from '@user/constants/filters/userParties.constants.filters';
import { USER_PARTIES_COLUMNS } from '@user/constants/columns/userParties.constants.columns';

import { ROUTES } from '@routes/paths';
import { useDebounce } from '@/hooks/useDebounce';

import DeletePartyModal from '@user/components/DeletePartyModal';
import EditPen from '@/components/icons/EditPen';
import Trash from '@/components/icons/Trash';
import EyeIcon from '@/components/icons/Eye';

export default function UserPartiesPage() {
    const { t } = useTranslation('user');

    const [partyToDelete, setPartyToDelete] = useState<UserParty | null>(null);

    const [filters, setFilters] = useState<UserPartiesFilter>({
        page: 1,
        limit: 10,
        name: '',
        startAt: '',
        endAt: '',
        sorts: '',
    });

    const debouncedName = useDebounce(filters.name, 500);

    const queryFilters = {
        ...filters,
        name: debouncedName,
    };

    const { data, isLoading } = useUserParties(queryFilters);

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

    function openDeleteModal(party: UserParty) {
        setPartyToDelete(party);
    }

    if (isLoading) {
        return <p>{t('party.list.loading')}</p>;
    }

    return (
        <>
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

                sorts={filters.sorts ?? ''}

                onSort={(sorts) =>
                    setFilters((current) => ({
                        ...current,
                        page: 1,
                        sorts,
                    }))
                }

                onFilterChange={updateFilter}

                onPageChange={changePage}

                action={
                    <Link to={ROUTES.USER_PARTY_CREATE} className="btn btn-primary">
                        {t('party.list.create')}
                    </Link>
                }

                actions={[
                    {
                        label: t('actions.view'),

                        render: (party) => (
                            <Link
                                to={`/parties/${party.ID}`}
                                className="action"
                                title={t('actions.view')}
                            >
                                <EyeIcon size={24} />
                            </Link>
                        ),
                    },

                    {
                        label: t('actions.edit'),

                        render: (party) => (
                            <Link
                                to={`/user/parties/${party.ID}/edit`}
                                className="action"
                                title={t('actions.edit')}
                            >
                                <EditPen size={24} />
                            </Link>
                        ),
                    },

                    {
                        label: t('actions.delete'),

                        danger: true,

                        render: (party) => (
                            <button
                                className="action action--danger"
                                title={t('actions.delete')}
                                onClick={() => openDeleteModal(party)}
                            >
                                <Trash size={24} />
                            </button>
                        ),
                    },
                ]}
            />

            {partyToDelete && (
                <DeletePartyModal
                    party={partyToDelete}

                    onClose={() => setPartyToDelete(null)}

                    onConfirm={() => {
                        console.log('delete', partyToDelete.ID);

                        setPartyToDelete(null);
                    }}
                />
            )}
        </>
    );
}
