export interface Party {
    id: string;

    title: string;

    description?: string;

    location?: string;

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
