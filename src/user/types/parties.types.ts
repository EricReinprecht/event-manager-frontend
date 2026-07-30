export interface UserParty {
    id: string;

    Title: string;

    startAt: string;

    endAt: string;

    location: string;
}

export interface UserPartiesFilter {
    page: number;

    limit: number;

    name?: string;

    startAt?: string;

    endAt?: string;

    sorts?: string;
}

export interface PaginatedParties {
    data: UserParty[];

    page: number;

    totalPages: number;

    total: number;
}
