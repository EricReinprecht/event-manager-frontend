import type { DataListColumn, DataListSort } from './types';

interface Props<T> {
    columns: DataListColumn<T>[];

    sorts: DataListSort[];

    onSort(key: string): void;
}

export default function DataListHeader<T>({ columns, sorts, onSort }: Props<T>) {
    function getSort(key: string) {
        return sorts.find((sort) => sort.key === key);
    }

    return (
        <>
            {columns.map((column) => {
                const sort = getSort(column.key);

                return (
                    <div key={column.key} className="data-list__cell">
                        {column.sortable ? (
                            <button
                                type="button"
                                className="data-list__sort-button"
                                onClick={() => onSort(column.key)}
                            >
                                {column.label}

                                {sort && (
                                    <span className="data-list__sort">
                                        <span className="data-list__sort-priority">
                                            {sort.priority}
                                        </span>
                                        <span aria-hidden="true">
                                            {sort.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    </span>
                                )}
                            </button>
                        ) : (
                            column.label
                        )}
                    </div>
                );
            })}
        </>
    );
}
