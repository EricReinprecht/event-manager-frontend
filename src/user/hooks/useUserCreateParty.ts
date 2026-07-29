import { useMutation } from '@tanstack/react-query';

import { createParty, type CreatePartyRequest } from '@user/api/user-create-party.api';

export function useCreateParty() {
    return useMutation({
        mutationFn: (data: CreatePartyRequest) => createParty(data),
    });
}
