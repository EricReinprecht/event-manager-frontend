import type { ReactNode } from 'react';

import type { DataListColumn, DataListFilter, PaginatedResponse } from './types';

import DataListFilters from './DataListFilters';
import DataListPagination from './DataListPagination';

import './data-list.scss';

interface Props<T> {
    title: string;

    data?: PaginatedResponse<T>;

    columns: DataListColumn<T>[];

    filters?: DataListFilter[];

    values?: Record<string, string>;

    onFilterChange?(key: string, value: string): void;

    onPageChange?(page: number): void;

    action?: ReactNode;
}

export default function DataList<T>({
    title,
    data,
    columns,
    filters,
    values = {},
    onFilterChange,
    onPageChange,
    action,
}: Props<T>) {
    return (
        <div className="data-list">
            <div className="data-list__header">
                <h1>{title}</h1>

                {action && <div className="data-list__action">{action}</div>}
            </div>

            {filters && (
                <DataListFilters filters={filters} values={values} onChange={onFilterChange} />
            )}

            <div className="data-list__table">
                {data?.data.map((item, index) => (
                    <div key={index} className="data-list__row">
                        {columns.map((column) => (
                            <div key={column.key} className="data-list__cell">
                                {column.render ? column.render(item) : (item as any)[column.key]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {data && (
                <DataListPagination
                    page={data.page}
                    totalPages={data.totalPages}
                    onChange={onPageChange}
                />
            )}
        </div>
    );
}
