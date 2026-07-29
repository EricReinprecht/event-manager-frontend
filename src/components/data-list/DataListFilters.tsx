import type { DataListFilter } from './types';

import DatePicker from '@components/date-picker/DatePicker';

interface Props {
    filters: DataListFilter[];

    values: Record<string, string>;

    onChange?(key: string, value: string): void;
}

export default function DataListFilters({ filters, values, onChange }: Props) {
    return (
        <div className="data-list__filters">
            {filters.map((filter) => (
                <div key={filter.key} className="data-list__filter">
                    <label>{filter.label}</label>

                    {filter.type === 'text' && (
                        <input
                            type="text"
                            value={values[filter.key] ?? ''}
                            onChange={(e) => onChange?.(filter.key, e.target.value)}
                        />
                    )}

                    {filter.type === 'date' && (
                        <DatePicker
                            value={values[filter.key] ?? ''}
                            onChange={(value) => onChange?.(filter.key, value)}
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
