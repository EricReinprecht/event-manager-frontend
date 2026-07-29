import { useState, type ReactNode } from 'react';

import type { DataListColumn, DataListFilter, DataListSort, PaginatedResponse } from './types';

import DataListFilters from './DataListFilters';
import DataListHeader from './DataListHeader';
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
    const [sorts, setSorts] = useState<DataListSort[]>([]);

    function changeSort(key: string) {
        setSorts((current) => {
            const existing = current.find((sort) => sort.key === key);

            // first click -> add ASC
            if (!existing) {
                return [
                    ...current,

                    {
                        key,
                        direction: 'asc',
                        priority: current.length + 1,
                    },
                ];
            }

            // second click -> DESC
            if (existing.direction === 'asc') {
                return current.map((sort) =>
                    sort.key === key
                        ? {
                              ...sort,
                              direction: 'desc',
                          }
                        : sort,
                );
            }

            // third click -> remove sort
            return current
                .filter((sort) => sort.key !== key)
                .map((sort, index) => ({
                    ...sort,
                    priority: index + 1,
                }));
        });
    }

    return (
        <div className="data-list">
            <div className="data-list__header">
                <h1>{title}</h1>

                {action && <div className="data-list__action">{action}</div>}
            </div>

            <div className="data-list__table">
                <DataListHeader columns={columns} sorts={sorts} onSort={changeSort} />

                {filters && (
                    <DataListFilters filters={filters} values={values} onChange={onFilterChange} />
                )}

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
