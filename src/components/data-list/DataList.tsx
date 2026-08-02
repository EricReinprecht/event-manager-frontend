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
import UserPageHeader from '@user/layouts/UserPageHeader';

import './data-list.scss';
import { parseSorts, stringifySorts } from './sorts';

const DEFAULT_ROW_HEIGHT = 65;
const DEFAULT_PAGINATION_SPACE = 102;

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

    onPageSizeChange?(pageSize: number): void;
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
    onPageSizeChange,
}: Props<T>) {
    const listRef = useRef<HTMLDivElement | null>(null);
    const tableRef = useRef<HTMLDivElement | null>(null);
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

    useLayoutEffect(() => {
        if (!onPageSizeChange) return;

        const list = listRef.current;
        const table = tableRef.current;
        if (!list || !table) return;
        const content = list.closest('.user-layout__content') as HTMLElement | null;

        const measureCapacity = () => {
            const contentStyles = content ? window.getComputedStyle(content) : null;
            const contentBottom = content?.getBoundingClientRect().bottom ?? window.innerHeight;
            const bottomPadding = Number.parseFloat(contentStyles?.paddingBottom ?? '0');
            const listStyles = window.getComputedStyle(list);
            const listGap = Number.parseFloat(listStyles.rowGap || listStyles.gap || '0');
            const pagination = list.querySelector<HTMLElement>('.data-list__pagination');
            const paginationStyles = pagination ? window.getComputedStyle(pagination) : null;
            const paginationSpace = pagination
                ? pagination.getBoundingClientRect().height +
                  Number.parseFloat(paginationStyles?.marginTop ?? '0') +
                  listGap
                : DEFAULT_PAGINATION_SPACE;

            const fixedRows = Array.from(
                table.querySelectorAll<HTMLElement>(
                    ':scope > .data-list__row--header, :scope > .data-list__filters',
                ),
            ).reduce((height, row) => height + row.getBoundingClientRect().height, 0);
            const rowHeight = dataRowHeight || DEFAULT_ROW_HEIGHT;
            const availableHeight =
                contentBottom - bottomPadding - table.getBoundingClientRect().top - paginationSpace;
            const capacity = Math.max(
                1,
                Math.min(100, Math.floor((availableHeight - fixedRows) / rowHeight)),
            );

            if (capacity !== pageSize) onPageSizeChange(capacity);
        };

        measureCapacity();

        const observer = new ResizeObserver(measureCapacity);
        observer.observe(list);
        if (content) observer.observe(content);
        window.addEventListener('resize', measureCapacity);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', measureCapacity);
        };
    }, [dataRowHeight, onPageSizeChange, pageSize]);

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
        <div ref={listRef} className="data-list">
            <UserPageHeader title={title} actions={action} />

            <div
                ref={tableRef}
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
                                {column.render
                                    ? column.render(item)
                                    : (item[column.key as keyof T] as ReactNode)}
                            </div>
                        ))}
                        {actions.length > 0 && (
                            <div className="data-list__cell data-list__cell--actions">
                                {actions
                                    .map((action, actionIndex) => ({
                                        actionIndex,
                                        content: action.render(item),
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
