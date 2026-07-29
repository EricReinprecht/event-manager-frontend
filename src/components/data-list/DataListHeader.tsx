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
        <div className="data-list__row data-list__row--header">
            {columns.map((column) => {
                const sort = getSort(column.key);

                return (
                    <div
                        key={column.key}
                        className={
                            column.sortable
                                ? 'data-list__cell data-list__cell--sortable'
                                : 'data-list__cell'
                        }
                        onClick={() => column.sortable && onSort(column.key)}
                    >
                        {column.label}

                        {sort && (
                            <span className="data-list__sort">
                                <span className="data-list__sort-priority">{sort.priority}</span>

                                <span>{sort.direction === 'asc' ? '↑' : '↓'}</span>
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
