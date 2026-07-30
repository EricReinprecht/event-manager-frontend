import api from '@/api/client';

import routes from '@/constants/routes';
import { route } from '@/api/routes';

import type { CreatePartyRequest } from './user-create-party.api';

export async function updateParty(id: string, data: CreatePartyRequest) {
    const response = await api.put(route(routes.PartyUpdate, { id }), data);

    return response.data;
}
