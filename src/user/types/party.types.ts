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

    categoryID: string;

    organizerID: string;

    thumbnailID?: string;

    images?: string[];

    role?: 'organizer' | 'member';

    createdAt?: string;

    updatedAt?: string;
}
