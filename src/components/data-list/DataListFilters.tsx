import type { DataListFilter } from './types';

interface Props {
    filters: DataListFilter[];

    values: Record<string, string>;

    onChange?(key: string, value: string): void;
}

export default function DataListFilters({ filters, values, onChange }: Props) {
    return (
        <div className="data-list__row data-list__row--filters">
            {filters.map((filter) => (
                <div key={filter.key} className="data-list__cell">
                    {filter.type === 'text' && (
                        <input
                            type="text"
                            placeholder={filter.label}
                            value={values[filter.key] ?? ''}
                            onChange={(e) => onChange?.(filter.key, e.target.value)}
                        />
                    )}

                    {filter.type === 'date' && (
                        <input
                            type="date"
                            value={values[filter.key] ?? ''}
                            onChange={(e) => onChange?.(filter.key, e.target.value)}
                        />
                    )}

                    {filter.type === 'select' && (
                        <select
                            value={values[filter.key] ?? ''}
                            onChange={(e) => onChange?.(filter.key, e.target.value)}
                        >
                            <option value="">All</option>

                            {filter.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            ))}
        </div>
    );
}
