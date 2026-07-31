import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CategoryMultiSelect from '@/features/categories/hooks/components/CategoryMultiSelect';

import type { FormFieldConfig } from './types';

import LocationPicker from '../fields/LocationPicker';

interface Props {
    field: FormFieldConfig;

    value: any;

    onChange(name: string, value: any): void;

    disabled?: boolean;
}

export default function FormField({ field, value, onChange, disabled = false }: Props) {
    if (field.type === 'hidden') {
        return (
            <input
                type="hidden"
                value={value ?? ''}
                onChange={(e) => onChange(field.name, e.target.value)}
            />
        );
    }

    return (
        <div className="form-input">
            <label>{field.label}</label>

            {field.type === 'text' && (
                <input
                    value={value ?? ''}
                    disabled={disabled || field.disabled}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            )}

            {field.type === 'textarea' && (
                <textarea
                    value={value ?? ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={disabled || field.disabled}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            )}

            {field.type === 'select' && (
                <select
                    value={value ?? ''}
                    disabled={disabled || field.disabled}
                    onChange={(e) => onChange(field.name, e.target.value)}
                >
                    <option value="">Select...</option>

                    {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}

            {field.type === 'date' && (
                <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={(date: Date | null) =>
                        onChange(field.name, date ? date.toISOString().split('T')[0] : '')
                    }
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Select date"
                    className="form-datepicker"
                    disabled={disabled || field.disabled}
                />
            )}

            {field.type === 'time' && (
                <DatePicker
                    selected={value ? new Date(`1970-01-01T${value}`) : null}
                    onChange={(date: Date | null) =>
                        onChange(field.name, date ? date.toTimeString().slice(0, 5) : '')
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    placeholderText="Select time"
                    className="form-datepicker"
                    disabled={disabled || field.disabled}
                />
            )}

            {field.type === 'datetime' && (
                <div className="form-datepicker-wrapper">
                    <DatePicker
                        selected={value ? new Date(value) : null}
                        onChange={(date: Date | null) =>
                            onChange(field.name, date?.toISOString() ?? '')
                        }
                        showTimeSelect
                        timeIntervals={15}
                        dateFormat="dd.MM.yyyy HH:mm"
                        placeholderText="Select date and time"
                        className="form-datepicker"
                        popperPlacement="bottom-start"
                        disabled={disabled || field.disabled}
                    />
                </div>
            )}

            {field.type === 'multiselect' && (
                <CategoryMultiSelect
                    value={value ?? []}
                    options={field.options ?? []}
                    disabled={disabled || field.disabled}
                    onChange={(value) => onChange(field.name, value)}
                />
            )}

            {field.type === 'location' && (
                <LocationPicker
                    value={value}
                    disabled={disabled}
                    onChange={(location) => {
                        if (disabled) return;

                        onChange('location', location);
                    }}
                />
            )}
        </div>
    );
}
