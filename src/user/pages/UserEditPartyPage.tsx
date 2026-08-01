import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import PartyFormLayout from '@user/layouts/PartyFormLayout';
import { useParty } from '@user/hooks/useParty';
import { useUpdateParty } from '@user/hooks/useUpdateParty';

import { ROUTES } from '@routes/paths';

import splitDateTime from '@/helper/split-datetime';

export default function UserEditPartyPage() {
    const { t } = useTranslation('user');

    const { id } = useParams();

    const navigate = useNavigate();

    const updatePartyMutation = useUpdateParty();

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

    const ticketCategories =
        party.ticketCategories?.map((category) => ({
            id: category.id,
            name: category.name,
            price: category.price,
            capacity: category.capacity,
            requiresVerification: category.requiresVerification,
            refundRequiresApproval: category.refundRequiresApproval,
            refundPolicyId: category.refundPolicyId,

            accessWindows:
                category.accessWindows?.map((window) => {
                    const windowStart = splitDateTime(window.startsAt, timezone);

                    const windowEnd = splitDateTime(window.endsAt, timezone);

                    return {
                        id: window.id,

                        startDate: windowStart.date,

                        startTime: windowStart.time,

                        endDate: windowEnd.date,

                        endTime: windowEnd.time,
                    };
                }) ?? [],
        })) ?? [];

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
            serverErrors={updatePartyMutation.validationErrors}
            onSubmit={handleSubmit}
            loading={updatePartyMutation.isPending}
            error={updatePartyMutation.isError}
        />
    );
}
