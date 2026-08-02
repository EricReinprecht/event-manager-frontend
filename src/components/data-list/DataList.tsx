import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

import type {
    DataListColumn,
    DataListFilter,
    DataListSort,
    PaginatedResponse,
    DataAction,
} from './types';

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

    actions?: DataAction<T>[];

    actionsLabel?: string;

    getRowKey?(item: T): string | number;

    pageSize?: number;
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
    actions = [],
    actionsLabel = '',
    getRowKey,
    pageSize,
}: Props<T>) {
    const lastDataRowRef = useRef<HTMLDivElement | null>(null);
    const [dataRowHeight, setDataRowHeight] = useState(0);

    useLayoutEffect(() => {
        const observedRow = lastDataRowRef.current;
        if (!observedRow) return;

        const measureRow = () => {
            setDataRowHeight(observedRow.getBoundingClientRect().height);
        };

        measureRow();

        const observer = new ResizeObserver(measureRow);
        observer.observe(observedRow);

        return () => observer.disconnect();
    }, [data?.data]);

    function changeSort(key: string) {
        const currentSorts = parseSorts(sorts);

        let newSorts: DataListSort[];

        const existing = currentSorts.find((sort) => sort.key === key);

        if (!existing) {
            newSorts = [
                ...currentSorts,
                {
                    key,
                    direction: 'asc',
                    priority: currentSorts.length + 1,
                },
            ];
        } else if (existing.direction === 'asc') {
            newSorts = currentSorts.map((sort) =>
                sort.key === key
                    ? {
                          ...sort,
                          direction: 'desc',
                      }
                    : sort,
            );
        } else {
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

            <div
                className="data-list__table"
                style={
                    {
                        '--data-columns': actions.length ? columns.length + 1 : columns.length,
                    } as React.CSSProperties
                }
            >
                <div className="data-list__row data-list__row--header">
                    <DataListHeader
                        columns={columns}
                        sorts={parseSorts(sorts)}
                        onSort={changeSort}
                    />

                    {actions.length > 0 && (
                        <div className="data-list__cell data-list__cell--actions">
                            {actionsLabel}
                        </div>
                    )}
                </div>

                {filters && (
                    <DataListFilters filters={filters} values={values} onChange={onFilterChange} />
                )}

                {data?.data.map((item, index) => (
                    <div
                        key={getRowKey?.(item) ?? index}
                        ref={index === data.data.length - 1 ? lastDataRowRef : undefined}
                        className="data-list__row"
                    >
                        {columns.map((column) => (
                            <div key={column.key.toString()} className="data-list__cell">
                                {column.render ? column.render(item) : (item as any)[column.key]}
                            </div>
                        ))}
                        {actions.length > 0 && (
                            <div className="data-list__cell data-list__cell--actions">
                                {actions
                                    .map((action, actionIndex) => ({
                                        actionIndex,
                                        content: action.render?.(item) ?? null,
                                    }))
                                    .filter(({ content }) => content !== null)
                                    .map(({ actionIndex, content }) => (
                                        <div key={actionIndex}>{content}</div>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {data && (
                <DataListPagination
                    page={data.page}
                    totalPages={data.totalPages}
                    emptyRows={Math.max(0, (pageSize ?? data.data.length) - data.data.length)}
                    rowHeight={dataRowHeight}
                    onChange={onPageChange}
                />
            )}
        </div>
    );
}
