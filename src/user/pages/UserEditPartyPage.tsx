import { useParams } from 'react-router-dom';

import PartyFormLayout from '@user/layouts/PartyFormLayout';
import { useParty } from '@user/hooks/useParty';

import { useUpdateParty } from '@user/hooks/useUpdateParty';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@routes/paths';

export default function UserEditPartyPage() {
    const { id } = useParams();

    const navigate = useNavigate();

    const updatePartyMutation = useUpdateParty();

    const { data: party, isLoading, isError } = useParty(id);

    if (isLoading) {
        return (
            <div className="base-form">
                <div className="base-form__container">Loading party...</div>
            </div>
        );
    }

    if (isError || !party) {
        return (
            <div className="base-form">
                <div className="base-form__container">Party not found</div>
            </div>
        );
    }

    return (
        <PartyFormLayout
            mode="edit"

            initialValues={{
                title: party.title,
                description: party.description,
                locationName: party.locationName,
                latitude: party.latitude,
                longitude: party.longitude,
                timezone: party.timezone,
                startAt: party.startAt,
                endAt: party.endAt,
                thumbnailID: party.thumbnailID,
                categoryIDs: party.categories.map((category) => category.id),
            }}

            onSubmit={(values) => {
                if (!id) {
                    return;
                }

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
            }}

            loading={updatePartyMutation.isPending}

            error={updatePartyMutation.isError}
        />
    );
}
