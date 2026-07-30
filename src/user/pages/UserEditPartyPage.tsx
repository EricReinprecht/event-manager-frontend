import { useParams } from 'react-router-dom';

import PartyFormLayout from '@user/layouts/PartyFormLayout';
import { useParty } from '@user/hooks/useParty';

export default function UserEditPartyPage() {
    const { id } = useParams();

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
            title="Edit Party"

            submitLabel="Save"

            initialValues={{
                title: party.title,

                description: party.description,

                location: party.location,

                startAt: party.startAt,

                endAt: party.endAt,

                categoryID: party.categoryID,

                thumbnailID: party.thumbnailID,
            }}

            onSubmit={(values) => {
                console.log('update party', values);
            }}
        />
    );
}
