import type { Category } from '@/features/categories/types';

export interface Party {
    id: string;

    title: string;

    description?: string;

    locationName: string;

    latitude: number;

    longitude: number;

    timezone: string;

    startAt: string;

    endAt: string;

    thumbnailID?: string;

    organizerID: string;

    categories: Category[];
}

export interface CreatePartyRequest {
    title: string;

    description?: string;

    locationName?: string;

    latitude?: number;

    longitude?: number;

    timezone?: string;

    startAt: string;

    endAt: string;

    categoryIDs: string[];

    thumbnailID?: string;

    imageIDs?: string[];
}
