import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DataList from '@components/data-list/DataList';

import { useUserParties } from '@user/hooks/useUserParties';
import type { Party, PartyFilter } from '@user/types/party.types';

import { USER_PARTIES_FILTERS } from '@user/constants/filters/userParties.constants.filters';

import { ROUTES } from '@routes/paths';
import { useDebounce } from '@/hooks/useDebounce';

import DeletePartyModal from '@user/components/DeletePartyModal';
import EditPen from '@/components/icons/EditPen';
import Trash from '@/components/icons/Trash';
import EyeIcon from '@/components/icons/Eye';
import { USER_PARTIES_COLUMNS } from '@user/constants/columns/userParties.constants.columns';
import { useDeleteParty } from '@user/hooks/useDeleteParty';
import QuickPublishPartyAction from '@user/components/QuickPublishPartyAction';
import PublishPartyModal from '@user/components/PublishPartyModal';
import { usePublishParty } from '@user/hooks/usePublishParty';

export default function UserPartiesPage() {
    const { t } = useTranslation('user');

    const [partyToDelete, setPartyToDelete] = useState<Party | null>(null);
    const [partyToPublish, setPartyToPublish] = useState<Party | null>(null);

    const deletePartyMutation = useDeleteParty();
    const publishPartyMutation = usePublishParty();

    const [filters, setFilters] = useState<PartyFilter>({
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

    const changePageSize = useCallback((limit: number) => {
        setFilters((current) =>
            current.limit === limit
                ? current
                : {
                      ...current,
                      page: 1,
                      limit,
                  },
        );
    }, []);

    function openDeleteModal(party: Party) {
        setPartyToDelete(party);
    }

    return (
        <>
            <DataList
                title={t('party.list.title')}

                data={data}

                getRowKey={(party) => party.id}

                pageSize={filters.limit}

                onPageSizeChange={changePageSize}

                columns={USER_PARTIES_COLUMNS(t)}

                filters={USER_PARTIES_FILTERS(t)}

                values={{
                    name: filters.name ?? '',
                    startAt: filters.startAt ?? '',
                    endAt: filters.endAt ?? '',
                    locationName: filters.locationName ?? '',
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

                actionsLabel={t('party.filters.actions')}

                actions={[
                    {
                        render: (party) => (
                            <Link
                                to={ROUTES.USER_PARTY_VIEW(party.id)}
                                className="action"
                                title={t('actions.view')}
                            >
                                <EyeIcon size={24} />
                            </Link>
                        ),
                    },

                    {
                        render: (party) =>
                            !party.isPublished ? (
                                <Link
                                    to={ROUTES.USER_PARTY_EDIT(party.id)}
                                    className="action"
                                    title={t('actions.edit')}
                                >
                                    <EditPen size={24} />
                                </Link>
                            ) : null,
                    },

                    {
                        render: (party) =>
                            !party.isPublished ? (
                                <QuickPublishPartyAction
                                    party={party}
                                    onPublish={setPartyToPublish}
                                />
                            ) : null,
                    },

                    {
                        render: (party) =>
                            !party.isPublished ? (
                                <button
                                    type="button"
                                    className="action action--danger"
                                    title={t('actions.delete')}
                                    onClick={() => openDeleteModal(party)}
                                >
                                    <Trash size={24} />
                                </button>
                            ) : null,
                    },
                ]}
            />

            {isLoading && !data && <p>{t('party.list.loading')}</p>}

            {partyToDelete && (
                <DeletePartyModal
                    party={partyToDelete}

                    pending={deletePartyMutation.isPending}

                    onClose={() => setPartyToDelete(null)}

                    onConfirm={() => {
                        deletePartyMutation.mutate(partyToDelete.id, {
                            onSuccess: () => setPartyToDelete(null),
                        });
                    }}
                />
            )}

            {partyToPublish && (
                <PublishPartyModal
                    partyTitle={partyToPublish.title}
                    pending={publishPartyMutation.isPending}
                    error={publishPartyMutation.isError}
                    onClose={() => setPartyToPublish(null)}
                    onConfirm={() => {
                        const partyId = partyToPublish.id;
                        publishPartyMutation.mutate(partyId, {
                            onSuccess: () => setPartyToPublish(null),
                        });
                    }}
                />
            )}

            {deletePartyMutation.isError && <p className="form-error">{t('party.delete.error')}</p>}
        </>
    );
}
