import { useNavigate, useParams } from 'react-router-dom';

import PartyFormLayout from '@user/layouts/PartyFormLayout';

import { useParty } from '@user/hooks/useParty';
import { useTranslation } from 'react-i18next';

export default function UserPartyViewPage() {
    const { t } = useTranslation('user');

    const { id } = useParams();

    const navigate = useNavigate();

    const { data: party, isLoading, isError } = useParty(id);

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
            initialValues={{
                title: party.title,
                description: party.description,
                locationName: party.locationName,
                location: party.location,
                startAt: party.startAt,
                endAt: party.endAt,
                thumbnailID: party.thumbnailID,
                categoryIds: party.categories?.map((category) => category.id) ?? [],
            }}
            actionButton={
                <button
                    className="form-button"
                    type="button"
                    onClick={() => navigate(`/user/parties/${id}/edit`)}
                >
                    {t('party.view.edit')}
                </button>
            }
        />
    );
}
