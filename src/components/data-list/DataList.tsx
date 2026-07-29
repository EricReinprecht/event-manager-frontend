import type { ReactNode } from 'react';

import type { DataListColumn, DataListFilter, DataListSort, PaginatedResponse } from './types';

import DataListFilters from './DataListFilters';
import DataListHeader from './DataListHeader';
import DataListPagination from './DataListPagination';

import './data-list.scss';
import { parseSorts, stringifySorts } from './sorts';

interface Props<T> {
    title: string;

    data?: PaginatedResponse<T>;

    columns: DataListColumn<T>[];

    filters?: DataListFilter[];

    values?: Record<string, string>;

    sorts?: string;

    onSort?(sorts: string): void;

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
    sorts = '',
    onSort,
    onFilterChange,
    onPageChange,
    action,
}: Props<T>) {
    function changeSort(key: string) {
        const currentSorts = parseSorts(sorts);

        let newSorts: DataListSort[];

        const existing = currentSorts.find((sort) => sort.key === key);

        // first click -> ASC
        if (!existing) {
            newSorts = [
                ...currentSorts,
                {
                    key,
                    direction: 'asc',
                    priority: currentSorts.length + 1,
                },
            ];
        }

        // second click -> DESC
        else if (existing.direction === 'asc') {
            newSorts = currentSorts.map((sort) =>
                sort.key === key
                    ? {
                          ...sort,
                          direction: 'desc',
                      }
                    : sort,
            );
        }

        // third click -> remove
        else {
            newSorts = currentSorts
                .filter((sort) => sort.key !== key)
                .map((sort, index) => ({
                    ...sort,
                    priority: index + 1,
                }));
        }

        onSort?.(stringifySorts(newSorts));
    }

    return (
        <div className="data-list">
            <div className="data-list__header">
                <h1>{title}</h1>

                {action && <div className="data-list__action">{action}</div>}
            </div>

            <div className="data-list__table">
                <DataListHeader columns={columns} sorts={parseSorts(sorts)} onSort={changeSort} />

                {filters && (
                    <DataListFilters filters={filters} values={values} onChange={onFilterChange} />
                )}

                {data?.data.map((item, index) => (
                    <div key={index} className="data-list__row">
                        {columns.map((column) => (
                            <div key={column.key.toString()} className="data-list__cell">
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
