import { useMutation } from '@tanstack/react-query';

import { createParty } from '@user/api/user-create-party.api';
import type { CreatePartyRequest } from '@user/types/party.types';

export function useCreateParty() {
    return useMutation({
        mutationFn: (data: CreatePartyRequest) => createParty(data),
    });
}
