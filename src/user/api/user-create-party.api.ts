import api from '@/api/client';
import routes from '@/constants/routes';

import type { Party } from '@user/types/party.types';

export interface CreatePartyRequest {
    title: string;

    description?: string;

    location?: string;

    startAt: string;

    endAt: string;

    categoryID: string;

    thumbnailID?: string;

    imageIDs?: string[];
}

export async function createParty(data: CreatePartyRequest) {
    const response = await api.post('/parties', data);

    return response.data;
}
