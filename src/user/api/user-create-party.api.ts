import api from '@/api/client';
export interface CreatePartyRequest {
    title: string;

    description?: string;

    location?: string;

    latitude?: number;

    longitude?: number;

    timezone?: string;

    startAt: string;

    endAt: string;

    categoryID?: string;

    categories?: string[];

    thumbnailID?: string;

    imageIDs?: string[];
}

export async function createParty(data: CreatePartyRequest) {
    const response = await api.post('/parties', data);

    return response.data;
}
