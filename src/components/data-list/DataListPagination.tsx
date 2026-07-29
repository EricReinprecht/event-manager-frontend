interface Props {
    page: number;

    totalPages: number;

    onChange?(page: number): void;
}

export default function DataListPagination({ page, totalPages, onChange }: Props) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="data-list__pagination">
            <button disabled={page === 1} onClick={() => onChange?.(page - 1)}>
                Previous
            </button>

            {Array.from(
                {
                    length: totalPages,
                },
                (_, index) => index + 1,
            ).map((number) => (
                <button
                    key={number}
                    className={number === page ? 'data-list__page--active' : ''}
                    onClick={() => onChange?.(number)}
                >
                    {number}
                </button>
            ))}

            <button disabled={page === totalPages} onClick={() => onChange?.(page + 1)}>
                Next
            </button>
        </div>
    );
}
