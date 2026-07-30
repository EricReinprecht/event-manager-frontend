import { useNavigate } from 'react-router-dom';

import PartyFormLayout from '@user/layouts/PartyFormLayout';

import { useCreateParty } from '@user/hooks/useUserCreateParty';

import { ROUTES } from '@routes/paths';

export default function UserCreatePartyPage() {
    const navigate = useNavigate();

    const mutation = useCreateParty();

    return (
        <PartyFormLayout
            title="Create Party"

            submitLabel="Creating..."

            onSubmit={(values) => {
                mutation.mutate(values, {
                    onSuccess(party) {
                        navigate(ROUTES.PARTY_VIEW(party.ID));
                    },
                });
            }}

            loading={mutation.isPending}

            error={mutation.isError}
        />
    );
}
