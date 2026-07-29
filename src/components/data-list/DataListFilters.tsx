import DatePicker from 'react-datepicker';

import type { DataListFilter } from './types';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
    filters: DataListFilter[];

    values: Record<string, string>;

    onChange?(key: string, value: string): void;
}

export default function DataListFilters({ filters, values, onChange }: Props) {
    function clear(key: string) {
        onChange?.(key, '');
    }

    return (
        <div className="data-list__filters">
            {filters.map((filter) => {
                const value = values[filter.key] ?? '';

                return (
                    <div key={filter.key} className="data-list__filter">
                        <label>{filter.label}</label>

                        <div className="data-list__input-wrapper">
                            {filter.type === 'text' && (
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => onChange?.(filter.key, e.target.value)}
                                />
                            )}

                            {filter.type === 'date' && (
                                <div className="data-list__input-wrapper">
                                    <DatePicker
                                        className="data-list__datepicker"
                                        selected={
                                            values[filter.key] ? new Date(values[filter.key]) : null
                                        }
                                        onChange={(date: Date | null) =>
                                            onChange?.(
                                                filter.key,
                                                date ? date.toISOString().split('T')[0] : '',
                                            )
                                        }
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select date"
                                        isClearable={false}
                                    />

                                    {values[filter.key] && (
                                        <button
                                            type="button"
                                            className="data-list__clear"
                                            onClick={() => onChange?.(filter.key, '')}
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            )}

                            {filter.type === 'select' && (
                                <select
                                    value={value}
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

                            {value && (
                                <button
                                    type="button"
                                    className="data-list__clear"
                                    onClick={() => clear(filter.key)}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
