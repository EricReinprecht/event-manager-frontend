import type { Category } from '@/features/categories/types';

export interface Party {
    id: string;
    Title: string;
    startAt: string;
    endAt: string;
    location: string;
}

export interface PaginatedParties {
    data: Party[];
    page: number;
    totalPages: number;
    total: number;
}

export interface PartyFilter {
    page: number;
    limit: number;
    name?: string;
    startAt?: string;
    endAt?: string;
    sorts?: string;
}
export interface PartyFormValues {
    title: string;
    description?: string;
    locationName?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    startAt: string;
    endAt: string;
    categoryIds: string[];
    thumbnailID?: string;
    imageIDs?: string[];
}
export interface PartyDetailed {
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
    categories: string[];
    thumbnailID?: string;
    imageIDs?: string[];
}

export interface UpdatePartyRequest {
    title: string;
    description?: string;
    locationName?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    startAt: string;
    endAt: string;
    categories: string[];
    thumbnailId?: string;
    imageIds?: string[];
}
