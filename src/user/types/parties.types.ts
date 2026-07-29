export interface UserParty {
    ID: string;

    Title: string;

    StartAt: string;

    EndAt: string;

    Location: string;
}

export interface UserPartiesFilter {
    page: number;

    limit: number;

    name?: string;

    startAt?: string;

    endAt?: string;
}

export interface PaginatedParties {
    data: UserParty[];

    page: number;

    totalPages: number;

    total: number;
}
