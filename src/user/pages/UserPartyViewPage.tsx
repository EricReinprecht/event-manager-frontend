import { useNavigate, useParams } from 'react-router-dom';

import PartyFormLayout from '@user/layouts/PartyFormLayout';

import { useParty } from '@user/hooks/useParty';
import { useTranslation } from 'react-i18next';
import splitDateTime from '@/helper/split-datetime';

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

    const timezone = party.location.timezone;

    const start = splitDateTime(party.startAt, timezone);

    const end = splitDateTime(party.endAt, timezone);

    const ticketCategories = party.ticketCategories?.map((category) => ({
        id: category.id,
        name: category.name,
        price: category.price,
        capacity: category.capacity,
        requiresVerification: category.requiresVerification,
        refundRequiresApproval: category.refundRequiresApproval,
        refundPolicyId: category.refundPolicyId,

        accessWindows:
            category.accessWindows?.map((window) => {
                const start = splitDateTime(window.startsAt, timezone);
                const end = splitDateTime(window.endsAt, timezone);

                return {
                    id: window.id,
                    startDate: start.date,
                    startTime: start.time,
                    endDate: end.date,
                    endTime: end.time,
                };
            }) ?? [],
    }));

    return (
        <PartyFormLayout
            mode="view"
            disabled
            initialValues={{
                title: party.title,
                description: party.description,
                locationName: party.locationName,
                location: party.location,
                startDate: start.date,
                startTime: start.time,
                endDate: end.date,
                endTime: end.time,
                thumbnailID: party.thumbnailID,
                categoryIds: party.categories?.map((category) => category.id) ?? [],
                ticketCategories,
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
