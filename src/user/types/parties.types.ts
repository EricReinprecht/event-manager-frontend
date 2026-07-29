export interface UserParty {
    id: string;

    title: string;

    startAt: string;

    endAt: string;

    location: string;

    role: 'organizer' | 'member';
}

export interface UserPartiesFilter {
    page: number;

    limit: number;

    name?: string;

    startAt?: string;

    endAt?: string;

    type?: 'organized' | 'member';
}

export interface PaginatedParties {
    data: UserParty[];

    page: number;

    totalPages: number;

    total: number;
}
