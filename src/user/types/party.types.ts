import type { Category } from '@/features/categories/types';

export interface TicketAccessWindow {
    id: string;

    startsAt: string;

    endsAt: string;
}

export interface TicketCategory {
    id: string;

    name: string;

    price: number;

    capacity: number;

    requiresVerification: boolean;

    refundRequiresApproval: boolean;

    refundPolicyId?: string | null;

    accessWindows: TicketAccessWindow[];
}

export interface TicketAccessWindowForm {
    id?: string;

    startDate: string;

    startTime: string;

    endDate: string;

    endTime: string;
}

export interface TicketCategoryForm {
    id?: string;

    name: string;

    price: number;

    capacity: number;

    requiresVerification: boolean;

    refundRequiresApproval: boolean;

    refundPolicyId?: string | null;

    accessWindows: TicketAccessWindowForm[];
}

export interface PartyLocation {
    street?: string;
    houseNumber?: string;
    city?: string;
    country?: string;
    postalCode?: string;

    latitude: number;
    longitude: number;

    timezone: string;

    source?: 'autocomplete' | 'map';
}

export interface Party {
    id: string;
    title: string;
    startAt: string;
    endAt: string;
    locationName: string;
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
    locationName?: string;

    startAt?: string;
    endAt?: string;

    sorts?: string;
}

export interface PartyFormValues {
    title: string;

    description?: string;

    locationName?: string;

    location?: PartyLocation;

    startDate: string;
    startTime: string;

    endDate: string;
    endTime: string;

    categoryIds: string[];

    thumbnailID?: string;

    imageIDs?: string[];

    ticketCategories: TicketCategoryForm[];
}

export interface PartyDetailed {
    id: string;

    title: string;

    description?: string;

    locationName: string;

    location: PartyLocation;

    startAt: string;

    endAt: string;

    thumbnailID?: string;

    categories: Category[];

    ticketCategories: TicketCategory[];
}

export interface CreatePartyRequest {
    title: string;

    description?: string;

    locationName?: string;

    location: PartyLocation;

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

    location: PartyLocation;

    startAt: string;

    endAt: string;

    categories: string[];

    thumbnailId?: string;

    imageIds?: string[];
}
