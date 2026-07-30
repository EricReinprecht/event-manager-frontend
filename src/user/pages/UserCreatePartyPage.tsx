import { useNavigate } from 'react-router-dom';

import PartyFormLayout from '@user/layouts/PartyFormLayout';

import { useCreateParty } from '@user/hooks/useUserCreateParty';

import { ROUTES } from '@routes/paths';

export default function UserCreatePartyPage() {
    const navigate = useNavigate();

    const mutation = useCreateParty();

    return (
        <PartyFormLayout
            mode="create"

            onSubmit={(values) => {
                mutation.mutate(values, {
                    onSuccess(party) {
                        navigate(ROUTES.USER_PARTY_VIEW(party.ID));
                    },
                });
            }}

            loading={mutation.isPending}

            error={mutation.isError}
        />
    );
}
