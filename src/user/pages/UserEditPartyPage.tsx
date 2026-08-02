import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import PartyFormLayout from '@user/layouts/PartyFormLayout';
import { useParty } from '@user/hooks/useParty';
import { useUpdateParty } from '@user/hooks/useUpdateParty';

import { ROUTES } from '@routes/paths';

import { partyToFormValues } from '@user/mappers/party-form.mapper';
import { useMe } from '@user/hooks/useMe';

export default function UserEditPartyPage() {
    const { t } = useTranslation('user');

    const { id } = useParams();

    const navigate = useNavigate();

    const updatePartyMutation = useUpdateParty();

    const { data: party, isLoading, isError } = useParty(id);

    const { data: user } = useMe();

    if (isLoading) {
        return (
            <div className="base-form">
                <div className="base-form__container">{t('party.common.loading')}</div>
            </div>
        );
    }

    if (isError || !party) {
        return (
            <div className="base-form">
                <div className="base-form__container">{t('party.common.notFound')}</div>
            </div>
        );
    }

    if (party.isPublished && id) {
        return <Navigate to={ROUTES.USER_PARTY_VIEW(id)} replace />;
    }

    function handleSubmit(
        values: Parameters<
            NonNullable<React.ComponentProps<typeof PartyFormLayout>['onSubmit']>
        >[0],
    ) {
        if (!id) {
            return;
        }

        updatePartyMutation.clearValidationErrors();

        updatePartyMutation.mutate(
            {
                id,
                data: values,
            },
            {
                onSuccess() {
                    navigate(ROUTES.USER_PARTY_VIEW(id));
                },
            },
        );
    }

    return (
        <PartyFormLayout
            mode="edit"
            initialValues={partyToFormValues(party)}
            showPublication={user?.id === party.organizerId && !party.isPublished}
            serverErrors={updatePartyMutation.validationErrors}
            onSubmit={handleSubmit}
            loading={updatePartyMutation.isPending}
            error={updatePartyMutation.isError}
        />
    );
}
