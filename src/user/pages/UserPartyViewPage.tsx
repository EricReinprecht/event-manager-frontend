import { useNavigate, useParams } from 'react-router-dom';

import PartyFormLayout from '@user/layouts/PartyFormLayout';

import { useParty } from '@user/hooks/useParty';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@routes/paths';
import { partyToFormValues } from '@user/mappers/party-form.mapper';
import { useMe } from '@user/hooks/useMe';
import PartyPublishButton from '@user/components/PartyPublishButton';

export default function UserPartyViewPage() {
    const { t } = useTranslation('user');

    const { id } = useParams();

    const navigate = useNavigate();

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

    return (
        <PartyFormLayout
            mode="view"
            disabled
            initialValues={partyToFormValues(party)}
            showPublication={user?.id === party.organizerId}
            actionButton={
                <div className="party-view-actions">
                    {!party.isPublished && (
                        <button
                            className="form-button"
                            type="button"
                            onClick={() => id && navigate(ROUTES.USER_PARTY_EDIT(id))}
                        >
                            {t('party.view.edit')}
                        </button>
                    )}
                    {user?.id === party.organizerId && !party.isPublished && (
                        <PartyPublishButton partyId={party.id} partyTitle={party.title} />
                    )}
                </div>
            }
        />
    );
}
