interface Props {
    page: number;

    totalPages: number;

    emptyRows?: number;

    rowHeight?: number;

    onChange?(page: number): void;
}

export default function DataListPagination({
    page,
    totalPages,
    emptyRows = 0,
    rowHeight = 0,
    onChange,
}: Props) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            className="data-list__pagination"
            aria-label="Pagination"
            style={{ marginTop: `calc(var(--space-md) + ${emptyRows * (rowHeight + 1)}px)` }}
        >
            <button type="button" disabled={page === 1} onClick={() => onChange?.(page - 1)}>
                Previous
            </button>

            {Array.from(
                {
                    length: totalPages,
                },
                (_, index) => index + 1,
            ).map((number) => (
                <button
                    type="button"
                    key={number}
                    className={number === page ? 'data-list__page--active' : ''}
                    aria-current={number === page ? 'page' : undefined}
                    onClick={() => onChange?.(number)}
                >
                    {number}
                </button>
            ))}

            <button
                type="button"
                disabled={page === totalPages}
                onClick={() => onChange?.(page + 1)}
            >
                Next
            </button>
        </nav>
    );
}
